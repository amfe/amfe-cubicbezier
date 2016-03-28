import {expect} from 'chai';
import TestClass from '../src/class';

describe('class.js', function () {
    it('new a class', function() {
        var testClass = new TestClass();

        expect(testClass).to.be.an.instanceof(TestClass);
    });

    it('member "version"', function() {
        var testClass = new TestClass();

        expect(testClass.version).to.be.a('string');
        expect(testClass.version).to.equal('1.0.0');
    });
});