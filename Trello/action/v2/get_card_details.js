var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "get_card_details",

  title: "Get Card Details",

  description: "",
  version: "v2",

  input: {
    title: 'Get Card Details',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 3,
        "description": "Select/specify the ID of the board of which card details you want to retrieve"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the list of which card details you want to retrieve",
        "type": "string",
        "propertyOrder": 4,
        "minLength": 1
      },
      "card_id": {
        "title": "Card ID",
        "description": "Select/specify the ID of the card of which details you want to retrieve",
        "type": "string",
        "propertyOrder": 4,
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
      "checkItemStates": {
        "title": "checkItemStates",
        "type": "array",
        "displayTitle": "Checkitemstates",
        "items": {
          "type": "any"
        }
      },
      "closed": {
        "title": "closed",
        "type": "boolean",
        "displayTitle": "Closed"
      },
      "dueComplete": {
        "title": "dueComplete",
        "type": "boolean",
        "displayTitle": "Duecomplete"
      },
      "dateLastActivity": {
        "title": "dateLastActivity",
        "type": "string",
        "displayTitle": "Datelastactivity"
      },
      "desc": {
        "title": "desc",
        "type": "string",
        "displayTitle": "Desc"
      },
      "descData": {
        "title": "descData",
        "type": "any",
        "displayTitle": "Descdata"
      },
      "due": {
        "title": "due",
        "type": "any",
        "displayTitle": "Due"
      },
      "email": {
        "title": "email",
        "type": "any",
        "displayTitle": "Email"
      },
      "idChecklists": {
        "title": "idChecklists",
        "type": "array",
        "displayTitle": "IDCHECKLISTS",
        "items": {
          "type": "any"
        }
      },
      "idMembers": {
        "title": "idMembers",
        "type": "array",
        "displayTitle": "IDMEMBERS",
        "items": {
          "type": "any"
        }
      },
      "idMembersVoted": {
        "title": "idMembersVoted",
        "type": "array",
        "displayTitle": "IDMEMBERSVOTED",
        "items": {
          "type": "any"
        }
      },
      "idShort": {
        "title": "idShort",
        "type": "number",
        "displayTitle": "IDSHORT"
      },
      "idAttachmentCover": {
        "title": "idAttachmentCover",
        "type": "any",
        "displayTitle": "IDATTACHMENTCOVER"
      },
      "labels": {
        "title": "labels",
        "type": "array",
        "displayTitle": "Labels",
        "items": {
          "type": "any"
        }
      },
      "idLabels": {
        "title": "idLabels",
        "type": "array",
        "displayTitle": "IDLABELS",
        "items": {
          "type": "any"
        }
      },
      "manualCoverAttachment": {
        "title": "manualCoverAttachment",
        "type": "boolean",
        "displayTitle": "Manualcoverattachment"
      },
      "name": {
        "title": "name",
        "type": "string",
        "displayTitle": "Name"
      },
      "pos": {
        "title": "pos",
        "type": "number",
        "displayTitle": "Pos"
      },
      "shortLink": {
        "title": "shortLink",
        "type": "string",
        "displayTitle": "Shortlink"
      },
      "shortUrl": {
        "title": "shortUrl",
        "type": "string",
        "displayTitle": "Shorturl"
      },
      "subscribed": {
        "title": "subscribed",
        "type": "boolean",
        "displayTitle": "Subscribed"
      },
      "url": {
        "title": "url",
        "type": "string",
        "displayTitle": "URL"
      },
      "badges_votes": {
        "title": "badges_votes",
        "type": "number",
        "displayTitle": "Badges Votes"
      },
      "badges_attachmentsByType": {
        "title": "badges_attachmentsByType",
        "type": "object",
        "displayTitle": "Badges Attachmentsbytype",
        "properties": {
          "trello": {
            "title": "trello",
            "type": "object",
            "displayTitle": "Badges Attachmentsbytype Trello",
            "properties": {
              "board": {
                "title": "board",
                "type": "number",
                "displayTitle": "Badges Attachmentsbytype Trello Board"
              },
              "card": {
                "title": "card",
                "type": "number",
                "displayTitle": "Badges Attachmentsbytype Trello Card"
              }
            }
          }
        }
      },
      "badges_viewingMemberVoted": {
        "title": "badges_viewingMemberVoted",
        "type": "boolean",
        "displayTitle": "Badges Viewingmembervoted"
      },
      "badges_subscribed": {
        "title": "badges_subscribed",
        "type": "boolean",
        "displayTitle": "Badges Subscribed"
      },
      "badges_fogbugz": {
        "title": "badges_fogbugz",
        "type": "string",
        "displayTitle": "Badges Fogbugz"
      },
      "badges_checkItems": {
        "title": "badges_checkItems",
        "type": "number",
        "displayTitle": "Badges Checkitems"
      },
      "badges_checkItemsChecked": {
        "title": "badges_checkItemsChecked",
        "type": "number",
        "displayTitle": "Badges Checkitemschecked"
      },
      "badges_comments": {
        "title": "badges_comments",
        "type": "number",
        "displayTitle": "Badges Comments"
      },
      "badges_attachments": {
        "title": "badges_attachments",
        "type": "number",
        "displayTitle": "Badges Attachments"
      },
      "badges_description": {
        "title": "badges_description",
        "type": "boolean",
        "displayTitle": "Badges Description"
      },
      "badges_due": {
        "title": "badges_due",
        "type": "any",
        "displayTitle": "Badges Due"
      },
      "badges_dueComplete": {
        "title": "badges_dueComplete",
        "type": "boolean",
        "displayTitle": "Badges Duecomplete"
      },
      "comments": {
        "title": "comments",
        "type": "array",
        "displayTitle": "Comments",
        "items": {
          "type": "object",
          "properties": {
            "comment": {
              "title": "comment",
              "type": "string",
              "displayTitle": "Comments Comment"
            },
            "date": {
              "title": "date",
              "type": "string",
              "displayTitle": "Comments Date"
            },
            "member_id": {
              "title": "member_id",
              "type": "string",
              "displayTitle": "Comments Member ID"
            },
            "member_fullname": {
              "title": "member_fullname",
              "type": "string",
              "displayTitle": "Comments Member Fullname"
            },
            "member_username": {
              "title": "member_username",
              "type": "string",
              "displayTitle": "Comments Member Username"
            }
          }
        }
      },
      "list_id": {
        "title": "list_id",
        "type": "string",
        "displayTitle": "List ID"
      },
      "list_name": {
        "title": "list_name",
        "type": "string",
        "displayTitle": "List Name"
      },
      "board_id": {
        "title": "board_id",
        "type": "string",
        "displayTitle": "Board ID"
      },
      "board_name": {
        "title": "board_name",
        "type": "string",
        "displayTitle": "Board Name"
      },
      "board_url": {
        "title": "board_url",
        "type": "string",
        "displayTitle": "Board URL"
      }
    }
  },

  mock_input: {
    "board_id": "5b7e50fc150b083ec0ad3219",
    "list_id": "5bbb379bb5529549ce7b419d",
    "card_id": "5bbb4d4b0c1a89544b84e784",
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'board_id', output);
    inputValidation(input, 'list_id', output);
    inputValidation(input, 'card_id', output);



    var optionCard = {
      url: "https://api.trello.com/1/card/" + input.card_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      method: "GET",
      field: "Invalid Card ID"
    };

    var optionList = {
      url: "https://api.trello.com/1/lists/" + input.list_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      method: "GET",
      field: "Invalid List ID"
    };
    var optionBoard = {
      url: "https://api.trello.com/1/boards/" + input.board_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      method: "GET",
      field: "Invalid Board ID"
    };

    P.all([requestCall(optionBoard), requestCall(optionList), requestCall(optionCard)])
      .spread((dataBoard, dataList, dataCheck) => {

        if (dataCheck.idBoard !== input.board_id) {
          return output("Invalid Board ID")
        }
        if (dataCheck.idList !== input.list_id) {
          return output("Invalid List ID")
        }

        var option = {
          url: "https://api.trello.com/1/cards/" + input.card_id,
          qs: {
            key: input.auth.key,
            token: input.auth.access_token
          },
          field: "Invalid Card ID"
        };

        var cardActions = {
          url: "https://api.trello.com/1/cards/" + input.card_id + "/actions",
          qs: {
            key: input.auth.key,
            token: input.auth.access_token,
            filter: "commentCard"
          },
          field: "Invalid Card ID"
        };
        P.all([requestCall(option), requestCall(cardActions)])
          .spread((dataCard, dataAction) => {
            flatten_schema(dataCard, 'badges');
            dataCard.comments=[]
            dataAction && dataAction.length >0 && dataAction.forEach(element => {
              let tempObj ={}
              tempObj["comment"] = element.data && element.data.text || ""
              tempObj["date"]=element.date
              tempObj["member_id"]=element.memberCreator && element.memberCreator.id
              tempObj["member_fullname"]=element.memberCreator && element.memberCreator.fullName
              tempObj["member_username"]=element.memberCreator && element.memberCreator.username
              dataCard.comments.push(tempObj)
            });
            if (dataList && dataList.name) {
              dataCard["list_id"] = dataCard.idList || dataList.id
              dataCard["list_name"] = dataList.name
              delete dataCard.idList
            }
            if (dataBoard && dataBoard.name) {
              dataCard["board_id"] = dataCard.idBoard || dataBoard.id
              dataCard["board_name"] = dataBoard.name
              dataCard["board_url"] = dataBoard.url
              delete dataCard.idBoard
            }
            return output(null, dataCard);
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