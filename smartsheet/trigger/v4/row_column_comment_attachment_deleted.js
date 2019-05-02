const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js")

module.exports = {

  name: "row_column_comment_attachment_deleted",

  label: "Row, Column, Comment and/or Attachment Deleted",

  version: "v4",

  input: {
    type: "object",
    title: "Row, Column, Comment and/or Attachment Deleted",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["row_column_comment_attachment_deleted"],
        scopes: ["READ_CONTACTS","READ_SHEETS","READ_SIGHTS","READ_USERS","ADMIN_WEBHOOKS"],
        required_scopes: ["READ_CONTACTS","READ_SHEETS","READ_SIGHTS","READ_USERS","ADMIN_WEBHOOKS"]
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
        maxItems:5,
        "items": {
          "type": "object",
          "properties": {
            "filter": {
              "title": "Filter Name",
              "type": "string",
              "description": "Select the type of the filter for which you want to set the trigger",
              "enum": [
                "Row Deleted",
                "Column Deleted",
                "Discussion Deleted",
                "Comment Deleted",
                "Attachment Deleted"
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
    "row_column_comment_attachment_deleted": {
      "type": "object",
      "properties": {
        "event_type": {
          "title": "event_type",
          "type": "string",
          "displayTitle": "Event Type"
        },
        "sheet_id": {
          "title": "sheet_id",
          "type": "string",
          "displayTitle": "Sheet ID"
        },
        "sheet_name": {
          "title": "sheet_name",
          "type": "string",
          "displayTitle": "Sheet Name"
        },
        "sheet_version": {
          "title": "sheet_version",
          "type": "string",
          "displayTitle": "Sheet Version"
        },
        "sheet_url": {
          "title": "sheet_url",
          "type": "string",
          "displayTitle": "Sheet URL"
        },
        "sheet_total_row_count": {
          "title": "sheet_total_row_count",
          "type": "string",
          "displayTitle": "Sheet Total Row Count"
        },
        "sheet_created_at": {
          "title": "sheet_created_at",
          "type": "string",
          "displayTitle": "Sheet Created At"
        },
        "sheet_modified_at": {
          "title": "sheet_modified_at",
          "type": "string",
          "displayTitle": "Sheet Modified At"
        },
        "user": {
          "title": "user",
          "type": "object",
          "displayTitle": "User",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "User ID"
            },
            "email": {
              "title": "email",
              "type": "string",
              "displayTitle": "User Email"
            },
            "firstName": {
              "title": "firstName",
              "type": "string",
              "displayTitle": "User Firstname"
            },
            "lastName": {
              "title": "lastName",
              "type": "string",
              "displayTitle": "User Lastname"
            }
          }
        }
      }
    }
  },

  mock_data: {
    "event_type": "Row Deleted",
    "sheet_id": "6616401013442100",
    "sheet_name": "Sales Sheet",
    "sheet_version": "51",
    "sheet_url": "https://app.smartsheet.com/b/home?lx=yI64dW_z1O44NTL0ELHWgg",
    "sheet_total_row_count": "0",
    "sheet_created_at": "2016-10-13T07:51:46Z",
    "sheet_modified_at": "2016-10-15T14:37:08Z",
    "user": {
      "id": "7349595383577740",
      "email": "johndoe@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  },

  mock_input: { sheetID: "6616401013172100" },

  execute: function (input, payload, output) {

    if (payload && payload.events) {

      var obj = {}

      if (input.update_filter && input.update_filter.length > 0) {
        input.update_filter.forEach(element => {

          if (element.filter == "Row Deleted") {
            obj["row_deleted"] = true
          }
          else if (element.filter == "Column Deleted") {
            obj["column_deleted"] = true
          }

          else if (element.filter == "Comment Deleted") {
            obj["comment_deleted"] = true
          }

          else if (element.filter == "Attachment Deleted") {
            obj["attachment_deleted"] = true
          }
          else if (element.filter == "Discussion Deleted") {
            obj["discussion_deleted"] = true
          }

        })
      }
      else {
        obj["row_deleted"] = true,
          obj["column_deleted"] = true,
          obj["comment_deleted"] = true,
          obj["attachment_deleted"] = true,
          obj["discussion_deleted"] = true
      }

      let arr = payload.events.map(event => {

        if (event.objectType == "row" && event.eventType == "deleted" && Object.keys(obj).includes("row_deleted")) {

          return new Promise((resolve, reject) => {
            common.getDetails(input, payload.scopeObjectId, event.userId, "Row Deleted")
              .then(response => {
                if (response) {
                  resolve(response)
                }
              }).catch(err => {
                reject(err)
              })
          })
        }

        if (event.objectType == "column" && event.eventType == "deleted" && Object.keys(obj).includes("column_deleted")) {

          return new Promise((resolve, reject) => {
            common.getDetails(input, payload.scopeObjectId, event.userId, "Column Deleted")
              .then(response => {
                if (response) {
                  resolve(response)
                }
              }).catch(err => {
                reject(err)
              })
          })
        }

        if (event.objectType == "attachment" && event.eventType == "deleted" && Object.keys(obj).includes("attachment_deleted")) {

          return new Promise((resolve, reject) => {
            common.getDetails(input, payload.scopeObjectId, event.userId, "Attachment Deleted")
              .then(response => {
                if (response) {
                  resolve(response)
                }
              }).catch(err => {
                reject(err)
              })
          })
        }

        if (event.objectType == "comment" && event.eventType == "deleted" && Object.keys(obj).includes("comment_deleted")) {

          return new Promise((resolve, reject) => {
            common.getDetails(input, payload.scopeObjectId, event.userId, "Comment Deleted")
              .then(response => {
                if (response) {
                  resolve(response)
                }
              }).catch(err => {
                reject(err)
              })
          })
        }

        if (event.objectType == "discussion" && event.eventType == "deleted" && Object.keys(obj).includes("discussion_deleted")) {

          return new Promise((resolve, reject) => {
            common.getDetails(input, payload.scopeObjectId, event.userId, "Discussion Deleted")
              .then(response => {
                if (response) {
                  resolve(response)
                }
              }).catch(err => {
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


