/**
 * Main JavaScript file.
 */
import Navigation from './source/navigation.js';
import skipLinkFocus from './source/skip-link-focus-fix.js';

skipLinkFocus();

const navigation = new Navigation();
navigation.setupNavigation();
navigation.enableTouchFocus();
