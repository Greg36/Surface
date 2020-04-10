/*
 * Test navigation accessibility aids
 */
import Navigation from '../../assets/js/navigation.js';

describe('SampleTestSuit', function() {

	describe('SimpleTest', function() {

		it('should be true', function() {
			let foo = true;
			expect(foo).to.equal(true);
		});
	});

	describe("SinonExampleTest", function () {
		let time2013_10_01 = (new Date(2013, 10-1, 1)).getTime();

		before(function() {
			// sinon was defined in global scope
			this.fakeTimer = new sinon.useFakeTimers(time2013_10_01);
		});

		it("should be 2013 now", function() {
			let year = new Date().getFullYear();
			expect(year).to.equal( 2013 );
		});

		after(function() {
			this.fakeTimer.restore();
		});

	});
});
