const wunderlist_lookup_service = require("./wunderlist-lookup-service");
const lodash = require("lodash");
module.exports = {
	"name": "fetch_tasks",
	"label": "Fetch Tasks",
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
		Promise.all([
			wunderlist_lookup_service.getAllTasks(input, false),
			wunderlist_lookup_service.getAllTasks(input, true)
		]).then(promiseData => {
			var allTaskData = []
			if (promiseData && promiseData.length) {
				if (promiseData[0] && promiseData[0].length) {
					allTaskData = promiseData[0];
				}
				if (promiseData[1] && promiseData[1].length) {
					allTaskData = allTaskData.concat(promiseData[1]);
				}
			}
			allTaskData = filterData(allTaskData, input)
			var lookupResult = {
				"results": input.search ? allTaskData : allTaskData.slice(input.page, input.page + 10)
			};
			var nextPageFlag = allTaskData && allTaskData.length > (input.page + 10)
			if (flag) nextPageFlag = false
			lookupResult["next_page"] = nextPageFlag
			return output(null, lookupResult);
		}).catch(error => {
			output(error);
		})
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