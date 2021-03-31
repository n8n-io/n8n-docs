<template>
<div  style="display:flex; flex-wrap:wrap; justify-content:center;">
	<div v-for="i in items" :key="i">
	<a :href="`/nodes/${i.name}`" style="border-radius: 4px; text-decoration:none;">
		<div style="border-radius: 4px; padding: .8em .6em; margin: .6em; text-align: center; width: 170px;">
			<div style="width: 60px; height: 60px; line-height: 60px; margin:auto;">
				<div style="width: 100%; height: 100%;">
					<img :src="i.iconData.fileBuffer" style="width: 100%; height: 100%;">
				</div>
			</div>
			<p>{{i.displayName}}</p>
		</div>
	</a>
		</div>
</div>
</template>