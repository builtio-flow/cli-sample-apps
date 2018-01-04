// Add your function in module.exports 

var request = require('request');
var Q = require('q');
const baseURL = 'https://api.github.com';

function getUserInfo(token) {
    var future = Q.defer();
    var url = baseURL + '/user';
    var options = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token,
            'User-Agent': 'built.io Flow'
        }
    };

    request(options, function(err, res, body) {
        if (err) {
            return future.reject(err);
        }
        try {
            if (body && typeof body === "string") {
                body = JSON.parse(body)
            }
        } catch (e) {
            return future.reject(body);
        }
        if (res && res.statusCode && res.statusCode === 200) {
            return future.resolve(body);
        }
        if (res && res.statusCode && res.statusCode !== 200) {
            var errObj = {
                "message": body.message,
                "errors": [body.message]
            }
            return future.reject(errObj);
        }
    });
    return future.promise;
}

module.exports = {
  'name':'repo_list',   
  'execute': function (input, options, output){
    console.log("execute function called ", input)
    console.log("updated code if aaya yaha");
    getUserInfo(input.auth.access_token)
    .then(user => {
      console.log('got user');
      request({
        url: "https://api.github.com/users/" + user.login + "/repos",
        method: 'GET',
        headers: {
          "content-type": "application/json",
          'Authorization': "Bearer " + input.auth.access_token,
          "User-Agent": user.login
        }        
      },function(err, resp, body){
        console.log("got response ",resp.statusCode);
        if(err){
          output(err, null)
        } 
        if(resp.statusCode !==  200){
          console.log("api error")
          output(body, null);
        } else {
          console.log("sending body");
          var body = JSON.parse(body);
          var data = {};
          var arr = [];
          body.forEach(function(el){
            arr.push({ id: el.name, value: el.full_name })
          })
          output(null, arr)          
        }
      })         
    })
    .catch(output)
  }
}