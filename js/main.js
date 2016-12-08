/**
 * Main JavaScript file.
 */
import MobileNavigation from './source/navigation.js';
import skipLinkFocus from './source/skip-link-focus-fix.js';

skipLinkFocus();

const navigation = new MobileNavigation();
navigation.setupNavigation();
navigation.enableTouchFocus();
