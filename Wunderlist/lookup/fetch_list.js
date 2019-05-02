const wunderlist_lookup_service = require("./wunderlist-lookup-service");
const lodash = require("lodash");
module.exports = {
	"name": "fetch_list",
	"label": "Fetch List",
	"mock_input": {
		"auth": {}
	},
	"search": true,
	"execute": function(input, options, output) {
		var flag = false
		if (!lodash.isEmpty(input.search)) {
			flag = true
		} else if (input.hasOwnProperty("search") && lodash.isEmpty(input.search)) {
			return output(null, {
				"results": [],
				"next_page": false
			})
		} else {
			input.page = input.page ? input.page * 10 : 0
		}
		wunderlist_lookup_service.getAllLists(input).then(listsData => {
			listsData = filterData(listsData, input)
			var lookupResult = {
				"results": input.search ? listsData : listsData.slice(input.page, input.page + 10)
			};
			var nextPageFlag = listsData && listsData.length > (input.page + 10)

			if (flag) nextPageFlag = false
			lookupResult["next_page"] = nextPageFlag
			return output(null, lookupResult);
		}, error => {
			return output(error);
		});
	}
}

function filterData(data, input) {
	var result = [];
	if (Array.isArray(data)) {
		if (input.search) { // searchByValue API not provided for list and members, so getting all result and returning filtered data based on searched value 
			var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
			lodash.map(data, function(item) {
				if (regexExp.test(item.title)) {
					result.push({
						"id": String(item.id),
						"value": item.title
					});
				}
			})
		} else {
			data.forEach(function(item) {
				result.push({
					"id": String(item.id),
					"value": item.title
				});
			});
		}
	} else if (typeof data == "object") {
		result.push({
			"id": String(data.id),
			"value": data.title
		});
	}
	return result
}