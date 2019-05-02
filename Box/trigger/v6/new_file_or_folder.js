var request = require("request");
var _ = require("lodash");
var baseURL = "https://api.box.com/2.0/webhooks/";

module.exports = {

  name: "new_file_or_folder",

  label: "New File or Folder",

  version: "v6",

  input: {
    "type": "object",
    "title": "New File or Folder",
    "description": "Short description",
    "properties": {
      "event": {
        "type": "string",
        "enum": ["new_file_or_folder"]
      },
      "polling": {
        "type": "boolean",
        "default": false,
        "options": {
          "hidden": true
        }
      },
      "file_id": {
        "title": "Folder ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the folder for which you want to set the trigger. In case you want to specify, enter the ID of the folder in the format ‘folder/123"
      }
    }
  },

  output: {
    "new_file_or_folder": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "New File or Folder",
    "created_at": "2018-08-09T05:49:57.000Z",
    "trigger": "FILE.UPLOADED",
    "additional_info": [],
    "files_in_folders": [],
    "total_files_in_folder": 0,
    "shared_url": "https://app.box.com/s/og979sifweroiwreoiweoew0lcto",
    "download_url": "https://app.box.com/shared/static/og979sifweroiwreoiweoew0lcto.docx",
    "creator_type": "user",
    "creator_id": "369855927",
    "creator_name": "John Smith",
    "creator_login": "john.smith@example.com",
    "creator_url": "https://app.box.com/profile/369855927",
    "source_id": "108840647268",
    "source_type": "file",
    "source_sequence_id": "2",
    "source_etag": "2",
    "source_sha1": "6dd6f6aae224a613416687303f9ea9277386165b",
    "source_name": "Poject v1",
    "source_created_at": "2018-08-09T05:45:17.000Z",
    "source_modified_at": "2018-08-09T05:45:17.000Z",
    "source_description": "this is a test file",
    "source_size": 11011,
    "source_trashed_at": "2018-08-09T05:45:17.000Z",
    "source_purged_at": "2018-08-09T05:45:17.000Z",
    "source_content_created_at": "2018-08-09T05:49:49.000Z",
    "source_content_modified_at": "2018-08-09T05:49:57.000Z",
    "source_shared_link": "https://app.box.com/file/108840647268",
    "source_item_status": "active",
    "source_url": "https://app.box.com/file/108840647268",
    "modifier_type": "user",
    "modifier_id": "369855927",
    "modifier_name": "John Smith",
    "modifier_login": "john.smith@example.com",
    "owner_type": "user",
    "owner_id": "369855927",
    "owner_name": "John Smith",
    "owner_login": "john.smith@example.com",
    "parent_type": "folder",
    "parent_id": "13762356610",
    "parent_sequence_id": "0",
    "parent_etag": "0",
    "parent_name": "level4",
    "parent_url": "https://app.box.com/folder/13762356610",
    "file_version_id": "117062636644",
    "source_root_level_count": 2,
    "root_entries": [
      {
        "type": "folder",
        "id": "0",
        "sequence_id": "0",
        "etag": "0",
        "name": "All Files"
      },
      {
        "type": "folder",
        "id": "12012408511",
        "sequence_id": "0",
        "etag": "0",
        "name": "Project_v1"
      }
    ],
    "folder_path": "All Files/Project_v1"
  }, // output of trigger data

  mock_input: {
    file_id: "52321194619"
  },

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : 'key', value : 'My Val'}])
    // output should be an array of objects or an empty array.

    // your code goes here

    letsGetMoreInfo(input, payload, function (err, res) {
      if (!err && res) {
        if (res && res.source_created_at == res.source_modified_at) {
          output(null, res);
        }else{
          output(null, []);
        }
      } else
        output(null, []);
    });

  },

  register: function (input, output) {
    // function will be used for registering webhook with services additional key
    // 'webhook' along with input data will be available here so you can access the input.webhook
    // for registering the webhook

    if (input.webhook.match("^http://")) {
      input.webhook = input.webhook.replace("http://", "https://")
    }
    var reqData = {
      "type": "webhook",
      "target": {
        "id": input.file_id,
        "type": "folder"
      },
      "address": input.webhook,
      "triggers": ["FOLDER.CREATED", "FILE.UPLOADED"]
    };

    if (!(/^\d+$/).test(input.file_id)) {
      return output("Invalid value '" + input.file_id + "'. Folder with value '" + input.file_id + "' not found");
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
    if (data.source && data.source.type)
      input.event = data.source.type
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
      if (data.source.id && data.source.type)
        data.source.url = "https://app.box.com/" + data.source.type + "/" + data.source.id
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
    data = Object.assign({ "event_type": "New File or Folder" }, data)

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
      option.url = "https://api.box.com/2.0/folders/" + String(data.source.id);
      break;
    case "file":
      option.url = "https://api.box.com/2.0/files/" + String(data.source.id);
      break;
    default:
      return callback(null, data);
  }
  try {
    request(option, function (err, response, body) {

      if (!err && response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
        if (typeof (body) == "string") {
          body = JSON.parse(body);
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
            return callback(null, data);
          case "file":
            data.shared_url = body.shared_link && body.shared_link.url;
            data.download_url = body.shared_link && body.shared_link.download_url;
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