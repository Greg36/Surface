const webpack = require('webpack');
const BrowserSyncPlugin = require('./webpack.plugin.browsersync.js');

module.exports = {
	output: { pathinfo: true },
	devtool: '#cheap-module-source-map',
	stats: false,
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new BrowserSyncPlugin({
			target: '__url__',
			publicPath: '/wp-content/themes/--s--/',
			watch: [
				'**/*.php',
				'assets/js/**/*.js',
				'assets/css/**/*.scss',
				'!node_modules'
			],
			callback() {}
		}),
	],
};
