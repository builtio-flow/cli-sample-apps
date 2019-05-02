// Add your function in module.exports
var request = require("request");
module.exports = {

    "name": "files_id",

    "label": "Files Id",
    // add input data lookup will depend on for
    // eg: if auth is oauth so add access_token inside auth object
    // you can also add other input properties which are mentioned in action/trigger
    "mock_input": {},
    "search": true,
    "nested": true,
    "execute": function (input, options, output) {
        try {
            var qs = {}
            var folder_id = "0"
            var baseURL = "https://api.box.com/2.0/folders/" + folder_id
            input.page = input.page && Number(input.page) || 0;
            if (input && input.search && input.searchid && input.search === input.searchid) {
                var searchBaseURL = "https://api.box.com/2.0/search";
                qs["query"] = input.search;
                qs["offset"] = input.page ? input.page * 10 : 0
                qs["limit"] = 10;
                request({
                    "url": searchBaseURL,
                    "method": "GET",
                    "headers": {
                        "Authorization": "Bearer " + input.auth.access_token,
                    },
                    qs: qs
                }, function (err, res, body) {
                    var result;
                    var data;
                    if (err) {
                        return output(err);
                    }
                    if (res.statusCode == 404) {
                        result = []
                        data = {
                            "results": result,
                            "next_page": false
                        }
                        return output(null, data)
                    }
                    if (res.statusCode == 401) {
                        return output("Invalid Authentication")
                    }
                    if (typeof (body) == "string") {
                        try {
                            body = JSON.parse(body)
                        } catch (e) {
                            return output({
                                "Error": "Corrupt data received from box server. Please try again"
                            })
                        }
                    }
                    if (res && res.statusCode == 405) {
                        return output("Invalid Folder/File Id")
                    }
                    if (res && res.statusCode == 403) {
                        return output(body.message);
                    }

                    if (res.statusCode >= 200 && res.statusCode < 400) {
                        result = filterSearch(body.entries || body, input)
                        data = {
                            "results": result,
                            "next_page": (body && body.total_count && ((input.page + 1) * 10) < body.total_count) || (result.length >= 10)
                        }
                        return output(null, data)
                    }
                    return output(body)
                });
            } else {
                getSearchFolderId(input, function (err, searchid) {

                    if (searchid && searchid.split("/") && searchid.split("/").length > 0 && searchid.split("/")[0] == "folder") {
                        baseURL = "https://api.box.com/2.0/" + searchid.split("/")[0] + "s/" + searchid.split("/")[1]
                    }

                    qs["offset"] = input.page ? input.page * 10 : 0
                    qs["limit"] = 10
                    var option = {
                        url: baseURL,
                        headers: {
                            "Authorization": "Bearer " + input.auth.access_token,
                        },
                        qs: qs,
                        method: "GET"
                    }

                    request(option, function (err, res, body) {
                        var result;
                        var data;
                        if (err) {
                            return output(err);
                        }
                        if (res.statusCode == 404) {
                            result = []
                            if (input.search)
                                result.push({
                                    "id": input.searchid,
                                    "value": input.search,
                                    "folder": true,
                                    "current": true,
                                    "open": true
                                })
                            data = {
                                "results": result,
                                "next_page": false
                            }
                            return output(null, data)
                        }
                        if (res.statusCode == 401) {
                            return output("Invalid Authentication")
                        }
                        if (typeof (body) == "string") {
                            try {
                                body = JSON.parse(body)
                            } catch (e) {
                                return output({
                                    "Error": "Corrupt data received from box server. Please try again"
                                })
                            }
                        }
                        if (res && res.statusCode == 405) {
                            return output("Invalid Folder/File Id")
                        }
                        if (res && res.statusCode == 403) {
                            return output(body.message);
                        }

                        if (res.statusCode >= 200 && res.statusCode < 400) {
                            result = filterTiggers(body, input, searchid);
                            data = {
                                "results": result,
                                "next_page": (((input.page + 1) * 10) < (body && body.item_collection && body.item_collection.total_count)) || (result.length >= 10)
                            }
                            return output(null, data)
                        }
                        return output(body)
                    });

                });
            }
        } catch (e) {

            return output(e);
        }
    }

}

function filterTiggers(body, input, searchid) {
    var result = [];
    if (searchid && input.search) {

        let name = input.search.split("/")

        name.pop()
        let check = name && name[name.length - 1]
        name = name && name.join("/")
        if (input.page == 0 && body.parent) {
            result.push({
                "id": body.parent.type + "/" + body.parent.id,
                "value": (check == body.parent.name) ? name : body.parent.name,
                "folder": true,
                "open": true
            })
        }
        // if (searchid != "folder/0")
        result.push({
            "id": searchid,
            "value": input.search,
            "folder": true,
            "current": true,
            "open": true
        })

    } else {
        if (input.page == 0 && body.parent) {
            result.push({
                "id": body.parent.type + "/" + body.parent.id,
                "value": body.parent.name,
                "folder": true,
                "open": true
            })
        }

    }

    if (body && body.item_collection && body.item_collection.entries) {
        body.item_collection.entries.forEach(function (item) {
            var folder = item.type == "folder" ? true : false
            if (input.search) {
                var search = input.search;
                if (input.searchid && (input.searchid != searchid)) {
                    search = input.search.split("/");
                    search.pop();
                    search = search.join("/");
                }
                result.push({
                    "id": item.type + "/" + item.id,
                    "value": search + "/" + item.name,
                    "folder": folder
                })
            } else {
                result.push({
                    "id": item.type + "/" + item.id,
                    "value": "All Files/" + item.name,
                    "folder": folder
                })
            }

        })
    }
    return result
}



function getSearchFolderId(inp, cb) {
    if (!inp.searchid || (inp.searchid && inp.searchid.split("/")[0] == "folder")) {
        return cb(null, inp.searchid || "folder/0");
    }
    var opt = {
        "url": "https://api.box.com/2.0/files/" + inp.searchid.split("/")[1],
        headers: {
            "Authorization": "Bearer " + inp.auth.access_token,
        }
    }

    request.get(opt, function (err, res, body) {
        if (err) {
            return cb(err);
        }
        try {
            if (typeof (body) == "string") {
                body = JSON.parse(body);
            }
        } catch (e) {
            return cb(null, "folder/0");
        }
        if (res.statusCode >= 200 && res.statusCode < 400) {
            if (body && body.path_collection && body.path_collection.entries && body.path_collection.entries.length) {
                return cb(null, "folder/" + body.path_collection.entries[body.path_collection.entries.length - 1]["id"])
            }
        } else {
            return cb(null, "folder/0");
        }
    })
}

function filterSearch(body) {
    var result = [];
    if (Array.isArray(body)) {
        body.forEach(function (item) {
            var fPath = "";
            if (item.path_collection && item.path_collection.entries && item.path_collection.entries.length) {
                fPath = item.path_collection.entries.reduce((res, val) => {
                    return res += val.name + "/"
                }, "") + item.name;
            }
            result.push({
                "id": item.type + "/" + String(item.id),
                "value": fPath || fPath,
                "folder": Boolean(item.type == "folder"),
            });
        });
    } else if (typeof body == "object") {
        var fPath = "";
        if (body.path_collection && body.path_collection.entries && body.path_collection.entries.length) {
            fPath = body.path_collection.entries.reduce((res, val) => {
                return res += val.name + "/"
            }, "") + body.name;
        }
        result.push({
            "id": body.type + "/" + String(body.id),
            "value": fPath || body.name,
            "folder": Boolean(body.type == "folder"),
        });
    }
    return result;
}