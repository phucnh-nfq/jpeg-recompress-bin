#!/bin/sh

sudo apt-get update -qq
sudo apt-get install -qq build-essential autoconf nasm
git clone https://github.com/mozilla/mozjpeg.git
cd mozjpeg
git fetch origin refs/tags/v3.3.1:refs/tags/v3.3.1
git fetch --all
git checkout tags/v3.3.1
autoreconf -fiv
./configure --with-jpeg8
make && sudo make install
sudo ln -s /opt/mozjpeg/lib64 /opt/mozjpeg/lib
cd ..
git clone https://github.com/danielgtaylor/jpeg-archive.git
cd jpeg-archive
git fetch origin refs/tags/v2.2.0:refs/tags/v2.2.0
git fetch --all
git checkout tags/v2.2.0
make && sudo make install
cd ..
rm -rf mozjpeg
rm -rf jpeg-archive
