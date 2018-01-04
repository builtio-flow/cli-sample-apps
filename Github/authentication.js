
module.exports = {
	label : 'Connect to Github',
  mock_input: {
    "username": "kailashyogeshwar85",
    "password": "password"
  },
	validate : function (input, output){
    console.log('inside validate called ');
    var request = require('request');
    console.log("inside validate function");
    console.log("inside ", input);
    request({
      method:'GET',
      url: "https://api.github.com/user",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": input.auth.username
      },
      auth: {
        user: input.auth.username,
        pass: input.auth.password
      }
    }, function(err, resp, body){
      console.log("inside callback");
      console.log(body);
      if(err){
        console.log("error ",err);
        return output(err, null);
      } 
      if(resp.statusCode == 401){
        console.log("Unauthorized");
        output('Unauthorized', null)
      }  
      if(resp.statusCode == 200){
        console.log(body);
        output(null, JSON.parse(body));
      } 
    })
	}
}