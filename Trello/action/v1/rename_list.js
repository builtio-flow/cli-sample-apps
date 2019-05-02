var request = require('request');
const P = require('bluebird');

module.exports = {

  name: "rename_list",

  title: "Rename List",

  description: "",
  version: "v1",

  input: {
    title: 'Rename List',
    type: 'object',
    properties: {
      board_id: {
        "title": "Board ID",
        "minLength": 1,
        "type": "string",
        "propertyOrder": 2,
        "description": "Select/specify the ID of the board of which list you want to rename"
      },
      "list_id": {
        "title": "List ID",
        "description": "Select/specify the ID of the list you want to rename",
        "type": "string",
        "propertyOrder": 3,
        "minLength": 1
      },
      "name": {
        "title": "New List Name",
        "type": "string",
        "propertyOrder": 4,
        "description": "Enter the new name of the list",
        "minLength": 1
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
      "old_name": {
        "type": "string",
        "title": "old_name",
        "displayTitle": "Old Name"
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
    "name": "sdd",
    "board_id": "5b5ead6032eb9b7fc2d1d9c3",
    "list_id": "5b9f71sssd53774352dc6943834"
  },


  execute: function (input, output) {
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    inputValidation(input, 'board_id', output);
    inputValidation(input, 'list_id', output);
    inputValidation(input, 'name', output);
    var oldName="";

    var option = {
      url: "https://api.trello.com/1/lists/" + input.list_id,
      qs: {
        key: input.auth.key,
        token: input.auth.access_token
      },
      field:"Invalid List ID"
    };

    requestCall(option)
    .then((data)=>{
      oldName=data.name
      var optionRename = {
        url: "https://api.trello.com/1/lists/" + input.list_id + "/name",
        qs: {
          key: input.auth.key,
          token: input.auth.access_token,
          value: input.name
        },
        method: "PUT",
        field:"Invalid List ID"
      };
      return requestCall(optionRename)
    }).then((body)=>{
      if(body.idBoard!==input.board_id){
        return output("Invalid Board ID")
      }

      var optionList = {
        url: "https://api.trello.com/1/lists/" + (body.idList || input.list_id),
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
      dataList["old_name"]=oldName
      if(dataBoard && dataBoard.name){
        dataList["board_id"]=dataList.idBoard || dataBoard.id
        dataList["board_name"]=dataBoard.name
        dataList["board_url"]=dataBoard.url
        delete dataList.idBoard
      }
      return output(null,dataList);
    })
    .catch((err)=>{
      if (err === 'invalid value for idList' || err === 'Invalid objectId') {
        return output('Invalid List ID entered');
      }
      else if (err == 'invalid id') {
        return output('Invalid Board ID/List ID')
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