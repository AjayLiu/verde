module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
	rules: {
		"prettier/prettier": ["error", { endOfLine: "auto" }],
		"react/react-in-jsx-scope": "off",
	},
};
