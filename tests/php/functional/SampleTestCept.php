<?php
$I = new FunctionalTester($scenario);
$I->wantTo('test if wp is working');
$I->amOnPage('/');
$I->see('Just another WordPress site','p');
