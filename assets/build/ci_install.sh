#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

set -xe

# Install curl and wget
apt-get update -yqq
apt-get install curl -yqq > /dev/null 2>&1
apt-get install wget -yqq

# Install php curl
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
composer update --quiet

# Install Virtual Display emulator
apt-get install -yqq xvfb

# Insttall PhantomJS
#cd /tmp
#curl -O https://s3.amazonaws.com/circle-downloads/phantomjs-2.1.1
#chmod +x phantomjs-2.1.1
#mv phantomjs-2.1.1 /usr/local/bin/phantomjs

# Install Firefox
export FIREFOX_VERSION=50.0
apt-get -qqy --no-install-recommends install firefox > /dev/null 2>&1
rm -rf /var/lib/apt/lists/* /var/cache/apt/* > /dev/null 2>&1
wget --no-verbose -O /tmp/firefox.tar.bz2 https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2
apt-get -y purge firefox
rm -rf /opt/firefox
tar -C /opt -xjf /tmp/firefox.tar.bz2
rm /tmp/firefox.tar.bz2
mv /opt/firefox /opt/firefox-$FIREFOX_VERSION
ln -fs /opt/firefox-$FIREFOX_VERSION/firefox /usr/bin/firefox
apt-get update -yqq

#apt-get install dbus
#dbus-uuidgen > /var/lib/dbus/machine-id

# Get Selenium server
mkdir ~/selenium
cd ~/selenium
wget http://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar > /dev/null 2>&1

# Install Java8
apt-get install software-properties-common -yqq
add-apt-repository ppa:webupd8team/java -yqq
apt-get update -yqq
echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections
apt-get install oracle-java8-installer -yqq > /dev/null 2>&1

# Get Geckodriver for selenium
wget https://github.com/mozilla/geckodriver/releases/download/v0.13.0/geckodriver-v0.13.0-linux64.tar.gz > /dev/null 2>&1
tar -xvzf geckodriver-v0.13.0-linux64.tar.gz
rm geckodriver-v0.13.0-linux64.tar.gz
chmod +x geckodriver
cp geckodriver /usr/local/bin/
