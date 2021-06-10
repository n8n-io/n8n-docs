# Credentials

This section contains step-by-step information about authenticating the different nodes in n8n.

<CredCards :items="items" />

<script>
import { nodes, credentials } from '@dynamic/nodes'


export default {
	methods: {
		filterCreds(node) {
			if(Object.keys(node.codex).length) {
				if(node.codex.data.resources.credentialDocumentation)
				return node;
			}
		},
		checkCreds(nodes) {
			return nodes.filter(this.filterCreds)
		}
	},
	data() {
		const credToNode = Object.values(nodes)
			.reduce((accu, node) => {
				if (!node.credentials) {
					return accu;
				}

				node.credentials.forEach((cred) => {
					if (accu[cred.name]) {
						return;
					}

					accu[cred.name] = node;
				});

				return accu;
			}, {});

		const creds = Object.values(credentials)
			.reduce((accu, cred) => {
				const path = `/nodes/credentials/${cred.documentationUrl || cred.name}/`.toLowerCase();
				let node = credToNode[cred.name];
				if (!node) {
					console.log('Could not find node relevant to cred', cred.name);
					node = {
						displayName: cred.name,
					};
				}
				accu[cred.name] = {
					name: cred.name,
					displayName: cred.displayName,
					node,
					path,
				}

				return accu;
			}, {});

		return {
			items: [],
			creds,
		};
	},
	mounted() {
		const sidebar = this.$root.$themeConfig.sidebar;
		const nodesSection = sidebar['/nodes/'];
		const credentialsSection = nodesSection.find(i => i.path === '/nodes/credentials');
		const credentialPages = credentialsSection.children
			.map((path) => path.toLowerCase());
		const pages = new Set(credentialPages);
		const items = Object.values(this.creds)
			.filter((cred) => {
				if (!pages.has(cred.path)) {
					console.log('Could not find page for cred', cred.name, cred.path); // for missing items, need to set documentationUrl in credential in nodes-base
					return false;
				}
				return true;
			});

		this.$data.items = items;

	},
}
</script>