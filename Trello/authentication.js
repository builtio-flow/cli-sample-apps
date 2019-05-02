module.exports = {
  label: 'Authorize Trello',
  mock_input: {
    
  },
  oauth: 'trello',
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}
