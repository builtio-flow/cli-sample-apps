const request = require("request");
const baseUrl = "https://a.wunderlist.com/api/v1/";
module.exports = {
	getAllLists: (input) => {
		return new Promise((resolve, reject) => {
			request({
				method: "GET",
				url: baseUrl + "lists",
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
	getAllTasks: (input, onlyCompleted) => {
		return new Promise((resolve, reject) => {
			request({
				method: "GET",
				url: baseUrl + "tasks?list_id=" + input.wunderlist + "&completed=" + onlyCompleted,
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
							if (body && body.error && body.error.type && body.error.type === "permission_error") {
								reject("Invalid Task ID");
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
	}
}