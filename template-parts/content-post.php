<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'c-post' ); ?>>
	<header class="c-post__header">
		<?php
		the_title( '<h1 class="c-post__title">', '</h1>' );
		?>

		<div class="c-post__meta">
			<?php
			_s_posted_on();
			_s_posted_by();
			?>
		</div>

	</header>

	<?php _s_post_thumbnail(); ?>

	<div class="c-post__content s-post-content">
		<?php
		the_content();

		wp_link_pages( array(
			'before' => '<div class="c-page-links">' . esc_html__( 'Pages:', '_s' ),
			'after'  => '</div>',
		) );
		?>
	</div>

	<footer class="c-post__footer">
		<?php _s_entry_footer(); ?>
	</footer>
</article>
