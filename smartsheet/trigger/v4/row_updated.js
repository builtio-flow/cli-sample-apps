const baseURL = "https://api.smartsheet.com/2.0/webhooks"
const request = require("request");
const common = require("../../common.js")
const bluebird = require("bluebird")

module.exports = {

  name: "row_updated",

  label: "Row Updated",

  version: "v4",

  input: {
    type: "object",
    title: "Row Updated",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["row_updated"],
        scopes: ["READ_CONTACTS","READ_SHEETS","READ_SIGHTS","READ_USERS","ADMIN_WEBHOOKS"],
        required_scopes: ["READ_SHEETS","ADMIN_WEBHOOKS"]
      },
      sheetID: {
        type: "string",
        title: "Sheet",
        minLength: 1,
        propertyOrder: 2,
        description: "Select/specify the ID of the sheet for which you want to set the trigger"
      },
      polling: {
        type: "boolean",
        default: false,
        options: { hidden: true }
      }
    }
  },

  output: {
    "row_updated": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "Row Updated",
    "sheet_id": 6616401013172100,
    "sheet_name": "Sheet Report",
    "sheet_version": 164,
    "sheet_url": "https://app.smartsheet.com/b/home?lx=yI64dW_z1OwVNTL0ELHWgg",
    "sheet_total_row_count": 6,
    "sheet_created_at": "2018-10-13T07:51:46Z",
    "sheet_modified_at": "2018-10-20T09:40:13Z",
    "sheet_row": {
      "id": 3498700267906948,
      
      "sheetId": 6616401013172100,
      "rowNumber": 3,
      "siblingId": 3268726244042628,
      "version": 164,
      "permalink": "https://app.smartsheet.com/b/home?lx=AbkzMpk-xn0IlOeM2F7dHbLyp6Yq4uSPNUhdPCfsEeE",
      "expanded": true,
      "accessLevel": "OWNER",
      "createdAt": "2018-10-15T16:06:55Z",
      "createdBy": {
        "name": "Eric Doe",
        "email": "ericdoe@example.com"
      },
      "modifiedAt": "2018-10-20T09:40:13Z",
      "modifiedBy": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "cells": [
        {
          "columnId": 4020300808513412,
          "value": "Update Dept. no. 4 Sales Report",
          "displayValue": "Update Dept. no. 4 Sales Report",
          "columnName": "Task Name"
        },
        {
          "columnId": 8523900435883908,
          "columnName": "Due Date"
        },
        {
          "columnId": 361126111274884,
          "columnName": "Done"
        },
        {
          "columnId": 4864725738645380,
          "columnName": "Assigned To"
        },
        {
          "columnId": 2612925924960132,
          "value": "Complete",
          "displayValue": "Complete",
          "columnName": "Status"
        },
        {
          "columnId": 7116525552330628,
          "value": "Report is complete",
          "displayValue": "Report is complete",
          "columnName": "Comments"
        }
      ]
    },
    "sheet_old_row": [
      {
        "columnId": 4020300808513412,
        "value": "Collect Dept. no. 4 Sales Report",
        "displayValue": "Collect Dept. no. 4 Sales Report",
        "modifiedBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "modifiedAt": "2018-10-20T05:52:30Z"
      },
      {
        "columnId": 2612925924960132,
        "value": "Not Started",
        "displayValue": "Not Started",
        "modifiedBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "modifiedAt": "2018-10-16T16:48:00Z"
      }
    ]
  },

  mock_input: { sheetID: "6616401013172100" },

  execute: function (input, payload, output) {

    if (payload && payload.events && payload.events[0].objectType == "sheet" &&
      payload.events[0].eventType == "updated") {

      bluebird.mapSeries(payload.events, function (event) {

        if (event.objectType == "row" && event.eventType == "updated") {

          return new Promise((resolve, reject) => {

            Promise.all([
              common.getSheet(input, payload.scopeObjectId),
              common.getRow(input, payload.scopeObjectId, event.id),
              common.getOldRow(input, payload.scopeObjectId, event.id)
            ])
              .then(values => {

                let sheet = values[0]
                let row = values[1]
                let oldRow = values[2]

                row.cells.map((cell, index) => {
                  cell.columnName = sheet.columns[index].title
                })

                let body = {
                  "event_type": "Row Updated",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "sheet_row": row,
                  "sheet_old_row": oldRow
                }

                resolve(body)
              })
              .catch(err => {
                reject(err)
              })
          })
        }
      })
        .then(arr => {
          let final_arr = arr.filter(x => x)
          output(null, final_arr)
        })
    }
    else
      output(null, []);

  },

  register: function (input, output) {

    common.fieldValidation(input).then(response => {
      if (response == "success") {
        common.webhookRegistration(input)
          .then(_response => {

            output(null, _response)
          })
          .catch(err => {
            output(err)
          })
      }
      else
        output(response)
    })
      .catch(err => {
        output(err)
      })
  },

  unregister: function (input, options, output) {

    if (input && input.hook_response && input.hook_response.result && input.hook_response.result.id) {
      request({
        method: "DELETE",
        url: baseURL + "/" + input.hook_response.result.id,
        headers: {
          "Authorization": "Bearer " + input.auth.access_token,
          "User-Agent": "built.io Flow"
        }
      }, function (err, resp) {

        if (err) {
          output(err)
        }

        if (resp && resp.statusCode >= 200 && resp.statusCode < 500) {
          output(null, "Webhook Deleted Successfully")
        }
        else {
          output("Something went wrong")
        }
      })
    }

  },

  activate: function (input, options, output) {

    output(null, true);
  }
}

