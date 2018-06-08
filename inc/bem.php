<?php
/*
 * Changes in core class names to match BEM syntax stricture
 *
 * To match the BEM CSS classes naming convention core classes
 * need to be overridden.
 *
 * @package _s
 */

/**
 * Change default menu item class names to match BEM syntax
 *
 * @param $classes array Menu item classes.
 *
 * @return array
 */
function _s_nav_menu_item_class( $classes ){

	$classes = array_map( function($class) {
		return str_replace( 'menu-item', 'c-menu__item', $class );
	}, $classes );

	return $classes;
}
add_filter( 'nav_menu_css_class', '_s_nav_menu_item_class' );

/**
 * Change default sub menu container class names to match BEM syntax
 *
 * @param $classes array Sub menu container classes.
 *
 * @return array
 */
function _s_nav_submenu_class( $classes ){

	$classes = array_map( function($class) {
		return str_replace( 'sub-menu', 'c-sub-menu', $class );
	}, $classes );

	return $classes;
}
add_filter( 'nav_menu_submenu_css_class', '_s_nav_submenu_class' );


/**
 * Change default comment entry classes names to match BEM syntax
 *
 * @param $classes array Comment entry classes.
 *
 * @return array
 */
function _s_test_comment_class( $classes ) {

	$classes = array_map( function($class) {
		if( $class === 'comment' ) return 'c-comment';
		if( $class === 'bypostauthor' ) return 'c-comment--author';
		return $class;
	}, $classes );

	return $classes;
}

add_filter( 'comment_class', '_s_test_comment_class' );
