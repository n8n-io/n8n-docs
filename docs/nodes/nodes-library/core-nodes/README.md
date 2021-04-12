# Core Nodes

This section contains information about all the core nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.

<!-- <NodeCard :items="items" /> -->
<div v-for="i in items" :key="i.name">
	<a :href="`/nodes/${i.name}`">
		<p>{{i.displayName}}</p>
	</a>
</div>

<script>
import data from './core-nodes.json'
export default {
	data () {
		return {
			items: data
		}
	}
}
</script>
