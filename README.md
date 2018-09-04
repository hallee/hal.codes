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

In maybe an ill-advised attempt to boost usage of [Swift](https://swift.org/about/) on the web, I set out to build my personal website using Swift.

This site is a [Vue.js](https://vuejs.org) frontend built on a [Vapor](https://vapor.codes) server. I use [Vue Router](https://router.vuejs.org) for client-side routing (this makes links to projects load almost instantly) and [Webpack](https://webpack.js.org) for bundling and code splitting.

The Vapor server hosts the root document, along with a WebSocket server for a web Swift Playground environment.

Why not just use a Node.js server? Swift ostensibly can be faster and use less memory than a JavaScript (V8) based server. Swift also aims to be “safe by design” with its static type system and variable guarantees. Other languages have these features, but I'm most familiar with Swift. A big community of iOS and Mac developers makes me think the Swift project will be well maintained into the future.

## Development

```bash
git clone git@github.com:hallee/hal.codes.git
cd hal.codes/
./run.sh
vapor xcode
yarn
npx webpack -d --watch
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
nano hal-codes.service # change the working directory to match your system
sudo cp hal-codes.service /lib/systemd/system/
sudo systemctl enable hal-codes.service
```

At this point the Vapor server will be running on port `8080`. The systemd service ensures that the server stays up continuously, even after reboots.

To route public traffic on port `80` to the Vapor server, I use Nginx with a proxy configuration.
Since css and js files are already gzipped by webpack, Nginx's `gzip_static` module is required to serve them without the server recompresisng them, which unforutnately requires [building Nginx from source](https://www.garron.me/en/go2linux/nginx-gzip_static-ubuntu.html). 

```bash
sudo apt-get install nginx-common nginx-core
sudo apt-get build-dep nginx
cd /tmp/
sudo apt-get source nginx
cd nginx-1.10.3/ # version number may differ
sudo nano auto/options # change HTTP_GZIP_STATIC=NO to YES
sudo dpkg-buildpackage -uc -b
sudo dpkg -i ../nginx_1.10.3-0ubuntu0.16.04.2_all.deb # package name may differ
```

Now that Nginx is built with proper gzip support, we can set it up:

```bash
cd ~/hal.codes/
sudo cp nginx.conf /etc/nginx/sites-available/hal.codes
sudo ln -s /etc/nginx/sites-available/hal.codes /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl enable nginx
```
