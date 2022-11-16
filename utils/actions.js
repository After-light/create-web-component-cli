const fs = require('fs');

module.exports.mkDirPromise = dirPath => {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(dirPath)) {
			return resolve();
		}

		fs.mkdir(dirPath, err => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
};

module.exports.readTemplatePromise = filePath => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, text) => {
			err ? reject(err) : resolve(text);
		});
	});
};

module.exports.writeFilePromise = (filePath, fileContent) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, fileContent, 'utf-8', err => {
			err ? reject(err) : resolve();
		});
	});
};
