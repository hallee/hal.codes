<p align="center">
	<a href="http://hal.codes">
    <img src="http://hal.nyc/f/hal-codes-logo.svg" width="232" height="64" alt="hal.codes Logo">
	</a>
    <br>
    <br>
    <a href="https://swift.org">
        <img src="http://img.shields.io/badge/swift-4.1-brightgreen.svg" alt="Swift 4.1">
    </a>
    <a href="LICENSE">
        <img src="http://img.shields.io/badge/license-MIT-brightgreen.svg" alt="MIT License">
    </a>
</p>

## Overview

I set out to build my [personal website](https://hal.codes) using [Swift](https://swift.org/about/). I use Swift every day for iOS development and I'd like to see Swift usage expand outside of the iOS community. Swift is fast, easy to learn, and I think it has huge potential on the web.

This site's backend is built on [Vapor](https://vapor.codes), a server-side Swift web framework. Vapor serves the root document and creates a websocket server for the [Swift Playground]() environment at the top of my site.

Sadly, the whole site couldn't be written in Swift. [Vue.js](https://vuejs.org/v2/guide/) powers the frontend. It handles client-side routing and allows for lazy loading heavy components, like the Swift Playground.

## Development Installation

```bash
git clone git@github.com:hallee/hal.codes.git
cd hal.codes/
./run.sh
vapor build
yarn
webpack -d --watch
```

## Deployment

hal.codes is hosted on the [smallest DigialOcean droplet](https://www.digitalocean.com/pricing/) ($5/mo) on Ubuntu 16.04. Any VPS that can run a [Swift-supported Linux](https://swift.org/download/#releases) version should work fine.

```bash
eval "$(curl -sL https://apt.vapor.sh)"
sudo apt-get install swift vapor
cd ~
git clone git@github.com:hallee/hal.codes.git
cd hal.codes/
./run.sh
vapor build --release
yarn --prod
nano hal-codes.service # change the working directory to match your system
sudo cp hal-codes.service /lib/systemd/system/
sudo systemctl enable hal-codes.service
```

At this point the Vapor server will be running on port `8080`. The systemd service ensures that the server stays up continuously, even after reboots.

To route public traffic on port `80` to the Vapor server, I use Nginx with a proxy configuration.
Since css and js files are already gzipped by webpack, Nginx's `gzip_static` module is required to serve them without the server recompresisng them, which unforutnately requires [building Nginx from source](https://www.garron.me/en/go2linux/nginx-gzip_static-ubuntu.html). 

```bash
apt-get build-dep nginx
cd /tmp/
apt-get source nginx
cd nginx-1.10.3/ # version number may differ
nano auto/options # change HTTP_GZIP_STATIC=NO to YES
dpkg-buildpackage -uc -b
sudo dpkg -i ../nginx_1.10.3-0ubuntu0.16.04.2_all.deb # package name may differ
```

Now that Nginx is built with proper gzip support, we can set it up:

```bash
cd ~/hal.codes/
sudo cp nginx.conf /etc/nginx/sites-available/hal.codes
sudo ln -s /etc/nginx/sites-available/hal.codes /etc/nginx/sites-enabled/
sudo systemctl enable nginx
```
