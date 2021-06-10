<template>
<div  class="container">
	<div v-for="i in items" :key="i.name">
		<a :href="i.path" class="card-wrapper">
			<div class="card">
				<div class="image-container">
					<NodeIcon :node="i.node" />
				</div>
				<p>{{i.displayName}}</p>
			</div>
		</a>
	</div>
</div>
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
	text-decoration:none !important;
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
	font-size: 34px;
}
</style>