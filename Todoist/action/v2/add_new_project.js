
const request = require("request")
const uuid = require("uuid");
module.exports = {

  name: "add_new_project",

  title: "Add New Project",

  description: "",
  version: "v2",

  input: {
    title: "Add New Project",
    type: "object",
    properties: {
      "name": {
        "type": "string",
        "minLength": 1,
        "title": "Project Name",
        "propertyOrder": 2,
        "description": "Select/Specify the Project Name for which you want to set a action."
      },
      "color": {
        "title": "Color Code",
        "type": "string",
        "description": "The color of the project a number between 0 and 11, or between 0 and 21 for premium users",
        "propertyOrder": 3
      },
      "indent": {
        "title": "Indent",
        "description": "Indent of the item (a number between 1 and 4, where 1 is top-level)",
        "type": "string",
        "propertyOrder": 14
      },
      "itemorder": {
        "title": "Item Order",
        "type": "string",
        "description": "Project’s order in the project list a number where the smallest value should place the project at the top",
        "propertyOrder": 5
      },
      "is_favorite": {
        "title": "Is Favoite ",
        "type": "string",
        "description": "Whether the project is favorite (where 1 is true and 0 is false)",
        "propertyOrder": 5
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
    name: "amish",
    color: "5",
    indent: "2",
    itemorder: "5",
    is_favorite: "1"
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
    if (input.name) {
      arguments = '"name":"' + input.name + '"';
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
    if (input.is_favorite) {
      arguments += frameParam("is_favorite", input.is_favorite);
    }
    let randomid = uuid.v1()
    var option = {
      method: 'POST',
      url: "https://todoist.com/api/v7/sync",
      form: {
        'token': input.auth.access_token,
        'commands': '[{"type": "project_add", "temp_id": "' + randomid + '", "uuid": "' + randomid + '", "args": {' + arguments + '}}]'
      }
    };
    add_project(option).then(res => {
      return output(null, res)
    }).catch(err => {
      return output(err, null)
    })
  }

}
