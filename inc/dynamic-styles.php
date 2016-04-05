<?php
/**
 * Styles generated based on customizer options.
 */

/**
 * Make an array that is [selector][property] = value and parse it to CSS syntax
 */

function _s_dynamic_styles() {

	$css = [];

	/* Parse array to CSS syntax string */
	$final_css = '';
	foreach ( $css as $style => $style_array ) {
		$final_css .= $style . '{';
		foreach ( $style_array as $property => $value ) {
			$final_css .= $property . ':' . $value . ';';
		}
		$final_css .= '}';
	}

	echo '<style type="text/css">' . $final_css . '</style>';
}

add_action( 'wp_head', '_s_dynamic_styles', 99 );