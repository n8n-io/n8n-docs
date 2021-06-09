<template>
	<ul>
		<li  v-for="i in items" :key="i.label">
			<a :href="i.url" target="_blank">{{i.label}} {{i.icon}}</a>
		</li>
	</ul>
</template>

<script>
import nodes from '@dynamic/nodes'

export default {
	data () {
		return {
			items: []
		}
	},
	beforeMount() {
		const parts = this.$page.path.split('/');
		const name = parts[parts.length - 2];

		const node = nodes.nodes[name];
		if (node && node.codex) {
			this.$data.items = node.codex.data.resources.generic
		}
  }
}
</script>
