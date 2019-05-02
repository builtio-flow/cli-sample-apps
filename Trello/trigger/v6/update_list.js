var request = require('request');
var _ = require('lodash');
const P = require('bluebird');
var baseURL = "https://api.trello.com/1/webhooks";

module.exports = {

  name: "update_list",

  label: "Update List",

  version: "v6",

  input: {
    type: 'object',
    title: 'Update List',
    description: "Short description",
    properties: {
      event: {
        type: 'string',
        enum: ['update_list']
      },
      polling: {
        type: 'boolean',
        default: false,
        options: {
          hidden: true
        }
      },
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board for which you want to set the trigger"
      },
      list_id: {
        "title": "List ID",
        "type": "string",
        "propertyOrder": 3,
        "description": "Select/specify the ID of the list for which you want to set the trigger"
      },
      event_filters: {
        "title": "Filters",
        "type": "array",
        "maxItems": 3,
        "propertyOrder": 4,
        "description": "Provides the list of filters by which you want to filter the result",
        "items": {
          "type": 'object',
          "properties": {
            "filter": {
              "title": "Filter Name",
              "type": "string",
              "description": "Select the name of the filter by which you want to filter the result",
              "enum": [
                "List Rename",
                "List Moved Left/Right",
                "List Archived/Unarchived"
              ]
            }
          }
        }
      }
    }
  },

  output: {
    "update_list": {
      "type": "object",
      "properties": {
        "action": {
          "title": "action",
          "displayTitle": "Action",
          "type": "object",
          "properties": {
            "card_name": {
              "title": "card_name",
              "displayTitle": "Card Name",
              "type": "string"
            },
            "card_id": {
              "title": "card_id",
              "displayTitle": "Card ID",
              "type": "string"
            },
            "desc": {
              "title": "desc",
              "displayTitle": "Card Description",
              "type": "string"
            },
            "list_name": {
              "title": "list_name",
              "displayTitle": "List Name",
              "type": "string"
            },
            "list_id": {
              "title": "list_id",
              "displayTitle": "List ID",
              "type": "string"
            },
            "board_name": {
              "title": "board_name",
              "displayTitle": "Board Name",
              "type": "string"
            },
            "board_id": {
              "title": "board_id",
              "displayTitle": "Board ID",
              "type": "string"
            },
            "date": {
              "title": "date",
              "displayTitle": "Updated Date",
              "type": "string"
            },
            "due": {
              "title": "due",
              "displayTitle": "Due Date",
              "type": "string"
            },
            "type": {
              "title": "type",
              "displayTitle": "Event Type",
              "type": "string"
            },
            "old_desc": {
              "title": "old_desc",
              "displayTitle": "Old Description",
              "type": "string"
            },
            "old_closed": {
              "title": "old_closed",
              "displayTitle": "Old Closed",
              "type": "boolean"
            },
            "card_pos": {
              "title": "card_pos",
              "displayTitle": "Card Position",
              "type": "number"
            },
            "old_pos": {
              "title": "old_pos",
              "displayTitle": "Old Position",
              "type": "number"
            },
            "old_name": {
              "title": "old_name",
              "displayTitle": "Old Name",
              "type": "string"
            },
            "old_due": {
              "title": "old_due",
              "displayTitle": "Old Due Date",
              "type": "string"
            },
            "idMemberCreator": {
              "title": "idMemberCreator",
              "displayTitle": "Member Creator ID",
              "type": "string"
            },
            "memberCreator_avatarHash": {
              "title": "memberCreator_avatarHash",
              "displayTitle": "Member Creator Avatar Hash",
              "type": "string"
            },
            "memberCreator_fullName": {
              "title": "memberCreator_fullName",
              "displayTitle": "Member Creator Full Name",
              "type": "string"
            },
            "memberCreator_initials": {
              "title": "memberCreator_initials",
              "displayTitle": "Member Creator Initial",
              "type": "string"
            },
            "memberCreator_username": {
              "title": "memberCreator_username",
              "displayTitle": "Member Creator User Name",
              "type": "string"
            },
            "closed": {
              "title": "closed",
              "displayTitle": "Closed",
              "type": "boolean"
            },
            "dateLastActivity": {
              "title": "dateLastActivity",
              "type": "string"
            },
            "email": {
              "title": "email",
              "type": "any"
            },
            "shortUrl": {
              "title": "shortUrl",
              "displayTitle": "Card Short URL",
              "type": "string"
            },
            "url": {
              "title": "url",
              "displayTitle": "Card URL",
              "type": "string"
            }
          }
        }
      }
    }
  },

  mock_data: {
    "event_type": "Update List",
    "model": {
      "id": "58fef3816daf33593cc95661",
      "name": "New List",
      "desc": "This is description for update list",
      "closed": false,
      "idOrganization": "5b58891d65954fa12f61c850",
      "pinned": false,
      "prefs": {
        "permissionLevel": "public",
        "voting": "disabled",
        "comments": "members",
        "invitations": "members",
        "selfJoin": true,
        "cardCovers": true,
        "cardAging": "regular",
        "calendarFeedEnabled": false,
        "background": "blue",
        "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1365x2048/a5190a8afcdc09905ee74fe3356deedb/photo-1540167584945-236a12bd93b2",
        "backgroundImageScaled": [
          {
            "width": 67,
            "height": 100,
            "url": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/3283cf8052b9e62bfb48e0d76d7ef23c/photo-1540167584945-236a12bd93b2.jpg"
          }
        ],
        "backgroundTile": false,
        "backgroundBrightness": "dark",
        "backgroundColor": "#0079BF",
        "backgroundBottomColor": "#0079BF",
        "backgroundTopColor": "#0079BF",
        "canBePublic": true,
        "canBeOrg": true,
        "canBePrivate": true,
        "canInvite": true
      },
      "labelNames": {
        "green": "Label 1",
        "yellow": "Label 2",
        "orange": "Label 3",
        "red": "Label 4",
        "purple": "Label 5",
        "blue": "Label 6",
        "sky": "Label 7",
        "lime": "Label 8",
        "pink": "Label 9",
        "black": "Label 10"
      },
      "board_url": "https://trello.com/b/bcJVxZKI/new-board",
      "board_shortUrl": "https://trello.com/b/bcJVxZKI"
    },
    "action": {
      "id": "5909666f9b9dcc39e1b81e0a",
      "idMemberCreator": "5746840c79f0050d954befaa",
      "type": "createList",
      "date": "2018-07-26T07:24:59.843Z",
      "display": {
        "translationKey": "action_renamed_list",
        "entities": {
          "list": {
            "type": "list",
            "pos": 1234,
            "id": "5b5eb4f8eebfb0eeb2068354",
            "text": "New List",
            "closed": false
          },
          "name": {
            "type": "text",
            "text": "Old Name"
          },
          "board": {
            "type": "board",
            "id": "58fef3816daf33593cc95661",
            "text": "New Board",
            "shortLink": "bcJVxZKI"
          },
          "memberCreator": {
            "type": "member",
            "id": "5746840c79f0050d954befaa",
            "username": "johnsmith",
            "text": "John Smith"
          }
        }
      },
      "board_shortLink": "bcJVxZKI",
      "board_name": "Task Tracker",
      "board_id": "58fef3816daf33593cc95661",
      "list_name": "Developer Tasks",
      "old_name": "Tasks",
      "list_id": "34555gdfdsf3weech56k4j3k",
      "list_closed": true,
      "old_closed": false,
      "list_pos": 1234,
      "old_pos": 4321,
      "memberCreator_id": "5746840c79f0050d954befaa",
      "memberCreator_avatarHash": "1b5532b28eb61342f96107c9fdc57cee",
      "memberCreator_avatarUrl": "https://trello-avatars.s3.amazonaws.com/1b5232b28eb61342f96207c9fdc57cee",
      "memberCreator_fullName": "John Smith",
      "memberCreator_initials": "JS",
      "memberCreator_username": "johnsmith",
      "memberCreator_link": "https://trello.com/johnsmith"
    },
    "list": {
      "id": "5909666f9b9dcc39e1b81e0a",
      "name": "New List",
      "closed": false,
      "idBoard": "58fef3816daf33593cc95661",
      "pos": 1234
    }
  }, // output of trigger data

  mock_input: {
    board_id: ""
  },

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : 'key', value : 'My Val'}])
    // output should be an array of objects or an empty array.

    // your code goes here
    getDetails(input, payload, function (err, res) {
      var obj = {}
      if (input.event_filters && input.event_filters.length > 0) {
        input.event_filters.forEach(element => {
          if (element.filter == "List Rename") {
            obj["action_renamed_list"] = 1
          } else if (element.filter == "List Moved Left/Right") {
            obj["action_moved_list_left"] = 2
            obj["action_moved_list_right"] = 3
          } else if (element.filter == "List Archived/Unarchived") {
            obj["action_archived_list"] = 4
            obj["action_sent_list_to_board"] = 5
          }
        });
      } else {
        obj["update"] = 1
        obj["action_renamed_list"] = 1
        obj["action_moved_list_left"] = 2
        obj["action_moved_list_right"] = 3
        obj["action_archived_list"] = 4
        obj["action_sent_list_to_board"] = 5
      }
      if (res.model && res.model.url && res.model.shortUrl) {
        res.model["board_url"] = res.model.url
        res.model["board_shortUrl"] = res.model.shortUrl
        delete res.model.url
        delete res.model.shortUrl
      }

      if (input.list_id && input.list_id != "" && res.action.list_id && res.action.list_id != input.list_id) {
        output(null, []);
      } else if (!err && res && res.action && res.action.type == "updateList" && res.action.display && obj[res.action.display.translationKey] == 1) {
        res = Object.assign({ "event_type": "List Rename" }, res)
        output(null, res);
      } else if (!err && res && res.action && res.action.type == "updateList" && res.action.display && obj[res.action.display.translationKey] == 2) {
        res = Object.assign({ "event_type": "List Moved Left" }, res)
        output(null, res);
      } else if (!err && res && res.action && res.action.type == "updateList" && res.action.display && obj[res.action.display.translationKey] == 3) {
        res = Object.assign({ "event_type": "List Moved Right" }, res)
        output(null, res);
      } else if (!err && res && res.action && res.action.type == "updateList" && res.action.display && obj[res.action.display.translationKey] == 4) {
        res = Object.assign({ "event_type": "List Archived" }, res)
        output(null, res);
      } else if (!err && res && res.action && res.action.type == "updateList" && res.action.display && obj[res.action.display.translationKey] == 5) {
        res = Object.assign({ "event_type": "List Unarchived" }, res)
        output(null, res);
      } else if (!err && obj["update"] == 1 && res && res.action && res.action.type == "updateList") {
        res = Object.assign({ "event_type": "Update List" }, res)
        output(null, res);
      } else {
        output(null, []);
      }
    });

  },

  register: function (input, output) {
    // function will be used for registering webhook with services additional key
    // 'webhook' along with input data will be available here so you can access the input.webhook
    // for registering the webhook
    if (input.list_id && input.list_id != "") {
      var options = {
        url: "https://api.trello.com/1/lists/" + input.list_id,
        qs: {
          key: input.auth.key,
          token: input.auth.access_token,
          fields: "id"
        }
      }

      requestCall(options).then((result) => {
        if(typeof result==undefined){
          return output("Enter valid list id");
        }
        var url = baseURL + '?key=' + input.auth.key + '&token=' + input.auth.access_token;
        var payload = {
          "callbackURL": input.webhook,
          "idModel": input.board_id
        };
        var optionsReg = {
          method: 'POST',
          url: url,
          json: payload
        }
        requestCall(optionsReg).then((body) => {
          output(null, body);
        }).catch((err) => {
          if (err == "invalid value for idModel")
            return output("Enter valid board id");
          return output(err);
        })
      }).catch((err) => {
        if (err == "invalid id")
          return output("Enter valid list id");
        return output(err);
      })
    } else {
      var url = baseURL + '?key=' + input.auth.key + '&token=' + input.auth.access_token;
      var option = {
        "callbackURL": input.webhook,
        "idModel": input.board_id
      };

      request({
        method: 'POST',
        url: url,
        json: option
      }, function (err, res, body) {
        if (err) {
          return output(err);
        }
        if (!res || !res.statusCode || res.statusCode !== 200) {
          if (body == "invalid value for idModel")
            return output("Enter valid board id");
          return output(body);
        }
        try {
          if (body && typeof body === "string") {
            body = JSON.parse(body);
          }
        } catch (e) {
          return output(body);
        }
        output(null, body);
      });
    }
  },

  unregister: function (input, options, output) {
    // will be invoked when user deletes the trigger for unregistering the webhook
    // webhook id will be available in input.webhookId

    // your code goes here
    var url = baseURL + '/' + input.webhookId + '?key=' + input.auth.key + '&token=' + input.auth.access_token;
    request({
      method: 'DELETE',
      url: url
    }, function (err, res, body) {

      if (err) {
        return output(err);
      }
      if (res && res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
        return output(null, "Webhook deleted successfully!!");
      }else {
        output(body);
      }
    });
  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here
    output(null, true);
  }
}

function getDetails(input, data, cb) {
  var opt = {
    qs: {
      token: input.auth.access_token,
      key: input.auth.key
    }
  };
  _flatten(data, function (res) {
    opt.url = "https://api.trello.com/1/lists/" + res.action.list_id || res.action.id;
    fetchDetails(opt, function (err, output) {
      if (!err && output) {
        res.list = {}
        _.merge(res.list, output || {});
        return cb(null, res);
      } else
        cb(err || "something went wrong")
    });
  })
}

function fetchDetails(opt, cb) {
  request(opt, function (err, resp, body) {
    if (!err && resp.statusCode == 200 && body) {
      try {
        if (body && typeof body === "string") {
          body = JSON.parse(body);
        }
      } catch (e) {
        return cb(body);
      }
      return cb(null, body)
    } else
      cb(err || "something went wrong")
  });

}

function _flatten(data, cb) {
  if (data.action) {
    if (data.action.data) {
      for (var key in data.action.data) {
        if (typeof data.action.data[key] === "object") {
          _.merge(data.action, formData(key, data.action.data[key]))
        } else if (typeof data.action.data[key] != "object") {
          data.action[key] = data.action.data[key];
        }
      }
      delete data.action.data;
    }
    if (data.action.memberCreator) {
      data.action.memberCreator["link"] = "https://trello.com/" + data.action.memberCreator.username
      _.merge(data.action, formData("memberCreator", data.action.memberCreator))
      delete data.action.memberCreator;
    }
    if (data.action.member) {
      data.action.member["link"] = "https://trello.com/" + data.action.member.username
      _.merge(data.action, formData("member", data.action.member))
      delete data.action.member;
    }
    cb(data);
  }

}

function formData(key, data) {
  var action = {};
  for (var keys in data) {
    if (typeof data[keys] != "object") {
      action[key + "_" + keys] = data[keys];
    }
  }
  return action;
}

function requestCall(options) {
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
        return reject(data);
      }
      if (res && res.statusCode === 200) {
        return resolve(data);
      } else {
        return reject(data);
      }
    })
  })
}
