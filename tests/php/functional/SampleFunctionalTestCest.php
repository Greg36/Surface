<?php


class SampleFunctionalTestCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

	/**
	 * It should set the current theme
	 */
	public function itShould_set_theCurrentTheme(FunctionalTester $I)
	{
		$I->useTheme('foo', 'bar', 'Baz');

		$I->seeOptionInDatabase(['option_name' => 'stylesheet', 'option_value' => 'foo']);
		$I->seeOptionInDatabase(['option_name' => 'template', 'option_value' => 'bar']);
		$I->seeOptionInDatabase(['option_name' => 'current_theme', 'option_value' => 'Baz']);
	}
}
