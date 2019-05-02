var request = require('request');

module.exports = {

  name: "rename_checklist",

  title: "Rename Checklist",

  description: "",
  version: "v1",

  input: {
    title: 'Rename Checklist',
    type: 'object',
    properties: {
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board of which checklist you want to rename"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the list of which checklist you want to rename",
        "type": "string",
        "propertyOrder": 3,
        "minLength": 1
      },
      "card_id": {
        "title": "Card ID",
        "description": "Select/specify the ID of the card of which checklist you want to rename",
        "type": "string",
        "propertyOrder": 4,
        "minLength": 1
      },
      "checklist_id": {
        "title": "Checklist ID",
        "description": "Select/specify the ID of the checklist you want to rename",
        "type": "string",
        "propertyOrder": 5,
        "minLength": 1
      },
      "name": {
        "title": "New Checklist Name",
        "type": "string",
        "propertyOrder": 6,
        "description": "Enter the new name of the checklist",
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
      "name": {
        "title": "name",
        "type": "string",
        "displayTitle": "Name"
      },
      "idBoard": {
        "title": "idBoard",
        "type": "string",
        "displayTitle": "IDBOARD"
      },
      "idCard": {
        "title": "idCard",
        "type": "string",
        "displayTitle": "IDCARD"
      },
      "pos": {
        "title": "pos",
        "type": "number",
        "displayTitle": "Pos"
      },
      "checkItems": {
        "title": "checkItems",
        "type": "array",
        "displayTitle": "Checkitems",
        "items": {
          "type": "object",
          "properties": {
            "idChecklist": {
              "title": "idChecklist",
              "type": "string",
              "displayTitle": "Checkitems IDCHECKLIST"
            },
            "state": {
              "title": "state",
              "type": "string",
              "displayTitle": "Checkitems State"
            },
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Checkitems ID"
            },
            "name": {
              "title": "name",
              "type": "string",
              "displayTitle": "Checkitems Name"
            },
            "nameData": {
              "title": "nameData",
              "type": "any",
              "displayTitle": "Checkitems Namedata"
            },
            "pos": {
              "title": "pos",
              "type": "number",
              "displayTitle": "Checkitems Pos"
            }
          }
        }
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

    inputValidation(input, 'checklist_id', output);
    inputValidation(input, 'name', output);

    var option = {
      url: "https://api.trello.com/1/checklists/" + input.checklist_id + "/name",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        value: input.name
      },
      field:"Invalid Checklist ID"
    };
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
          return output('Invalid input entered')
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
