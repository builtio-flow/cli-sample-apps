const request = require("request")
const sheetURL = "https://graph.microsoft.com/v1.0/me/drive"

module.exports = {
    folderValidation: function (input) {

        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.folderId,
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 200)
                    return resolve("Folder ID is correct")
                else if (resp.statusCode == 401)
                    return reject("Unauthorized access")
                else if (resp.statusCode != 200)
                    return reject("Folder not found, please select or enter correct Folder")
                else if (body && body.error && body.error.message)
                    return reject(body.error.message)

            })
        })
    },
    workbookValidation: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId,
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 200)
                    return resolve("Workbook ID is correct")
                else if (resp.statusCode == 401)
                    return reject("Unauthorized access")
                else if (resp.statusCode != 200)
                    return reject("Workbook not found, please select or enter correct Workbook")
                else if (body && body.error && body.error.message)
                    return reject(body.error.message)

            })
        })
    },
    sheetNameValidation: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId + "/workbook/worksheets/" + input.sheetName,
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 200)
                    return resolve("Sheet Name is correct")
                else if (resp.statusCode == 401)
                    return reject("Unauthorized access")
                else if (resp.statusCode != 200)
                    return reject("Sheet Name not found, please select or enter correct Sheet Name")
                else if (body && body.error && body.error.message)
                    return reject(body.error.message)

            })
        })
    },

    tableNameValidation: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId + "/workbook/tables/" + input.tableName,
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 200)
                    return resolve("Table Name is correct")
                else if (resp.statusCode == 401)
                    return reject("Unauthorized access")
                else if (resp.statusCode != 200)
                    return reject("Table Name not found, please select or enter correct Table Name")
                else if (body && body.error && body.error.message)
                    return reject(body.error.message)
            })
        })
    },
    getWorkbook: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId,
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }
                if (resp.statusCode == 404)
                    return reject("Workbook not found, please select or enter correct Workbook")

                if (resp.statusCode == 401)
                    return reject("Unauthorized access")

                if (resp.statusCode != 200) {
                    if (body && body.error && body.error.message)
                        return reject(body.error.message)
                    else if (body.error)
                        return reject(body.error)
                    else if (body)
                        return reject(body)
                    else
                        return reject("Something went wrong")
                }

                return resolve(body)
            })
        })
    },
    getExcelSheetDetails: function (input) {

        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId + "/workbook/worksheets",
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 401)
                    return reject("Unauthorized access")

                if (resp.statusCode != 200) {
                    if (body && body.error && body.error.message)
                        return reject(body.error.message)
                    else if (body.error)
                        return reject(body.error)
                    else if (body)
                        return reject(body)
                    else
                        return reject("Something went wrong")
                }

                return resolve(body.value)
            })
        })
    },
    getRowDetails: function (input) {
        return new Promise(function (resolve, reject) {
            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId + "/workbook/worksheets/" + input.sheetName + "/usedRange",
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {
                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 401)
                    return reject("Unauthorized access")

                if (resp.statusCode != 200) {
                    if (body && body.error && body.error.message)
                        return reject(body.error.message)
                    else if (body.error)
                        return reject(body.error)
                    else if (body)
                        return reject(body)
                    else
                        return reject("Something went wrong")
                }

                return resolve(body)
            })
        })
    },
    isArrayDifferent: function (oldArr, newArr) {

        if (oldArr.length != newArr.length)
            return true
        else {

            let flag = false
            oldArr.map((oldRow, index) => {
                if (oldRow != newArr[index])
                    flag = true
            })
            return flag
        }
    },
    getTableRowDetails: function (input) {
        return new Promise(function (resolve, reject) {

            request({
                method: "GET",
                url: sheetURL + "/items/" + input.workbookId + "/workbook/tables/" + input.tableName + "/range",
                headers: {
                    "Authorization": "Bearer " + input.auth.access_token,
                    "User-Agent": "built.io Flow"
                }
            }, function (err, resp, body) {

                if (err) {
                    return reject(err)
                }

                try {
                    body = (typeof body === "string") ? JSON.parse(body) : body
                }
                catch (error) {
                    reject("Unable to parse request")
                }

                if (resp.statusCode == 401)
                    return reject("Unauthorized access")

                if (resp.statusCode != 200) {
                    if (body && body.error && body.error.message)
                        return reject(body.error.message)
                    else if (body.error)
                        return reject(body.error)
                    else if (body)
                        return reject(body)
                    else
                        return reject("Something went wrong")
                }

                return resolve(body)
            })
        })
    },
    checkHeader: function (arr) {
        let flag = true
        arr.map(value => {
            if (value == "")
                flag = false
        })
        return flag
    }
}

