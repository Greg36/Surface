<?php
$I = new AcceptanceTester($scenario);
$I->wantTo('test if wp is working in selenium');
$I->amOnPage('/');
$I->see('Just another WordPress site','p');
