#!/usr/bin/env bash

# Activate the theme
wp theme activate $CI_PROJECT_NAME --allow-root
wp plugin install theme-check --activate --allow-root
wp package install anhskohbo/wp-cli-themecheck --allow-root
