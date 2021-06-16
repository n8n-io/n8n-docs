<template>
	<div>
		<h4 style="margin-bottom: 2px;">Was this page helpful?</h4>
		<div v-if="!submitted" style="max-width: 100px; display:flex; justify-content:space-between; font-size:24px;">
			<button v-on:click="submitFeedback(-1)" class="btn"><span>🙁</span></button>
			<button v-on:click="submitFeedback(0)" class="btn"><span>😐</span></button>
			<button v-on:click="submitFeedback(1)" class="btn"><span>😄</span></button>
		</div>
		<div v-else>
			<p>{{message}}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			submitted: false,
			message: '',
			apiKey: process.env.VUE_APP_API_KEY,
			url: process.env.VUE_APP_FEEDBACK_URL
		}
	},
	methods: {
		submitFeedback: async function(value) {
			if(!this.submitted){
				const path = this.$page.path;
				fetch(`${this.url}?feedback=${value}&path=${path}`, {
					method: 'GET',
					mode: "no-cors",
					// headers: {
					// 	'apiKey': this.apiKey,
					// }
				})
				.then(res => {
					console.log(res)
					return res.json()
				})
				.then(response => {
					if(response.message) {
						this.submitted = true;
						this.message = response.message;
					}
				})
				.catch(err => console.log(err));
			}
		}
	}
}
</script>

<style scoped>
.btn {
	border: 0;
	background: transparent;
	padding: 0;
	font-size: inherit;
	cursor: pointer;
}
</style>