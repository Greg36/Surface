<?php
/**
 * Styles generated based on customizer options.
 *
 * @package _s
 */

/**
 * Make an array that is [selector][property] = value and parse it to CSS syntax
 */
function _s_dynamic_styles() {

	$css = [
		'body' => [
			'background' => '#fff',
		],
	];

	/* Parse array to CSS syntax string */
	$final_css = '';
	foreach ( $css as $style => $style_array ) {
		$final_css .= $style . '{';
		foreach ( $style_array as $property => $value ) {
			$final_css .= $property . ':' . $value . ';';
		}
		$final_css .= '}';
	}

	return $final_css;
}
