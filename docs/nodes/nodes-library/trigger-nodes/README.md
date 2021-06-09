# Trigger Nodes

This section contains information about all the trigger nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.


<NodeCard :items="items" />

<script>
import nodes from '@dynamic/nodes'

export default {
	data () {
		return {
			items: []
		}
	},
	beforeMount() {
		const triggerNodes = Object.values(nodes.nodes)
			.filter((node) => {
				if (node.group.includes('trigger')) {
					return false;
				}

				if (node.codex && node.codex.categories && node.codex.categories.includes('Core Nodes')) {
					return false;
				}

				return true;
			});
		triggerNodes.sort((a, b) => {
			if ( a.displayName < b.displayName ){
				return -1;
			}
			if ( a.displayName > b.displayName ){
				return 1;
			}
			return 0;
		});
		this.$data.items = triggerNodes
	}
}
</script>
