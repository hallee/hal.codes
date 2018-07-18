<p align="center">
	<a href="http://hal.codes">
    <img src="http://hal.nyc/f/hal-codes-logo.svg" width="232" height="64" alt="hal.codes Logo">
	</a>
    <br>
    <br>
    <a href="LICENSE">
        <img src="http://img.shields.io/badge/license-MIT-brightgreen.svg" alt="MIT License">
    </a>
    <a href="https://swift.org">
        <img src="http://img.shields.io/badge/swift-4.1-brightgreen.svg" alt="Swift 4.1">
    </a>
</p>

## Overview

I set out to build my [personal website](https://hal.codes) using [Swift](https://swift.org/about/) because I'd like to see more people using Swift outside of the iOS community. Swift is fast, easy to learn, and I think it has huge potential on the web. 

This site's backend is built on [Vapor](https://vapor.codes), a server-side Swift web framework. Vapor serves the root document, creates a websocket server (for the [Swift Playground]() environment at the top of my site), and evaluates commands sent to that websocket server using a Swift REPL ??.

Sadly, the whole site couldn't be written in Swift. The frontend is built on [Vue.js](https://vuejs.org/v2/guide/). Vue handles client-side routing and allows for lazy loading heavy components, like the Swift Playground.

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

I host the site on the smallest DigialOcean droplet ($5/mo).

```bash
eval "$(curl -sL https://apt.vapor.sh)"
sudo apt-get install swift vapor
git clone git@github.com:hallee/hal.codes.git
cd hal.codes/
./run.sh
vapor build --release
nano hal-codes.service # change the working directory to match your system
sudo cp hal-codes.service /lib/systemd/system/
sudo systemctl enable hal-codes.service
```

At this point the Vapor server will be running on port `8080`. The systemd service ensures that the server stays up continuously, even after reboots.

To serve the site publicly, I use Nginx with a proxy configuration.
Since css and js files are already gzipped, we want to use the `gzip_static` module of Nginx, which unforutnately requires [building it from source](https://www.garron.me/en/go2linux/nginx-gzip_static-ubuntu.html).

```bash
apt-get build-dep nginx
cd /tmp/
apt-get source nginx
cd nginx-1.10.3/
nano auto/options # change HTTP_GZIP_STATIC=NO to YES
dpkg-buildpackage -uc -b
sudo dpkg -i ../nginx_1.10.3-0ubuntu0.16.deb
```

### Build Log

* [Build nginx with `ngx_http_gzip_static_module`](https://www.garron.me/en/go2linux/nginx-gzip_static-ubuntu.html)