var request = require('request');
const P = require('bluebird');
module.exports = {
	name: "get_team_boards",
	title: "Get Team Boards",
	description: "",
	version: "v1",
	input: {
		title: "Get Team Boards",
		type: "object",
		properties: {
			"team_id": {
				"title": "Team ID",
				"type": "string",
				"propertyOrder": 2,
				"description": "Select/specify the ID of the team of which boards you want to retrieve",
				"minLength": 1
			}
		}
	},
	output: {
		"title": "output",
		"type": "object",
		"properties": {
			"boards": {
				"title": "boards",
				"type": "array",
				"displayTitle": "Boards",
				"items": {
					"type": "object",
					"properties": {
						"name": {
							"title": "name",
							"type": "string",
							"displayTitle": "Boards Name"
						},
						"desc": {
							"title": "desc",
							"type": "string",
							"displayTitle": "Boards Desc"
						},
						"descData": {
							"title": "descData",
							"type": "any",
							"displayTitle": "Boards Descdata"
						},
						"closed": {
							"title": "closed",
							"type": "boolean",
							"displayTitle": "Boards Closed"
						},
						"idOrganization": {
							"title": "idOrganization",
							"type": "string",
							"displayTitle": "Boards IDORGANIZATION"
						},
						"limits": {
							"title": "limits",
							"type": "any",
							"displayTitle": "Boards Limits"
						},
						"pinned": {
							"title": "pinned",
							"type": "any",
							"displayTitle": "Boards Pinned"
						},
						"shortLink": {
							"title": "shortLink",
							"type": "string",
							"displayTitle": "Boards Shortlink"
						},
						"powerUps": {
							"title": "powerUps",
							"type": "array",
							"displayTitle": "Boards Powerups",
							"items": {
								"type": "any"
							}
						},
						"dateLastActivity": {
							"title": "dateLastActivity",
							"type": "any",
							"displayTitle": "Boards Datelastactivity"
						},
						"idTags": {
							"title": "idTags",
							"type": "array",
							"displayTitle": "Boards IDTAGS",
							"items": {
								"type": "any"
							}
						},
						"datePluginDisable": {
							"title": "datePluginDisable",
							"type": "any",
							"displayTitle": "Boards Dateplugindisable"
						},
						"creationMethod": {
							"title": "creationMethod",
							"type": "any",
							"displayTitle": "Boards Creationmethod"
						},
						"id": {
							"title": "id",
							"type": "string",
							"displayTitle": "Boards ID"
						},
						"starred": {
							"title": "starred",
							"type": "boolean",
							"displayTitle": "Boards Starred"
						},
						"url": {
							"title": "url",
							"type": "string",
							"displayTitle": "Boards URL"
						},
						"prefs": {
							"title": "prefs",
							"type": "object",
							"displayTitle": "Boards Prefs",
							"properties": {
								"permissionLevel": {
									"title": "permissionLevel",
									"type": "string",
									"displayTitle": "Boards Prefs Permissionlevel"
								},
								"voting": {
									"title": "voting",
									"type": "string",
									"displayTitle": "Boards Prefs Voting"
								},
								"comments": {
									"title": "comments",
									"type": "string",
									"displayTitle": "Boards Prefs Comments"
								},
								"invitations": {
									"title": "invitations",
									"type": "string",
									"displayTitle": "Boards Prefs Invitations"
								},
								"selfJoin": {
									"title": "selfJoin",
									"type": "boolean",
									"displayTitle": "Boards Prefs Selfjoin"
								},
								"cardCovers": {
									"title": "cardCovers",
									"type": "boolean",
									"displayTitle": "Boards Prefs Cardcovers"
								},
								"cardAging": {
									"title": "cardAging",
									"type": "string",
									"displayTitle": "Boards Prefs Cardaging"
								},
								"calendarFeedEnabled": {
									"title": "calendarFeedEnabled",
									"type": "boolean",
									"displayTitle": "Boards Prefs Calendarfeedenabled"
								},
								"background": {
									"title": "background",
									"type": "string",
									"displayTitle": "Boards Prefs Background"
								},
								"backgroundImage": {
									"title": "backgroundImage",
									"type": "string",
									"displayTitle": "Boards Prefs Backgroundimage"
								},
								"backgroundImageScaled": {
									"title": "backgroundImageScaled",
									"type": "array",
									"displayTitle": "Boards Prefs Backgroundimagescaled",
									"items": {
										"type": "object",
										"properties": {
											"width": {
												"title": "width",
												"type": "number",
												"displayTitle": "Boards Prefs Backgroundimagescaled WIDTH"
											},
											"height": {
												"title": "height",
												"type": "number",
												"displayTitle": "Boards Prefs Backgroundimagescaled Height"
											},
											"url": {
												"title": "url",
												"type": "string",
												"displayTitle": "Boards Prefs Backgroundimagescaled URL"
											}
										}
									}
								},
								"backgroundTile": {
									"title": "backgroundTile",
									"type": "boolean",
									"displayTitle": "Boards Prefs Backgroundtile"
								},
								"backgroundBrightness": {
									"title": "backgroundBrightness",
									"type": "string",
									"displayTitle": "Boards Prefs Backgroundbrightness"
								},
								"backgroundBottomColor": {
									"title": "backgroundBottomColor",
									"type": "string",
									"displayTitle": "Boards Prefs Backgroundbottomcolor"
								},
								"backgroundTopColor": {
									"title": "backgroundTopColor",
									"type": "string",
									"displayTitle": "Boards Prefs Backgroundtopcolor"
								},
								"canBePublic": {
									"title": "canBePublic",
									"type": "boolean",
									"displayTitle": "Boards Prefs Canbepublic"
								},
								"canBeOrg": {
									"title": "canBeOrg",
									"type": "boolean",
									"displayTitle": "Boards Prefs Canbeorg"
								},
								"canBePrivate": {
									"title": "canBePrivate",
									"type": "boolean",
									"displayTitle": "Boards Prefs Canbeprivate"
								},
								"canInvite": {
									"title": "canInvite",
									"type": "boolean",
									"displayTitle": "Boards Prefs Caninvite"
								}
							}
						},
						"subscribed": {
							"title": "subscribed",
							"type": "boolean",
							"displayTitle": "Boards Subscribed"
						},
						"labelNames": {
							"title": "labelNames",
							"type": "object",
							"displayTitle": "Boards Labelnames",
							"properties": {
								"green": {
									"title": "green",
									"type": "string",
									"displayTitle": "Boards Labelnames Green"
								},
								"yellow": {
									"title": "yellow",
									"type": "string",
									"displayTitle": "Boards Labelnames Yellow"
								},
								"orange": {
									"title": "orange",
									"type": "string",
									"displayTitle": "Boards Labelnames Orange"
								},
								"red": {
									"title": "red",
									"type": "string",
									"displayTitle": "Boards Labelnames Red"
								},
								"purple": {
									"title": "purple",
									"type": "string",
									"displayTitle": "Boards Labelnames Purple"
								},
								"blue": {
									"title": "blue",
									"type": "string",
									"displayTitle": "Boards Labelnames Blue"
								},
								"sky": {
									"title": "sky",
									"type": "string",
									"displayTitle": "Boards Labelnames Sky"
								},
								"lime": {
									"title": "lime",
									"type": "string",
									"displayTitle": "Boards Labelnames Lime"
								},
								"pink": {
									"title": "pink",
									"type": "string",
									"displayTitle": "Boards Labelnames Pink"
								},
								"black": {
									"title": "black",
									"type": "string",
									"displayTitle": "Boards Labelnames Black"
								}
							}
						},
						"dateLastView": {
							"title": "dateLastView",
							"type": "string",
							"displayTitle": "Boards Datelastview"
						},
						"shortUrl": {
							"title": "shortUrl",
							"type": "string",
							"displayTitle": "Boards Shorturl"
						},
						"memberships": {
							"title": "memberships",
							"type": "array",
							"displayTitle": "Boards Memberships",
							"items": {
								"type": "object",
								"properties": {
									"id": {
										"title": "id",
										"type": "string",
										"displayTitle": "Boards Memberships ID"
									},
									"idMember": {
										"title": "idMember",
										"type": "string",
										"displayTitle": "Boards Memberships IDMEMBER"
									},
									"memberType": {
										"title": "memberType",
										"type": "string",
										"displayTitle": "Boards Memberships Membertype"
									},
									"unconfirmed": {
										"title": "unconfirmed",
										"type": "boolean",
										"displayTitle": "Boards Memberships Unconfirmed"
									},
									"deactivated": {
										"title": "deactivated",
										"type": "boolean",
										"displayTitle": "Boards Memberships Deactivated"
									}
								}
							}
						}
					}
				}
			}
		}
	},
	execute: function(input, output) {
		var option = {
			url: "https://api.trello.com/1/organizations/" + input.team_id + "/boards",
			qs: {
				key: input.auth.key,
				token: input.auth.access_token,
			},
			field: "Invalid Team ID"
		};
		requestCall(option).then((boards) => {
			flatten_schema(boards, 'prefs');
			return output(null, {
				boards: boards
			});
		}).catch((err) => {
			if (err === 'invalid value for idList' || err === 'Invalid objectId') {
				return output('Invalid Team ID entered');
			} else if (err == 'invalid id' || err == 'model not found') {
				return output('Invalid Team ID')
			} else {
				return output(err);
			}
		})
	}
}

function flatten_schema(body, val) {
	body.forEach(element => {
		if (element[val]) {
			Object.keys(element[val]).map(function(m) {
				element[m] = element[val][m];
			});
			delete element[val]
		}
	});
}

function requestCall(options) {
	if (options.field) {
		var value = options.field
		delete options.field
	}
	return new P(function(resolve, reject) {
		request(options, function(err, res, data) {
			if (err) {
				return reject(err);
			}
			try {
				if (data && typeof data === "string") {
					data = JSON.parse(data);
				}
			} catch (e) {
				if (data == 'invalid id') {
					data = value
				}
				return reject(data);
			}
			if (res && res.statusCode === 200) {
				return resolve(data);
			} else {
				if (data == 'invalid id') {
					data = value
				}
				return reject(data);
			}
		})
	})
}