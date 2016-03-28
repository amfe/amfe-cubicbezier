# The API

```javascript
import {generate, linear, ease, easeIn, easeOut, easeInOut} from 'amfe-cubicbezier';
```

## generate(x1, y1, x2, y2)

return a quadratic function.

```jsdoc
@param {number} the x of first control point
@param {number} the y of first control point
@param {number} the x of second control point
@param {number} the y of second control point
@return {function} a quadratic function
```

## linear(x)

a default quadratic function with `0, 0, 1, 1` control points.

```jsdoc
@param {number} the x
@return {number} the y
```

## ease(x)

a default quadratic function with `.25, .1, .25, 1` control points.

```jsdoc
@param {number} the x
@return {number} the y
```

## easeIn(x)

a default quadratic function with `.42, 0, 1, 1` control points.

```jsdoc
@param {number} the x
@return {number} the y
```

## easeOut(x)

a default quadratic function with `0, 0, .58, 1` control points.

```jsdoc
@param {number} the x
@return {number} the y
```

## easeInOut(x)

a default quadratic function with `.42, 0, .58, 1` control points.

```jsdoc
@param {number} the x
@return {number} the y
```
