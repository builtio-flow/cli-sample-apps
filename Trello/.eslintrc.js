module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        // "indent": [
        //     "error",
        //     "tab"
        // ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-empty": ["error", { "allowEmptyCatch": true }]
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        // "semi": [
        //     "error",
        //     "never"
        // ]
    }
};