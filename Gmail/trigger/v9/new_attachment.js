var google = require("googleapis")
var comm = require("./common")
google = google.google
var _ = require("lodash")

module.exports = {

  name: "new_attachment",

  label: "New Attachment",

  version: "v9",

  input: {
    type: "object",
    title: "New Attachment",
    description: "Short description",
    properties: {
      "search": {
        "type": "string",
        "title": "Search Text",
        "propertyOrder": 2,
        "description": "Enter the text by which you want to search a specific email. E.g., from:john or from:maya or subject:Christmas. Click <a href='https://support.google.com/mail/answer/7190?hl=en' target='blank'>here</a> to know more about search queries."
      },
      "label": {
        "type": "string",
        "title": "Label Type",
        "propertyOrder": 3,
        "description": "Select the name of the label on which you want to set a trigger. E.g., If you select the label type as ‘Trash’, the trigger will execute each time a new mail is moved to the label named ‘Trash’ in your Gmail account."
      },

      event: {
        type: "string",
        enum: ["new_attachment"],
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
    "new_attachment": {
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
        "threadId": {
          "title": "threadId",
          "type": "string",
          "displayTitle": "Threadid"
        },
        "labels": {
          "title": "labels",
          "type": "array",
          "displayTitle": "labels",
          "items": {
            "type": "string"
          }
        },
        "snippet": {
          "title": "snippet",
          "type": "string",
          "displayTitle": "Snippet"
        },
        "historyId": {
          "title": "historyId",
          "type": "string",
          "displayTitle": "Historyid"
        },
        "internalDate": {
          "title": "internalDate",
          "type": "string",
          "displayTitle": "Internaldate"
        },
        "payload": {
          "title": "payload",
          "type": "object",
          "displayTitle": "Payload",
          "properties": {
            "partId": {
              "title": "partId",
              "type": "string",
              "displayTitle": "Payload Partid"
            },
            "mimeType": {
              "title": "mimeType",
              "type": "string",
              "displayTitle": "Payload Mimetype"
            },
            "filename": {
              "title": "filename",
              "type": "string",
              "displayTitle": "Payload Filename"
            },
            "Delivered-To": {
              "title": "Delivered-To",
              "type": "string",
              "displayTitle": "Payload Delivered-to"
            },
            "Received": {
              "title": "Received",
              "type": "string",
              "displayTitle": "Payload Received"
            },
            "X-Received": {
              "title": "X-Received",
              "type": "string",
              "displayTitle": "Payload X-received"
            },
            "ARC-Seal": {
              "title": "ARC-Seal",
              "type": "string",
              "displayTitle": "Payload Arc-seal"
            },
            "ARC-Message-Signature": {
              "title": "ARC-Message-Signature",
              "type": "string",
              "displayTitle": "Payload Arc-message-signature"
            },
            "ARC-Authentication-Results": {
              "title": "ARC-Authentication-Results",
              "type": "string",
              "displayTitle": "Payload Arc-authentication-results"
            },
            "Return-Path": {
              "title": "Return-Path",
              "type": "string",
              "displayTitle": "Payload Return-path"
            },
            "Received-SPF": {
              "title": "Received-SPF",
              "type": "string",
              "displayTitle": "Payload Received-spf"
            },
            "Authentication-Results": {
              "title": "Authentication-Results",
              "type": "string",
              "displayTitle": "Payload Authentication-results"
            },
            "DKIM-Signature": {
              "title": "DKIM-Signature",
              "type": "string",
              "displayTitle": "Payload Dkim-signature"
            },
            "X-Google-DKIM-Signature": {
              "title": "X-Google-DKIM-Signature",
              "type": "string",
              "displayTitle": "Payload X-google-dkim-signature"
            },
            "X-Gm-Message-State": {
              "title": "X-Gm-Message-State",
              "type": "string",
              "displayTitle": "Payload X-gm-message-state"
            },
            "X-Google-Smtp-Source": {
              "title": "X-Google-Smtp-Source",
              "type": "string",
              "displayTitle": "Payload X-google-smtp-source"
            },
            "MIME-Version": {
              "title": "MIME-Version",
              "type": "string",
              "displayTitle": "Payload Mime-version"
            },
            "References": {
              "title": "References",
              "type": "string",
              "displayTitle": "Payload References"
            },
            "In-Reply-To": {
              "title": "In-Reply-To",
              "type": "string",
              "displayTitle": "Payload In-reply-to"
            },
            "From": {
              "title": "From",
              "type": "string",
              "displayTitle": "Payload From"
            },
            "Date": {
              "title": "Date",
              "type": "string",
              "displayTitle": "Payload Date"
            },
            "Message-ID": {
              "title": "Message-ID",
              "type": "string",
              "displayTitle": "Payload Message-id"
            },
            "Subject": {
              "title": "Subject",
              "type": "string",
              "displayTitle": "Payload Subject"
            },
            "To": {
              "title": "To",
              "type": "string",
              "displayTitle": "Payload To"
            },
            "Content-Type": {
              "title": "Content-Type",
              "type": "string",
              "displayTitle": "Payload Content-type"
            }
          }
        },
        "sizeEstimate": {
          "title": "sizeEstimate",
          "type": "number",
          "displayTitle": "Sizeestimate"
        },
        "body_plain_text": {
          "title": "body_plain_text",
          "type": "string",
          "displayTitle": "Body Plain Text"
        },
        "body_html": {
          "title": "body_html",
          "type": "string",
          "displayTitle": "Body HTML"
        },
        "attachment": {
          "title": "attachment",
          "type": "array",
          "displayTitle": "Attachment",
          "items": {
            "type": "object",
            "properties": {
              "mimeType": {
                "title": "mimeType",
                "type": "string",
                "displayTitle": "Attachment Mimetype"
              },
              "filename": {
                "title": "filename",
                "type": "string",
                "displayTitle": "Attachment Filename"
              },
              "attachmentId": {
                "title": "attachmentId",
                "type": "string",
                "displayTitle": "Attachment Attachmentid"
              }
            }
          }
        },
        "email_link": {
          "title": "email_link",
          "type": "string",
          "displayTitle": "Email Link"
        },
      }
    }
  },

  mock_data:{
    "event_type": "New Attachment",
    "user_email": "susan.reynolds@example.com",
    "id": "1670642da72764df",
    "threadId": "166f888c6e996653",
    "labels": [
      "UNREAD",
      "CATEGORY_PERSONAL",
      "INBOX"
    ],
    "snippet": "Hi Peter From:John Doe <John.Doe@example.com> Date: Fri, Nov 9, 2018 at 6:23 PM Subject: Sample test To: Peter <Peter@example.com",
    "historyId": "1866217",
    "internalDate": "2018-12-11T13:58:48.000Z",
    "payload": {
      "partId": "0",
      "mimeType": "multipart/mixed",
      "filename": "shool.png",
      "Delivered-To": "Peter@example.com",
      "Received": "from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])        by mx.google.com with SMTPS id 33sor1220344uab.19.2018.11.11.20.51.43        for <Peter@example.com>        (Google Transport Security);        Sun, 11 Nov 2018 20:51:43 -0800 (PST)",
      "X-Received": "by 2002:ab0:184e:: with SMTP id j14mr8132523uag.10.1541998302349; Sun, 11 Nov 2018 20:51:42 -0800 (PST)",
      "ARC-Seal": "i=1; a=rsa-sha256; t=1541998304; cv=none;        d=google.com; s=arc-20160816;        b=tcPOn7yLfyF/rIEMeYyIY78i7sqUGRX8DLSK+zU/v+XeZ926ZK+ZY+CDgp0Fv6Y+Fg         bV5UkblOpMv8gPVOoHxSiJiL4UvXkhWNmLAldEfXMu9qieybkqd7V/4aebbLTEWjJ8I8         ISCzsgu0M/KHTSNOenQcP5D3Fli/ZoFlk1ucnoHrIyiEZghBU8zPK980F6y+Vqnves4d         yGq3JOoxowmLM3ehCmBggzwfhUHmzMJtFYqj/gj+P1LyLvD/eVnMkUEDI4/YaL7VS1TH         L9GA5W3gGu2jSVAl06VpDbdXNbJYb9ngzpQ5C9utSejLJUoMv4p++fx/csFUbDkSXJ7h         k2yA==",
      "ARC-Message-Signature": "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=to:subject:message-id:date:from:in-reply-to:references:mime-version         :dkim-signature;        bh=a6isAy724U+W7xkmhpLRsJyEyzt2EQK26qXkIFIAOI4=;        b=l2OxSFe3W0hGPBh1riGReQY2SbqpuABYQI4Zh2SjnWY9JIYYcYq0JhD3qCncnSRcJM         90E8Ots1UOgEjUGiUQi7xXw5oH9RummvBVuD4vJ/DeFuyPi9yPIe7tuYGvQpNkGdhobI         VGvl/hUUlOLNoKqo3nPIQfW9UBrv2dbFgVkCtklQYcba14hbHc81raZ7KJNYpBXtEQsa         uk8ZYpq2vHszdaCyiRw+Qp4IHFHFa0J2TznnMON1huhRaT1cWTF/meUfYRry/yfQk46K         2OcoWti+tkhQctOJPsFciZDeWyELM9XeMDRYhiO73wAcAAf8CNfphBpNwb7AJj4eQIjV         BTgQ==",
      "ARC-Authentication-Results": "i=1; mx.google.com;       dkim=pass header.i=@built.io header.s=google header.b=fwhddCtN;       spf=pass (google.com: domain of John.Doe@example.com designates 209.85.220.41 as permitted sender) smtp.mailfrom=John.Doe@example.com",
      "Return-Path": "<John.Doe@example.com>",
      "Received-SPF": "pass (google.com: domain of John.Doe@example.com designates 209.85.220.41 as permitted sender) client-ip=209.85.220.41;",
      "Authentication-Results": "mx.google.com;       dkim=pass header.i=@built.io header.s=google header.b=fwhddCtN;       spf=pass (google.com: domain of John.Doe@example.com designates 209.85.220.41 as permitted sender) smtp.mailfrom=John.Doe@example.com",
      "DKIM-Signature": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=built.io; s=google;     h=mime-version:references:in-reply-to:from:date:message-id:subject:to;        bh=a6isAy724U+W7xkmhpLRsJyEyzt2EQK26qXkIFIAOI4=;        b=fwhddCtNi0aqS/PeoXqF3aHSrkCtyFBxmM8nWMi+lYnCgZDtZk1YtP/F0sxwm2slB/         aJXL/BjaXskbM7u6aUUo0yOdvqPG0BZuOBS681XpX23lHepxt+hKqBos7J0di/e459QB         3WSdjtDR/z9PRy3+tlutWdjCy6aK2qbEKoMzU=",
      "X-Google-DKIM-Signature": "v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20161025;        h=x-gm-message-state:mime-version:references:in-reply-to:from:date         :message-id:subject:to;        bh=a6isAy724U+W7xkmhpLRsJyEyzt2EQK26qXkIFIAOI4=;        b=J4GvwV/YkUwprQ33a2DCXSs66zPb7HhDkFB2Tmj89HmGtlX36Si9qnRstPiYHeLt7k         9gutiUmb/AqIGF3fLKBznBP+AiAw+eH/vnDbghkWNGMXJTUPIvwG9bcgEJp3VG/LUmFt         t4EL7CURpq0StWYvg2fQY7V+ICvfYVDS+UNoXKZPCYConn+OFcR6E2Fvw9OkZacosQSRUINXY37ud+WcBGbYGaHx5UIZtz20bb3mRUt75zkh78i6pUZiAUGMYjX+RdRk+BDS2nWf         9QO+AtIv+gy3/6Nc5TZdMAEHyiL0JNfxpqezI2pxkBn0EEXAiAl67o8KM09jCpManYpa         xt5Q==",
      "X-Gm-Message-State": "AGRZ1gLc50xTMydG2DV8cIcfRdnk16z1CpzpsDALlvjeQsJiiEG2MZb6 cIus1zhboCev7V0XtMK5bpt8+y+L+aRuzaWXXaT08q3P",
      "X-Google-Smtp-Source": "AJdET5fnxP5fe8HhuD8qhlVTD/XPrCtA81jkZKqbNvCzBit/gQAsQvzfZQDtcYWrP2loxRruEAvumjBsSmMxN3rAvAc=",
      "MIME-Version": "1.0",
      "References": "<CAMBLShTsbgrv_-h5hq=krBuirB66KBi5BHqp4MoTKNKHLAKM8A@mail.gmail.com>",
      "In-Reply-To": "<CAMBLShTsbgrv_-h5hq=krBuirB66KBi5BHqp4MoTKNKHLAKM8A@mail.gmail.com>",
      "From": "John Doe <John.Doe@example.com>",
      "Date": "2018-11-12T04:51:30.000Z",
      "Message-ID": "<CAMBLShQSw8NV-hKQ4=KZi+FY11FMUARHLL5Gn2ars==+hHfsHQ@mail.gmail.com>",
      "Subject": "Fwd: sample mail",
      "To": "Peter <Peter@example.com>",
      "Content-Type": "multipart/mixed; boundary=\"0000000000000f61af057a7075c7\""
    },
    "sizeEstimate": 187818,
    "body_plain_text": "This is body",
    "body_html": "<div dir='ltr'><div>This is body<br clear='all'></div><div><br></div></div>",
    "attachment": [
      {
        "mimeType": "text/html",
        "filename": "auth.html",
        "attachmentId": "ANGjdJ8GwTUpe4EMNThbODkfpCrR4J86Ohxo9cmmVl9lT6I2YZopmU7-rDZEFV98haQyE5IPiFeeGRUy0O_rLKeHJbB_70y5URUZPaN2uaTFlpOgpbj1SRWmWJL3oATsP_mG-TQ51yK3RjbSeK1eU7pG_ld1e2um85Lo6xWsNVYBhfz-OQ5HOygZrlKj6sGUbLpLLSE1UQba7w6fliEw6brtAkda1of9_kkgrPE6_-AWVHGDDVVJ9ThAMnJtrUzBgYhypxRbMwRxtFZkxTfBUktRSHTuZRLxp-8K2mpuk3nVImL1Pa3PBfa9DUGALg_6HWqbsI9-8LaV1iCa_BTCAScAfeIhwaj3WtjA7LDS2-hkzZxwuLBAOHjV6TRAkjUxx-NfKJMocADI-RjiuqxT"
      },
      {
        "mimeType": "image/png",
        "filename": "shoo1.jpg",
        "attachmentId": "ANGjdJ8SVatg7bNz5-jmZlu8mwQC61UOyfjVnrAJaAYpyq_t07ynxXj7LYGTIoPrBqlwLdpYTRVpfH2gUimYaeTXqUBXBVi-wkdRxXB_a_RTg1788fjKIncScP_u1EBKQjhdlw4JQaWkjdKXXZC9IwTxdefuVBnsWq30Jpn6J4Wvh2SBiYrqU8h8FhuUqrJuQR6CydiffTV7j6MiZyrF3dETpq7YheWNShp-QcmOlDB9CkJjls6cKhfkNl62PQw7UseCGotDA9W_vy3x_3ZtbC6hY-Oov-1JYOkF94O3_Sn0abIt7Ds6TZpvYTyw_Bjp5xRwOgbS8o-kbnvuFuCzATy3lHkqC2BMNhjNx1CwA-8dI-JLg_8kXrL0lkFA7PlXI-2aixOfa7gMXMZvuVP4"
      },
      {
        "mimeType": "text/html",
        "filename": "auth.html",
        "attachmentId": "ANGjdJ8oZxEp5tEEU5NhikvGL-lTr4ZUVJcuH9kv9Z61_ZM29QQ225gdog_V0JJqT859I58Y5gb4WnSttZywfQUKDVci1AMBDvWfrYMa6qeVhZdmINZQmVaXy0IM7juvsJ4Rjp-ImYWxuWa8MOMu-qwnVEBj8yMWcy7mA-7CT7T799TI9yHqH58zGfVTTwta-PKexbJkfz5YDvRBmWiJgLmTC6UY2Taep0G1SSJqvO_HurjkZ4lRsaHMdsGXum3inMjgCrD15lAOpyArvPIc1LUo9JXTqJz6VQK1ZiHMuOIDJeWV5S_PW5_nXm2gVjRmxOrEf9xyzgo6w05YXGS3AWQtksFyjbY1u8bD-lKIeF0Vq3i3SiTkOBCSMw_XeurDmFaIP0s2xNG6EEPpH1GU"
      }
    ],
    "email_link": "https://mail.google.com/mail/u/1/#inbox/166f888c6e996653"
  }, // output of trigger data

  mock_input: {
    "label": "STARREDeee"
  },

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
      maxResults: 100,
      userId: "me",
      q: "has:attachment newer_than:1d -from:me"
    }

    let params1 = {
      maxResults: 100,
      userId: "me",
      q: "has:attachment newer_than:1d to:me from:me"
    }

    if (input.label) {
      params.labelIds = [input.label]
      params1.labelIds = [input.label]
    }

    if (input.search) {
      params.q = params.q + " " + String(input.search).trim()
      params1.q = params1.q + " " + String(input.search).trim()
    }

    async function call() {
      try {
        var mail = await comm.users_messages_list(gmail, params)
        var mail1 = await comm.users_messages_list(gmail, params1)
        var user_labels = await comm.users_labels_list(gmail)
        var user_data = await comm.users_get_profile(gmail)
        var user_email = ""
        var final_data = []
        var max_date = []
        if (user_data && user_data.data && user_data.data.emailAddress) {
          user_email = user_data.data.emailAddress
        }

        if (mail && mail.data && mail.data.messages && mail.data.resultSizeEstimate && mail.data.resultSizeEstimate > 0) {
          var mail_data_arr = []
          if (mail1 && mail1.data && mail1.data.messages && mail1.data.resultSizeEstimate && mail1.data.resultSizeEstimate > 0) {
            mail.data.messages = _.unionBy(mail.data.messages, mail1.data.messages, "id")
            mail_data_arr = mail.data.messages.map(element => comm.users_messages_get(gmail, element.id))
          }
          else {
            mail_data_arr = mail.data.messages.map(element => comm.users_messages_get(gmail, element.id))
          }


          Promise.all(mail_data_arr).then(res => {
            res.length && res.map(curr => {
              if (Number(curr.data.internalDate) > Number(options.meta.cursor)) {
                max_date.push(Number(curr.data.internalDate))
                final_data.push(comm.make_object(user_email, input.label, user_labels, curr.data, "New Attachment"))
              }

            })

            if (final_data.length && max_date.length) {
              options.setMeta({ cursor: _.max(max_date) })
            }

            return output(null, final_data)
          }).catch(() => {
            return output("Cannot fetch latest mail.", null)
          })

        } else if (
          (mail && mail.data && mail.data.resultSizeEstimate == 0) &&
          (mail1 && mail1.data && mail1.data.resultSizeEstimate && mail1.data.resultSizeEstimate && mail1.data.messages)
        ) {
          mail_data_arr = []
          let max_date = []
          mail_data_arr = mail1.data.messages.map(element => comm.users_messages_get(gmail, element.id))

          Promise.all(mail_data_arr).then(res => {
            res.length && res.map(curr => {
              if (Number(curr.data.internalDate) > Number(options.meta.cursor)) {
                max_date.push(Number(curr.data.internalDate))
                final_data.push(comm.make_object(user_email, input.label, user_labels, curr.data, "New Attachment"))
              }
            })

            if (final_data.length && max_date.length) {
              options.setMeta({ cursor: _.max(max_date) })
            }

            return output(null, final_data)
          }).catch(() => {
            return output("Cannot fetch latest mail.", null)
          })

        } else {
          return output(null, final_data)
        }
      } catch (error) {
        return output(error, null)
      }
    }
    call()
  },

  activate: function (input, options, output) {
    self.validate(input, options, output)
  },

  validate: function (input, options, output) {
    var OAuth2 = google.auth.OAuth2
    var oauth2Client = new OAuth2()
    oauth2Client.setCredentials({
      access_token: input.auth.access_token
    })
    var gmail = google.gmail({
      version: "v1",
      auth: oauth2Client
    })
    let params = {
      maxResults: 1,
      userId: "me",
      q: "-from:me"
    }

    let params1 = {
      maxResults: 1,
      userId: "me",
      q: "to:me from:me"
    }

    async function call() {
      try {
        var mail = await comm.users_messages_list(gmail, params)
        var mail1 = await comm.users_messages_list(gmail, params1)
        //------------check if input label is valid----------------------
        if (input.label) {
          params.labelIds = [input.label]
          await comm.users_messages_list(gmail, params)
        }
        //---------------------------------------------------------------

        var max_date = []
        if (mail && mail.data && mail.data.messages && mail.data.resultSizeEstimate && mail.data.resultSizeEstimate > 0) {
          var mail_data_arr = []
          if (mail1 && mail1.data && mail1.data.messages && mail1.data.resultSizeEstimate && mail1.data.resultSizeEstimate > 0) {
            mail.data.messages = _.unionBy(mail.data.messages, mail1.data.messages, "id")
            mail_data_arr = mail.data.messages.map(element => comm.users_messages_get(gmail, element.id))
          }
          else {
            mail_data_arr = mail.data.messages.map(element => comm.users_messages_get(gmail, element.id))
          }

          Promise.all(mail_data_arr).then(res => {
            res.length && res.map(curr => {
              max_date.push(Number(curr.data.internalDate))
            })

            if (max_date.length) {
              options.setMeta({ cursor: _.max(max_date) })
            } else {
              options.setMeta({ cursor: Date.now() })
            }
            return output(null, true)
          }).catch(() => {
            return output("Cannot fetch latest mail.", null)
          })

        } else if (
          (mail && mail.data && mail.data.resultSizeEstimate == 0) &&
          (mail1 && mail1.data && mail1.data.resultSizeEstimate && mail1.data.resultSizeEstimate && mail1.data.messages)
        ) {
          mail_data_arr = []
          mail_data_arr = mail1.data.messages.map(element => comm.users_messages_get(gmail, element.id))

          Promise.all(mail_data_arr).then(res => {
            res.length && res.map(curr => {
              max_date.push(Number(curr.data.internalDate))
            })

            if (max_date.length) {
              options.setMeta({ cursor: _.max(max_date) })
            } else {
              options.setMeta({ cursor: Date.now() })
            }
            return output(null, true)
          }).catch(() => {
            return output("Cannot fetch latest mail.", null)
          })

        } else if (
          (mail && mail.data && mail.data.resultSizeEstimate == 0) &&
          (mail1 && mail1.data && mail1.data.resultSizeEstimate == 0)
        ) {


          options.setMeta({ cursor: Date.now() })
          return output(null, true)
        }
        else {
          return output("Something went wrong", null)
        }
      } catch (error) {
        return output(error, null)
      }
    }
    call()
  }
}


var self = module.exports
