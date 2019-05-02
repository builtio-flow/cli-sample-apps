var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "create_label",

  title: "Create Label",

  description: "",
  version: "v1",

  input: {
    title: 'Create Label',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "description": "Select/specify the ID of the board under which you want to create the label",
        "type": "string",
        "propertyOrder": 2,
        "minLength": 1
      },
      "name": {
        "title": "Label Name",
        "type": "string",
        "propertyOrder": 3,
        "description": "Enter the name of the label you want to create",
        "minLength": 1
      },
      "color": {
        "title": "Label Color",
        "description": "Select the color of the label you want to create",
        "type": "string",
        "enum": ["--Select Color--", "Yellow", "Purple", "Blue", "Red", "Green", "Orange", "Black", "Sky", "Pink", "Lime"],
        "propertyOrder": 4,
        "select2": {
          "active": true
        },
        "minLength": 1
      }
    }
  },

  output: {
    "type": "object",
    "title": "output",
    "properties": {
      "id": {
        "title": "id",
        "type": "string",
        "displayTitle": "ID"
      },
      "idBoard": {
        "title": "idBoard",
        "type": "string",
        "displayTitle": "IDBOARD"
      },
      "name": {
        "title": "name",
        "type": "string",
        "displayTitle": "Name"
      },
      "color": {
        "title": "color",
        "type": "string",
        "displayTitle": "Color"
      },
      "limits": {
        "title": "limits",
        "type": "object",
        "displayTitle": "Limits",
        "properties": {}
      }
    }
  },

  mock_input: {
    "board_id": "5b580ff316b7ca9da4a7eb4a",
    "name": "my",
    color: "Blue"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'board_id', output);
    inputValidation(input, 'name', output);
    inputValidation(input, 'color', output);

    var colorObj = { "--Select Color--": "null", "Yellow": "yellow", "Purple": "purple", "Blue": "blue", "Red": "red", "Green": "green", "Orange": "orange", "Black": "black", "Sky": "sky", "Pink": "pink", "Lime": "lime" }
    var option = {
      url: "https://api.trello.com/1/labels",
      body: {
        "idBoard": input.board_id,
        "name": input.name,
        "color": colorObj[input.color],
        "token": input.auth.access_token,
        "key": input.auth.key
      },
      method: "POST",
      json: true,
      field: "Invalid Board ID"
    };

    requestCall(option)
      .then((body) => {
        return output(null, body);
      })
      .catch((err) => {

        if (err === "invalid value for idBoard") {
          return output('Invalid Board ID');
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
        if (data && data.toLowerCase() == 'invalid id') {
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