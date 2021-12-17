/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * @link https://laravel.com/docs/8.x/mix
 *
 * @package   justintadlock/mythic
 * @link      https://themehybrid.com/themes/mythic
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import required packages.
const mix                    = require( 'laravel-mix' ),
	  CopyWebpackPlugin      = require( 'copy-webpack-plugin' ),
	  ImageMinimizerPlugin   = require( 'image-minimizer-webpack-plugin' );

/*
 * -----------------------------------------------------------------------------
 * Theme Export Process
 * -----------------------------------------------------------------------------
 * Configure the export process in `webpack.mix.export.js`. This bit of code
 * should remain at the top of the file here so that it bails early when the
 * `export` command is run.
 * -----------------------------------------------------------------------------
 */

if ( process.env.export ) {
	const exportTheme = require( './webpack.mix.export.js' );
	return;
}

/*
 * -----------------------------------------------------------------------------
 * Build Process
 * -----------------------------------------------------------------------------
 * The section below handles processing, compiling, transpiling, and combining
 * all of the theme's assets into their final location. This is the meat of the
 * build process.
 * -----------------------------------------------------------------------------
 */

/*
 * Sets the development path to assets. By default, this is the `/resources`
 * folder in the theme.
 */
const devPath  = 'assets';
const distPath = '.';

/*
 * Sets the path to the generated assets. By default, this is the `/dist` folder
 * in the theme. If doing something custom, make sure to change this everywhere.
 */
mix.setPublicPath( 'dist' );


mix.disableSuccessNotifications();

/*
 * Set Laravel Mix options.
 *
 * @link https://laravel.com/docs/8.x/mix#postcss
 * @link https://laravel.com/docs/8.x/mix#url-processing
 */
mix.options( {
	postCss        : [ require( 'postcss-preset-env' )() ],
	processCssUrls : false
} );

/*
 * Builds sources maps for assets.
 *
 * @link https://laravel.com/docs/8.x/mix#css-source-maps
 */
mix.sourceMaps();

/*
 * Versioning and cache busting. Append a unique hash for production assets.
 *
 * @link https://laravel.com/docs/8.x/mix#versioning-and-cache-busting
 */
mix.version();


/*
 * Compile JavaScript.
 *
 * @link https://laravel.com/docs/8.x/mix#working-with-scripts
 */
mix.js( `${devPath}/js/main.js`,             'js' )
   .js( `${devPath}/js/admin/customizer.js`, 'js' );

/*
 * Compile CSS. Mix supports Sass, Less, Stylus, and plain CSS, and has functions
 * for each of them.
 *
 * @link https://laravel.com/docs/8.x/mix#working-with-stylesheets
 * @link https://laravel.com/docs/8.x/mix#sass
 * @link https://github.com/sass/node-sass#options
 */

// Sass configuration.
var sassConfig = {
	outputStyle : 'expanded',
	indentType  : 'tab',
	indentWidth : 1
};

// Compile SASS/CSS.
mix.sass( `${devPath}/css/style.scss`, 'css' ).options( sassConfig );

/*
 * Add custom Webpack configuration.
 *
 * Laravel Mix doesn't currently minimize images while using its `.copy()`
 * function, so we're using the `CopyWebpackPlugin` for processing and copying
 * images into the distribution folder.
 *
 * @link https://laravel.com/docs/8.x/mix#custom-webpack-configuration
 * @link https://webpack.js.org/configuration/
 */
mix.webpackConfig( {
	stats       : 'minimal',
	devtool     : mix.inProduction() ? false : 'source-map',
	performance : { hints  : false },
	plugins     : [
		// @link https://github.com/webpack-contrib/copy-webpack-plugin
		new CopyWebpackPlugin(
			{
				patterns: [
					{ from : `${devPath}/img`,   to : `${distPath}/img`   },
					{ from : `${devPath}/svg`,   to : `${distPath}/svg`   },
					{ from : `${devPath}/fonts`, to : `${distPath}/fonts` }
				]
			}
		),
		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					// Lossy optimization with custom option
					plugins: [
						["gifsicle", { optimizationLevel : 3 }],
						["mozjpeg", { quality: 75 }],
						["pngquant", { quality: [0.65, 0.9], speed: 4 }],
						// Svgo configuration here https://github.com/svg/svgo#configuration
						[
							"svgo",
							{
								plugins: {
									name: 'preset-default',
									overrides: {
										removeViewBox: false,
										cleanupIDs: false,
										removeUnknownsAndDefaults: false,
										addAttributesToSVGElement: {
											attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
										}
									}
								},
							},
						],
					],
				},
			},
		})
	]
} );

if ( process.argv.includes('--hot') ) {

	/*
	 * Monitor files for changes and inject your changes into the browser.
	 *
	 * @link https://laravel.com/docs/8.x/mix#browsersync-reloading
	 */
	mix.browserSync( {
		proxy : 'localhost/surface',
		files : [
			'dist/**/*',
			'./**/*.php',
		]
	} );
}
