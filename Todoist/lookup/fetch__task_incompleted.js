const request = require("request")
var lodash = require("lodash")

module.exports = {

	"name": "fetch__task_incompleted",

	"label": "Fetch Task Incompleted",
	"mock_input": {
		"auth": {}
	},
	"search": true,

	"execute": function (input, options, output) {
		var isSearch = false
		const MAXRESULTS = 10
		const startAt = input.page ? input.page * MAXRESULTS : 0

		if (!lodash.isEmpty(input.search)) {
			isSearch = true
		}
		else if (input.hasOwnProperty("search") && lodash.isEmpty(input.search)) {
			return output(null, { "results": [], "next_page": false })
		}

		request({
			method: "GET",
			url: "https://beta.todoist.com/API/v8/tasks?project_id=" + input.projectid,
			headers: {
				Authorization: "Bearer " + input.auth.access_token,
			}
		}, function (error, response, body) {
			if (!error) {
				let statusCode = response.statusCode
				switch (true) {
					case (statusCode == 200 && statusCode < 400):
						var arr = []
						try {
							body = JSON.parse(body)

						} catch (error) {
							return output("Error while parsing body")
						}

						if (body && body.length > 0) {
							if (input.search) {
								var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i")
								lodash.map(body, function (curr) {
									if (regexExp.test(curr.name)) {
										arr.push({
											id: String(curr.id),
											value: curr.content
										})
									}
								})
							} else {
								body.slice(startAt, startAt + MAXRESULTS).forEach((curr) => {
									arr.push({
										id: String(curr.id),
										value: curr.content
									})
								})
							}
						}

						output(null, {
							results: arr,
							next_page: isSearch ? !isSearch : body.length > startAt + MAXRESULTS
						})
						break
					case (statusCode == 400):
						output("Bad Request", null)
						break
					case (statusCode == 401):
						output("Authorization Error", null)
						break
					case (statusCode == 403):
						output("Forbidden Error", null)
						break
					case (statusCode == 404):
						output("404 not found", null)
						break
					case (statusCode > 400 && statusCode < 500):
						output("Unauthorized request sent by client", null)
						break
					case (statusCode == 500):
						output("Internal Server Error", null)
						break
					case (statusCode == 503):
						output("Service Unavialble Error", null)
						break
					case (statusCode == 504):
						output("Request Timeout Error", null)
						break
					case (statusCode > 500):
						output("Client Server Encountered an Error", null)
						break
					default:
						output("Undefiend error please contact support team", null)
						break
				}
			} else {
				return output(error, null)
			}
		})
	}

}