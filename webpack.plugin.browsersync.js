'use strict'; // eslint-disable-line

const webpackDevMiddleware = require( 'webpack-dev-middleware' ),
	webpackHotMiddleware = require( 'webpack-hot-middleware' ),
	browserSync = require( 'browser-sync' ),
	url = require( 'url' ),
	uniq = require( 'lodash/uniq' );

module.exports = class {
	constructor( options ) {
		this.watcher = null;
		this.compiler = null;
		this.options = options;
	}
	apply(compiler) {
		if (this.options.disable) {
			return;
		}
		this.compiler = compiler;
		compiler.plugin('done', () => {
			if (!this.watcher) {
				this.watcher = browserSync.create();
				compiler.plugin('compilation', () => this.watcher.notify('Rebuilding...'));
				this.start();
			}
		});
	}
	start() {
		const watcherConfig = {
			host: url.parse( this.options.proxyUrl ).hostname,
			port: url.parse( this.options.proxyUrl ).port,
			injectFileTypes: ["scss","js"],
			proxy: {
				target: this.options.target,
				middleware: this.middleware(),
			},
			files: [],
		};
		watcherConfig.files = uniq( watcherConfig.files.concat( this.options.watch ) );
		this.watcher.init( watcherConfig, this.options.callback.bind( this ) );
	}
	middleware() {
		this.webpackDevMiddleware = webpackDevMiddleware(this.compiler, {
			publicPath: this.options.publicPath,
			stats: { colors: true },
			noInfo: true,
		} );
		this.webpackHotMiddleware = webpackHotMiddleware(this.compiler, {
			log: this.watcher.notify.bind(this.watcher),
		} );
		return [this.webpackDevMiddleware, this.webpackHotMiddleware];
	}
};
