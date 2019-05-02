// Add your function in module.exports

const request = require("request")
const commons = require("../commons")

module.exports = {

	"name": "get_stacks",

	"label": "Get Stacks",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": {},
	},
	"search": true,
	"execute": function (input, options, output) {
		// to access auth info use input.auth , eg: input.auth.username
		// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
		// output should be an array of objects containing id and value keys.
		// your code goes here

		try {
			(async function () {

				if (!input.auth.authtoken)
					input.auth.authtoken = await commons.getAuthToken(input)
				// input.auth.authtoken = "blt6ef681ab85ab54cb"//await commons.getAuthToken(input)

				var pageId = Number(input.page) || 0

				let option = {
					url: "https://api.contentstack.io/v3/stacks",
					qs: {
						limit: 11,
						skip: pageId * 10,
					},
					method: "GET",
					headers: {
						"authtoken": input.auth.authtoken,
						"content-type": "application/json"
					}

				}
				if (input.search) {
					option["qs"] = {
						limit: 11,
						skip: pageId * 10,
						query: {
							"name": {
								"$regex": input.search,
								"$options": "i"
							}
						}
					}
				}

				request(option, function (e, r, b) {

					if (e)
						return output(e)

					try {
						b = typeof b === "string" ? JSON.parse(b) : b
					} catch (err) {
						return output(err)
					}

					let arr = []

					b.stacks.map((stack) => {
						arr.push({
							id: stack.api_key,
							value: stack.name
						})
					})


					let array_length = arr.length

					if (array_length == 11) {
						return output(null, {
							results: arr.slice(0, 10),
							next_page: true
						})
					} else {
						return output(null, {
							results: arr,
							next_page: false
						})
					}

				})
			})()
		} catch (err) {
			return output(err, null)
		}
	}

}