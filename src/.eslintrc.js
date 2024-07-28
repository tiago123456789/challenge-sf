module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        "ecmaVersion": 2018,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    rules: {
        "require-jsdoc": 0,
        "indent": ["error", 4],
        "no-restricted-globals": ["error", "name", "length"],
        "prefer-arrow-callback": "error",
        "quotes": ["error", "double", {"allowTemplateLiterals": true}],
        "max-len": ["error", {code: 100}],
    },
    overrides: [
        {
            "files": [
                "**/*.spec.js",
            ],
            "env": {
                "jest": true,
            },
        },
    ],
    globals: {},
};
