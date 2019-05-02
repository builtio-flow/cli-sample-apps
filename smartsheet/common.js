const request = require("request")
const baseURL = "https://api.smartsheet.com/2.0/webhooks"

module.exports = {
	fieldValidation: function (input) {

		return new Promise((resolve, reject) => {

			request({
				method: "GET",
				url: "https://api.smartsheet.com/2.0/sheets/" + input.sheetID,
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {

				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 404)
					return reject("Sheet ID not found, please select or enter correct Sheet ID")

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				return resolve("success")
			})
		})
	},

	fieldColumnValidation: function (input, columnID) {

		return new Promise((resolve, reject) => {

			request({
				method: "GET",
				url: "https://api.smartsheet.com/2.0/sheets/" + input.sheetID + "/columns/" + columnID,
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {

				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 404)
					return reject("Column ID not found, please select or enter correct Column ID")

				if (resp.statusCode == 401)
					return reject("Unauthorized access")


				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				return resolve("column valid")
			})
		})
	},

	fieldCellUpdatedValidation: function (input) {

		return new Promise((resolve, reject) => {
			this.fieldValidation(input)
				.then(() => {
					return Promise.all(input.columns.map(column => {

						if (!column.columnID) {
							return new Promise(resolve => resolve())
						}
						else {
							return this.fieldColumnValidation(input, column.columnID)
								.then(() => {
									return new Promise((resolve, reject) => {
										if (column.columnValue) {
											request({
												method: "GET",
												url: "https://api.smartsheet.com/2.0/sheets/" + input.sheetID + "/columns/" + column.columnID,
												headers: {
													"Authorization": "Bearer " + input.auth.access_token,
													"User-Agent": "built.io Flow"
												}
											}, (err, resp, body) => {

												if (err) {
													return reject("Error while making request to client")
												}

												try {
													body = (typeof body === "string") ? JSON.parse(body) : body
												}
												catch (error) {
													return reject("Unable to parse request")
												}

												if (resp.statusCode == 200) {
													if (body && body.type) {
														if (!column.columnValue) {
															resolve()
														} else {
															let columnName = body.title || ""
															switch (body.type) {
																case "DATE":
																	if (Date.parse(column.columnValue)) {
																		resolve()
																	} else {
																		reject("column with name " + columnName + " has invalid value for date, please put the date in yyyy-mm-dd format")
																	}
																	break
																case "CHECKBOX":
																	if (
																		[1, "check", "true", "checked", 0, "uncheck", "false", "unchecked"].findIndex(
																			item => item == column.columnValue.toLowerCase()
																		) != -1
																	) {
																		resolve()
																	} else {
																		reject("column with name " + columnName + " has invalid value for checkbox which should be true or false")
																	}
																	break
																case "CONTACT_LIST" || "MULTI_CONTACT_LIST":
																	if (
																		body.contactOptions && body.contactOptions.findIndex(option => {
																			return (option.email && option.email.toLowerCase() == column.columnValue.toLowerCase()) ||
																				(option.name && option.name.toLowerCase() == column.columnValue.toLowerCase())
																		}) != -1
																	) {
																		resolve()
																	} else {
																		reject("column with name " + columnName + " has invalid contact")
																	}
																	resolve()
																	break
																case "PICKLIST":
																	if (
																		body.options && body.options.findIndex(option => {
																			return option.toLowerCase() == column.columnValue.toLowerCase()
																		}) != -1
																	) {
																		resolve()
																	} else {
																		reject("column with name " + columnName + " has invalid value")
																	}
																	break
																case "TEXT_NUMBER":
																	resolve()
																	break
																default:
																	resolve()
															}
														}
													} else {
														reject("Unexpected response received from client")
													}
												} else if (resp.statusCode == 404) {
													return reject("Column ID not found, please select or enter correct Column ID")
												}
												if (resp.statusCode == 401) {
													return reject("Unauthorized access")
												} else {
													if (body && body.message)
														return reject(body.message)
													else if (body)
														return reject(body)
													else
														return reject("Something went wrong")
												}
											})
										} else {
											resolve()
										}
									})

								})
								.catch(err => {
									reject(err)
								})
						}


					})).then(arr => {
						if (arr) {
							resolve("valid")
						}
					}).catch(e => {
						reject(e)
					})

				}).catch(e => {
					reject(e)
				})
		})
	},

	webhookRegistration: function (input) {

		return new Promise((resolve, reject) => {

			let webhookConfig = {
				name: "built.io Flow Webhook",
				callbackUrl: input.webhook,
				scope: "sheet",
				scopeObjectId: String(input.sheetID).trim(),
				version: 1,
				events: ["*.*"]
			}

			request({
				method: "POST",
				url: baseURL,
				headers: {
					"Authorization": "Bearer " + input.auth.access_token
				},
				json: webhookConfig,
			}
				, function (err, resp, body) {

					if (err) {
						return reject("Error while making request to client")
					}

					try {
						body = (typeof body === "string") ? JSON.parse(body) : body
					}
					catch (error) {
						return reject("Unable to parse request")
					}

					if (resp.statusCode == 404)
						return reject("Please select a sufficient set of permissions to connect Built.io Flow")

					if (resp.statusCode == 401)
						return reject("Unauthorized access")

					if (resp.statusCode !== 200) {
						if (body && body.message)
							return reject(body.message)
						else if (body)
							return reject(body)
						else
							return reject("Something went wrong")
					}

					request({
						method: "PUT",
						url: baseURL + "/" + body.result.id,
						headers: {
							"Authorization": "Bearer " + input.auth.access_token
						},
						json: {
							enabled: true
						}
					}
						, function (err, resp, _body) {
							if (err) {
								return reject("Error while making request to client")
							}
							try {
								_body = (typeof _body === "string") ? JSON.parse(_body) : _body
							}
							catch (error) {
								return reject("Unable to parse request")
							}

							if (resp.statusCode == 404)
								return reject("Please select a sufficient set of permissions to connect Built.io Flow")

							if (resp.statusCode == 401)
								return reject("Unauthorized access")

							if (resp.statusCode !== 200) {
								if (_body && _body.message)
									return reject(_body.message)
								else if (_body)
									return reject(_body)
								else
									return reject("Something went wrong")
							}
							return resolve(_body)
						})
				})
		})
	},

	getSheet: function (input, sheetID) {
		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")
			})
		})
	},

	getRow: function (input, sheetID, rowID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/rows/" + rowID + "?include=rowWriterInfo,rowPermalink",
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")
			})
		})
	},

	getDiscussion: function (input, sheetID, discussionID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/discussions/" + discussionID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")

			})
		})
	},

	getComment: function (input, sheetID, commentID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/comments/" + commentID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")

			})
		})
	},

	getAttachment: function (input, sheetID, attachmentID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/attachments/" + attachmentID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}

				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")
			})
		})
	},

	getColumn: function (input, sheetID, columnID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/columns/" + columnID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}


				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")

			})
		})
	},

	getCellDetails: function (input, sheetID, rowID, columnID) {

		return new Promise(function (resolve, reject) {

			request({
				url: "https://api.smartsheet.com/2.0/sheets/" + sheetID + "/rows/" + rowID + "/columns/" + columnID + "/history",
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, body) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					body = (typeof body === "string") ? JSON.parse(body) : body
				}
				catch (error) {
					return reject("Unable to parse request")
				}


				if (resp.statusCode == 401)
					return reject("Unauthorized access")

				if (resp.statusCode !== 200) {
					if (body && body.message)
						return reject(body.message)
					else if (body)
						return reject(body)
					else
						return reject("Something went wrong")
				}

				if (body)
					return resolve(body)
				else
					return reject("Body not found")

			})
		})
	},

	getDetails: function (input, sheetID, userID, event) {

		return new Promise((resolve, reject) => {

			this.getSheet(input, sheetID)
				.then(sheet => {

					if (sheet) {
						return this.getUserDetails(input, userID).then(user => {
							if (user) {
								let body = {
									"event_type": event,
									"sheet_id": sheet.id,
									"sheet_name": sheet.name,
									"sheet_version": sheet.version,
									"sheet_url": sheet.permalink,
									"sheet_total_row_count": sheet.totalRowCount,
									"sheet_created_at": sheet.createdAt,
									"sheet_modified_at": sheet.modifiedAt,
									"event_generated_by": user,
									"row_details": null,
									"column_details": null,
									"comment_details": null,
									"attachment_details": null
								}
								return resolve(body)
							}
						}).catch(err => {
							return reject(err)
						})
					}
				})
				.catch(err => {
					return reject(err)
				})
		})
	},

	getUserDetails: function (input, userID) {

		return new Promise((resolve, reject) => {

			request({
				url: "https://api.smartsheet.com/2.0/users/" + userID,
				method: "GET",
				headers: {
					"Authorization": "Bearer " + input.auth.access_token,
					"User-Agent": "built.io Flow"
				}
			}, function (err, resp, user) {
				if (err) {
					return reject("Error while making request to client")
				}

				try {
					user = (typeof user === "string") ? JSON.parse(user) : user
				}
				catch (error) {
					return reject("Unable to parse request")
				}
				if (resp.statusCode == 200) {

					let modifiedUser = {
						"email": user.email,
						"name": String(user.firstName + " " + user.lastName)
					}
					return resolve(modifiedUser)
				} else if ((resp.statusCode == 403 && user.errorCode == 1013) || (resp.statusCode == 404 && user.errorCode == 1020)) {
					request({
						url: "https://api.smartsheet.com/2.0/users/me",
						method: "GET",
						headers: {
							"Authorization": "Bearer " + input.auth.access_token,
							"User-Agent": "built.io Flow"
						}
					}, function (err, resp, _user) {
						if (err) {
							return reject("Error while making request to client")
						}

						try {
							_user = (typeof _user === "string") ? JSON.parse(_user) : _user
						}
						catch (error) {
							return reject("Unable to parse request")
						}

						if (resp.statusCode == 200) {

							let _modifiedUser = {
								"email": _user.email,
								"name": String(_user.firstName + " " + _user.lastName)
							}
							return resolve(_modifiedUser)
						} else if (resp.statusCode !== 200) {
							return reject(JSON.parse(err))
						} else {
							return reject("User not found")
						}
					})
				} else if (resp.statusCode !== 200) {
					if (err) {
						return reject(JSON.parse(err))
					}
					else if (user && user.message) {
						return reject(JSON.parse(user.message))
					}
				} else {
					return reject("Unknown error found")
				}
			})

		})
	},

	getOldRow: function (input, sheetID, rowID) {
		return new Promise((resolve, reject) => {

			this.getRow(input, sheetID, rowID)
				.then(row => {

					if (row) {
						let arr = row.cells.map(cell => {
							return new Promise((_resolve, _reject) => {
								return this.getCellDetails(input, sheetID, rowID, cell.columnId)
									.then(response => {
										if (response && response.data.length >= 2) {
											return _resolve(response.data[1])
										}
										else if (response && response.data) {
											return _resolve()
										}
									}).catch(err => {
										return _reject(err)
									})
							})
						})
						Promise.all(arr).then((arr) => {

							let final_arr = arr.filter(x => x)
							return resolve(final_arr)
						})
							.catch(err => {
								return reject(err)
							})
					}
				})
				.catch(err => {
					return reject(err)
				})
		})
	}
}