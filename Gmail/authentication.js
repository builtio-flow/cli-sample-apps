module.exports = {
  label: "Authorize Gmail",
  mock_input: {
    access_token: ""
  },
  oauth: "gmail",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}
