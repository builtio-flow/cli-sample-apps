

const request = require("request")
const uuid = require("uuid");

module.exports = {

  name: "update_project",

  title: "Update Project",

  description: "",
  version: "v2",

  input: {
    title: "Update Project",
    type: "object",
    properties: {
      "projectid": {
        "type": "string",
        "minLength": 1,
        "title": "Project ID",
        "propertyOrder": 2,
        "description": "Select/Specify the Project ID for which you want to set a action."
      },
      "name": {
        "title": "Name",
        "type": "string",
        "description": "Enter project name",
        "propertyOrder": 3
      },
      "color": {
        "title": "Color Code",
        "type": "string",
        "description": "The color of the project a number between 0 and 11, or between 0 and 21 for premium users",
        "propertyOrder": 4
      },
      "indent": {
        "title": "Indent",
        "description": "Indent of the item (a number between 1 and 4, where 1 is top-level)",
        "type": "string",
        "propertyOrder": 5
      },
      "itemorder": {
        "title": "Item Order",
        "type": "string",
        "description": "Project’s order in the project list a number where the smallest value should place the project at the top",
        "propertyOrder": 6
      },
      "collapsed": {
        "title": "Collapsed",
        "type": "number",
        "description": "1 if the project should be collapsed, 0 if it should not be collapsed",
        "propertyOrder": 7,
        "enum": [
          0,
          1
        ]
      },
      "is_favorite": {
        "title": "Is Favoite ",
        "type": "string",
        "description": "Whether the project is favorite (where 1 is true and 0 is false)",
        "propertyOrder": 8,
        "enum": [
          "0",
          "1"
        ]
      }
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "sync_status": {
        "title": "sync_status",
        "type": "object",
        "displayTitle": "Sync Status",
        "properties": {
        }
      },
      "temp_id_mapping": {
        "title": "temp_id_mapping",
        "type": "object",
        "displayTitle": "Temp ID Mapping",
        "properties": {
        }
      },
      "full_sync": {
        "title": "full_sync",
        "type": "boolean",
        "displayTitle": "Full Sync"
      },
      "sync_token": {
        "title": "sync_token",
        "type": "string",
        "displayTitle": "Sync Token"
      }
    }
  },


  mock_input: {
    "projectid": "2201451439",
    "name": "WELCOME",
    "color": "3",
    "indent": "1",
    "itemorder": "3",
    "collapsed": 0,
    "is_favorite": "0",
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


    function frameParam(dest, src) {
      if (src) {
        return ',"' + dest + '":"' + src + '"';
      }
      else {
        return "";
      }
    }

    var arguments
    if (input.projectid) {
      arguments = '"id":"' + input.projectid + '"';
    }
    if (input.name) {
      arguments += frameParam("name", input.name);
    }
    if (input.color) {
      arguments += frameParam("color", input.color);
    }
    if (input.indent) {
      arguments += frameParam("indent", input.indent);
    }
    if (input.itemorder) {
      arguments += frameParam("item_order", input.itemorder);
    }
    if (input.collapsed) {
      arguments += frameParam("collapsed", input.collapsed);
    }
    if (input.is_favorite) {
      arguments += frameParam("is_favorite", input.is_favorite);
    }
    let randomid = uuid.v1()
    var option = {
      method: 'POST',
      url: "https://todoist.com/api/v7/sync",
      form: {
        'token': input.auth.access_token,
        'commands': '[{"type": "project_update", "uuid": "' + randomid + '", "args": {' + arguments + '}}]'
      }
    };
    add_project(option).then(res => {
      return output(null, res)
    }).catch(err => {
      return output(err, null)
    })
  }

}
