# Underscores
Underscores is WordPress starter theme based on [_s](https://github.com/Automattic/_s) upgraded with many features.

Webpack config is based on [Sage](https://github.com/roots/sage) starter theme.

**All features work but I am yet to test the 'find and replace' setup from _s so proceed with caution when customizing it for your porject.**

## Features
* [Webpack](https://webpack.js.org/)  build tool
* [BrowserSync](https://browsersync.io/) with live reload
* [Codeception](http://codeception.com/) testing suit with [wp-browser](https://github.com/lucatume/wp-browser) extension
* [Babel](https://babeljs.io/) transpiler for JavaScript ES6 support
* [Karma](http://karma-runner.github.io/1.0/index.html) test runner
* [Mocha](https://mochajs.org/) test framework
* [Chai](http://chaijs.com/) assertion library
* [Sinon](http://sinonjs.org/) mocking library
* [BackstopJS](https://garris.github.io/BackstopJS/) visual regression tester
* [ESLint](http://eslint.org/) JavaScript code linter

## Requirements
To use Codeception it's need to be installed globally or via composer, along with wp-browser extension:
```
composer require codeception/codeception --dev
composer require lucatume/wp-browser --dev
```

---
For Karma and Codeception acceptance testing [Selenium standalone](http://docs.seleniumhq.org/docs/03_webdriver.jsp#running-standalone-selenium-server-for-use-with-remotedrivers) server with needed [browser drivers](http://docs.seleniumhq.org/docs/03_webdriver.jsp#selenium-webdriver-s-drivers).
