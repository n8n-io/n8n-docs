# Core Nodes

This section contains information about all the core nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.

<NodeCard :items="items" />

<script>
import { nodes } from '@dynamic/nodes'

export default {
	data () {
		const coreNodes = Object.values(nodes)
			.filter((node) => {
				return node.codex && node.codex.data && node.codex.data.categories && node.codex.data.categories.includes('Core Nodes');
			});
		coreNodes.sort((a, b) => {
			if ( a.displayName.toLowerCase() < b.displayName.toLowerCase() ){
				return -1;
			}
			if ( a.displayName.toLowerCase() > b.displayName.toLowerCase() ){
				return 1;
			}
			return 0;
		});

		return {
			items: coreNodes,
		};
	}
}
</script>

<style scoped>
.container {
	display:flex;
	flex-wrap:wrap;
	justify-content:center;
}
.card-wrapper {
	border-radius: 4px;
	text-decoration:none;
}
.card {
	border-radius: 4px;
	padding: .8em .6em;
	margin: .6em;
	text-align: center;
	width: 100px;
}
.image-container {
	width: 60px;
	height: 60px;
	line-height: 60px;
	margin:auto;
}
</style>