var expect = chai.expect;

import skipLinkFocus from '../../js/source/skip-link-focus-fix.js';
//@todo: Refactor this mess with Sinon
describe( 'Skip Link', function () {
	it( 'should change focus after url hash change', function () {
		console.log(document.activeElement.tagName);
		skipLinkFocus();
		document.body.insertAdjacentHTML('afterend', '<div id="first-ele"></div><div id="second-ele">two</div>');
		window.location = '#second-ele';
		this.timeout(1000);
		expect(document.activeElement.id).to.equal('second-ele');
		console.log(document.activeElement.tagName);

	} );
} );
