console.log('Hello from the other side; I must have called 1000 times');

var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');

// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
	/**
	 * entry: The bundle's starting point. This file will
	 * be included, along with the minimum necessary code
	 * from its dependencies
	 */
	entry: 'src/app/main.dev.ts',

	/**
	 * sourceMap: If true, a separate sourcemap file will
	 * be created.
	 */
	sourceMap: true,

	/**
	 * format: The format of the generated bundle
	 */
	format: 'iife',

	/**
	 * dest: the output filename for the bundle in the buildDir
	 */
	dest: 'main.js',

	useStrict: false,

	/**
	 * plugins: Array of plugin objects, or a single plugin object.
	 * See https://github.com/rollup/rollup/wiki/Plugins for more info.
	 */
	plugins: [
		builtins(),
		commonjs({
			namedExports: {
				// pouchdb
				'node_modules/js-extend/extend.js': ['extend'],

				// ng2-cordova-oauth
				'node_modules/ng2-cordova-oauth/core.js': ['CordovaOauth', 'Facebook', 'Google'],

				// ng2-resource-rest
				'node_modules/ng2-resource-rest/index.js': ['Resource', 'ResourceParams', 'ResourceAction']
			}
		}),
		nodeResolve({
			module: true,
			jsnext: true,
			main: true,
			browser: true,
			extensions: ['.js']
		}),
		globals(),
		json()
	]

};


if (process.env.IONIC_ENV == 'prod') {
	// production mode
	rollupConfig.entry = '.tmp/app/main.prod.js';
	rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;