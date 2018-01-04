module.exports = {
  name: "issue_created",
  mock_input: { repo: "BeerRestAPI" },
  input:{
    type: 'object',
    title: 'Issue Created',
    description: "Triggers when a issue is created",
    properties: {
      repo: {
        type: 'string',
        minLength: 1, 
        title: 'Repo Name',
        propertyOrder: 2        
      },
      event: {
        type: 'string',
        enum: ['issue_created']
      }
    }
  },
  output: {
    "issue_created": {
      "type": "object",
      "properties": {
        "issue": {
          "type": "object",
          "title": "issue",
          "displayTitle": "Issue",
          "properties": {
            "updated_on": {
              "type": "string",
              "title": "updated_on",
              "displayTitle": "Updatded On"
            },
            "title": {
              "type": "string",
              "title": "title",
              "displayTitle": "Title"
            },
            "milestone": {
              "type": "string",
              "title": "milestone",
              "displayTitle": "Milestone"
            },
            "type": {
              "type": "string",
              "title": "type",
              "displayTitle": "Type"
            },
            "content": {
              "type": "object",
              "title": "content",
              "displayTitle": "Issue Content",
              "properties": {
                "markup": {
                  "type": "string",
                  "title": "markup"
                },
                "html": {
                  "type": "string",
                  "title": "html"
                },
                "raw": {
                  "type": "string",
                  "title": "raw",
                  "displayTitle": "Content"
                }
              }
            },
            "watches": {
              "type": "number",
              "title": "watches"
            },
            "created_on": {
              "type": "string",
              "title": "created_on",
              "displayTitle": "Created On"
            },
            "id": {
              "type": "number",
              "title": "id",
              "displayTitle": "Issue ID"
            },
            "priority": {
              "type": "string",
              "title": "priority",
              "displayTitle": "Priority"
            },
            "kind": {
              "type": "string",
              "title": "kind",
              "displayTitle": "Issue Classification"
            },
            "reporter": {
              "type": "object",
              "title": "reporter",
              "displayTitle": "Issue Reporter",
              "properties": {
                "type": {
                  "type": "string",
                  "title": "type",
                  "displayTitle": "Reporter User Type"
                },
                "username": {
                  "type": "string",
                  "title": "username",
                  "displayTitle": "Issue Reporter Username"
                },
                "display_name": {
                  "type": "string",
                  "title": "display_name",
                  "displayTitle": "Issue Reporter Display Name"
                },
                "uuid": {
                  "type": "string",
                  "title": "uuid",
                  "displayTitle": "Reporter UID"
                }
              }
            },
            "state": {
              "type": "string",
              "title": "state",
              "displayTitle": "Issue Status"
            }
          }
        },
        "repository": {
          "type": "object",
          "title": "repository",
          "displayTitle": "Repository",
          "properties": {
            "full_name": {
              "type": "string",
              "title": "full_name",
              "displayTitle": "Repository Full Name"
            },
            "name": {
              "type": "string",
              "title": "name",
              "displayTitle": "Repository Name"
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
            "type": {
              "type": "string",
              "title": "type",
              "displayTitle": "Repository Type"
            },
            "uuid": {
              "type": "string",
              "title": "uuid",
              "displayTitle": "Repository Uuid"
            }
          }
        }
      }
    }
  },
  getUserData: function(input, output){
    // get actual users data
  },
  execute: function (input, options, output){
    var request = require('request');
    var buffer = require('buffer').Buffer;
    request({
      url: 'https://api.github.com/repos/' + input.auth.username + '/' + input.repo + '/issues',
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
          return output(body, null)
        }      
        output(null, { issue: body });
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
