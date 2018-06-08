<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package _s
 */

if ( ! function_exists( '_s_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function _s_posted_on() {
		$time_string = '<time class="c-posted-on__date c-posted-on__date--published c-posted-on__date--updated" datetime="%1$s">%2$s</time>';

		// Post has been updated
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="c-posted-on__date c-posted-on__date--published" datetime="%1$s">%2$s</time><time class="c-posted-on__date--updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf( $time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf(
		/* translators: %s: post date. */
			esc_html_x( 'Posted on %s', 'post date', '_s' ),
			'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="c-posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.

	}
endif;

if ( ! function_exists( '_s_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function _s_posted_by() {
		$byline = sprintf(
		/* translators: %s: post author. */
			esc_html_x( 'by %s', 'post author', '_s' ),
			'<span class="c-byline__author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
		);

		echo '<span class="c-byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

	}
endif;

if ( ! function_exists( '_s_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function _s_entry_footer() {
		echo '<div class="c-post-links">';

		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', '_s' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="c-post-links__cat">' . esc_html__( 'Posted in %1$s', '_s' ) . '</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', '_s' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="c-post-links__tags">' . esc_html__( 'Tagged %1$s', '_s' ) . '</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="c-post-links__comments">';
			comments_popup_link(
				sprintf(
					wp_kses(
					/* translators: %s: post title */
						__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', '_s' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			echo '</span>';
		}

		echo '</div>'; // .c-post-links

		edit_post_link(
			sprintf(
				wp_kses(
				/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', '_s' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="o-edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( '_s_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function _s_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="c-post-thumbnail">
				<?php the_post_thumbnail( 'post-thumbnail', array(
					'class' => 'c-post-thumbnail__image'
				) ); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

			<a class="c-post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true">
				<?php
				the_post_thumbnail( 'post-thumbnail', array(
					'alt'   => the_title_attribute( array(
						'echo' => false,
					) ),
					'class' => 'c-post-thumbnail__image'
				) );
				?>
			</a>

		<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( '_s_comments_navigation' ) ) {
	/**
	 * Displays custom comments navigation links
	 *
	 * Custom comments navigation to add a wrapper and use BEM syntax for
	 * class names.
	 */
	function _s_comments_navigation() {
		$navigation = '';

		// Are there comments to navigate through?
		if ( get_comment_pages_count() > 1 ) {

			$template = '
			<nav class="c-comments-nav" role="navigation">
				<h2 class="screen-reader-text">%1$s</h2>
				<div class="c-comments-nav__links">%2$s</div>
			</nav>';

			$nav_links = '';
			$prev_link = get_previous_comments_link( __( 'Older comments', '_s' ) );
			$next_link = get_next_comments_link( __( 'Newer comments', '_s' ) );

			if ( $prev_link ) {
				$nav_links .= '<div class="c-comments-nav__prev">' . $prev_link . '</div>';
			}
			if ( $next_link ) {
				$nav_links .= '<div class="c-comments-nav__next">' . $next_link . '</div>';
			}

			$navigation = sprintf( $template,
				__( 'Comments navigation', '_s' ),
				$nav_links
			);
		}

		return $navigation;
	}
}

if ( ! function_exists( '_s_post_navigation' ) ) {
	/**
	 * Displays custom comments navigation links
	 *
	 * Custom comments navigation to add a wrapper and use BEM syntax for
	 * class names.
	 */
	function _s_post_navigation() {

		$navigation = '';

		$previous = get_previous_post_link(
			'<div class="c-post-nav__previous">%link</div>'
		);

		$next = get_next_post_link(
			'<div class="c-post-nav__next">%link</div>'
		);

		// Only add markup if there's somewhere to navigate to.
		if ( $previous || $next ) {

			$template = '
			<nav class="c-post-nav" role="navigation">
				<h2 class="screen-reader-text">%1$s</h2>
				<div class="c-post-nav__links">%2$s</div>
			</nav>';

			$navigation = sprintf( $template,
				__( 'Post navigation', '_s' ),
				$previous . $next
			);

		}

		return $navigation;
	}
}
