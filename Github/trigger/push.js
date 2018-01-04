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
  getUserData: function(input, output){
     var mock = {
        'push' : {
          event : 'test_event'
        }
      }
      output(null, mock[input.event]);
  }, 
  execute: function(input, options, output){
    console.log('executing trigger now ', input)
    var request = require('request');
    var buffer = require('buffer').Buffer;
    request({
      url: 'https://api.github.com/repos/' + input.auth.username + '/' + input.repo + '/commits',
      headers: {
        "Authorization": "Basic " + new buffer(input.auth.username + ":" + input.auth.password).toString('base64'),
        "User-Agent": input.auth.username        
      },
      method: 'GET'
    }, function(err, resp, body){
        if (err){
          return output(err, null);
        }
        if (resp.statusCode != 200){
          return output(body)
        }      
        output(null, JSON.parse(body)[1] || [ ]);
    })
  },
   
  validate: function(input, options, output){
    // will be called every time trigger is activated/deactivated
    output(null, true)
  },

  activate: function(input, options, output){
    // will be called when a trigger is activated
    output(null, true)
  }
}
