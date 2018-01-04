module.exports = {

  name: "post_tweet",

  label: "Post Tweet",

  description: "To  Post a new tweet to your account",
  mock_input: { access_token: "access_token" },
  input:{
    "title": "Post Tweet",
    "type": "object",
    "properties": {      
      "tweet": {
        "title": "Tweet",
        "type": "string",
        "format": "textarea",
        "minLength": 1,
        "maxLength": 140,
        "description": "140-Character Limit"
      }
    }
  },
  output:   {
    "title": "Output",
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "title": "id",
        "displayTitle": "ID"
      },
      "id_str": {
        "type": "string",
        "title": "id_str",
        "displayTitle": "Stored ID"
      },
      "text": {
        "type": "string",
        "title": "text",
        "displayTitle": "Tweet Text"
      },
      "coordinates": {
        "type": "object",
        "title": "coordinates",
        "displayTitle": "Coordinates"
      },
      "user": {
        "type": "object",
        "title": "user",
        "displayTitle": "User"
      },
      "entities": {
        "type": "object",
        "title": "entities",
        "properties": {
          "hashtags": {
            "type": "array",
            "title": "hashtags",
            "items": {
              "type": "string"
            },
            "displayTitle": "Entities Hashtags"
          },
          "symbols": {
            "type": "array",
            "title": "symbols",
            "items": {
              "type": "string"
            },
            "displayTitle": "Entities Symbols"
          },
          "user_mentions": {
            "type": "array",
            "title": "user_mentions",
            "items": {
              "type": "string"
            },
            "displayTitle": "Entities User Mentions"
          },
          "urls": {
            "type": "array",
            "title": "urls",
            "items": {
              "type": "string"
            },
            "displayTitle": "Entities URLs"
          }
        },
        "displayTitle": "Entities"
      }
    }
  },

  execute: function(input, output){
    var Twitter = require('twitter');
    
    var client = new Twitter({
        consumer_key        : input.auth.consumer_key,
        consumer_secret     : input.auth.consumer_secret,
        access_token_key    : input.auth.access_token,
        access_token_secret : input.auth.access_secret_token
    });    

    client.post('statuses/update', {status: input.tweet},  function(error, tweet){
        if(error) {
           console.log("error is ", error);
           return output(error);
        }
        return output(null, tweet);
    });
  }

}
