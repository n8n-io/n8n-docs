# Credentials

This section contains step-by-step information about authenticating the different nodes in n8n.

<div v-for="i in items" :key="i.url">
	<a :href="`/credentials/${i.url}/`">
		<p>{{i.name}}</p>
	</a>
</div>

<script>
export default {
	data () {
		return {
			items: []
		}
	},
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
	beforeMount() {
		fetch('https://api.n8n.io/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query GetNodes {
						nodes (sort:"displayName") {
							name
							displayName
							iconData
							codex
						}
					}
				`
			})
		})
		.then(response => response.json())
		.then(res => {
			// store nodes with credentials in an array
			let credNodes = this.checkCreds(res.data.nodes);
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
			})
			this.$data.items = creds;
		})
		.catch(error => console.log(error))
	}
}
</script>