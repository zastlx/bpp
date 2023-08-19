module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    settings: {
        "import/resolver": {
            "alias": {
                "map": [
                    ["@webpack", "./src/webpack"],
                    ["@webpack/common", "./src/webpack/common"],
                    ["@utils", "./src/utils"],
                    ["@api", "./src/api"],
                    ["@components", "./src/components"]
                ]
            }
        }
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "ts-expect-error": "allow-with-description"
    }
}