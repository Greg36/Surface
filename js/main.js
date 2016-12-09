/**
 * Main JavaScript file.
 */
import Navigation from './source/navigation.js';
import skipLinkFocus from './source/skip-link-focus-fix.js';

document.addEventListener( 'DOMContentLoaded', () => {
	const navigation = new Navigation();

	skipLinkFocus();
	navigation.setupNavigation();
	navigation.enableTouchFocus();
} );

