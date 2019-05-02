const wunderlist_service = require("./wunderlist-http-service");
const update_task_service = require("./update-task-service");
module.exports = {
	name: "subtask_created",
	label: "Subtask Created",
	version: "v4",
	input: {
		type: "object",
		title: "Subtask Created",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["subtask_created"]
			},
			wunderlist: {
				type: "string",
				title: "List ID",
				minLength: 1,
				propertyOrder: 2,
				description: "Select/specify the ID of the list for which you want to set the trigger"
			},
			wunderlist_tasks: {
				type: "string",
				title: "Task ID",
				propertyOrder: 3,
				description: "Select/specify the ID of the task for which you want to set the trigger"
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
		"subtask_created": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Subtask Created",
		"id": 16331994,
		"type": "subtask",
		"title": "Add input fields",
		"version": 1,
		"revision": 1,
		"creator_user_id": 876155,
		"creator_user_name": "Shawn Doe",
		"creator_user_email": "shawndoe@example.com",
		"created_at": "2018-10-04T12:27:19.521Z",
		"user_id": 872155,
		"user_name": "Mark Williams",
		"user_email": "markwilliams@example.com",
		"completed": false,
		"updated_at": "2018-10-04T12:27:19.521Z",
		"task": {
			"id": 4277271,
			"title": "Design login form",
			"type": "task",
			"url": "https://www.wunderlist.com/#/tasks/4277271",
			"creator_user_id": 876155,
			"creator_user_name": "Shawn Addams",
			"creator_user_email": "shawnaddams@example.com",
			"created_at": "2018-10-01T05:12:10.374Z",
			"assignee_user_id": 168479,
			"assignee_user_name": "Jack Williams",
			"assignee_user_email": "jackwilliams@example.com",
			"completed": false,
			"completed_user_id": 876155,
			"completed_user_name": "Dean Williams",
			"completed_user_email": "deanwilliams@example.com",
			"completed_at": "2018-10-07T08:20:24.582Z",
			"due_date": "2018-10-25",
			"recurrence_type": "week",
			"recurrence_count": 12,
			"starred": true,
			"revision": 36
		},
		"previous_revision": 0,
		"list_id": 3674230,
		"list_title": "Task Tracker",
		"list_url": "https://www.wunderlist.com/#/lists/3674230"
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
		if (!payload || (payload.operation && payload.operation !== "create") || (payload.subject && payload.subject.type !== "subtask") || (input.wunderlist_tasks && input.wunderlist_tasks != payload.data.task_id)) {
			return output(null, []);
		}
		Promise.all([
			wunderlist_service.getListDetails(input),
			wunderlist_service.getUsers(input),
			wunderlist_service.getTaskDetails(input, payload.data.task_id)
		]).then(promiseData => {
			outputObj.event_type = "Subtask Created";
			setValues(payload.data, outputObj, "id");
			setValues(payload.subject, outputObj, "type");
			setValues(payload.data, outputObj, "title");
			setValues(payload, outputObj, "version");
			setValues(payload.data, outputObj, "revision");
			setValues(payload.data, outputObj, "created_by_id", "creator_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "name", "creator_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "email", "creator_user_email");
			setValues(payload.data, outputObj, "created_at");
			setValues(payload, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "email", "user_email");
			setValues(payload.data, outputObj, "completed");
			setValues(payload.data, outputObj, "updated_at");
			outputObj.task = {};
			if (promiseData[2]) {
				update_task_service.set_task_data(promiseData[2], outputObj.task, promiseData)
			}
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
		if (input.wunderlist_tasks && String(input.wunderlist_tasks).trim()) {
			wunderlist_service.getTaskDetails(input, input.wunderlist_tasks).then(() => {
				wunderlist_service.register_webhook(input).then((data) => {
					return output(null, data);
				}, error => {
					return output(error);
				});
			}, error => {
				return output(error);
			});
		} else {
			wunderlist_service.register_webhook(input).then((data) => {
				return output(null, data);
			}, error => {
				return output(error);
			});
		}
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