SWIFT_VERSION=4.1.2
BRANCH=release
RELEASE=RELEASE
SWIFT_TARGET=osx

case "$SWIFT_TARGET" in
*osx)
    mkdir -p Toolchains/swift-$SWIFT_VERSION-$RELEASE.xctoolchain
    # download
    curl -O https://swift.org/builds/swift-$SWIFT_VERSION-$BRANCH/xcode/swift-$SWIFT_VERSION-$RELEASE/swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.pkg
    # extract
    xar -xf swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.pkg -C Toolchains/
    tar -xzf Toolchains/swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET-package.pkg/Payload -C Toolchains/swift-$SWIFT_VERSION-$RELEASE.xctoolchain
    # cleanup
    rm Toolchains/Distribution
    rm -r Toolchains/swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET-package.pkg
    rm -r swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.pkg
    ;;
ubuntu*)
    mkdir -p Toolchains/swift-$SWIFT_VERSION-$RELEASE.xctoolchain
    # download
    curl -O https://swift.org/builds/swift-$SWIFT_VERSION-$BRANCH/ubuntu1404/swift-$SWIFT_VERSION-$RELEASE/swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.tar.gz
    # extract
    tar -xvzf swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.tar.gz -C Toolchains/swift-$SWIFT_VERSION-$RELEASE.xctoolchain --strip-components=1
    # cleanup
    rm -rf swift-$SWIFT_VERSION-$RELEASE-$SWIFT_TARGET.tar.gz
    ;;
esac n 