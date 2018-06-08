<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _s
 */

get_header();
?>

	<div id="primary" class="c-content__wrapper c-content__archive">
		<main id="main" class="l-main">

			<?php if ( have_posts() ) : ?>
				<section class="c-archive">
					<header class="c-archive__header">
						<?php
						the_archive_title( '<h1 class="c_archive__title">', '</h1>' );
						the_archive_description( '<div class="c-archive__description">', '</div>' );
						?>
					</header><!-- .page-header -->

					<?php
					/* Start the Loop */
					while ( have_posts() ) :
						the_post();

						/*
						 * Include the Post-Type-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
						 */
						get_template_part( 'template-parts/content', 'excerpt' );

					endwhile;

					the_posts_navigation();

					?>
				</section>
			<?php

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif;
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
