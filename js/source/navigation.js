/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

export default class MobileNavigation {
	constructor() {
		this.container = document.getElementById( 'site-navigation' );
		this.button = this.container.getElementsByTagName( 'button' )[0];
		this.menu = this.container.getElementsByTagName( 'ul' )[0];
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

		// Toggle Aria label
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

		// Get all the link elements within the menu.
		const links = this.menu.getElementsByTagName( 'a' ),
			subMenus = this.menu.getElementsByTagName( 'ul' );

		// Set menu items with submenus to aria-haspopup="true".
		for ( let i = 0, len = this.subMenus.length; i < len; i++ ) {
			subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
		}

		// Each time a menu link is focused or blurred, toggle focus.
		for ( let i = 0, len = links.length; i < len; i++ ) {
			links[i].addEventListener( 'focus', this.constructor.toggleFocus, true );
			links[i].addEventListener( 'blur', this.constructor.toggleFocus, true );
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 * @todo: Refactor this code and make sure its working right.
	 */
	enableTouchFocus() {
		const parentLink = this.container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			const touchStartFn = ( e ) => {
				const menuItem = this.parentNode;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( let i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem !== menuItem.parentNode.children[i] ) {
							menuItem.parentNode.children[i].classList.remove( 'focus' );
						}
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( let i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	static toggleFocus() {
		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === this.className.indexOf( 'nav-menu' ) ) {
			// On li elements toggle the class .focus.
			if ( 'li' === this.tagName.toLowerCase() ) {
				if ( -1 !== this.className.indexOf( 'focus' ) ) {
					this.className = this.className.replace( ' focus', '' );
				} else {
					this.className += ' focus';
				}
			}
		}
	}
}

