var request = require('request');
var _ = require('lodash');
var baseURL = "https://api.trello.com/1/webhooks";
const P = require('bluebird');

module.exports = {

  name: "new_board",

  label: "New Board",

  version: "v6",

  input: {
    type: 'object',
    title: 'New Board',
    description: "Short description",
    properties: {
      event: {
        type: 'string',
        enum: ['new_board']
      },
      polling: {
        type: 'boolean',
        default: false,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_board": {
      "type": "object",
      "properties": {
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
            "board_shortLink": {
              "title": "board_shortLink",
              "displayTitle": "Board Short Link",
              "type": "string"
            },
            "id": {
              "title": "id",
              "type": "string"
            },
            "permissionLevel": {
              "title": "permissionLevel",
              "displayTitle": "Permission Level",
              "type": "string"
            },
            "type": {
              "title": "type",
              "displayTitle": "Event Type",
              "type": "string"
            },
            "date": {
              "title": "date",
              "displayTitle": "Created Date",
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
            "background": {
              "title": "background",
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
        },
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
        }
      }
    }
  },

  mock_data: {
    "event_type": "New Board",
    "model": {
      "id": "5746840c79f0050d954befaa",
      "avatarHash": "f928374892bb9dd7a2737af",
      "bio": "user data",
      "confirmed": true,
      "fullName": "John Smith",
      "initials": "JOHN",
      "username": "johnsmith",
      "memberType": "normal",
      "status": "disconnected",
      "url": "https://trello.com/johnsmith",
      "avatarSource": "none",
      "email": "john.smith@example.com",
      "gravatarHash": "055f928374892bb9dd7a2737af",
      "idBoards": [
        "590995acb23db5b04f1a785e",
        "690995acb23db5b04f1a785e"
      ],
      "idOrganizations": [
        "5b58851d65954fa12f61c330"
      ],
      "limits": {
        "boards": {
          "totalPerMember": {
            "status": "ok",
            "disableAt": 4275,
            "warnAt": 4050
          }
        },
        "orgs": {
          "totalPerMember": {
            "status": "ok",
            "disableAt": 808,
            "warnAt": 765
          }
        }
      },
      "marketingOptIn": {
        "optedIn": true,
        "date": "2018-07-25T14:24:19.308Z"
      },
      "messagesDismissed": [
        {
          "name": "feedback-card-home-page-internal",
          "count": 1,
          "lastDismissed": "2018-07-25T14:24:22.318Z",
          "_id": "5b58881606677f244932323cd"
        }
      ],
      "oneTimeMessagesDismissed": [
        "create-first-board",
        "notifications-onboarding",
        "notifications-bell-count-feedback",
        "simplified-view-full-view",
        "simplified-view-org-settings",
        "simplified-view-card-activity",
        "simplified-view-card-move",
        "simplified-view-labels-and-edit"
      ],
      "prefs": {
        "sendSummaries": true,
        "minutesBetweenSummaries": 1,
        "minutesBeforeDeadlineToNotify": 1440,
        "colorBlind": false,
        "locale": "en-GB"
      },
      "uploadedAvatarHash": "1b5532b28eb61342f96207c9fdwew144",
      "idBoardsPinned": "690995acb23db5b04f1a785e",
      "board_url": "https://trello.com/b/590995acb23db5b04f1a785e",
      "board_shortUrl": "https://trello.com/b/avjVxZJI"
    },
    "action": {
      "id": "590995acb23db5b04f1a785e",
      "idMemberCreator": "5b580fcfbfbbv9dd7a2737bf",
      "type": "createBoard",
      "date": "2018-10-23T10:55:05.619Z",
      "limits": {
        "boards": {
          "totalPerMember": {
            "status": "ok",
            "disableAt": 4275,
            "warnAt": 4050
          }
        },
        "orgs": {
          "totalPerMember": {
            "status": "ok",
            "disableAt": 808,
            "warnAt": 765
          }
        }
      },
      "display": {
        "translationKey": "action_create_board",
        "entities": {
          "board": {
            "type": "board",
            "id": "590995acb23db5b04f1a785e",
            "text": "New Board",
            "shortLink": "avjVxZJI"
          },
          "memberCreator": {
            "type": "member",
            "id": "5b580fcfbfbbv9dd7a2737bf",
            "username": "johnsmith",
            "text": "John Smith"
          }
        }
      },
      "board_shortLink": "tQKgYd3v",
      "board_name": "Task Tracker",
      "board_id": "5bcefe0921c89263f5ffd31a",
      "memberCreator_id": "5b580fcfbfbbv9dd7a2737bf",
      "memberCreator_avatarHash": "1b5532b28eb61342f96207c9fdwew12",
      "memberCreator_fullName": "John Smith",
      "memberCreator_initials": "js",
      "memberCreator_username": "johnsmith",
      "memberCreator_link": "https://trello.com/johnsmith",
      "permissionLevel": "org",
      "voting": "disabled",
      "comments": "members",
      "invitations": "members",
      "selfJoin": true,
      "cardCovers": true,
      "cardAging": "regular",
      "calendarFeedEnabled": false,
      "background": "5bcdebe9bf20c138c9fffb94",
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
      "backgroundBottomColor": "#151515",
      "backgroundTopColor": "#0d0d0d",
      "canBePublic": true,
      "canBeOrg": true,
      "canBePrivate": true,
      "canInvite": true
    }
  }, // output of trigger data

  mock_input: {
    member_id: ""
  },

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : 'key', value : 'My Val'}])
    // output should be an array of objects or an empty array.

    // your code goes here
    getDetails(input, payload, function (err, res) {
      if (!err && res && res.action && res.action.type == "createBoard") {//  || res.action.type =="addMemberToBoard"
        if (res.model && res.action && res.action.board_url && res.action.board_shortUrl) {
          res.model["board_url"] = res.action.board_url
          res.model["board_shortUrl"] = res.action.board_shortUrl
        }
        res = Object.assign({ "event_type": "New Board" }, res)
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
    var options = {
      url: "https://api.trello.com/1/members/me",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        fields: "id"
      }
    }

    requestCall(options).then((result) => {

      var url = baseURL + '?key=' + input.auth.key + '&token=' + input.auth.access_token;
      var payload = {
        "callbackURL": input.webhook,
        "idModel": result.id
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
          return output("Enter valid member id");
        return output(err);
      })
    }).catch((err) => {
      if (err == "invalid value for idModel")
        return output("Enter valid member id");
      return output(err);
    })
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
      } else {
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
    if (data.action.board_id && data.action.board_shortLink) {
      data.model["board_url"] = "https://trello.com/b/" + data.action.board_id
      data.model["board_shortUrl"] = "https://trello.com/b/" + data.action.board_shortLink

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
