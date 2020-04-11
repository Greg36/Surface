/*
 * Karma test runner configuration used for JavaScript unit testing.
*/

const webpackConfig = require( '../../node_modules/laravel-mix/setup/webpack.config.js' );

// Chrome headless setup with Puppeteer
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../..',

		// frameworks to use
		frameworks: ['mocha', 'sinon', 'chai'],

		// list of files / patterns to load in the browser
		// each file acts as entry point for the webpack configuration
		files: [
			{pattern: 'tests/js/**/*_test.js', watched: false}
		],

		// preprocess matching files before serving them to the browser
		preprocessors: {
			'tests/js/**/*_test.js': ['webpack']
		},

		webpackMiddleware: {
			stats: 'errors-only'
		},

		webpack: webpackConfig,

		// test results reporter to use
		reporters: ['progress'],
		colors: true,
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// start these browsers
		browsers: ['ChromeHeadlessNoSandbox', 'FirefoxHeadless'],
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox']
			},
			FirefoxHeadless: {
				base: 'Firefox',
				flags: [ '-headless' ],
			},
		},
		concurrency: Infinity
	} );
};
