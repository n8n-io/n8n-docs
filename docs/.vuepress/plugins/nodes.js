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

/**
 * Transform map tp string.
 *
 * @param map
 * @param unstringedKeys Set to ture to force all field value to not be stringified.
 */
function mapToString(map, unstringedKeys) {
  const keys = unstringedKeys;
  let str = `{\n`;
  for (const key of Object.keys(map)) {
    str += `  ${key}: ${
      keys === true || (Array.isArray(keys) && keys.includes(key))
        ? map[key]
        : JSON.stringify(map[key])
    },\n`;
  }
  str += '}';
  return str;
}

const getContent = async () => {
	const nodes = await getNodes();
	const map = nodes.reduce((accu, node) => {
		accu[node.name] = node;

		return accu;
	}, {});

	return mapToString({
		nodes: map,
	});
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