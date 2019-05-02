// Add your function in module.exports

const request = require("request")

module.exports = {

	"name": "content_type",

	"label": "Content Type",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": {
			authtoken: "blt340c51467b203a7e",
			stack_api_key: "blt1e0db6b63b504d46"
		}
	},
	"search": true,
	"execute": function (input, options, output) {
		// to access auth info use input.auth , eg: input.auth.username
		// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
		// output should be an array of objects containing id and value keys.
		// your code goes here

		var pageId = Number(input.page) || 0

		request({
			url: "https://cdn.contentstack.io/v3/content_types",
			method: "GET",
			qs: {
				limit: 15,
				skip: pageId * 10,
				query: {
					"title": {
						"$regex": input.search ? input.search : "",
						"$options": "i"
					}
				}
			},
			headers: {
				"api_key": input.stack_api_key,
				"authtoken": input.auth.authtoken,
				"content-type": "application/json"
			}

		}, function (e, r, b) {

			if (e)
				return output(e)

			try {
				b = typeof b === "string" ? JSON.parse(b) : b
			} catch (err) {
				return output(err)
			}

			if(r.statusCode != 200){
				return output("Invalid Stack ID.")
			}

			let arr = []

			b.content_types.map((stack) => {
				arr.push({
					id: stack.uid.toString(),
					value: stack.title
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

	}

}