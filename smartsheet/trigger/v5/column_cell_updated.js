const baseURL = "https://api.smartsheet.com/2.0/webhooks";
const request = require("request");
const common = require("../../common.js")

module.exports = {

  name: "column_cell_updated",

  label: "Column Cell Updated",

  version: "v4",

  input: {
    type: "object",
    title: "Column Cell Updated",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["column_cell_updated"],
        scopes: ["READ_SHEETS", "READ_USERS", "ADMIN_WEBHOOKS"],
        required_scopes: ["READ_SHEETS", "ADMIN_WEBHOOKS"]
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
      columns: {
        "title": "Columns",
        "type": "array",
        "description": "Provides the list of the column associated with the specified sheet. If any input is not specified in the below-associated fields, this trigger will run on any updated/cleared cell value of any column. This trigger does not run when a value is added to the empty cell of the column.",
        "minLength": 1,
        "propertyOrder": 3,
        "items": {
          "title": "Column Name",
          "type": "object",
          "properties": {
            "columnID": {
              "title": "Column Name",
              "type": "string",
              "minLength": 1,
              "description": "Select/specify the ID of the column for which you want to set the trigger. Say, you’ve selected ‘Column 1’ as column name and entered a text value ‘Demo’ in the ‘New Value’ field below, you’ll get notified whenever any user enters the defined column value in the specified ‘Column Name’ field of the sheet. Click <a href=\"https://flowdocs.built.io/services/smartsheet#how-column-cell-updated-trigger-works\">here</a> to know more.",
              "lookup": {
                "id": "column_list",
                "enabled": true,
                "service": "cli-cl5ad617ef4f499d40ca82dd-1",
                "auth": "oauth",
                "dependencies": [
                  "auth",
                  "sheetID"
                ]
              }
            },
            "columnValue": {
              "title": "New Value",
              "type": "string",
              "description": "Enter the value of the column for which you want to set the trigger. Specify the column values in their respective formats such as text/number for the name of the task, project, and the dropdown list, ‘yyyy-mm-dd’ format for date,  email ID or name to set the assignees/contacts, and ‘Checked’ and ‘Unchecked’ for the checkbox. If this field is kept empty, this trigger will check for any updated/cleared value in the specified column of the sheet. Click <a href=\"https://flowdocs.built.io/services/smartsheet#how-to-specify-the-input-in-the-new-value-field\">here</a> to know more."
            }
          }
        }
      },
    }
  },

  output: {
    "column_cell_updated": {
      "type": "object",
      "properties": {
      }
    }
  },

  mock_data: {
    "event_type": "Column Cell Updated",
    "sheet_id": 4772573952141188,
    "sheet_name": "Demo 1",
    "sheet_version": 48,
    "sheet_url": "https://app.smartsheet.com/sheets/J6Qj6jfRpVX6hVqfCJm6WQjmVvrPxWrrR7r7Hcp1",
    "sheet_total_row_count": 19,
    "sheet_created_at": "2019-01-11T06:55:14Z",
    "sheet_modified_at": "2019-01-18T13:00:34Z",
    "sheet_updated_cell": {
      "performed_action": "updated_value",
      "columnId": 1847930320643972,
      "columnName": "Assigned To",
      "new_value": "Eric Lobo",
      "old_value": "John Lobo",
      "modifiedBy": {
        "name": "John Lobo",
        "email": "johnlobo@example.com"
      },
      "modifiedAt": "2019-01-18T13:00:34Z"
    },
    "sheet_updated_row": {
      "id": 4395391070300036,
      "sheetId": 4772573952141188,
      "rowNumber": 3,
      "siblingId": 4849489372571524,
      "version": 48,
      "permalink": "https://app.smartsheet.com/sheets/J6Qj6jfRpVX6hVqfCJm6WQjmVvrPxWrrR7r7Hcp1?rowId=4395391070300036",
      "expanded": true,
      "accessLevel": "OWNER",
      "createdAt": "2019-01-16T06:12:10Z",
      "createdBy": {
        "name": "John Lobo",
        "email": "johnlobo@example.com"
      },
      "modifiedAt": "2019-01-18T13:00:34Z",
      "modifiedBy": {
        "name": "John Lobo",
        "email": "johnlobo@example.com"
      },
      "cells": {
        "Task Name": {
          "columnId": 5225630041171844,
          "value": "Sales Report",
          "displayValue": "Sales Report",
          "columnName": "Task Name"
        },
        "Due Date": {
          "columnId": 2973830227486596,
          "value": "2019-01-15",
          "columnName": "Due Date"
        },
        "Done": {
          "columnId": 7477429854857092,
          "columnName": "Done"
        }
      }
    }
  },

  mock_input: {
    sheetID: "6616401013172100",
    columns: [{ "columnID": "2612925924960132", "columnValue": "Progress" }]
  },

  execute: function (input, payload, output) {
    var isAllFlag = input.columns && input.columns.length > 0 ?
      input.columns.some(col => !col.columnID) : true

    let uniqueObj = {}

    let filteredColumns = input.columns.filter(col => {
      let key = col.columnID + col.columnValue
      if (!uniqueObj[key]) {
        uniqueObj[key] = true
        return true
      }
    })

    if (payload && payload.scopeObjectId && payload.events) {
      let arr = payload.events.map(event => {
        return new Promise((resolve, reject) => {
          if (event.objectType == "cell" && event.eventType == "updated" && input.columns) {
            if (isAllFlag) {
              CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
            } else {
              return Promise.all(filteredColumns.map(column => {
                return new Promise((resolve, reject) => {
                  if (!column.columnID) {
                    CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                  } else if (column.columnID == event.columnId) {
                    if (!column.columnValue) {
                      CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                    } else {
                      return Promise.all([
                        common.getColumn(input, payload.scopeObjectId, event.columnId),
                        common.getCellDetails(input, payload.scopeObjectId, event.rowId, event.columnId)
                      ]).then(data => {

                        let columnDetails = data[0]
                        let response = data[1]

                        if (!response && !response.data && response.data.length == 0) {
                          return reject("Invalid cell details received in the response")
                        } else if (
                          columnDetails && response.data[0].displayValue &&
                          columnDetails.type == "MULTI_CONTACT_LIST" ||
                          (columnDetails.type == "TEXT_NUMBER" && columnDetails.contactOptions)
                        ) {
                          let expectedContacts = column.columnValue.split(",")
                          let resContacts = response.data[0].displayValue.split(",")
                          if (
                            expectedContacts.length == resContacts.length &&
                            expectedContacts.filter(val => {
                              return resContacts.some(resContact => {
                                return isContactPresent(columnDetails.contactOptions, resContact, val)
                              })
                            }).length == expectedContacts.length
                          ) {
                            CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                          } else {
                            resolve()
                          }
                        } else if (
                          columnDetails && columnDetails.type == "CONTACT_LIST" &&
                          isContactPresent(
                            columnDetails.contactOptions, response.data[0].value, column.columnValue
                          )
                        ) {
                          CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                        } else if (
                          columnDetails && columnDetails.type == "CHECKBOX" &&
                          typeof response.data[0].value == "boolean" &&
                          (response.data[0].value.toString() == "true" ?
                            ["true", "check", "checked"] : ["false", "uncheck", "unchecked"])
                            .findIndex(val => val == column.columnValue.toLowerCase()) != -1
                        ) {
                          CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                        } else if (
                          columnDetails && columnDetails.type == "DATE" && response.data &&
                          response.data[0].value == column.columnValue
                        ) {
                          CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                        } else if (
                          response.data[0].displayValue &&
                          response.data[0].displayValue.toLowerCase() == column.columnValue.toLowerCase()
                        ) {
                          CellSchema(input, input.sheetID, event.rowId, event.columnId, resolve, reject)
                        } else {
                          resolve()
                        }
                      }).catch(err => {
                        reject(err)
                      })
                    }
                  } else {
                    resolve()
                  }
                })
              })).then(arr => {
                arr = arr.filter(val => val)
                resolve(arr.length > 0 ? arr[0] : "")
              }).catch(err => {
                reject(err)
              })
            }
          } else {
            resolve()
          }
        })
      })

      Promise.all(arr).then(cells => {
        output(null, cells.filter(cell => cell))
      }).catch(err => {
        output(err)
      })
    }
  },

  register: function (input, output) {
    common.fieldCellUpdatedValidation(input).then(response => {
      if (response == "valid") {
        common.webhookRegistration(input)
          .then(_response => {
            output(null, _response)
          })
          .catch(err => {
            output(err)
          })
      }
      else
        output("Error while registering webhook")
    }).catch((e) => {
      output(e)
    })
  },

  unregister: function (input, options, output) {
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
  },

  activate: function (input, options, output) {
    output(null, true);
  }
}

function isContactPresent(contactList, resContact, contact) {
  let matchContact = contactList && resContact &&
    contactList.find(option => {
      return (option.email && option.email.trim() == resContact.trim()) ||
        (option.name && option.name.trim() == resContact.trim())
    })


  return matchContact && contact &&
    ((matchContact.email && matchContact.email.toLowerCase().trim() == contact.toLowerCase().trim()) ||
      (matchContact.name.toLowerCase().trim() == contact.toLowerCase().trim()))

}

function CellSchema(input, sheetID, rowID, columnID, resoleCallback, rejectCallback) {
  return getUpdatedCellDetails(input, sheetID, rowID, columnID).then(cellDetails => {
    resoleCallback(cellDetails)
  }).catch(e => {
    rejectCallback(e)
  })
}

function getUpdatedCellDetails(input, sheetID, rowID, columnID) {
  return Promise.all([
    common.getSheet(input, sheetID),
    common.getRow(input, sheetID, rowID),
    common.getCellDetails(input, sheetID, rowID, columnID)
  ]).then(values => {
    let sheet = values[0]
    let row = values[1]
    let updatedCell = values[2]
    let UpdatedColumnName = null


    let rowCellObj = {}

    row.cells.map((cell, index) => {
      cell.columnName = sheet.columns[index].title
      if (updatedCell.data.length > 0 && updatedCell.data[0].columnId == cell.columnId) {
        UpdatedColumnName = cell.columnName
      }
      rowCellObj[cell.columnName] = cell
    })

    row.cells = rowCellObj

    let sheet_updated_cell = {
      "performed_action": "",
      "columnId": updatedCell.data[0].columnId,
      "columnName": UpdatedColumnName,
      "new_value": "",
      "old_value": "",
      "modifiedBy": updatedCell.data[0].modifiedBy,
      "modifiedAt": updatedCell.data[0].modifiedAt
    }

    if (updatedCell.data && updatedCell.data.length >= 1) {
      sheet_updated_cell.new_value = updatedCell.data[0].displayValue ||
        ((updatedCell.data[0].value === false || updatedCell.data[0].value) ? updatedCell.data[0].value.toString() : "")
    }

    if (updatedCell.data && updatedCell.data.length >= 2) {
      sheet_updated_cell.old_value = updatedCell.data[1].displayValue ||
        ((updatedCell.data[1].value === false || updatedCell.data[1].value) ? updatedCell.data[1].value.toString() : "")
    }

    if (sheet_updated_cell.new_value == "") {
      sheet_updated_cell.performed_action = "cleared_value"
    }
    else {
      sheet_updated_cell.performed_action = "updated_value"
    }

    let body = {
      "event_type": "Column Cell Updated",
      "sheet_id": sheet.id,
      "sheet_name": sheet.name,
      "sheet_version": sheet.version,
      "sheet_url": sheet.permalink,
      "sheet_total_row_count": sheet.totalRowCount,
      "sheet_created_at": sheet.createdAt,
      "sheet_modified_at": sheet.modifiedAt,
      "sheet_updated_cell": sheet_updated_cell,
      "sheet_updated_row": row
    }

    return body
  }).catch(err => {
    return err
  })
}