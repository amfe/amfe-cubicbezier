#lib.cubicbezier

贝塞尔曲线函数。

## 最新版本

**1.0.2**

## 依赖库

无

## 用Grunt打包

运行 `npm install`，来安装所需的依赖模块。关于NPM的知识，请参见[nodejs](http://nodejs.org/);

运行 `grunt`，来对项目进行打包。关于Grunt的知识，请参见[gruntjs](http://gruntjs.com/);

## 如何使用

    var bezier = new lib.cubicbezier(
        .25, // 控制点x1
        .1,  // 控制点y1
        .25, // 控制点x2
        1    // 控制点y2
    );

    bezier(0.5) // 0.8024033876954125

## [APIs](http://gitlab.alibaba-inc.com/mtb/lib-cubicbezier/raw/master/api/index.html)

## [changelog](http://gitlab.alibaba-inc.com/mtb/lib-cubicbezier/blob/master/CHANGELOG.md)