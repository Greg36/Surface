'use strict'; // eslint-disable-line

const path = require( 'path' ),
	argv = require( 'minimist' )( process.argv.slice( 2 ) ),
	webpack = require( 'webpack' ),
	autoprefixer = require( 'autoprefixer' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	mergeWith = require( 'lodash/mergeWith' );

const baseDir = path.join( __dirname, '../..' );

const isProduction = !!((argv.env && argv.env.production) || argv.p);

const jsLoader = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: [ 'babel' ],
};

const mergeWithConcat = function () {
	const args = [].slice.call( arguments );
	args.push( ( a, b ) => {
		if ( Array.isArray( a ) && Array.isArray( b ) ) {
			return a.concat( b );
		}
		return undefined;
	});
	return mergeWith.apply(this, args);
};

// Add Hot Module Replacement only on watcher script
if ( !!argv.watch ) {
	jsLoader.use.unshift( 'monkey-hot?sourceType=module' );
}

let webpackConfig = {
	entry: [
		path.join( baseDir, 'assets/js/main.js' ),
		path.join( baseDir, 'assets/css/style.scss' )
	],
	devtool: ( ! isProduction ? '#source-map' : undefined ),
	output: {
		path: baseDir,
		publicPath: '/wp-content/themes/--s--/',
		filename: 'build/js/app.js',
	},
	stats: {
	   hash: false,
	   version: false,
	   timings: false,
	   children: false,
	   errors: false,
	   errorDetails: false,
	   warnings: false,
	   chunks: false,
	   modules: false,
	   reasons: false,
	   source: false,
	   publicPath: false
	},
	module: {
		rules: [
			jsLoader,
			{
				enforce: 'pre',
				test: /\.js?$/,
				include: path.join(baseDir, 'assets/js'),
				use: 'eslint',
			},
			{
				test: /\.scss$/,
				include: path.join(baseDir, 'assets/css'),
				use: ExtractTextPlugin.extract({
					fallback: 'style',
					use: [
						'css?sourceMap',
						{
							loader: 'postcss', options: {
								config: { path: __dirname, ctx: { isProduction: true } },
								sourceMap: true,
							},
						},
						'sass?sourceMap',
					],
				}),
			},
		]
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
	},
	performance: {
		hints: "warning"
	},
	plugins: [
		new webpack.LoaderOptionsPlugin( {
			minimize: !!argv.p,
			debug: !!argv.watch,
			stats: { colors: true },
			options: {
				postcss: [
					autoprefixer({ browsers: ['last 2 versions', 'android 4', 'opera 12'] }),
				],
				context: '/'
			}
		} ),
		new ExtractTextPlugin( {
			filename: `build/css/style.css`,
			allChunks: true,
			disable: !!argv.watch,
		} ),
	]
};

// Load only while watching
if ( !!argv.watch ) {
	webpackConfig.performance.hints = false;
	webpackConfig.entry.unshift( 'webpack-hot-middleware/client?timeout=20000&reload=false' );
	webpackConfig = mergeWithConcat( webpackConfig, require( './webpack.config.watch.js' ) );
}

module.exports = webpackConfig;
