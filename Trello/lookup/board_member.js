var request = require('request');
	var lodash = require('lodash');
	module.exports = {

		'name':'board_member',

		'label':'Board Member',
		// add input data lookup will depend on for
		// eg: if auth is oauth so add access_token inside auth object
		// you can also add other input properties which are mentioned in action/trigger
		'mock_input': {
		//	'search':"connectorsssd",'
			page:1,
			'auth': {}
		},
		'search': true,
		'execute': function (input, options, output) {
			var qs = {}
			var baseURL = "https://api.trello.com/1/boards/"+input.board_id+"/members?filter=all"
			var flag = false
			if (!lodash.isEmpty(input.search)) {
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
					if (body == 'invalid id' || body == 'board not found') {
						return output('Invalid Board ID')
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
					var result=filterData(body, input)
					
					var data = {
						"results": input.search?result:result.slice(input.page, input.page + 10)
					};
					var nextPageFlag = data.results && data.results.length >= 10
					if (flag)
						nextPageFlag = false
	
					data["next_page"]= nextPageFlag
					return output(null, data);
				}
				return output(body.error || body)
			})
		}
	
	}
	
	function filterData(body, input) {
		var result = [];
		if (Array.isArray(body)) {
			if (input.search) {// searchByValue API not provided for list and members, so getting all result and returning filtered data based on searched value 
				var regexExp = new RegExp(lodash.escapeRegExp(input.search), "i");
				lodash.map(body, function (item) {
					if (regexExp.test(item.name || item.fullName)) {
						result.push({
							"id": String(item.id),
							"value": item.name || item.fullName
						});
					}
				})
	
			} else {
				body.forEach(function (item) {
					result.push({
						"id": String(item.id),
						"value": item.name || item.fullName
					});
				});
			}
		} else if(typeof body =='object'){
				result.push({
					"id": String(body.id),
					"value": body.name || body.fullName
				});
		}
		return result
	}