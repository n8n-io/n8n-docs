# Core Nodes

This section contains information about all the core nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.

<div v-for="i in items">
	<a :href="`/nodes/${i.name}`">
    	<p>{{i.displayName}}</p>
	</a>
</div>

<script>
export default {
	data () {
		return {
			items: []
		}
	},
	beforeMount() {
		fetch('https://api-staging.n8n.io/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query GetCoreNodes{
						nodes(where: {categories:{name: "Core Nodes"}}){
							displayName
							name
						}
					}
				`
			})
		})
		.then(response => response.json())
		.then(res => {
			this.$data.items = res.data.nodes
		})
		.catch(error => console.log(error))
	}
}
</script>
