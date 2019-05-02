var request = require("request");
const P = require("bluebird");
var _ = require("lodash");
var baseURL = "https://api.box.com/2.0/webhooks/";

module.exports = {

    name: "file_or_folder_operation",

    label: "File/Folder Operation",

    version: "v9",

    input: {
        "type": "object",
        "title": "File/Folder Operation",
        "description": "Short description",
        "properties": {
            "event": {
                "type": "string",
                "enum": [
                    "file_or_folder_operation"
                ]
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
            },
            "filter": {
                "type": "array",
                "title": "Event Types",
                "items": {
                    "enum": [
                        "New File/Folder",
                        "File/Folder Copied",
                        "File/Folder Moved",
                        "File/Folder Deleted",
                        "File/Folder Downloaded",
                        "File/Folder Shared",
                        "Comment on File",
                        "File/Folder Updated",
                        "File Previewed",
                        "Task Added",
                        "Task Completed"
                    ]
                },
                "minItems": 1,
                "format": "checkbox"
            }
        }
    },

    output: {
        "file_or_folder_operation": {
            type: "object",
            properties: {

            }
        }
    },

    mock_data: {
        "event_type": "Comment on File",
        "created_at": "2018-08-09T05:49:57.000Z",
        "trigger": "COMMENT.CREATED",
        "additional_info": {
            "after": {
                "id": "61035939415",
                "type": "folder"
            },
            "before": {
                "id": "2855719239",
                "type": "folder"
            }
        },
        "files_in_folders": [
            "image1.png",
        ],   
        "total_files_in_folder": 0,
        "shared_url": "https://app.box.com/s/og979sifweroiwreoiweoew0lcto",
        "download_url": "https://app.box.com/shared/static/og979sifweroiwreoiweoew0lcto.docx",
        "creator_type": "user",
        "creator_id": "369855927",
        "creator_name": "John Smith",
        "creator_login": "john.smith@example.com",
        "creator_url": "https://app.box.com/profile/369855927",
        "item_id": "108840647268",
        "item_type": "file",
        "item_sequence_id": "10",
        "item_etag": "6",
        "item_sha1": "6dd6f6aae224a613416687303f9ea9277386165a",
        "item_name": "Project v1",
        "is_reply_comment": false,
        "source_access": "open",
        "source_download_url": "https://app.box.com/shared/static/og979sifweroiwreoiweoew0lcto.docx",
        "source_effective_access": "open",
        "source_effective_permission": "can_download",
        "source_is_password_enabled": false,
        "source_unshared_at": "2018-08-09T05:45:17.000Z",
        "source_download_count": "45",
        "source_preview_count": "231",
        "source_completed_at": "2018-08-09T05:45:17.000Z",
        "source_assigned_at": "2018-08-09T05:45:17.000Z",
        "source_reminded_at": "2018-09-09T05:45:17.000Z",
        "source_resolution_state": "incomplete",
        "source_id": "108840647268",
        "source_is_reply_comment": false,
        "source_type": "file",
        "source_sequence_id": "2",
        "source_etag": "2",
        "source_sha1": "6dd6f6aae224a613416687303f9ea9277386165b",
        "source_name": "Project v1",
        "source_created_at": "2018-08-09T05:45:17.000Z",
        "source_modified_at": "2018-08-09T05:45:17.000Z",
        "source_message": "Test",
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
        "parent_type": "folder",
        "parent_id": "13762356610",
        "parent_sequence_id": "0",
        "parent_etag": "0",
        "parent_name": "level4",
        "parent_url": "https://app.box.com/folder/13762356610",
        "file_version_id": "117062636644",
        "source_root_level_count": 2,
        "task_id": "47929233",
        "task_type": "task",
        "task_description": "Task added",
        "task_due_at": null,
        "task_is_completed": false,
        "task_action": "review",
        "comment": "Completed",
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
        "root_entries": [{
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
        "assigned_to": [{
            "type": "user",
            "id": "221851567",
            "name": "John Smith",
            "login": "johnsmith@example.com",
            "url": "https://app.box.com/profile/221851567",
        }],
        "assigned_by": {
            "type": "user",
            "id": "221851567",
            "name": "John Smith",
            "login": "johnsmith@example.com",
            "url": "https://app.box.com/profile/221851567",
        },
        "folder_path": "All Files/Project_v1"
    },

    mock_input: {
        "file_id": "folder/70630194960",
        //"file_id":"folder/63789073983",
        "filter": [
            "New File/Folder",
            "File/Folder Copied",
            "File/Folder Moved",
            "File/Folder Deleted",
            "File/Folder Downloaded",
            "File/Folder Shared",
            "Comment on File",
            "File Previewed",
            "Task Added",
            "Task Completed"
        ]
    },

    execute: function(input, payload, output) {
        
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


        if (payload && payload.trigger == "FILE.UNLOCKED" && payload.source && payload.source.modified_at != payload.source.content_modified_at) {
            return output(null, []);
        }
        if (payload && payload.trigger == "FILE.UPLOADED" && payload.source && ((payload.source.modified_at != payload.source.created_at) || Number(payload.source.sequence_id) > 0)) {
            payload.trigger = "FILE.UNLOCKED";
            if( input.filter.indexOf("File/Folder Updated") < 0){
                return output(null, []);
            }
        }



        letsGetMoreInfo(input, payload, function(err, res) {
            if (!err && res) {
                //---------------- for coping value for  payload.item_type to payload.source_type -------------
                if (res && res.source_type && res.item_type && res.trigger && res.trigger == "COMMENT.CREATED") {
                    res.source_type = res.item_type
                }

                //---------------for SHARED_LINK.CREATED-----------------------

                if (res && res.trigger == "SHARED_LINK.CREATED") {

                    get_file_folder_name_for_share_link(input, res).then(result => {
                        return output(null, result)
                    }).catch(error => {
                        return output(error, null)
                    })
                } else if (res && (res.trigger == "TASK_ASSIGNMENT.CREATED" || res.trigger == "TASK_ASSIGNMENT.UPDATED")) {
                    res.assigned_by = payload.source.assigned_by;
                    res.assigned_by.url = "https://app.box.com/profile/" + res.assigned_by.id;
                    get_parent_folder_task(input, res).then(result => {
                        if(payload.source.assigned_to.id == res.assigned_to[0].id || res.trigger == "TASK_ASSIGNMENT.UPDATED"){
                            return output(null, result)
                        } else {
                            return output(null, [])
                        }

                    }).catch(error => {
                        return output(error, null)
                    })
                } else {
                    output(null, res);
                }

            } else
                output(null, []);
        });
    },

    register: function(input, output) {

        setWebhook(input, output, "POST");

    },

    unregister: function(input, options, output) {
        request({
            method: "DELETE",
            url: baseURL + input.webhookId,
            headers: {
                Authorization: "Bearer " + input.auth.access_token
            }
        }, function(err, res, body) {
            if (err) {
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 500) {
                return output(null, "Webhook deleted successfully");
            } else
                return output(body);
        });

    },

    activate: function(input, options, output) {
        // this function will be called whenever user activate or reactivates flow
        // to access auth info use input.auth , eg: input.auth.username
        // you can use this function to reset your cursor or timestamp

        // your code goes here

        output(null, true);
    },
    update: function(input, output) {
        var targetID = "",
            type = "";
        try {
            if (input.file_id) {
                targetID = input.file_id.split("/")[1]
                type = input.file_id.split("/")[0]
            } else {
                output("Invalid input : Missing Folder/File ID")
            }
        } catch (e) {
            output("Invalid input format")
        }

        input.webhookId
       var  opt = {
            "url": "https://api.box.com/2.0/webhooks/" + input.webhookId,
            headers: {
                Authorization: "Bearer " + input.auth.access_token
            }
        }
        request(opt, function(err, res, body) {

            if (err) {
                return output(err);
            } else {
                try {
                    if (typeof(body) == "string") {
                        body = JSON.parse(body);
                    }
                } catch (e) {
                    return output(e);
                }
                if (res.statusCode >= 400) {
                    if (res.statusCode == 404) {
                        return output("You cant change the file/folder while updating the trigger");
                    } else {
                        return output(body);
                    }
                }

                if ((body.target.id != targetID) || (type != body.target.type)) {
                    return output("You cant change the file/folder while updating the trigger");
                } else {
                    setWebhook(input, output, "PUT");
                }

            }

        })

    }

}


function get_parent_folder_task(input, res) {

    return new Promise((resolve) => {
        let option = {
            url: "https://api.box.com/2.0/files/" + res.item_id,
            headers: {
                "Authorization": "Bearer " + input.auth.access_token,
                "Accept": "application/json"
            }
        };

        request(option, function(err, response, body) {
            option.url = "https://api.box.com/2.0/tasks/" + res.task_id;

            request(option, function(taskErr, taskResponse, taskBody) {
                if (typeof(taskBody) == "string") {
                    taskBody = JSON.parse(taskBody);
                }

                res["assigned_to"] = [];
                if (taskBody.task_assignment_collection && taskBody.task_assignment_collection.entries && taskBody.task_assignment_collection.entries.length) {
                    for (var l = 0; l < taskBody.task_assignment_collection.entries.length; l++) {
                        taskBody.task_assignment_collection.entries[l].assigned_to.url = "https://app.box.com/profile/" + taskBody.task_assignment_collection.entries[l].assigned_to.id
                        res["assigned_to"].push(taskBody.task_assignment_collection.entries[l].assigned_to);
                    }
                }
                if (!err && response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                    if (typeof(body) == "string") {
                        body = JSON.parse(body);
                    }

                    if (body && body.path_collection && body.path_collection.entries.length) {
                        var parent = body.path_collection.entries[body.path_collection.entries.length - 1];
                        res["parent_type"] = "folder";
                        res["parent_id"] = parent.id;
                        res["parent_sequence_id"] = parent.sequence_id;
                        res["parent_etag"] = parent.etag;
                        res["parent_name"] = parent.name;
                        res["parent_url"] = "https://app.box.com/folder/" + parent.id

                        resolve(res)
                    }
                } else {
                    resolve(res)
                }
            });
        });
    })

}

function get_file_folder_name_for_share_link(input, res) {

    return new Promise((resolve) => {
        let option = {
            url: "",
            headers: {
                "Authorization": "Bearer " + input.auth.access_token,
                "Accept": "application/json"
            }
        };
        if (res && res.item_id && res.source_type == "folder") {
            option.url = "https://api.box.com/2.0/folders/" + res.item_id
        } else if (res && res.item_id && res.source_type == "file") {
            option.url = "https://api.box.com/2.0/file/" + res.item_id
        } else {
            resolve(res)
        }
        request(option, function(err, response, body) {
            if (!err && response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                if (typeof(body) == "string") {
                    body = JSON.parse(body);
                }

                if (body && body.name) {
                    res["source_name"] = body.name
                    resolve(res)
                }
            } else {
                resolve(res)
            }
        });
    })
}

function letsGetMoreInfo(input, data, cb) {

    var id_type = "";
    if (Object.keys(data).length) {
        if (data.trigger == "COMMENT.CREATED" || data.trigger == "COMMENT.UPDATED" || data.trigger == "COMMENT.DELETED" || data.trigger == "SHARED_LINK.CREATED" || data.trigger == "TASK_ASSIGNMENT.CREATED" || data.trigger == "TASK_ASSIGNMENT.UPDATED") {
            if (data.source && data.source.item && data.source.item.type) {
                input.event = data.source.item.type
            }
            id_type = "item";
        }



        if (data.trigger == "FILE.UNLOCKED" || data.trigger == "FILE.COPIED" || data.trigger == "FOLDER.COPIED" || data.trigger == "FILE.MOVED" || data.trigger == "FOLDER.MOVED" || data.trigger == "FILE.DELETED" || data.trigger == "FOLDER.DELETED" || data.trigger == "FILE.DOWNLOADED" || data.trigger == "FOLDER.DOWNLOADED" || data.trigger == "FOLDER.CREATED" || data.trigger == "FILE.UPLOADED" || data.trigger == "FOLDER.RENAMED" || data.trigger == "FILE.RENAMED" || data.trigger == "FILE.PREVIEWED") {
            if (data.source && data.source.type) {
                input.event = data.source.type
            }
            id_type = "source";
        }

        _request(input, data, id_type, function(err, res) {
            if (!err && res) {
                cb(null, _output(input, res));
            } else {
                cb(err || "Unable to fetch the data")
            }
        });
    }
}




function _request(input, data, id_type, callback) {
    var option = {
        headers: {
            "Authorization": "Bearer " + input.auth.access_token,
            "Accept": "application/json"
        }
    };
    var id = "";

    if (id_type == "source") {
        id = String(data.source.id);
        if (data.trigger == "FILE.DELETED" || data.trigger == "FOLDER.DELETED") {
            id += "/trash";
        }
    }
    if (id_type == "item") {
        id = String(data.source && data.source.item && data.source.item.id);
    }
    switch (input.event) {
        case "folder":
            option.url = "https://api.box.com/2.0/folders/" + id;
            break;
        case "file":
            option.url = "https://api.box.com/2.0/files/" + id;
            break;
        default:
            return callback(null, data);
    }

    if (data.trigger == "FOLDER.COPIED" || data.trigger == "FILE.COPIED" || data.trigger == "FILE.MOVED" || data.trigger == "FOLDER.MOVED") {
        if (data.trigger == "FILE.MOVED" || data.trigger == "FOLDER.MOVED") {
            data.source_url = "https://app.box.com/" + data.source.type + "/" + data.source.id;
        }
        var sourceOption = {}
        sourceOption.headers = option.headers
        sourceOption.url = "https://api.box.com/2.0/folders/" + (data.additional_info && data.additional_info.before && data.additional_info.before.id)

        var destinationOption = {}
        destinationOption.headers = option.headers
        destinationOption.url = "https://api.box.com/2.0/folders/" + (data.additional_info && data.additional_info.after && data.additional_info.after.id)
        P.all([requestCall(option), requestCall(sourceOption), requestCall(destinationOption)])
            .spread((body,sourceBody, destBody) => {

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
    } else
    if (data.trigger == "TASK_ASSIGNMENT.CREATED" || data.trigger == "TASK_ASSIGNMENT.UPDATED") {
        var fileOption = {};
        fileOption.headers = option.headers
        fileOption.url = "https://api.box.com/2.0/files/" + (data.source && data.source.item && data.source.item.id) + "/tasks?fields=id,item,task_assignment_collection,message,due_at,is_completed,action"
        data.source_url = "https://app.box.com/" + data.source.item.type + "/" + data.source.item.id;

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
    } else {

        try {
            request(option, function(err, response, body) {

                if (!err && response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {

                    if (typeof(body) == "string") {
                        body = JSON.parse(body);
                    }
                    switch (input.event) {
                        case "folder":

                            if (data.trigger == "FILE.DELETED" || data.trigger == "FOLDER.DELETED") {
                                data.source = body;
                            } else {

                                data.source_url = "https://app.box.com/folder/" + body.id
                                data.files_in_folders = [];
                                for (var i = 0; i < body.item_collection.entries.length; i++) {
                                    if (body.item_collection.entries[i].type == "file")
                                        data.files_in_folders.push(body.item_collection.entries[i].name);
                                }

                                data.total_files_in_folder = data.files_in_folders && data.files_in_folders.length;
                                if (!data.parent && body.parent) {
                                    data.parent = body.parent;
                                }
                                if (data.parent) {
                                    if (data.parent.id && data.parent.type)
                                        data.parent.url = "https://app.box.com/" + data.parent.type + "/" + data.parent.id
                                    data = _.assign(data, formatData("parent", data.parent));
                                    delete data.parent
                                }
                            }

                            data.shared_url = body.shared_link && body.shared_link.url;
                            data.download_url = body.shared_link && body.shared_link.download_url;
                            if (body.shared_link)
                                delete body.shared_link
                            return callback(null, data);
                        case "file":
                            if (data.trigger == "FILE.DELETED" || data.trigger == "FOLDER.DELETED") {
                                data.source = body;
                            } else {
                                data.file_id = body.id
                                data.file_name = body.name
                                data.source_url = "https://app.box.com/file/" + body.id
                                data.parent = body.parent
                                if (data.parent) {
                                    if (data.parent.id && data.parent.type)
                                        data.parent.url = "https://app.box.com/" + data.parent.type + "/" + data.parent.id
                                    data = _.assign(data, formatData("parent", data.parent));
                                    delete data.parent
                                }
                            }
                            data.shared_url = body.shared_link && body.shared_link.url;
                            data.download_url = body.shared_link && body.shared_link.download_url;
                            if (body.shared_link)
                                delete body.shared_link
                            return callback(null, data);
                    }
                } else {
                    return callback(null, data);
                }
            });
        } catch (e) {
            return callback(null, data);
        }
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




function _output(input, data) {
    try {

        data.created_at = convertToISO(data.created_at);

        if (data.task) {
            data = _.assign(data, formatData("task", data.task));
        }
        if (data.created_by && data.created_by.id)
            data.created_by.url = "https://app.box.com/profile/" + data.created_by.id
        data = _.assign(data, formatData("creator", data.created_by));
        if (data.source) {
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

            if (!data.source_name && data.item_name) {
                data.source_name = data.item_name;
            }

            if (data.file_name) {
                data.source_name = data.file_name;
            }
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


        if (data.destination) {
            if (data.destination.id && data.destination.type)
                data.destination.url = "https://app.box.com/" + data.destination.type + "/" + data.destination.id
            data = _.assign(data, formatData("parent_destination", data.destination));
        }

        if (data.sourcebefore) {
            if (data.sourcebefore.id && data.sourcebefore.type)
              data.sourcebefore.url = "https://app.box.com/" + data.sourcebefore.type + "/" + data.sourcebefore.id
            data = _.assign(data, formatData("parent_source", data.sourcebefore));
          }


        if (data.trigger == "COMMENT.CREATED" || data.trigger == "COMMENT.UPDATED" || data.trigger == "COMMENT.DELETED") {
            data = Object.assign({
                "event_type": "Comment on File"
            }, data)
        }

        if (data.trigger == "FILE.UNLOCKED" || data.trigger == "FILE.RENAMED") {
            data = Object.assign({
                "event_type": "File Updated"
            }, data)
        }
        if (data.trigger == "FOLDER.RENAMED") {
            data = Object.assign({
                "event_type": "Folder Updated"
            }, data)
        }

        if (data.trigger == "FILE.COPIED") {
            data = Object.assign({
                "event_type": "File Copied"
            }, data)
        }
        if (data.trigger == "FOLDER.COPIED") {
            data = Object.assign({
                "event_type": "Folder Copied"
            }, data)
        }
        if (data.trigger == "FILE.MOVED") {
            data = Object.assign({
                "event_type": "File Moved"
            }, data)
        }

        if (data.trigger == "FOLDER.MOVED") {
            data = Object.assign({
                "event_type": "Folder Moved"
            }, data)
        }

        if (data.trigger == "FILE.DELETED") {
            data = Object.assign({
                "event_type": "File Deleted"
            }, data)
        }
        if (data.trigger == "FOLDER.DELETED") {
            data = Object.assign({
                "event_type": "Folder Deleted"
            }, data)
        }
        if (data.trigger == "FILE.DOWNLOADED") {
            data = Object.assign({
                "event_type": "File Downloaded"
            }, data)
        }
        if (data.trigger == "FOLDER.DOWNLOADED") {
            data = Object.assign({
                "event_type": "Folder Downloaded"
            }, data)
        }
        if (data.trigger == "SHARED_LINK.CREATED") {
            if (data.source.item.type == "file") {
                data = Object.assign({
                    "event_type": "File Shared"
                }, data)
            }

            if (data.source.item.type == "folder") {
                data = Object.assign({
                    "event_type": "Folder Shared"
                }, data)
            }

            data.source_type = data.item_type;
        }
        if (data.trigger == "FILE.PREVIEWED") {
            data = Object.assign({
                "event_type": "File previewed"
            }, data)
        }
        if (data.trigger == "FILE.UPLOADED") {
            data = Object.assign({
                "event_type": "New File"
            }, data)
        }
        if (data.trigger == "FOLDER.CREATED") {
            data = Object.assign({
                "event_type": "New Folder"
            }, data)
        }

        if (data.trigger == "TASK_ASSIGNMENT.CREATED") {
            data = Object.assign({
                "event_type": "Task Created"
            }, data)
            data.source_type = data.item_type;
        }
        if (data.trigger == "TASK_ASSIGNMENT.UPDATED") {
            data = Object.assign({
                "event_type": "Task Completed"
            }, data)
            data.source_type = data.item_type;
        }

        if (data.task) {
            delete data.task;
        }
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


function requestCall(options) {

    return new P(function(resolve, reject) {
        request(options, function(err, res, data) {
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

function setWebhook(input, output, method) {

    if (input.webhook.match("^http://")) {
        input.webhook = input.webhook.replace("http://", "https://")
    }

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

    if ((input.filter.indexOf("New File/Folder") >= 0 || input.filter.indexOf("File/Folder Updated") >= 0) && input.type == "file") {
        return output("If you have selected the 'New File/Folder' or 'File/Folder Updated' filter, you cannot specify a file in the Folder/File ID field");
    }


    var event = setEvents(input.filter, input.type);

    var reqData = {
        "type": "webhook",
        "target": {
            "id": input.targetID
        },
        "address": input.webhook,
        "triggers": event //
    };


    if (input.type === "folder") {
        reqData.target.type = "folder";
    } else {
        reqData.target.type = "file";
    }
    if (!(/^\d+$/).test(input.targetID)) {
        if (!input.targetID || input.targetID == "undefined") {
            input.targetID = "ID";
        }
        return output("File/Folder is invalid");
    }

    var url = baseURL;
    if (method == "PUT") {
        url += input.webhookId
    }

    request({
        method: method,
        url: url,
        headers: {
            Authorization: "Bearer " + input.auth.access_token
        },
        json: reqData
    }, function(err, res, body) {
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
                        if (body.code == "access_denied_insufficient_permissions" && input.targetID == 0) {
                            return output("Applying trigger on root folder is unsupported in Box account. Please select a specific file/folder on which you want to set the trigger");
                        }
                        return output(body.message || body.code);
                    }
                } else if (res.statusCode === 409 && body.code === "conflict") {
                    return output("Box supports setting up only one trigger event for each folder/file. Since another trigger event is already set up for the specified folder/file, the requested action cannot be performed.")
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
}

function setEvents(filter, type) {
    var event = [];
    if (filter.indexOf("New File/Folder") >= 0) {
        event = ["FOLDER.CREATED", "FILE.UPLOADED"];
    }
    if (filter.indexOf("File/Folder Copied") >= 0) {
        event.push("FILE.COPIED");
        if (type == "folder") {
            event.push("FOLDER.COPIED");
        }
    }
    if (filter.indexOf("File/Folder Moved") >= 0) {
        event.push("FILE.MOVED");
        if (type == "folder") {
            event.push("FOLDER.MOVED");
        }
    }

    if (filter.indexOf("File/Folder Deleted") >= 0) {
        event.push("FILE.DELETED");
        if (type == "folder") {
            event.push("FOLDER.DELETED");
        }
    }

    if (filter.indexOf("File/Folder Downloaded") >= 0) {
        event.push("FILE.DOWNLOADED");
        if (type == "folder") {
            event.push("FOLDER.DOWNLOADED");
        }
    }

    if (filter.indexOf("File/Folder Shared") >= 0) {
        event.push("SHARED_LINK.CREATED");
    }

    if (filter.indexOf("File/Folder Updated") >= 0) {
        event.push("FILE.UNLOCKED");
        event.push("FILE.UPLOADED");
        event.push("FILE.RENAMED");
        if (type == "folder") {
            event.push("FOLDER.RENAMED");
        }
    }
    if (filter.indexOf("Comment on File") >= 0) {
        event.push("COMMENT.CREATED")
        event.push("COMMENT.UPDATED")
        event.push("COMMENT.DELETED")
    }



    if (filter.indexOf("File Previewed") >= 0) {
        event.push("FILE.PREVIEWED");
    }

    if (filter.indexOf("Task Added") >= 0) {
        event.push("TASK_ASSIGNMENT.CREATED");
    }

    if (filter.indexOf("Task Completed") >= 0) {
        event.push("TASK_ASSIGNMENT.UPDATED");
    }

    return event;
}