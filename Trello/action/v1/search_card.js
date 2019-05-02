var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "search_card",

  title: "Search Card",

  description: "",
  version: "v1",

  input:{
    title: "Search Card",
    type: 'object',
    properties: {
      "query": {
        "title": "Query",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Enter the name or shortURL of the card you want to search. E.g., if the URL of the card is ‘https://trello.com/c/oAiKKTcY/demo-card’, then ‘oAiKKTcY’ is the shortURL of the card. The search query range is from 1 to 16384 characters"
      }
    }
  },

  output: {
    "type": "object",
    "title": "output",
    "properties": {
      "cards": {
        "title": "cards",
        "type": "array",
        "displayTitle": "Cards",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Cards ID"
            },
            "checkItemStates": {
              "title": "checkItemStates",
              "type": "array",
              "displayTitle": "Cards Checkitemstates",
              "items": {
                "type": "any"
              }
            },
            "closed": {
              "title": "closed",
              "type": "boolean",
              "displayTitle": "Cards Closed"
            },
            "dueComplete": {
              "title": "dueComplete",
              "type": "boolean",
              "displayTitle": "Cards Duecomplete"
            },
            "dateLastActivity": {
              "title": "dateLastActivity",
              "type": "string",
              "displayTitle": "Cards Datelastactivity"
            },
            "desc": {
              "title": "desc",
              "type": "string",
              "displayTitle": "Cards Desc"
            },
            "descData": {
              "title": "descData",
              "type": "any",
              "displayTitle": "Cards Descdata"
            },
            "due": {
              "title": "due",
              "type": "any",
              "displayTitle": "Cards Due"
            },
            "email": {
              "title": "email",
              "type": "any",
              "displayTitle": "Cards Email"
            },
            "idBoard": {
              "title": "idBoard",
              "type": "string",
              "displayTitle": "Cards IDBOARD"
            },
            "idChecklists": {
              "title": "idChecklists",
              "type": "array",
              "displayTitle": "Cards IDCHECKLISTS",
              "items": {
                "type": "any"
              }
            },
            "idList": {
              "title": "idList",
              "type": "string",
              "displayTitle": "Cards IDLIST"
            },
            "idMembers": {
              "title": "idMembers",
              "type": "array",
              "displayTitle": "Cards IDMEMBERS",
              "items": {
                "type": "any"
              }
            },
            "idMembersVoted": {
              "title": "idMembersVoted",
              "type": "array",
              "displayTitle": "Cards IDMEMBERSVOTED",
              "items": {
                "type": "any"
              }
            },
            "idShort": {
              "title": "idShort",
              "type": "number",
              "displayTitle": "Cards IDSHORT"
            },
            "idAttachmentCover": {
              "title": "idAttachmentCover",
              "type": "any",
              "displayTitle": "Cards IDATTACHMENTCOVER"
            },
            "labels": {
              "title": "labels",
              "type": "array",
              "displayTitle": "Cards Labels",
              "items": {
                "type": "any"
              }
            },
            "idLabels": {
              "title": "idLabels",
              "type": "array",
              "displayTitle": "Cards IDLABELS",
              "items": {
                "type": "any"
              }
            },
            "manualCoverAttachment": {
              "title": "manualCoverAttachment",
              "type": "boolean",
              "displayTitle": "Cards Manualcoverattachment"
            },
            "name": {
              "title": "name",
              "type": "string",
              "displayTitle": "Cards Name"
            },
            "pos": {
              "title": "pos",
              "type": "number",
              "displayTitle": "Cards Pos"
            },
            "shortLink": {
              "title": "shortLink",
              "type": "string",
              "displayTitle": "Cards Shortlink"
            },
            "shortUrl": {
              "title": "shortUrl",
              "type": "string",
              "displayTitle": "Cards Shorturl"
            },
            "subscribed": {
              "title": "subscribed",
              "type": "boolean",
              "displayTitle": "Cards Subscribed"
            },
            "url": {
              "title": "url",
              "type": "string",
              "displayTitle": "Cards URL"
            },
            "badges_votes": {
              "title": "badges_votes",
              "type": "number",
              "displayTitle": "Cards Badges Votes"
            },
            "badges_attachmentsByType": {
              "title": "badges_attachmentsByType",
              "type": "object",
              "displayTitle": "Cards Badges Attachmentsbytype",
              "properties": {
                "trello": {
                  "title": "trello",
                  "type": "object",
                  "displayTitle": "Cards Badges Attachmentsbytype Trello",
                  "properties": {
                    "board": {
                      "title": "board",
                      "type": "number",
                      "displayTitle": "Cards Badges Attachmentsbytype Trello Board"
                    },
                    "card": {
                      "title": "card",
                      "type": "number",
                      "displayTitle": "Cards Badges Attachmentsbytype Trello Card"
                    }
                  }
                }
              }
            },
            "badges_viewingMemberVoted": {
              "title": "badges_viewingMemberVoted",
              "type": "boolean",
              "displayTitle": "Cards Badges Viewingmembervoted"
            },
            "badges_subscribed": {
              "title": "badges_subscribed",
              "type": "boolean",
              "displayTitle": "Cards Badges Subscribed"
            },
            "badges_fogbugz": {
              "title": "badges_fogbugz",
              "type": "string",
              "displayTitle": "Cards Badges Fogbugz"
            },
            "badges_checkItems": {
              "title": "badges_checkItems",
              "type": "number",
              "displayTitle": "Cards Badges Checkitems"
            },
            "badges_checkItemsChecked": {
              "title": "badges_checkItemsChecked",
              "type": "number",
              "displayTitle": "Cards Badges Checkitemschecked"
            },
            "badges_comments": {
              "title": "badges_comments",
              "type": "number",
              "displayTitle": "Cards Badges Comments"
            },
            "badges_attachments": {
              "title": "badges_attachments",
              "type": "number",
              "displayTitle": "Cards Badges Attachments"
            },
            "badges_description": {
              "title": "badges_description",
              "type": "boolean",
              "displayTitle": "Cards Badges Description"
            },
            "badges_due": {
              "title": "badges_due",
              "type": "any",
              "displayTitle": "Cards Badges Due"
            },
            "badges_dueComplete": {
              "title": "badges_dueComplete",
              "type": "boolean",
              "displayTitle": "Cards Badges Duecomplete"
            },
            "list_id": {
              "title": "list_id",
              "type": "string",
              "displayTitle": "Cards List ID"
            },
            "list_name": {
              "title": "list_name",
              "type": "string",
              "displayTitle": "Cards List Name"
            },
            "list_closed": {
              "title": "list_closed",
              "type": "boolean",
              "displayTitle": "Cards List Closed"
            },
            "list_idBoard": {
              "title": "list_idBoard",
              "type": "string",
              "displayTitle": "Cards List IDBOARD"
            },
            "list_pos": {
              "title": "list_pos",
              "type": "number",
              "displayTitle": "Cards List Pos"
            },
            "list_subscribed": {
              "title": "list_subscribed",
              "type": "boolean",
              "displayTitle": "Cards List Subscribed"
            },
            "board_id": {
              "title": "board_id",
              "type": "string",
              "displayTitle": "Cards Board ID"
            },
            "board_name": {
              "title": "board_name",
              "type": "string",
              "displayTitle": "Cards Board Name"
            },
            "board_idOrganization": {
              "title": "board_idOrganization",
              "type": "any",
              "displayTitle": "Cards Board IDORGANIZATION"
            },
            "board_url": {
              "title": "board_url",
              "type": "string",
              "displayTitle": "Cards Board URL"
            }
          }
        }
      }
    }
  },

  mock_input: {
    "query": "6yE306Tk"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here

    var option = {
      url: "https://api.trello.com/1/search",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        query: input.query,
        modelTypes:"cards",
        card_board:true,
        card_list:true

      },
      field: "Invalid Card ID"
    };
    requestCall(option)
      .then((body) => {
        if (body && body.cards && body.cards.length > 0) {

          body.cards.map(dataCard => {
            flatten_schema(dataCard, 'badges',"badges_");
            flatten_schema(dataCard, 'list',"list_");
            if(dataCard.board)
            dataCard.board.url = "https://trello.com/b/"+dataCard.board.id
            flatten_schema(dataCard, 'board',"board_");
          })
        }
        return output(null, {cards:body.cards});
      })
      .catch((err) => {
        if (err == 'card not found') {
          return output('Invalid Query')
        }
        else {
          return output(err);
        }
      })
  }
}

function flatten_schema(src, val,prefix) {
  if (src[val]) {
    Object.keys(src[val]).map(function (n) {
      src[prefix + n] = src[val][n];
    });
    delete src[val];
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