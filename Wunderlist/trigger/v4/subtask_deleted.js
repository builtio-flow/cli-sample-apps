const wunderlist_service = require("./wunderlist-http-service");
const update_task_service = require("./update-task-service");
module.exports = {
	name: "subtask_deleted",
	label: "Subtask Deleted",
	version: "v4",
	input: {
		type: "object",
		title: "Subtask Deleted",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["subtask_deleted"]
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
		"subtask_deleted": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Subtask Deleted",
		"id": 1633129994,
		"type": "subtask",
		"title": "Add input fields",
		"version": 1,
		"revision": 3,
		"user_id": 876155,
		"user_name": "Shawn Williams",
		"user_email": "shawnwilliams@example.com",
		"creator_user_id": 876512,
		"creator_user_name": "Mark Doe",
		"creator_user_email": "markdoe@example.com",
		"created_at": "2018-10-04T12:27:19.521Z",
		"completed": true,
		"completed_user_id": 872155,
		"completed_user_name": "Shawn Doe",
		"completed_user_email": "shawndoe@example.com",
		"completed_at": "2018-10-04T12:31:30.400Z",
		"updater_user_id": 876055,
		"updater_user_name": "Jack Williams",
		"updater_user_email": "jackwilliams@example.com",
		"updated_at": "2018-10-04T12:31:30.402Z",
		"deleted_user_id": 876125,
		"deleted_user_name": "Salian Doe",
		"deleted_user_email": "saliandoe@example.com",
		"deleted_at": "2018-10-04 12:37:37 UTC",
		"task": {
			"id": 4277271,
			"title": "Design login form",
			"type": "task",
			"url": "https://www.wunderlist.com/#/tasks/4277271",
			"creator_user_id": 872355,
			"creator_user_name": "Steave Addams",
			"creator_user_email": "steaveaddams@example.com",
			"created_at": "2018-10-01T05:12:10.374Z",
			"assignee_user_id": 168479,
			"assignee_user_name": "Dean Williams",
			"assignee_user_email": "deanwilliams@example.com",
			"completed": true,
			"completed_user_id": 876155,
			"completed_user_name": "Dean Williams",
			"completed_user_email": "deanwilliams@example.com",
			"completed_at": "2018-10-07T08:20:24.582Z",
			"due_date": "2018-10-25",
			"recurrence_type": "week",
			"recurrence_count": 12,
			"starred": true,
			"revision": 37
		},
		"previous_revision": 2,
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
		if (!payload || (payload.operation && payload.operation !== "delete") || (payload.subject && payload.subject.type !== "subtask") || (input.wunderlist_tasks && input.wunderlist_tasks != payload.after.task_id)) {
			return output(null, []);
		}
		Promise.all([
			wunderlist_service.getListDetails(input),
			wunderlist_service.getUsers(input),
			wunderlist_service.getTaskDetails(input, payload.after.task_id)
		]).then(promiseData => {
			outputObj.event_type = "Subtask Deleted";
			setValues(payload.after, outputObj, "id");
			setValues(payload.subject, outputObj, "type");
			setValues(payload.after, outputObj, "title");
			setValues(payload, outputObj, "version");
			setValues(payload.data, outputObj, "revision");
			setValues(payload, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "email", "user_email");
			setValues(payload.after, outputObj, "created_by_id", "creator_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.created_by_id)[0], outputObj, "name", "creator_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.created_by_id)[0], outputObj, "email", "creator_user_email");
			setValues(payload.after, outputObj, "created_at");
			setValues(payload.after, outputObj, "completed");
			setValues(payload.after, outputObj, "completed_by_id", "completed_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.completed_by_id)[0], outputObj, "name", "completed_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.completed_by_id)[0], outputObj, "email", "completed_user_email");
			setValues(payload.after, outputObj, "completed_at");
			setValues(payload.after, outputObj, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.updated_by_id)[0], outputObj, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.after.updated_by_id)[0], outputObj, "email", "updater_user_email");
			setValues(payload.data, outputObj, "updated_at");
			setValues(payload.data, outputObj, "deleted_by_id", "deleted_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.deleted_by_id)[0], outputObj, "name", "deleted_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.deleted_by_id)[0], outputObj, "email", "deleted_user_email");
			setValues(payload.data, outputObj, "deleted_at");
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