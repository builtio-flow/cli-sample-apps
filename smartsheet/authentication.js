module.exports = {
  label: "Authorize Smartsheet",
  mock_input: {
  },
  oauth: "smartsheet",
  validate: function (input, output) {

    output(null, true)
  }
}