<template>
	<div class="page-nav">
		<div class="text">Was this page helpful?</div>
		<div v-if="!submitted">
			<font-awesome-icon class="btn" icon="thumbs-up" style="margin-bottom:7px;" v-on:click="submitFeedback(1)" />
			<font-awesome-icon class="btn" icon="thumbs-down" style="margin-top:7px;" v-on:click="submitFeedback(-1)" />
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
	color: #7D7D87;
	padding-right: 16px;
	padding-top: 4px;
	transition: 0.1s;
	font-size: 24px;
}

.btn:hover {
	color: #555555;
	transform: scale(1.08);
}

.text {
	margin-bottom: 6px;
	color: #4e6e8e;
	font-weight: 500;
}
</style>
