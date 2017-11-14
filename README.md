# Underscores
Underscores is WordPress starter theme based on [_s](https://github.com/Automattic/_s) upgraded with many features for development. It supports **Sass**, **ES6**, **HMR** (aka instant live reload) along with full suit of testing frameworks.

Theme itself is still organized in "the WordPress way" and suitable for [WordPress.org](http://wordpress.org/) theme development.

Webpack config is based on [Sage](https://github.com/roots/sage) starter theme.

## Features
* [Webpack](https://webpack.js.org/) as a build tool
* [BrowserSync](https://browsersync.io/) to develop with instant live reload
* [Codeception](http://codeception.com/) PHP testing suit with [wp-browser](https://github.com/lucatume/wp-browser) extension
* [Karma](http://karma-runner.github.io/1.0/index.html) JS unit test runner
* [Mocha](https://mochajs.org/) JS unit test framework
* [Chai](http://chaijs.com/) JS unit assertion library
* [Sinon](http://sinonjs.org/) JS unit mocking library
* [BackstopJS](https://garris.github.io/BackstopJS/) visual regression tester

## Setup
Download `Underscores` from Github and rename the main folder to your brand new theme name. Then you will need to do find and replace on a couple of strings to change names for your unique theme name. Text editors like Sublime Text or any modern IDE can do that on all files in directory at once.

| Search for: | Replace with: |  |
|---|---|---|
| `'_s'` | `'new-theme-name'` | with single quotes |
| `_s_` | `new_theme_name_` | |
| `Text Domain: _s` | `Text Domain: new-theme-name` | |
| `package _s` | `package New_Theme_Name` |  |
| <code>&nbsp;_s</code> | <code>&nbsp;New Theme Name</code> | with space in front |
| `_s-` | `new-theme-name-` | |
| `--s--` | `new-theme-name` | |
| `__url__` | `http://mysite.com` | or just `http://localhost` |

## Testing

All major test cases are covered:

* JS unit tests - Chai, Sinon, Mocha testing stack run on Karma with Chrome and Firefox headless setup by default,
* PHP unit tests - Codeception unit suit powered by [PHPUnit](https://phpunit.de/),
* Integration tests - Codeception wpunit suit that implements [WP Core automated suite](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/) of helpful fixtures and factories,
* Functional tests - Codeception functional suit that emulates and process requests without need to run a web server,
* Acceptance tests - Codeception acceptance suit tests with non-javascript browser (WebDriver solution can also be configured),
* Visual regression - BackstopJS framework for automatic comparision of DOM screenshots over time.

### Codeception

To use Codeception you need to update its settings, check [wp-browser documentation](https://github.com/lucatume/wp-browser#modules) for more in-depth info.

To install Codeception with [wp-browser](https://github.com/lucatume/wp-browser) extension use [Composer](https://getcomposer.org/), the wp-browser package already contains Codeception so require just one dependency: 

```
composer require lucatume/wp-browser --dev
```

