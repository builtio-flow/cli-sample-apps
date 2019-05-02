var request = require("request");
var _ = require("lodash");
const P = require("bluebird");
var baseURL = "https://api.box.com/2.0/webhooks/";

var Event = {
  "file": ["FILE.MOVED"],
  "folder": ["FOLDER.MOVED", "FILE.MOVED"]
};

module.exports = {

  name: "file_or_folder_moved",

  label: "File or Folder Moved",

  version: "v6",

  input: {
    "type": "object",
    "title": "File or Folder Moved",
    "description": "Short description",
    "properties": {
      "event": {
        "type": "string",
        "enum": ["file_or_folder_moved"]
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
    "file_or_folder_moved": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {
    "event_type": "File or Folder Moved",
    "created_at": "2018-08-09T05:49:57.000Z",
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
    "source_name": "New Project",
    "source_created_at": "2018-08-09T05:45:17.000Z",
    "source_modified_at": "2018-08-09T05:45:17.000Z",
    "source_description": "this is a test file",
    "source_size": 11011,
    "source_trashed_at": "2018-08-09T05:45:17.000Z",
    "source_purged_at": "2018-08-09T05:45:17.000Z",
    "source_content_created_at": "2018-08-09T05:49:49.000Z",
    "source_content_modified_at": "2018-08-09T05:49:57.000Z",
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
    "parent_source_type": "folder",
    "parent_source_id": "13762356610",
    "parent_source_sequence_id": "0",
    "parent_source_etag": "0",
    "parent_source_name": "Source",
    "parent_source_url": "https://app.box.com/folder/13762356610",
    "parent_destination_id": "13762356611",
    "parent_destination_type": "folder",
    "parent_destination_sequence_id": "0",
    "parent_destination_etag": "0",
    "parent_destination_name": "Destination",
    "parent_destination_url": "https://app.box.com/folder/13762356611",
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
    file_id: "folder/55752054252"
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
        delete data.source.parent
      }
      if (data.sourcebefore) {
        if (data.sourcebefore.id && data.sourcebefore.type)
          data.sourcebefore.url = "https://app.box.com/" + data.sourcebefore.type + "/" + data.sourcebefore.id
        data = _.assign(data, formatData("parent_source", data.sourcebefore));
      }
      if (data.destination) {
        if (data.destination.id && data.destination.type)
          data.destination.url = "https://app.box.com/" + data.destination.type + "/" + data.destination.id
        data = _.assign(data, formatData("parent_destination", data.destination));
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
    data = Object.assign({ "event_type": "File or Folder Moved" }, data)

    delete data.destination;
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
      option.url = "https://api.box.com/2.0/folders/" + String(data.source.id);
      break;
    case "file":
      option.url = "https://api.box.com/2.0/files/" + String(data.source.id);
      break;
    default:
      return callback(null, data);
  }
  var sourceOption = {}
  sourceOption.headers = option.headers
  sourceOption.url = "https://api.box.com/2.0/folders/" + (data.additional_info && data.additional_info.before && data.additional_info.before.id)

  var destinationOption = {}
  destinationOption.headers = option.headers
  destinationOption.url = "https://api.box.com/2.0/folders/" + (data.additional_info && data.additional_info.after && data.additional_info.after.id)
  P.all([requestCall(option), requestCall(sourceOption), requestCall(destinationOption)])
    .spread((body, sourceBody, destBody) => {

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

      data["sourcebefore"] = {}
      data.sourcebefore.id = sourceBody.id
      data.sourcebefore.type = sourceBody.type
      data.sourcebefore["sequence_id"] = sourceBody["sequence_id"]
      data.sourcebefore.etag = sourceBody.etag
      data.sourcebefore.name = sourceBody.name

      data["destination"] = {}
      data.destination.id = destBody.id
      data.destination.type = destBody.type
      data.destination["sequence_id"] = destBody["sequence_id"]
      data.destination.etag = destBody.etag
      data.destination.name = destBody.name
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