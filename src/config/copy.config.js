// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
	copyAssets: {
		src: ['{{SRC}}/assets/**/*'],
		dest: '{{WWW}}/assets'
	},
	copyIndexContent: {
		src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
		dest: '{{WWW}}'
	},
	copyFonts: {
		src: [
			'{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', 
			'{{ROOT}}/node_modules/ionic-angular/fonts/**/*',
			'{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
		dest: '{{WWW}}/assets/fonts'
	},
	copyPolyfills: {
		src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
		dest: '{{BUILD}}'
	},
	copySwToolbox: {
		src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
		dest: '{{BUILD}}'
	},
	copyPrimeiconsCss: {
        src: ['{{SRC}}/assets/primeicons/primeicons.css'],
        dest: '{{BUILD}}/assets/primeicons'
    },
	copyPrimengThemeCss: {
        src: ['{{SRC}}/assets/primeng/themes/omega/theme.css'],
        dest: '{{BUILD}}/assets/primeng/themes/omega'
    },
	copyPrimengCss: {
        src: ['{{SRC}}/assets/primeng/primeng.min.css'],
        dest: '{{BUILD}}/assets/primeng'
    }
}
