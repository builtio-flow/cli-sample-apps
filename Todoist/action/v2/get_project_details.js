
const request = require("request")

module.exports = {

  name: "get_project_details",

  title: "Get Project Details",

  description: "",
  version: "v2",

  input: {
    title: "Get Project Details",
    type: "object",
    properties: {
      "projectid": {
        "type": "string",
        "minLength": 1,
        "title": "Project ID",
        "propertyOrder": 2,
        "description": "Select/Specify the Project ID for which you want to set a action."
      },
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "name",
        "displayTitle": "Project Name"
      },
      "color": {
        "type": "integer",
        "title": "color",
        "displayTitle": "Color"
      },
      "is_deleted": {
        "type": "integer",
        "title": "is_deleted",
        "displayTitle": "Is Deleted"
      },
      "collapsed": {
        "type": "integer",
        "title": "collapsed",
        "displayTitle": "Collapsed"
      },
      "id": {
        "type": "integer",
        "title": "id",
        "displayTitle": "Project ID"
      },
      "parent_id": {
        "type": "null",
        "title": "parent_id",
        "displayTitle": "Parent ID"
      },
      "item_order": {
        "type": "integer",
        "title": "item_order",
        "displayTitle": "Item Order"
      },
      "indent": {
        "type": "integer",
        "title": "indent",
        "displayTitle": "Indent"
      },
      "shared": {
        "type": "boolean",
        "title": "shared",
        "displayTitle": "Is Shared"
      },
      "is_archived": {
        "type": "integer",
        "title": "is_archived",
        "displayTitle": "Is Archived"
      },
      "notes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "is_deleted": {
              "type": "integer",
              "title": "is_deleted",
              "displayTitle": "Is Note Deleted"
            },
            "is_archived": {
              "type": "integer",
              "title": "is_archived",
              "displayTitle": "Is Note Archived"
            },
            "file_attachment": {
              "type": "null",
              "title": "file_attachment",
              "displayTitle": "File Attachment"
            },
            "content": {
              "type": "string",
              "title": "content",
              "displayTitle": "Note Content"
            },
            "posted_uid": {
              "type": "integer",
              "title": "posted_uid",
              "displayTitle": "Posted Unique ID"
            },
            "uids_to_notify": {
              "type": "null",
              "title": "uids_to_notify",
              "displayTitle": "Unique ID to Notify"
            },
            "project_id": {
              "type": "integer",
              "title": "project_id",
              "displayTitle": "Project ID"
            },
            "id": {
              "type": "integer",
              "title": "id",
              "displayTitle": "Note ID"
            },
            "posted": {
              "type": "string",
              "title": "posted",
              "displayTitle": "Note Posted Date"
            }
          }
        }
      }
    }
  },

  mock_input: {
    "projectid": "2201552858"
  },

  execute: function (input, output) {
    function add_project(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, resp, body) {
          if (error) {
            reject(error)
          }
          try {
            body = (typeof body === "string") ? JSON.parse(body) : body
          } catch (error) {
            reject(error)
          }

          if (resp.statusCode && resp.statusCode >= 200 && resp.statusCode < 400) {
            resolve(body)
          }
          else if (resp.statusCode == 400) {
            reject("Bad Request")
          } else if (resp.statusCode == 401) {
            reject("Authorization Error")
          } else if (resp.statusCode == 403) {
            reject("Forbidden Error")
          } else if (resp.statusCode == 404) {
            reject("Resource not found")
          } else if (resp.statusCode > 400 && resp.statusCode < 500) {
            reject("Unauthorized request sent by client")
          } else if (resp.statusCode == 500) {
            reject("Internal Server Error")
          } else if (resp.statusCode == 503) {
            reject("Service Unavialble Error")
          } else if (resp.statusCode == 504) {
            reject("Request Timeout Error")
          } else if (resp.statusCode > 500) {
            reject("Client Server Encountered an Error")
          } else {
            reject("Undefiend error please contact support team")
          }
        })
      })
    }

    var option = {
      method: 'POST',
      url: "https://todoist.com/API/v7/projects/get",
      form: {
        'token': input.auth.access_token,
        'project_id': input.projectid
      }
    };
    add_project(option).then(res => {
      return output(null, res)
    }).catch(err => {
      return output(err, null)
    })
  }


}
