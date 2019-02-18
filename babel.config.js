module.exports = {
	presets: [[
		'@babel/preset-env', {
			modules: false,
			useBuiltIns: 'usage',
			targets: [
				'>0.2%',
				'safari >= 5',
				'ios >= 6'
			]
		}
	]],
	plugins: ['@babel/plugin-syntax-dynamic-import']
};