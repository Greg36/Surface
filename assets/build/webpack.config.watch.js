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
			target: 'http://localhost/underscores',
			publicPath: '/wp-content/themes/' + '_s' + '/',
			proxyUrl: 'http://localhost:3000',
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
