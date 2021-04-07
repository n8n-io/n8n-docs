<template>
	<div class="container">
		<details  v-for="i in items" :key="i.name" class="details">
			<summary>{{i.name}}</summary>
			<ul class="operations">
				<li v-for="o in i.operations" :key="o.description">
					{{o.description}}
				</li>
			</ul>
		</details>
	</div>
</template>

<script>
export default {
	data () {
		return {
			items: []
		}
	},
	props: ['node'],
	beforeMount() {
	fetch(`https://api.n8n.io/nodes?displayName=${this.node}`, {
			method: 'GET',
		})
		.then(response => response.json())
		.then(res => {
			const {data} = res[0].properties;
			const isOperation = (item) => {
				if(item.name === 'operation'){
					return item;
				}
			}
			const isResource = (item) => {
				if(item.name === 'resource'){
					return item;
				}
			}
			const operations = data.filter(isOperation);
			const resources = data.filter(isResource)
			this.$data.items = resources[0].options.map(resource => {
				return {
					name: resource.name,
					value: resource.value
				}
			})
			const mapOperations = operations.map(operation => {
				for (let i = 0; i< this.items.length; i++){
					if (operation.displayOptions.show.resource.includes(this.items[i].value))
					return this.items[i].operations = operation.options;
				}
			})
		})
		.catch(error => console.log(error))
  }
}
</script>

<style scoped>
.container {
	padding-left: 1.5em;

}
.details {
	background-color: #fff;
	margin-bottom: 16px;
}
.operations {
	padding-left: 2.5em
}
summary:focus {
	outline: none;
}
</style>
