// Karma configuration
// Generated on Fri Dec 09 2016 04:51:50 GMT+0100 (Central European Standard Time)

var webpackConfig = require( './webpack.config.js' );

var webdriverConfig = {
	hostname: 'localhost',
	port: 4444
};

module.exports = function( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../..',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'sinon', 'chai'],

		// list of files / patterns to load in the browser
		files: [
			'assets/js/**/*.js',
			'tests/js/**/*.js'
		],

		// list of files to exclude
		exclude: [
			'assets/js/admin/**/*.js'
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'assets/js/**/*.js': ['webpack','coverage'],
			'tests/js/**/*.js': ['webpack']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		// web server port
		port: 4000,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values:
		// config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		customLaunchers: {
			'gecko': {
				base: 'WebDriver',
				config: webdriverConfig,
				browserName: 'firefox'
			}
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome', 'PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		// webpack configuration
		webpack: webpackConfig,

		// webpack-dev-middleware configuration
		webpackMiddleware: {
			stats: 'errors-only'
		},

		coverageReporter: {
			type: 'html',
			dir: 'tmp',
			subdir: 'js-coverage'
		}
	} );
};
