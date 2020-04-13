<?php

class SampleWpunitTest extends \Codeception\TestCase\WPTestCase
{

	/**
	 * @var \WpunitTester
	 */
	protected $tester;

	public function setUp(): void
	{
		// Before...
		parent::setUp();

		// Your set up methods here.
	}

	public function tearDown(): void
	{
		// Your tear down methods here.

		// Then...
		parent::tearDown();
	}

    // Test WP core function
	public function test_escapingHtml() {
		$this->assertSame( 'foo&lt;br&gt;bar', esc_html( 'foo<br>bar' ) );
	}

	// Test using WP_UnitTest_Factory factory
	public function test_editorUser_can_editOthersPosts() {
		$user_id = self::factory()->user->create( array(
			'role' => 'editor',
		) );

		$this->assertTrue( user_can( $user_id, 'edit_others_posts' ) );
	}
}
