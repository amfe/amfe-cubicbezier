'use strict';

/**
 * @module testlib1
 */

/**
 * @requires class:TestClass
 */
import TestClass from './class';

const testclass = new TestClass();
const version = testclass.version;

/*eslint-disable no-alert, no-console */

/* istanbul ignore if */
if (typeof alert === 'function' && typeof console === 'object') {
    alert('foo');
    console.log('bar');
}

/*eslint-enable no-alert, no-console */

export {
    /**
     * version
     * @type {string}
     */
    version,
    /**
     * @type {TestClass}
     */
    TestClass
};