# Credentials

This section contains step-by-step information about authenticating the different nodes in n8n.

<div v-for="i in items" :key="i.url">
	<a :href="`/credentials/${i.url}/`">
		<p>{{i.name}}</p>
	</a>
</div>

<script>
import nodes from '@dynamic/nodes'

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
		// store nodes with credentials in an array
		let credNodes = this.checkCreds(Object.values(nodes));
		let node = {};
		let creds = [];
		credNodes.map(cred => {
			const url = cred.codex.data.resources.credentialDocumentation[0].url.split('/')[4];
			const name = cred.displayName;
			node[url] = name;
		})
		creds = Object.keys(node).map(key => {
			return {
				"url": key,
				"name": node[key]
			}
		})
		creds.map(a => {
			let name = a.name.split(' ');
			if(name.length>1 && name.includes('Trigger')){
				name.splice(-1,1);
			}
			a.name = name.join(' ');
			if(a.name=== 'Youtube') {
				a.name = 'Google'
			}
			if(a.name=== 'Microsoft Teams') {
				a.name = 'Microsoft'
			}
		});

		return {
			items: creds,
		};
	}
}
</script>