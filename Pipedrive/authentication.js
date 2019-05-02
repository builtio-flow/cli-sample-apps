var Pipedrive = require('pipedrive');
var request = require('request');

module.exports = {
    label: 'Connect to Pipedrive',
    mock_input: {
        access_token: ""
    },
    input: {
        type: "object",
        properties: {
            "access_token": {
                "type": "string",
                "title": "Pipedrive API Token",
                "description":"Enter your Pipedrive API Token, Click <a href = 'https://pipedrive.readme.io/docs/core-api-concepts-authentication' target = '_blank'>here</a> for more info",
                "minLength": 1
            }
        }
    },
    validate: function (input, output) {
        var pipedriveClient = new Pipedrive.Client(input.auth.access_token.trim());
        pipedriveClient.Filters.getAll(function (err, filters) {
            if (err) {
                return output({ "message": "Somthing went wrong, Enter right credentials and try again", "error": "Connection validation failed" });
            } else {
                if (filters && filters.error) {
                    return output({ "message": filters.error, "error": "Connection validation failed" });
                    return output(filters.error);
                } else {
                    if (typeof filters == "string")
                        filters = JSON.parse(filters);
                    if (Array.isArray(filters) && filters[0].id === false)
                        return output({ "message": "Invalid API Key", "error": "Connection validation failed" });
                    else
                        return output(null, true);
                }
            }
        });

    }
}