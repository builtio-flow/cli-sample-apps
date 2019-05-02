var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "get_cards",

  title: "Get Board Cards",

  description: "",
  version: "v1",

  input: {
    title: 'Get Board Cards',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board of which card details you want to retrieve"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the list of which card details you want to retrieve",
        "type": "string",
        "propertyOrder": 3
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
      "cards": {
        "type": "array",
        "title": "cards",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "0 ID"
            },
            "checkItemStates": {
              "title": "checkItemStates",
              "type": "any",
              "displayTitle": "0 Checkitemstates"
            },
            "closed": {
              "title": "closed",
              "type": "boolean",
              "displayTitle": "0 Closed"
            },
            "dateLastActivity": {
              "title": "dateLastActivity",
              "type": "string",
              "displayTitle": "0 Datelastactivity"
            },
            "desc": {
              "title": "desc",
              "type": "string",
              "displayTitle": "0 Desc"
            },
            "descData": {
              "title": "descData",
              "type": "any",
              "displayTitle": "0 Descdata"
            },
            "idBoard": {
              "title": "idBoard",
              "type": "string",
              "displayTitle": "0 IDBOARD"
            },
            "idList": {
              "title": "idList",
              "type": "string",
              "displayTitle": "0 IDLIST"
            },
            "idMembersVoted": {
              "title": "idMembersVoted",
              "type": "array",
              "displayTitle": "0 IDMEMBERSVOTED",
              "items": {
                "type": "any"
              }
            },
            "idShort": {
              "title": "idShort",
              "type": "number",
              "displayTitle": "0 IDSHORT"
            },
            "idAttachmentCover": {
              "title": "idAttachmentCover",
              "type": "any",
              "displayTitle": "0 IDATTACHMENTCOVER"
            },
            "idLabels": {
              "title": "idLabels",
              "type": "array",
              "displayTitle": "0 IDLABELS",
              "items": {
                "type": "string"
              }
            },
            "manualCoverAttachment": {
              "title": "manualCoverAttachment",
              "type": "boolean",
              "displayTitle": "0 Manualcoverattachment"
            },
            "name": {
              "title": "name",
              "type": "string",
              "displayTitle": "0 Name"
            },
            "pos": {
              "title": "pos",
              "type": "number",
              "displayTitle": "0 Pos"
            },
            "shortLink": {
              "title": "shortLink",
              "type": "string",
              "displayTitle": "0 Shortlink"
            },
            "dueComplete": {
              "title": "dueComplete",
              "type": "boolean",
              "displayTitle": "0 Duecomplete"
            },
            "due": {
              "title": "due",
              "type": "any",
              "displayTitle": "0 Due"
            },
            "idChecklists": {
              "title": "idChecklists",
              "type": "array",
              "displayTitle": "0 IDCHECKLISTS",
              "items": {
                "type": "any"
              }
            },
            "idMembers": {
              "title": "idMembers",
              "type": "array",
              "displayTitle": "0 IDMEMBERS",
              "items": {
                "type": "string"
              }
            },
            "labels": {
              "title": "labels",
              "type": "array",
              "displayTitle": "0 Labels",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "title": "id",
                    "type": "string",
                    "displayTitle": "0 Labels ID"
                  },
                  "idBoard": {
                    "title": "idBoard",
                    "type": "string",
                    "displayTitle": "0 Labels IDBOARD"
                  },
                  "name": {
                    "title": "name",
                    "type": "string",
                    "displayTitle": "0 Labels Name"
                  },
                  "color": {
                    "title": "color",
                    "type": "string",
                    "displayTitle": "0 Labels Color"
                  }
                }
              }
            },
            "shortUrl": {
              "title": "shortUrl",
              "type": "string",
              "displayTitle": "0 Shorturl"
            },
            "subscribed": {
              "title": "subscribed",
              "type": "boolean",
              "displayTitle": "0 Subscribed"
            },
            "url": {
              "title": "url",
              "type": "string",
              "displayTitle": "0 URL"
            },
            "badges_votes": {
              "title": "badges_votes",
              "type": "number",
              "displayTitle": "0 Badges Votes"
            },
            "badges_attachmentsByType": {
              "title": "badges_attachmentsByType",
              "type": "object",
              "displayTitle": "0 Badges Attachmentsbytype",
              "properties": {
                "trello": {
                  "title": "trello",
                  "type": "object",
                  "displayTitle": "0 Badges Attachmentsbytype Trello",
                  "properties": {
                    "board": {
                      "title": "board",
                      "type": "number",
                      "displayTitle": "0 Badges Attachmentsbytype Trello Board"
                    },
                    "card": {
                      "title": "card",
                      "type": "number",
                      "displayTitle": "0 Badges Attachmentsbytype Trello Card"
                    }
                  }
                }
              }
            },
            "badges_viewingMemberVoted": {
              "title": "badges_viewingMemberVoted",
              "type": "boolean",
              "displayTitle": "0 Badges Viewingmembervoted"
            },
            "badges_subscribed": {
              "title": "badges_subscribed",
              "type": "boolean",
              "displayTitle": "0 Badges Subscribed"
            },
            "badges_fogbugz": {
              "title": "badges_fogbugz",
              "type": "string",
              "displayTitle": "0 Badges Fogbugz"
            },
            "badges_checkItems": {
              "title": "badges_checkItems",
              "type": "number",
              "displayTitle": "0 Badges Checkitems"
            },
            "badges_checkItemsChecked": {
              "title": "badges_checkItemsChecked",
              "type": "number",
              "displayTitle": "0 Badges Checkitemschecked"
            },
            "badges_comments": {
              "title": "badges_comments",
              "type": "number",
              "displayTitle": "0 Badges Comments"
            },
            "badges_attachments": {
              "title": "badges_attachments",
              "type": "number",
              "displayTitle": "0 Badges Attachments"
            },
            "badges_description": {
              "title": "badges_description",
              "type": "boolean",
              "displayTitle": "0 Badges Description"
            },
            "badges_due": {
              "title": "badges_due",
              "type": "any",
              "displayTitle": "0 Badges Due"
            },
            "badges_dueComplete": {
              "title": "badges_dueComplete",
              "type": "boolean",
              "displayTitle": "0 Badges Duecomplete"
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

    var statusObj = {
      "Visible": "visible", "Archived": "closed", "Unarchived": "open", "All": "all"
    }
    var option = {
      url: "https://api.trello.com/1/boards/" + input.board_id + "/cards",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        filter: statusObj[input.status]
      },
      field: "Invalid Board ID"
    };

    if (input.list_id && input.list_id !== "") {
      option.url = "https://api.trello.com/1/lists/" + input.list_id + "/cards",
      option.field= "Invalid List ID"
    }

    requestCall(option)
      .then((body) => {
        if (body && body.length > 0) {
          body.map(dataCard => {
            flatten_schema(dataCard, 'badges');
          })
        }
        return output(null, {cards:body});
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

function flatten_schema(src, val) {
  if (src[val]) {
    Object.keys(src[val]).map(function (n) {
      src['badges_' + n] = src[val][n];
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