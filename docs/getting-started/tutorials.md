# Tutorials

## Blogposts

<br>

<BlogCard :items="items" />

## Videos

- [Slack Notification on Github Star](https://www.youtube.com/watch?v=3w7xIMKLVAg)
- [Typeform to Google Sheet and Slack or Email](https://www.youtube.com/watch?v=rn3-d4IiW44)


## Community tutorials

- [How to use n8n and Raspberry PI to create workflows and automate APIs](https://peppe8o.com/how-to-use-n8n-and-raspberry-pi-to-create-workflows-and-automate-apis/)
- [n8n basics 1/3 - Getting Started](https://www.youtube.com/watch?v=JIaxjH2CyFc)
- [n8n basics 2/3 - Simple Workflow](https://www.youtube.com/watch?v=ovlxledZfM4)
- [n8n basics 3/3 - Transforming JSON](https://www.youtube.com/watch?v=wGAEAcfwV8w)
- [n8n nodes - Using Google Sheets and Google API](https://www.youtube.com/watch?v=KFqx8OmkqVE)
- [Raspberry Pi as a local server for self-hosting applications like n8n](https://cri.dev/posts/2020-09-12-Raspberry-Pi-as-a-local-server-for-self-hosting-applications/)

<script>
export default {
  data () {
	  return {
		  items: []
	  }
  },
  beforeMount() {
	fetch('https://n8n.io/blog/ghost/api/v3/content/posts/?key=416a0c50506dfc7b58227219fd&include=authors&filter=tag:tutorial&limit=all')
	.then(response => response.json())
	.then(res => {
		this.$data.items = res.posts
	})
	.catch(error => {
		console.log(error);
	})
  }
}
</script>