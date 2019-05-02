const wunderlist_service = require("./wunderlist-http-service");
module.exports = {
	name: "task_completed",
	label: "Task Completed",
	version: "v4",
	input: {
		type: "object",
		title: "Task Completed",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["task_completed"]
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
		"task_completed": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Task Completed",
		"id": 42878783,
		"type": "task",
		"title": "Design login form",
		"url": "https://www.wunderlist.com/#/tasks/42878783",
		"version": 1,
		"user_id": 876155,
		"user_name": "Shawn Williams",
		"user_email": "shawnwilliams@example.com",
		"creator_user_id": 876512,
		"creator_user_name": "Mark Doe",
		"creator_user_email": "markdoe@example.com",
		"created_at": "2018-10-04T12:27:19.521Z",
		"assignee_user_id": 186849,
		"assignee_user_name": "John doe",
		"assignee_user_email": "johndoe@example.com",
		"completed": true,
		"completed_user_id": 872155,
		"completed_user_name": "Shawn Doe",
		"completed_user_email": "shawndoe@example.com",
		"completed_at": "2018-10-04T12:31:30.400Z",
		"updater_user_id": 876055,
		"updater_user_name": "Jack Williams",
		"updater_user_email": "jackwilliams@example.com",
		"updated_at": "2018-10-04T12:31:30.402Z",
		"due_date": "2018-10-17",
		"revision": 3,
		"starred": true,
		"is_recurrence_child": false,
		"previous_revision": 34,
		"list_id": 367184,
		"list_title": "Task Tracker",
		"list_url": "https://www.wunderlist.com/#/lists/367184"
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
		if (!payload || (payload.operation && payload.operation !== "update") || (payload.subject && payload.subject.type !== "task") || (payload.data && !payload.data.completed)) {
			return output(null, []);
		}
		Promise.all([
			wunderlist_service.getListDetails(input),
			wunderlist_service.getUsers(input)
		]).then(promiseData => {
			outputObj.event_type = "Task Completed";
			setValues(payload.subject, outputObj, "id");
			setValues(payload.subject, outputObj, "type");
			setValues(payload.after, outputObj, "title");
			outputObj.url = "https://www.wunderlist.com/#/tasks/" + payload.subject.id;
			setValues(payload, outputObj, "version");
			setValues(payload, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "email", "user_email");
			setValues(payload.after, outputObj, "created_by_id", "creator_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.created_by_id)[0], outputObj, "name", "creator_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.created_by_id)[0], outputObj, "email", "creator_user_email");
			setValues(payload.after, outputObj, "created_at");
			setValues(payload.after, outputObj, "assignee_id", "assignee_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after["assignee_id"])[0], outputObj, "name", "assignee_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after["assignee_id"])[0], outputObj, "email", "assignee_user_email");
			setValues(payload.after, outputObj, "completed");
			setValues(payload.after, outputObj, "completed_by_id", "completed_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.completed_by_id)[0], outputObj, "name", "completed_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.completed_by_id)[0], outputObj, "email", "completed_user_email");
			setValues(payload.after, outputObj, "completed_at");
			setValues(payload.after, outputObj, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.updated_by_id)[0], outputObj, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.updated_by_id)[0], outputObj, "email", "updater_user_email");
			setValues(payload.after, outputObj, "updated_at");
			setValues(payload.after, outputObj, "due_date");
			setValues(payload.after, outputObj, "recurrence_type");
			setValues(payload.after, outputObj, "recurrence_count");
			setValues(payload.after, outputObj, "revision");
			setValues(payload.after, outputObj, "starred");
			setValues(payload.after, outputObj, "is_recurrence_child");
			setValues(payload.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
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