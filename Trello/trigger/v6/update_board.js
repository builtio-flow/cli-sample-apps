var request = require('request');
var _ = require('lodash');
var baseURL = "https://api.trello.com/1/webhooks";

module.exports = {

  name: "update_board",

  label: "Update Board",

  version: "v6",

  input: {
    type: 'object',
    title: 'Update Board',
    description: "Short description",
    properties: {
      event: {
        type: 'string',
        enum: ['update_board']
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
      event_filters: {
        "title": "Filters",
        "type": "array",
        "maxItems": 2,
        "propertyOrder": 3,
        "description": "Provides the list of filters by which you want to filter the result",
        "items": {
          "type": 'object',
          "properties": {
            "filter": {
              "title": "Filter Name",
              "type": "string",
              "description": "Select the name of the filter by which you want to filter the result",
              "enum": [
                "Board Renamed",
                "Change Visibility"
              ],
            }
          }
        }
      }
    }
  },

  output: {
    "update_board": {
      "type": "object",
      "properties": {
        "model": {
          "title": "model",
          "displayTitle": "Model",
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "displayTitle": "Creator ID",
              "type": "string"
            },
            "fullName": {
              "title": "fullName",
              "displayTitle": "Creator Full Name",
              "type": "string"
            },
            "initials": {
              "title": "initials",
              "displayTitle": "Creator Initial",
              "type": "string"
            },
            "username": {
              "title": "username",
              "displayTitle": "Creator User Name",
              "type": "string"
            },
            "memberType": {
              "title": "memberType",
              "displayTitle": "Member Type",
              "type": "string"
            },
            "avatarHash": {
              "title": "avatarHash",
              "displayTitle": "Creator Avatar Hash",
              "type": "string"
            },
            "url": {
              "title": "url",
              "displayTitle": "Member URL",
              "type": "string"
            }
          }
        },
        "action": {
          "title": "action",
          "displayTitle": "Action",
          "type": "object",
          "properties": {
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
            "old_name": {
              "title": "old_name",
              "displayTitle": "Old Name",
              "type": "string"
            },
            "permissionLevel": {
              "title": "permissionLevel",
              "displayTitle": "Permission Level",
              "type": "string"
            },
            "board_shortLink": {
              "title": "board_shortLink",
              "displayTitle": "Board Short Link",
              "type": "string"
            },
            "id": {
              "title": "id",
              "type": "string"
            },
            "type": {
              "title": "type",
              "displayTitle": "Event Type",
              "type": "string"
            },
            "date": {
              "title": "date",
              "displayTitle": "Updated Date",
              "type": "string"
            },
            "voting": {
              "title": "voting",
              "type": "string"
            },
            "comments": {
              "title": "comments",
              "type": "string"
            },
            "invitations": {
              "title": "invitations",
              "type": "string"
            },
            "selfJoin": {
              "title": "selfJoin",
              "type": "boolean"
            },
            "cardCovers": {
              "title": "cardCovers",
              "type": "boolean"
            },
            "cardAging": {
              "title": "cardAging",
              "type": "string"
            },
            "calendarFeedEnabled": {
              "title": "calendarFeedEnabled",
              "type": "boolean"
            },
            "backgroundImage": {
              "title": "backgroundImage",
              "type": "string",
              "displayTitle": "Background Image URL"
            },
            "backgroundImageScaled": {
              "title": "backgroundImageScaled",
              "type": "array",
              "displayTitle": "Background Image Scaled",
              "items": {
                "type": "object",
                "properties": {
                  "width": {
                    "title": "width",
                    "displayTitle": "Width",
                    "type": "number"
                  },
                  "height": {
                    "title": "height",
                    "displayTitle": "Height",
                    "type": "number"
                  },
                  "url": {
                    "title": "url",
                    "displayTitle": "URL",
                    "type": "string"
                  }
                }
              }
            },
            "background": {
              "title": "background",
              "displayTitle": "Background Color",
              "type": "string"
            },
            "backgroundTile": {
              "title": "backgroundTile",
              "type": "boolean"
            },
            "backgroundBrightness": {
              "title": "backgroundBrightness",
              "type": "string"
            },
            "backgroundColor": {
              "title": "backgroundColor",
              "displayTitle": "Background Color Code",
              "type": "string"
            },
            "canBePublic": {
              "title": "canBePublic",
              "type": "boolean"
            },
            "canBeOrg": {
              "title": "canBeOrg",
              "type": "boolean"
            },
            "canBePrivate": {
              "title": "canBePrivate",
              "type": "boolean"
            },
            "canInvite": {
              "title": "canInvite",
              "type": "boolean"
            }
          }
        }
      }
    }
  },

  mock_data: {
    "event_type": "Update Board",
    "model": {
      "id": "590995acb23db5b04f1a785e",
      "name": "New Board",
      "desc": "This is a new board",
      "closed": false,
      "idOrganization": "5b58891d65954fa12f61c850",
      "pinned": false,
      "prefs": {
        "permissionLevel": "public",
        "voting": "disabled",
        "comments": "members",
        "invitations": "members",
        "selfJoin": false,
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
      "id": "590995acb23db5b04f1a7860",
      "idMemberCreator": "5b580fcfbfbbv9dd7a2737bf",
      "type": "updateBoard",
      "date": "2018-07-25T21:05:05.906Z",
      "display": {
        "translationKey": "action_update_board_name",
        "entities": {
          "board": {
            "type": "board",
            "id": "590995acb23db5b04f1a785e",
            "text": "New Board",
            "shortLink": "avjVxZJI"
          },
          "level": {
            "type": "translatable",
            "translationKey": "action_members_visibility"
          },
          "memberCreator": {
            "type": "member",
            "id": "5b580fcfbfbbv9dd7a2737bf",
            "username": "johnsmith",
            "text": "john smith"
          }
        }
      },
      "board_shortLink": "avjVxZJI",
      "board_id": "590995acb23db5b04f1a785e",
      "board_name": "Task Tracker",
      "old_name": "Tracker",
      "memberCreator_id": "5b580fcfbfbbv9dd7a2737bf",
     // "memberCreator_avatarHash": "1b5532b28eb61342f96107c9fdc57cee",
     // "memberCreator_avatarUrl": "https://trello-avatars.s3.amazonaws.com/1b5232b28eb61342f96207c9fdc57cee",
      "memberCreator_fullName": "john smith",
      "memberCreator_initials": "js",
      "memberCreator_username": "johnsmith",
      "memberCreator_link": "https://trello.com/johnsmith",
      "permissionLevel": "public",
      "voting": "disabled",
      "comments": "members",
      "invitations": "members",
      "selfJoin": false,
      "cardCovers": true,
      "cardAging": "regular",
      "calendarFeedEnabled": false,
      "background": "blue",
      "backgroundImage": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1707/455819441ab9cd8551e937cc83dbdb7e/photo-1493760919532-3e33e8212d7c",
      "backgroundImageScaled": [
        {
          "width": 140,
          "height": 100,
          "url": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x100/ff45fe2e575303556bb5db8ca0234256/photo-1493760919532-3e33e8212d7c.jpg"
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
          if (element.filter == "Board Renamed") {
            obj["action_update_board_name"] = 1
          } else if (element.filter == "Change Visibility") {
            obj["action_board_perm_level"] = 2
          }
        });
      } else {
        obj["update"] = 1
        obj["action_update_board_name"] = 1
        obj["action_board_perm_level"] = 2
      }
      if (res.model && res.model.url && res.model.shortUrl) {
        res.model["board_url"] = res.model.url
        res.model["board_shortUrl"] = res.model.shortUrl
        delete res.model.url
        delete res.model.shortUrl
      }

      if (!err && res && res.action && res.action.type == "updateBoard" && res.action.display && obj[res.action.display.translationKey] == 1) {
        res = Object.assign({ "event_type": "Board Renamed" }, res)
        output(null, res);
      } else if (!err && res && res.action && res.action.type == "updateBoard" && res.action.display && obj[res.action.display.translationKey] == 2) {
        res = Object.assign({ "event_type": "Change Visibility" }, res)
        output(null, res);
      } else if (!err && obj["update"] == 1 && res && res.action && res.action.type == "updateBoard") {
        res = Object.assign({ "event_type": "Update Board" }, res)
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
    opt.url = "https://api.trello.com/1/boards/" + res.action.board_id;
    fetchDetails(opt, function (err, output) {
      if (!err && output) {
        _.merge(res.action, output.prefs || {});
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
