var request = require('request');
const P = require('bluebird');
module.exports = {

  name: "add_member_to_board",

  title: "Add Member to Board",

  description: "",
  version: "v1",

  input: {
    title: 'Add Member to Board',
    type: 'object',
    properties: {
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board to which you want to add the member"
      },
      "email": {
        "title": "Email ID",
        "description": "Enter the email ID of the user you want to add as a member",
        "type": "string",
        "propertyOrder": 3,
        "minLength": 1
      },
      "fullname": {
        "title": "Full Name",
        "description": "Enter the full name of the user you want to add as a member. The name should not start or end with a space and must be of at least one character. For example, John Doe",
        "type": "string",
        "propertyOrder": 4
      },
      "type": {
        "title": "Member Type",
        "description": "Select the type of the member you want to add. The default value of this field is ‘Normal’",
        "type": "string",
        "propertyOrder": 5,
        "enum": ["Normal", "Admin", "Observer"]
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
      "members": {
        "title": "members",
        "type": "array",
        "displayTitle": "Members",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Members ID"
            },
            "avatarHash": {
              "title": "avatarHash",
              "type": "string",
              "displayTitle": "Members Avatarhash"
            },
            "avatarUrl": {
              "title": "avatarUrl",
              "type": "string",
              "displayTitle": "Members Avatarurl"
            },
            "initials": {
              "title": "initials",
              "type": "string",
              "displayTitle": "Members Initials"
            },
            "fullName": {
              "title": "fullName",
              "type": "string",
              "displayTitle": "Members Fullname"
            },
            "username": {
              "title": "username",
              "type": "string",
              "displayTitle": "Members Username"
            },
            "confirmed": {
              "title": "confirmed",
              "type": "boolean",
              "displayTitle": "Members Confirmed"
            },
            "memberType": {
              "title": "memberType",
              "type": "string",
              "displayTitle": "Members Membertype"
            }
          }
        }
      },
      "board_membership": {
        "title": "board_membership",
        "type": "array",
        "displayTitle": "Board MEMBERSHIP",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "string",
              "displayTitle": "Board MEMBERSHIP ID"
            },
            "idMember": {
              "title": "idMember",
              "type": "string",
              "displayTitle": "Board MEMBERSHIP IDMEMBER"
            },
            "memberType": {
              "title": "memberType",
              "type": "string",
              "displayTitle": "Board MEMBERSHIP Membertype"
            },
            "unconfirmed": {
              "title": "unconfirmed",
              "type": "boolean",
              "displayTitle": "Board MEMBERSHIP Unconfirmed"
            },
            "deactivated": {
              "title": "deactivated",
              "type": "boolean",
              "displayTitle": "Board MEMBERSHIP Deactivated"
            },
            "fullName": {
              "title": "fullName",
              "type": "string",
              "displayTitle": "Board MEMBERSHIP Fullname"
            }
          }
        }
      },
      "member_email_id": {
        "title": "member_email_id",
        "type": "string",
        "displayTitle": "Member Email ID"
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
      }
    }
  },

  mock_input: {
    "list_id": "5b9f71d53774352dc6943834"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    var typeCon = {
      "Admin": "admin",
      "Normal": "normal",
      "Observer": "observer"
    }

    inputValidation(input, 'board_id', output);
    inputValidation(input, 'email', output);
    if (input.type) {
      input.type = typeCon[input.type]
    } else {
      input.type = typeCon["Normal"]
    }
    var memberData = {}
    var option = {
      url: "https://api.trello.com/1/boards/" + input.board_id + "/members",
      qs: {
        key: input.auth.key,
        token: input.auth.access_token,
        email: input.email
      },
      headers: {
        type: input.type
      },
      method: 'PUT',
    };
    requestCall(option)
      .then((body) => {
        memberData = body
        option.method = "GET"
        option.url = "https://api.trello.com/1/boards/" + input.board_id
        return requestCall(option)
      }).then((data) => {

        if (memberData.memberships && memberData.memberships.length > 0) {
          memberData.memberships.map(item => {
            let temp = memberData.members.find((item1) => { return item1.id == item.idMember });
            if (temp)
              item.fullName = temp.fullName;
          })
        }
        data["members"] = memberData.members
        data["board_membership"] = memberData.memberships
        data["member_email_id"] = input.email
        flatten_schema(data, 'prefs');
        return output(null, data);
      })
      .catch((err) => {
        if (err == 'invalid id' || err == 'board not found') {
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