var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "get_all_board_lists",

  title: "Get All Board Lists",

  description: "",
  version: "v4",

  input:{
    title: 'Get All Board Lists',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board of which card details you want to retrieve"
      },
      "status": {
        "title": "Card Status",
        "description": "Select the status of the card of which details you want to retrieve. The default value of this field is ‘All’",
        "type": "string",
        "enum": ["All", "Archived", "Unarchived"],
        "propertyOrder": 4
      }
    }
  },

  output: {
    "type": "object",
    "title": "output",
    "properties": {
      "lists": {
        "title": "lists",
        "type": "array",
        "displayTitle": "Lists",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Lists ID"
            },
            "name": {
              "title": "name",
              "type": "string",
              "displayTitle": "Lists Name"
            },
            "closed": {
              "title": "closed",
              "type": "boolean",
              "displayTitle": "Lists Closed"
            },
            "idBoard": {
              "title": "idBoard",
              "type": "string",
              "displayTitle": "Lists IDBOARD"
            },
            "pos": {
              "title": "pos",
              "type": "number",
              "displayTitle": "Lists Pos"
            },
            "subscribed": {
              "title": "subscribed",
              "type": "boolean",
              "displayTitle": "Lists Subscribed"
            }
          }
        }
      }
    }
  },

  mock_input: {
    "board_id": "5b7e50fc150b083ec0ad321f9hh",
    "status": "Archived"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    inputValidation(input, 'board_id', output);

    var statusObj = {
      "Visible": "visible", "Archived": "closed", "Unarchived": "open", "All": "all"
    }
    var option = {
      url: "https://api.trello.com/1/boards/" + input.board_id + "/lists",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        filter: statusObj[input.status]
      },
      field: "Invalid Board ID"
    };

    requestCall(option)
      .then((body) => {
        return output(null, {lists:body});
      })
      .catch((err) => {
        if (err === 'invalid value for idList' || err === 'Invalid objectId') {
          return output('Invalid List ID entered');
        }
        else if (err == 'invalid id' || err == 'board not found') {
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