#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

set -xe

# Install curl
apt-get update -yqq
apt-get install curl -yqq

apt-get install php5-curl -yqqq
service apache2 restart

# Install node
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -yqq nodejs

# Instal Composer
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

# Install wp-cli
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp

# Install Wordpress
rm /var/www/html/wp-config.php
wp core config --path=/var/www/html --dbhost=mysql --dbname=wordpress --dbprefix=wp17_ --dbuser=root --dbpass="secret" --allow-root
wp core install --path=/var/www/html --url=http://localhost --title="Test WP" --admin_user=admin --admin_password="1234" --admin_email=example@example.com --allow-root


# Install Wp-browser
cd /tmp
git clone https://github.com/lucatume/wp-browser.git wpcept
cd wpcept
composer update -q

# Install Firefox
apt-get install -yqq firefox

# Install Virtual Display emulator
apt-get install -yqq xvfb
