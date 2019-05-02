

var google = require("googleapis")
var comm = require("./common")
google = google.google


module.exports = {

  name: "new_label",

  label: "New Label",

  version: "v9",

  input: {
    type: "object",
    title: "New Label",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["new_label"],
        scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
        required_scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
        isExecute: true
      },
      polling: {
        type: "boolean",
        default: true,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_label": {
      type: "object",
      properties: {
        "Event_Type": {
          "title": "Event_Type",
          "type": "string",
          "displayTitle": "EVENT_TYPE"
        },
        "user_email": {
          "title": "user_email",
          "type": "string",
          "displayTitle": "User Email"
        },
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
        "messageListVisibility": {
          "title": "messageListVisibility",
          "type": "string",
          "displayTitle": "Messagelistvisibility"
        },
        "labelListVisibility": {
          "title": "labelListVisibility",
          "type": "string",
          "displayTitle": "Labellistvisibility"
        },
        "type": {
          "title": "type",
          "type": "string",
          "displayTitle": "Type"
        },
        "color": {
          "title": "color",
          "type": "object",
          "displayTitle": "Color",
          "properties": {
            "textColor": {
              "title": "textColor",
              "type": "string",
              "displayTitle": "Color Textcolor"
            },
            "backgroundColor": {
              "title": "backgroundColor",
              "type": "string",
              "displayTitle": "Color Backgroundcolor"
            }
          }
        },
        "label_link": {
          "title": "label_link",
          "type": "string",
          "displayTitle": "Label Link"
        },
      }
    }
  },

  mock_data: {
    "event_type": "New Label",
    "user_email": "susan.reynolds@example.com",
    "id": "Label_2811454157892320634",
    "name": "Work",
    "messageListVisibility": "show",
    "labelListVisibility": "labelShow",
    "type": "user",
    "color": {
      "textColor": "#e4d7f5",
      "backgroundColor": "#8e63ce"
    },
    "label_link": "https://mail.google.com/mail/u/1/#label/Work"
  },

  mock_input: {},

  getUserData: function (input, options, output) {
    return output(null, [])
  },

  execute: function (input, options, output) {
    let OAuth2 = google.auth.OAuth2
    let oauth2Client = new OAuth2()
    oauth2Client.setCredentials({
      access_token: input.auth.access_token
    })
    let gmail = google.gmail({
      version: "v1",
      auth: oauth2Client
    })
    let params = {
      //maxResults: 1,
      userId: "me"
    }

    var data = []
    let label_id = []
    var user_email = ""

    Promise.all([users_labels_list(gmail, params), comm.users_get_profile(gmail)]).then(resp => {
      if (resp[1] && resp[1].data && resp[1].data.emailAddress) {
        user_email = resp[1].data.emailAddress
      }

      if (resp[0] && resp[0].data && resp[0].data.labels && resp[0].data.labels.length > 0) {
        resp[0].data.labels.forEach(element => {
          label_id.push(element.id)

          if (options.meta.labels.indexOf(element.id) == -1) {

            element = Object.assign({ "user_email": user_email }, element)
            element = Object.assign({ event_type: "New Label" }, element)

            if (element.name) {
              let space_string = "https://mail.google.com/mail/u/1/#label/" + element.name
              element["label_link"] = encodeURI(space_string)
            }
            data.push(element)
          }
        })

        options.setMeta({
          labels: label_id
        })

        return output(null, data)
      } else {
        return output("Some error occured while fetching labels.", null)
      }


    }).catch(err => {
      return output(err, null)
    })
  },

  activate: function (input, options, output) {
    self.validate(input, options, output)
  },

  validate: function (input, options, output) {
    let OAuth2 = google.auth.OAuth2
    let oauth2Client = new OAuth2()
    oauth2Client.setCredentials({
      access_token: input.auth.access_token
    })
    let gmail = google.gmail({
      version: "v1",
      auth: oauth2Client
    })
    let params = {
      //maxResults: 1,
      userId: "me"
    }

    users_labels_list(gmail, params).then(resp => {

      if (resp && resp.data && resp.data.labels && resp.data.labels.length > 0) {
        var label_id = resp.data.labels.map(curr => curr.id)
        options.setMeta({
          labels: label_id
        })
        return output(null, true)
      } else {
        return output("Some error occured while fetching labels.", null)
      }

    }).catch(err => {
      return output(err, null)
    })

  }
}


function users_labels_list(gmail, params) {
  return new Promise((resolve, reject) => {

    gmail.users.labels.list(params, (err, resp) => {
      if (err) {
        if (err.errors && err.errors.length && err.errors[0].message) {
          reject(err.errors[0].message)
        } else {
          reject("Some error occured while fetching labels.")
        }
      }
      if (typeof resp === "string") {
        resp = JSON.parse(resp)
      }
      if (resp.status != 200) {
        reject(resp.statusText)
      } else {
        resolve(resp)
      }
    })

  })
}






var self = module.exports