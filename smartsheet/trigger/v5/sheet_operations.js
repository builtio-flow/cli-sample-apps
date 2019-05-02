const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js");

module.exports = {

  name: "sheet_operations",

  label: "Sheet Operations",

  version: "v5",

  input: {
    type: "object",
    title: "Sheet Operations",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["sheet_operations"],
        scopes: ["READ_SHEETS", "READ_USERS", "ADMIN_WEBHOOKS"],
        required_scopes: ["READ_SHEETS", "READ_USERS", "ADMIN_WEBHOOKS"]
      },
      polling: {
        type: "boolean",
        default: false,
        options: {
          hidden: true
        }
      },
      sheetID: {
        type: "string",
        title: "Sheet",
        minLength: 1,
        propertyOrder: 2,
        description: "Select/specify the ID of the sheet for which you want to set the trigger"
      },
      "filter": {
        "type": "array",
        "title": "Event Types",
        "items": {
          "enum": [
            "New Row Created",
            "Row Updated",
            "Row Deleted",
            "New Column Created",
            "Column Deleted",
            "Comment Added",
            "Comment Deleted",
            "Attachment Added",
            "Attachment Deleted",
            "Discussion Deleted"
          ]
        },
        "minItems": 1,
        "format": "checkbox"
      }
    }
  },

  output: {
    "sheet_operations": {
      "type": "object",
      "properties": {
      }
    }
  },

  mock_data: {
    "event_type": "Row Updated",
    "sheet_id": 4772573952142288,
    "sheet_name": "Sales Report",
    "sheet_version": 21,
    "sheet_url": "https://app.smartsheet.com/sheets/J6Qj6jfRpVX6hVqfCJm6WQj55vrPxWrrR7r7Hcp1",
    "sheet_total_row_count": 10,
    "sheet_created_at": "2019-01-11T06:55:14Z",
    "sheet_modified_at": "2019-01-16T10:15:52Z",
    "event_generated_by": {
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "row_details": {
      "sheet_row": {
        "id": 3125180262441812,
        "sheetId": 4772544952141188,
        "rowNumber": 10,
        "siblingId": 6148045564713348,
        "version": 21,
        "permalink": "https://app.smartsheet.com/sheets/J6Qj6jfRpVX6hVqfCJm6WQjmVvrPx65rR7r7Hcp1?rowId=3125180262311812",
        "expanded": true,
        "accessLevel": "OWNER",
        "createdAt": "2019-01-16T06:53:11Z",
        "createdBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "modifiedAt": "2019-01-16T10:15:52Z",
        "modifiedBy": {
          "name": "Eric Doe",
          "email": "ericdoe@example.com"
        },
        "cells": {
          "Task Name": {
            "columnId": 5225630041171844,
            "value": "Sales Report Submission",
            "displayValue": "Sales Report Submission",
            "columnName": "Task Name"
          },
          "Due Date": {
            "columnId": 2973830227486596,
            "value": "2019-01-21",
            "displayValue": "2019-01-21",
            "columnName": "Due Date"
          },
          "Done": {
            "columnId": 7477429854857092,
            "value": true,
            "columnName": "Done"
          }
        }
      },
      "sheet_old_row": {
        "Task Name": {
          "columnId": 5225630041171844,
          "value": "Sales Operation",
          "displayValue": "Sales Operation",
          "columnName": "Task Name"
        }
      }
    },
    "column_details": {
      "id": 6577802314049412,
      "version": 0,
      "index": 6,
      "title": "Statistics",
      "type": "TEXT_NUMBER",
      "validation": false,
      "width": 150
    },
    "comment_details": {
      "comment_on": "row",
      "comment_type": "new_comment",
      "comment": {
        "id": 3380017993410436,
        "discussionId": 7982476158101380,
        "text": "Sales Report Analysis",
        "createdBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "createdAt": "2019-01-16T10:18:51Z",
        "modifiedAt": "2019-01-16T10:18:51Z"
      },
      "discussion": {
        "id": 7982476158101380,
        "title": "Sales Report Analysis",
        "comments": [
          {
            "id": 3380017993410436,
            "text": "Sales Report Analysis",
            "createdBy": {
              "name": "John Doe",
              "email": "johndoe@example.com"
            },
            "createdAt": "2019-01-16T10:18:51Z",
            "modifiedAt": "2019-01-16T10:18:51Z"
          }
        ],
        "commentCount": 1,
        "accessLevel": "OWNER",
        "parentType": "ROW",
        "parentId": 4849489372571524,
        "lastCommentedAt": "2019-01-16T10:18:51Z",
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
        "id": 4849489372571524,
        "sheetId": 4772573952141188,
        "rowNumber": 2,
        "siblingId": 8935174522070916,
        "version": 23,
        "permalink": "https://app.smartsheet.com/sheets/J6Qj6jfRpVX6hVqfCJm6WQjmVvrPxWrrR7r7Hcp1?rowId=4849489372571524",
        "expanded": true,
        "accessLevel": "OWNER",
        "createdAt": "2019-01-16T05:16:34Z",
        "createdBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "modifiedAt": "2019-01-16T05:17:20Z",
        "modifiedBy": {
          "name": "John Doe",
          "email": "johndoe@example.com"
        },
        "cells": {
          "Task Name": {
            "columnId": 5225630041171844,
            "value": "Sales Report Submission",
            "displayValue": "Sales Report Submission",
            "columnName": "Task Name"
          },
          "Due Date": {
            "columnId": 2973830227486596,
            "value": "2019-01-21",
            "displayValue": "2019-01-21",
            "columnName": "Due Date"
          },
          "Done": {
            "columnId": 7477429854857092,
            "value": true,
            "columnName": "Done"
          }
        }
      }
    },
    "attachment_details": {
      "id": 3705482796918660,
      "name": "sales_statistics.pdf",
      "url": "https://s3.amazonaws.com/SmartsheetB1/78f8d7c43a3641a8965ea211e4325879?response-content-disposition=attachment%3Bfilename%3D%22sales_statistics.pdf%22%3Bfilename*%3DUTF-8%27%27pdf-test.pdf&Signature=H11DYNuXVuFOSOu0DpQcomwVkqU%3D&Expires=1547634256&AWSAccessKeyId=11950YFEZZJFSSKKB3G2",
      "attachmentType": "FILE",
      "mimeType": "application/pdf",
      "urlExpiresInMillis": 120000,
      "sizeInKb": 21,
      "createdBy": {
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "createdAt": "2019-01-16T10:22:09Z"
    }
  },

  mock_input: {},

  execute: function (input, payload, output) {

    if (payload && payload.events && payload.events.length > 0 && input.filter.indexOf("Comment Added") >= 0) {
      let comment_type = null, commentArr = []

      if (payload && payload.events.length == 2 && payload.events[0].objectType && payload.events[1].objectType
        && payload.events[0].eventType && payload.events[1].eventType) {
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

        return Promise.all([
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

                    let rowCellObj = {}

                    row.cells.map((cell, index) => {
                      cell.columnName = sheet.columns[index].title
                      rowCellObj[cell.columnName] = cell
                    })

                    row.cells = rowCellObj

                    let body = {
                      "event_type": "Comment Added",
                      "sheet_id": sheet.id,
                      "sheet_name": sheet.name,
                      "sheet_version": sheet.version,
                      "sheet_url": sheet.permalink,
                      "sheet_total_row_count": sheet.totalRowCount,
                      "sheet_created_at": sheet.createdAt,
                      "sheet_modified_at": sheet.modifiedAt,
                      "event_generated_by": comment.createdBy,
                      "row_details": null,
                      "column_details": null,
                      "comment_details": {
                        "comment_on": "row",
                        "comment_type": comment_type,
                        "comment": comment,
                        "discussion": discussion,
                        "sheet_row": row
                      },
                      "attachment_details": null
                    }

                    commentArr.push(body)

                    return output(null, commentArr)
                  }
                })
                .catch(err => {
                  return output(err)
                })
            }
            else if (discussion.parentType == "SHEET") {

              let body = {
                "event_type": "Comment Added",
                "sheet_id": sheet.id,
                "sheet_name": sheet.name,
                "sheet_version": sheet.version,
                "sheet_url": sheet.permalink,
                "sheet_total_row_count": sheet.totalRowCount,
                "sheet_created_at": sheet.createdAt,
                "sheet_modified_at": sheet.modifiedAt,
                "event_generated_by": comment.createdBy,
                "row_details": null,
                "column_details": null,
                "comment_details": {
                  "comment_on": "sheet",
                  "comment_type": comment_type,
                  "comment": comment,
                  "discussion": discussion,
                  "sheet_row": null
                },
                "attachment_details": null
              }

              commentArr.push(body)

              return output(null, commentArr)

            }
          })
          .catch(err => {
            return output(err)
          })
      }
    }

    if (payload && payload.events && payload.events.length > 0) {

      let outputArr = payload.events.map(event => {

        if (payload.events[0].objectType == "sheet" && payload.events[0].eventType == "updated" &&
          event.objectType == "row" && event.eventType == "updated" && input.filter.indexOf("Row Updated") >= 0) {

          return new Promise((resolve, reject) => {

            return Promise.all([
              common.getSheet(input, payload.scopeObjectId),
              common.getRow(input, payload.scopeObjectId, event.id),
              common.getOldRow(input, payload.scopeObjectId, event.id)
            ])
              .then(values => {

                let sheet = values[0]
                let row = values[1]
                let oldRow = values[2]


                let rowCellObj = {}, oldRowObj = {}

                row.cells.map((cell, index) => {
                  cell.columnName = sheet.columns[index].title

                  oldRow.map(column => {
                    if (cell.columnId == column.columnId) {
                      column.columnName = cell.columnName
                      oldRowObj[column.columnName] = column

                      delete oldRowObj[column.columnName].modifiedAt
                      delete oldRowObj[column.columnName].modifiedBy

                    }
                  })
                  rowCellObj[cell.columnName] = cell
                })

                row.cells = rowCellObj

                let body = {
                  "event_type": "Row Updated",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "event_generated_by": row.modifiedBy,
                  "row_details": {
                    "sheet_row": row,
                    "sheet_old_row": oldRowObj
                  },
                  "column_details": null,
                  "comment_details": null,
                  "attachment_details": null
                }
                return resolve(body)
              })
              .catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "row" && event.eventType == "created" && input.filter.indexOf("New Row Created") >= 0) {

          return new Promise((resolve, reject) => {

            return Promise.all([
              common.getSheet(input, payload.scopeObjectId), //sheet id
              common.getRow(input, payload.scopeObjectId, event.id), // sheet id and row id
            ])
              .then(values => {

                let sheet = values[0]
                let row = values[1]

                let rowCellObj = {}

                row.cells.map((cell, index) => {
                  cell.columnName = sheet.columns[index].title
                  rowCellObj[cell.columnName] = cell
                })

                row.cells = rowCellObj

                let body = {
                  "event_type": "New Row Created",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "event_generated_by": row.createdBy,
                  "row_details": {
                    "sheet_row": row,
                    "sheet_old_row": null
                  },
                  "column_details": null,
                  "comment_details": null,
                  "attachment_details": null
                }
                return resolve(body)
              })
              .catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "column" && event.eventType == "created" && input.filter.indexOf("New Column Created") >= 0) {

          return new Promise((resolve, reject) => {

            return Promise.all([
              common.getSheet(input, payload.scopeObjectId), //sheet id
              common.getColumn(input, payload.scopeObjectId, event.id), // sheet id and row id
              common.getUserDetails(input, event.userId)
            ])
              .then(values => {

                let sheet = values[0]
                let column = values[1]
                let user = values[2]

                let body = {
                  "event_type": "New Column Created",
                  "sheet_id": sheet.id,
                  "sheet_name": sheet.name,
                  "sheet_version": sheet.version,
                  "sheet_url": sheet.permalink,
                  "sheet_total_row_count": sheet.totalRowCount,
                  "sheet_created_at": sheet.createdAt,
                  "sheet_modified_at": sheet.modifiedAt,
                  "event_generated_by": user,
                  "row_details": null,
                  "column_details": column,
                  "comment_details": null,
                  "attachment_details": null
                }
                return resolve(body)
              })
              .catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "row" && event.eventType == "deleted" && input.filter.indexOf("Row Deleted") >= 0) {

          return new Promise((resolve, reject) => {
            return common.getDetails(input, payload.scopeObjectId, event.userId, "Row Deleted")
              .then(response => {
                if (response) {

                  return resolve(response)
                }
              }).catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "column" && event.eventType == "deleted" && input.filter.indexOf("Column Deleted") >= 0) {

          return new Promise((resolve, reject) => {
            return common.getDetails(input, payload.scopeObjectId, event.userId, "Column Deleted")
              .then(response => {
                if (response) {
                  return resolve(response)
                }
              }).catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "attachment" && event.eventType == "deleted" && input.filter.indexOf("Attachment Deleted") >= 0) {

          return new Promise((resolve, reject) => {
            return common.getDetails(input, payload.scopeObjectId, event.userId, "Attachment Deleted")
              .then(response => {
                if (response) {
                  return resolve(response)
                }
              }).catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "comment" && event.eventType == "deleted" && input.filter.indexOf("Comment Deleted") >= 0) {

          return new Promise((resolve, reject) => {
            return common.getDetails(input, payload.scopeObjectId, event.userId, "Comment Deleted")
              .then(response => {
                if (response) {
                  return resolve(response)
                }
              }).catch(err => {
                return reject(err)
              })
          })
        }

        if (event.objectType == "discussion" && event.eventType == "deleted" && input.filter.indexOf("Discussion Deleted") >= 0) {

          return new Promise((resolve, reject) => {
            return common.getDetails(input, payload.scopeObjectId, event.userId, "Discussion Deleted")
              .then(response => {
                if (response) {
                  return resolve(response)
                }
              }).catch(err => {
                return reject(err)
              })
          })
        }

        if (input.filter.indexOf("Attachment Added") >= 0 && payload.scopeObjectId && event.objectType == "attachment" && event.eventType == "created") {

          return new Promise((resolve, reject) => {
            return Promise.all([common.getAttachment(input, payload.scopeObjectId, event.id),
            common.getSheet(input, payload.scopeObjectId)
            ])
              .then(values => {
                let attachment = values[0], sheet = values[1]
                if (attachment && sheet) {

                  let body = {
                    "event_type": "Attachment Added",
                    "sheet_id": sheet.id,
                    "sheet_name": sheet.name,
                    "sheet_version": sheet.version,
                    "sheet_url": sheet.permalink,
                    "sheet_total_row_count": sheet.totalRowCount,
                    "sheet_created_at": sheet.createdAt,
                    "sheet_modified_at": sheet.modifiedAt,
                    "event_generated_by": attachment.createdBy,
                    "row_details": null,
                    "column_details": null,
                    "comment_details": null,
                    "attachment_details": attachment
                  }
                  return resolve(body)
                }
              })
              .catch(err => {
                return reject(err)
              })
          })
        }
      })

      Promise.all(outputArr).then((outputArr) => {
        let final_arr = outputArr.filter(x => x)
        output(null, final_arr)
      })
        .catch(err => {
          output(err)
        })
    }
    else {
      output(null, [])
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