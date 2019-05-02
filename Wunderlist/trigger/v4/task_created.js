const wunderlist_service = require("./wunderlist-http-service");
module.exports = {
	name: "task_created",
	label: "Task Created",
	version: "v4",
	input: {
		type: "object",
		title: "Task Created",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["task_created"]
			},
			wunderlist: {
				type: "string",
				title: "List ID",
				minLength: 1,
				propertyOrder: 2,
				description: "Select/specify the ID of the list for which you want to set the trigger"
			},
			polling: {
				type: "boolean",
				default: false,
				options: {
					hidden: true
				}
			}
		}
	},
	output: {
		"task_created": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Task Created",
		"id": 428872,
		"type": "task",
		"title": "Design login form",
		"version": 1,
		"url": "https://www.wunderlist.com/#/tasks/428872",
		"user_id": 87655,
		"user_name": "Shawn Williams",
		"user_email": "shawnwilliams@example.com",
		"creator_user_id": 87615,
		"creator_user_name": "Mark Doe",
		"creator_user_email": "markdoe@example.com",
		"created_at": "2018-10-04T12:02:17.051Z",
		"assignee_user_id": 16849,
		"assignee_user_name": "John Addams",
		"assignee_user_email": "johnaddams@example.com",
		"due_date": "2018-10-25",
		"recurrence_type": "month",
		"recurrence_count": 1,
		"revision": 1,
		"starred": true,
		"completed": false,
		"is_recurrence_child": false,
		"updated_at": "2018-10-04T12:02:17.051Z",
		"previous_revision": 0,
		"list_id": 367130,
		"list_title": "Task Tracker",
		"list_url": "https://www.wunderlist.com/#/lists/367130"
	},
	mock_input: {},
	execute: function(input, payload, output) {
		var outputObj = {};

		function setValues(sourceObj, destinationObj, sourceKey, destinationKey) {
			if (sourceObj && (sourceObj[sourceKey] != null || sourceObj[sourceKey] != undefined)) {
				destinationObj[destinationKey || sourceKey] = sourceObj[sourceKey];
			} else {
				destinationObj[destinationKey || sourceKey] = null;
			}
		}
		try {
			payload = (typeof payload === "string") ? JSON.parse(payload) : payload;
		} catch (e) {
			return output("Error while parsing response");
		}
		if (!payload || (payload.operation && payload.operation !== "create") || (payload.subject && payload.subject.type !== "task")) {
			return output(null, []);
		}
		Promise.all([
			wunderlist_service.getListDetails(input),
			wunderlist_service.getUsers(input)
		]).then(promiseData => {
			outputObj.event_type = "Task Created";
			setValues(payload.subject, outputObj, "id");
			setValues(payload.subject, outputObj, "type");
			setValues(payload.data, outputObj, "title");
			outputObj.url = "https://www.wunderlist.com/#/tasks/" + payload.subject.id;
			setValues(payload, outputObj, "version");
			setValues(payload, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "email", "user_email");
			setValues(payload.data, outputObj, "created_by_id", "creator_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "name", "creator_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "email", "creator_user_email");
			setValues(payload.data, outputObj, "created_at");
			setValues(payload.data, outputObj, "assignee_id", "assignee_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.assignee_id)[0], outputObj, "name", "assignee_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.assignee_id)[0], outputObj, "email", "assignee_user_email");
			setValues(payload.data, outputObj, "due_date");
			setValues(payload.data, outputObj, "recurrence_type");
			setValues(payload.data, outputObj, "recurrence_count");
			setValues(payload.data, outputObj, "revision");
			setValues(payload.data, outputObj, "starred");
			setValues(payload.data, outputObj, "completed");
			setValues(payload.data, outputObj, "is_recurrence_child");
			setValues(payload.data, outputObj, "updated_at");
			setValues(payload.subject, outputObj, "previous_revision");
			setValues(payload.data, outputObj, "list_id");
			promiseData.length && promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			return output(null, outputObj);
		}).catch(error => {
			return output(error);
		});
	},
	register: function(input, output) {
		wunderlist_service.register_webhook(input).then((data) => {
			return output(null, data);
		}, error => {
			return output(error);
		});
	},
	unregister: function(input, options, output) {
		wunderlist_service.unregister_webhook(input).then(() => {
			return output(null, true);
		}, error => {
			return output(error);
		});
	},
	activate: function(input, options, output) {
		wunderlist_service.getUsers(input).then(() => {
			return output(null, true);
		}, error => {
			return output(error);
		});
	}
}