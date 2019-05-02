const request = require("request");
module.exports = {

	"name": "folder_name",

	"label": "Folder Name",
	"mock_input": {
		searchid: "017OQVVFN6Y2GOVW7725BZO354PWSELRRZ",
		"auth": {}
	},
	"search": false,
	"nested": true,
	"execute": function (input, options, output) {
		const MAX_RESULTS = 10;
		var pageId = Number(input.page) || 0;

		var basic_path

		var url = "https://graph.microsoft.com/v1.0/me/drive/"

		basic_path = input.searchid ? url + "items/" + input.searchid + "/children?&$filter=folder%20ne%20null" : url + "root"

		function get_childern() {
			var arr = []
			return new Promise(function (resolve, reject) {

				request({
					url: basic_path,
					method: "GET",
					headers: {
						"Authorization": "Bearer " + input.auth.access_token
					}
				}, function (err, resp, body) {
					if (err) {
						reject(err);
					}
					var bdy
					try {
						bdy = typeof body === "string" ? JSON.parse(body) : body
					} catch (error) { reject("Invalid data") }

					if (resp.statusCode == 401) {
						reject("Invalid Authentication Token.")
					} else if (resp.statusCode == 404) {
						reject("Please provide valid inputs.")
					} else if (resp.statusCode != 200) {
						if (bdy && bdy.error && bdy.error.code) {
							reject(bdy.error.code)
						} else {
							reject(bdy)
						}
					} else {

						if (basic_path === "https://graph.microsoft.com/v1.0/me/drive/root") {
							var folder_bol = bdy.folder ? true : false;
							if (folder_bol) {
								arr.push({
									value: bdy.name,
									id: bdy.id.toString(),
									"folder": folder_bol,

								})
							}

						} else {
							bdy && bdy.value && bdy.value.forEach(function (el) {
								var folder_bol = el.folder ? true : false;
								if (folder_bol) {
									var data_path = el.parentReference.path
									var newString = data_path.replace(/%20/g, " ");
									var tp = newString.split("root:")
									arr.push({
										value: "root" + tp[tp.length - 1] + "/" + el.name,
										id: el.id.toString(),
										"folder": folder_bol,

									})
								}
							})
						}
						resolve(arr);
					}
				});
			});
		}

		function get_parent() {
			var arr = []
			return new Promise(function (resolve, reject) {

				if (input.searchid) {
					request({
						url: "https://graph.microsoft.com/v1.0/me/drive/items/" + input.searchid,
						method: "GET",
						headers: {
							"Authorization": "Bearer " + input.auth.access_token
						}
					}, function (err, resp, body) {
						if (err) {
							reject(err);
						}
						var bdy
						try {
							bdy = typeof body === "string" ? JSON.parse(body) : body
						} catch (error) { reject("Invalid data") }

						if (resp.statusCode == 401) {
							reject("Invalid Authentication Token.")
						} else if (resp.statusCode == 404) {
							reject("Please provide valid inputs.")
						} else if (resp.statusCode != 200) {
							if (bdy && bdy.error && bdy.error.code) {
								reject(bdy.error.code)
							} else {
								reject(bdy)
							}
						} else {
							if (bdy.parentReference.id) {
								var folder_bol = true
								if (folder_bol) {
									var data_path = bdy.parentReference.path
									var newString = data_path.replace(/%20/g, " ");
									var tp = newString.split("root:")
									arr.push({
										value: "root" + tp[tp.length - 1],
										id: bdy.parentReference.id.toString(),
										"folder": folder_bol,
										"open": true
									})
									arr.push({
										value: "root" + tp[tp.length - 1] + "/" + bdy.name,
										id: bdy.id.toString(),
										"folder": folder_bol,
										"current": true,
										"open": true
									})
								}
							} else if (bdy.root) {
								let folder_bol = bdy.folder ? true : false;
								if (folder_bol) {
									arr.push({
										value: bdy.name,
										id: bdy.id.toString(),
										"folder": folder_bol,
										"current": true,
										"open": true
									})
								}
							}
							resolve(arr);
						}
					});
				} else { resolve(arr) }
			});
		}


		Promise.all([get_childern(), get_parent()]).then(values => {
			var final
			if (values.length > 0) {
				final = values[1].concat(values[0]);
			}
			var lookupResult = {
				results: [],
				next_page: false,
			};
			if (final && final.length > 0) {


				var project = final.slice(((pageId) * MAX_RESULTS), (pageId + 1) * MAX_RESULTS)
				if (((pageId + 1) * MAX_RESULTS) >= final.length) {
					lookupResult.results = project
					lookupResult.next_page = false
					return output(null, lookupResult)
				} else {
					lookupResult.results = project
					lookupResult.next_page = true
					return output(null, lookupResult)
				}
			} else {
				output(null, lookupResult)
			}
		}).catch(err => {
			return output(err, null)
		});

	}

}