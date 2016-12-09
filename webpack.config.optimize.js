'use strict'; // eslint-disable-line

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		new OptimizeCssAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		})
	]
};
