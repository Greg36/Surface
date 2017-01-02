<?php
/**
 * PHPUnit bootstrap file
 *
 * @package _s
 */

/**
 * Path to WordPress Core unit test suite directory in WP root
 * @link https://core.trac.wordpress.org/browser/trunk/tests
 */
$_tests_dir = realpath( dirname(__FILE__) . '/../../../../../tests/phpunit' );


// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

function _register_theme() {

	$theme_dir = dirname( dirname( dirname( __FILE__ ) ) );
	$current_theme = basename( $theme_dir );

	register_theme_directory( dirname( $theme_dir ) );

	add_filter( 'pre_option_template', function() use ( $current_theme ) {
		return $current_theme;
	});
	add_filter( 'pre_option_stylesheet', function() use ( $current_theme ) {
		return $current_theme;
	});
}
tests_add_filter( 'muplugins_loaded', '_register_theme' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
