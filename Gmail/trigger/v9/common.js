
var _ = require("lodash")

module.exports = {
    users_messages_list: function (gmail, params) {
        return new Promise((resolve, reject) => {
            gmail.users.messages.list(params, (err, resp) => {
                if (err) {
                    if (err.errors && err.errors.length && err.errors[0].message) {
                        reject(err.errors[0].message)
                    } else {
                        reject("Cannot fetch latest email.")
                    }
                }

                try {
                    resp = (typeof resp === "string") ? JSON.parse(resp) : resp
                } catch (error) {
                    reject(error)
                }

                if (resp.status != 200) {
                    reject(resp.statusText)
                } else {
                    resolve(resp)
                }
            })
        })
    },

    users_messages_get: function (gmail, message_id) {
        return new Promise((resolve, reject) => {
            gmail.users.messages.get({
                id: message_id,
                userId: "me",
                format: "full"
            }, (err, resp) => {
                if (err) {
                    if (err.errors && err.errors.length && err.errors[0].message) {
                        reject(err.errors[0].message)
                    } else {
                        reject("Cannot fetch latest email.")
                    }
                }
                try {
                    resp = (typeof resp === "string") ? JSON.parse(resp) : resp
                } catch (error) {
                    reject(error)
                }
                if (resp.status != 200) {
                    reject(resp.statusText)
                } else {
                    resolve(resp)
                }
            })
        })
    },
    users_labels_list: function (gmail) {
        return new Promise((resolve, reject) => {
            gmail.users.labels.list({
                userId: "me"
            }, (err, resp) => {
                if (err) {
                    if (err.errors && err.errors.length && err.errors[0].message) {
                        reject(err.errors[0].message)
                    } else {
                        reject("Cannot fetch latest labels.")
                    }
                }
                try {
                    resp = (typeof resp === "string") ? JSON.parse(resp) : resp
                } catch (error) {
                    reject(error)
                }
                if (resp.status != 200) {
                    reject(resp.statusText)
                } else {
                    resolve(resp)
                }
            })
        })
    },

    users_get_profile: function (gmail) {
        return new Promise((resolve, reject) => {

            gmail.users.getProfile({
                userId: "me"
            }, (err, resp) => {
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
    },

    make_object: function (user_email, user_iput_label, usr_labels, obj, event_typ) {
        var temp_obj = _.cloneDeep(obj)
        temp_obj.labels = []
        temp_obj.body_plain_text = ""
        temp_obj.body_html = ""
        delete temp_obj.labelIds
        delete temp_obj.payload.headers
        delete temp_obj.payload.body
        delete temp_obj.payload.parts
        temp_obj.attachment = []
        if (user_iput_label) {
            //------------ push user label frst ---------
            usr_labels && usr_labels.data && usr_labels.data.labels && usr_labels.data.labels.map(user_curr => {
                if (user_curr.id == user_iput_label) {
                    temp_obj.labels.push(user_curr.name)
                }
            })

            usr_labels && usr_labels.data && usr_labels.data.labels && usr_labels.data.labels.map(user_curr => {
                obj && obj.labelIds && obj.labelIds.map(temp_curr => {
                    if (user_curr.id == temp_curr && user_curr.id != user_iput_label) {
                        temp_obj.labels.push(user_curr.name)
                    }
                })
            })
        }
        else {
            usr_labels && usr_labels.data && usr_labels.data.labels && usr_labels.data.labels.map(user_curr => {
                obj && obj.labelIds && obj.labelIds.map(temp_curr => {
                    if (user_curr.id == temp_curr) {
                        temp_obj.labels.push(user_curr.name)
                    }
                })
            })
        }
        temp_obj = Object.assign({ "user_email": user_email }, temp_obj)
        temp_obj = Object.assign({ event_type: event_typ }, temp_obj)

        if (temp_obj && temp_obj.internalDate) {
            temp_obj.internalDate = new Date(Number(temp_obj.internalDate)).toISOString()
        }
        obj.payload && obj.payload.headers && obj.payload.headers.map(curr => {
            if (curr.name.toLowerCase().includes("date")) {
                temp_obj.payload[curr.name] = new Date(curr.value).toISOString()
            } else {
                temp_obj.payload[curr.name] = curr.value
            }

        })

        obj.payload && obj.payload.parts && obj.payload.parts.map(curr => {
            //---------------- for attachments -----------------
            if (curr.body && curr.body.attachmentId) {
                temp_obj.attachment.push({
                    "mimeType": curr.mimeType,
                    "filename": curr.filename,
                    "attachmentId": curr.body.attachmentId
                })
            }
            //---------------- for body in html form -----------------

            if (curr.mimeType && curr.mimeType == "text/html") {
                if (curr.body && curr.body.data) {
                    let buff = new Buffer(curr.body.data, "base64")
                    temp_obj.body_html = buff.toString("ascii")
                }
            }
            if (curr.mimeType && curr.mimeType == "text/plain") {
                if (curr.body && curr.body.data) {
                    let buff = new Buffer(curr.body.data, "base64")
                    temp_obj.body_plain_text = buff.toString("ascii")
                }
            }

            if (curr.mimeType && curr.mimeType == "multipart/alternative") {
                curr.parts && curr.parts.map(curr_inside => {
                    if (curr_inside.mimeType && curr_inside.mimeType == "text/html") {
                        if (curr_inside.body && curr_inside.body.data) {
                            let buff = new Buffer(curr_inside.body.data, "base64")
                            temp_obj.body_html = buff.toString("ascii")
                        }
                    }
                    if (curr_inside.mimeType && curr_inside.mimeType == "text/plain") {
                        if (curr_inside.body && curr_inside.body.data) {
                            let buff = new Buffer(curr_inside.body.data, "base64")
                            temp_obj.body_plain_text = buff.toString("ascii")
                        }
                    }
                })
            }
        })

        if (temp_obj.body_plain_text == "" && obj && obj.payload && obj.payload.body && obj.payload.body.data) {
            let buff = new Buffer(obj.payload.body.data, "base64")
            temp_obj.body_plain_text = buff.toString("ascii")
        }

        temp_obj["email_link"] = "https://mail.google.com/mail/u/1/#inbox/" + temp_obj.id
        return temp_obj
    },
}