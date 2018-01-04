module.exports = {
  label: "Get Branch",
  description: "",
  mock_input: { "UserName": "kailashyogeshwar85", "RepoName": "csv-2-json" },
  input:{
    title: 'get_branch',
    type: 'object',
    properties: {
      "UserName": {
        "title": "User Name",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 2
      },
      "RepoName": {
        "title": "Repositories Name",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 3,
        "lookup": {
          "id": "repo_list",
          "dependencies": [
            "UserName"
          ]
        }
      }
    }
  },
  output:{
    "title": "output",
    "type": "object",
    "displayTitle": 'Output',
    "properties": {
      "branches": {
        "title": "branches",
        "displayTitle": "Branches",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "title": "name",
              "displayTitle": "Branches Name",
              "type": "string"
            },
            "commit": {
              "title": "commit",
              "displayTitle": "Commit",
              "type": "object",
              "properties": {
                "sha": {
                  "title": "sha",
                  "displayTitle": "Commit Sha",
                  "type": "string"
                },
                "url": {
                  "title": "url",
                  "displayTitle": "Commit URL",
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  execute: function(input, output){
    var request = require('request');
    request({
      url: 'https://api.github.com/repos/' + input.UserName + '/' + input.RepoName + '/branches',
      auth : {
        user : input.auth.username,
        pass : input.auth.password
      },
      headers: {
        "User-Agent": input.auth.username
      },
      method: 'GET'
    },
    function(err, resp, body){
        if(err){
          return output(err, null);
        }
        if(resp.statusCode != 200){
          return output(body, null)
        }
        output(null, { branches: JSON.parse(body) });
    })
  }
}
