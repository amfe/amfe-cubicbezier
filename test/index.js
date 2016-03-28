import {expect} from 'chai';
import * as cubicbezier from '../src/index';

describe('index.js', () => {
    it('export generate', () => {
        expect(cubicbezier.generate).to.be.a('function');
    });

    it('export default functions', () => {
        expect(cubicbezier.linear).to.be.a('function');
        expect(cubicbezier.ease).to.be.a('function');
        expect(cubicbezier.easeIn).to.be.a('function');
        expect(cubicbezier.easeOut).to.be.a('function');
        expect(cubicbezier.easeInOut).to.be.a('function');
    });

    it('linear', () => {
        const _linear = cubicbezier.generate(0, 0, 1, 1);
        const x = parseFloat(Math.random().toFixed(5));
        expect(parseFloat(_linear(0).toFixed(5))).to.be.equal(0);
        expect(parseFloat(_linear(0.5).toFixed(5))).to.be.equal(0.5);
        expect(parseFloat(_linear(1).toFixed(5))).to.be.equal(1);
        expect(parseFloat(_linear(x).toFixed(5))).to.be.equal(x);
        expect(parseFloat(_linear(x).toFixed(5))).to.be
            .equal(parseFloat(cubicbezier.linear(x).toFixed(5)));
    });

    it('ease', () => {
        const _ease = cubicbezier.generate(.25, .1, .25, 1);
        const x = Math.random().toFixed(5);
        expect(parseFloat(_ease(0).toFixed(5))).to.be.equal(0);
        expect(parseFloat(_ease(0.5).toFixed(5))).to.be.equal(0.8024);
        expect(parseFloat(_ease(1).toFixed(5))).to.be.equal(1);
        expect(parseFloat(_ease(x).toFixed(5))).to.be
            .equal(parseFloat(cubicbezier.ease(x).toFixed(5)));
    });

    it('easeIn', () => {
        const _easeIn = cubicbezier.generate(.42, 0, 1, 1);
        const x = Math.random().toFixed(5);
        expect(parseFloat(_easeIn(0).toFixed(5))).to.be.equal(0);
        expect(parseFloat(_easeIn(0.5).toFixed(5))).to.be.equal(0.31536);
        expect(parseFloat(_easeIn(1).toFixed(5))).to.be.equal(1);
        expect(parseFloat(_easeIn(x).toFixed(5))).to.be
            .equal(parseFloat(cubicbezier.easeIn(x).toFixed(5)));
    });

    it('easeOut', () => {
        const _easeOut = cubicbezier.generate(0, 0, .58, 1);
        const x = Math.random().toFixed(5);
        expect(parseFloat(_easeOut(0).toFixed(5))).to.be.equal(0);
        expect(parseFloat(_easeOut(0.5).toFixed(5))).to.be.equal(0.68464);
        expect(parseFloat(_easeOut(1).toFixed(5))).to.be.equal(1);
        expect(parseFloat(_easeOut(x).toFixed(5))).to.be
            .equal(parseFloat(cubicbezier.easeOut(x).toFixed(5)));
    });

    it('easeInOut', () => {
        const _easeInOut = cubicbezier.generate(.42, 0, .58, 1);
        const x = Math.random().toFixed(5);
        expect(parseFloat(_easeInOut(0).toFixed(5))).to.be.equal(0);
        expect(parseFloat(_easeInOut(0.5).toFixed(5))).to.be.equal(0.5);
        expect(parseFloat(_easeInOut(1).toFixed(5))).to.be.equal(1);
        expect(parseFloat(_easeInOut(x).toFixed(5))).to.be
            .equal(parseFloat(cubicbezier.easeInOut(x).toFixed(5)));
    });
});