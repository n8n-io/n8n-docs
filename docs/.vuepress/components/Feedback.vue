<template>
	<div style="max-width: 740px; margin: 0 auto;">
		<div style="margin-bottom: 2px;">Was this page helpful?</div>
		<div v-if="!submitted" style="max-width: 100px; font-size:24px;">
			<font-awesome-icon class="btn" icon="thumbs-up" v-on:click="submitFeedback(1)" />
			<font-awesome-icon class="btn" icon="thumbs-down" v-on:click="submitFeedback(-1)" />
		</div>
		<div v-else>
			<p style="color: #767676; margin-top:0; font-size:0.9em;">{{message}}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			submitted: false,
			message: '',
			url: 'https://internal.users.n8n.cloud/webhook/d1b83b83-e584-45fe-a28c-a12a4272e472'
		}
	},
	watch: {
		$route(to, from) {
			this.submitted = false
		}
	},
	methods: {
		submitFeedback: async function(value) {
			if(!this.submitted){
				const path = this.$page.path;
				fetch('https://www.cloudflare.com/cdn-cgi/trace', {
					headers: {
						'Content-Type': 'text/plain; charset=uft-8'
					}
				}).then(res => {
					return res.text()
				})
				.then(t => {
					var data = t.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
					data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
					var jsondata = JSON.parse(data);
					fetch(`${this.url}?feedback=${value}&path=${path}&ip=${jsondata.ip}`, {
					method: 'GET',
					})
					.then(res => {
					this.submitted = true;
					return res.json()
					})
					.then(response => {
						if(response.message) {
							this.message = response.message;
						}
					})
					.catch(err => console.log(err));
				})
				.catch(err => console.log(err))
			}
		}
	}
}
</script>

<style scoped>
.btn {
	cursor: pointer;
	color: #bfbfbf;
	padding-right: 16px;
	padding-top: 4px;
}
</style>
