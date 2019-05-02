const common = require("../../common")
const lodash = require("lodash")

module.exports = {

  name: "new_sheet",

  label: "New Sheet",

  version: "v3",

  input: {
    type: "object",
    title: "New Sheet",
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
      event: {
        type: "string",
        enum: ["new_sheet"],
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
    "new_sheet": {
      type: "object",
      properties:
      {
        "event_type": {
          "title": "event_type",
          "type": "string",
          "displayTitle": "Event Type"
        },
        "@odata.id": {
          "title": "@odata.id",
          "type": "string",
          "displayTitle": "@ODATA.ID"
        },
        "name": {
          "title": "name",
          "type": "string",
          "displayTitle": "Name"
        },
        "id": {
          "title": "id",
          "type": "string",
          "displayTitle": "ID"
        },
        "position": {
          "title": "position",
          "type": "number",
          "displayTitle": "Position"
        },
        "visibility": {
          "title": "visibility",
          "type": "string",
          "displayTitle": "Visibility"
        },
        "folderId": {
          "title": "folderId",
          "type": "string",
          "displayTitle": "Folderid"
        },
        "workbookId": {
          "title": "workbookId",
          "type": "string",
          "displayTitle": "Workbookid"
        }
      }
    }
  },

  mock_data: {
    "event_type": "New Sheet",
    "@odata.id": "/users('6fee100f-f7ad-439d-b0aa-da2ffae12b23')/drive/items('017OQVV00FDTPEDQECQBE2ODL3H5PK5APQ')/workbook/worksheets(%27%7BAGGC41DC-9E84-4A8A-910F-41E3E4A35B5D%7D%27)",
    "name": "FY21 Forecast",
    "id": "{ABDC41DC-9E84-4A8A-910F-41E444A35B5D}",
    "position": 2,
    "visibility": "Visible",
    "folderId": "017OQVVFPPAS4D5KMJL5DZ22H3YDMP2GGH",
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
  },

  mock_input: { folderId: "017OQVVFN6Y2GOVW7725BZO354PWSELRRZ", workbookId: "017OQVVFPW2ITV36XOBRA2ZBVPHHI7JAXA" },

  getUserData: function (input, options, output) {
    return output(null, []);
  },

  execute: function (input, options, output) {

    common.getWorkbook(input)
      .then(workbook => {
        common.getExcelSheetDetails(input)
          .then(newExcelSheetDetails => {
            if (newExcelSheetDetails) {
              let difference = lodash.differenceBy(newExcelSheetDetails, options.meta.excelSheetIDs, "id")

              let excelSheetIDs = []

              newExcelSheetDetails.map(sheet => {
                excelSheetIDs.push({
                  "id": sheet.id
                })
              })

              options.setMeta({
                excelSheetIDs: excelSheetIDs
              })

              let differenceWithDetails = []
              difference.map(sheet => {
                differenceWithDetails.push(Object.assign({ "event_type": "New Sheet" }, sheet,
                  {
                    "folderId": input.folderId,
                    "workbookUrl": workbook.webUrl,
                    "workbookName": workbook.name,
                    "workbookCreatedBy": workbook.createdBy,
                    "workbookLastModifiedBy": workbook.lastModifiedBy,
                  }))
              })
              return output(null, differenceWithDetails)
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

    common.folderValidation(input).then(res => {
      common.workbookValidation(input)
        .then(_res => {
          common.getExcelSheetDetails(input)
            .then(excelSheetDetails => {
              if (res && _res && excelSheetDetails && res == "Folder ID is correct" && _res == "Workbook ID is correct") {
                let excelSheetIDs = []
                excelSheetDetails.map(sheet => {
                  excelSheetIDs.push({
                    "id": sheet.id
                  })
                }
                )
                options.setMeta({
                  excelSheetIDs: excelSheetIDs
                })
                return output(null, true)
              }
            })
            .catch(error => {
              return output(error)
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
