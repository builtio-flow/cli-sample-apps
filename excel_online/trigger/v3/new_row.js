const common = require("../../common")

module.exports = {

  name: "new_row",

  label: "New Row",

  version: "v3",

  input: {
    type: "object",
    title: "New Row",
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
      "sheetName": {
        "title": "Sheet Name",
        "type": "string",
        "minLength": 1,
        "description": "Select/specify the name of the sheet for which you want to set the trigger",
        "propertyOrder": 4
      },
      event: {
        type: "string",
        enum: ["new_row"],
        scopes: ["Files.Read.All", "offline_access"],
        required_scopes: ["Files.Read.All", "offline_access"],
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
    "new_row": {
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
        "sheetName": {
          "title": "sheetName",
          "type": "string",
          "displayTitle": "Sheetname"
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
    "event_type": "New Row",
    "newValue": {
      "Name": "John Doe",
      "Designation": "Manager"
    },
    "rowNumber": 10,
    "sheetName": "Quarter-1",
    "workbookUrl": "https://1drv.ms/x/s!AN-CjPe77559gQ4",
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
    "folderId": "017OQVVFPPAS4D5KMJL5447GH3YDMP2GGH"
  },

  mock_input: {},

  getUserData: function (input, options, output) {
    return output(null, []);
  },

  execute: function (input, options, output) {

    common.getWorkbook(input)
      .then(workbook => {
        common.getRowDetails(input)
          .then(newRowDetails => {

            if (newRowDetails && newRowDetails.values && Number.isInteger(newRowDetails.values.length) && newRowDetails.rowIndex == 0 && newRowDetails.columnIndex == 0) {
              if (common.checkHeader(newRowDetails.values[0])) {
                if (newRowDetails.values.length > options.meta.oldRowLength) {

                  let newRows = []

                  for (var index = options.meta.oldRowLength; index < newRowDetails.values.length; index++) {
                    let new_value = {}
                    newRowDetails.values[0].forEach((key, i) => new_value[key] = newRowDetails.values[index][i])

                    let rowObj = {
                      event_type: "New Row",
                      newValue: new_value,
                      rowNumber: newRowDetails.rowIndex + index + 1,
                      sheetName: input.sheetName,
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
                return output("There is an empty header field in the specified sheet of your Excel Online account. Please add the header value.", null)
              }
            }
            else
              return output("No headers found. In Excel Online, the values in the first row are considered as headers.", null)
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
      common.workbookValidation(input).then(workbookValidation => {
        common.sheetNameValidation(input).then(sheetNameValidation => {
          common.getRowDetails(input).then(rowDetails => {

            if (folderValidation && workbookValidation && sheetNameValidation && rowDetails && folderValidation == "Folder ID is correct" && workbookValidation == "Workbook ID is correct" &&
              sheetNameValidation == "Sheet Name is correct" && rowDetails.rowIndex != 0 && rowDetails.columnIndex != 0) {
              return output("No headers found. In Excel Online, the values in the first row are considered as headers.")
            }
            else if (folderValidation && sheetNameValidation && workbookValidation && rowDetails && folderValidation == "Folder ID is correct" && workbookValidation == "Workbook ID is correct" &&
              sheetNameValidation == "Sheet Name is correct" && rowDetails.rowIndex == 0 && rowDetails.columnIndex == 0
              && common.checkHeader(rowDetails.values[0]) == false) {
              return output("There is an empty header field in the specified sheet of your Excel Online account. Please add the header value.")
            }
            else if (folderValidation && workbookValidation && sheetNameValidation && rowDetails && folderValidation == "Folder ID is correct" && workbookValidation == "Workbook ID is correct" &&
              sheetNameValidation == "Sheet Name is correct" && rowDetails.rowIndex == 0 && rowDetails.columnIndex == 0
              && common.checkHeader(rowDetails.values[0]) == true) {


              options.setMeta({
                oldRowLength: rowDetails.values.length
              })

              return output(null, true)

            }
          })
            .catch(error => {
              return output(error)
            })
        })
          .catch(__err => {
            return output(__err)
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
