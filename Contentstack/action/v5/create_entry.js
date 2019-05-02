var request = require("request");
const commons = require("../../commons")



module.exports = {

    name: "create_entry",

    label: "Create Entry",

    description: "",
    version: "v5",

    form: {
        id: "getFieldSchema",
        dependencies: ["stack_api_key", "content_type_uid", "format"]
    },

    input: {
        "title": "Create Entry",
        "type": "object",
        "properties": {
            "stack_api_key": {
                "title": "Stack API Key",
                "description": "Select/specify API key of the stack in which the entry you want to create",
                "type": "string",
                "minLength": 1
            },
            "content_type_uid": {
                "title": "Content Type UID",
                "description": "Select/specify the unique ID of the content type in which the entry you want to create",
                "type": "string",
                "minLength": 1
            },
            "locale": {
                "title": "Locale",
                "description": "Select/specify the locale for the entry you want to create",
                "type": "string"
            },
            "format": {
                "type": "string",
                "title": "Body format",
                "description": "Select the body format for the entry you want to create",
                "enum": [
                    "Form",
                    "JSON"
                ]
            },
            "tags": {
                "title": "Tags",
                "description": "Provide a list of tags you want to associate with the entry",
                "type": "array",
                "items": {
                    "title": "Tag",
                    "description": "Enter the tags you want to associate with the entry",
                    "minLength": 1,
                    "type": "string"
                }
            },
        }
    },


    output: {
        "type": "object",
        "title": "output",
        "properties": {
            "notice": {
                "type": "string",
                "title": "notice",
                "displayTitle": "Message"
            },
            "entry": {
                "type": "object",
                "title": "entry",
                "displayTitle": "Entry",
                "items": {
                    "type": "object",
                    "title": "items",
                    "displayTitle": "Entry List",
                    "properties": {
                        "uid": {
                            "type": "string",
                            "title": "uid",
                            "displayTitle": "Entry Unique ID"
                        },
                        "published": {
                            "type": "boolean",
                            "title": "published",
                            "displayTitle": "Is Entry Published"
                        },
                        "created_by": {
                            "type": "string",
                            "title": "created_by",
                            "displayTitle": "Created By"
                        },
                        "updated_by": {
                            "type": "string",
                            "title": "updated_by",
                            "displayTitle": "Updated By"
                        },
                        "tags": {
                            "type": "array",
                            "title": "tags",
                            "displayTitle": "Entry Tags",
                            "items": {
                                "type": "object",
                                "title": "items",
                                "displayTitle": "Tags List"
                            }
                        },
                        "_metadata": {
                            "type": "object",
                            "title": "_metadata",
                            "displayTitle": "Metadata"
                        },
                        "title": {
                            "type": "string",
                            "title": "title",
                            "displayTitle": "Title"
                        },
                        "created_at": {
                            "type": "string",
                            "title": "created_at",
                            "displayTitle": "Creted At"
                        },
                        "updated_at": {
                            "type": "string",
                            "title": "updated_at",
                            "displayTitle": "Updated At"
                        },
                        "_version": {
                            "type": "number",
                            "title": "_version",
                            "displayTitle": "Version"
                        }
                    }
                }
            }
        }
    },

    mock_input:{
        "stack_api_key": "blt5c38083399d1f38b",
        "content_type_uid": "complex_form",
        "locale": "mr-in",
        "format": "Form",
        "tags": [
        [
        "test",
        "test2"
        ]
        ],
        "auth": "*********",
        "undefined": "[Circular]",
        "__dynamicInput__": {
        "title": "testingtitle",
        "url": "/urltest",
        "ur_progress": "90",
        "rate": "4",
        "color": "700f00",
        "ace": "ace test",
        "json": "{\"test\":\"rest\"}",
        "single_reference": "bltac4eacf34d9a178a",
        "reference": [
        {
        "value": "blt99acdb0cb9e5966a"
        }
        ],
        "link": {
        "title": "ttestingtitle",
        "href": "/urltest"
        },
        "details": {
        "personal_info": [
        {
        "name": "Reema",
        "age": "28",
        "gender": "Female",
        "birthdate": "1992-04-02"
        }
        ],
        "address": [
        {
        "postal_address": "textara \n testing test"
        }
        ],
        "other_details": [
        {
        "communication_details": "<b>text area \n rich text</\b>",
        "other_interest": [
        {
        "value": "## test test \n Test 13131"
        },
        {
        "value": "## test test \n Test 13131 2"
        }
        ],
        "educational_details": {
        "any_gaps": "false",
        "gap_years": 0,
        "degrees": [
        {
        "value": "Graduate"
        },
        {
        "value": "Diploma"
        }
        ],
        "certificates": [
        {
        "value": "blt80c36717c823e13f"
        }
        ]
        }
        }
        ]
        }
        }
        },

      execute: function (input, output) {
          
        try {
            (async function () {

                var data = input.__dynamicInput__;
             
                if (!input.auth.authtoken)
                    input.auth.authtoken = await commons.getAuthToken(input)
console.log(input.auth.authtoken);

                    getFields(input,function(err,fields){
                        if(err){
                            return output(err);
                        }else{
                            if (input.format == "Form") {
                                params = convertProperData(input.__dynamicInput__,fields,output)
                         //   params = dynamicInput;
                            
                            }else{
                                try {
                                    if (typeof (input.__dynamicInput__.body) == "string") {
                                        input.__dynamicInput__.body = JSON.parse(input.__dynamicInput__.body);
                                    }
                                    params = input.__dynamicInput__.body
                                } catch (e) {
                                    return output("Provide body in proper json format");
                                }
                            }
                        }
                        
                       
                  
                      

           //     var params = {};
             
                if (input.tags && input.tags.length) {
                    params["tags"] = [];
                    for(var i = 0 ; i < input.tags.length ;i++){
                          var tags=convertJson(input.tags[i])
                           if(Array.isArray(tags)){
                              for(var t = 0 ; t  < tags.length;t++){
                                  params["tags"].push(tags[t])
                              }
                           }else{
                            params["tags"].push(tags)
                           }
                           
                    //params["tags"] = input.tags;
                }
            }
                
                var entyObj = {
                    "entry": params
                }

               
                entyObj = typeof (entyObj) === "string" ? JSON.parse(entyObj) : entyObj;
console.log(JSON.stringify(entyObj))
                request.post({
                    uri: "https://api.contentstack.io/v3/content_types/" + input.content_type_uid + "/entries",
                    headers: {
                        "authtoken": input.auth.authtoken,
                        "api_key": input.stack_api_key,
                        "Content-Type": "application/json"
                    },
                    json: true,
                    body: entyObj
                }, function (err, res, body) {
                    if (err) {
                        return output(err);
                    } else {
                        try {
                            if (typeof (body) === "string") {
                                body = JSON.parse(body);
                            }
                        } catch (e) {
                            return output(body);
                        }
                        if (res.statusCode >= 200 && res.statusCode < 400) {
                            return output(null, body);
                        } else if (res.statusCode >= 400) {
                            if (res.statusCode == 412) {
                                return output("Invalid Stack API Key")
                            } else {
                                if (body.error_message && body.error_message.indexOf("Entry creation failed") < 0) {
                                    return output("Entry creation failed. " + body.error_message)
                                }
                                if (body.errors) {
                                    if (body.errors.title && body.errors.title[0] == "is not unique.") {
                                        return output("Already exist entry")
                                    }
                                    var errMessage = "";
                                    for (var key in body.errors) {
                                        errMessage += "Error in " + key + ": " + body.errors[key].join(",") + " ";

                                    }
                                    return output(errMessage);
                                }

                                return output(body)
                            }
                        }
                    }
                })
            })
            })()
        } catch (err) {
            return output(err, null)
        }
    }

}


function frameObjectKey(params, key, value) {
    var field = key.split(".");
    if (!params[field[0]]) {
        params[field[0]] = {};
    }
    if (field[1].indexOf(".") >= 0) {
        frameObjectKey(params[field[0]], field[1], value)
    } else {
        params[field[0]][field[1]] = value;
        return params;
    }
}

function getObject(param) {
    for (var key in param) {
        if (typeof (param[key]) == "object") {
            getObject(param[key]);
        }
        if (param[key] == null || !param[key]) {
            delete param[key];
        }
    }
    return param;
}



function getFields(inp,cb){
    let option = {
        url: "https://api.contentstack.io/v3/content_types/" + inp.content_type_uid,
        method: "GET",
        headers: {
            "authtoken": inp.auth.authtoken,
            "content-type": "application/json",
            "api_key": inp.stack_api_key
        }
    }


    request(option, (e, r, b) => {
        if (e) return cb(e);

        if (r.statusCode >= 400) {
            return cb(b);
        }

        try {
            b = JSON.parse(b);
        } catch (e) {
            cb(e);
        }
     
     
        return cb(null,b.content_type.schema);

         
    })
}


function getFieldType(f,fields,data){
    
    var type = "";
    for(var  i = 0 ; i < fields.length ;i++){
        if(f == fields[i].uid){
            
            switch(fields[i].data_type){
                case "text":
                case "reference":
                case "number":
                case "boolean" :
                case "isodate":
                case "file" :
                case "reference" :
                type = "stringOfArray";
                break;
                case "blocks" : 
                type= "blocks";
                break;
            }
            break;
        }
    }
    if(type == "stringOfArray"){
        var d = data[f];
        data[f]=[];
        for(var i = 0 ; i <d.length;i++){
            data[f].push(d[i].value);
        }
    }
    if(type == "blocks"){
        var d = data[f];
        data[f]=[];
        for(var key in d[0]){
            
            for(var  i = 0 ; i < d[0][key].length;i++){
                var temp = {};
                temp[key] = d[0][key][i]
                data[f].push(temp);
            }
           
        }
    }
    return data;

}


function isJSONData(f,fields){
    for(var  i = 0 ; i < fields.length ;i++){
        if(f == fields[i].uid){
            if(fields[i].data_type == "blocks" || fields[i].data_type == "group" || fields[i].data_type == "json"){
                return true;
            }else{
                return false;
            }
        }
    }
    return false;
}


function ConvertArray(data,fields){
    for(var key in data){
        if (Array.isArray(data[key])) {
            data = getFieldType(key,fields,data);
        }else{
            if(typeof(data[key]) == "object"){
                var innerFields = [];
                for(var m = 0 ; m < fields.length;m++){
                    if(fields[m].uid == key){
                        if(fields[m].data_type == "group"){
                            innerFields = fields[m].schema;
                        }else{
                           
                        }
                    }
                }
                data = ConvertArray(data[key],innerFields)
            }
        }
    }
    return data;
}


function convertStringOfArray(data,type){
    var temp = [];
    for(var d = 0 ; d < data.length;d++){
        value = data[d].value;
        if(type == "number"){
            value = Number(value);
        }
        if(type == "boolean"){
            var isTrueSet = (value == 'true');
            value =isTrueSet;
        }
        
        temp.push(value);
    }
    return temp;
}
function getFields4(data, schema,output) {
   
    for(var key in data){
        for(var m = 0 ; m < schema.length ;m++){
            if(schema[m].uid == key){
                if(schema[m].data_type != "group" && schema[m].data_type != "blocks" && schema[m].data_type != "json"){
                    
                if (schema[m].multiple || (schema[m].data_type =="reference" || schema[m].field_metadata && schema[m].field_metadata.ref_multiple)) {console.log("m",schema[m].uid)
                    if(schema[m].data_type != "link"){
                    data[key] = convertStringOfArray(data[key],schema[m].data_type);
                    }
                }else{
                    if(schema[m].data_type == "link"){
                        if(!schema[m].multiple){
                        if(!data[key].href){
                            delete data[key];
                        }
                    }
                    }else   if(schema[m].data_type == "number"){
                        data[key] = Number(data[key]);
                    }  if(schema[m].data_type == "boolean"){
                        var isTrueSet = (data[key] == 'true');
                        data[key] =isTrueSet;
                    }
                    
                }
            }else if(schema[m].data_type == "group"){
                if(schema[m].multiple){
                    for(var l = 0; l < data[key].length;l++){
                        data[key][l] = getFields4(data[key][l],schema[m].schema,output)
                    }
                }else{
                    data[key] = getFields4(data[key],schema[m].schema,output)
                   
                }
               
            }else if(schema[m].data_type == "blocks"){
                
                var temp = [];var j = 0 ;
                for(var key1 in data[key]){

                    for(var l = 0 ; l < data[key][key1].length ;l++){
                        var temp1 = {};
                        
                        temp1[key1] =getFields4(data[key][key1][l],schema[m].blocks[j].schema,output);
                        
                        temp.push(temp1)

                    }
                    j++;
                   
                }
                data[key] = temp;
                
            }else if(schema[m].data_type == "json"){
                if(!data[key]){
                    data[key] = "";
                }else{
                    try{
                        if(typeof(data[key]) == "string"){
                            data[key] = JSON.parse(data[key]);
                        }

                    }catch(e){
                        return output("Please provide valid data in " + schema[m].display_name);
                    }
                }
            }
        }
    }
    if(!data[key]){
        delete data[key];
    }
    }

    return data;

   }
   

   function convertJson(str) {
	try {
		str = (str && typeof str === "string") ? JSON.parse(str) : str;
	} catch (e) {
		return str;
	}
	return str;
}

function convertProperData(data,fields,op){
    data = getFields4(data,fields,op);
    return data;
}