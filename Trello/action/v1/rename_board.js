var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "rename_board",

  title: "Rename Board",

  description: "",
  version: "v1",

  input: {
    title: 'Rename Board',
    type: 'object',
    properties: {
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board you want to rename"
      },
      "name": {
        "title": "New Board Name",
        "type": "string",
        "propertyOrder": 3,
        "description": "Enter the new name of the board",
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
      "closed": {
        "title": "closed",
        "type": "boolean",
        "displayTitle": "Closed"
      },
      "idOrganization": {
        "title": "idOrganization",
        "type": "string",
        "displayTitle": "IDORGANIZATION"
      },
      "pinned": {
        "title": "pinned",
        "type": "boolean",
        "displayTitle": "Pinned"
      },
      "url": {
        "title": "url",
        "type": "string",
        "displayTitle": "URL"
      },
      "shortUrl": {
        "title": "shortUrl",
        "type": "string",
        "displayTitle": "Shorturl"
      },
      "labelNames": {
        "title": "labelNames",
        "type": "object",
        "displayTitle": "Labelnames",
        "properties": {
          "green": {
            "title": "green",
            "type": "string",
            "displayTitle": "Labelnames Green"
          },
          "yellow": {
            "title": "yellow",
            "type": "string",
            "displayTitle": "Labelnames Yellow"
          },
          "orange": {
            "title": "orange",
            "type": "string",
            "displayTitle": "Labelnames Orange"
          },
          "red": {
            "title": "red",
            "type": "string",
            "displayTitle": "Labelnames Red"
          },
          "purple": {
            "title": "purple",
            "type": "string",
            "displayTitle": "Labelnames Purple"
          },
          "blue": {
            "title": "blue",
            "type": "string",
            "displayTitle": "Labelnames Blue"
          },
          "sky": {
            "title": "sky",
            "type": "string",
            "displayTitle": "Labelnames Sky"
          },
          "lime": {
            "title": "lime",
            "type": "string",
            "displayTitle": "Labelnames Lime"
          },
          "pink": {
            "title": "pink",
            "type": "string",
            "displayTitle": "Labelnames Pink"
          },
          "black": {
            "title": "black",
            "type": "string",
            "displayTitle": "Labelnames Black"
          }
        }
      },
      "permissionLevel": {
        "title": "permissionLevel",
        "type": "string",
        "displayTitle": "Permissionlevel"
      },
      "voting": {
        "title": "voting",
        "type": "string",
        "displayTitle": "Voting"
      },
      "comments": {
        "title": "comments",
        "type": "string",
        "displayTitle": "Comments"
      },
      "invitations": {
        "title": "invitations",
        "type": "string",
        "displayTitle": "Invitations"
      },
      "selfJoin": {
        "title": "selfJoin",
        "type": "boolean",
        "displayTitle": "Selfjoin"
      },
      "cardCovers": {
        "title": "cardCovers",
        "type": "boolean",
        "displayTitle": "Cardcovers"
      },
      "cardAging": {
        "title": "cardAging",
        "type": "string",
        "displayTitle": "Cardaging"
      },
      "calendarFeedEnabled": {
        "title": "calendarFeedEnabled",
        "type": "boolean",
        "displayTitle": "Calendarfeedenabled"
      },
      "background": {
        "title": "background",
        "type": "string",
        "displayTitle": "Background"
      },
      "backgroundImage": {
        "title": "backgroundImage",
        "type": "string",
        "displayTitle": "Backgroundimage"
      },
      "backgroundImageScaled": {
        "title": "backgroundImageScaled",
        "type": "array",
        "displayTitle": "Backgroundimagescaled",
        "items": {
          "type": "object",
          "properties": {
            "width": {
              "title": "width",
              "type": "number",
              "displayTitle": "Backgroundimagescaled WIDTH"
            },
            "height": {
              "title": "height",
              "type": "number",
              "displayTitle": "Backgroundimagescaled Height"
            },
            "url": {
              "title": "url",
              "type": "string",
              "displayTitle": "Backgroundimagescaled URL"
            }
          }
        }
      },
      "backgroundTile": {
        "title": "backgroundTile",
        "type": "boolean",
        "displayTitle": "Backgroundtile"
      },
      "backgroundBrightness": {
        "title": "backgroundBrightness",
        "type": "string",
        "displayTitle": "Backgroundbrightness"
      },
      "backgroundBottomColor": {
        "title": "backgroundBottomColor",
        "type": "string",
        "displayTitle": "Backgroundbottomcolor"
      },
      "backgroundTopColor": {
        "title": "backgroundTopColor",
        "type": "string",
        "displayTitle": "Backgroundtopcolor"
      },
      "canBePublic": {
        "title": "canBePublic",
        "type": "boolean",
        "displayTitle": "Canbepublic"
      },
      "canBeOrg": {
        "title": "canBeOrg",
        "type": "boolean",
        "displayTitle": "Canbeorg"
      },
      "canBePrivate": {
        "title": "canBePrivate",
        "type": "boolean",
        "displayTitle": "Canbeprivate"
      },
      "canInvite": {
        "title": "canInvite",
        "type": "boolean",
        "displayTitle": "Caninvite"
      },
      "old_name": {
        "title": "old_name",
        "type": "string",
        "displayTitle": "Old Name"
      }
    }
  },

  mock_input: {
    name: "new",
    "board_id": "5b580ff316b7ca9da4a7eb4vad"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'board_id', output);
    inputValidation(input, 'name', output);

    var oldName = "";

    var option = {
      url: "https://api.trello.com/1/boards/" + input.board_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      }
    };

    requestCall(option)
      .then((data) => {
        oldName = data.name
        var optionRename = {
          url: "https://api.trello.com/1/boards/" + input.board_id + "/name",
          qs: {
            key: input.auth.key,
            token: input.auth.access_token,
            value: input.name
          },
          method: "PUT"
        };
        return requestCall(optionRename)
      })
      .then((body) => {
        var optionBoard = {
          url: "https://api.trello.com/1/boards/" + (body.idBoard || input.board_id),
          qs: {
            key: input.auth.key,
            token: input.auth.access_token
          },
          method: "GET"
        };

        return requestCall(optionBoard)
      }).then((dataBoard) => {
        flatten_schema(dataBoard, 'prefs');
        dataBoard["old_name"] = oldName
        return output(null, dataBoard);
      })
      .catch((err) => {
        if (err === 'invalid value for idList' || err === 'invalid objectId') {
          return output('Invalid list ID entered');
        }
        else if (err == 'invalid id' || err == 'board not found') {
          return output('Invalid Board ID')
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

function flatten_schema(body, val) {
  if (body[val]) {
    Object.keys(body[val]).map(function (m) {
      body[m] = body[val][m];
    });
    delete body[val]
  }
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