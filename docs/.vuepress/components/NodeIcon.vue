<template>
	<div style="width: 100%; height: 100%;" :style="{color: node.defaults && node.defaults.color}">
		<font-awesome-icon v-if="node.iconData && node.iconData.type === 'icon'" :icon="node.iconData.icon"  />
		<img v-else-if="node.iconData && node.iconData.fileBuffer" :src="node.iconData.fileBuffer" style="width: 100%; height: 100%;">
		<div v-else class="placeholder">
			{{ node.displayName.charAt(0) }}
		</div>
	</div>
</template>

<script>
export default {
	props: ['node'],
}
</script>