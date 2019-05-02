

const request = require("request")
const uuid = require("uuid");

module.exports = {

  name: "add_new_task",

  title: "Add New Task",

  description: "",
  version: "v2",

  input: {
    title: "Add New Task",
    type: "object",
    properties: {
      "projectid": {
        "type": "string",
        "minLength": 1,
        "title": "Project ID",
        "propertyOrder": 2,
        "description": "Select/Specify the Project ID for which you want to set a action."
      },
      "Content": {
        "title": "Content",
        "type": "string",
        "minLength": 1,
        "description": "Enter task content",
        "propertyOrder": 3
      },
      "Priority": {
        "title": "Priority of the task",
        "description": "The priority of the task (a number between 1 and 4, 4 for very urgent and 1 for natural)",
        "type": "string",
        "propertyOrder": 4
      },
      "Indent": {
        "title": "Indent",
        "description": "Indent of the item (a number between 1 and 4, where 1 is top-level)",
        "type": "string",
        "propertyOrder": 5
      },
      "DateString": {
        "title": "Date",
        "description": "The date of the task, added in free form text, for example it can be every day @ 10",
        "type": "string",
        "propertyOrder": 6
      },
      "DateLang": {
        "title": "Date Language",
        "description": "language of the date of task",
        "type": "string",
        "propertyOrder": 7
      },
      "DueDateUtc": {
        "title": "Due Date in UTC",
        "description": "Should be formatted as YYYY-MM-DDTHH:MM, example: 2012-3-24T23:59. Value of due_date_utc must be in UTC. If you want to pass in due dates, note that date_string is required, while due_date_utc can be omitted. If date_string is provided, it will be parsed as local timestamp, and converted to UTC internally, according to the user’s profile settings",
        "type": "string",
        "propertyOrder": 8
      },
      "ItemOrder": {
        "title": "Item Order",
        "type": "string",
        "propertyOrder": 9
      },
      "Children": {
        "title": "Children",
        "description": "tasks child tasks, list of task ids such as [13134,232345]",
        "type": "string",
        "propertyOrder": 10
      },
      "Labels": {
        "title": "Labels",
        "description": "a list of label ids such as [2324,2525]",
        "type": "string",
        "propertyOrder": 11
      },
      "AssignedByUid": {
        "title": "Assigned By UserUid",
        "description": "The id of user who assigns current task. Makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will automatically be set up by your uid",
        "type": "string",
        "propertyOrder": 12
      },
      "ResponsibleUid": {
        "title": "Responsible UserUid",
        "description": "The id of user who is responsible for accomplishing the current task. Makes sense for shared projects only. Accepts 0 or any user id from the list of project collaborators. If this value is unset or invalid, it will automatically be set up by null",
        "type": "string",
        "propertyOrder": 13
      },
      "Note": {
        "title": "Note",
        "description": "Add a note directly to the task, note is a string of the content",
        "type": "string",
        "propertyOrder": 14
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
    "projectid": "2201552858",
    "Content": "CRION TEST",
    "Priority": "2",
    "Indent": "1",
    "DateString": "",
    "DateLang": "",
    "DueDateUtc": "",
    "ItemOrder": "",
    "Children": "",
    "Labels": "",
    "AssignedByUid": "",
    "ResponsibleUid": "",
    "Note": "",
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

    var arguments = '"content":"' + input.Content + '","project_id":"' + input.projectid + '"'
    arguments += frameParam("priority", input.Priority)
    arguments += frameParam("indent", input.Indent)
    arguments += frameParam("date_string", input.DateString)
    arguments += frameParam("date_lang", input.DateLang)
    arguments += frameParam("due_date_utc", input.DueDateUtc)
    arguments += frameParam("item_order", input.ItemOrder)
    arguments += frameParam("children", input.Children)
    arguments += frameParam("labels", input.Labels)
    arguments += frameParam("assigned_by_uid", input.AssignedByUid)
    arguments += frameParam("responsible_uid", input.ResponsibleUid)
    arguments += frameParam("note", input.Note);

    let randomid = uuid.v1()
    var option = {
      method: 'POST',
      url: "https://todoist.com/api/v7/sync",
      form: {
        'token': input.auth.access_token,
        'commands': '[{"type": "item_add", "temp_id": "' + randomid + '", "uuid": "' + randomid + '", "args": {' + arguments + '}}]'
      }
    };
    add_project(option).then(res => {
      return output(null, res)
    }).catch(err => {
      return output(err, null)
    })
  }

}
