const request = require("request")
const commons = require("../../commons")

module.exports = {

  name: "entry_deleted",

  label: "Entry Deleted",

  version: "v5",

  input: {
    type: "object",
    title: "Entry Deleted",
    description: "Short description",
    properties: {
      "stack_api_key": {
        "type": "string",
        "title": "Stack",
        "displayTitle": "Stack",
        "minLength": 1,
        "propertyOrder": 2,
        "description": "Select/specify the API Key of the stack for which you wish to set a trigger",
      },

      "content_types": {
        "type": "array",
        "title": "Content Types",
        "displayTitle": "Content Types",
        "propertyOrder": 5,
        "items": {
          "type": "object",
          "properties": {
            "filter": {
              "title": "Content Type",
              "type": "string",
              "description": "Select the name of the content type for which you want to set the trigger",
              "lookup": {
                id: "content_type",
                "enabled": true,
                "searchable": true,
                "service": "cli-clfbf901bb72263436fb5dd8-1",
                "auth": "apikey",
                dependencies: [
                  "auth",
                  "stack_api_key"
                ]
              }

            }
          }
        }
      },
      event: {
        type: "string",
        enum: ["entry_deleted"]
      },
      polling: {
        type: "boolean",
        default: false,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "entry_deleted": {
      type: "object",
      properties: {
        "event_type": {
          "title": "event_type",
          "type": "string",
          "displayTitle": "Event Type"
        },
        "module": {
          "title": "module",
          "type": "string",
          "displayTitle": "Module"
        },
        "api_key": {
          "title": "api_key",
          "type": "string",
          "displayTitle": "Api Key"
        },
        "data": {
          "title": "data",
          "type": "object",
          "displayTitle": "Data",
          "properties": {
            "entry": {
              "title": "entry",
              "type": "object",
              "displayTitle": "Data Entry",
              "properties": {
                "title": {
                  "title": "title",
                  "type": "string",
                  "displayTitle": "Data Entry Title"
                },
                "url": {
                  "title": "url",
                  "type": "string",
                  "displayTitle": "Data Entry URL"
                },
                "seo": {
                  "title": "seo",
                  "type": "object",
                  "displayTitle": "Data Entry Seo",
                  "properties": {
                    "title": {
                      "title": "title",
                      "type": "string",
                      "displayTitle": "Data Entry Seo Title"
                    },
                    "description": {
                      "title": "description",
                      "type": "string",
                      "displayTitle": "Data Entry Seo Description"
                    },
                    "keywords": {
                      "title": "keywords",
                      "type": "string",
                      "displayTitle": "Data Entry Seo Keywords"
                    }
                  }
                },
                "team_section": {
                  "title": "team_section",
                  "type": "object",
                  "displayTitle": "Data Entry Team Section",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry Team Section Content"
                    },
                    "image": {
                      "title": "image",
                      "type": "any",
                      "displayTitle": "Data Entry Team Section Image"
                    },
                    "cta": {
                      "title": "cta",
                      "type": "array",
                      "displayTitle": "Data Entry Team Section Cta",
                      "items": {
                        "type": "any"
                      }
                    }
                  }
                },
                "promote": {
                  "title": "promote",
                  "type": "object",
                  "displayTitle": "Data Entry Promote",
                  "properties": {
                    "description": {
                      "title": "description",
                      "type": "string",
                      "displayTitle": "Data Entry Promote Description"
                    },
                    "sub_content": {
                      "title": "sub_content",
                      "type": "string",
                      "displayTitle": "Data Entry Promote Sub Content"
                    },
                    "image": {
                      "title": "image",
                      "type": "any",
                      "displayTitle": "Data Entry Promote Image"
                    },
                    "store_section": {
                      "title": "store_section",
                      "type": "array",
                      "displayTitle": "Data Entry Promote Store Section",
                      "items": {
                        "type": "any"
                      }
                    }
                  }
                },
                "testimonials": {
                  "title": "testimonials",
                  "type": "array",
                  "displayTitle": "Data Entry Testimonials",
                  "items": {
                    "type": "any"
                  }
                },
                "tags": {
                  "title": "tags",
                  "type": "array",
                  "displayTitle": "Data Entry Tags",
                  "items": {
                    "type": "any"
                  }
                },
                "locale": {
                  "title": "locale",
                  "type": "string",
                  "displayTitle": "Data Entry Locale"
                },
                "app_user_object_uid": {
                  "title": "app_user_object_uid",
                  "type": "string",
                  "displayTitle": "Data Entry App User Object UID"
                },
                "uid": {
                  "title": "uid",
                  "type": "string",
                  "displayTitle": "Data Entry UID"
                },
                "created_by": {
                  "title": "created_by",
                  "type": "string",
                  "displayTitle": "Data Entry Created By"
                },
                "updated_by": {
                  "title": "updated_by",
                  "type": "string",
                  "displayTitle": "Data Entry Updated By"
                },
                "created_at": {
                  "title": "created_at",
                  "type": "string",
                  "displayTitle": "Data Entry Created At"
                },
                "updated_at": {
                  "title": "updated_at",
                  "type": "string",
                  "displayTitle": "Data Entry Updated At"
                },
                "deleted_at": {
                  "title": "deleted_at",
                  "type": "boolean",
                  "displayTitle": "Data Entry Deleted At"
                },
                "ACL": {
                  "title": "ACL",
                  "type": "object",
                  "displayTitle": "Data Entry Acl",
                  "properties": {}
                },
                "_version": {
                  "title": "_version",
                  "type": "number",
                  "displayTitle": "Data Entry  Version"
                }
              }
            },
            "content_type": {
              "title": "content_type",
              "type": "object",
              "displayTitle": "Data Content Type",
              "properties": {
                "created_at": {
                  "title": "created_at",
                  "type": "string",
                  "displayTitle": "Data Content Type Created At"
                },
                "created_by": {
                  "title": "created_by",
                  "type": "string",
                  "displayTitle": "Data Content Type Created By"
                },
                "updated_at": {
                  "title": "updated_at",
                  "type": "string",
                  "displayTitle": "Data Content Type Updated At"
                },
                "updated_by": {
                  "title": "updated_by",
                  "type": "string",
                  "displayTitle": "Data Content Type Updated By"
                },
                "title": {
                  "title": "title",
                  "type": "string",
                  "displayTitle": "Data Content Type Title"
                },
                "uid": {
                  "title": "uid",
                  "type": "string",
                  "displayTitle": "Data Content Type UID"
                },
                "description": {
                  "title": "description",
                  "type": "string",
                  "displayTitle": "Data Content Type Description"
                },
                "schema": {
                  "title": "schema",
                  "type": "array",
                  "displayTitle": "Data Content Type Schema",
                  "items": {
                    "type": "object",
                    "properties": {
                      "display_name": {
                        "title": "display_name",
                        "type": "string",
                        "displayTitle": "Data Content Type Schema Display Name"
                      },
                      "uid": {
                        "title": "uid",
                        "type": "string",
                        "displayTitle": "Data Content Type Schema UID"
                      },
                      "data_type": {
                        "title": "data_type",
                        "type": "string",
                        "displayTitle": "Data Content Type Schema Data Type"
                      },
                      "field_metadata": {
                        "title": "field_metadata",
                        "type": "object",
                        "displayTitle": "Data Content Type Schema Field Metadata",
                        "properties": {
                          "ref_multiple": {
                            "title": "ref_multiple",
                            "type": "boolean",
                            "displayTitle": "Data Content Type Schema Field Metadata Ref Multiple"
                          },
                          "rich_text_type": {
                            "title": "rich_text_type",
                            "type": "string",
                            "displayTitle": "Data Content Type Schema Field Metadata Rich Text Type"
                          },
                          "description": {
                            "title": "description",
                            "type": "string",
                            "displayTitle": "Data Content Type Schema Field Metadata Description"
                          }
                        }
                      },
                      "unique": {
                        "title": "unique",
                        "type": "boolean",
                        "displayTitle": "Data Content Type Schema Unique"
                      },
                      "mandatory": {
                        "title": "mandatory",
                        "type": "boolean",
                        "displayTitle": "Data Content Type Schema Mandatory"
                      },
                      "multiple": {
                        "title": "multiple",
                        "type": "boolean",
                        "displayTitle": "Data Content Type Schema Multiple"
                      },
                      "schema": {
                        "title": "schema",
                        "type": "array",
                        "displayTitle": "Data Content Type Schema Schema",
                        "items": {
                          "type": "object",
                          "properties": {
                            "display_name": {
                              "title": "display_name",
                              "type": "string",
                              "displayTitle": "Data Content Type Schema Schema Display Name"
                            },
                            "uid": {
                              "title": "uid",
                              "type": "string",
                              "displayTitle": "Data Content Type Schema Schema UID"
                            },
                            "data_type": {
                              "title": "data_type",
                              "type": "string",
                              "displayTitle": "Data Content Type Schema Schema Data Type"
                            },
                            "field_metadata": {
                              "title": "field_metadata",
                              "type": "object",
                              "displayTitle": "Data Content Type Schema Schema Field Metadata",
                              "properties": {
                                "image": {
                                  "title": "image",
                                  "type": "boolean",
                                  "displayTitle": "Data Content Type Schema Schema Field Metadata Image"
                                },
                                "ref_multiple": {
                                  "title": "ref_multiple",
                                  "type": "boolean",
                                  "displayTitle": "Data Content Type Schema Schema Field Metadata Ref Multiple"
                                },
                                "rich_text_type": {
                                  "title": "rich_text_type",
                                  "type": "string",
                                  "displayTitle": "Data Content Type Schema Schema Field Metadata Rich Text Type"
                                },
                                "description": {
                                  "title": "description",
                                  "type": "string",
                                  "displayTitle": "Data Content Type Schema Schema Field Metadata Description"
                                }
                              }
                            },
                            "unique": {
                              "title": "unique",
                              "type": "boolean",
                              "displayTitle": "Data Content Type Schema Schema Unique"
                            },
                            "mandatory": {
                              "title": "mandatory",
                              "type": "boolean",
                              "displayTitle": "Data Content Type Schema Schema Mandatory"
                            },
                            "multiple": {
                              "title": "multiple",
                              "type": "boolean",
                              "displayTitle": "Data Content Type Schema Schema Multiple"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "options": {
                  "title": "options",
                  "type": "object",
                  "displayTitle": "Data Content Type Options",
                  "properties": {
                    "singleton": {
                      "title": "singleton",
                      "type": "boolean",
                      "displayTitle": "Data Content Type Options Singleton"
                    },
                    "_version": {
                      "title": "_version",
                      "type": "number",
                      "displayTitle": "Data Content Type Options  Version"
                    },
                    "sub_title": {
                      "title": "sub_title",
                      "type": "array",
                      "displayTitle": "Data Content Type Options Sub Title",
                      "items": {
                        "type": "any"
                      }
                    },
                    "title": {
                      "title": "title",
                      "type": "string",
                      "displayTitle": "Data Content Type Options Title"
                    },
                    "is_page": {
                      "title": "is_page",
                      "type": "boolean",
                      "displayTitle": "Data Content Type Options Is Page"
                    }
                  }
                }
              }
            }
          }
        },
        "event": {
          "title": "event",
          "type": "string",
          "displayTitle": "Event"
        },
        "triggered_at": {
          "title": "triggered_at",
          "type": "string",
          "displayTitle": "Triggered At"
        }
      }
    }
  },

  mock_data: {
    "event_type": "Entry Deleted",
    "module": "entry",
    "api_key": "blt1e0db6b63b504d46",
    "data": {
      "entry": {
        "title": "About Title....",
        "url": "/about",
        "seo": {
          "title": "SEO",
          "description": "desc",
          "keywords": "seo,search"
        },
        "team_section": {},
        "locale": "en-us",
        "app_user_object_uid": "system",
        "uid": "blt47b4fb865ec4fcf0",
        "created_by": "blt32ff08a259f3bff6",
        "updated_by": "blt32ff08a259f3bff6",
        "created_at": "2018-11-26T11:39:31.452Z",
        "updated_at": "2018-11-26T13:39:09.384Z",
        "deleted_at": false,
        "_version": 4
      },
      "content_type": {
        "created_at": "2018-11-22T06:22:43.354Z",
        "created_by": "blt32ff08a259f3bff6",
        "updated_at": "2018-11-22T06:22:43.354Z",
        "updated_by": "blt32ff08a259f3bff6",
        "title": "About",
        "uid": "about_page",
        "schema": [{
            "display_name": "Title",
            "uid": "title",
            "data_type": "text",
            "field_metadata": {
              "_default": true,
              "version": 3
            },
            "unique": true,
            "mandatory": true,
            "multiple": false
          },
          {
            "display_name": "URL",
            "uid": "url",
            "data_type": "text",
            "field_metadata": {
              "_default": true,
              "version": 3
            },
            "unique": false,
            "mandatory": true,
            "multiple": false
          },
          {
            "data_type": "group",
            "display_name": "SEO",
            "field_metadata": {
              "ref_multiple": false
            },
            "uid": "seo",
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "data_type": "text",
                "display_name": "Title",
                "uid": "title",
                "field_metadata": {
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "data_type": "text",
                "display_name": "Description",
                "uid": "description",
                "field_metadata": {
                  "ref_multiple": false,
                  "multiline": true,
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "data_type": "text",
                "display_name": "Keywords",
                "uid": "keywords",
                "field_metadata": {
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              }
            ]
          },
          {
            "display_name": "Team Section",
            "uid": "team_section",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "additional description can be found online"
            },
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "display_name": "Content",
                "uid": "content",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Image",
                "uid": "image",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "CTA",
                "uid": "cta",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": true,
                "unique": false,
                "schema": [{
                    "display_name": "Title",
                    "uid": "title",
                    "data_type": "text",
                    "field_metadata": {
                      "_default": true,
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "Link",
                    "uid": "link",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "additional description can be found online",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "Open in New Tab",
                    "uid": "open_in_new_tab",
                    "data_type": "boolean",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "additional description can be found online"
                    },
                    "unique": false,
                    "multiple": false,
                    "mandatory": false
                  }
                ]
              }
            ]
          },
          {
            "display_name": "Promote",
            "uid": "promote",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "additional description can be found online"
            },
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "display_name": "Description",
                "uid": "description",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Sub Content",
                "uid": "sub_content",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Image",
                "uid": "image",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "Store Section",
                "uid": "store_section",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": true,
                "unique": false,
                "schema": [{
                    "display_name": "Title",
                    "uid": "title",
                    "data_type": "text",
                    "field_metadata": {
                      "_default": true,
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "Image",
                    "uid": "image",
                    "data_type": "file",
                    "field_metadata": {
                      "image": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "additional description can be found online"
                    },
                    "mandatory": false,
                    "multiple": false,
                    "unique": false
                  },
                  {
                    "display_name": "Color Image",
                    "uid": "color_image",
                    "data_type": "file",
                    "field_metadata": {
                      "image": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "additional description can be found online"
                    },
                    "mandatory": false,
                    "multiple": false,
                    "unique": false
                  }
                ]
              }
            ]
          },
          {
            "display_name": "Testimonials",
            "uid": "testimonials",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "additional description can be found online"
            },
            "mandatory": false,
            "multiple": true,
            "unique": false,
            "schema": [{
                "display_name": "Title",
                "uid": "title",
                "data_type": "text",
                "field_metadata": {
                  "_default": true,
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Name",
                "uid": "name",
                "data_type": "text",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Description",
                "uid": "description",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "multiline": false,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "Background Image",
                "uid": "background_image",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "quote image",
                "uid": "quote_image",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "additional description can be found online"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              }
            ]
          }
        ],
        "options": {
          "singleton": true,
          "_version": 1,
          "title": "title",
          "is_page": true
        }
      }
    },
    "event": "delete",
    "triggered_at": "2018-11-27T11:55:18.637Z"
  }, // output of trigger data

  mock_input: {},

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.

    // your code goes here

    payload = Object.assign({
      event_type: "Entry Deleted"
    }, payload)

    return output(null, payload)

  },

  register: function (input, output) {
    // function will be used for registering webhook with services additional key
    // "webhook" along with input data will be available here so you can access the input.webhook
    // for registering the webhook


    try {
      (async function () {

        if (!input.auth.authtoken)
          input.auth.authtoken = await commons.getAuthToken(input)

        commons.validateStackId(input)
          .then(async () => {
            let channels = await commons.getChannels(input, "delete")


            if (!(channels instanceof Error)) {

              request({
                method: "POST",
                url: "https://api.contentstack.io/v3/webhooks",
                json: {
                  webhook: {
                    name: "Created by Built.io on " + new Date(Date.now()).toLocaleDateString(),
                    channels: channels,
                    destinations: [{
                      target_url: input.webhook
                    }],
                    retry_policy: "manual"
                  }
                },
                headers: {
                  authtoken: input.auth.authtoken,
                  api_key: input.stack_api_key
                }
              }, function (err, res, body) {


                if (err) {
                  return output(err);
                }
                if (res && res.statusCode && res.statusCode === 412) {
                  return output({
                    message: "Site API key is invalid",
                    errors: ["Site API key is invalid", "Error code is 109"]
                  });
                }
                if (res && res.statusCode && res.statusCode === 422) {
                  if (typeof body === "string") {
                    body = JSON.parse(body)
                  }
                  return output({
                    message: body.error_message,
                    errors: [body.error_message, "Error code is " + body.error_code]
                  });
                }
                if (res && res.statusCode >= 200 && res.statusCode < 300) {
                  if (typeof (body) === "string") {
                    body = JSON.parse(body);
                  }

                  body.id = body.webhook.uid

                  return output(null, body);

                }
                output(body);
              });

            } else {
              return output(channels.message, null)
            }

          })

      })()
    } catch (err) {
      return output(err, null)
    }

  },

  unregister: function (input, options, output) {
    // will be invoked when user deletes the trigger for unregistering the webhook
    // webhook id will be available in input.webhookId

    // your code goes here


    try {
      (async function () {

        if (!input.auth.authtoken)
          input.auth.authtoken = await commons.getAuthToken(input)

        request({
          method: "DELETE",
          url: "https://api.contentstack.io/v3/webhooks/" + input.webhookId,
          headers: {
            authtoken: input.auth.authtoken,
            api_key: input.stack_api_key
          }
        }, function (err, res, body) {
          if (err) {
            return output(err);
          }
          if (res && res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
            return output(null, {
              "message": "Webhook deleted successfully!!"
            });
          }
          output(body);
        });

      })()
    } catch (err) {
      return output(err, null)
    }

  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here

    output(null, true);
  }
}