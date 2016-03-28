require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"amfe-cubicbezier":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generate = generate;
function generate(p1x, p1y, p2x, p2y) {
    var ZERO_LIMIT = 1e-6;
    // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).
    var ax = 3 * p1x - 3 * p2x + 1;
    var bx = 3 * p2x - 6 * p1x;
    var cx = 3 * p1x;

    var ay = 3 * p1y - 3 * p2y + 1;
    var by = 3 * p2y - 6 * p1y;
    var cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
        return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }

    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x) {
        var t2 = x;
        var derivative;
        var x2;

        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
        // First try a few iterations of Newton's method -- normally very fast.
        // http://en.wikipedia.org/wiki/Newton's_method
        for (var i = 0; i < 8; i++) {
            // f(t)-x=0
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            // == 0, failure
            /* istanbul ignore if */
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        // bisection
        // http://en.wikipedia.org/wiki/Bisection_method
        var t1 = 1;
        /* istanbul ignore next */
        var t0 = 0;

        /* istanbul ignore next */
        t2 = x;
        /* istanbul ignore next */
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }

        // Failure
        return t2;
    }

    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }

    return solve;
}

var linear = exports.linear = generate(0, 0, 1, 1);
var ease = exports.ease = generate(.25, .1, .25, 1);
var easeIn = exports.easeIn = generate(.42, 0, 1, 1);
var easeOut = exports.easeOut = generate(0, 0, .58, 1);
var easeInOut = exports.easeInOut = generate(.42, 0, .58, 1);

},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7UUFFZ0I7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0M7QUFDekMsUUFBTSxhQUFhLElBQWI7OztBQURtQyxRQUluQyxLQUFLLElBQUksR0FBSixHQUFVLElBQUksR0FBSixHQUFVLENBQXBCLENBSjhCO0FBS3pDLFFBQU0sS0FBSyxJQUFJLEdBQUosR0FBVSxJQUFJLEdBQUosQ0FMb0I7QUFNekMsUUFBTSxLQUFLLElBQUksR0FBSixDQU44Qjs7QUFRekMsUUFBTSxLQUFLLElBQUksR0FBSixHQUFVLElBQUksR0FBSixHQUFVLENBQXBCLENBUjhCO0FBU3pDLFFBQU0sS0FBSyxJQUFJLEdBQUosR0FBVSxJQUFJLEdBQUosQ0FUb0I7QUFVekMsUUFBTSxLQUFLLElBQUksR0FBSixDQVY4Qjs7QUFZekMsYUFBUyxzQkFBVCxDQUFnQyxDQUFoQyxFQUFtQzs7QUFFL0IsZUFBTyxDQUFDLElBQUksRUFBSixHQUFTLENBQVQsR0FBYSxJQUFJLEVBQUosQ0FBZCxHQUF3QixDQUF4QixHQUE0QixFQUE1QixDQUZ3QjtLQUFuQzs7QUFLQSxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFMLEdBQVMsRUFBVCxDQUFELEdBQWdCLENBQWhCLEdBQW9CLEVBQXBCLENBQUQsR0FBNEIsQ0FBNUIsQ0FEYztLQUF6Qjs7QUFJQSxhQUFTLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFMLEdBQVMsRUFBVCxDQUFELEdBQWdCLENBQWhCLEdBQW9CLEVBQXBCLENBQUQsR0FBNEIsQ0FBNUIsQ0FEYztLQUF6Qjs7O0FBckJ5QyxhQTBCaEMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUNwQixZQUFJLEtBQUssQ0FBTCxDQURnQjtBQUVwQixZQUFJLFVBQUosQ0FGb0I7QUFHcEIsWUFBSSxFQUFKOzs7OztBQUhvQixhQVFmLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxDQUFKLEVBQU8sR0FBdkIsRUFBNEI7O0FBRXhCLGlCQUFLLGFBQWEsRUFBYixJQUFtQixDQUFuQixDQUZtQjtBQUd4QixnQkFBSSxLQUFLLEdBQUwsQ0FBUyxFQUFULElBQWUsVUFBZixFQUEyQjtBQUMzQix1QkFBTyxFQUFQLENBRDJCO2FBQS9CO0FBR0EseUJBQWEsdUJBQXVCLEVBQXZCLENBQWI7OztBQU53QixnQkFTcEIsS0FBSyxHQUFMLENBQVMsVUFBVCxJQUF1QixVQUF2QixFQUFtQztBQUNuQyxzQkFEbUM7YUFBdkM7QUFHQSxrQkFBTSxLQUFLLFVBQUwsQ0Faa0I7U0FBNUI7Ozs7O0FBUm9CLFlBMEJoQixLQUFLLENBQUw7O0FBMUJnQixZQTRCaEIsS0FBSyxDQUFMOzs7QUE1QmdCLFVBK0JwQixHQUFLLENBQUw7O0FBL0JvQixlQWlDYixLQUFLLEVBQUwsRUFBUztBQUNaLGlCQUFLLGFBQWEsRUFBYixJQUFtQixDQUFuQixDQURPO0FBRVosZ0JBQUksS0FBSyxHQUFMLENBQVMsRUFBVCxJQUFlLFVBQWYsRUFBMkI7QUFDM0IsdUJBQU8sRUFBUCxDQUQyQjthQUEvQjtBQUdBLGdCQUFJLEtBQUssQ0FBTCxFQUFRO0FBQ1IscUJBQUssRUFBTCxDQURRO2FBQVosTUFFTztBQUNILHFCQUFLLEVBQUwsQ0FERzthQUZQO0FBS0EsaUJBQUssQ0FBQyxLQUFLLEVBQUwsQ0FBRCxHQUFZLENBQVosQ0FWTztTQUFoQjs7O0FBakNvQixlQStDYixFQUFQLENBL0NvQjtLQUF4Qjs7QUFrREEsYUFBUyxLQUFULENBQWUsQ0FBZixFQUFrQjtBQUNkLGVBQU8sYUFBYSxZQUFZLENBQVosQ0FBYixDQUFQLENBRGM7S0FBbEI7O0FBSUEsV0FBTyxLQUFQLENBaEZ5QztDQUF0Qzs7QUFtRkEsSUFBSSwwQkFBUyxTQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFUO0FBQ0osSUFBSSxzQkFBTyxTQUFTLEdBQVQsRUFBYyxFQUFkLEVBQWtCLEdBQWxCLEVBQXVCLENBQXZCLENBQVA7QUFDSixJQUFJLDBCQUFTLFNBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBVDtBQUNKLElBQUksNEJBQVUsU0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBVjtBQUNKLElBQUksZ0NBQVksU0FBUyxHQUFULEVBQWMsQ0FBZCxFQUFpQixHQUFqQixFQUFzQixDQUF0QixDQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlKHAxeCwgcDF5LCBwMngsIHAyeSkge1xuICAgIGNvbnN0IFpFUk9fTElNSVQgPSAxZS02O1xuICAgIC8vIENhbGN1bGF0ZSB0aGUgcG9seW5vbWlhbCBjb2VmZmljaWVudHMsXG4gICAgLy8gaW1wbGljaXQgZmlyc3QgYW5kIGxhc3QgY29udHJvbCBwb2ludHMgYXJlICgwLDApIGFuZCAoMSwxKS5cbiAgICBjb25zdCBheCA9IDMgKiBwMXggLSAzICogcDJ4ICsgMTtcbiAgICBjb25zdCBieCA9IDMgKiBwMnggLSA2ICogcDF4O1xuICAgIGNvbnN0IGN4ID0gMyAqIHAxeDtcblxuICAgIGNvbnN0IGF5ID0gMyAqIHAxeSAtIDMgKiBwMnkgKyAxO1xuICAgIGNvbnN0IGJ5ID0gMyAqIHAyeSAtIDYgKiBwMXk7XG4gICAgY29uc3QgY3kgPSAzICogcDF5O1xuXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0KSB7XG4gICAgICAgIC8vIGBheCB0XjMgKyBieCB0XjIgKyBjeCB0JyBleHBhbmRlZCB1c2luZyBIb3JuZXIgJ3MgcnVsZS5cbiAgICAgICAgcmV0dXJuICgzICogYXggKiB0ICsgMiAqIGJ4KSAqIHQgKyBjeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZVgodCkge1xuICAgICAgICByZXR1cm4gKChheCAqIHQgKyBieCkgKiB0ICsgY3ggKSAqIHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVZKHQpIHtcbiAgICAgICAgcmV0dXJuICgoYXkgKiB0ICsgYnkpICogdCArIGN5ICkgKiB0O1xuICAgIH1cblxuICAgIC8vIEdpdmVuIGFuIHggdmFsdWUsIGZpbmQgYSBwYXJhbWV0cmljIHZhbHVlIGl0IGNhbWUgZnJvbS5cbiAgICBmdW5jdGlvbiBzb2x2ZUN1cnZlWCh4KSB7XG4gICAgICAgIHZhciB0MiA9IHg7XG4gICAgICAgIHZhciBkZXJpdmF0aXZlO1xuICAgICAgICB2YXIgeDI7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly90cmFjLndlYmtpdC5vcmcvYnJvd3Nlci90cnVuay9Tb3VyY2UvV2ViQ29yZS9wbGF0Zm9ybS9hbmltYXRpb25cbiAgICAgICAgLy8gRmlyc3QgdHJ5IGEgZmV3IGl0ZXJhdGlvbnMgb2YgTmV3dG9uJ3MgbWV0aG9kIC0tIG5vcm1hbGx5IHZlcnkgZmFzdC5cbiAgICAgICAgLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OZXd0b24nc19tZXRob2RcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIC8vIGYodCkteD0wXG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXJpdmF0aXZlID0gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0Mik7XG4gICAgICAgICAgICAvLyA9PSAwLCBmYWlsdXJlXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyIC09IHgyIC8gZGVyaXZhdGl2ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGUgYmlzZWN0aW9uIG1ldGhvZCBmb3IgcmVsaWFiaWxpdHkuXG4gICAgICAgIC8vIGJpc2VjdGlvblxuICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jpc2VjdGlvbl9tZXRob2RcbiAgICAgICAgdmFyIHQxID0gMTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdmFyIHQwID0gMDtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0MiA9IHg7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHdoaWxlICh0MSA+IHQwKSB7XG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeDIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdDEgPSB0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyID0gKHQxICsgdDApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhaWx1cmVcbiAgICAgICAgcmV0dXJuIHQyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvbHZlKHgpIHtcbiAgICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbHZlO1xufVxuXG5leHBvcnQgdmFyIGxpbmVhciA9IGdlbmVyYXRlKDAsIDAsIDEsIDEpO1xuZXhwb3J0IHZhciBlYXNlID0gZ2VuZXJhdGUoLjI1LCAuMSwgLjI1LCAxKTtcbmV4cG9ydCB2YXIgZWFzZUluID0gZ2VuZXJhdGUoLjQyLCAwLCAxLCAxKTtcbmV4cG9ydCB2YXIgZWFzZU91dCA9IGdlbmVyYXRlKDAsIDAsIC41OCwgMSk7XG5leHBvcnQgdmFyIGVhc2VJbk91dCA9IGdlbmVyYXRlKC40MiwgMCwgLjU4LCAxKTsiXX0=
