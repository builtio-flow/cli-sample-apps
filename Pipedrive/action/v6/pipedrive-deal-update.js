var request = require("request");

module.exports = {

  name: "pipedrive-deal-update",

  title: "Update Deal",

  description: "Update an existing deal",

  usage: {
    "html": "Update an existing deal",
    "link": {
      "href": "https://flowdocs.built.io/activity/pipedrive/update-deal",
      "title": "Doc Link"
    }
  },

  version: "v6",

  input: {
    "title": "Update Deal",
    "type": "object",
    "properties": {
      "id": {
        "title": "Deal ID",
        "type": "string",
        "minLength": 1,
        "propertyOrder": 2,
        "description": "Select/specify the ID of the deal you want to update"
      },
      "title": {
        "title": "Deal Title",
        "type": "string",
        "propertyOrder": 3,
        "description": "Enter the title of the deal you want to update"
      },
      "value": {
        "title": "Deal Value",
        "type": "string",
        "propertyOrder": 4,
        "description": "Enter the estimated value of the deal. The default value of this field is set to ‘0’"
      },
      "currency": {
        "title": "Currency",
        "type": "string",
        "description": "Select the currency of the specified deal value. The default value of this field is set to the currency of the authorized user",
        "propertyOrder": 5
      },
      "user_id": {
        "title": "User ID",
        "type": "string",
        "propertyOrder": 6,
        "description": "Select/specify the ID of the user you want to mark as the owner of this deal"
      },
      "person_id": {
        "title": "Person ID",
        "type": "string",
        "propertyOrder": 7,
        "description": "Select/specify the ID of the person you want to associate with this deal"
      },
      "org_id": {
        "title": "Organization ID",
        "type": "string",
        "propertyOrder": 8,
        "description": "Select/specify the ID of the organization you want to associate with this deal"
      },
      "stage_id": {
        "title": "Stage ID",
        "type": "string",
        "propertyOrder": 9,
        "description": "Select/specify the ID of the stage whose pipeline will be used to place the deal. If the value for this field is empty, the deal will be placed in the first stage of the default pipeline"
      },
      "status": {
        "title": "Status",
        "oneOf": [
          {
            "type": "object",
            "title": "- Select -",
            "properties": {
              "status_type": {
                "type": "string",
                "enum": [
                  "- Select -"
                ],
                "options": {
                  "hidden": true
                }
              }
            }
          },
          {
            "type": "object",
            "title": "Open",
            "properties": {
              "status_type": {
                "type": "string",
                "enum": [
                  "Open"
                ],
                "options": {
                  "hidden": true
                }
              }
            }
          },
          {
            "type": "object",
            "title": "Won",
            "properties": {
              "status_type": {
                "type": "string",
                "enum": [
                  "Won"
                ],
                "options": {
                  "hidden": true
                }
              }
            }
          },
          {
            "type": "object",
            "title": "Lost",
            "properties": {
              "status_type": {
                "type": "string",
                "enum": [
                  "Lost"
                ],
                "options": {
                  "hidden": true
                }
              },
              "lost_reason": {
                "title": "Lost Reason",
                "type": "string",
                "propertyOrder": 11,
                "description": "Provide a reason for losing the deal"
              }
            }
          },
          {
            "type": "object",
            "title": "Deleted",
            "properties": {
              "status_type": {
                "type": "string",
                "enum": [
                  "Deleted"
                ],
                "options": {
                  "hidden": true
                }
              }
            }
          }
        ],
        "propertyOrder": 10,
        "description": "Select the status for the deal you want to update"
      },
      "add_time": {
        "title": "Deal Created On",
        "type": "string",
        "format": "datetime",
        "propertyOrder": 12,
        "description": "Select/specify the date and time at which the deal is created"
      },
      "visible_to": {
        "title": "Visible To",
        "type": "string",
        "propertyOrder": 13,
        "enum": [
          "Entire Company (Shared)",
          "Owner and Followers (Private)"
        ],
        "description": "Specify to whom you want make this deal visible. The default value of this field is ‘Entire Company (Shared)’"
      },
      "additional_params": {
        "title": "Additional Parameters",
        "description": "Provides a list of additional fields present in the UI of the ‘Pipedrive’ service to be added",
        "type": "array",
        "propertyOrder": 14,
        "items": {
          "type": "object",
          "title": "Parameter",
          "properties": {
            "param_name": {
              "title": "Name",
              "type": "string",
              "lookup": {
                "id": "dealfields",
                "enabled": true,
                "service": 'cli-clb82c1f725f3e6fcc345083-1',
                'dependencies': ['auth']
              },
              "description": "Select/specify the name of the field you want to add. The field name should be same as the field name in <a target='_blank' href='https://developers.pipedrive.com/docs/api/v1/#!/Deals/put_deals_id'> API docs</a>"
            },
            "param_value": {
              "title": "Value",
              "type": "string",
              "description": "Enter the value for the specified UI parameter"
            }
          }
        }
      }
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "id": {
        "title": "id",
        "type": "number",
        "displayTitle": "Deal ID"
      },
      "user_id": {
        "title": "user_id",
        "type": "object",
        "displayTitle": "User ID",
        "properties": {
          "id": {
            "title": "id",
            "type": "number",
            "displayTitle": "ID"
          },
          "name": {
            "title": "name",
            "type": "string",
            "displayTitle": "Name"
          },
          "email": {
            "title": "email",
            "type": "string",
            "displayTitle": "Email"
          },
          "has_pic": {
            "title": "has_pic",
            "type": "boolean",
            "displayTitle": "Has Picture"
          },
          "pic_hash": {
            "title": "pic_hash",
            "type": "string",
            "displayTitle": "Picture Hash"
          },
          "active_flag": {
            "title": "active_flag",
            "type": "boolean",
            "displayTitle": "Is Owner Active"
          },
          "value": {
            "title": "value",
            "type": "number",
            "displayTitle": "Value"
          }
        }
      },
      "person_id": {
        "title": "person_id",
        "type": "object",
        "displayTitle": "Person ID",
        "properties": {
          "name": {
            "title": "name",
            "type": "string",
            "displayTitle": "Name"
          },
          "email": {
            "title": "email",
            "type": "array",
            "displayTitle": "Email",
            "items": {
              "type": "object",
              "properties": {
                "label": {
                  "title": "label",
                  "type": "string",
                  "displayTitle": "Email Label"
                },
                "value": {
                  "title": "value",
                  "type": "string",
                  "displayTitle": "Email value"
                },
                "primary": {
                  "title": "primary",
                  "type": "boolean",
                  "displayTitle": "Email Is Primary"
                }
              }
            }
          },
          "phone": {
            "title": "phone",
            "type": "array",
            "displayTitle": "Phone",
            "items": {
              "type": "object",
              "properties": {
                "label": {
                  "title": "label",
                  "type": "string",
                  "displayTitle": "Phone Label"
                },
                "value": {
                  "title": "value",
                  "type": "string",
                  "displayTitle": "Phone value"
                },
                "primary": {
                  "title": "primary",
                  "type": "boolean",
                  "displayTitle": "Phone Is Primary"
                }
              }
            }
          },
          "value": {
            "title": "value",
            "type": "number",
            "displayTitle": "Value"
          }
        }
      },
      "org_id": {
        "title": "org_id",
        "type": "object",
        "displayTitle": "Organization",
        "properties": {
          "items": {
            "type": "object",
            "title": "items",
            "displayTitle": "Organization Items",
            "properties": {
              "name": {
                "title": "name",
                "type": "string",
                "displayTitle": "Name"
              },
              "people_count": {
                "title": "people_count",
                "type": "number",
                "displayTitle": "People Count"
              },
              "owner_id": {
                "title": "owner_id",
                "type": "number",
                "displayTitle": "Owner ID"
              },
              "address": {
                "title": "address",
                "type": "string",
                "displayTitle": "Address"
              },
              "cc_email": {
                "title": "cc_email",
                "type": "string",
                "displayTitle": "Cc Email"
              },
              "value": {
                "title": "value",
                "type": "number",
                "displayTitle": "Value"
              }
            }
          }
        }
      },
      "stage_id": {
        "title": "stage_id",
        "type": "number",
        "displayTitle": "Stage ID"
      },
      "title": {
        "title": "title",
        "type": "string",
        "displayTitle": "Title"
      },
      "value": {
        "title": "value",
        "type": "number",
        "displayTitle": "Value"
      },
      "currency": {
        "title": "currency",
        "type": "string",
        "displayTitle": "Currency"
      },
      "add_time": {
        "title": "add_time",
        "type": "string",
        "displayTitle": "Add Time"
      },
      "update_time": {
        "title": "update_time",
        "type": "string",
        "displayTitle": "Update Time"
      },
      "stage_change_time": {
        "title": "stage_change_time",
        "type": "string",
        "displayTitle": "Stage Change Time"
      },
      "active": {
        "title": "active",
        "type": "boolean",
        "displayTitle": "Is Active"
      },
      "deleted": {
        "title": "deleted",
        "type": "boolean",
        "displayTitle": "Is Deleted"
      },
      "status": {
        "title": "status",
        "type": "string",
        "displayTitle": "Status"
      },
      "next_activity_date": {
        "title": "next_activity_date",
        "type": "string",
        "displayTitle": "Next Activity Date"
      },
      "next_activity_time": {
        "title": "next_activity_time",
        "type": "string",
        "displayTitle": "Next Activity Time"
      },
      "next_activity_id": {
        "title": "next_activity_id",
        "type": "string",
        "displayTitle": "Next Activity ID"
      },
      "last_activity_id": {
        "title": "last_activity_id",
        "type": "string",
        "displayTitle": "Last Activity ID"
      },
      "last_activity_date": {
        "title": "last_activity_date",
        "type": "string",
        "displayTitle": "Last Activity Date"
      },
      "lost_reason": {
        "title": "lost_reason",
        "type": "string",
        "displayTitle": "Lost Reason"
      },
      "visible_to": {
        "title": "visible_to",
        "type": "string",
        "displayTitle": "Visible To"
      },
      "close_time": {
        "title": "close_time",
        "type": "string",
        "displayTitle": "Close Time"
      },
      "pipeline_id": {
        "title": "pipeline_id",
        "type": "number",
        "displayTitle": "Pipeline ID"
      },
      "won_time": {
        "title": "won_time",
        "type": "string",
        "displayTitle": "Won Time"
      },
      "lost_time": {
        "title": "lost_time",
        "type": "string",
        "displayTitle": "Lost Time"
      },
      "products_count": {
        "title": "products_count",
        "type": "string",
        "displayTitle": "Products Count"
      },
      "files_count": {
        "title": "files_count",
        "type": "string",
        "displayTitle": "Files Count"
      },
      "notes_count": {
        "title": "notes_count",
        "type": "number",
        "displayTitle": "Notes Count"
      },
      "followers_count": {
        "title": "followers_count",
        "type": "number",
        "displayTitle": "Followers Count"
      },
      "email_messages_count": {
        "title": "email_messages_count",
        "type": "string",
        "displayTitle": "Email Message Count"
      },
      "activities_count": {
        "title": "activities_count",
        "type": "string",
        "displayTitle": "Activities Count"
      },
      "done_activities_count": {
        "title": "done_activities_count",
        "type": "string",
        "displayTitle": "Done Activities Count"
      },
      "undone_activities_count": {
        "title": "undone_activities_count",
        "type": "string",
        "displayTitle": "Undone Activities Count"
      },
      "reference_activities_count": {
        "title": "reference_activities_count",
        "type": "string",
        "displayTitle": "Reference Activities Count"
      },
      "participants_count": {
        "title": "participants_count",
        "type": "number",
        "displayTitle": "Participants Count"
      },
      "expected_close_date": {
        "title": "expected_close_date",
        "type": "string",
        "displayTitle": "Expected Close Date"
      },
      "stage_order_nr": {
        "title": "stage_order_nr",
        "type": "number",
        "displayTitle": "Stage Order"
      },
      "person_name": {
        "title": "person_name",
        "type": "string",
        "displayTitle": "Person Name"
      },
      "org_name": {
        "title": "org_name",
        "type": "string",
        "displayTitle": "Organization Name"
      },
      "next_activity_subject": {
        "title": "next_activity_subject",
        "type": "string",
        "displayTitle": "Next Activity Subject"
      },
      "next_activity_type": {
        "title": "next_activity_type",
        "type": "string",
        "displayTitle": "Next Activity Type"
      },
      "next_activity_duration": {
        "title": "next_activity_duration",
        "type": "string",
        "displayTitle": "Next Activity Duration"
      },
      "next_activity_note": {
        "title": "next_activity_note",
        "type": "string",
        "displayTitle": "Next Activity Note"
      },
      "formatted_value": {
        "title": "formatted_value",
        "type": "string",
        "displayTitle": "Formatted Value"
      },
      "weighted_value": {
        "title": "weighted_value",
        "type": "number",
        "displayTitle": "Weighted Value"
      },
      "formatted_weighted_value": {
        "title": "formatted_weighted_value",
        "type": "string",
        "displayTitle": "Formatted Weighted Value"
      },
      "rotten_time": {
        "title": "rotten_time",
        "type": "string",
        "displayTitle": "Rotten Time"
      },
      "owner_name": {
        "title": "owner_name",
        "type": "string",
        "displayTitle": "Owner Name"
      },
      "cc_email": {
        "title": "cc_email",
        "type": "string",
        "displayTitle": "Email CC"
      },
      "org_hidden": {
        "title": "org_hidden",
        "type": "boolean",
        "displayTitle": "Is Organization Hidden"
      },
      "person_hidden": {
        "title": "person_hidden",
        "type": "boolean",
        "displayTitle": "Is Person Hidden"
      }
    }
  },

  mock_input:{},

  execute: function (input, output) {

    input.id = parseData(input.id, output, "Deal ID");
    input.stage_id = parseData(input.stage_id, output, "Stage ID");
    input.person_id = parseData(input.person_id, output, "Person ID");
    input.org_id = parseData(input.org_id, output, "Organization ID");
    input.user_id = parseData(input.user_id, output, "User ID");

    if (input.value) {
      if (isNaN(Number(input.value))) {
        return output({
          error: "value must be number"
        })
      } else {
        input.value = Number(input.value)
      }
    }
    var visible = {
      "Entire Company (Shared)": "3",
      "Owner and Followers (Private)": "1"
    }
    input.visible_to = visible[input.visible_to]

    var body = {
      "user_id": input.user_id,
      "person_id": input.person_id,
      "org_id": input.org_id,
      "stage_id": input.stage_id,
      "visible_to": input.visible_to
    };

    if (input.status && input.status.status_type && input.status.status_type != '- Select -') {
      body.status = input.status.status_type.toLowerCase().trim();
    }
    optionalfield(input, "title", body)
    optionalfield(input, "value", body)
    optionalfield(input, "currency", body)
    optionalfield(input, "add_time", body)
    if (input.status && input.status.status_type && input.status.status_type === 'Lost') {
      optionalfield(input.status, 'lost_reason', body);
    }

    body = mergeExtraParams(input, body);

    request({
      method: "PUT",
      url: "https://api.pipedrive.com/v1/deals/" + input.id,
      qs: {
        api_token: input.auth.access_token
      },
      headers: {
        'Content-Type': 'application/json'
      },
      json: body
    }, function (error, response, body) {

      if (error) {
        return output(error)
      }

      if (response && response.statusCode === 404) {
        return output("Invalid Deal ID")
      }
      if (response && response.statusCode === 400) {
        return output("Enter Any Details To Update or Entered Value is Invalid ")
      }

      if (response && response.statusCode === 410 && input.status.status_type=='Deleted') {
        return output("Deal already deleted")
      }

      if (response.statusCode >= 200 && response.statusCode < 400) {
        if (typeof (body) === 'string') {
          try {
            body = JSON.parse(body)
          } catch (error) { }
        }

        ConvertISODate("add_time", body);
        ConvertISODate("update_time", body);
        ConvertISODate("stage_change_time", body);
        ConvertISODate("next_activity_date", body);
        ConvertISODate("last_activity_date", body);
        ConvertISODate("expected_close_date", body);
        ConvertISODate("expected_close_date", body);
        return output(null, body.data)
      } else if (response.body && response.body.error) {
        output(response.body.error)
      }
      output(body.data || body)
    })
  }
};

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

function ConvertISODate(key, body) {
  if (body.data[key] && body.data[key] != null) {
    body.data[key] = new Date(body.data[key]).toISOString()
  }
}

function optionalfield(src, value, dest) {
  if (src[value]) {
    dest[value] = src[value]
  }

}

function mergeExtraParams(input, body) {
  if (!input || !input.additional_params) {
    return body;
  }
  if (input.additional_params && !input.additional_params.length) {
    //delete input.additional_params;
    return body;
  }
  input.additional_params.forEach(function (obj) {
    if (obj.param_name && obj.param_value) {
      try {
        if (typeof obj.param_value === "string") {
          obj.param_value = JSON.parse(obj.param_value);
        }
      } catch (e) {
      }
      body[obj.param_name] = obj.param_value;
    }
  });
  //delete input.additional_params;
  return body;
};
