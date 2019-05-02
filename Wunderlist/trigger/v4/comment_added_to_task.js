const wunderlist_service = require("./wunderlist-http-service");
const update_task_service = require("./update-task-service");
module.exports = {
	name: "comment_added_to_task",
	label: "Comment Added to Task",
	version: "v4",
	input: {
		type: "object",
		title: "Comment Added to Task",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["comment_added_to_task"]
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
		"comment_added_to_task": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Comment Added to Task",
		"id": 110264,
		"type": "task_comment",
		"text": "Task completed",
		"version": 1,
		"revision": 1,
		"previous_revision": 0,
		"commenter_user_id": 876565,
		"commenter_user_name": "Shawn Doe",
		"commenter_user_email": "shawndoe@example.com",
		"commented_at": "2018-10-04T12:18:01.600Z",
		"task": {
			"id": 427701,
			"title": "Design login form",
			"type": "task",
			"url": "https://www.wunderlist.com/#/tasks/427701",
			"creator_user_id": 872155,
			"creator_user_name": "John Doe",
			"creator_user_email": "johndoe@example.com",
			"created_at": "2018-10-01T05:12:10.374Z",
			"assignee_user_id": 168459,
			"assignee_user_name": "Michel Addams",
			"assignee_user_email": "micheladdams@example.com",
			"due_date": "2018-10-25",
			"recurrence_type": "week",
			"recurrence_count": 12,
			"completed": false,
			"starred": true,
			"revision": 3
		},
		"user_id": 876555,
		"user_name": "Mark Doe",
		"user_email": "markdoe@example.com",
		"list_id": 3671830,
		"list_title": "My list",
		"list_url": "https://www.wunderlist.com/#/lists/3671830"
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
		if (!payload || (payload.operation && payload.operation !== "create") || (payload.data && payload.data.type !== "task_comment")) {
			return output(null, []);
		}
		Promise.all([
			wunderlist_service.getListDetails(input),
			wunderlist_service.getUsers(input),
			wunderlist_service.getTaskDetails(input, payload.data.task_id)
		]).then(promiseData => {
			outputObj.event_type = "Comment Added to Task";
			setValues(payload.data, outputObj, "id");
			setValues(payload.data, outputObj, "type");
			setValues(payload.data, outputObj, "text");
			setValues(payload, outputObj, "version");
			setValues(payload.data, outputObj, "revision");
			setValues(payload, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.user_id)[0], outputObj, "email", "user_email");
			setValues(payload.data, outputObj, "created_by_id", "commenter_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "name", "commenter_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payload.data.created_by_id)[0], outputObj, "email", "commenter_user_email");
			setValues(payload.data, outputObj, "created_at", "commented_at");
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