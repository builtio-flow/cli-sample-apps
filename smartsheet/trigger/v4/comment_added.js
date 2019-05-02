const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js")

module.exports = {

  name: "comment added",

  label: "Comment Added",

  version: "v4",

  input: {
    type: "object",
    title: "Comment Added",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["comment_added"],
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
    "comment_added": {
      "type": "object",
      "properties": {
      }
    }
  },

  mock_data: {
    "event_type": "Comment Added",
    "comment_on": "row",
    "comment_type": "new_comment",
    "comment": {
      "id": 6988289694554484,
      "discussionId": 614449225152132,
      "text": "Sales report need some changes",
      "createdBy": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "createdAt": "2016-10-19T13:31:14Z",
      "modifiedAt": "2016-10-19T13:31:14Z"
    },
    "sheet_id": 6616401443172100,
    "sheet_name": "Sales Report",
    "sheet_version": 140,
    "sheet_url": "https://app.smartsheet.com/b/home?lx=yI64dW_z1Ow55TL0ELHWgg",
    "sheet_total_row_count": 7,
    "sheet_created_at": "2016-10-13T07:51:46Z",
    "sheet_modified_at": "2016-10-19T13:31:14Z",
    "discussion": {
      "id": 614449645154432,
      "title": "Sales Report",
      "comments": [
        {
          "id": 6988289694558084,
          "text": "Sales report need some changes",
          "createdBy": {
            "name": "John Doe",
            "email": "johndoe@example.com"
          },
          "createdAt": "2016-10-19T13:31:14Z",
          "modifiedAt": "2016-10-19T13:31:14Z"
        }
      ],
      "commentCount": 1,
      "accessLevel": "OWNER",
      "parentType": "ROW",
      "parentId": 3476941962285412,
      "lastCommentedAt": "2016-10-19T13:31:14Z",
      "lastCommentedUser": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "createdBy": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    },
    "sheet_row": {
      "id": 3476941963585412,
      "sheetId": 6616401013172100,
      "rowNumber": 5,
      "siblingId": 7233380490209156,
      "version": 140,
      "permalink": "https://app.smartsheet.com/b/home?lx=AbkzMpk-xn0IlOeM2F7dHQ9Bqu46xiQ0J-Bnh444Kpo",
      "expanded": true,
      "accessLevel": "OWNER",
      "createdAt": "2018-10-15T16:28:28Z",
      "createdBy": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "modifiedAt": "2018-10-16T05:39:51Z",
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
          "columnId": 4864725738645380,
          "value": "johndoe@example.com",
          "displayValue": "John Doe",
          "columnName": "Assigned To"
        },
        {
          "columnId": 2612925924944132,
          "value": "Complete",
          "displayValue": "Complete",
          "columnName": "Status"
        },
        {
          "columnId": 7116525552334428,
          "value": "report is updated",
          "displayValue": "report is updated",
          "columnName": "Comments"
        }
      ]
    }
  },

  mock_input: { sheetID: "6616401013172100" },

  execute: function (input, payload, output) {

    let arr = []

    if (payload && payload.events) {
      let comment_type = null
      
      if(payload && payload.events.length == 2 && payload.events[0].objectType && payload.events[1].objectType
      && payload.events[0].eventType && payload.events[1].eventType){
        if (payload.events[0].objectType == "discussion" && payload.events[0].eventType == "created" 
          && payload.events[1].objectType == "comment" && payload.events[1].eventType == "created") {
          comment_type = "new_comment"
        }
        else if (payload.events[0].objectType == "discussion" && payload.events[0].eventType == "updated" 
        && payload.events[1].objectType == "comment" && payload.events[1].eventType == "created") {
          comment_type = "reply_to_comment"
        }
        else if (payload.events[0].objectType == "discussion" && payload.events[0].eventType == "updated" 
        && payload.events[1].objectType == "comment" && payload.events[1].eventType == "updated") {
          comment_type = "comment_updated"
        }
      }

      if (payload && payload.scopeObjectId && payload.events.length == 2 && comment_type) {

        Promise.all([
          common.getSheet(input, payload.scopeObjectId),
          common.getDiscussion(input, payload.scopeObjectId, payload.events[0].id),
          common.getComment(input, payload.scopeObjectId, payload.events[1].id)
        ])
          .then(values => {

            let sheet = values[0]
            let discussion = values[1]
            let comment = values[2]

            if (discussion.parentType == "ROW") {
              common.getRow(input, payload.scopeObjectId, discussion.parentId)
                .then(row => {
                  if (row) {

                    row.cells.map((cell, index) => {
                      cell.columnName = sheet.columns[index].title
                    })
                    let body = {
                      "event_type": "Comment Added",
                      "comment_on": "row",
                      "comment_type": comment_type,
                      "comment": comment,
                      "sheet_id": sheet.id,
                      "sheet_name": sheet.name,
                      "sheet_version": sheet.version,
                      "sheet_url": sheet.permalink,
                      "sheet_total_row_count": sheet.totalRowCount,
                      "sheet_created_at": sheet.createdAt,
                      "sheet_modified_at": sheet.modifiedAt,
                      "discussion": discussion,
                      "sheet_row": row
                    }
                    arr.push(body)

                    output(null, arr)
                  }
                })
                .catch(err => {
                  output(err)
                })
            }
            else if (discussion.parentType == "SHEET") {

              let body = {
                "event_type": "Comment Added",
                "comment_on": "sheet",
                "comment_type": comment_type,
                "comment": comment,
                "sheet_id": sheet.id,
                "sheet_name": sheet.name,
                "sheet_version": sheet.version,
                "sheet_url": sheet.permalink,
                "sheet_total_row_count": sheet.totalRowCount,
                "sheet_created_at": sheet.createdAt,
                "sheet_modified_at": sheet.modifiedAt,
                "discussion": discussion,
                "sheet_row": null
              }
              arr.push(body)

              output(null, arr)

            }
          })
          .catch(err => {
            output(err)
          })
      }
      else
        output(null, arr);
    }
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