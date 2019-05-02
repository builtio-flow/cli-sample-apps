const wunderlist_service = require("./wunderlist-http-service");

function setValues(sourceObj, destinationObj, sourceKey, destinationKey) {
	if (sourceObj && (sourceObj[sourceKey] != null || sourceObj[sourceKey] != undefined)) {
		destinationObj[destinationKey || sourceKey] = sourceObj[sourceKey];
	} else {
		destinationObj[destinationKey || sourceKey] = null;
	}
}
module.exports = {
	set_task_data: function(taskDetails, outputObj, promiseData) {
		setValues(taskDetails, outputObj, "id");
		setValues(taskDetails, outputObj, "title");
		outputObj.url = "https://www.wunderlist.com/#/tasks/" + taskDetails.id;
		setValues(taskDetails, outputObj, "type");
		setValues(taskDetails, outputObj, "created_by_id", "creator_user_id");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["created_by_id"])[0], outputObj, "name", "creator_user_name");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["created_by_id"])[0], outputObj, "email", "creator_user_email");
		setValues(taskDetails, outputObj, "created_at");
		setValues(taskDetails, outputObj, "assignee_id", "assignee_user_id");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["assignee_id"])[0], outputObj, "name", "assignee_user_name");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["assignee_id"])[0], outputObj, "email", "assignee_user_email");
		setValues(taskDetails, outputObj, "completed");
		setValues(taskDetails, outputObj, "completed_by_id", "completed_user_id");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["completed_by_id"])[0], outputObj, "name", "completed_user_name");
		promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == taskDetails["completed_by_id"])[0], outputObj, "email", "completed_user_email");
		setValues(taskDetails, outputObj, "completed_at");
		setValues(taskDetails, outputObj, "due_date");
		setValues(taskDetails, outputObj, "recurrence_type");
		setValues(taskDetails, outputObj, "recurrence_count");
		setValues(taskDetails, outputObj, "starred");
		setValues(taskDetails, outputObj, "revision");
	},
	task_modified: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Modified";
		wunderlist_service.getTaskDetails(input, payloadData.after.id).then(taskDetails => {
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj.task, "version");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.after, outputObj.task, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "email", "updater_user_email");
			setValues(payloadData.after, outputObj.task, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			};
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	task_assigned: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Assigned";
		wunderlist_service.getTaskDetails(input, payloadData.after.id).then(taskDetails => {
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj.task, "version");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.after, outputObj.task, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "email", "updater_user_email");
			setValues(payloadData.after, outputObj.task, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	note_added_to_task: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Note Added";
		wunderlist_service.getTaskDetails(input, payloadData.after.task_id).then(taskDetails => {
			outputObj.note = {};
			setValues(payloadData.after, outputObj.note, "id");
			setValues(payloadData, outputObj.note, "version");
			setValues(payloadData.subject, outputObj.note, "type");
			setValues(payloadData.data, outputObj.note, "content");
			setValues(payloadData.before, outputObj.note, "content", "previous_content");
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			outputObj.task.updater_user_id=null;
			outputObj.task.updater_user_name=null;
			outputObj.task.updater_user_email=null;
			outputObj.task.updated_at=null;
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	attachment_added_to_task: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Attachment Added";
		wunderlist_service.getTaskDetails(input, payloadData.data.task_id).then(taskDetails => {
			outputObj.file = {}
			setValues(payloadData.data, outputObj.file, "id");
			setValues(payloadData.data, outputObj.file, "type");
			setValues(payloadData.data, outputObj.file, "content_type");
			setValues(payloadData.data, outputObj.file, "file_name");
			setValues(payloadData.data, outputObj.file, "file_provider");
			setValues(payloadData.data, outputObj.file, "file_size");
			setValues(payloadData.data, outputObj.file, "upload_id");
			setValues(payloadData.data, outputObj.file, "url");
			setValues(payloadData, outputObj.file, "version");
			setValues(payloadData.data, outputObj.file, "revision");
			setValues(payloadData.data, outputObj.file, "created_by_id", "creator_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.data.created_by_id)[0], outputObj.file, "name", "creator_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.data.created_by_id)[0], outputObj.file, "email", "creator_user_email");
			setValues(payloadData.data, outputObj.file, "created_at");
			setValues(payloadData.data, outputObj.file, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			outputObj.task.updater_user_id=null;
			outputObj.task.updater_user_name=null;
			outputObj.task.updater_user_email=null;
			outputObj.task.updated_at=null;
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	note_changed: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Note Changed";
		wunderlist_service.getTaskDetails(input, payloadData.after.task_id).then(taskDetails => {
			outputObj.note = {};
			setValues(payloadData.after, outputObj.note, "id");
			setValues(payloadData, outputObj.note, "version");
			setValues(payloadData.subject, outputObj.note, "type");
			setValues(payloadData.data, outputObj.note, "content");
			setValues(payloadData.before, outputObj.note, "content", "previous_content");
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			outputObj.task.updater_user_id=null;
			outputObj.task.updater_user_name=null;
			outputObj.task.updater_user_email=null;
			outputObj.task.updated_at=null;
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	task_starred: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Starred";
		wunderlist_service.getTaskDetails(input, payloadData.after.id).then(taskDetails => {
			outputObj.task = {}
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj.task, "version");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.after, outputObj.task, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "email", "updater_user_email");
			setValues(payloadData.after, outputObj.task, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	task_unstarred: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Task Unstarred";
		wunderlist_service.getTaskDetails(input, payloadData.after.id).then(taskDetails => {
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj.task, "version");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.after, outputObj.task, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "email", "updater_user_email");
			setValues(payloadData.after, outputObj.task, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	},
	set_due_date_to_task: function(input, output, outputObj, payloadData, promiseData) {
		const self = this;
		outputObj.event_type = "Set Due Date to Task";
		wunderlist_service.getTaskDetails(input, payloadData.after.id).then(taskDetails => {
			outputObj.task = {};
			self.set_task_data(taskDetails, outputObj.task, promiseData);
			setValues(payloadData.before, outputObj.task, "title", "previous_title");
			setValues(payloadData, outputObj.task, "version");
			setValues(payloadData, outputObj, "user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "name", "user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.user_id)[0], outputObj, "email", "user_email");
			setValues(payloadData.after, outputObj.task, "updated_by_id", "updater_user_id");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "name", "updater_user_name");
			promiseData[1] && promiseData[1].length && setValues(promiseData[1].filter(user => user.id == payloadData.after.updated_by_id)[0], outputObj.task, "email", "updater_user_email");
			setValues(payloadData.after, outputObj.task, "updated_at");
			outputObj.note = {
				id: null,
				version: null,
				type: null,
				content: null,
				previous_content: null
			};
			outputObj.file = {
				id: null,
				type: null,
				content_type: null,
				file_name: null,
				file_provider: null,
				file_size: null,
				upload_id: null,
				url: null,
				version: null,
				revision: null,
				creator_user_id: null,
				creator_user_name: null,
				creator_user_email: null,
				created_at: null,
				updated_at: null
			}
			setValues(payloadData.subject, outputObj, "previous_revision");
			promiseData[0] && setValues(promiseData[0], outputObj, "id", "list_id");
			promiseData[0] && setValues(promiseData[0], outputObj, "title", "list_title");
			outputObj.list_url = "https://www.wunderlist.com/#/lists/" + promiseData[0].id;
			output(null, outputObj);
		}, error => {
			return output(error);
		});
	}
};