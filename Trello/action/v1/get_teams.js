var request = require('request');
const P = require('bluebird');
module.exports = {
	name: "get_teams",
	title: "Get Teams",
	description: "",
	version: "v1",
	input: {
		title: "Get Teams",
		type: "object",
		properties: {}
	},
	output: {
		"title": "output",
		"type": "object",
		"properties": {
			"teams": {
				"title": "teams",
				"type": "array",
				"displayTitle": "Teams",
				"items": {
					"type": "object",
					"properties": {
						"id": {
							"title": "id",
							"type": "string",
							"displayTitle": "Teams ID"
						},
						"name": {
							"title": "name",
							"type": "string",
							"displayTitle": "Teams Name"
						},
						"displayName": {
							"title": "displayName",
							"type": "string",
							"displayTitle": "Teams Displayname"
						},
						"desc": {
							"title": "desc",
							"type": "string",
							"displayTitle": "Teams Desc"
						},
						"descData": {
							"title": "descData",
							"type": "object",
							"displayTitle": "Teams Descdata",
							"properties": {
								"emoji": {
									"title": "emoji",
									"type": "object",
									"displayTitle": "Teams Descdata Emoji",
									"properties": {}
								}
							}
						},
						"idBoards": {
							"title": "idBoards",
							"type": "array",
							"displayTitle": "Teams IDBOARDS",
							"items": {
								"type": "string"
							}
						},
						"idEnterprise": {
							"title": "idEnterprise",
							"type": "any",
							"displayTitle": "Teams IDENTERPRISE"
						},
						"invited": {
							"title": "invited",
							"type": "boolean",
							"displayTitle": "Teams Invited"
						},
						"invitations": {
							"title": "invitations",
							"type": "array",
							"displayTitle": "Teams Invitations",
							"items": {
								"type": "any"
							}
						},
						"limits": {
							"title": "limits",
							"type": "object",
							"displayTitle": "Teams Limits",
							"properties": {
								"orgs": {
									"title": "orgs",
									"type": "object",
									"displayTitle": "Teams Limits Orgs",
									"properties": {
										"totalMembersPerOrg": {
											"title": "totalMembersPerOrg",
											"type": "object",
											"displayTitle": "Teams Limits Orgs Totalmembersperorg",
											"properties": {
												"status": {
													"title": "status",
													"type": "string",
													"displayTitle": "Teams Limits Orgs Totalmembersperorg Status"
												},
												"disableAt": {
													"title": "disableAt",
													"type": "number",
													"displayTitle": "Teams Limits Orgs Totalmembersperorg Disableat"
												},
												"warnAt": {
													"title": "warnAt",
													"type": "number",
													"displayTitle": "Teams Limits Orgs Totalmembersperorg Warnat"
												}
											}
										},
										"freeBoardsPerOrg": {
											"title": "freeBoardsPerOrg",
											"type": "object",
											"displayTitle": "Teams Limits Orgs Freeboardsperorg",
											"properties": {
												"status": {
													"title": "status",
													"type": "string",
													"displayTitle": "Teams Limits Orgs Freeboardsperorg Status"
												},
												"disableAt": {
													"title": "disableAt",
													"type": "number",
													"displayTitle": "Teams Limits Orgs Freeboardsperorg Disableat"
												},
												"warnAt": {
													"title": "warnAt",
													"type": "number",
													"displayTitle": "Teams Limits Orgs Freeboardsperorg Warnat"
												}
											}
										}
									}
								}
							}
						},
						"memberships": {
							"title": "memberships",
							"type": "array",
							"displayTitle": "Teams Memberships",
							"items": {
								"type": "object",
								"properties": {
									"id": {
										"title": "id",
										"type": "string",
										"displayTitle": "Teams Memberships ID"
									},
									"idMember": {
										"title": "idMember",
										"type": "string",
										"displayTitle": "Teams Memberships IDMEMBER"
									},
									"memberType": {
										"title": "memberType",
										"type": "string",
										"displayTitle": "Teams Memberships Membertype"
									},
									"unconfirmed": {
										"title": "unconfirmed",
										"type": "boolean",
										"displayTitle": "Teams Memberships Unconfirmed"
									},
									"deactivated": {
										"title": "deactivated",
										"type": "boolean",
										"displayTitle": "Teams Memberships Deactivated"
									}
								}
							}
						},
						"prefs": {
							"title": "prefs",
							"type": "object",
							"displayTitle": "Teams Prefs",
							"properties": {
								"permissionLevel": {
									"title": "permissionLevel",
									"type": "string",
									"displayTitle": "Teams Prefs Permissionlevel"
								},
								"orgInviteRestrict": {
									"title": "orgInviteRestrict",
									"type": "array",
									"displayTitle": "Teams Prefs Orginviterestrict",
									"items": {
										"type": "any"
									}
								},
								"externalMembersDisabled": {
									"title": "externalMembersDisabled",
									"type": "boolean",
									"displayTitle": "Teams Prefs Externalmembersdisabled"
								},
								"associatedDomain": {
									"title": "associatedDomain",
									"type": "any",
									"displayTitle": "Teams Prefs Associateddomain"
								},
								"googleAppsVersion": {
									"title": "googleAppsVersion",
									"type": "number",
									"displayTitle": "Teams Prefs Googleappsversion"
								},
								"boardVisibilityRestrict": {
									"title": "boardVisibilityRestrict",
									"type": "object",
									"displayTitle": "Teams Prefs Boardvisibilityrestrict",
									"properties": {
										"private": {
											"title": "private",
											"type": "string",
											"displayTitle": "Teams Prefs Boardvisibilityrestrict Private"
										},
										"org": {
											"title": "org",
											"type": "string",
											"displayTitle": "Teams Prefs Boardvisibilityrestrict Org"
										},
										"public": {
											"title": "public",
											"type": "string",
											"displayTitle": "Teams Prefs Boardvisibilityrestrict Public"
										}
									}
								},
								"attachmentRestrictions": {
									"title": "attachmentRestrictions",
									"type": "any",
									"displayTitle": "Teams Prefs Attachmentrestrictions"
								}
							}
						},
						"powerUps": {
							"title": "powerUps",
							"type": "array",
							"displayTitle": "Teams Powerups",
							"items": {
								"type": "any"
							}
						},
						"products": {
							"title": "products",
							"type": "array",
							"displayTitle": "Teams Products",
							"items": {
								"type": "any"
							}
						},
						"billableMemberCount": {
							"title": "billableMemberCount",
							"type": "number",
							"displayTitle": "Teams Billablemembercount"
						},
						"activeBillableMemberCount": {
							"title": "activeBillableMemberCount",
							"type": "number",
							"displayTitle": "Teams Activebillablemembercount"
						},
						"billableCollaboratorCount": {
							"title": "billableCollaboratorCount",
							"type": "number",
							"displayTitle": "Teams Billablecollaboratorcount"
						},
						"url": {
							"title": "url",
							"type": "string",
							"displayTitle": "Teams URL"
						},
						"website": {
							"title": "website",
							"type": "string",
							"displayTitle": "Teams Website"
						},
						"logoHash": {
							"title": "logoHash",
							"type": "any",
							"displayTitle": "Teams Logohash"
						},
						"logoUrl": {
							"title": "logoUrl",
							"type": "any",
							"displayTitle": "Teams Logourl"
						},
						"premiumFeatures": {
							"title": "premiumFeatures",
							"type": "array",
							"displayTitle": "Teams Premiumfeatures",
							"items": {
								"type": "any"
							}
						},
						"enterpriseJoinRequest": {
							"title": "enterpriseJoinRequest",
							"type": "object",
							"displayTitle": "Teams Enterprisejoinrequest",
							"properties": {}
						},
						"availableLicenseCount": {
							"title": "availableLicenseCount",
							"type": "any",
							"displayTitle": "Teams Availablelicensecount"
						},
						"maximumLicenseCount": {
							"title": "maximumLicenseCount",
							"type": "any",
							"displayTitle": "Teams Maximumlicensecount"
						}
					}
				}
			}
		}
	},
	mock_input: {},
	execute: function(input, output) {
		var option = {
			url: "https://api.trello.com/1/members/me/organizations?filter=all",
			qs: {
				key: input.auth.key,
				token: input.auth.access_token,
			},
			field: "Invalid Organization ID"
		};
		requestCall(option).then((body) => {
			return output(null, {
				teams: body
			});
		}).catch((err) => {
			if (err === 'invalid value for idList' || err === 'Invalid objectId') {
				return output('Invalid Organization ID entered');
			} else if (err == 'invalid id' || err == 'board not found') {
				return output('Invalid Organization ID')
			} else {
				return output(err);
			}
		})
	}
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


var input = {
 auth: {}

}


module.exports.execute(input, (e, d) => {

  if (e) return console.log(e)
  console.log('result ', d)
})
