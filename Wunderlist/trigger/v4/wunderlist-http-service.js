const request = require("request");
const baseUrl = "https://a.wunderlist.com/api/v1/";
module.exports = {
	"getListDetails": (input) => {
		return new Promise((resolve, reject) => {
			request({
				method: "GET",
				url: baseUrl + "lists/" + input.wunderlist,
				headers: {
					"Content-Type": "application/json",
					"X-Client-ID": input.auth.client_id,
					"X-Access-Token": input.auth.access_token
				}
			}, (error, resp, body) => {
				if (error) {
					reject(error);
				}
				try {
					body = (body && typeof body === "string") ? JSON.parse(body) : body;
				} catch (e) {
					return reject("Error while parsing response");
				}
				if (resp && resp.statusCode) {
					switch (resp.statusCode) {
						case 400:
							reject("Invalid List ID");
							break;
						case 401:
						case 403:
							reject("Invalid Authentication")
							break;
						case 404:
							if (body && body.error && body.error.type && body.error.type === "permission_error") {
								reject("Invalid List ID");
							} else {
								reject("The requested resource was not found");
							}
							break;
						case 200:
							resolve(body)
							break;
						default:
							if (body && body.error) {
								reject(body.error);
							} else {
								reject("Something went wrong");
							}
							break;
					}
				}
			});
		});
	},
	"getTaskDetails": (input, taskId) => {
		return new Promise((resolve, reject) => {
			request({
				method: "GET",
				url: baseUrl + "tasks/" + taskId,
				headers: {
					"Content-Type": "application/json",
					"X-Client-ID": input.auth.client_id,
					"X-Access-Token": input.auth.access_token
				}
			}, (error, resp, body) => {
				if (error) {
					reject(error);
				}
				try {
					body = (body && typeof body === "string") ? JSON.parse(body) : body;
				} catch (e) {
					return reject("Error while parsing response");
				}
				if (resp && resp.statusCode) {
					switch (resp.statusCode) {
						case 400:
							reject("Invalid Task ID");
							break;
						case 401:
						case 403:
							reject("Invalid Authentication")
							break;
						case 404:
							reject("Invalid Task ID");
							break;
						case 200:
							resolve(body)
							break;
						default:
							if (body && body.error) {
								reject(body.error);
							} else {
								reject("Something went wrong");
							}
							break;
					}
				}
			});
		});
	},
	"getUsers": (input) => {
		return new Promise((resolve, reject) => {
			request({
				method: "GET",
				url: baseUrl + "users",
				headers: {
					"Content-Type": "application/json",
					"X-Client-ID": input.auth.client_id,
					"X-Access-Token": input.auth.access_token
				}
			}, (error, resp, body) => {
				if (error) {
					reject(error);
				}
				try {
					body = (body && typeof body === "string") ? JSON.parse(body) : body;
				} catch (e) {
					return reject("Error while parsing response");
				}
				if (resp && resp.statusCode) {
					switch (resp.statusCode) {
						case 400:
							reject("Invalid Arguments");
							break;
						case 401:
						case 403:
							reject("Invalid Authentication")
							break;
						case 404:
							reject("The requested resource was not found")
							break;
						case 200:
							resolve(body)
							break;
						default:
							if (body && body.error) {
								reject(body.error);
							} else {
								reject("Something went wrong");
							}
							break;
					}
				}
			});
		});
	},
	"register_webhook": (input) => {
		return new Promise((resolve, reject) => {
			request({
				method: "POST",
				url: baseUrl + "webhooks",
				headers: {
					"Content-Type": "application/json",
					"X-Client-ID": input.auth.client_id,
					"X-Access-Token": input.auth.access_token
				},
				json: {
					"list_id": input.wunderlist,
					"url": input.webhook,
					"processor_type": "generic",
					"configuration": ""
				}
			}, (error, resp, body) => {
				if (error) {
					return reject(error);
				}
				try {
					body = (body && typeof body === "string") ? JSON.parse(body) : body;
				} catch (e) {
					return reject("Error while parsing response");
				}
				if (resp && resp.statusCode) {
					switch (resp.statusCode) {
						case 400:
							reject("Invalid List ID")
							break;
						case 401:
						case 403:
							reject("Invalid Authentication")
							break;
						case 404:
							if (body && body.error && body.error.type && body.error.translation_key === "api_error_not_found") {
								reject("Invalid List ID");
							} else {
								reject("The requested resource was not found")
							}
							break;
						case 201:
							resolve(body);
							break;
						default:
							if (body && body.error) {
								reject(body.error);
							} else {
								reject("Something went wrong");
							}
							break;
					}
				}
			});
		});
	},
	"unregister_webhook": (input) => {
		return new Promise((resolve, reject) => {
			request({
				method: "DELETE",
				url: baseUrl + "webhooks/" + input.webhookId,
				headers: {
					"Content-Type": "application/json",
					"X-Client-ID": input.auth.client_id,
					"X-Access-Token": input.auth.access_token
				}
			}, (error, resp, body) => {
				if (error) {
					reject(error);
				}
				if (resp && resp.statusCode && resp.statusCode >= 200 && resp.statusCode < 500) {
					resolve({
						"message": "Webhook deleted successfully!!"
					})
				} else {
					try {
						body = (typeof body === "string" ? JSON.parse(body) : body);
					} catch (e) {
						reject("Error while parsing response");
					}
					if (body && body.error) {
						reject(body.error);
					} else {
						reject("Something went wrong");
					}
				}
			});
		});
	}
}