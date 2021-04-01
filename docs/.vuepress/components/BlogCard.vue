<template>
	<div class="band">
		<div v-for="i in items" :key="i.id">
			<a class="card" :href="`https://n8n.io/blog/${i.slug}`" target="_blank" style="text-decoration:none;">
				<div class="thumb" :style="`background-image: url(${i.feature_image})`"></div>
				<article>
					<h1>{{i.title}}</h1>
					<p>{{i.excerpt}}</p>
					<span>{{i.primary_author.name}}</span>
				</article>
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
.band {
	width: 100%;
	max-width: 1240px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	grid-gap: 20px;
}

.card {
	background: white;
	text-decoration: none;
	color: #444;
	box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	display: flex;
	flex-direction: column;
	min-height: 100%;
	position: relative;
	top: 0;
	transition: all .1s ease-in;
	border-radius: 5px;
}

.card:hover {
	top: -2px;
	box-shadow: 0 4px 5px rgba(0,0,0,0.2);
}

.card article {
	padding: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card h1 {
	font-size: 20px;
	margin: 0;
	color: #ff6d5a;
}

.card p {
	flex: 1;
	line-height: 1.4;
	color:#333
}

.card span {
	font-size: 12px;
	font-weight: bold;
	color: #999;
	text-transform: uppercase;
	letter-spacing: .05em;
	margin: 2em 0 0 0;
}

.thumb {
	padding-bottom: 60%;
	background-size: cover;
	background-position: center center;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

@media (min-width: 30em) {
	.band {
		grid-template-columns: 1fr 1fr;
	}
}
@media (min-width: 60em) {
		.band{
			grid-template-columns: repeat(2, 1fr);
	}
}
</style>