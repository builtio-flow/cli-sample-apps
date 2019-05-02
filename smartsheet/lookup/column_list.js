const request = require("request")
const lodash = require("lodash")

module.exports = {

	"name": "column_list",

	"label": "Column List",
	"mock_input": {
		"auth": { access_token: "rrv1n1zdz91ubhwtj461u6oss0" }
	},
	"search": true,
	"execute": function (input, options, output) {

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
			url: "https://api.smartsheet.com/2.0/sheets/" + input.sheetID + "/columns?includeAll=true",
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
					if (body && body.message)
						return output(body.message, null)
					else if (body)
						return output(body, null)
					else
						return output("Something went wrong", null)
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					output("Error while parsing request")
				}

				let arr = []

				let data = body.data

				if (data) {

					arr = filterData(data, input)

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

function filterData(data, input) {
	var result = [];
	if (Array.isArray(data)) {
		if (input.search) {
			var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
			lodash.map(data, function (column) {
				if (regexExp.test(String(column.title).trim())) {
					result.push({
						"id": String(column.id).trim(),
						"value": String(column.title).trim()
					});
				}
			})

		} else {
			data.forEach(function (column) {
				result.push({
					"id": String(column.id).trim(),
					"value": String(column.title).trim()
				})
			});
		}
	}
	return result
}