const _ = require("lodash")
const request = require("request")

module.exports = {
    getChannels: async function (input, event) {
        var channelArray = [];

        //eliminates empty values
        channelArray = input.content_types.filter((ct) => {
            if (ct.filter.trim() != "") {
                return true
            }
        })

        channelArray = _.uniqBy(channelArray, "filter")

        let array_of_promises = []
        channelArray.map((obj) => {
            array_of_promises.push(module.exports.validateContentType(input, obj.filter.trim()))
        })

        try {
            // var areAllValid = await Promise.all(array_of_promises)
            if (channelArray.length) {

                //this does both filtering and converting into an array fo strings
                channelArray = channelArray.map(c => {
                    return "content_types." + c.filter.trim() + ".entries." + event
                })

            } else {
                channelArray.push("content_types.entries." + event);
            }
            return channelArray;

        } catch (notAllAreValid) {
            return new Error("Please check all the Content IDs.")
        }

    },

    validateStackId: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                url: "https://cdn.contentstack.io/v3/stacks",
                method: "GET",
                headers: {
                    "api_key": input.stack_api_key,
                    "authtoken": input.auth.authtoken,
                    "content-type": "application/json"
                }

            }, function (e, r) {

                if (e)
                    return reject(e)

                if (r.statusCode != 200) {
                    return reject("Invalid Stack API key.")
                }

                return resolve("Valid Stack API Key")

            })

        })
    },
    validateContentType: function (input, contentID) {
        return new Promise(function (resolve, reject) {

            request({
                url: "https://api.contentstack.io/v3/content_types/" + contentID,
                method: "GET",
                headers: {
                    "api_key": input.stack_api_key,
                    "authtoken": input.auth.authtoken,
                    "content-type": "application/json"
                }

            }, function (e, r) {

                if (e)
                    return reject(e)

                if (r.statusCode != 200) {
                    return reject("Some error occured while checking a Content Type.")
                }

                return resolve("Valid Content Type.")

            })

        })
    },

    getAuthToken: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                url: "https://api.contentstack.io/user-session",
                method: "POST",
                body: {
                    "user": {
                        "email": input.auth.email, //"sreerag.nair@built.io",
                        "password": input.auth.password, //"Contentstack@123..."
                    }
                },
                json: true,

            }, function (e, r, b) {

                if (e)
                    return reject(e)

                try {
                    b = typeof b === "string" ? JSON.parse(b) : b
                } catch (e) {
                    return reject(e)
                }

                console.log("b ->>>>>>>>>>>>>>> ", b)
                if (r.statusCode === 200) {
                    return resolve(b.user.authtoken)
                }

                if (b && b.error_message)
                    return reject(b.error_message)

                return reject(b)
            })

        })
    }

}


/* console.log(module.exports.getChannels({
    content_types: [{
            filter: "   "
        },
        {
            filter: "   "
        },
        {
            filter: " 3  "
        },
        {
            filter: " 4  "
        },
        {
            filter: " 5  "
        },
        {
            filter: " 6  "
        },
        {
            filter: " 7  "
        }
    ]
}, "hee")) */