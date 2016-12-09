const webpack = require('webpack');
const BrowserSyncPlugin = require('./webpack.plugin.browsersync');

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
				'js/admin/*.js',
				'js/source/**/*.js',
				'js/main.js',
				'css/sass/**/*.scss',
				'!node_modules'
			],
			callback() {}
		}),
	],
};
