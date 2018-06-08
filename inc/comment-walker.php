<?php
/**
 * Custom walker class used to create an HTML list of comments.
 *
 * We override html5_comment method to use BEM syntax for
 * CSS classes in the comments list.
 *
 * @package _s
 */
class _s_Walker_Comment extends Walker_Comment {

	protected function html5_comment( $comment, $depth, $args ) {
		$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';
		?>
		<<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $this->has_children ? 'parent' : '', $comment ); ?>>
		<article id="div-comment-<?php comment_ID(); ?>" class="c-comment__body">
			<footer class="c-comment__meta">
				<div class="c-comment__author vcard">
					<?php if ( 0 !== $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'] ); ?>
					<?php
					/* translators: %s: comment author link */
					printf( __( '%s <span class="says">says:</span>' ),
						sprintf( '<b class="fn">%s</b>', get_comment_author_link( $comment ) )
					);
					?>
				</div><!-- .comment-author -->

				<div class="c-comment__metadata">
					<a href="<?php echo esc_url( get_comment_link( $comment, $args ) ); ?>">
						<time datetime="<?php comment_time( 'c' ); ?>">
							<?php
							/* translators: 1: comment date, 2: comment time */
							printf( __( '%1$s at %2$s' ), get_comment_date( '', $comment ), get_comment_time() );
							?>
						</time>
					</a>
					<?php edit_comment_link( __( 'Edit' ), '<span class="o-edit-link">', '</span>' ); ?>
				</div><!-- .comment-metadata -->

				<?php if ( '0' === $comment->comment_approved ) : ?>
					<p class="c-comment__awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.' ); ?></p>
				<?php endif; ?>
			</footer><!-- .comment-meta -->

			<div class="c-comment__content s-comment-content">
				<?php comment_text(); ?>
			</div><!-- .comment-content -->

			<?php
			comment_reply_link( array_merge( $args, array(
				'add_below' => 'div-comment',
				'depth'     => $depth,
				'max_depth' => $args['max_depth'],
				'before'    => '<div class="c-comment__reply">',
				'after'     => '</div>'
			) ) );
			?>
		</article><!-- .comment-body -->
		<?php
	}
}
