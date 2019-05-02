const request = require("request")
const uuid = require("uuid");



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

//var arguments = '"content":"' + input.Content + '","project_id":"' + input.projectid + '"'

var arguments = '"ids" : [' + 220155285834 + ']'

let randomid = uuid.v1()
var option = {
    method: 'POST',
    url: "https://todoist.com/api/v7/sync",
    form: {
        'token': "feb3b7f6bc564e9804c2a4cd236e11669b23e53a",
        "sync_token": "*",
        //  'commands': '[{"type": "item_complete", "uuid": "' + randomid + '", "args": {' + arguments + '}}]'
       // "sync_token":'tnAyeMnX1b9HVU2D7GJgV2ijrX915nWNbhVv4cgttjrPNn5OaPEaU94M8-eRlvwOy0-R_7_W67X3O4P_HCbaIwBSnui3ONjABfMR7zgk1E69',
        "resource_types": '["all"]'
    }
};

add_project(option).then(res => {
    console.log("---- res-----", res)
}).catch(err => {
    console.log("---- err-----", err)
})
