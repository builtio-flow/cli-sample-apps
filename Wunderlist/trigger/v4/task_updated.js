const wunderlist_service = require("./wunderlist-http-service");
const update_task_service = require("./update-task-service");
module.exports = {
	name: "task_updated",
	label: "Task Updated",
	version: "v4",
	input: {
		type: "object",
		title: "Task Updated",
		description: "Short description",
		properties: {
			event: {
				type: "string",
				enum: ["task_updated"]
			},
			wunderlist: {
				type: "string",
				title: "List ID",
				minLength: 1,
				propertyOrder: 2,
				description: "Select/specify the ID of the list for which you want to set the trigger"
			},
			event_filters: {
				type: "array",
				title: "Filters",
				propertyOrder: 3,
				description: "Provides the list of filters by which you want to filter the result",
				items: {
					title: "item",
					type: "object",
					properties: {
						filtername: {
							title: "Filter Type",
							type: "string",
							description: "Select the type of the filter by which you want to filter the result",
							enum: ["Task Modified", "Task Assigned", "Task Note Added", "Task Attachment Added", "Note Changed", "Task Starred", "Task Unstarred", "Set Due Date to Task"]
						}
					}
				},
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
		"task_updated": {
			type: "object",
			properties: {}
		}
	},
	mock_data: {
		"event_type": "Task Updated",
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
			"updater_user_id":876155,
			"updater_user_name":"Dean Williams",
			"updater_user_email":"deanwilliams@example.com",
			"updated_at":"2018-10-07T08:20:24.582Z",
			"due_date": "2018-10-25",
			"recurrence_type": "week",
			"recurrence_count": 12,
			"starred": true,
			"revision": 37
		},
		"file": {
			"id": 49400710,
			"type": "file",
			"content_type": "image/png",
			"file_name": "company_logo.png",
			"file_provider": "s3",
			"file_size": 8575,
			"upload_id": 218413,
			"url": "https://download.wunderlist.io/dacfbed0-ad3a-0136-4171-22000ac54d4e-1539011703-313208?AWSAccessKeyId=AKIAJEN6W4AO3LJODOAA&Expires=1541690108&Signature=048ozwceqSnxvC6fqXl5xKn%2BOkM%3D",
			"version": 1,
			"revision": 1,
			"creator_user_id": 872355,
			"creator_user_name": "Steave Addams",
			"creator_user_email": "steaveaddams@example.com",
			"created_at": "2018-10-01T05:12:10.374Z",
			"updated_at": "2018-10-08T15:15:08.332Z"
		},
		"note": {
			"id": 55456,
			"version": 2,
			"type": "note",
			"content": "Helptext added",
			"previous_content": "Helptext pending"
		},
		"user_id": 87155,
		"user_name": "Michel Addams",
		"user_email": "micheladdams@example.com",
		"previous_revision": 2,
		"list_id": 367130,
		"list_title": "Task Tracker",
		"list_url": "https://www.wunderlist.com/#/lists/367130"
	},
	mock_input: {},
	execute: function(input, payload, output) {
		var outputObj = {};
		var firedEvent = "";
		try {
			payload = (typeof payload === "string") ? JSON.parse(payload) : payload;
		} catch (e) {
			return output("Error while parsing response");
		}
		if (payload.operation && payload.subject && payload.data) {
			switch (true) {
				case payload.operation === "update" && payload.subject.type === "task" && payload.data.hasOwnProperty("title"):
					firedEvent = "Task Modified";
					break;
				case payload.operation === "update" && payload.subject.type === "task" && payload.data.hasOwnProperty("assignee_id"):
					firedEvent = "Task Assigned";
					break;
				case (payload.operation === "update" || payload.operation === "create") && payload.subject.type === "note" && (!payload.before.hasOwnProperty("content") || payload.before.content === ""):
					firedEvent = "Task Note Added";
					break;
				case payload.operation === "create" && payload.subject.type === "file":
					firedEvent = "Task Attachment Added";
					break;
				case payload.operation === "update" && payload.subject.type === "note" && payload.before.content !== "":
					firedEvent = "Note Changed";
					break;
				case payload.operation === "update" && payload.subject.type === "task" && payload.data.starred:
					firedEvent = "Task Starred";
					break;
				case payload.operation === "update" && payload.subject.type === "task" && payload.data.starred == false:
					firedEvent = "Task Unstarred";
					break;
				case payload.operation === "update" && payload.subject.type === "task" && payload.data.hasOwnProperty("due_date"):
					firedEvent = "Set Due Date to Task";
					break;
				default:
					output(null, []);
					break;
			}
		}
		if ((firedEvent && input.event_filters.findIndex(evt => evt.filtername === firedEvent) > -1) || input.event_filters.length == 0) {
			Promise.all([
				wunderlist_service.getListDetails(input),
				wunderlist_service.getUsers(input)
			]).then(promiseData => {
				switch (firedEvent) {
					case "Task Modified":
						update_task_service.task_modified(input, output, outputObj, payload, promiseData);
						break;
					case "Task Assigned":
						update_task_service.task_assigned(input, output, outputObj, payload, promiseData);
						break;
					case "Task Note Added":
						update_task_service.note_added_to_task(input, output, outputObj, payload, promiseData);
						break;
					case "Task Attachment Added":
						update_task_service.attachment_added_to_task(input, output, outputObj, payload, promiseData);
						break;
					case "Note Changed":
						update_task_service.note_changed(input, output, outputObj, payload, promiseData);
						break;
					case "Task Starred":
						update_task_service.task_starred(input, output, outputObj, payload, promiseData);
						break;
					case "Task Unstarred":
						update_task_service.task_unstarred(input, output, outputObj, payload, promiseData);
						break;
					case "Set Due Date to Task":
						update_task_service.set_due_date_to_task(input, output, outputObj, payload, promiseData);
						break;
					default:
						output(null, []);
						break;
				}
			}).catch(error => {
				return output(error);
			});
		} else {
			output(null, []);
		}
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