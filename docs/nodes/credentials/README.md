# Credentials

This section contains step-by-step information about authenticating the different nodes in n8n.

<CredCards :items="items" />

<script>
import Vue, { inject } from "vue";
import { nodes, credentials } from '@dynamic/nodes'
import {resolveSidebarItems} from '../../../node_modules/@vuepress/theme-default/util/index';

const overrides = {
	'notionOAuth2Api': 'n8n-nodes-base.notion',
	'twakeServerApi': 'n8n-nodes-base.twake',
};

Object.keys(overrides).forEach((cred) => {
	const nodeType = overrides[cred];

	if (nodes[nodeType]) {
		overrides[cred] = nodes[nodeType];
	}
});

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
	computed: {
		credentialPages () {
			const pages = this.$site.pages;
			return pages.filter((page) => page.path.startsWith('/credentials/'))
		}
	},
	data() {
		let credToNode = Object.values(nodes)
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
		credToNode = {
			...credToNode,
			...overrides,
		};

		const creds = Object.values(credentials)
			.reduce((accu, cred) => {
				const path = `/credentials/${cred.documentationUrl || cred.name}/`.toLowerCase();
				let node = credToNode[cred.name];
				if (!node) {
					console.log('Could not find node relevant to cred', cred.name);
					node = {
						displayName: cred.name,
					};
				}
				accu[path] = {
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
		const items = this.credentialPages.filter((page) => {
				if (!this.$data.creds[page.path.toLowerCase()]) {
					// for missing items, need to set documentationUrl in credential in nodes-base
					console.log('Could not find cred for page', page.title, page.path); 
					return false;
				}
				return true;
			})
			.map(page => ({...this.$data.creds[page.path.toLowerCase()], displayName: page.title, path: page.path}));

		this.$data.items = items;
	},
};
</script>