<template>
	<div>
		<br />
		<div>
			<div v-if="items[0] && items[0].resource">
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
	</div>
</template>

<script>
import { nodes } from '@dynamic/nodes'

export default {
	props: ['node'],
	data() {
		const node = nodes[this.node];
		const data = node.properties;
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

		let items = [];
		if(resources.length > 0 && resources[0].options){
			items = resources[0].options.map(resource => {
				return {
					name: resource.name,
					value: resource.value,
					resource: true
				}
			})
			for (let i = 0; i< items.length; i++){
				operations.map(operation => {
					if (operation.displayOptions.show.resource.includes(items[i].value)){
						return items[i].operations = operation.options;
					}
				})
			}
		} else if (operations[0] && operations[0].options) {
			items = operations[0].options.map(operation => {
				return {
					name: operation.name,
					value: operation.value,
					description: operation.description
				}
			})
		}

		return {
			items,
		};
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

summary {
	cursor: pointer;
}

summary:focus {
	outline: none;
}
</style>
