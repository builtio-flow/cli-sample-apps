const request = require("request")
const commons = require("../../commons")


module.exports = {

  name: "entry_published",

  label: "Entry Published",

  version: "v5",

  input: {
    type: "object",
    title: "Entry Published",
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

      "environments": {
        "type": "string",
        "title": "Environments",
        "displayTitle": "Environments",
        "minLength": 1,
        "propertyOrder": 3,
        "description": "Select/specify the Environment for which you wish to set a trigger",
      },

      "content_types": {
        "type": "array",
        "title": "Content Types",
        "displayTitle": "Content Types",
        "propertyOrder": 4,
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

      "entriy" : {
        "type": "string",
        "title": "Entry",
        "displayTitle": "Entry",
        "minLength": 1,
        "propertyOrder": 5,
        "description": "Select/specify the Entry for which you wish to set a trigger",  
      },

      event: {
        type: "string",
        enum: ["entry_published"]
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
    "entry_published": {
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
            "environment": {
              "title": "environment",
              "type": "object",
              "displayTitle": "Data Environment",
              "properties": {
                "deploy_content": {
                  "title": "deploy_content",
                  "type": "boolean",
                  "displayTitle": "Data Environment Deploy Content"
                },
                "servers": {
                  "title": "servers",
                  "type": "array",
                  "displayTitle": "Data Environment Servers",
                  "items": {
                    "type": "any"
                  }
                },
                "urls": {
                  "title": "urls",
                  "type": "array",
                  "displayTitle": "Data Environment URLS",
                  "items": {
                    "type": "object",
                    "properties": {
                      "url": {
                        "title": "url",
                        "type": "string",
                        "displayTitle": "Data Environment URLS URL"
                      },
                      "locale": {
                        "title": "locale",
                        "type": "string",
                        "displayTitle": "Data Environment URLS Locale"
                      }
                    }
                  }
                },
                "name": {
                  "title": "name",
                  "type": "string",
                  "displayTitle": "Data Environment Name"
                },
                "uid": {
                  "title": "uid",
                  "type": "string",
                  "displayTitle": "Data Environment UID"
                },
                "created_by": {
                  "title": "created_by",
                  "type": "string",
                  "displayTitle": "Data Environment Created By"
                },
                "updated_by": {
                  "title": "updated_by",
                  "type": "string",
                  "displayTitle": "Data Environment Updated By"
                },
                "created_at": {
                  "title": "created_at",
                  "type": "string",
                  "displayTitle": "Data Environment Created At"
                },
                "updated_at": {
                  "title": "updated_at",
                  "type": "string",
                  "displayTitle": "Data Environment Updated At"
                },
                "ACL": {
                  "title": "ACL",
                  "type": "array",
                  "displayTitle": "Data Environment Acl",
                  "items": {
                    "type": "any"
                  }
                },
                "_version": {
                  "title": "_version",
                  "type": "number",
                  "displayTitle": "Data Environment  Version"
                }
              }
            },
            "action": {
              "title": "action",
              "type": "string",
              "displayTitle": "Data Action"
            },
            "status": {
              "title": "status",
              "type": "string",
              "displayTitle": "Data Status"
            },
            "locale": {
              "title": "locale",
              "type": "string",
              "displayTitle": "Data Locale"
            },
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
                "logo": {
                  "title": "logo",
                  "type": "object",
                  "displayTitle": "Data Entry Logo",
                  "properties": {
                    "image": {
                      "title": "image",
                      "type": "object",
                      "displayTitle": "Data Entry Logo Image",
                      "properties": {
                        "uid": {
                          "title": "uid",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image UID"
                        },
                        "created_at": {
                          "title": "created_at",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Created At"
                        },
                        "updated_at": {
                          "title": "updated_at",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Updated At"
                        },
                        "created_by": {
                          "title": "created_by",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Created By"
                        },
                        "updated_by": {
                          "title": "updated_by",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Updated By"
                        },
                        "content_type": {
                          "title": "content_type",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Content Type"
                        },
                        "file_size": {
                          "title": "file_size",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image File Size"
                        },
                        "tags": {
                          "title": "tags",
                          "type": "array",
                          "displayTitle": "Data Entry Logo Image Tags",
                          "items": {
                            "type": "any"
                          }
                        },
                        "filename": {
                          "title": "filename",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Filename"
                        },
                        "url": {
                          "title": "url",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image URL"
                        },
                        "ACL": {
                          "title": "ACL",
                          "type": "object",
                          "displayTitle": "Data Entry Logo Image Acl",
                          "properties": {}
                        },
                        "is_dir": {
                          "title": "is_dir",
                          "type": "boolean",
                          "displayTitle": "Data Entry Logo Image Is Dir"
                        },
                        "_version": {
                          "title": "_version",
                          "type": "number",
                          "displayTitle": "Data Entry Logo Image  Version"
                        },
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Image Title"
                        },
                        "publish_details": {
                          "title": "publish_details",
                          "type": "object",
                          "displayTitle": "Data Entry Logo Image Publish Details",
                          "properties": {
                            "environment": {
                              "title": "environment",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Image Publish Details Environment"
                            },
                            "locale": {
                              "title": "locale",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Image Publish Details Locale"
                            },
                            "time": {
                              "title": "time",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Image Publish Details Time"
                            },
                            "user": {
                              "title": "user",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Image Publish Details User"
                            }
                          }
                        }
                      }
                    },
                    "color_image": {
                      "title": "color_image",
                      "type": "object",
                      "displayTitle": "Data Entry Logo Color Image",
                      "properties": {
                        "uid": {
                          "title": "uid",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image UID"
                        },
                        "created_at": {
                          "title": "created_at",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Created At"
                        },
                        "updated_at": {
                          "title": "updated_at",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Updated At"
                        },
                        "created_by": {
                          "title": "created_by",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Created By"
                        },
                        "updated_by": {
                          "title": "updated_by",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Updated By"
                        },
                        "content_type": {
                          "title": "content_type",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Content Type"
                        },
                        "file_size": {
                          "title": "file_size",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image File Size"
                        },
                        "tags": {
                          "title": "tags",
                          "type": "array",
                          "displayTitle": "Data Entry Logo Color Image Tags",
                          "items": {
                            "type": "any"
                          }
                        },
                        "filename": {
                          "title": "filename",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Filename"
                        },
                        "url": {
                          "title": "url",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image URL"
                        },
                        "ACL": {
                          "title": "ACL",
                          "type": "object",
                          "displayTitle": "Data Entry Logo Color Image Acl",
                          "properties": {}
                        },
                        "is_dir": {
                          "title": "is_dir",
                          "type": "boolean",
                          "displayTitle": "Data Entry Logo Color Image Is Dir"
                        },
                        "parent_uid": {
                          "title": "parent_uid",
                          "type": "any",
                          "displayTitle": "Data Entry Logo Color Image Parent UID"
                        },
                        "_version": {
                          "title": "_version",
                          "type": "number",
                          "displayTitle": "Data Entry Logo Color Image  Version"
                        },
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Color Image Title"
                        },
                        "publish_details": {
                          "title": "publish_details",
                          "type": "object",
                          "displayTitle": "Data Entry Logo Color Image Publish Details",
                          "properties": {
                            "environment": {
                              "title": "environment",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Color Image Publish Details Environment"
                            },
                            "locale": {
                              "title": "locale",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Color Image Publish Details Locale"
                            },
                            "time": {
                              "title": "time",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Color Image Publish Details Time"
                            },
                            "user": {
                              "title": "user",
                              "type": "string",
                              "displayTitle": "Data Entry Logo Color Image Publish Details User"
                            }
                          }
                        }
                      }
                    },
                    "link": {
                      "title": "link",
                      "type": "object",
                      "displayTitle": "Data Entry Logo Link",
                      "properties": {
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Link Title"
                        },
                        "href": {
                          "title": "href",
                          "type": "string",
                          "displayTitle": "Data Entry Logo Link Href"
                        }
                      }
                    }
                  }
                },
                "navigation_section": {
                  "title": "navigation_section",
                  "type": "object",
                  "displayTitle": "Data Entry Navigation Section",
                  "properties": {
                    "navigation_bar": {
                      "title": "navigation_bar",
                      "type": "array",
                      "displayTitle": "Data Entry Navigation Section Navigation Bar",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Navigation Section Navigation Bar Title"
                          },
                          "link": {
                            "title": "link",
                            "type": "string",
                            "displayTitle": "Data Entry Navigation Section Navigation Bar Link"
                          },
                          "sub_navigation": {
                            "title": "sub_navigation",
                            "type": "array",
                            "displayTitle": "Data Entry Navigation Section Navigation Bar Sub Navigation",
                            "items": {
                              "type": "object",
                              "properties": {
                                "title": {
                                  "title": "title",
                                  "type": "string",
                                  "displayTitle": "Data Entry Navigation Section Navigation Bar Sub Navigation Title"
                                },
                                "link": {
                                  "title": "link",
                                  "type": "string",
                                  "displayTitle": "Data Entry Navigation Section Navigation Bar Sub Navigation Link"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "cta": {
                  "title": "cta",
                  "type": "array",
                  "displayTitle": "Data Entry Cta",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "title": "title",
                        "type": "string",
                        "displayTitle": "Data Entry Cta Title"
                      },
                      "link": {
                        "title": "link",
                        "type": "string",
                        "displayTitle": "Data Entry Cta Link"
                      },
                      "open_in_new_tab": {
                        "title": "open_in_new_tab",
                        "type": "boolean",
                        "displayTitle": "Data Entry Cta Open In New Tab"
                      }
                    }
                  }
                },
                "tags": {
                  "title": "tags",
                  "type": "array",
                  "displayTitle": "Data Entry Tags",
                  "items": {
                    "type": "string"
                  }
                },
                "locale": {
                  "title": "locale",
                  "type": "string",
                  "displayTitle": "Data Entry Locale"
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
                },
                "publish_details": {
                  "title": "publish_details",
                  "type": "object",
                  "displayTitle": "Data Entry Publish Details",
                  "properties": {
                    "environment": {
                      "title": "environment",
                      "type": "string",
                      "displayTitle": "Data Entry Publish Details Environment"
                    },
                    "locale": {
                      "title": "locale",
                      "type": "string",
                      "displayTitle": "Data Entry Publish Details Locale"
                    },
                    "time": {
                      "title": "time",
                      "type": "string",
                      "displayTitle": "Data Entry Publish Details Time"
                    },
                    "user": {
                      "title": "user",
                      "type": "string",
                      "displayTitle": "Data Entry Publish Details User"
                    }
                  }
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
                      "indexed": {
                        "title": "indexed",
                        "type": "boolean",
                        "displayTitle": "Data Content Type Schema Indexed"
                      },
                      "inbuilt_model": {
                        "title": "inbuilt_model",
                        "type": "boolean",
                        "displayTitle": "Data Content Type Schema Inbuilt Model"
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
                            },
                            "indexed": {
                              "title": "indexed",
                              "type": "boolean",
                              "displayTitle": "Data Content Type Schema Schema Indexed"
                            },
                            "inbuilt_model": {
                              "title": "inbuilt_model",
                              "type": "boolean",
                              "displayTitle": "Data Content Type Schema Schema Inbuilt Model"
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
    "event_type": "Entry Published",
    "module": "entry",
    "api_key": "blt1e0db6b63b504d46",
    "data": {
      "environment": {
        "deploy_content": false,
        "urls": [{
          "url": "https://d25e7022.ngrok.io:8080",
          "locale": "en-us"
        }],
        "name": "hello_world_environment",
        "uid": "bltfa6dc32e6e6c9143",
        "created_by": "blt32ff08a259f3bff6",
        "updated_by": "blt32ff08a259f3bff6",
        "created_at": "2018-11-21T12:55:55.040Z",
        "updated_at": "2018-11-22T06:44:07.910Z",
        "_version": 4
      },
      "action": "publish",
      "status": "success",
      "locale": "en-us",
      "entry": {
        "title": "Header Title",
        "logo": {
          "image": {
            "uid": "blt24d8fd1c5c4842a0",
            "created_at": "2018-11-22T06:33:43.795Z",
            "updated_at": "2018-11-22T06:33:43.795Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/png",
            "file_size": "48052",
            "filename": "atlassian-slack-img.png",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt24d8fd1c5c4842a0/5bf64dc7c118e4b521d80a69/atlassian-slack-img.png",
            "is_dir": false,
            "_version": 1,
            "title": "atlassian-slack-img.png",
            "publish_details": {
              "environment": "bltfa6dc32e6e6c9143",
              "locale": "en-us",
              "time": "2018-11-26T12:18:28.408Z",
              "user": "blt32ff08a259f3bff6"
            }
          },
          "color_image": {
            "uid": "blt222ec872b9d06a92",
            "created_at": "2018-11-26T12:24:17.685Z",
            "updated_at": "2018-11-26T12:24:17.685Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/jpeg",
            "file_size": "49694",
            "filename": "18j219f0203kpjpg.jpg",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt222ec872b9d06a92/5bfbe5f18a4bdd8f0b149eae/18j219f0203kpjpg.jpg",
            "is_dir": false,
            "_version": 1,
            "title": "18j219f0203kpjpg.jpg",
            "publish_details": {
              "environment": "bltfa6dc32e6e6c9143",
              "locale": "en-us",
              "time": "2018-11-26T12:24:44.572Z",
              "user": "blt32ff08a259f3bff6"
            }
          },
          "link": {
            "title": "hello there",
            "href": "https://i.ytimg.com/vi/MpF4g0mGB3Q/hqdefault.jpg"
          }
        },
        "navigation_section": {
          "navigation_bar": [{
            "title": "Group Entry 1",
            "link": "www.google.com",
            "sub_navigation": [{
              "title": "Sub entry",
              "link": "https://www.built.io"
            }]
          }]
        },
        "cta": [{
          "title": "CTA",
          "link": "www.cta.com",
          "open_in_new_tab": true
        }],
        "tags": [
          "tag1",
          "tag2",
          "tag3",
          "tag4",
          "tag5"
        ],
        "locale": "en-us",
        "uid": "blt95ab8678308bc281",
        "created_by": "blt32ff08a259f3bff6",
        "updated_by": "blt32ff08a259f3bff6",
        "created_at": "2018-11-22T06:34:43.582Z",
        "updated_at": "2018-11-26T12:24:41.394Z",
        "_version": 4,
        "publish_details": {
          "environment": "bltfa6dc32e6e6c9143",
          "locale": "en-us",
          "time": "2018-11-26T12:24:44.577Z",
          "user": "blt32ff08a259f3bff6"
        }
      },
      "content_type": {
        "created_at": "2018-11-22T06:23:02.301Z",
        "created_by": "blt32ff08a259f3bff6",
        "updated_at": "2018-11-22T06:23:02.301Z",
        "updated_by": "blt32ff08a259f3bff6",
        "title": "Header",
        "uid": "header",
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
            "multiple": false,
            "indexed": false,
            "inbuilt_model": false
          },
          {
            "data_type": "group",
            "display_name": "Logo",
            "field_metadata": {
              "ref_multiple": false
            },
            "uid": "logo",
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "data_type": "file",
                "display_name": "Image",
                "uid": "image",
                "field_metadata": {
                  "image": true,
                  "rich_text_type": "standard",
                  "ref_multiple": false,
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "indexed": false,
                "inbuilt_model": false
              },
              {
                "display_name": "Color Image",
                "uid": "color_image",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "indexed": false,
                "inbuilt_model": false
              },
              {
                "data_type": "link",
                "display_name": "Link",
                "uid": "link",
                "field_metadata": {},
                "unique": false,
                "mandatory": false,
                "multiple": false,
                "indexed": false,
                "inbuilt_model": false
              }
            ],
            "indexed": false,
            "inbuilt_model": false
          },
          {
            "data_type": "group",
            "display_name": "Navigation Section",
            "field_metadata": {
              "ref_multiple": false
            },
            "uid": "navigation_section",
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
              "data_type": "group",
              "display_name": "Navigation Bar",
              "field_metadata": {
                "ref_multiple": false
              },
              "uid": "navigation_bar",
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
                  "multiple": false,
                  "indexed": false,
                  "inbuilt_model": false
                },
                {
                  "data_type": "text",
                  "display_name": "Link",
                  "uid": "link",
                  "field_metadata": {
                    "version": 3
                  },
                  "unique": false,
                  "mandatory": false,
                  "multiple": false,
                  "indexed": false,
                  "inbuilt_model": false
                },
                {
                  "display_name": "Sub Navigation",
                  "uid": "sub_navigation",
                  "data_type": "group",
                  "field_metadata": {
                    "ref_multiple": false,
                    "rich_text_type": "standard",
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
                      "multiple": false,
                      "indexed": false,
                      "inbuilt_model": false
                    },
                    {
                      "display_name": "Link",
                      "uid": "link",
                      "data_type": "text",
                      "field_metadata": {
                        "ref_multiple": false,
                        "rich_text_type": "standard",
                        "version": 3
                      },
                      "unique": false,
                      "mandatory": false,
                      "multiple": false,
                      "indexed": false,
                      "inbuilt_model": false
                    }
                  ],
                  "indexed": false,
                  "inbuilt_model": false
                }
              ],
              "indexed": false,
              "inbuilt_model": false
            }],
            "indexed": false,
            "inbuilt_model": false
          },
          {
            "display_name": "CTA",
            "uid": "cta",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
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
                "multiple": false,
                "indexed": false,
                "inbuilt_model": false
              },
              {
                "display_name": "Link",
                "uid": "link",
                "data_type": "text",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false,
                "indexed": false,
                "inbuilt_model": false
              },
              {
                "display_name": "Open in New Tab",
                "uid": "open_in_new_tab",
                "data_type": "boolean",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                },
                "unique": false,
                "multiple": false,
                "mandatory": false,
                "indexed": false,
                "inbuilt_model": false
              }
            ],
            "indexed": false,
            "inbuilt_model": false
          }
        ],
        "options": {
          "singleton": true,
          "_version": 1,
          "title": "title",
          "is_page": false
        }
      }
    },
    "event": "publish",
    "triggered_at": "2018-11-26T12:24:44.774Z"
  }, // output of trigger data

  mock_input: {
    stack_api_key: "blt1e0db6b63b504d46"
  },

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.

    // your code goes here

    payload = Object.assign({
      event_type: "Entry Published"
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
            let channels = await commons.getChannels(input, "publish")


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
              return output(channels, null)
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
