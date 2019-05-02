const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js")

module.exports = {

  name: "new_attachment",

  label: "New Attachment",

  version: "v4",

  input: {
    type: "object",
    title: "New Attachment",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["new_attachment"],
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
    "new_attachment": {
      "type": "object",
      "properties": {
      }
    }
  },

  mock_data: {
    "event_type": "New Attachment",
    "id": 3524917388961668,
    "name": "image.jpg",
    "url": "https://s3.amazonaws.com/SmartsheetB1/ddd666448b4544d2ae09daa883c1ba1d?response-content-disposition=attachment%3Bfilename%3D%22a.jpg%22%3Bfilename*%3DUTF-8%27%27a.jpg&Signature=6TDxelfOlocfFqj1Wc8hXbunuOc%3D&Expires=1539960587&AWSAccessKeyId=11950YFEZZJFSSKKB3G2",
    "attachmentType": "FILE",
    "mimeType": "image/jpeg",
    "urlExpiresInMillis": 120000,
    "sizeInKb": 335,
    "createdBy": {
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "createdAt": "2018-10-19T14:47:40Z",
    "sheet_info": {
      "id": 6616401013172100,
      "name": "Sales Report",
      "version": 154,
      "totalRowCount": 6,
      "accessLevel": "OWNER",
      "effectiveAttachmentOptions": [
        "GOOGLE_DRIVE",
        "EVERNOTE",
        "EGNYTE",
        "FILE",
        "ONEDRIVE",
        "BOX_COM",
        "DROPBOX"
      ],
      "ganttEnabled": false,
      "dependenciesEnabled": false,
      "resourceManagementEnabled": false,
      "cellImageUploadEnabled": true,
      "userSettings": {
        "criticalPathEnabled": false,
        "displaySummaryTasks": true
      },
      "permalink": "https://app.smartsheet.com/b/home?lx=yI64dW_z1OwVNTL0ELHWgg",
      "createdAt": "2018-10-13T07:51:46Z",
      "modifiedAt": "2018-10-19T14:47:42Z",
      "columns": [
        {
          "id": 4020300808513412,
          "version": 0,
          "index": 0,
          "title": "Task Name",
          "type": "TEXT_NUMBER",
          "primary": true,
          "validation": false,
          "width": 230
        },
        {
          "id": 8523900435883908,
          "version": 0,
          "index": 1,
          "title": "Due Date",
          "type": "DATE",
          "validation": false,
          "width": 80
        },
        {
          "id": 361126111274884,
          "version": 0,
          "index": 2,
          "title": "Done",
          "type": "CHECKBOX",
          "validation": true,
          "width": 55
        },
        {
          "id": 4864725738645380,
          "version": 0,
          "index": 3,
          "title": "Assigned To",
          "type": "CONTACT_LIST",
          "validation": false,
          "width": 125
        }
      ],
      "rows": [
        {
          "id": 3225420088797060,
          "rowNumber": 1,
          "expanded": true,
          "createdAt": "2018-10-15T15:39:58Z",
          "modifiedAt": "2018-10-17T05:08:46Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "Sales Report Updated",
              "displayValue": "Sales Report Updated"
            },
            {
              "columnId": 8523900435883908,
              "value": "2018-10-17"
            },
            {
              "columnId": 361126111274884
            },
            {
              "columnId": 4864725738645380,
              "value": "ericdoe@example.com",
              "displayValue": "Eric Doe"
            }
          ]
        },
        {
          "id": 3498700267906948,
          "rowNumber": 3,
          "siblingId": 3268726244042628,
          "expanded": true,
          "createdAt": "2018-10-15T16:06:55Z",
          "modifiedAt": "2018-10-17T05:57:55Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "updated",
              "displayValue": "updated"
            },
            {
              "columnId": 8523900435883908
            },
            {
              "columnId": 361126111274884
            },
            {
              "columnId": 4864725738645380
            }
          ]
        },
        {
          "id": 7233380490209156,
          "rowNumber": 4,
          "siblingId": 3498700267906948,
          "expanded": true,
          "createdAt": "2018-10-15T16:25:15Z",
          "modifiedAt": "2018-10-17T05:58:22Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "sales",
              "displayValue": "sales"
            },
            {
              "columnId": 8523900435883908,
              "value": "2018-10-17"
            },
            {
              "columnId": 361126111274884
            },
            {
              "columnId": 4864725738645380,
              "value": "johndoe@example.com",
              "displayValue": "John Doe"
            }
          ]
        },
        {
          "id": 3476941963585412,
          "rowNumber": 5,
          "siblingId": 7233380490209156,
          "expanded": true,
          "createdAt": "2018-10-15T16:28:28Z",
          "modifiedAt": "2018-10-16T05:39:51Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "sales",
              "displayValue": "sales"
            },
            {
              "columnId": 8523900435883908,
              "value": "2018-10-17"
            },
            {
              "columnId": 361126111274884,
              "value": true
            },
            {
              "columnId": 4864725738645380,
              "value": "johndoe@example.com",
              "displayValue": "John Doe"
            }
          ]
        },
        {
          "id": 5177078997903236,
          "rowNumber": 6,
          "siblingId": 3476941963585412,
          "expanded": true,
          "createdAt": "2018-10-15T16:52:15Z",
          "modifiedAt": "2018-10-17T05:58:33Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "Eric Doe",
              "displayValue": "Eric Doe"
            },
            {
              "columnId": 8523900435883908,
              "value": "2018-10-17"
            },
            {
              "columnId": 361126111274884
            },
            {
              "columnId": 4864725738645380
            }
          ]
        },
        {
          "id": 2237583516297092,
          "rowNumber": 7,
          "siblingId": 5177078997903236,
          "expanded": true,
          "createdAt": "2018-10-16T10:40:50Z",
          "modifiedAt": "2018-10-16T16:30:08Z",
          "cells": [
            {
              "columnId": 4020300808513412,
              "value": "updated",
              "displayValue": "updated"
            },
            {
              "columnId": 8523900435883908
            },
            {
              "columnId": 361126111274884
            },
            {
              "columnId": 4864725738645380
            }
          ]
        }
      ]
    }
  },

  mock_input: { sheetID: "6616401013172100" },

  execute: function (input, payload, output) {

    let arr = []

    if (payload && payload.events && payload.scopeObjectId) {
      let flag = 0, obj1 = null

      payload.events.map(event => {
        if (event.objectType == "attachment" && event.eventType == "created") {
          flag = 1
          obj1 = event
        }
      })

      if (flag == 1 && obj1 && obj1.id) {
        common.getAttachment(input, payload.scopeObjectId, obj1.id)
          .then(attachment => {

            if (attachment) {

              common.getSheet(input, payload.scopeObjectId)
                .then(sheet => {

                  if (sheet) {

                    let body = Object.assign({ event_type: "New Attachment" }, attachment, { sheet_info: sheet })

                    arr.push(body)

                    output(null, arr)
                  }

                })
                .catch(err => {
                  output(err)
                })
            }

          })
          .catch(err => {
            output(err)
          })
      }
      else
        output(null, []);
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
