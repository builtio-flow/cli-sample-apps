var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "get_board_labels",

  title: "Get Board Labels",

  description: "",
  version: "v1",

  input: {
    title: 'Get Board Labels',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board of which label details you want to retrieve"
      }
    }
  },

  output: {
    "type": "object",
    "title": "output",
    "properties": {
      "labels": {
        "title": "labels",
        "type": "array",
        "displayTitle": "Labels",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Labels ID"
            },
            "idBoard": {
              "title": "idBoard",
              "type": "string",
              "displayTitle": "Labels IDBOARD"
            },
            "name": {
              "title": "name",
              "type": "string",
              "displayTitle": "Labels Name"
            },
            "color": {
              "title": "color",
              "type": "string",
              "displayTitle": "Labels Color"
            }
          }
        }
      }
    }
  },

  mock_input: {},

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    inputValidation(input, 'board_id', output);

    var option = {
      url: "https://api.trello.com/1/boards/" + input.board_id + "/labels",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      field: "Invalid Board ID"
    };

    requestCall(option)
      .then((body) => {
        return output(null, { labels: body });
      })
      .catch((err) => {
        if (err == 'invalid id' || err == 'board not found') {
          return output('Invalid Board ID')
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
