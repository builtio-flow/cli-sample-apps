var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "remove_label_from_card",

  title: "Remove Label from Card",

  description: "",
  version: "v1",

  input: {
    title: 'Remove Label from Card',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 3,
        "description": "Select/specify the ID of the board of which card label you want to remove"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the list of which card label you want to remove",
        "type": "string",
        "propertyOrder": 4,
        "minLength": 1
      },
      "card_id": {
        "title": "Card ID",
        "description": "Select/specify the ID of the card of which label you want to remove",
        "type": "string",
        "propertyOrder": 5,
        "minLength": 1
      },
      "label_id": {
        "title": "Label ID",
        "description": "Select/specify the ID of the label you want to remove",
        "type": "string",
        "propertyOrder": 6,
        "minLength": 1
      }
    }
  },

  output: {
    "type": "object",
    "title": "output",
    "properties": {
      "id": {
        "type": "string",
        "title": "id",
        "displayTitle": "Card ID"
      },
      "badges_votes": {
        "title": "badges_votes",
        "displayTitle": "Number of Votes",
        "type": "number"
      },
      "badges_viewingMemberVoted": {
        "title": "badges_viewingMemberVoted",
        "displayTitle": "View Member Voted",
        "type": "boolean"
      },
      "badges_subscribed": {
        "title": "badges_subscribed",
        "displayTitle": "Is Subscribed",
        "type": "boolean"
      },
      "badges_fogbugz": {
        "title": "badges_fogbugz",
        "displayTitle": "Fogbugz",
        "type": "string"
      },
      "badges_checkItems": {
        "title": "badges_checkItems",
        "displayTitle": "Check Items Count",
        "type": "number"
      },
      "badges_checkItemsChecked": {
        "title": "badges_checkItemsChecked",
        "displayTitle": "Items Checked Count",
        "type": "number"
      },
      "badges_comments": {
        "title": "badges_comments",
        "displayTitle": "Comments Count",
        "type": "number"
      },
      "badges_attachments": {
        "title": "badges_attachments",
        "displayTitle": "Attachments Count",
        "type": "number"
      },
      "badges_description": {
        "title": "badges_description",
        "displayTitle": "Has Description",
        "type": "boolean"
      },
      "badges_due": {
        "title": "badges_due",
        "displayTitle": "Due Date",
        "type": "any"
      },
      "badges_dueComplete": {
        "title": "badges_dueComplete",
        "displayTitle": "Is task completed",
        "type": "any"
      },
      "badges_attachmentsByType": {
        "title": "badges_attachmentsByType",
        "displayTitle": "Attachments By Type",
        "type": "object",
        "properties": {
          "trello": {
            "title": "trello",
            "displayTitle": "Trello",
            "type": "object",
            "properties": {
              "board": {
                "title": "board",
                "displayTitle": "Board",
                "type": "any"
              },
              "card": {
                "title": "card",
                "displayTitle": "Card",
                "type": "any"
              }
            }
          }
        }
      },
      "checkItemStates": {
        "type": "array",
        "title": "checkItemStates",
        "displayTitle": "Check Item States",
        "items": {
          "type": "object",
          "properties": {
            "idCheckItem": {
              "type": "string",
              "title": "idCheckItem",
              "displayTitle": "Checklist ID"
            },
            "state": {
              "type": "string",
              "title": "state",
              "displayTitle": "Checklist State"
            }
          }
        }
      },
      "closed": {
        "type": "boolean",
        "title": "closed",
        "displayTitle": "Closed"
      },
      "dateLastActivity": {
        "type": "string",
        "title": "dateLastActivity",
        "displayTitle": "Date Last Activity"
      },
      "desc": {
        "type": "string",
        "title": "desc",
        "displayTitle": "Description"
      },
      "descData": {
        "title": "descData",
        "displayTitle": "Description Data",
        "type": "any"
      },
      "due": {
        "type": "any",
        "title": "due",
        "displayTitle": "Due"
      },
      "email": {
        "type": "any",
        "title": "email",
        "displayTitle": "Email"
      },
      "idChecklists": {
        "type": "array",
        "title": "idChecklists",
        "displayTitle": "Checklists ID",
        "items": {
          "type": "string"
        }
      },
      "idLabels": {
        "type": "array",
        "title": "idLabels",
        "displayTitle": "Labels ID",
        "items": {
          "type": "string"
        }
      },
      "idMembers": {
        "type": "array",
        "title": "idMembers",
        "displayTitle": "Members ID"
      },
      "idShort": {
        "type": "number",
        "title": "idShort",
        "displayTitle": "Short ID"
      },
      "idAttachmentCover": {
        "type": "any ",
        "title": "idAttachmentCover",
        "displayTitle": "Attachment Cover ID"
      },
      "manualCoverAttachment": {
        "type": "boolean",
        "title": "manualCoverAttachment",
        "displayTitle": "Manual Cover Attachment"
      },
      "labels": {
        "type": "array",
        "title": "labels",
        "displayTitle": "Labels",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "title": "id",
              "displayTitle": "Label ID"
            },
            "idBoard": {
              "type": "string",
              "title": "idBoard",
              "displayTitle": "Label Board ID"
            },
            "name": {
              "type": "string",
              "title": "name",
              "displayTitle": "Label Name"
            },
            "color": {
              "type": "string",
              "title": "color",
              "displayTitle": "Label Color"
            },
            "uses": {
              "type": "string",
              "title": "uses",
              "displayTitle": "Label Uses"
            }
          }
        }
      },
      "name": {
        "type": "string",
        "title": "name",
        "displayTitle": "Card Name"
      },
      "pos": {
        "type": "number",
        "title": "pos",
        "displayTitle": "Position"
      },
      "shortUrl": {
        "type": "string",
        "title": "shortUrl",
        "displayTitle": "Short URL"
      },
      "url": {
        "type": "string",
        "title": "url",
        "displayTitle": "URL"
      },
      "list_id": {
        "type": "string",
        "title": "list_id",
        "displayTitle": "List ID"
      },
      "list_name": {
        "type": "string",
        "title": "list_name",
        "displayTitle": "List Name"
      },
      "board_id": {
        "type": "string",
        "title": "board_id",
        "displayTitle": "Board ID"
      },
      "board_name": {
        "type": "string",
        "title": "board_name",
        "displayTitle": "Board Name"
      },
      "board_url": {
        "type": "string",
        "title": "board_url",
        "displayTitle": "Board URL"
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
    inputValidation(input, 'label_id', output);

    var option = {
      url: "https://api.trello.com/1/cards/" + input.card_id + "/idLabels/" + input.label_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      method: "DELETE",
      field:"Invalid Label ID"
    };

    requestCall(option)
    .then((body)=>{
      var optionCard = {
        url: "https://api.trello.com/1/card/" + input.card_id,
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        method: "GET",
        field:"Invalid Card ID"
      };

      var optionList = {
        url: "https://api.trello.com/1/lists/" + (body.idList || input.list_id),
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        method: "GET",
        field:"Invalid List ID"
      };
      var optionBoard= {
        url: "https://api.trello.com/1/boards/" + (body.idBoard || input.board_id),
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        method: "GET",
        field:"Invalid Board ID"
      };

      return P.all([requestCall(optionCard),requestCall(optionList),requestCall(optionBoard)])
    }).spread((dataCard,dataList,dataBoard)=>{
      flatten_schema(dataCard, 'badges');
      if(dataList && dataList.name){
        dataCard["list_id"]=dataCard.idList || dataList.id
        dataCard["list_name"]=dataList.name
        delete dataCard.idList
      }
      if(dataBoard && dataBoard.name){
        dataCard["board_id"]=dataCard.idBoard || dataBoard.id
        dataCard["board_name"]=dataBoard.name
        dataCard["board_url"]=dataBoard.url
        delete dataCard.idBoard
      }
      return output(null,dataCard);
    })
    .catch((err)=>{
      if (err === 'invalid value for idList' || err === 'Invalid objectId') {
        return output('Invalid list ID entered');
      }
      else if (err == 'invalid id' || err == 'board not found') {
        return output('Invalid Board ID')
      }else if (err == 'card not found') {
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

function flatten_schema(src, val) {
  if (src[val]) {
    Object.keys(src[val]).map(function (n) {
      src['badges_' + n] = src[val][n];
    });
    delete src[val];
  }
}

function requestCall(options) {
  if(options.field){
    var value=options.field
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
        if(data == 'invalid id'){
          data=value
        }
        return reject(data);
      }
      if (res && res.statusCode === 200) {
        return resolve(data);
      } else {
        if(data == 'invalid id'){
          data=value
        }
        return reject(data);
      }
    })
  })
}
