var request = require('request');
module.exports = {

  name: "pipedrive-deal-delete",

  title: "Delete Deal",

  description: "Delete an existing deal",

  usage: {
    "html": "Delete an existing deal",
    "link": {
      "href": "https://flowdocs.built.io/activity/pipedrive/update-deal",
      "title": "Doc Link"
    }
  },

  version: "v4",

  input:{
    "title": "Delete Deal",
    "type": "object",
    "properties": {
      "id": {
        "title": "Deal ID",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 2,
        "description": "Select/specify the ID of the deal you want to delete"
      }
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "success": {
        "title": "success",
        "type": "boolean",
        "displayTitle": "Is Success"
      },
      "data": {
        "type": "object",
        "title": "data",
        "displayTitle": "Data",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "title": "id",
              "type": "number",
              "displayTitle": "Deal ID"
            }
          }
        }
      }
    }
  },

  mock_input:{
    id:9
  },

  execute: function(input, output){

    input.id = parseData(input.id, output, "Deal ID");

    request({
        method: 'DELETE',
        url: "https://api.pipedrive.com/v1/deals/" + input.id,
        qs: {
            api_token: input.auth.access_token
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {

        if (error) {
            return output(error)
        }
        if (typeof (body) == 'string') {
            try {
                body = JSON.parse(body);
            } catch (error) {}
        }

        if (response && response.statusCode === 410) {
            if (body && body.error) {
                return output(body.error);
            } else if (body && body.success) {
                return output('Deal already deleted');
            }
        }

        if (response && response.statusCode === 400) {
            return output("Deal ID too Long")
        }
        if (response && response.statusCode === 404) {
            return output("Invalid Deal ID")
        }
        if (response && response.statusCode === 401) {
            return output("Invalid access token")
        }

        if (response && response.statusCode === 200 && response.statusCode < 400) {
            return output(null, body)
        }
        output(body.data || body)
    })
}

}

function parseData(value, output, title) {
  var data;
  if (value) {
    if (isNaN(value)) {
      return output(title + " should be a number")
    }
    data = parseInt(value);
    if (isNaN(data)) {
      return output(title + " it should be a number")
    } else {
      return data
    }
  }
}