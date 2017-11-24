const path = require( 'path' ),
	{ argv } = require( 'yargs' ),
	merge = require( 'webpack-merge' );

const isProduction = Boolean( argv.env && argv.env.production || argv.p ),
	rootPath = process.cwd(),
	userConfig = require( '../../config.json' );

const config = merge( {
	open: true,
	copy: 'images/**/*',
	cacheBusting: '[name]_[hash]', // @todo Implement manifest interface to make cache busting work.
	paths: {
		root: rootPath,
		assets: path.join( rootPath, 'assets' ),
		dist: path.join( rootPath, 'build' ),
	},
	enabled: {
		sourceMaps: !isProduction,
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
