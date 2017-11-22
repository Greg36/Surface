<?php


class SampleUnitTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;

    protected function _before()
    {
    }

    protected function _after()
    {
    }

	/**
	 * Test if true is true
	 */
    public function testAssertTrue()
    {
    	$this->assertTrue(true);
    }
}
