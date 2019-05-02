var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "create_list",

  title: "Create List",

  description: "",
  version: "v1",

  input: {
    title: 'Create List',
    type: 'object',
    properties: {
      "board_id": {
        "title": "Board ID",
        "description": "Select/specify the ID of the board under which you want to create the list",
        "type": "string",
        "propertyOrder": 2,
        "minLength": 1
      },
      "idListSource": {
        "title": "Source List ID",
        "description": "Select/specify the ID of the list of which you want to copy the cards to the new list",
        "type": "string",
        "propertyOrder": 3
      },
      "name": {
        "title": "List Name",
        "type": "string",
        "propertyOrder": 4,
        "description": "Enter the name of the list you want to create",
        "minLength": 1
      },
      "pos": {
        "title": "List Position",
        "description": "Specify the position of the list you want to create. You can enter ‘top’, ‘bottom’, or a float integer, for example, ‘2.0’",
        "type": "string",
        "propertyOrder": 5
      }
    }
  },

  output: {
    "title": "output",
    "type": "object",
    "properties": {
      "id": {
        "title": "id",
        "displayTitle": "Card ID",
        "type": "string"
      },
      "name": {
        "title": "name",
        "displayTitle": "Name",
        "type": "string"
      },
      "closed": {
        "title": "closed",
        "displayTitle": "Closed",
        "type": "boolean"
      },
      "idBoard": {
        "title": "idBoard",
        "displayTitle": "Board ID",
        "type": "string"
      },
      "pos": {
        "title": "pos",
        "displayTitle": "Position",
        "type": "number"
      },
      "limits": {
        "title": "limits",
        "displayTitle": "Limits",
        "type": "any"
      },
      "board_id": {
        "type": "string",
        "title": "board_id",
        "displayTitle": "Board ID"
      },
      "board_name": {
        "type": "string",
        "title": "board_name",
        "displayTitle": "Board Name"
      },
      "board_url": {
        "type": "string",
        "title": "board_url",
        "displayTitle": "Board URL"
      }
    }
  },

  mock_input: {
    "board_id":"5b580ff316b7ca9da4a7eb4a",
    "name":"my"
  },

  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'board_id', output);
    inputValidation(input, 'name', output);

    var option = {
      url: "https://api.trello.com/1/lists",
      body: {
        "idBoard": input.board_id,
        "name": input.name,
        "token": input.auth.access_token,
        "key": input.auth.key
      },
      method: "POST",
      json: true,
      field:"Invalid List ID"
    };
    optField(input, 'idListSource', option.body);
    optField(input, 'pos', option.body);

    requestCall(option)
    .then((body)=>{

      var optionList = {
        url: "https://api.trello.com/1/lists/" + body.id,
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        method: "GET",
        field:"Invalid List ID"
      };
      var optionBoard= {
        url: "https://api.trello.com/1/boards/" + (body.idBoard || input.board_id),
        qs: {
          key: input.auth.key,
          token: input.auth.access_token
        },
        method: "GET",
        field:"Invalid Board ID"
      };

      return P.all([requestCall(optionList),requestCall(optionBoard)])
    }).spread((dataList,dataBoard)=>{
      if(dataBoard && dataBoard.name){
        dataList["board_id"]=dataList.idBoard || dataBoard.id
        dataList["board_name"]=dataBoard.name
        dataList["board_url"]=dataBoard.url
        delete dataList.idBoard
      }
      return output(null,dataList);
    })
    .catch((err)=>{

      if (err === "invalid value for idBoard") {
        return output('Invalid Board ID');
      }
      else
      if (err === 'invalid value for idList' || err === 'Invalid objectId') {
        return output('Invalid Source List ID');
      }
      else if (err == 'invalid id' || err == 'board not found') {
        return output('Invalid Board ID')
      }
      else {
        return output(err);
      }
    })
  }
}

function inputValidation(src, val, res) {
  if (!src[val]) {
    return res('Mandatory field is missing');
  }
}

function optField(src, val, body) {
  if (src[val] || src[val] === 'false') {
    body[val] = src[val]
  }
}

function requestCall(options) {
  if(options.field){
    var value=options.field
    delete options.field
  }
  return new P(function (resolve, reject) {
    request(options, function (err, res, data) {
      if (err) {
        return reject(err);
      }
      try {
        if (data && typeof data === "string") {
          data = JSON.parse(data);
        }
      } catch (e) {
        if(data == 'invalid id'){
          data=value
        }
        return reject(data);
      }
      if (res && res.statusCode === 200) {
        return resolve(data);
      } else {
        if(data == 'invalid id'){
          data=value
        }
        return reject(data);
      }
    })
  })
}