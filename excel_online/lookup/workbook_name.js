const request = require("request")
const lodash = require("lodash")

module.exports = {

	"name": "workbook_name",

	"label": "Workbook Name",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": { "access_token" : "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFDNXVuYTBFVUZnVElGOEVsYXh0V2pURGpvOWxkNER5VVByZ0pXNlJMSjA4Y2N1cjBxRHJGZ0F4a203TU5wRmo4T1kxRXZzbFYybllJNlpabzRKQWgtcTBKZkZVRTBxaFZyNTZETk9CMlEya3lBQSIsImFsZyI6IlJTMjU2IiwieDV0Ijoid1VMbVlmc3FkUXVXdFZfLWh4VnRESkpaTTRRIiwia2lkIjoid1VMbVlmc3FkUXVXdFZfLWh4VnRESkpaTTRRIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81ZGNjYTQ0Yi05OTg5LTRmNTktYjVjMi1mOTcxNDQ2MGQyZWIvIiwiaWF0IjoxNTQzMjIzMTQxLCJuYmYiOjE1NDMyMjMxNDEsImV4cCI6MTU0MzIyNzA0MSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhKQUFBQWFkc3dEcWlscE12ZGdETFlIUlJMNWk5V2hRbkZpT2lQeVBQL3BwQmlaT2M9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJCdWlsdC5pbyBGbG93IiwiYXBwaWQiOiJjYzRjYWUxMC0xNmZmLTQ3YWMtYjM3Zi1hM2NiY2M1ZTNmZWIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IkZsb3ciLCJnaXZlbl9uYW1lIjoiQnVpbHQiLCJpcGFkZHIiOiIxNTAuMjQyLjE5Ni4yIiwibmFtZSI6IkJ1aWx0IEZsb3ciLCJvaWQiOiI2ZmVlMWM4Zi1mN2FkLTQzOWQtYjBhYS1kYTJmZmFlMTJiMjMiLCJwbGF0ZiI6IjE0IiwicHVpZCI6IjEwMDMwMDAwOTU0M0JBRDQiLCJzY3AiOiJDYWxlbmRhcnMuUmVhZCBDYWxlbmRhcnMuUmVhZC5TaGFyZWQgQ2FsZW5kYXJzLlJlYWRXcml0ZSBDYWxlbmRhcnMuUmVhZFdyaXRlLlNoYXJlZCBDb250YWN0cy5SZWFkIENvbnRhY3RzLlJlYWQuU2hhcmVkIENvbnRhY3RzLlJlYWRXcml0ZSBDb250YWN0cy5SZWFkV3JpdGUuU2hhcmVkIERpcmVjdG9yeS5BY2Nlc3NBc1VzZXIuQWxsIERpcmVjdG9yeS5SZWFkLkFsbCBEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCBGaWxlcy5SZWFkIEZpbGVzLlJlYWQuQWxsIEZpbGVzLlJlYWQuU2VsZWN0ZWQgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgRmlsZXMuUmVhZFdyaXRlLkFwcEZvbGRlciBGaWxlcy5SZWFkV3JpdGUuU2VsZWN0ZWQgR3JvdXAuUmVhZC5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWQgTWFpbC5SZWFkLlNoYXJlZCBNYWlsLlJlYWRXcml0ZSBNYWlsLlJlYWRXcml0ZS5TaGFyZWQgTWFpbC5TZW5kIFNpdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZCBUYXNrcy5SZWFkLlNoYXJlZCBUYXNrcy5SZWFkV3JpdGUgVGFza3MuUmVhZFdyaXRlLlNoYXJlZCBVc2VyLlJlYWQgVXNlci5SZWFkLkFsbCBVc2VyLlJlYWRXcml0ZS5BbGwgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJpMmM3UXBqeDFIUW0zeVBBeHFqc2JCMUZqc0d3NVhKOGtvX0VnbW52ZjdJIiwidGlkIjoiNWRjY2E0NGItOTk4OS00ZjU5LWI1YzItZjk3MTQ0NjBkMmViIiwidW5pcXVlX25hbWUiOiJidWlsdC5mbG93QGJ1aWx0Zmxvdy5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJidWlsdC5mbG93QGJ1aWx0Zmxvdy5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJDNEFnaG4wZmswNllVNkItQnA3aUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXSwieG1zX3N0Ijp7InN1YiI6IlJPTFBxYVpndzdFSkpWV0szb3FockR3N19rT1pVYTlkQTBlRmJsYkYxYW8ifSwieG1zX3RjZHQiOjE0NDk0OTg4MDB9.CVq2Aampg4LBbBv0n284NeFHHmRCz4VZIn8Z3tQIVcFK_DlhzpxKjkHnNowWU40BeVz_PNsR5bUdXb97mFCVL3b-ZQMN6S1zOblplVa7kmQ00IcmehKDgFbeYVDJIMuunoIznuE3b6AnATNlLm785ViD_yK2C4p-m_oPfI7mIZRXQx1o-CR9pirWY3fabazT-VfHCfGD2QTND6SLxSSvHAd5FbdT4-iWI9AY_ramDk8nhKfWArtk9PfsjAPB-CitTKBZR4_p8ypJ229v-mx5nYwZhKybMt3dzvf-ryG-IDFvNCkXn5w9hxZ6MoqXGCnq1rs9EaCCWRTWMNDXzGIixw"}
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
			url: "https://graph.microsoft.com/v1.0/me/drive/items/" + input.folderId + "/children",
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

			lodash.map(value, function (children) {
				if (!lodash.has(children, "folder") && lodash.endsWith(children.name, ".xlsx") && regexExp.test(children.name)) {
					result.push({
						"id": children.id,
						"value": children.name
					})
				}
			})

		} else {
			value.forEach(function (children) {

				if (!lodash.has(children, "folder") && lodash.endsWith(children.name, ".xlsx")) {
					result.push({
						"id": children.id,
						"value": children.name
					})
				}
			})
		}
	}
	return result
}