
const request = require("request")
const uuid = require("uuid");

module.exports = {

  name: "change_task_status_to_complete",

  title: "Change Task Status To Complete",

  description: "",
  version: "v2",

  input: {
    title: "Change Task Status To Complete",
    type: "object",
    properties: {
      "projectid": {
        "type": "string",
        "minLength": 1,
        "title": "Project ID",
        "propertyOrder": 2,
        "description": "Select/Specify the Project ID for which you want to set a action."
      },
      taskid: {
        type: "array",
        "minItems": 1,
        description: "Provides the list of the Task ID for which you want to set the action",
        propertyOrder: 2,
        title: "Task ID",
        "items": {
          "type": "object",
          "properties": {
            "filter": {
              "title": "Task ID",
              "type": "string",
              "minLength": 1,
              "description": "Select the name of the task for which you want to set the action",
              "lookup": {
                "id": "fetch__task_incompleted",
                "enabled": true,
                "searchable": true,
                "service": "cli-cl5989e1f98c0a62d727b3c2-1",
                "auth": "oauth",
                dependencies: [
                  "auth",
                  "projectid"
                ]
              }
            }
          }
        }
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
    projectid: "2201552858",
    taskid: [
      {
        "filter": "2962803784"
      },
      {
        "filter": "2201552858"
      }
    ]

  },

  execute: function (input, output) {
    function delete_project(options) {
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
    var task_comp_id = []
    if (input.taskid && input.taskid.length) {
      task_comp_id = input.taskid.map(curr => Number(curr.filter))
    }
    let randomid = uuid.v1()
    //   var arguments = '"ids":[' + task_comp_id + ']';
    var arguments = '"project_id":"' + input.projectid + '","ids":[' + task_comp_id + ']';

    var option = {
      method: 'POST',
      url: "https://todoist.com/api/v7/sync",
      form: {
        'token': input.auth.access_token,
        'commands': '[{"type": "item_complete", "uuid": "' + randomid + '", "args": {' + arguments + '}}]'
      }
    };

    delete_project(option).then(res => {
      return output(null, res)
    }).catch(err => {
      return output(err, null)
    })
  }

}
