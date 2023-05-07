const path = require('path');
const { TEMPLATE_PATH } = require('./constants');

const firstToUppercase = code => {
	return code.replace(/^\S/, s => s.toLocaleUpperCase());
};

const firstToLowercase = code => {
	return code.replace(/^\S/, s => s.toLocaleLowerCase());
};

module.exports.replaceComponentName = (name, content) => {
	return content
		.replace(/componentName/, firstToLowercase(name))
		.replace(/COMPONENT_NAME/g, firstToUppercase(name));
};

module.exports.mkTemplateFilePath = fileName => {
	return path.join(__dirname, TEMPLATE_PATH, fileName);
};

module.exports.firstToUppercase = firstToUppercase;
