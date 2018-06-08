/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
/* eslint-disable */

( function( $ ) {

	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.c-site-branding__title a' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.c-site-branding__description' ).text( to );
		} );
	} );

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.c-site-branding__title, .c-site-branding__description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.c-site-branding__title, .c-site-branding__description' ).css( {
					'clip': 'auto',
					'position': 'relative'
				} );
				$( '.c-site-branding__title a, .c-site-branding__description' ).css( {
					'color': to
				} );
			}
		} );
	} );
} )( jQuery );
