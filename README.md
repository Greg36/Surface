# Underscores
Underscores is WordPress starter theme based on [_s](https://github.com/Automattic/_s) upgraded with many features.

Webpack config is based on [Sage](https://github.com/roots/sage) starter theme.

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

## Setup
Download `Underscores` from Github and rename the main folder to your brand new theme name. Then you will need to do find and replace on a couple of strings to change names for your theme name. Text editors like Sublime Text or any modern IDE can do that on all files in directory at once.

| Search for: | Replace with: |  |
|---|---|---|
| `'_s'` | `'new-theme-name'` | with single quotes |
| `_s_` | `new_theme_name_` | |
| `Text Domain: _s` | `Text Domain: new-theme-name` | |
| <code>&nbsp;_s</code> | <code>&nbsp;New-Theme-Name</code> | with space in front |
| `_s-` | `new-theme-name-` | |
| `__s__` | `new-theme-name` | |
| `__url__` | `http://mysite.com` | or just `http://localhost` |

To use Codeception you also need to update its settings, check [wp-browser documentation](https://github.com/lucatume/wp-browser#modules) for more info.

## Requirements
To use Codeception along with wp-browser extension it's need to be installed globally or via composer:

```
composer require lucatume/wp-browser --dev
```

---
For Karma and Codeception acceptance testing [Selenium standalone](http://docs.seleniumhq.org/docs/03_webdriver.jsp#running-standalone-selenium-server-for-use-with-remotedrivers) server is required with any needed [browser drivers](http://docs.seleniumhq.org/docs/03_webdriver.jsp#selenium-webdriver-s-drivers).
