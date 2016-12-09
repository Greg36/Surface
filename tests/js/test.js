var expect = chai.expect;

describe('Sample', function() {
	describe('FooBar', function() {
		it('should be a bar string', function() {
			var foo = 'bar';
			expect(foo).to.be.a('string');
			expect(foo).to.equal('bar');
			expect(foo).to.have.length(3);

		});
	});
	describe('Tea Test', function () {
		var tea = {
			flavors: ['xd','xd2','xd3']
		};
		it('shout taste nice', function () {
			expect(tea).to.have.property('flavors')
				.with.length(3);
		});

		it('Should have some xd2', function () {
			expect(tea.flavors).to.include('xd2');
		});
		it('Should have some xd3', function () {
			expect(tea.flavors).to.include('xd3');
		});
	});
});


