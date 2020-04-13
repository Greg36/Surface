# Surface
Surface is WordPress starter theme based on [Automattic's _s](https://github.com/Automattic/_s) upgraded with many features for development. It supports **Sass**, **ES6**, **HMR** (aka instant live reload) along with full suit of testing frameworks PHP and JS.

Theme itself is still organized in "the WordPress way" and suitable for [WordPress.org](http://wordpress.org/) theme development.

Webpack config is based on [Mythic](https://github.com/justintadlock/mythic) starter theme.

## Features
* [Webpack](https://webpack.js.org/) as a build tool using [Laravel Mix](https://laravel-mix.com/) wrapper
* [BrowserSync](https://browsersync.io/) to develop with instant live reload
* [Codeception](http://codeception.com/) PHP testing suit with [wp-browser](https://wpbrowser.wptestkit.dev/)
* [Karma](https://karma-runner.github.io/) JS unit test runner
* [Mocha](https://mochajs.org/) JS unit test framework
* [Chai](http://chaijs.com/) JS unit assertion library
* [Sinon](http://sinonjs.org/) JS unit mocking library
* [BackstopJS](https://garris.github.io/BackstopJS/) visual regression tester
* [ESlint](https://eslint.org/) JS linting tool using WP [standard](https://www.npmjs.com/package/@wordpress/eslint-plugin)
* [Stylelint](https://stylelint.io/) CSS linting tool using WP [standard](https://github.com/WordPress-Coding-Standards/stylelint-config-wordpress)

#### BEM support

In form of a separate branch I included a refactor of CSS with BEM syntax support and [partial](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) ITCSS styles organization.

## Setup
Download `Surface` from Github and rename the main folder to your brand new theme name i.e. my-new-theme.
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

To start developing install NPM dependencies and start watching files for changes:

```
yarn install
yarn run watch
```

#### Exporting
When theme is ready to be exported for production run `yarn run build` - this will lint all files for style errors, build and minify them, generate POT translation file and copy **only** the required files to a new directory inside the theme.


## Testing

All major test cases are covered:

* **JS unit** tests - Chai, Sinon and Mocha testing stack running on Karma with Chrome and Firefox headless setup by default,
* **PHP unit** tests - Codeception unit suit powered by [PHPUnit](https://phpunit.de/),
* **Integration** tests - Codeception wpunit suit that implements [WP Core automated suite](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/) of helpful fixtures and factories,
* **Functional** tests - Codeception functional suit that emulates and process requests without need to run a web server,
* **Acceptance** tests - Codeception acceptance suit tests using [PhpBrowser](https://codeception.com/docs/modules/PhpBrowser) (WebDriver solution can easily be configured to support JavaScript),
* **Visual regression** tests - BackstopJS framework for automatic comparision of DOM elements screenshots.

### Codeception

You can learn how to use Codeception for WordPress in [the official guide](https://codeception.com/for/wordpress).

#### Setup

To setup Codeception use [Composer](https://getcomposer.org/):

```
composer install
```

Codeception's main config file is located in `tests/php/.env.testing`. Testing suits require database access, **DO NOT** provide your current WordPress database name in this config as it is **erased** and rebuild between tests. It is proffered to have two separate databases setup in `TEST_SITE_DB_NAME` and `TEST_DB_NAME` respectively.

Functional and acceptance tests will use a [database dump](https://codeception.com/docs/modules/Db#sql-data-dump) file as a WordPress site data to be testet against. Place it in `tmp/_data/dump.sql`.

Check [wp-browser documentation](https://wpbrowser.wptestkit.dev/) for more in-depth info on setup and configuration.

### JavaScript testing

Karma setup works without any configuration, only requirements are Firefox version 56 or above and Chrome version 59 or above installed.

To run tests:

```
yarn run test
```

### Visual regression testing

BackstopJS takes screenshots of specified DOM elements in selected viewports configured in `assets/build/backstop.json` and compares them between approved reference and new test case.

The workflow consists of running tests and approving the results as the future reference. To run test:

```
yarn run visual:test
```

When test fail, we can approve its results as the new reference:

```
yarn run visual:approve
```
