var request = require('request');
var lodash = require('lodash');
module.exports = {

	'name': 'card_id',

	'label': 'Card Id',
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	'mock_input': {
		//	'search':"connectorsssd",'
	
		list_id:"5b9f9eaa415d5680e181cbaf",
		'auth': {}
	},
	'search': true,
	'execute': function (input, options, output) {
		var qs = {}
		var baseURL = "https://api.trello.com/1/lists/" + input.list_id + "/cards"
		var flag = false
		if (!lodash.isEmpty(input.search)) {
			baseURL="https://trello.com/1/search?query=" +(input.search)  + "&partial="+true+"&modelTypes=cards&idLists="+input.list_id+"&cards_limit="+ 1000
			flag = true
		}
		else if (input.hasOwnProperty('search') && lodash.isEmpty(input.search)) {
			return output(null, { "results": [], "next_page": false })
		} else {
			input.page = input.page ? input.page * 10 : 0
		}
		qs['key'] = input.auth.key
		qs['token'] = input.auth.access_token
		var option = {
			url: baseURL,
			qs: qs,
			method: "GET"
		}
		request(option, function (err, response, body) {
			if (err) {
				return output(err);
			}
			if (response.statusCode == 401) {
				return output("Invalid Authentication");
			}

			try {
				if (typeof body == "string") {
					body = JSON.parse(body)
				}
			} catch (e) {
				if (body === 'invalid value for idList' || body === 'Invalid objectId') {
					return output('Invalid List ID');
				}
				else if (body == 'invalid id') {
					return output('Invalid List ID')
				}else {
					return output(body)
				}
			}
			if (response.statusCode == 400) {

				return output(null, {
					"results": [],
					"next_page": false
				});
			}
			if (response && response.statusCode == 200 && body) {
				var result = filterData(body, input)

				var data = {
					"results": input.search ? result : result.slice(input.page, input.page + 10)
				};
				var nextPageFlag = data.results && data.results.length >= 10
				if (flag)
					nextPageFlag = false

				data["next_page"] = nextPageFlag
				return output(null, data);
			}
			return output(body.error || body)
		})
	}

}

function filterData(body, input) {
	var result = [];
	if (Array.isArray(body) || Array.isArray(body.cards)) {
		if (input.search && body.cards && body.cards.length>0) {// searchByValue API not provided for list and members, so getting all result and returning filtered data based on searched value 
			body.cards.forEach(function (item) {
				result.push({
					"id": String(item.id),
					"value": item.name || item.fullName
				});
			});

		} else {
			body.forEach(function (item) {
				result.push({
					"id": String(item.id),
					"value": item.name || item.fullName
				});
			});
		}
	} else if (typeof body == 'object') {
		result.push({
			"id": String(body.id),
			"value": body.name || body.fullName
		});
	}
	return result
}