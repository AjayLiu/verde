module.exports = function (api) {
	api.cache(true);
	const plugins = [
		[
			"module-resolver",
			{
				root: ["./src/"],
				extensions: [
					".ios.js",
					".android.js",
					".js",
					".ts",
					".tsx",
					".json",
				],
				alias: {
					tests: ["./tests/"],
					"@assets": "./src/assets/",
					"@components": "./src/components",
					"@config": "./src/config",
					"@navigation": "./src/navigation",
					"@screens": "./src/screens",
					"@utils": "./src/utils",
					"@hooks": "./src/utils/hooks",
				},
			},
		],
	];
	return {
		presets: ["babel-preset-expo"],
		plugins,
	};
};
