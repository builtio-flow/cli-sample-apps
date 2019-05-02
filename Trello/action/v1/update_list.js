var request = require('request');
module.exports = {

  name: "update_list",

  title: "Update List",

  description: "",
  version: "v1",

  input: {
    title: 'Update List',
    type: 'object',
    properties: {
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board for which you want to update the list"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the List you want to Update",
        "type": "string",
        "propertyOrder": 3,
        "minLength": 1
      },
      "name": {
        "title": "List Name",
        "type": "string",
        "propertyOrder": 4,
        "description": "Enter the new name for the list"
      },
      "idBoard": {
        "title": "New Board ID",
        "description": "Select/specify the ID of the Board the list should be moved to",
        "type": "string",
        "propertyOrder": 5
      },
      "closed": {
        "title": "Closed",
        "description": "Whether the list should be closed (archived)",
        "type": "string",
        "enum": [" ", "True", "False"],
        "propertyOrder": 6
      },
      "pos": {
        "title": "Position",
        "description": "New position for the list: top, bottom, or a positive floating point number",
        "type": "string",
        "propertyOrder": 7
      },
      "subscribed": {
        "title": "Subscribed",
        "description": "Whether the active member is subscribed to this list",
        "type": "string",
        "enum": [" ", "True", "False"],
        "propertyOrder": 8
      }
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "id": {
        "title": "id",
        "displayTitle": "Card ID",
        "type": "string"
      },
      "name": {
        "title": "name",
        "displayTitle": "Name",
        "type": "string"
      },
      "closed": {
        "title": "closed",
        "displayTitle": "Closed",
        "type": "boolean"
      },
      "idBoard": {
        "title": "idBoard",
        "displayTitle": "Board ID",
        "type": "string"
      },
      "pos": {
        "title": "pos",
        "displayTitle": "Position",
        "type": "number"
      },
      "limits": {
        "title": "limits",
        "displayTitle": "Limits",
        "type": "any"
      }
    }
  },

  mock_input: {
    "list_id": "5b9f71d53774352dc6943834"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    inputValidation(input, 'list_id', output);

    var option = {
      url: "https://api.trello.com/1/lists/" + input.list_id ,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        value: input.name
      }
    };

    optField(input, 'name', option.qs);
    optField(input, 'idBoard', option.qs);
    optField(input, 'pos', option.qs);
    if (input.closed == "True") {
      option.qs.closed = true
    } else if (input.closed == "False") {
      option.qs.closed = false
    }

    if (input.subscribed == "True") {
      option.qs.subscribed = true
    } else if (input.subscribed == "False") {
      option.qs.subscribed = false
    }
    request.put(option, function (err, res, body) {
      if (err) {
        return output(err);
      } else {
        try {
          if (body && typeof body === "string") {
            body = JSON.parse(body);
          }
        } catch (e) { }
        if (res && res.statusCode == 200 && res.statusCode < 400) {
          output(null, body);
        } else if (res && res.statusCode === 400 && body === 'invalid value for idList' || body === 'invalid objectId') {
          return output('Invalid List ID entered');
        }
        else if (res.statusCode === 400 && body == 'invalid id') {
          return output('Invalid Board ID/ List ID')
        }
        else {
          return output(body);
        }
      }
    });
  }
}

function inputValidation(src, val, res) {
  if (!src[val]) {
    return res('Mandatory field is missing');
  }
}

function optField(src, val, body) {
  if (src[val] || src[val] === 'false') {
    body[val] = src[val]
  }
}