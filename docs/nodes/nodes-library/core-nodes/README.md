# Core Nodes

This section contains information about all the core nodes in n8n. Each node documentation contains information on the available resources and operations along with an example workflow.

<!-- <NodeCard :items="items" /> -->
<div  class="container">
	<div v-for="i in items" :key="i.name">
		<a :href="`/nodes/${i.name}`" class="card-wrapper">
			<div class="card">
				<div class="image-container">
					<div style="width: 100%; height: 100%;">
						<div v-html="i.icon" />
					</div>
				</div>
				<p>{{i.displayName}}</p>
			</div>
		</a>
	</div>
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