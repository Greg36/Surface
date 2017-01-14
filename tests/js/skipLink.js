var expect = chai.expect;

import skipLinkFocus from '../../assets/js/skip-link-focus-fix.js';

describe( 'Skip Link', function () {

	before( function () {
		document.body.insertAdjacentHTML('afterend', '<div id="first-ele"></div><div id="second-ele">two</div>');
		skipLinkFocus();
	} );

	afterEach( function(){
		window.location.hash = '';
		document.activeElement.blur()
	} );

	it( 'should be ture', function () {
		expect(true).to.equal(true);
	} );

	// it( 'should change focus after url hash change', function (done) {
	// 	window.location = '#second-ele';
	// 	setTimeout( function(){
	// 		expect(document.activeElement.id).to.equal('second-ele');
	// 		done();
	// 	}, 0 );
	// } );

	// it( 'should return early if invalid has url is passed', function (done) {
	// 	window.location = '#secon@-ele';
	// 	setTimeout( function(){
	// 		expect(document.activeElement.id).to.equal('');
	// 		done();
	// 	}, 0 );
	// } );

} );
