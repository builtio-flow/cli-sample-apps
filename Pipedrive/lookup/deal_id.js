var request = require('request');
var lodash = require('lodash');
module.exports = {

	'name': 'deal_id',

	'label': 'Deal Id',
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	'mock_input': {
		'auth': {}
	},
	'search': true,
	'execute': function (input, options, output) {

		var baseURL = "https://api.pipedrive.com/v1/deals"

		var flag = false
		var qs = {}
		if (!lodash.isEmpty(input.search)) {
			var baseURL = "https://api.pipedrive.com/v1/searchResults"
			qs["term"] = input.search
			qs["exact_match"] = 0
			qs["field_type"] = "dealField"
			qs["field_key"] = "name"
			qs["return_item_ids"] = 1
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
					"results": filterData(body),
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

function filterData(body) {
	var arr = [];
	if (!body.data || body.data && body.data.length < 1) {
		return arr
	}
	body.data.forEach(function (item, index) {
		arr.push({
			"id": String(item.id),
			"value": item.title || item.name
		});
	});
	return arr
}
