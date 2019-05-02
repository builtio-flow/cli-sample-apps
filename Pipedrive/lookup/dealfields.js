var request = require('request');
var lodash = require('lodash');
module.exports = {

	'name': 'dealfields',

	'label': 'Dealfields',
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	'mock_input': {
		'auth': {}
	},
	'search': true,
	'execute': function (input, options, output) {

		var baseURL = "https://api.pipedrive.com/v1/dealFields"
		var qs = {}
		var flag = false
		if (!lodash.isEmpty(input.search)) {
			flag = true
		}
		else if (input.hasOwnProperty('search') && lodash.isEmpty(input.search)) {
			return output(null, { "results": [], "next_page": false })
		}
		var page = input.page ? input.page * 10 : 0
		qs['api_token'] = input.auth.access_token

		var options = {
			url: baseURL,
			qs: qs,
			method: "GET"
		}
		request(options, function (err, response, body) {
			if (err) {
				return output(err);
			}
			if (response.statusCode == 401) {
				return output("Your api key is Invalid or Expired");
			}

			try {
				if (typeof body == "string") {
					body = JSON.parse(body)
				}
			} catch (e) {
				return output(body)
			}
			if (response.statusCode == 400 && body.error == 'term must be given and it should consist of at least 2 characters.' || body.error == 'Search term must be at least 2 characters long.') {

				return output(null, {
					"results": [],
					"next_page": false
				});
			}
			if (response && response.statusCode == 200 && body) {
				//var nextPageFlag = (body && body.additional_data && body.additional_data.pagination && body.additional_data.pagination.more_items_in_collection) ? true : false;
				var filterArr = filterData(body, input);
				var data = {
					"results": flag ? filterArr : filterArr.slice(page, page + 10),
					"next_page": flag ? false : page + 10 < filterArr.length
				};
				return output(null, data);
			} else if (body.errors && body.errors.length) {
				return output(body.errors[0].detail || "Something went wrong");
			}
			return output(body.error || body)
		})
	}

}

// function filterData(body) {
// 	var arr = [];
// 	if (!body.data || body.data && body.data.length < 1) {
// 		return arr
// 	}
// 	body.data.forEach(function (item, index) {

// 	});
// 	return arr
// }
var fields = { "id": 1, "title": 1, "value": 1, "currency": 1, "user_id": 1, "person_id": 1, "org_id": 1, "stage_id": 1, "status": 1, "lost_reason": 1, "add_time": 1, "visible_to": 1 }
function filterData(body, input) {
	var arr = [];
	if (!body.data || body.data && body.data.length < 1) {
		return arr
	}
	if (!lodash.isEmpty(input.search)) { // searchByValue API not provided for stage, so getting all result and returning filtered data based on searched value 
		var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
		lodash.map(body.data, function (item) {
			if (regexExp.test(item.name)) {
				if (fields[item.key] !== 1) {
					arr.push({
						"id": item.key || item.name,
						"value": item.name || item.key
					});
				}
			}
		})
	} else {
		body.data.forEach(function (item, index) {
			if (fields[item.key] !== 1) {
				arr.push({
					"id": item.key || item.name,
					"value": item.name || item.key
				});
			}
		});
	}
	return arr
}
