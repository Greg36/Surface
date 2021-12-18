/**
 * Main JavaScript file.
 */
import Navigation from './navigation.js';
import skipLinkFocus from './skip-link-focus-fix.js';
import LazyLoad from 'vanilla-lazyload';



document.addEventListener( 'DOMContentLoaded', () => {
	const navigation = new Navigation();

	skipLinkFocus();

	navigation.setupNavigation();
	navigation.enableTouchFocus();

	// Init lazyload
	new LazyLoad();
} );

