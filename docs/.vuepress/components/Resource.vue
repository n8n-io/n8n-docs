<template>
	<div>
		<br />
		<div v-if="items[0].resource">
			<details v-for="i in items" :key="i.name" class="details">
				<summary>{{i.name}}</summary>
				<ul class="operations">
					<li v-for="o in i.operations" :key="o.description">
						<span v-if="o.description">{{o.description}}</span>
						<span v-else>{{o.name}}</span>
					</li>
				</ul>
			</details>
		</div>
		<div v-else>
			<ul v-for="i in items" :key="i.name">
				<li>{{i.description}}</li>
			</ul>
		</div>
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
	fetch(`https://api.n8n.io/nodes?name=${this.node}`, {
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
			const resources = data.filter(isResource);
			if(resources.length > 0){
				this.$data.items = resources[0].options.map(resource => {
					return {
						name: resource.name,
						value: resource.value,
						resource: true
					}
				})
				for (let i = 0; i< this.items.length; i++){
					operations.map(operation => {
						if (operation.displayOptions.show.resource.includes(this.items[i].value)){
							return this.items[i].operations = operation.options;
						}
					})
				}
			} else {
				this.$data.items = operations[0].options.map(operation => {
					return {
						name: operation.name,
						value: operation.value,
						description: operation.description
					}
				})
			}
		})
		.catch(error => console.log(error))
  }
}
</script>

<style scoped>
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
