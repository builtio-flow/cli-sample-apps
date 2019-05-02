const common = require("../../common")

module.exports = {

  name: "new_row_in_table",

  label: "New Row In Table",

  version: "v3",

  input: {
    type: "object",
    title: "New Row In Table",
    description: "Short description",
    properties: {
      "folderId": {
        "title": "Folder",
        "type": "string",
        "minLength": 1,
        "description": "Select/specify the ID of the folder for which you want to set the trigger",
        "propertyOrder": 2
      },
      "workbookId": {
        "title": "Workbook",
        "type": "string",
        "minLength": 1,
        "description": "Select/specify the ID of the workbook for which you want to set the trigger",
        "propertyOrder": 3
      },
      "tableName": {
        "title": "Table Name",
        "type": "string",
        "minLength": 1,
        "description": "Select/specify the name of the table for which you want to set the trigger",
        "propertyOrder": 4
      },
      event: {
        type: "string",
        enum: ["new_row_in_table"],
        scopes: ["Files.ReadWrite", "offline_access"],
        required_scopes: ["Files.ReadWrite", "offline_access"],
        isExecute: true
      },
      polling: {
        type: "boolean",
        default: true,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_row_in_table": {
      type: "object",
      properties:
      {
        "event_type": {
          "title": "event_type",
          "type": "string",
          "displayTitle": "Event Type"
        },
        "newValue": {
          "title": "newValue",
          "type": "object",
          "displayTitle": "Newvalue",
          "properties": {
            "Name": {
              "title": "Name",
              "type": "string",
              "displayTitle": "Newvalue Name"
            },
            "Designation": {
              "title": "Designation",
              "type": "string",
              "displayTitle": "Newvalue Designation"
            }
          }
        },
        "rowNumber": {
          "title": "rowNumber",
          "type": "number",
          "displayTitle": "Rownumber"
        },
        "tableName": {
          "title": "tableName",
          "type": "string",
          "displayTitle": "Tablename"
        },
        "workbookId": {
          "title": "workbookId",
          "type": "string",
          "displayTitle": "Workbookid"
        },
        "folderId": {
          "title": "folderId",
          "type": "string",
          "displayTitle": "Folderid"
        }
      }
    }
  },

  mock_data: {
    "event_type": "New Row In Table",
    "newValue": {
      "Name": "John Doe",
      "Designation": "Manager"
    },
    "rowNumber": 12,
    "tableName": "Quarter-1",
    "workbookUrl":"https://1drv.ms/x/s!AN-CjPe77559gQ4",
    "workbookName": "Sales Report.xlsx",
    "workbookCreatedBy": {
      "user": {
        "email": "johndoe@example.com",
        "id": "6fee1c8f-f7ad-439d-b044-da2ffae12b23",
        "displayName": "John Doe"
      }
    },
    "workbookLastModifiedBy": {
      "user": {
        "email": "ericdoe@example.com",
        "id": "6fee1c8f-f7ad-439d-b055-da2ffae12b23",
        "displayName": "Eric Doe"
      }
    },
    "folderId": "017OQVVFPPAS4D5KM665DZ7GH3YDMP2GGH"
  },

  mock_input: {},

  getUserData: function (input, options, output) {
    return output(null, []);
  },

  execute: function (input, options, output) {

    common.getWorkbook(input)
      .then(workbook => {
        common.getTableRowDetails(input)
          .then(newRowDetails => {
            if (newRowDetails && newRowDetails.values && Number.isInteger(newRowDetails.values.length) &&
              common.checkHeader(newRowDetails.values[1])) {

              if (newRowDetails.values.length > options.meta.oldRowLength) {

                let newRows = []

                for (var index = options.meta.oldRowLength; index < newRowDetails.values.length; index++) {
                  let new_value = {}
                  newRowDetails.values[0].forEach((key, i) => new_value[key] = newRowDetails.values[index][i])

                  let rowObj = {
                    event_type: "New Row In Table",
                    newValue: new_value,
                    rowNumber: index,
                    tableName: input.tableName,
                    workbookUrl: workbook.webUrl,
                    workbookName: workbook.name,
                    workbookCreatedBy: workbook.createdBy,
                    workbookLastModifiedBy: workbook.lastModifiedBy,
                    folderId: input.folderId
                  }
                  newRows.push(rowObj)
                }

                options.setMeta({
                  oldRowLength: newRowDetails.values.length
                })

                return output(null, newRows)
              }
              else
                return output(null, [])
            }
            else {
              return output("Please enter the values in the first row of the specified table of your Excel Online account.")
            }
          })
          .catch(err => {
            return output(err)
          })
      })
      .catch(err => {
        return output(err)
      })


  },

  activate: function (input, options, output) {

    this.validate(input, options, output)
  },

  validate: function (input, options, output) {

    common.folderValidation(input).then(folderValidation => {
      common.workbookValidation(input)
        .then(workbookValidation => {

          common.tableNameValidation(input).then(tableNameValidation => {

            common.getTableRowDetails(input)
              .then(tableRowDetails => {

                if (folderValidation && workbookValidation && tableNameValidation && tableRowDetails && folderValidation == "Folder ID is correct" && workbookValidation == "Workbook ID is correct" &&
                  tableNameValidation == "Table Name is correct" && common.checkHeader(tableRowDetails.values[1]) == false) {
                  output("Please enter the values in the first row of the specified table of your Excel Online account.")
                }
                else if (folderValidation && workbookValidation && tableNameValidation && tableRowDetails && folderValidation == "Folder ID is correct" && workbookValidation == "Workbook ID is correct" &&
                  tableNameValidation == "Table Name is correct" && common.checkHeader(tableRowDetails.values[1]) == true) {

                  options.setMeta({
                    oldRowLength: tableRowDetails.values.length
                  })

                  return output(null, true)

                }
              })
              .catch(error => {
                return output(error)
              })
          })
            .catch(err => {
              return output(err)
            })

        })
        .catch(_err => {
          return output(_err)
        })
    })
      .catch(err => {
        return output(err)
      })
  }
}