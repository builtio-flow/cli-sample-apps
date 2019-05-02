var request = require("request");
module.exports = {

	"name": "folder_id",

	"label": "Folder Id",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		//	'search':"connectorsssd",'

		"auth": {}
	},
	"search": true,
	"execute": function (input, options, output) {
		var qs = {}

		var folder_id = input.searchid || "0"
		input.page = input.page && Number(input.page) || 0;
		
		var baseURL = "https://api.box.com/2.0/folders/" + folder_id

		qs["offset"] = input.page ? input.page * 10 : 0
		qs["limit"] = 10
		var option = {
			url: baseURL,
			headers: {
				"Authorization": "Bearer " + input.auth.access_token,
			},
			qs: qs,
			method: "GET"
		}
//if (input.searchByValue || input.searchById) {
		request(option, function (err, res, body) {
			var result;
			var data;
			if (err) {
				return output(err);
			}
			if (res.statusCode == 404) {
				result = []
				if (input.search)
					result.push({
						"id": input.searchid,
						"value": input.search,
						"folder": true,
						"current": true,
						"open": true
					})
				data = { "results": result, "next_page": false }
				return output(null, data)
			}
			if (typeof (body) == "string") {
				try {
					body = JSON.parse(body)
				} catch (e) {
					return output({
						"Error": "Corrupt data received from box server. Please try again"
					})
				}
			}
			if (res && res.statusCode == 405) {
				return output("Invalid Folder/File Id")
			}
			if (res && res.statusCode == 403) {
				return output(body.message);
			}

			if (res.statusCode == 401) {
				return output("Your api key is Invalid or Expired")
			}
			if (res.statusCode >= 200 && res.statusCode < 400) {

				result = filterTiggers(body, input)
				data = {
					"results": result,
					"next_page": (((input.page + 1) * 10) < (body && body.item_collection && body.item_collection.total_count)) || (result.length >= 10)
				}
				return output(null, data)
			}
			return output(body)
		});

	}

}

function filterTiggers(body, input) {
	var result = [];
	if (input.searchid && input.search) {
		let name = input.search.split("/")
		name.pop()
		let check = name && name[name.length-1]
		name= name && name.join("/")
		if (input.page == 0 && body.parent) {
			result.push({
				"id": body.parent.id,
				"value": (check == body.parent.name) ? name : body.parent.name,
				"folder": true,
				"open": true
			})
		}
		if(input.searchid!="0")
		result.push({
			"id": input.searchid,
			"value": input.search,
			"folder": true,
			"current": true,
			"open": true
		})

	} else {
		if (input.page == 0 && body.parent) {
			result.push({
				"id": body.parent.id,
				"value": body.parent.name,
				"folder": true,
				"open": true
			})
		}

	}

	if (body && body.item_collection && body.item_collection.entries) {
		body.item_collection.entries.forEach(function (item) {
			if (item.type == "folder") {
				if (input.search) {
					result.push({
						"id": item.id,
						"value": input.search + "/" + item.name,
						"folder": true
					})
				} else
					result.push({
						"id": item.id,
						"value": "All Files/" + item.name,
						"folder": true
					})
			}
		})
	}
	return result
}