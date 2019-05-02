
var request = require("request");
var _ = require("lodash");
const P = require("bluebird");
var baseURL = "https://api.box.com/2.0/webhooks/";

var Event = {
  "file": ["TASK_ASSIGNMENT.UPDATED"],
  "folder": ["TASK_ASSIGNMENT.UPDATED"]
};

module.exports = {

  name: "task_completed",

  label: "Task Completed",

  version: "v6",

  input: {
    "type": "object",
    "title": "Task Completed",
    "description": "Short description",
    "properties": {
      "event": {
        "type": "string",
        "enum": ["task_completed"]
      },
      "polling": {
        "type": "boolean",
        "default": false,
        "options": {
          "hidden": true
        }
      },
      "file_id": {
        "title": "Folder/File ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the folder/file for which you want to set the trigger. In case you want to specify, enter the ID of the file or folder in the format ‘file/123’ and ‘folder/123’, respectively"
      }
    }
  },

  output: {
    "task_completed": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "Completed",
    "created_at": "2018-10-13T10:16:25.000Z",
    "trigger": "TASK_ASSIGNMENT.CREATED",
    "task_id": "44490123",
    "task_type": "task",
    "task_description": "New Task",
    "task_due_at": "2018-10-18T11:29:59-07:00",
    "task_is_completed": false,
    "task_action": "review",
    "creator_type": "user",
    "creator_id": "369855927",
    "creator_name": "John Smith",
    "creator_login": "john.smith@example.com",
    "creator_url": "https://app.box.com/profile/369855927",
    "source_id": "214321833",
    "source_type": "task_assignment",
    "source_message": "test",
    "source_completed_at": "2018-10-19T05:45:18.000Z",
    "source_assigned_at": "2018-10-13T03:16:25-07:00",
    "source_reminded_at": "2018-10-19T05:45:17.000Z",
    "source_resolution_state": "incomplete",
    "assigned_tor_type": "user",
    "assigned_to_id": "369855998",
    "assigned_to_name": "John Doe",
    "assigned_to_login": "john.doe@example.com",
    "assigned_to_url": "https://app.box.com/profile/369855998",
    "assigned_by_type": "user",
    "assigned_by_id": "369855927",
    "assigned_by_name": "John Smith",
    "assigned_by_login": "john.smith@example.com",
    "assigned_by_url": "https://app.box.com/profile/369855927",
    "item_type": "file",
    "item_id": "108840647268",
    "item_sequence_id": "1",
    "item_etag": "1",
    "item_sha1": "c7d9d1efdb158e392a7f108840647268a0a586f",
    "item_name": "Test.docx",
    "item_shared_url": "https://app.box.com/s/lllhug4d2dpnhxadw108840647268dywnz",
    "item_download_url": "https://app.box.com/shared/static/lllhug4d2dpnhxadw108840647268dywnz.docx",
    "item_url": "https://app.box.com/file/108840647268"
  }, // output of trigger data

  mock_input: {
    file_id: "file/334733711749"
  },

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : 'key', value : 'My Val'}])
    // output should be an array of objects or an empty array.

    // your code goes here

    try {
      if (input.file_id) {
        input.event = input.file_id.split("/")[0]
        input.file_id = input.file_id.split("/")[1]
      } else {
        output("Invalid input : Missing Folder/File ID")
      }
    } catch (e) {
      output("Invalid input format")
    }

    letsGetMoreInfo(input, payload, function (err, res) {
      if (!err && res) {
        output(null, res);
      } else
        output(null, []);
    });

  },

  register: function (input, output) {
    // function will be used for registering webhook with services additional key
    // 'webhook' along with input data will be available here so you can access the input.webhook
    // for registering the webhook
    try {
      if (input.file_id) {
        input.targetID = input.file_id.split("/")[1]
        input.type = input.file_id.split("/")[0]
      } else {
        output("Invalid input : Missing Folder/File ID")
      }
    } catch (e) {
      output("Invalid input format")
    }
    var event = Event[input.type];
    if (input.webhook.match("^http://")) {
      input.webhook = input.webhook.replace("http://", "https://")
    }
    var reqData = {
      "type": "webhook",
      "target": {
        "id": input.targetID
      },
      "address": input.webhook,
      "triggers": event
    };
    if (input.type === "folder") {
      reqData.target.type = "folder";
    } else {
      reqData.target.type = "file";
    }
    if (!(/^\d+$/).test(input.targetID)) {
      return output("Invalid value '" + input.targetID + "'. " + reqData.target.type + " with value '" + input.targetID + "' not found");
    }
    request({
      method: "POST",
      url: baseURL,
      headers: {
        Authorization: "Bearer " + input.auth.access_token
      },
      json: reqData
    }, function (err, res, body) {
      try {
        if (err) {
          return output(err);
        }
        try {
          if (body && typeof body === "string") {
            body = JSON.parse(body);
          }
        } catch (err) { 
          return output(err);
        }
        if (res.statusCode >= 200 && res.statusCode <= 204) {
          return output(null, body);

        } else if (res.statusCode >= 400 && res.statusCode <= 429) {
          if (res.statusCode == 401) {
            return output("invalid auth token");
          } else if (res.statusCode === 400) {
            if (!body) {
              return output("Invalid input provided");
            } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
              return output(body.context_info.errors[0].message);
            } else {
              return output(body.message || body.code);
            }
          } else if (res.statusCode === 403) {
            if (!body) {
              return output("You don't have permission to perform the event that the webhook observes");
            } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
              return output(body.context_info.errors[0].message);
            } else {
              return output(body.message || body.code);
            }
          } else if (res.statusCode === 409 && body.code === "conflict") {
            return output("Box does not allow using this trigger event in more than one workflow. Please delete this trigger from the other workflow to continue")
          } else {
            if (!body) {
              return output("Something went wrong, please try again");
            } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
              return output(body.context_info.errors[0].message);
            } else {
              return output(body.message || body.code);
            }
          }
        } else
          return output(body);

      } catch (e) {
        return output(e);
      }
    });


  },

  unregister: function (input, options, output) {
    // will be invoked when user deletes the trigger for unregistering the webhook
    // webhook id will be available in input.webhookId

    // your code goes here
    request({
      method: "DELETE",
      url: baseURL + input.webhookId,
      headers: {
        Authorization: "Bearer " + input.auth.access_token
      }
    }, function (err, res, body) {
      if (err) {
        return output(err);
      }
      if (res.statusCode >= 200 && res.statusCode < 500) {
        return output(null, "Webhook deleted successfully");
      } else
        return output(body);
    });
  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here

    output(null, true);
  }
}

function letsGetMoreInfo(input, data, cb) {
  if (Object.keys(data).length) {
    if (data.source && data.source.item && data.source.item.type)
      input.event = data.source.item.type
    _request(input, data, function (err, res) {
      if (!err && res) {
        cb(null, _output(input, res));
      } else {
        cb(err || "Unable to fetch the data")
      }
    });

  }
}

function _output(input, data) {
  try {

    if (data.task) {
      data = _.assign(data, formatData("task", data.task));
    }
    data.created_at = convertToISO(data.created_at);
    if (data.created_by && data.created_by.id)
      data.created_by.url = "https://app.box.com/profile/" + data.created_by.id
    data = _.assign(data, formatData("creator", data.created_by));
    if (data.source) {
      if (data.source.id && data.source.type)
      data = _.assign(data, formatData("source", data.source));
      if (data.source.modified_by)
        data = _.assign(data, formatData("modifier", data.source.modified_by));
      if (data.source.owned_by)
        data = _.assign(data, formatData("owner", data.source.owned_by));
      if (data.source && data.source.assigned_to){
        data.source.assigned_to.url="https://app.box.com/profile/" + data.source.assigned_to.id
        data = _.assign(data, formatData("assigned_to", data.source.assigned_to));
      }
      if (data.source && data.source.assigned_by){
        data.source.assigned_by.url="https://app.box.com/profile/" + data.source.assigned_by.id
        data = _.assign(data, formatData("assigned_by", data.source.assigned_by));
      }
      if (data.source.parent) {
        if (data.source.parent.id && data.source.parent.type)
          data.source.parent.url = "https://app.box.com/" + data.source.parent.type + "/" + data.source.parent.id
        data = _.assign(data, formatData("parent", data.source.parent));
      }

      if (data.source.item)
        data.source.item.shared_url = data.shared_url
      data.source.item.download_url = data.download_url
      delete data.shared_url
      delete data.download_url
      data.source.item.url = "https://app.box.com/" + data.source.item.type + "/" + data.source.item.id
      data = _.assign(data, formatData("item", data.source.item));

      if (data.source.created_at) {
        data.source_created_at = convertToISO(data.source.created_at);
      }

      if (data.source.trashed_at) {
        data.source_trashed_at = convertToISO(data.source.trashed_at);
      }
      if (data.source.purged_at) {
        data.source_purged_at = convertToISO(data.source.purged_at);
      }

      if (data.source.modified_at) {
        data.source_modified_at = convertToISO(data.source.modified_at);
      }

      if (data.source.content_created_at) {
        data.source_content_created_at = convertToISO(data.source.content_created_at);
      }

      if (data.source.content_modified_at) {
        data.source_content_modified_at = convertToISO(data.source.content_modified_at);
      }

      if (data.source.file_version)
        data.file_version_id = data.source.file_version.id;

      if (data.source.hasOwnProperty("is_reply_comment"))
        data.is_reply_comment = data.source.is_reply_comment;

      if (data.source.message)
        data.comment = data.source.message.replace("\n", "");

      if (data.source.path_collection) {
        data.source_root_level_count = data.source.path_collection.total_count;
        data.root_entries = data.source.path_collection.entries;
        var folder_path = "";
        for (var i = 0; i < data.root_entries.length; i++) {
          folder_path = folder_path + data.root_entries[i].name + "/";
        }
        data.folder_path = folder_path.trim() + (data.source_name || data.file_name || "");
      }
    }
    data = Object.assign({ "event_type": data.source_message }, data)

    delete data.task;
    delete data.additional_info;
    delete data.webhook;
    delete data.created_by;
    delete data.source;
    delete data.type;
    delete data.id;
    delete data.shared_link;
  } catch (e) {
    return data;
   }
  return data;
}

function _request(input, data, callback) {
  var option = {
    headers: {
      "Authorization": "Bearer " + input.auth.access_token,
      "Accept": "application/json"
    }
  };
  switch (input.event) {
    case "folder":
      option.url = "https://api.box.com/2.0/folders/" + String(data.source.item.id);
      break;
    case "file":
      option.url = "https://api.box.com/2.0/files/" + String(data.source.item.id);
      break;
    default:
      return callback(null, data);
  }

  var fileOption = {}
  fileOption.headers = option.headers
  fileOption.url = "https://api.box.com/2.0/files/" + (data.source && data.source.item && data.source.item.id) + "/tasks?fields=id,item,task_assignment_collection,message,due_at,is_completed,action"

  P.all([requestCall(option), requestCall(fileOption)])
    .spread((body, taskBody) => {

      switch (input.event) {
        case "folder":
          data.files_in_folders = [];
          for (var i = 0; i < body.item_collection.entries.length; i++) {
            if (body.item_collection.entries[i].type == "file")
              data.files_in_folders.push(body.item_collection.entries[i].name);
          }
          data.total_files_in_folder = data.files_in_folders && data.files_in_folders.length;
          data.shared_url = body.shared_link && body.shared_link.url;
          break;

        case "file":
          data.shared_url = body.shared_link && body.shared_link.url;
          data.download_url = body.shared_link && body.shared_link.download_url;
          break;
      }

      var destBody = taskBody && taskBody.entries.length > 0 && taskBody.entries.find(item => {
        let assignmentObj;
        assignmentObj = item && item.task_assignment_collection && item.task_assignment_collection.entries.length > 0 && item.task_assignment_collection.entries.find(item2 => {
          return item2.id == (data.source && data.source.id)
        })
        if (assignmentObj) {
          return true
        }
      })
      if (destBody) {
        data["task"] = {}
        data.task.id = destBody.id
        data.task.type = destBody.type
        data.task["description"] = destBody["message"]
        data.task.due_at = destBody.due_at
        data.task.is_completed = destBody.is_completed
        data.task.action = destBody.action
      }
      return callback(null, data);

    }).catch((err) => {
      return callback(err, null);
    })
}

function formatData(field, data) {
  var temp = {};
  for (var key in data) {
    if (typeof data[key] != "object" || data[key] == null) {
      temp[field + "_" + key] = data[key];
    }
  }
  return temp;
}

function convertToISO(date) {
  return new Date(date).toISOString();
}

function requestCall(options) {

  return new P(function (resolve, reject) {
    request(options, function (err, res, data) {
      if (err) {
        return reject(err);
      }
      try {
        if (data && typeof data === "string") {
          data = JSON.parse(data);
        }
      } catch (e) {
        return reject(data);
      }
      if (res && res.statusCode === 200) {
        return resolve(data);
      } else {
        return reject(data);
      }
    })
  })
}