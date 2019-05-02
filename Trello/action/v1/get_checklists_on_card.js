var request = require('request');
  const P = require('bluebird');

  module.exports = {

    name: "get_checklists_on_card",

    title: "Get Checklists on Card",

    description: "",
    version: "v1",

    input: {
      title: 'Get Checklists on Card',
      type: 'object',
      properties: {
        "board_id": {
          "title": "Board ID",
          "minLength": 1,
          "type": "string",
          "propertyOrder": 2,
          "description": "Select/specify the ID of the board of which checklist details you want to retrieve"
        },
        "list_id": {
          "title": "List ID",
          "description": "Select/specify the ID of the list of which checklist details you want to retrieve",
          "type": "string",
          "minLength": 1,
          "propertyOrder": 3
        },
        "card_id": {
          "title": "Card ID",
          "description": "Select/specify the ID of the list of which checklist details you want to retrieve",
          "type": "string",
          "minLength": 1,
          "propertyOrder": 4
        }
      }
    },

    output: {
      "type": "object",
      "title": "output",
      "properties": {
        "checklists": {
          "title": "checklists",
          "type": "array",
          "displayTitle": "Checklists",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "title": "id",
                "type": "string",
                "displayTitle": "Cards ID"
              },
              "name": {
                "title": "name",
                "type": "string",
                "displayTitle": "Cards Name"
              },
              "idBoard": {
                "title": "idBoard",
                "type": "string",
                "displayTitle": "Cards IDBOARD"
              },
              "idCard": {
                "title": "idCard",
                "type": "string",
                "displayTitle": "Cards IDCARD"
              },
              "pos": {
                "title": "pos",
                "type": "number",
                "displayTitle": "Cards Pos"
              },
              "checkItems": {
                "title": "checkItems",
                "type": "array",
                "displayTitle": "Cards Checkitems",
                "items": {
                  "type": "object",
                  "properties": {
                    "idChecklist": {
                      "title": "idChecklist",
                      "type": "string",
                      "displayTitle": "Cards Checkitems IDCHECKLIST"
                    },
                    "state": {
                      "title": "state",
                      "type": "string",
                      "displayTitle": "Cards Checkitems State"
                    },
                    "id": {
                      "title": "id",
                      "type": "string",
                      "displayTitle": "Cards Checkitems ID"
                    },
                    "name": {
                      "title": "name",
                      "type": "string",
                      "displayTitle": "Cards Checkitems Name"
                    },
                    "nameData": {
                      "title": "nameData",
                      "type": "any",
                      "displayTitle": "Cards Checkitems Namedata"
                    },
                    "pos": {
                      "title": "pos",
                      "type": "number",
                      "displayTitle": "Cards Checkitems Pos"
                    }
                  }
                }
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
      inputValidation(input, 'list_id', output);
      inputValidation(input, 'card_id', output);

      var option = {
        url: "https://api.trello.com/1/cards/" + input.card_id + "/checklists",
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        field: "Invalid Card ID"
      };

      requestCall(option)
        .then((body) => {
          return output(null, {checklists:body});
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
