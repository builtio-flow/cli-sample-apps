const request = require("request")
const lodash = require("lodash")

module.exports = {

	"name": "sheet_name",

	"label": "Sheet Name",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": {}
	},
	"search": true,
	"execute": function (input, options, output) {
		// to access auth info use input.auth , eg: input.auth.username
		// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
		// output should be an array of objects containing id and value keys.
		// your code goes here

		let flag = false
		if (!lodash.isEmpty(input.search)) {
			flag = true
		}
		else if (input.hasOwnProperty("search") && lodash.isEmpty(input.search)) {
			return output(null, { "results": [], "next_page": false })
		} else {
			var pageId = Number(input.page) || 0;
		}

		request({
			url: "https://graph.microsoft.com/v1.0/me/drive/items/" + input.workbookId + "/workbook/worksheets",
			method: "GET",
			headers: {
				"Authorization": "Bearer " + input.auth.access_token,
				"User-Agent": "Built.io Flow"
			}
		},
			function (err, res, body) {

				if (err) {
					return output(err, null);
				}

				if (res.statusCode == 400) {
					return output("Bad Request", null)
				}

				if (res.statusCode == 401) {
					return output("Unauthorized Request", null)
				}

				if (res.statusCode != 200) {
					if (body && body.error && body.error.message)
						return output(body.error.message, null)
					else if (body.error)
						return output(body.error, null)
					else if (body)
						return output(body, null)
					else
						return output("Something went wrong", null)
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return output("Unable to parse request")
				}

				let arr = []

				if (body && body.value) {

					arr = filterData(body.value, input)

					let results = flag ? arr : arr.slice(((pageId) * 10), ((pageId + 1) * 10))

					let load_more_obj = null

					if (!flag) {

						if (((pageId + 1) * 10) >= arr.length) {
							load_more_obj = {
								next_page: false,
								results: results
							}
							output(null, load_more_obj)

						}
						else {
							load_more_obj = {
								next_page: true,
								results: results
							}
							output(null, load_more_obj)
						}
					}
					else
						output(null, { next_page: false, results: results })
				}
				else
					return output("Body not found", null)

			})
	}
}

function filterData(value, input) {
	let result = []
	if (Array.isArray(value)) {
		if (input.search) {// searchByValue API not provided for list and members, so getting all result and returning filtered data based on searched value 
			let regexExp = new RegExp(lodash.escapeRegExp(input.search), "i")

			lodash.map(value, function (sheet) {
				if (regexExp.test(sheet.name)) {
					result.push({
						"id": sheet.name,
						"value": sheet.name
					})
				}
			})

		} else {
			value.forEach(function (sheet) {
				result.push({
					"id": sheet.name,
					"value": sheet.name
				})
			})
		}
	}
	return result
}