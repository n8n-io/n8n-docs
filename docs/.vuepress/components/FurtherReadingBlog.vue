<template>
	<ul>
		<li  v-for="i in items" :key="i.label">
			<a :href="i.url" target="_blank">{{i.label}} {{i.icon}}</a>
		</li>
	</ul>
</template>

<script>
export default {
	data () {
		return {
			items: []
		}
	},
	props: ['node'],
	beforeMount() {
	fetch('https://api.n8n.io/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
					query GetNode{
						nodes (where: {displayName:"${this.node}"}){
							displayName
							codex
						}
					}
				`
			})
		})
		.then(response => response.json())
		.then(res => {
			this.$data.items = res.data.nodes[0].codex.data.resources.generic
		})
		.catch(error => console.log(error))
  }
}
</script>
