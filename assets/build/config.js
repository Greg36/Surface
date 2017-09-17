const path = require( 'path' ),
	{ argv } = require( 'yargs' ),
	merge = require( 'webpack-merge' ),
	isProduction = Boolean( argv.env && ( argv.env.production || argv.p ) ),
	rootPath = process.cwd(),
	userConfig = require( '../../config.json' ),
	config = merge( {
		open: true,
		copy: 'images/**/*',
		proxyUrl: 'http://localhost:3000',
		cacheBusting: '[name]_[hash]',
		paths: {
			root: rootPath,
			assets: path.join( rootPath, 'assets' ),
			dist: path.join( rootPath, 'build' ),
		},
		enabled: {
			sourceMaps: ! isProduction,
			optimize: isProduction,
			cacheBusting: isProduction,
			watcher: Boolean( argv.watch ),
		},
		watch: [],
	}, userConfig );

module.exports = merge( config, {
	env: Object.assign( {
		production: isProduction,
		development: ! isProduction
	}, argv.env ),
	publicPath: `${config.publicPath}/${path.basename( config.paths.dist )}/`,
	manifest: {},
} );

if ( process.env.NODE_ENV === undefined ) {
	process.env.NODE_ENV = isProduction ? 'production' : 'development';
}
