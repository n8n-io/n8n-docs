const path = require('path');
const fs = require('fs');
const util = require('util');

const fsReadFileAsync = util.promisify(fs.readFile);

async function getItems(itemsName) {
	const nodesBasePackageFilePath = require.resolve(`n8n-nodes-base/package.json`);
	const nodesBasePackageFile = require(nodesBasePackageFilePath);

	const results = {};

	const packagePath = path.dirname(nodesBasePackageFilePath);

	for (const filePath of nodesBasePackageFile.n8n[itemsName]) {
		let fullFilePath = path.join(packagePath, filePath);
		// Remove the .node part
		let itemName = path.parse(filePath).name.split('.').slice(0, -1).join('.');

		const tempModule = require(fullFilePath);
		try {
			results[itemName] = new tempModule[itemName]();
			results[itemName].fullFilePath = fullFilePath;

		} catch (error) {
			console.error(`Error loading item "${itemName}" from: "${fullFilePath}"`);
			throw error;
		}
	}

	return results;
}

async function getCredentials() {
	return await getItems('credentials');
}

async function getNodes() {
	const nodes = await getItems('nodes');

	const descriptions = {};
	for (let name in nodes) {
		let node;

		if (nodes[name].nodeVersions) {
			const maxVersion = Math.max(...Object.keys(nodes[name].nodeVersions));
			node = nodes[name].nodeVersions[maxVersion].description;
		} else {
			node = nodes[name].description;
		}

		const iconData = {};
		if (node.icon) {
			if (node.icon.startsWith('file:')) {
				// If a file icon gets used add the full path
				iconData.type = 'file';

				fullIconPath = path.join(path.dirname(nodes[name].fullFilePath), node.icon.substr(5));

				const fileBuffer = await fsReadFileAsync(fullIconPath);

				const fileExtension = fullIconPath.split('.').pop();

				let mimeType = 'image/png';
				if (fileExtension === 'svg') {
					mimeType = 'image/svg+xml';
				} else if (fileExtension !== 'png') {
					let iconFileType = fileType(fileBuffer);
					if (iconFileType !== undefined) {
						mimeType = iconFileType.mime;
					}
				}

				iconData.fileBuffer = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
			} else if (node.icon.startsWith('fa:')) {
				iconData.type = 'icon';
				iconData.icon = node.icon.substr(3);
			}
		}

		try {
			// rename .js file to .json
			node.codex = {data: require(`${nodes[name].fullFilePath}on`)};
		}
		catch (e) {
			console.log(`Could not resolve codex info for ${nodes[name].fullFilePath}`);
		}

		const key = `n8n-nodes-base.${node.name}`;
		descriptions[key] = node;
		descriptions[key].iconData = iconData;
	}

	return descriptions;
}

const getContent = async () => {
	const nodes = await getNodes();
	const credentials = await getCredentials();

	return JSON.stringify({nodes, credentials });
};

module.exports = (options, context) => {
  return {
    async clientDynamicModules() {
      const content = await getContent();

      return {
        name: 'nodes.js',
        content: `module.exports = ${content}`
      }
    }
  }
}