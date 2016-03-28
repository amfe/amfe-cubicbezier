# Getting Started

## Install

```shell
tnpm install amfe-cubicbezier --save
```

## Usage

```javascript
import * as cubicbezier from 'amfe-cubicbezier';
```

## Samples

Generate a function:

```javascript
import {generate} from 'amfe-cubicbezier';

var bounceIn = generate(.42, 0, .5, 1.5);
```

Use default functions:

```javascript
import {ease} from 'amfe-cubicbezier';

var x = 0.5;
var y = ease(x);
```
