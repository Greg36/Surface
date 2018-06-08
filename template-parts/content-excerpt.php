<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'c-entry' ); ?>>
	<header class="c-entry__header">
		<?php
		the_title( '<h2 class="c-entry__title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );

		if ( 'post' === get_post_type() ) :
			?>
			<div class="c-entry__meta">
				<?php
				_s_posted_on();
				_s_posted_by();
				?>
			</div>
		<?php endif; ?>
	</header>

	<?php _s_post_thumbnail(); ?>

	<div class="c-entry__summary">
		<?php the_excerpt(); ?>
	</div>

	<footer class="c-entry__footer">
		<?php _s_entry_footer(); ?>
	</footer>
</article>
