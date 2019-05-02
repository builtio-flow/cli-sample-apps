var request = require('request');
  const P = require('bluebird');

  module.exports = {

    name: "get_board_members",

    title: "Get Board Members",

    description: "",
    version: "v1",

    input:{
      title: 'Get Board Members',
      type: 'object',
      properties: {
        "board_id": {
          "title": "Board ID",
          "minLength": 1,
          "type": "string",
          "propertyOrder": 2,
          "description": "Select/specify the ID of the board of which member details you want to retrieve"
        }
      }
    },

    output: {
      "type": "object",
      "title": "output",
      "properties": {
        "members": {
          "title": "members",
          "type": "array",
          "displayTitle": "Members",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "title": "id",
                "type": "string",
                "displayTitle": "Members ID"
              },
              "fullName": {
                "title": "fullName",
                "type": "string",
                "displayTitle": "Members Fullname"
              },
              "username": {
                "title": "username",
                "type": "string",
                "displayTitle": "Members Username"
              }
            }
          }
        }
      }
    },

    mock_input: {
      "name": "card",
      "card_id": "5ba0d6651962e082a8816fa5"
    },

    execute: function (input, output) {
      // to access auth info use input.auth , eg: input.auth.username
      // and to return output use output callback like this output(null, { 'notice' : 'successful'})
      // your code here

      inputValidation(input, 'board_id', output);

      var option = {
        url: "https://api.trello.com/1/boards/" + input.board_id + "/members",
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        field: "Invalid Board ID"
      };

      requestCall(option)
        .then((body) => {
          if (body && body.length > 0) {
            body.map(data => {
              flatten_schema(data, 'prefs');
            })
          }
          return output(null, {members:body});
        })
        .catch((err) => {
          if (err === 'invalid value for idList' || err === 'Invalid objectId') {
            return output('Invalid List ID entered');
          }
          else if (err == 'invalid id' || err == 'board not found') {
            return output('Invalid Board ID')
          } else if (err == 'card not found') {
            return output('Invalid Card ID')
          }
          else {
            return output(err);
          }
        })
    }
  }

  function inputValidation(src, val, res) {
    if (!src[val]) {
      return res('Mandatory field is missing');
    }
  }

  function flatten_schema(body, val) {
    if (body[val]) {
      Object.keys(body[val]).map(function (m) {
        body[m] = body[val][m];
      });
      delete body[val]
    }
  }

  function requestCall(options) {
    if (options.field) {
      var value = options.field
      delete options.field
    }
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
          if (data == 'invalid id') {
            data = value
          }
          return reject(data);
        }
        if (res && res.statusCode === 200) {
          return resolve(data);
        } else {
          if (data == 'invalid id') {
            data = value
          }
          return reject(data);
        }
      })
    })
  }
