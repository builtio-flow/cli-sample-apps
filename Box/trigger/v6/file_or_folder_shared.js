var request = require("request");
var _ = require("lodash");
var baseURL = "https://api.box.com/2.0/webhooks/";

var Event = {
  "file": ["SHARED_LINK.CREATED"],
  "folder": ["SHARED_LINK.CREATED"]
};

module.exports = {

  name: "file_or_folder_shared",

  label: "File or Folder Shared",

  version: "v6",

  input: {
    "type": "object",
    "title": "File or Folder Shared",
    "description": "Short description",
    "properties": {
      "event": {
        "type": "string",
        "enum": ["file_or_folder_shared"]
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
    "file_or_folder_shared": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "File or Folder Shared",
    "created_at": "2018-08-09T08:57:45.000Z",
    "trigger": "SHARED_LINK.CREATED",
    "additional_info": [],
    "creator_type": "user",
    "creator_id": "369855927",
    "creator_name": "John Smith",
    "creator_login": "john.smith@example.com",
    "creator_url": "https://app.box.com/profile/369855927",
    "source_trigger_type": "shared",
    "source_url": "https://app.box.com/s/108840647268",
    "source_download_url": "https://app.box.com/shared/static/108840647268.docx",
    "source_vanity_url": "https://app.box.com/s/108840647268",
    "source_effective_access": "open",
    "source_effective_permission": "can_download",
    "source_is_password_enabled": false,
    "source_unshared_at": "2018-08-09T05:45:17.000Z",
    "source_download_count": 0,
    "source_preview_count": 0,
    "source_access": "open",
    "source_id": "108840647268",
    "source_type": "file",
    "source_sequence_id": "0",
    "source_etag": "0",
    "source_name": "Test",
    "source_created_at": "2018-10-19T06:51:02-07:00",
    "source_modified_at": "2018-10-19T06:51:02-07:00",
    "source_description": "New folder for testing",
    "source_size": 0,
    "source_trashed_at": "2018-10-19T07:51:02-07:00",
    "source_purged_at": "2018-10-19T07:51:02-07:00",
    "source_content_created_at": "2018-10-19T06:51:02-07:00",
    "source_content_modified_at": "2018-10-19T06:51:02-07:00",
    "source_item_status": "active"
  }
  , // output of trigger data

  mock_input: {
    file_id: "folder/52043612732"
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

    data.created_at = convertToISO(data.created_at);
    if (data.created_by && data.created_by.id)
      data.created_by.url = "https://app.box.com/profile/" + data.created_by.id
    data = _.assign(data, formatData("creator", data.created_by));
    if (data.source) {
      if (data.source.type){
        data.source.trigger_typ=data.source.type
        delete data.source.type
      }

      data = _.assign(data, formatData("source", data.source));
      if (data.source.modified_by)
        data = _.assign(data, formatData("modifier", data.source.modified_by));
      if (data.source.owned_by)
        data = _.assign(data, formatData("owner", data.source.owned_by));
      if (data.source.parent) {
        if (data.source.parent.id && data.source.parent.type)
          data.source.parent.url = "https://app.box.com/" + data.source.parent.type + "/" + data.source.parent.id
        data = _.assign(data, formatData("parent", data.source.parent));
      }

      if (data.source.item)
        data = _.assign(data, formatData("source", data.source.item));

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
    data = Object.assign({ "event_type": "File or Folder Shared" }, data)

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
  try {
    request(option, function (err, response, body) {
      if (!err && response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
        try {
          if (body && typeof body === "string") {
            body = JSON.parse(body);
          }
        } catch (err) {
          return callback(err);
         }
        switch (input.event) {
          case "folder":
            data.files_in_folders = [];
            for (var i = 0; i < body.item_collection.entries.length; i++) {
              if (body.item_collection.entries[i].type == "file")
                data.files_in_folders.push(body.item_collection.entries[i].name);
            }
            data.total_files_in_folder = data.files_in_folders && data.files_in_folders.length;
            data.shared_url = body.shared_link && body.shared_link.url;
            if (body && body.type && body.id){
              body.url = "https://app.box.com/" + body.type + "/" + body.id
            }
            data.source.item = body
            return callback(null, data);
          case "file":
            data.shared_url = body.shared_link && body.shared_link.url;
            data.download_url = body.shared_link && body.shared_link.download_url;
            if (body && body.type && body.id){
              body.url = "https://app.box.com/" + body.type + "/" + body.id
            }
            data.source.item = body
            return callback(null, data);
        }
      } else {
        return callback(err, null);
      }
    });
  } catch (e) {
    return callback(null, data);
  }
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