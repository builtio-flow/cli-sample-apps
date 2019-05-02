const request = require("request")
const lodash = require("lodash")

module.exports = {

	"name": "column_type",

	"label": "Column Type",
	"mock_input": {
		"auth": { access_token: "7uua0a7gf9795dhdxrzzym2lrt" }
	},
	"search": true,
	"execute": function (input, options, output) {
		if (input.columnID.toLowerCase() == "All") {
			return output("The ‘All’ parameter specified in the ‘Column ID’ field need no input in the column type field. Please save the trigger.")
		}

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
			url: "https://api.smartsheet.com/2.0/sheets/" + input.sheetID + "/columns/" + input.columnID,
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

				switch (body.type) {
					case "DATE":
						output("Enter the date in yyyy-mm-dd format")
						break
					case "CHECKBOX":
						output(null, { next_page: false, results: [{ "id": "Checked", "value": "Checked" }, { "id": "Unchecked", "value": "Unchecked" }] })
						break
					case "CONTACT_LIST" || "MULTI_CONTACT_LIST":
						if (body.options) {
							getPageData(input, body.options, pageId || 0, flag, filterData, output)
						} else {
							output("No options found")
						}
						break
					case "PICKLIST":
						if (body.options) {
							getPageData(input, body.options, pageId || 0, flag, filterData, output)
						} else {
							output("No options found")
						}
						break
					case "TEXT_NUMBER":
						output("Specify text/number for which you want to set the trigger. For e.g., ‘demo’ or ‘2’")
						break
					default:
						output("Specify text/number for which you want to set the trigger. For e.g., ‘demo’ or ‘2’")
				}
			})
	}
}

function getPageData(input, data, pageId, flag, filterFunction, output) {
	let arr = []

	arr = filterFunction(data, input)

	let results = flag ? arr : arr.slice(((pageId) * 10), ((pageId + 1) * 10))

	let load_more_obj = null

	if (!flag) {
		results.unshift({ id: "All", value: "All" })

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
	else {
		output(null, { next_page: false, results: results })
	}
}


function filterData(data, input) {
	var result = [];
	if (Array.isArray(data)) {
		if (input.search) {
			var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
			lodash.map(data, function (option) {
				if (regexExp.test(String(option).trim())) {
					result.push({
						"id": String(option).trim(),
						"value": String(option).trim()
					});
				}
			})

		} else {
			data.forEach(function (option) {
				result.push({
					"id": String(option).trim(),
					"value": String(option).trim()
				})
			});
		}
	}
	return result
}

