<template>
	<div v-if="info">
		<div style="display:flex; height:auto; align-items: baseline;">
		<p style="margin-block-end:0;">
			<div v-if="info.iconData && info.iconData.fileBuffer">
				<img :src="info.iconData.fileBuffer" style="height:24px; min-width:24px; vertical-align:middle;">
			</div>
			<div v-else>
				<span style="font-size:24px; vertical-align:middle;">🧰 </span>
			</div>
			<span style="margin-left:8px; line-height: 1.7;">
				<a v-if="info.codex" :href="`../../nodes/${node}/`">{{title}}</a>
				<span v-if="breakingChanges" style="background: rgba(255,229,100,0.3); color: #6b5900; padding: 2px; border-radius: 5px; font-size: 10px;">
					Breaking Changes
				</span>
				{{text}}
				<a v-if="breakingChanges" :href="`https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#${breakingChangeVersion}`">More info</a>
			</span>
		</p>
		</div>
	</div>
</template>

<script>
import nodes from '@dynamic/nodes'

export default {
	data () {
		return {
			info:  nodes.nodes[this.$props.node]
		}
	},
	props: ['node', 'text', 'title', 'breakingChanges', 'breakingChangeVersion'],
}
</script>