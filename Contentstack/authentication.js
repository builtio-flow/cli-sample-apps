const request = require("request")

module.exports = {
  label: "Connect to Contentstack",
  mock_input: {

    email: "",
    password: ""
  },
  input: {
    type: "object",
    "title": "Select Credential Type",
    "format": "table",
    "oneOf": [{
      "title": "Login",
      "additionalProperties": false,
      "properties": {
        "email": {
          "type": "string",
          "minLength": 1,
          "title": "Email Address",
          "description": "Enter the email address of your Built.io Contentstack account"
        },
        "password": {
          "type": "string",
          "minLength": 1,
          "title": "Password",
          "format": "password",
          "description": "Enter your password of your Built.io Contentstack account"
        }
      }
    },
    {
      "title": "AuthToken",
      "additionalProperties": false,
      "properties": {
        "authtoken": {
          "type": "string",
          "minLength": 1,
          "title": "Auth Token",
          "description": "Enter the auth token of your Built.io Contentstack account. Click <a href = 'https://contentstackdocs.built.io/rest/api/content-management-api/#!/User_Session/post_user_session' target = '_blank'>here</a> for more information on how to obtain your auth token"
        }
      }
    }
    ]
  },
  output: {
    "type": "object",
    "properties": {
      "handle": {
        "type": "object",
        "title": "handle"
      }
    }
  },

  validate: function (input, output) {
    // auth data will be available in input.auth
    // like var username = input.auth.username
    // callback pattern
    // output(error, success)

    if (input.auth.authtoken) {

      request({
        url: "https://api.contentstack.io/v3/user",
        method: "GET",
        headers: {
          authtoken: input.auth.authtoken
        }

      }, function (e, r, b) {

        if (e)
          output(e)

        try {
          b = typeof b === "string" ? JSON.parse(b) : b
        } catch (e) {
          return output(e)
        }

        if (r.statusCode === 200) {
          return output(null, true)
        }

        if (r.statusCode === 401) {
          return output("Invalid authtoken.", null)
        }

        if (b && b.error_message)
          return output(b.error_message, null)

        return output(b, null)
      })

    } else {

      request({
        url: "https://api.contentstack.io/user-session",
        method: "POST",
        body: {
          "user": {
            "email": input.auth.email,
            "password": input.auth.password,
          }
        },
        json: true,

      }, function (e, r, b) {

        if (e)
          return output(e)

        try {
          b = typeof b === "string" ? JSON.parse(b) : b
        } catch (e) {
          return output(e)
        }


        if (r.statusCode === 200) {
          return output(null, true)
        }

        if (b && b.error_message)
          return output(b.error_message, null)

        return output(b, null)
      })

    }
  }
}