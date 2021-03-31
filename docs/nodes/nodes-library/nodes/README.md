# Nodes

This section contains information about all the regular nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.

<NodeCard :items="items" />

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
					query GetRegularNodes{
						nodes(where: {categories:{name_ncontains: "Core Nodes"}, displayName_ncontains:"Trigger"}, sort:"displayName"){
							name
							displayName
							iconData
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
