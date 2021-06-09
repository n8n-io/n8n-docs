<template>
<div  class="container">
	<div v-for="i in items" :key="i.name">
		<a :href="`/nodes/${i.name}`" class="card-wrapper">
			<div class="card" v-if="i.iconData.fileBuffer">
				<div class="image-container">
					<div style="width: 100%; height: 100%;">
						<img :src="i.iconData.fileBuffer" style="width: 100%; height: 100%;">
					</div>
				</div>
				<p>{{i.displayName}}</p>
			</div>
		</a>
	</div>
</div>
<!-- todo support fa icons/ -->
</template>

<script>
export default {
	props: ['items'],
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