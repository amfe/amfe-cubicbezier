import {expect} from 'chai';
import {version, TestClass} from '../src/index';

describe('index.js', function () {
    var testClass;

    before(function(done) {
        setTimeout(function() {
            testClass = new TestClass();
            done();
        }, 500);
    });

    it('export version', function() {
        expect(version).to.equal('1.0.0');
    });

    it('export TestClass', function(done) {
        expect(testClass).to.be.an.instanceof(TestClass);
        expect(testClass.version).to.be.a('string');

        setTimeout(function() {
            expect(testClass.version).to.equal('1.0.0');
            done();
        }, 500);
    });
});