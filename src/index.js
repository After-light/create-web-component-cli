const path = require('path');

const {
	mkDirPromise,
	readTemplatePromise,
	writeFilePromise
} = require('../utils/actions');
const { replaceComponentName, mkTemplateFilePath } = require('../utils/utils');
const {
	STYLE_FILE,
	SCRIPT_COMPONENT_FILE,
	SCRIPT_TEMPLATE_FILE_MAP
} = require('../utils/constants');

module.exports = async function generationWebComponent({ name, type }) {
	const currentPath = process.cwd();
	const dirPath = path.join(currentPath, name);
	const scriptTplFile = SCRIPT_TEMPLATE_FILE_MAP[type];

	const scriptTplFilePath = mkTemplateFilePath(scriptTplFile); // 脚本模板文件
	const scriptCompFilePath = path.join(dirPath, SCRIPT_COMPONENT_FILE); // 脚本组件文件

	const styleTplFilePath = mkTemplateFilePath(STYLE_FILE); // 样式模板文件
	const styleCompFilePath = path.join(dirPath, STYLE_FILE); // 样式组件文件

	/**
	 * 1.创建文件夹
	 * 2.读js模板文件
	 * 3.替换模板内容
	 * 4.写入jsx文件
	 * 5.读less模板文件
	 * 6.替换模板内容
	 * 7.写入less文件
	 */
	mkDirPromise(dirPath)
		.then(() => {
			return readTemplatePromise(scriptTplFilePath);
		})
		.then(jsContent => {
			const fileContent = replaceComponentName(name, jsContent);
			return writeFilePromise(scriptCompFilePath, fileContent);
		})
		.then(() => {
			return readTemplatePromise(styleTplFilePath);
		})
		.then(styleContent => {
			const fileContent = replaceComponentName(name, styleContent);
			return writeFilePromise(styleCompFilePath, fileContent);
		})
		.then(() => {
			console.info(`组件${name}创建成功！`);
		})
		.catch(err => {
			throw err;
		});
};
