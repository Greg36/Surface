var expect = chai.expect;

import skipLinkFocus from '../../js/source/skip-link-focus-fix.js';

describe( 'Skip Link', function () {
	it( 'should change focus after url hash change', function (done) {

		skipLinkFocus();
		document.body.insertAdjacentHTML('afterend', '<div id="first-ele"></div><div id="second-ele">two</div>');
		window.location = '#second-ele';
		window.addEventListener( 'hashchange', function(){
			done();
			expect(document.activeElement.id).to.equal('first-ele');
		});
	} );
} );
