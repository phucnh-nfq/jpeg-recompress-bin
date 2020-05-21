'use strict';
const fs = require('fs');
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

if (process.platform !== 'win32' && fs.existsSync('/usr/local/bin/jpeg-recompress')) {
	module.exports = new BinWrapper()
		.dest('/usr/local/bin')
		.use('jpeg-recompress');
} else if (process.platform === 'darwin' && fs.existsSync('/usr/local/opt/jpeg-archive/bin/jpeg-recompress')) {
	module.exports = new BinWrapper()
		.dest('/usr/local/opt/jpeg-archive/bin')
		.use('jpeg-recompress');
} else {
	const url = `https://raw.github.com/imagemin/jpeg-recompress-bin/v${pkg.version}/vendor/`;
	module.exports = new BinWrapper()
		.src(`${url}osx/jpeg-recompress`, 'darwin')
		.src(`${url}linux/jpeg-recompress`, 'linux')
		.src(`${url}win/jpeg-recompress.exe`, 'win32')
		.dest(path.resolve(__dirname, '../vendor'))
		.use(process.platform === 'win32' ? 'jpeg-recompress.exe' : 'jpeg-recompress');
}
