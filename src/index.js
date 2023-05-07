const path = require('path');

const {
	mkDirPromise,
	readTemplatePromise,
	writeFilePromise
} = require('../utils/actions');

const {
	replaceComponentName,
	mkTemplateFilePath,
	firstToUppercase
} = require('../utils');

const {
	STYLE_FILE,
	SCRIPT_COMPONENT_FILE,
	SCRIPT_TEMPLATE_FILE_MAP
} = require('../utils/constants');

module.exports = async function generationWebComponent({ name, type }) {
	const currentPath = process.cwd();

	// 创建生成组件的文件夹路径（例如：App）
	const COMPONENT_NAME = firstToUppercase(name);
	const dirPath = path.join(currentPath, COMPONENT_NAME);

	// 创建【模板脚本文件路径（templates/functional.js）】和【生成脚本文件路径（App/index.jsx）】
	const scriptTplFile = SCRIPT_TEMPLATE_FILE_MAP[type];
	const scriptTplFilePath = mkTemplateFilePath(scriptTplFile);
	const scriptCompFilePath = path.join(dirPath, SCRIPT_COMPONENT_FILE);

	// 创建【 模板样式文件路径（templates/index.less）】和【（App/index.less）】
	const styleTplFilePath = mkTemplateFilePath(STYLE_FILE);
	const styleCompFilePath = path.join(dirPath, STYLE_FILE);

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
			console.info(`组件${COMPONENT_NAME}创建成功！`);
		})
		.catch(err => {
			console.info(`组件${COMPONENT_NAME}创建失败！`);
			throw err;
		});
};
