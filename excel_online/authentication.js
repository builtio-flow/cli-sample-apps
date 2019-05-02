module.exports = {
  label: "Authorize Excel Online",
  mock_input: {
    access_token: ""
  },
  oauth: "excel_online",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}