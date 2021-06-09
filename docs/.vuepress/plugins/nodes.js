const Vue = require('vue')
const https = require('https');

const NODES_API_ENDPOINT = `https://api.n8n.io/nodes?_limit=1000`;

function fetch(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				resolve(JSON.parse(data));
			});

		}).on("error", (err) => {
			reject(err);
		});
	});
}

function getNodes () {
	return fetch(NODES_API_ENDPOINT);
}

const getContent = async () => {
	const nodesList = await getNodes();
	const nodesMap = nodesList.reduce((accu, node) => {
		accu[node.name] = node;

		return accu;
	}, {});

	return JSON.stringify(nodesMap);
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