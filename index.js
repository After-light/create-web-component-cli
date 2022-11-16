#!/usr/bin/env node

/**
 * web-component-cli
 * Generator Web Component
 *
 * @author LeeRo <http://10.2.3.111/rui.li/monkey>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const generatWebComponent = require('./src');

const input = cli.input;
const flags = cli.flags;
const { clear } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	generatWebComponent(flags);
})();
