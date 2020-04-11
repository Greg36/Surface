/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

export default class Navigation {
	constructor() {
		this.container = document.getElementById( 'site-navigation' );
		this.button = this.container.getElementsByTagName( 'button' )[ 0 ];
		this.menu = this.container.getElementsByTagName( 'ul' )[ 0 ];
	}

	setupNavigation() {
		if ( ! this.container || 'undefined' === typeof this.button ) {
			return;
		}

		// Hide menu toggle button if menu is empty and return early.
		if ( 'undefined' === typeof this.menu ) {
			this.button.style.display = 'none';

			return;
		}

		// Have menu closed by default
		this.menu.setAttribute( 'aria-expanded', 'false' );
		if ( -1 === this.menu.className.indexOf( 'nav-menu' ) ) {
			this.menu.className += ' nav-menu';
		}

		// Toggle mobile navigation
		this.button.onclick = () => {
			if ( -1 !== this.container.className.indexOf( 'toggled' ) ) {
				this.container.className = this.container.className.replace( ' toggled', '' );
				this.button.setAttribute( 'aria-expanded', 'false' );
				this.menu.setAttribute( 'aria-expanded', 'false' );
			} else {
				this.container.className += ' toggled';
				this.button.setAttribute( 'aria-expanded', 'true' );
				this.menu.setAttribute( 'aria-expanded', 'true' );
			}
		};

		this.navAccessibilitySupport();
	}

	/**
	 * Allow keyboard users to use multi-level navigation
	 */
	navAccessibilitySupport() {
	// Get all the link elements within the menu.
		const links = this.menu.getElementsByTagName( 'a' );

		// Each time a menu link is focused or blurred, toggle focus.
		for (let i = 0; i < links.length; i++) {
			links[ i ].addEventListener( 'focus', links[ i ].toggleFocus, true );
			links[ i ].addEventListener( 'blur', links[ i ].toggleFocus, true );
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	enableTouchFocus() {
		const parentLink = this.container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			const touchStartFn = ( e ) => {
				const menuItem = this.parentNode;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( let i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem !== menuItem.parentNode.children[ i ] ) {
							menuItem.parentNode.children[ i ].classList.remove( 'focus' );
						}
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( let i = 0; i < parentLink.length; ++i ) {
				parentLink[ i ].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	toggleFocus() {
		let self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {
			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}
}

