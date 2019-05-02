var request = require("request");
var _ = require("lodash");
var P = require("bluebird");

module.exports = {

  name: "note_updated",

  label: "Note Updated",

  version: "v6",

  input: {
    "type": "object",
    "title": "Note Updated",
    "description": "Short description",
    "properties": {
      "event": {
        "type": "string",
        "enum": ["note_updated"],
        "isExecute": true
      },
      "polling": {
        "type": "boolean",
        "default": true,
        "options": {
          "hidden": true
        }
      },
      "file_id": {
        "title": "Folder/File ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the folder for which you want to set the trigger. In case you want to specify, enter the ID of the file or folder in the format ‘file/123’ and ‘folder/123’, respectively"
      }
    }
  },

  output: {
    "note_updated": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data:
  {
    "event_type": "Note Updated",
    "created_at": "2018-10-13T11:34:12.000Z",
    "additional_info": [],
    "shared_url": "https://app.box.com/s/og979sifweroiwreoiweoew0lcto",
    "download_url": "https://app.box.com/shared/static/og979sifweroiwreoiweoew0lcto.docx",
    "creator_type": "user",
    "creator_id": "369855927",
    "creator_name": "John Smith",
    "creator_login": "john.smith@example.com",
    "creator_url": "https://app.box.com/profile/369855927",
    "source_id": "214321833",
    "source_type": "file",
    "source_sequence_id": "8",
    "source_etag": "8",
    "source_sha1": "67b234d2cb6fd5a49936985592787d052f89",
    "source_name": "test.docx",
    "source_description": "this is a test file",
    "source_size": 11104,
    "source_created_at": "2018-08-09T07:17:44.000Z",
    "source_modified_at": "2018-10-13T11:34:10.000Z",
    "source_trashed_at": "2018-08-09T05:45:17.000Z",
    "source_purged_at": "2018-08-09T05:45:17.000Z",
    "source_content_created_at": "2018-08-09T05:49:49.000Z",
    "source_content_modified_at": "2018-10-13T11:34:10.000Z",
    "source_shared_link": "https://app.box.com/file/214321833",
    "source_item_status": "active",
    "source_url": "https://app.box.com/file/214321833",
    "modifier_type": "user",
    "modifier_id": "369855927",
    "modifier_name": "John Smith",
    "modifier_login": "john.smith@example.com",
    "owner_type": "user",
    "owner_id": "369855927",
    "owner_name": "John Smith",
    "owner_login": "john.smith@example.com",
    "parent_type": "folder",
    "parent_id": "5231907379",
    "parent_sequence_id": "0",
    "parent_etag": "0",
    "parent_name": "ru",
    "parent_url": "https://app.box.com/folder/5231907379",
    "file_version_id": "34926556999",
    "source_root_level_count": 3,
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
        "id": "52043757826",
        "sequence_id": "0",
        "etag": "0",
        "name": "5231907379"
      }
    ],
    "folder_path": "All Files/test/test.docx"
  }, // output of trigger data

  mock_input: {
    file_id: "folder/55628266167"
  },

  execute: function (input, options, output) {
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
        return output("Invalid input : Missing Folder/File ID")
      }
    } catch (e) {
      return output("Invalid input format")
    }

   var option = {
      method: "GET",
      url: "https://api.box.com/2.0/events",
      headers: {
        Authorization: "Bearer " + input.auth.access_token
      },
      qs: {
        stream_position: options.meta.synToken
      }
    }
    doRequest(option)
      .then((data) => {
        var res;
        if (data && data.entries && data.entries.length > 0) {
          options.setMeta({
            synToken: data.next_stream_position
          });
          if (input.event == "folder") {
            res = data.entries.filter(element => {
              if (element.event_type == "ITEM_MODIFY" && element.source && element.source.type == "file" && element.source.parent && (element.source.parent.id == input.file_id)) {
                return true
              }
            })
          } else if (input.event == "file") {
            res = data.entries.filter(element => {
              if (element.event_type == "ITEM_MODIFY" && element.source && element.source.type == "file" && (element.source.id == input.file_id)) {
                return true
              }
            })
          } else {
            return output(null, []);
          }
          if (res) {
            res=res.map(element=>{
              return _output(input, element)
              })
            output(null, res);
          } else {
            output(null, []);
          }
        } else {
          output(null, []);
        }

      })
      .catch((err) => {
        return output(err)
      })

  },

  validate: function (input, options, output) {
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
    if(!input.targetID){
      output("Invalid input format")
    }

    var option = {
      method: "GET",
      url: "https://api.box.com/2.0/events",
      headers: {
        Authorization: "Bearer " + input.auth.access_token
      },
      qs:{
        stream_position:"now"
      }
    }
    var optionsValidate = {
      method: "GET",
      url: "https://api.box.com/2.0/" + input.type + "s/" + input.targetID,
      headers: {
        Authorization: "Bearer " + input.auth.access_token
      }
    }

    P.all([doRequest(option), doRequest(optionsValidate)])
      .spread((data, dataValidate) => {
        if (data && dataValidate) {
          options.setMeta({
            synToken: data.next_stream_position
          });
          output(null, true)
        }else{
          output("Invalid inputs")
        }
      })
      .catch((err) => {
        return output(err)
      })
  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here

    self.validate(input, options, output)
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
    delete data.event_type
    data = Object.assign({ "event_type": "Note Updated" }, data)

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

var self = module.exports;

function doRequest(option) {
  return new Promise(function (resolve, reject) {
    request(option, function (err, res, body) {
      if (err) {
        return reject(err);
      }
      try {
        if (body && typeof (body) === "string") {
          body = JSON.parse(body);
        }
      } catch (e) { return reject(body);}

      if (res.statusCode >= 200 && res.statusCode <= 204) {
        return resolve(body);

      } else if (res.statusCode >= 400 && res.statusCode <= 429) {
        if (res.statusCode == 401) {
          return reject("invalid auth token");
        } else if (res.statusCode === 400) {
          if (!body) {
            return reject("Invalid input provided");
          } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
            return reject(body.context_info.errors[0].message);
          } else {
            return reject(body.message || body.code);
          }
        } else if (res.statusCode === 403) {
          if (!body) {
            return reject("You don't have permission to perform the event that the webhook observes");
          } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
            return reject(body.context_info.errors[0].message);
          } else {
            return reject(body.message || body.code);
          }
        } else if (res.statusCode === 409 && body.code === "conflict") {
          return reject("Box does not allow using this trigger event in more than one workflow. Please delete this trigger from the other workflow to continue")
        } else {
          if (!body) {
            return reject("Something went wrong, please try again");
          } else if (body.hasOwnProperty("context_info") && body.context_info.errors && body.context_info.errors.length > 0) {
            return reject(body.context_info.errors[0].message);
          } else {
            return reject(body.message || body.code);
          }
        }
      } else
        return reject(body);
    });
  })
}
