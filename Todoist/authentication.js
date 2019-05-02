module.exports = {
  label: "Connect to Todoist_1",
  mock_input: {
    access_token: ""
  },
  oauth: "todoist",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}