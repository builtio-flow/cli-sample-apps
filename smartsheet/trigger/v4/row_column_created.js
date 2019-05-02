const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js")

module.exports = {

  name: "row_column_created",

  label: "Row and/or Column Created",

  version: "v4",

  input: {
    type: "object",
    title: "Row and/or Column Created",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["row_column_created"],
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
      update_filter: {
        type: "array",
        minLength: 1,
        description: "Provides the list of filters by which you want to filter the result",
        propertyOrder: 3,
        title: "Filters",
        maxItems:2,
        "items": {
          "type": "object",
          "properties": {
            "filter": {
              "title": "Filter Name",
              "type": "string",
              "description": "Select the type of the filter for which you want to set the trigger",
              "enum": [
                "Row Created",
                "Column Created"
              ],
            }
          }
        }
      },
      polling: {
        type: "boolean",
        default: false,
        options: { hidden: true }
      }
    }
  },

  output: {
    "row_column_created": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "Row Created",
    "sheet_id": 6616401013172100,
    "sheet_name": "Sales Sheet",
    "sheet_version": 70,
    "sheet_url": "https://app.smartsheet.com/b/home?lx=yI64dW_z1O44NTL0ELHWgg",
    "sheet_total_row_count": 5,
    "sheet_created_at": "2018-10-13T07:51:46Z",
    "sheet_modified_at": "2018-10-15T16:28:28Z",
    "event": [
      {
        "id": 3476941963544412,
        "sheetId": 6616401044172100,
        "rowNumber": 5,
        "siblingId": 7233380490209156,
        "version": 70,
        "permalink": "https://app.smartsheet.com/b/home?lx=AbkzMpk-xn0IlOeM2F7dHQ9Bqu46xiQ044Bnhrz4Kpo",
        "expanded": true,
        "accessLevel": "OWNER",
        "createdAt": "2016-10-15T16:28:28Z",
        "createdBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "modifiedAt": "2018-10-15T16:28:28Z",
        "modifiedBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "cells": [
          {
            "columnId": 4020300808513412,
            "value": "sales",
            "displayValue": "sales",
            "columnName": "Task Name"
          },
          {
            "columnId": 8523900435883908,
            "value": "2018-10-17",
            "columnName": "Due Date"
          },
          {
            "columnId": 361126111274884,
            "columnName": "Done"
          },
          {
            "columnId": 4864725738645380,
            "value": "johndoe@example.com",
            "displayValue": "John Doe",
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
            "value": "report is complete",
            "displayValue": "report is complete",
            "columnName": "Comments"
          }
        ]
      }
    ]
  },

  mock_input: { sheetID: "6616401013172100" },

  execute: function (input, payload, output) {

    if (payload && payload.events) {

      var obj = {}

      if (input.update_filter && input.update_filter.length > 0) {
        input.update_filter.forEach(element => {

          if (element.filter == "Row Created") {
            obj["row_created"] = true
          }
          else if (element.filter == "Column Created") {
            obj["column_created"] = true
          }
        })
      }
      else {
        obj["row_created"] = true,
          obj["column_created"] = true
      }

      let arr = payload.events.map(event => {


        if (event.objectType == "row" && event.eventType == "created" && Object.keys(obj).includes("row_created")) {

          return new Promise((resolve, reject) => {

            Promise.all([
              common.getSheet(input, payload.scopeObjectId), //sheet id
              common.getRow(input, payload.scopeObjectId, event.id) // sheet id and row id
            ])
              .then(values => {

                let sheet = values[0]
                let row = values[1]

                row.cells.map((cell, index) => {
                  cell.columnName = sheet.columns[index].title

                })

                let event = []

                event.push(row)

                let body = {
                  "event_type": "Row Created",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "event": event
                }
                resolve(body)
              })
              .catch(err => {
                reject(err)
              })
          })
        }

        if (event.objectType == "column" && event.eventType == "created" && Object.keys(obj).includes("column_created")) {

          return new Promise((resolve, reject) => {

            Promise.all([
              common.getSheet(input, payload.scopeObjectId), //sheet id
              common.getColumn(input, payload.scopeObjectId, event.id) // sheet id and row id
            ])
              .then(values => {

                let sheet = values[0]
                let column = values[1]

                let event = []

                event.push(column)

                let body = {
                  "event_type": "Column Created",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "event": event
                }
                resolve(body)
              })
              .catch(err => {
                reject(err)
              })
          })
        }
      })
      Promise.all(arr).then((arr) => {

        let final_arr = arr.filter(x => x)
        output(null, final_arr)
      })
        .catch(err => {
          output(err)
        })
    }
    else
      output(null, [])

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


