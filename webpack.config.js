'use strict'; // eslint-disable-line

const path = require( 'path' ),
	argv = require( 'minimist' )( process.argv.slice( 2 ) ),
	webpack = require( 'webpack' ),
	autoprefixer = require( 'autoprefixer' ),
	ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
	mergeWith = require( 'lodash/mergeWith' );

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
		path.join( __dirname, 'js/source/main.js' ),
		path.join( __dirname, 'css/sass/style.scss' )
	],
	devtool: ( ! isProduction ? '#source-map' : undefined ),
	output: {
		path: __dirname,
		publicPath: '/wp-content/themes/'+ '_s' + '/',
		filename: 'js/app.js',
	},
	module: {
		rules: [
			jsLoader,
			{
				enforce: 'pre',
				test: /\.js?$/,
				include: path.join(__dirname, 'js/source'),
				loader: 'eslint',
			},
			{
				test: /\.scss$/,
				include: path.join(__dirname, 'css/sass'),
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style',
					loader: [
						'css?sourceMap',
						'postcss',
						'sass?sourceMap',
					],
				}),
			},
		]
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
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
			filename: `css/style.css`,
			allChunks: true,
			disable: !!argv.watch,
		} ),
	]
};

// Load only in production build
if ( !!argv.p ) {
	webpackConfig = mergeWithConcat(webpackConfig, require('./webpack.config.optimize'));
	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
}

// Load only while watching
if ( !!argv.watch ) {
	webpackConfig.entry.unshift( 'webpack-hot-middleware/client?timeout=20000&reload=false' );
	webpackConfig = mergeWithConcat( webpackConfig, require( './webpack.config.watch' ) );
}

module.exports = webpackConfig;
