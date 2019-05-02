var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "create_board",

  title: "Create Board",

  description: "",
  version: "v1",

  input: {
    title: 'Create Board',
    type: 'object',
    properties: {
      "name": {
        "title": "Board Name",
        "type": "string",
        "propertyOrder": 2,
        "description": "Enter the name of the board you want to create",
        "minLength": 1
      },
      "desc": {
        "title": "Description",
        "type": "string",
        "propertyOrder": 3,
        "description": "Enter the description of the board you want to create. The maximum character length of the description is 16,384"
      },
      "idOrganization": {
        "title": "Team ID",
        "description": "Select/specify the ID of the team in which you want to create the board",
        "type": "string",
        "propertyOrder": 4
      },
      "prefs_permissionLevel": {
        "title": "Visibility Level",
        "description": "Select the level of the visibility of the board you want to create. The default value of this field is ‘Private’",
        "type": "string",
        "enum": ["Private", "Public", "Team"],
        "propertyOrder": 5
      },
      "prefs_background": {
        "title": "Background Color",
        "description": "Select the background color of the board you want to create",
        "type": "string",
        "enum": ["--Select Color--", "Blue", "Orange", "Green", "Red", "Purple", "Pink", "Lime", "Sky", "Grey"],
        "propertyOrder": 6
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
      "limits": {
        "title": "limits",
        "type": "object",
        "displayTitle": "Limits",
        "properties": {}
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
        "type": "any",
        "displayTitle": "Backgroundimage"
      },
      "backgroundImageScaled": {
        "title": "backgroundImageScaled",
        "type": "any",
        "displayTitle": "Backgroundimagescaled"
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
      "backgroundColor": {
        "title": "backgroundColor",
        "type": "string",
        "displayTitle": "Backgroundcolor"
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
      }
    }
  },

  mock_input: {
    "board_id": "5b580ff316b7ca9da4a7eb4a",
    "name": "my"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'name', output);
    var permissionsObj = {
      "Team": "org", "Public": "public", "Private": "private"
    }
    var colorObj = { "Blue": "blue", "Orange": "orange", "Green": "green", "Red": "red", "Purple": "purple", "Pink": "pink", "Lime": "lime", "Sky": "sky", "Grey": "grey" }
    var option = {
      url: "https://api.trello.com/1/boards",
      body: {
        "name": input.name,
        "token": input.auth.access_token,
        "key": input.auth.key
      },
      method: "POST",
      json: true,
      field: "Invalid List ID"
    };
    optField(input, 'desc', option.body);
    optField(input, 'idOrganization', option.body);
    if (input.prefs_permissionLevel) {
      option.body['prefs_permissionLevel'] = permissionsObj[input.prefs_permissionLevel]
    }
    if (input.prefs_background && input.prefs_background !== "--Select Color--") {
      option.body['prefs_background'] = colorObj[input.prefs_background]
    }

    requestCall(option)
      .then((body) => {
        flatten_schema(body, 'prefs');
        return output(null, body);
      })
      .catch((err) => {

        if (err === "invalid value for idBoard") {
          return output('Invalid Board ID');
        }
        else
          if (err === 'invalid value for idList' || err === 'Invalid objectId') {
            return output('Invalid Source List ID');
          }
          else if (err == 'invalid id') {
            return output('Invalid Board ID')
          }
          else if (err == 'unauthorized org access' || err == 'unauthorized organization') {
            return output('Invalid Team ID')
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

function optField(src, val, body) {
  if (src[val] || src[val] === 'false') {
    body[val] = src[val]
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