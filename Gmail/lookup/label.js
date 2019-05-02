// Add your function in module.exports

var google = require("googleapis")
google = google.google

module.exports = {

	"name": "label",

	"label": "Label",
	"mock_input": {
		"search": "impo",
		"auth": {}
	},
	"search": true,
	"execute": function (input, options, output) {

		const MAX_RESULTS = 10
		var pageId = Number(input.page) || 0
		var arr = []
		var body
		var lookupResult = {
			results: [],
			next_page: false
		}

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
			userId: "me"
		}

		users_labels_list(gmail, params).then(resp => {

			if (resp && resp.data && resp.data.labels && resp.data.labels.length > 0) {
				body = resp.data.labels

				if (input.search) {
					if (input.search != "") {
						body.forEach(function (el) {
							if (el.id && el.name && el.id.toString().toLowerCase() != "sent" && (el.name.toLowerCase().indexOf(input.search.toLowerCase()) != -1)) {
								arr.push({ id: el.id.toString(), value: el.name })
							}
						})
					}
					lookupResult.results = arr
					lookupResult.next_page = false
					return output(null, lookupResult)

				} else {
					body.forEach(function (el) {
						if (el.id && el.name && el.id.toString().toLowerCase() != "sent") {
							arr.push({ id: el.id.toString(), value: el.name })
						}
					})
					var project = arr.slice(((pageId) * MAX_RESULTS), (pageId + 1) * MAX_RESULTS)
					if (((pageId + 1) * MAX_RESULTS) >= body.length) {
						lookupResult.results = project
						lookupResult.next_page = false
						return output(null, lookupResult)
					} else {
						lookupResult.results = project
						lookupResult.next_page = true
						return output(null, lookupResult)
					}
				}

			} else {
				return output(null, lookupResult)
			}


		}).catch(err => {
			return output(err, null)
		})
	}

}


function users_labels_list(gmail, params) {
	return new Promise((resolve, reject) => {

		gmail.users.labels.list(params, (err, resp) => {
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
}

