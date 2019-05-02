module.exports = {
  label: "Authorize Box",
  mock_input: {
    access_token: "V1pQ6Bmf9fRN8RZTQ8o8mpExNJAWKrlC"
  },
  oauth: "box",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}