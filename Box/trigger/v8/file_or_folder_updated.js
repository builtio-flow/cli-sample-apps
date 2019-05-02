var baseUrl = "https://api.box.com/2.0/events";
var request = require("request");
var _ = require("lodash");

module.exports = {

    name: "file_or_folder_updated",

    label: "File or Folder Updated",

    version: "v8",

    input: {
        type: "object",
        title: "File Or Folder Updated",
        description: "Short description",
        properties: {
            event: {
                type: "string",
                enum: ["file_or_folder_updated"],
                isExecute: true
            },
            polling: {
                type: "boolean",
                default: true,
                options: {
                    hidden: true
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
        "file_or_folder_updated": {
            type: "object",
            properties: {

            }
        }
    },

    mock_data: {
      "event_type": "File Updated",
      "created_at": "2019-01-16T12:22:50.000Z",
      "recorded_at": "2019-01-16T12:22:51.000Z",
      "session_id": "uhh3ssfz8p14hmxa",
      "creator_type": "user",
      "creator_id": "221751567",
      "creator_name": "Henry Williams",
      "creator_login": "henry.williams@example.com",
      "creator_url": "https://app.box.com/profile/221751567",
      "source_type": "file",
      "source_id": "367213122202",
      "source_sequence_id": "4",
      "source_etag": "4",
      "source_sha1": "605681dddb3e06d1866633554ceb6194bfc3606e",
      "source_name": "Hello World.docx",
      "source_description": "TO Test Box",
      "source_size": 12929,
      "source_created_at": "2019-01-16T11:35:32.000Z",
      "source_modified_at": "2019-01-16T12:22:50.000Z",
      "source_trashed_at": "2019-01-16T12:22:52.000Z",
      "source_purged_at": "2019-01-16T12:22:52.000Z",
      "source_content_created_at": "2019-01-16T11:35:32.000Z",
      "source_content_modified_at": "2019-01-16T12:22:50.000Z",
      "source_shared_link": "https://app.box.com/s/kkwfalw32qworj2hyph8yk39uur1lzn5",
      "source_item_status": "active",
      "source_synced": false,
      "source_url": "https://app.box.com/file/384733620395",
      "modifier_type": "user",
      "modifier_id": "242886679",
      "modifier_name": "Henry Williams",
      "modifier_login": "henry.williams@example.com",
      "owner_type": "user",
      "owner_id": "242886679",
      "owner_name": "Henry Williams",
      "owner_login": "henry.williams@example.com",
      "parent_type": "folder",
      "parent_id": "64058447702",
      "parent_sequence_id": "0",
      "parent_etag": "0",
      "parent_name": "Box New",
      "parent_url": "https://app.box.com/folder/64058447702",
      "file_version_id": "406789558745",
      "source_root_level_count": 2,
      "root_entries": [{
      "type": "folder",
      "id": "0",
      "sequence_id": 1,
      "etag": 0,
      "name": "All Files"
      },
      {
      "type": "folder",
      "id": "64058447702",
      "sequence_id": "0",
      "etag": "0",
      "name": "Box New"
      }
      ],
      "folder_path": "All Files/Box New/Hello World.docx"
      },

    mock_input: {
        "file_id": "folder/0",
        //"file_id":"folder/63789073983",
        "filter": [

            "File/Folder Updated"
        ]
    },

    getUserData: function(input, options, output) {
        run(input, options, function(err, body) {
            if (err) {
                return output(err);
            } else {
                return output(null, body);
            }
        })
    },

    execute: function(input, options, output) {

        run(input, options, function(err, body) {
            if (err) {
                return output(err);
            } else {
                return output(null, body);
            }
        })


    },


    activate: function(input, options, output) {
        // this function will be called whenever user activate or reactivates flow
        // to access auth info use input.auth , eg: input.auth.username
        // you can use this function to reset your cursor or timestamp

        // your code goes here

        output(null, true);
    },

    validate: function(input, options, output) {
        isValidFileId(input, function(err) {
            if (err) {
                return output(err);
            }
            request({
                url: baseUrl + "?stream_position=0&stream_type=changes",
                headers: {
                    Authorization: "Bearer " + input.auth.access_token
                }
            }, function(err, res, body) {
                if (err || res.statusCode !== 200) {
                    return output("Enter valid Authentication details!!");
                }
                if (body && typeof body === "string") {
                    body = JSON.parse(body);
                }
                if (body.next_stream_position &&
                    (options.meta == undefined || options.meta.next_stream_position == undefined)) {
                    options.setMeta({
                        next_stream_position: body.next_stream_position,
                        last_time : new Date().getTime()
                    });
                }
                output(null, true);
            })
        })
    }
}


function run(input, options, callback) {
  //   options.meta.next_stream_position = 14919721311910690;
    var option = {
        method: "GET",
        url: "https://api.box.com/2.0/events",
        headers: {
            Authorization: "Bearer " + input.auth.access_token
        },
        qs: {
            stream_position: options.meta.next_stream_position
        }
    }
    var lastTime = (options.meta.last_time || 0);
    request(option, function(err, res, body) {
        if (err) {
            return callback(err);
        } else {
            try {
                if (typeof(body) == "string") {
                    body = JSON.parse(body);
                }
            } catch (e) {
                return callback(body);
            }
            if (res.statusCode >= 200 && res.statusCode < 400) {
                var entries = [];
                if (body.entries && body.entries.length) {
                    for (var i = 0; i < body.entries.length; i++) {
                        if ((body.entries[i].event_type == "ITEM_UPLOAD" && (body.entries[i].source.created_at != body.entries[i].source.modified_at) && !body.entries[i].source.trashed_at) || body.entries[i].event_type == "ITEM_RENAME") {
                            if (isUserNeededId(body.entries[i], input.file_id) && new Date(body.entries[i].source.modified_at).getTime() > lastTime) {
                                body.entries[i]["event_type"] = capitalizeFirstLetter(body.entries[i].source.type) + " Updated";
                                entries.push(_output(body.entries[i]));
                            }
                        }
                    }
                }




                if (!body.entries.length) {
                    options.setMeta({
                        next_stream_position: body.next_stream_position,
                        last_time: lastTime
                    });
                } else {
                    lastTime = body.entries.length ? (new Date(body.entries[body.entries.length - 1].source.modified_at)).getTime() : (options.meta.last_time || 0);
                    options.setMeta({
                        next_stream_position: body.next_stream_position,
                        last_time: lastTime
                    });
                }

                return callback(null, entries);
            } else {
                return callback(body);
            }
        }
    })
}

function isValidFileId(input, cb) {

    if (input.file_id) {
        input.targetID = input.file_id.split("/")[1]
        input.type = input.file_id.split("/")[0]
        if (input.type != "file" && input.type != "folder") {
            return cb("File/Folder is invalid");
        }
    }
    var opt = {
        url: "https://api.box.com/2.0/" + input.type + "s/" + input.targetID,
        headers: {
            Authorization: "Bearer " + input.auth.access_token
        }
    }

    request.get(opt, function(err, res, body) {
        if (err) {
            return cb(err);
        }
        try {
            if (typeof(body) == "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return cb(e);
        }

        if (res.statusCode >= 200 && res.statusCode < 400) {
            return cb(null, true);
        } else {
            if (body.status == 404) {
                return cb(input.type + " with ID " + input.targetID + " doesn't exist");
            }
            return cb(body);
        }
    })
}


function _output(data) {
    try {

        data.created_at = convertToISO(data.created_at);
        data.recorded_at = convertToISO(data.recorded_at);
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

        delete data.event_type;

        data = Object.assign({
            "event_type": capitalizeFirstLetter(data.source.type) + " Updated"
        }, data)
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


function isUserNeededId(entry, file_id) {
    var targetID = "",
        type = "";
    if (file_id) {
        targetID = file_id.split("/")[1]
        type = file_id.split("/")[0]
    }
    if (type == "file"){
    if(targetID == entry.source.id) {
        return true;
    }else{
      return false;
    }
  }
    if (entry.source.path_collection && entry.source.path_collection.entries && entry.source.path_collection.entries.length) {
        for (var k = 0; k < entry.source.path_collection.entries.length; k++) {
            if (entry.source.path_collection.entries[k].id == targetID) {
                return true;
            }
        }
    }
    return false;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}