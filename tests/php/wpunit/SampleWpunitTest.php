<?php

class SampleWpunitTest extends \Codeception\TestCase\WPTestCase
{

    public function setUp()
    {
        // before
        parent::setUp();

        // your set up methods here
    }

    public function tearDown()
    {
        // your tear down methods here

        // then
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
