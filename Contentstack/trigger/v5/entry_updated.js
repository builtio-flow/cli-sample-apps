const request = require("request")
const commons = require("../../commons")

module.exports = {

  name: "entry_updated",

  label: "Entry Updated",

  version: "v5",

  input: {
    type: "object",
    title: "Entry Updated",
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
        enum: ["entry_updated"]
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
    "entry_updated": {
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
                "banner": {
                  "title": "banner",
                  "type": "array",
                  "displayTitle": "Data Entry Banner",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "title": "title",
                        "type": "string",
                        "displayTitle": "Data Entry Banner Title"
                      },
                      "description": {
                        "title": "description",
                        "type": "string",
                        "displayTitle": "Data Entry Banner Description"
                      },
                      "cta": {
                        "title": "cta",
                        "type": "object",
                        "displayTitle": "Data Entry Banner Cta",
                        "properties": {
                          "link": {
                            "title": "link",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Cta Link"
                          },
                          "open_in_new_tab": {
                            "title": "open_in_new_tab",
                            "type": "boolean",
                            "displayTitle": "Data Entry Banner Cta Open In New Tab"
                          }
                        }
                      },
                      "banner_img": {
                        "title": "banner_img",
                        "type": "object",
                        "displayTitle": "Data Entry Banner Banner Img",
                        "properties": {
                          "uid": {
                            "title": "uid",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img UID"
                          },
                          "created_at": {
                            "title": "created_at",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Created At"
                          },
                          "updated_at": {
                            "title": "updated_at",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Updated At"
                          },
                          "created_by": {
                            "title": "created_by",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Created By"
                          },
                          "updated_by": {
                            "title": "updated_by",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Updated By"
                          },
                          "content_type": {
                            "title": "content_type",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Content Type"
                          },
                          "file_size": {
                            "title": "file_size",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img File Size"
                          },
                          "tags": {
                            "title": "tags",
                            "type": "array",
                            "displayTitle": "Data Entry Banner Banner Img Tags",
                            "items": {
                              "type": "any"
                            }
                          },
                          "filename": {
                            "title": "filename",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Filename"
                          },
                          "url": {
                            "title": "url",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img URL"
                          },
                          "ACL": {
                            "title": "ACL",
                            "type": "array",
                            "displayTitle": "Data Entry Banner Banner Img Acl",
                            "items": {
                              "type": "any"
                            }
                          },
                          "is_dir": {
                            "title": "is_dir",
                            "type": "boolean",
                            "displayTitle": "Data Entry Banner Banner Img Is Dir"
                          },
                          "_version": {
                            "title": "_version",
                            "type": "number",
                            "displayTitle": "Data Entry Banner Banner Img  Version"
                          },
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Banner Banner Img Title"
                          }
                        }
                      }
                    }
                  }
                },
                "right_sources": {
                  "title": "right_sources",
                  "type": "object",
                  "displayTitle": "Data Entry Right Sources",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry Right Sources Content"
                    },
                    "image": {
                      "title": "image",
                      "type": "object",
                      "displayTitle": "Data Entry Right Sources Image",
                      "properties": {
                        "uid": {
                          "title": "uid",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image UID"
                        },
                        "created_at": {
                          "title": "created_at",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Created At"
                        },
                        "updated_at": {
                          "title": "updated_at",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Updated At"
                        },
                        "created_by": {
                          "title": "created_by",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Created By"
                        },
                        "updated_by": {
                          "title": "updated_by",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Updated By"
                        },
                        "content_type": {
                          "title": "content_type",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Content Type"
                        },
                        "file_size": {
                          "title": "file_size",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image File Size"
                        },
                        "tags": {
                          "title": "tags",
                          "type": "array",
                          "displayTitle": "Data Entry Right Sources Image Tags",
                          "items": {
                            "type": "any"
                          }
                        },
                        "filename": {
                          "title": "filename",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Filename"
                        },
                        "url": {
                          "title": "url",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image URL"
                        },
                        "ACL": {
                          "title": "ACL",
                          "type": "array",
                          "displayTitle": "Data Entry Right Sources Image Acl",
                          "items": {
                            "type": "any"
                          }
                        },
                        "is_dir": {
                          "title": "is_dir",
                          "type": "boolean",
                          "displayTitle": "Data Entry Right Sources Image Is Dir"
                        },
                        "parent_uid": {
                          "title": "parent_uid",
                          "type": "any",
                          "displayTitle": "Data Entry Right Sources Image Parent UID"
                        },
                        "_version": {
                          "title": "_version",
                          "type": "number",
                          "displayTitle": "Data Entry Right Sources Image  Version"
                        },
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Right Sources Image Title"
                        }
                      }
                    },
                    "right_sources_content": {
                      "title": "right_sources_content",
                      "type": "array",
                      "displayTitle": "Data Entry Right Sources Right Sources Content",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Right Sources Right Sources Content Title"
                          },
                          "description": {
                            "title": "description",
                            "type": "string",
                            "displayTitle": "Data Entry Right Sources Right Sources Content Description"
                          }
                        }
                      }
                    }
                  }
                },
                "real_data": {
                  "title": "real_data",
                  "type": "object",
                  "displayTitle": "Data Entry Real Data",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry Real Data Content"
                    },
                    "image": {
                      "title": "image",
                      "type": "object",
                      "displayTitle": "Data Entry Real Data Image",
                      "properties": {
                        "uid": {
                          "title": "uid",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image UID"
                        },
                        "created_at": {
                          "title": "created_at",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Created At"
                        },
                        "updated_at": {
                          "title": "updated_at",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Updated At"
                        },
                        "created_by": {
                          "title": "created_by",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Created By"
                        },
                        "updated_by": {
                          "title": "updated_by",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Updated By"
                        },
                        "content_type": {
                          "title": "content_type",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Content Type"
                        },
                        "file_size": {
                          "title": "file_size",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image File Size"
                        },
                        "tags": {
                          "title": "tags",
                          "type": "array",
                          "displayTitle": "Data Entry Real Data Image Tags",
                          "items": {
                            "type": "any"
                          }
                        },
                        "filename": {
                          "title": "filename",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Filename"
                        },
                        "url": {
                          "title": "url",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image URL"
                        },
                        "ACL": {
                          "title": "ACL",
                          "type": "array",
                          "displayTitle": "Data Entry Real Data Image Acl",
                          "items": {
                            "type": "any"
                          }
                        },
                        "is_dir": {
                          "title": "is_dir",
                          "type": "boolean",
                          "displayTitle": "Data Entry Real Data Image Is Dir"
                        },
                        "parent_uid": {
                          "title": "parent_uid",
                          "type": "any",
                          "displayTitle": "Data Entry Real Data Image Parent UID"
                        },
                        "_version": {
                          "title": "_version",
                          "type": "number",
                          "displayTitle": "Data Entry Real Data Image  Version"
                        },
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Real Data Image Title"
                        }
                      }
                    },
                    "real_data_content": {
                      "title": "real_data_content",
                      "type": "array",
                      "displayTitle": "Data Entry Real Data Real Data Content",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Real Data Real Data Content Title"
                          },
                          "description": {
                            "title": "description",
                            "type": "string",
                            "displayTitle": "Data Entry Real Data Real Data Content Description"
                          }
                        }
                      }
                    }
                  }
                },
                "see_it_in_action": {
                  "title": "see_it_in_action",
                  "type": "object",
                  "displayTitle": "Data Entry See It In Action",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry See It In Action Content"
                    },
                    "cta": {
                      "title": "cta",
                      "type": "object",
                      "displayTitle": "Data Entry See It In Action Cta",
                      "properties": {
                        "tilte": {
                          "title": "tilte",
                          "type": "string",
                          "displayTitle": "Data Entry See It In Action Cta Tilte"
                        },
                        "link": {
                          "title": "link",
                          "type": "string",
                          "displayTitle": "Data Entry See It In Action Cta Link"
                        },
                        "open_in_new_tab": {
                          "title": "open_in_new_tab",
                          "type": "boolean",
                          "displayTitle": "Data Entry See It In Action Cta Open In New Tab"
                        }
                      }
                    }
                  }
                },
                "process_communication": {
                  "title": "process_communication",
                  "type": "object",
                  "displayTitle": "Data Entry Process Communication",
                  "properties": {
                    "head_content": {
                      "title": "head_content",
                      "type": "string",
                      "displayTitle": "Data Entry Process Communication Head Content"
                    },
                    "image": {
                      "title": "image",
                      "type": "object",
                      "displayTitle": "Data Entry Process Communication Image",
                      "properties": {
                        "uid": {
                          "title": "uid",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image UID"
                        },
                        "created_at": {
                          "title": "created_at",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Created At"
                        },
                        "updated_at": {
                          "title": "updated_at",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Updated At"
                        },
                        "created_by": {
                          "title": "created_by",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Created By"
                        },
                        "updated_by": {
                          "title": "updated_by",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Updated By"
                        },
                        "content_type": {
                          "title": "content_type",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Content Type"
                        },
                        "file_size": {
                          "title": "file_size",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image File Size"
                        },
                        "tags": {
                          "title": "tags",
                          "type": "array",
                          "displayTitle": "Data Entry Process Communication Image Tags",
                          "items": {
                            "type": "any"
                          }
                        },
                        "filename": {
                          "title": "filename",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Filename"
                        },
                        "url": {
                          "title": "url",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image URL"
                        },
                        "ACL": {
                          "title": "ACL",
                          "type": "array",
                          "displayTitle": "Data Entry Process Communication Image Acl",
                          "items": {
                            "type": "any"
                          }
                        },
                        "is_dir": {
                          "title": "is_dir",
                          "type": "boolean",
                          "displayTitle": "Data Entry Process Communication Image Is Dir"
                        },
                        "_version": {
                          "title": "_version",
                          "type": "number",
                          "displayTitle": "Data Entry Process Communication Image  Version"
                        },
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Process Communication Image Title"
                        }
                      }
                    },
                    "process_content": {
                      "title": "process_content",
                      "type": "array",
                      "displayTitle": "Data Entry Process Communication Process Content",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Process Communication Process Content Title"
                          },
                          "description": {
                            "title": "description",
                            "type": "string",
                            "displayTitle": "Data Entry Process Communication Process Content Description"
                          }
                        }
                      }
                    }
                  }
                },
                "products": {
                  "title": "products",
                  "type": "object",
                  "displayTitle": "Data Entry Products",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry Products Content"
                    },
                    "plans": {
                      "title": "plans",
                      "type": "array",
                      "displayTitle": "Data Entry Products Plans",
                      "items": {
                        "type": "object",
                        "properties": {
                          "title": {
                            "title": "title",
                            "type": "string",
                            "displayTitle": "Data Entry Products Plans Title"
                          },
                          "amount": {
                            "title": "amount",
                            "type": "string",
                            "displayTitle": "Data Entry Products Plans Amount"
                          },
                          "label": {
                            "title": "label",
                            "type": "string",
                            "displayTitle": "Data Entry Products Plans Label"
                          },
                          "features": {
                            "title": "features",
                            "type": "string",
                            "displayTitle": "Data Entry Products Plans Features"
                          },
                          "image": {
                            "title": "image",
                            "type": "object",
                            "displayTitle": "Data Entry Products Plans Image",
                            "properties": {
                              "uid": {
                                "title": "uid",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image UID"
                              },
                              "created_at": {
                                "title": "created_at",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Created At"
                              },
                              "updated_at": {
                                "title": "updated_at",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Updated At"
                              },
                              "created_by": {
                                "title": "created_by",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Created By"
                              },
                              "updated_by": {
                                "title": "updated_by",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Updated By"
                              },
                              "content_type": {
                                "title": "content_type",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Content Type"
                              },
                              "file_size": {
                                "title": "file_size",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image File Size"
                              },
                              "tags": {
                                "title": "tags",
                                "type": "array",
                                "displayTitle": "Data Entry Products Plans Image Tags",
                                "items": {
                                  "type": "any"
                                }
                              },
                              "filename": {
                                "title": "filename",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Filename"
                              },
                              "url": {
                                "title": "url",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image URL"
                              },
                              "ACL": {
                                "title": "ACL",
                                "type": "array",
                                "displayTitle": "Data Entry Products Plans Image Acl",
                                "items": {
                                  "type": "any"
                                }
                              },
                              "is_dir": {
                                "title": "is_dir",
                                "type": "boolean",
                                "displayTitle": "Data Entry Products Plans Image Is Dir"
                              },
                              "parent_uid": {
                                "title": "parent_uid",
                                "type": "any",
                                "displayTitle": "Data Entry Products Plans Image Parent UID"
                              },
                              "_version": {
                                "title": "_version",
                                "type": "number",
                                "displayTitle": "Data Entry Products Plans Image  Version"
                              },
                              "title": {
                                "title": "title",
                                "type": "string",
                                "displayTitle": "Data Entry Products Plans Image Title"
                              }
                            }
                          }
                        }
                      }
                    },
                    "cta": {
                      "title": "cta",
                      "type": "object",
                      "displayTitle": "Data Entry Products Cta",
                      "properties": {
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Products Cta Title"
                        },
                        "link": {
                          "title": "link",
                          "type": "string",
                          "displayTitle": "Data Entry Products Cta Link"
                        },
                        "open_in_new_tab": {
                          "title": "open_in_new_tab",
                          "type": "boolean",
                          "displayTitle": "Data Entry Products Cta Open In New Tab"
                        }
                      }
                    }
                  }
                },
                "try_now": {
                  "title": "try_now",
                  "type": "object",
                  "displayTitle": "Data Entry Try Now",
                  "properties": {
                    "content": {
                      "title": "content",
                      "type": "string",
                      "displayTitle": "Data Entry Try Now Content"
                    },
                    "cta": {
                      "title": "cta",
                      "type": "object",
                      "displayTitle": "Data Entry Try Now Cta",
                      "properties": {
                        "title": {
                          "title": "title",
                          "type": "string",
                          "displayTitle": "Data Entry Try Now Cta Title"
                        },
                        "link": {
                          "title": "link",
                          "type": "string",
                          "displayTitle": "Data Entry Try Now Cta Link"
                        },
                        "open_in_new_tab": {
                          "title": "open_in_new_tab",
                          "type": "boolean",
                          "displayTitle": "Data Entry Try Now Cta Open In New Tab"
                        }
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
                            "schema": {
                              "title": "schema",
                              "type": "array",
                              "displayTitle": "Data Content Type Schema Schema Schema",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "display_name": {
                                    "title": "display_name",
                                    "type": "string",
                                    "displayTitle": "Data Content Type Schema Schema Schema Display Name"
                                  },
                                  "uid": {
                                    "title": "uid",
                                    "type": "string",
                                    "displayTitle": "Data Content Type Schema Schema Schema UID"
                                  },
                                  "data_type": {
                                    "title": "data_type",
                                    "type": "string",
                                    "displayTitle": "Data Content Type Schema Schema Schema Data Type"
                                  },
                                  "field_metadata": {
                                    "title": "field_metadata",
                                    "type": "object",
                                    "displayTitle": "Data Content Type Schema Schema Schema Field Metadata",
                                    "properties": {
                                      "ref_multiple": {
                                        "title": "ref_multiple",
                                        "type": "boolean",
                                        "displayTitle": "Data Content Type Schema Schema Schema Field Metadata Ref Multiple"
                                      },
                                      "rich_text_type": {
                                        "title": "rich_text_type",
                                        "type": "string",
                                        "displayTitle": "Data Content Type Schema Schema Schema Field Metadata Rich Text Type"
                                      },
                                      "description": {
                                        "title": "description",
                                        "type": "string",
                                        "displayTitle": "Data Content Type Schema Schema Schema Field Metadata Description"
                                      }
                                    }
                                  },
                                  "unique": {
                                    "title": "unique",
                                    "type": "boolean",
                                    "displayTitle": "Data Content Type Schema Schema Schema Unique"
                                  },
                                  "mandatory": {
                                    "title": "mandatory",
                                    "type": "boolean",
                                    "displayTitle": "Data Content Type Schema Schema Schema Mandatory"
                                  },
                                  "multiple": {
                                    "title": "multiple",
                                    "type": "boolean",
                                    "displayTitle": "Data Content Type Schema Schema Schema Multiple"
                                  }
                                }
                              }
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
                    "url_pattern": {
                      "title": "url_pattern",
                      "type": "string",
                      "displayTitle": "Data Content Type Options URL Pattern"
                    },
                    "url_prefix": {
                      "title": "url_prefix",
                      "type": "string",
                      "displayTitle": "Data Content Type Options URL Prefix"
                    },
                    "_version": {
                      "title": "_version",
                      "type": "number",
                      "displayTitle": "Data Content Type Options  Version"
                    },
                    "is_page": {
                      "title": "is_page",
                      "type": "boolean",
                      "displayTitle": "Data Content Type Options Is Page"
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
    "event_type": "Entry Updated",
    "module": "entry",
    "api_key": "blt1e0db6b63b504d46",
    "data": {
      "entry": {
        "title": "Product Title",
        "url": "/product/blt5618ea0561ca7ae3",
        "banner": [{
          "title": "Banner title",
          "description": "<p>banner desc</p>",
          "cta": {
            "link": "https://www.google.com",
            "open_in_new_tab": true
          },
          "banner_img": {
            "uid": "blt24d8fd1c5c4842a0",
            "created_at": "2018-11-22T06:33:43.795Z",
            "updated_at": "2018-11-22T06:33:43.795Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/png",
            "file_size": "48052",
            "tags": ["t1", "t2", "t3"],
            "filename": "atlassian-slack-img.png",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt24d8fd1c5c4842a0/5bf64dc7c118e4b521d80a69/atlassian-slack-img.png",
            "is_dir": false,
            "_version": 1,
            "title": "atlassian-slack-img.png"
          }
        }],
        "right_sources": {
          "content": "<p>Content window</p>",
          "image": {
            "uid": "blt222ec872b9d06a92",
            "created_at": "2018-11-26T12:24:17.685Z",
            "updated_at": "2018-11-26T12:24:17.685Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/jpeg",
            "file_size": "49694",
            "tags": ["t1", "t2", "t3"],
            "filename": "18j219f0203kpjpg.jpg",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt222ec872b9d06a92/5bfbe5f18a4bdd8f0b149eae/18j219f0203kpjpg.jpg",
            "is_dir": false,
            "_version": 1,
            "title": "18j219f0203kpjpg.jpg"
          },
          "right_sources_content": [{
            "title": "Right Sources Content Title",
            "description": "Right Sources Content Description"
          }]
        },
        "real_data": {
          "content": "<p>Content</p>",
          "image": {
            "uid": "blt222ec872b9d06a92",
            "created_at": "2018-11-26T12:24:17.685Z",
            "updated_at": "2018-11-26T12:24:17.685Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/jpeg",
            "file_size": "49694",
            "tags": ["t1", "t2", "t3"],
            "filename": "18j219f0203kpjpg.jpg",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt222ec872b9d06a92/5bfbe5f18a4bdd8f0b149eae/18j219f0203kpjpg.jpg",
            "is_dir": false,
            "_version": 1,
            "title": "18j219f0203kpjpg.jpg"
          },
          "real_data_content": [{
            "title": "Real Data Content Title",
            "description": "Real Data Content Description"
          }]
        },
        "see_it_in_action": {
          "content": "Content",
          "cta": {
            "tilte": "CTA Title",
            "link": "https://www.google.com",
            "open_in_new_tab": true
          }
        },
        "process_communication": {
          "head_content": "<p>Head Content description</p>",
          "image": {
            "uid": "bltf1a3e37ef63f9346",
            "created_at": "2018-11-27T12:19:00.128Z",
            "updated_at": "2018-11-27T12:19:00.128Z",
            "created_by": "blt32ff08a259f3bff6",
            "updated_by": "blt32ff08a259f3bff6",
            "content_type": "image/png",
            "file_size": "3355",
            "tags": ["t1", "t2", "t3"],
            "filename": "WebexTeams_Icon_only.png",
            "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/bltf1a3e37ef63f9346/5bfd363493bf10990ba266ac/WebexTeams_Icon_only.png",
            "is_dir": false,
            "_version": 1,
            "title": "WebexTeams_Icon_only.png"
          },
          "process_content": [{
            "title": "Process Content Title",
            "description": "Process Content Description"
          }]
        },
        "products": {
          "content": "<p>Products Content</p>",
          "plans": [{
            "title": "Plans Title",
            "amount": "<p>Amount desc</p>",
            "label": "Label desc",
            "features": "<p>Features desc</p>",
            "image": {
              "uid": "blt222ec872b9d06a92",
              "created_at": "2018-11-26T12:24:17.685Z",
              "updated_at": "2018-11-26T12:24:17.685Z",
              "created_by": "blt32ff08a259f3bff6",
              "updated_by": "blt32ff08a259f3bff6",
              "content_type": "image/jpeg",
              "file_size": "49694",
              "tags": ["t1", "t2", "t3"],
              "filename": "18j219f0203kpjpg.jpg",
              "url": "https://images.contentstack.io/v3/assets/blt1e0db6b63b504d46/blt222ec872b9d06a92/5bfbe5f18a4bdd8f0b149eae/18j219f0203kpjpg.jpg",
              "is_dir": false,
              "_version": 1,
              "title": "18j219f0203kpjpg.jpg"
            }
          }],
          "cta": {
            "title": "CTA Title",
            "link": "https://www.built.io",
            "open_in_new_tab": true
          }
        },
        "try_now": {
          "content": "<p><em>Content description</em></p>",
          "cta": {
            "title": "CTA Title",
            "link": "https://www.google.com",
            "open_in_new_tab": true
          }
        },
        "tags": [
          "tag1",
          "tag2",
          "tag3",
          "tag4",
          "tag5"
        ],
        "locale": "en-us",
        "uid": "blt5618ea0561ca7ae3",
        "created_by": "blt32ff08a259f3bff6",
        "updated_by": "blt32ff08a259f3bff6",
        "created_at": "2018-11-22T10:30:19.482Z",
        "updated_at": "2018-11-27T12:24:06.865Z",
        "_version": 4
      },
      "content_type": {
        "created_at": "2018-11-22T06:23:13.149Z",
        "created_by": "blt32ff08a259f3bff6",
        "updated_at": "2018-11-22T06:23:13.149Z",
        "updated_by": "blt32ff08a259f3bff6",
        "title": "Products",
        "uid": "product",
        "description": "desc example",
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
            "mandatory": false,
            "multiple": false
          },
          {
            "display_name": "Banner",
            "uid": "banner",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
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
                "display_name": "Description",
                "uid": "description",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "multiline": false,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "CTA",
                "uid": "cta",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "schema": [{
                    "display_name": "Link",
                    "uid": "link",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
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
                      "description": "desc example"
                    },
                    "unique": false,
                    "multiple": false,
                    "mandatory": false
                  }
                ]
              },
              {
                "display_name": "banner-img",
                "uid": "banner_img",
                "data_type": "file",
                "field_metadata": {
                  "image": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              }
            ]
          },
          {
            "display_name": "Right Sources",
            "uid": "right_sources",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
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
                  "description": "desc example",
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
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "Right Sources Content",
                "uid": "right_sources_content",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
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
                    "display_name": "Description",
                    "uid": "description",
                    "data_type": "text",
                    "field_metadata": {
                      "multiline": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  }
                ]
              }
            ]
          },
          {
            "display_name": "Real Data",
            "uid": "real_data",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
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
                  "description": "desc example",
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
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "Real Data content",
                "uid": "real_data_content",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
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
                    "display_name": "Description",
                    "uid": "description",
                    "data_type": "text",
                    "field_metadata": {
                      "multiline": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  }
                ]
              }
            ]
          },
          {
            "display_name": "See it in Action",
            "uid": "see_it_in_action",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
            },
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "display_name": "Content",
                "uid": "content",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": false,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "CTA",
                "uid": "cta",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "schema": [{
                    "display_name": "Tilte",
                    "uid": "tilte",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
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
                      "description": "desc example",
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
                      "description": "desc example"
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
            "display_name": "Process Communication",
            "uid": "process_communication",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
            },
            "mandatory": false,
            "multiple": false,
            "unique": false,
            "schema": [{
                "display_name": "Head Content",
                "uid": "head_content",
                "data_type": "text",
                "field_metadata": {
                  "allow_rich_text": true,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example",
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
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false
              },
              {
                "display_name": "Process Content",
                "uid": "process_content",
                "data_type": "group",
                "field_metadata": {
                  "multiline": false,
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
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
                    "display_name": "Description",
                    "uid": "description",
                    "data_type": "text",
                    "field_metadata": {
                      "multiline": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  }
                ]
              }
            ]
          },
          {
            "display_name": "Products",
            "uid": "products",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
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
                  "description": "desc example",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "CTA",
                "uid": "cta",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "schema": [{
                    "display_name": "Title",
                    "uid": "title",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
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
                      "description": "desc example",
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
                      "description": "desc example"
                    },
                    "unique": false,
                    "multiple": false,
                    "mandatory": false
                  }
                ]
              },
              {
                "display_name": "Plans",
                "uid": "plans",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
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
                    "data_type": "text",
                    "display_name": "Amount",
                    "uid": "amount",
                    "field_metadata": {
                      "rich_text_type": "advanced",
                      "ref_multiple": false,
                      "multiline": false,
                      "description": "desc example",
                      "allow_rich_text": true,
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "Label",
                    "uid": "label",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "Features",
                    "uid": "features",
                    "data_type": "text",
                    "field_metadata": {
                      "allow_rich_text": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "image",
                    "uid": "image",
                    "data_type": "file",
                    "field_metadata": {
                      "image": true,
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example"
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
            "display_name": "Try Now",
            "uid": "try_now",
            "data_type": "group",
            "field_metadata": {
              "ref_multiple": false,
              "rich_text_type": "standard",
              "description": "desc example"
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
                  "description": "desc example",
                  "version": 3
                },
                "unique": false,
                "mandatory": false,
                "multiple": false
              },
              {
                "display_name": "CTA",
                "uid": "cta",
                "data_type": "group",
                "field_metadata": {
                  "ref_multiple": false,
                  "rich_text_type": "standard",
                  "description": "desc example"
                },
                "mandatory": false,
                "multiple": false,
                "unique": false,
                "schema": [{
                    "display_name": "Title",
                    "uid": "title",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
                      "version": 3
                    },
                    "unique": false,
                    "mandatory": false,
                    "multiple": false
                  },
                  {
                    "display_name": "link",
                    "uid": "link",
                    "data_type": "text",
                    "field_metadata": {
                      "ref_multiple": false,
                      "rich_text_type": "standard",
                      "description": "desc example",
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
                      "description": "desc example"
                    },
                    "unique": false,
                    "multiple": false,
                    "mandatory": false
                  }
                ]
              }
            ]
          }
        ],
        "options": {
          "singleton": false,
          "url_pattern": "/:unique_id",
          "url_prefix": "/product/",
          "_version": 1,
          "is_page": true,
          "title": "title"
        }
      }
    },
    "event": "update",
    "triggered_at": "2018-11-27T12:24:07.069Z"
  }, // output of trigger data

  mock_input: {},

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.

    // your code goes here

    payload = Object.assign({
      event_type: "Entry Updated"
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
            let channels = await commons.getChannels(input, "update")


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