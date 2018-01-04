// Add your function in module.exports 

var request = require('request');
module.exports = {
  'name':'repo_list', 	
  'execute': function (input, options, output){
      request({
        url: "https://api.github.com/users/" + (input.UserName || input.auth.username) + "/repos",
        method: 'GET',
        headers: {
          "content-type": "application/json",
          "User-Agent": input.auth.username
        },
        auth: {
          username: input.auth.username,
          password: input.auth.password
        }
      },function(err, resp, body){
        if(err){
          output(err, null)
        } 
        if(resp.statusCode !==  200){
          output(body, null);
        } else {
          var body = JSON.parse(body);
          var data = {};
          var arr = [];
          body.forEach(function(el){
            arr.push({ id: el.name, value: el.full_name })
          })
          output(null, arr)          
        }
      })         
  }
}