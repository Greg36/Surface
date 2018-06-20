# Underscores
Underscores is WordPress starter theme based on Automattic's [_s](https://github.com/Automattic/_s) upgraded with many features for development. It supports **Sass**, **ES6**, **HMR** (aka instant live reload) along with full suit of testing frameworks PHP and JS.

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

#### BEM support

In form of a separate branch I included a refactor of CSS with BEM syntax support and [partial](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) ITCSS styles organization. 

## Setup
Download `Underscores` from Github and rename the main folder to your brand new theme name i.e. my-new-theme.
To setup theme you will need to rename default strings across theme files to match your new theme name either using included script or manually.

#### Automatic

You can setup theme automatically by installing NPM dependencies and running this command in theme's directory:

```
yarn install
node setup.js
```

#### Manual

**Instead of** using automatic setup you can search and replace necessary strings to names for your unique theme. Text editors like Sublime Text or any modern IDE can do that on all files in directory at once.

| Search for: | Replace with: |  |
|---|---|---|
| `'_s'` | `'my-new-theme'` | with single quotes |
| `_s_` | `my_new_theme_` | |
| `Text Domain: _s` | `Text Domain: my-new-theme` | |
| `package _s` | `package My_New_Theme` |  |
| <code>&nbsp;_s</code> | <code>&nbsp;My New Theme</code> | with space in front |
| `_s-` | `my-new-theme-` | |
| `--s--` | `my-new-theme` | |
| `__url__` | `http://mysite.com` | or just `http://localhost` |

## Development

To start developing install NPM dependencies and start watching files:

```
yarn install
yarn start
```

If you are using sub-directory to host this site i.e. `http://localhost/supertheme` change  `proxyUrl` in `config.json` file to just `http://localhost:3000` including the port number. 

## Testing

All major test cases are covered:

* **JS unit** tests - Chai, Sinon, Mocha testing stack running on Karma with Chrome and Firefox headless setup by default,
* **PHP unit** tests - Codeception unit suit powered by [PHPUnit](https://phpunit.de/),
* **Integration** tests - Codeception wpunit suit that implements [WP Core automated suite](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/) of helpful fixtures and factories,
* **Functional** tests - Codeception functional suit that emulates and process requests without need to run a web server,
* **Acceptance** tests - Codeception acceptance suit tests with non-javascript browser (WebDriver solution can easily be configured),
* **Visual regression** tests - BackstopJS framework for automatic comparision of DOM elements screenshots.

### Codeception

You can learn how to use Codeception for WordPress in [the official guide](http://codeception.com/for/wordpress). 

#### Setup

To install Codeception with [wp-browser](https://github.com/lucatume/wp-browser) extension use [Composer](https://getcomposer.org/), the wp-browser package already contains Codeception so we install just one dependency: 

```
composer install
```

Before using Codeception you need to update its settings. For default setup update variables in `tests/php/env.yml` file. For option `DB_Test_Name` create new empty database, it will be cleared between tests so **don't use** the one running WordPress.

Functional and acceptance tests requires WordPress [database dump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) file to run. Place it in `tmp/_data/dump.sql`.

Check [wp-browser documentation](https://github.com/lucatume/wp-browser#modules) for more in-depth info on setup and configuration.

### JavaScript testing

Karma setup works without any configuration, only requirements are Firefox version 56 or above and Chrome version 59 or above.

To run Karma tests:

```
yarn run test
```

### Visual regression testing

BackstopJS takes screenshots of specified DOM elements in selected viewports configured in `assets/build/backstop.json` and compares them between reference and test case. It requires Chrome version 59 or above.

To take reference screenshots:

```
yarn run visual:ref
```

To take another sample and run comparision:

```
yarn run visual:test
```
