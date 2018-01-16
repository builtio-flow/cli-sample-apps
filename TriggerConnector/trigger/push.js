var Q = require('q');
var request = require('request');
var baseURL = 'https://api.github.com';
function getUserInfo(token) {
    var future = Q.defer();
    var url = baseURL + '/user';
    var options = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token,
            'User-Agent': 'built.io Flow'
        }
    };

    request(options, function(err, res, body) {
        if (err) {
            return future.reject(err);
        }
        try {
            if (body && typeof body === "string") {
                body = JSON.parse(body)
            }
        } catch (e) {
            return future.reject(body);
        }
        if (res && res.statusCode && res.statusCode === 200) {
            return future.resolve(body);
        }
        if (res && res.statusCode && res.statusCode !== 200) {
            var errObj = {
                "message": body.message,
                "errors": [body.message]
            }
            return future.reject(errObj);
        }
    });
    return future.promise;
}

module.exports = {
  name: "Push",
  mock_input: { repo: "BeerRestAPI" },  
  input:{
    type: 'object',
    title: 'Push',
    description: "Short description",
    properties: {
      repo: {
        type: 'string',
        title: 'Repo',
        minLength: 1,
        propertyOrder: 2,
        lookup: {
          id: "repo_list",
          dependencies: []
        }
      },
      event: {
        type: 'string',
        enum: ['push']
      }
    }
  },
  output: {
    "push": {
      "type": "object",
      "properties": {
        "repository": {
          "type": "object",
          "title": "repository",
          "displayTitle": "Repository",
          "properties": {
            "uuid": {
              "type": "string",
              "title": "uuid",
              "displayTitle": "Repository Uuid"
            },
            "type": {
              "type": "string",
              "title": "type",
              "displayTitle": "Repository Type"
            },
            "name": {
              "type": "string",
              "title": "name",
              "displayTitle": "Repository Name"
            },
            "full_name": {
              "type": "string",
              "title": "full_name",
              "displayTitle": "Repository Full Name"
            },
            "is_private": {
              "type": "boolean",
              "title": "is_private",
              "displayTitle": "Repository Is Private"
            },
            "scm": {
              "type": "string",
              "title": "scm",
              "displayTitle": "Repository Scm"
            },
            "owner": {
              "type": "object",
              "title": "owner",
              "displayTitle": "Repository Owner",
              "properties": {
                "display_name": {
                  "type": "string",
                  "title": "display_name",
                  "displayTitle": "Repository Owner Display Name"
                },
                "uuid": {
                  "type": "string",
                  "title": "uuid",
                  "displayTitle": "Repository Owner Uuid"
                },
                "username": {
                  "type": "string",
                  "title": "username",
                  "displayTitle": "Repository Owner Username"
                },
                "type": {
                  "type": "string",
                  "title": "type",
                  "displayTitle": "Repository Owner Type"
                }
              }
            }
          }
        },
        "push": {
          "type": "object",
          "title": "push",
          "displayTitle": "Push",
          "properties": {}
        },
        "actor": {
          "type": "object",
          "title": "actor",
          "displayTitle": "Actor",
          "properties": {
            "display_name": {
              "type": "string",
              "title": "display_name",
              "displayTitle": "Actor Display Name"
            },
            "uuid": {
              "type": "string",
              "title": "uuid",
              "displayTitle": "Actor Uuid"
            },
            "username": {
              "type": "string",
              "title": "username",
              "displayTitle": "Actor Username"
            },
            "type": {
              "type": "string",
              "title": "type",
              "displayTitle": "Actor Type"
            }
          }
        }
      }
    }
  },   
  execute: function(input, options, output){
    var request = require('request');
    getUserInfo(input.auth.access_token)
    .then(user => {
      options.setMeta({
          'timestamp': Date.now()
      });// for setting meta like last synced time
      request({
        url: 'https://api.github.com/repos/' + user.login + '/' + input.repo + '/commits',
        headers: {
          "Authorization": "Bearer " + input.auth.access_token,
          "User-Agent": user.login        
        },
        method: 'GET'
      }, function(err, resp, body){
          if (err){
            return output(err, null);
          }
          if (resp.statusCode != 200){
            return output(body, null)
          }      
          output(null, JSON.parse(body)[0]);
      })      
    })
  },
   
  validate: function(input, options, output){
    // will be called every time trigger is activated/deactivated
    // do actual validation like the repo entered by user exist or not
    output(null, true)
  },

  activate: function(input, options, output){
    // will be called when a trigger is activated
    // do some initial set like getting last sync time from options.meta
    // var lastSync = options.meta.created_at;
    output(null, true)
  }
}
