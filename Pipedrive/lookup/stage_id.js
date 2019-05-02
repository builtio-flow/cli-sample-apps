var request = require('request');
var lodash = require('lodash');
module.exports = {

	'name': 'stage_id',

	'label': 'Stage Id',
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	'mock_input': {
		'auth': {}
	},
	'search': true,
	'execute': function (input, options, output) {
		var qs = {}
		var baseURL = "https://api.pipedrive.com/v1/stages"
		var flag = false
		if (!lodash.isEmpty(input.search)) {
			flag = true
		}
		else if (input.hasOwnProperty('search') && lodash.isEmpty(input.search)) {
			return output(null, { "results": [], "next_page": false })
		} else {
			input.page = input.page ? input.page * 10 : 0
			if (input.page) {
				qs['start'] = input.page
			}
			qs['limit'] = 10
		}
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
				var nextPageFlag = (body && body.additional_data && body.additional_data.pagination && body.additional_data.pagination.more_items_in_collection) ? true : false;
				if (flag)
					nextPageFlag = false
				var data = {
					"results": filterData(body, input),
					"next_page": nextPageFlag
				};
				return output(null, data);
			} else if (body.errors && body.errors.length) {
				return output(body.errors[0].detail || "Something went wrong");
			}
			return output(body.error || body)
		})
	}

}

function filterData(body, input) {
	var arr = [];
	if (!body.data || body.data && body.data.length < 1) {
		return arr
	}
	if (!lodash.isEmpty(input.search)) { // searchByValue API not provided for stage, so getting all result and returning filtered data based on searched value 
		var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
		lodash.map(body.data, function (item) {
			if (regexExp.test(item.name)) {
				arr.push({
					"id": String(item.id),
					"value": item.name || item.id
				});
			}
		})
	} else {
		body.data.forEach(function (item, index) {
			arr.push({
				"id": String(item.id),
				"value": item.title || item.name
			});
		});
	}
	return arr
}