---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
template: api.html
hide:
    - toc
    - navigation
description: API reference for n8n's public REST API.
contentType: reference
---

<!-- Load the Script -->
<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>

<!-- Initialize the Scalar API Reference -->
<script>
	Scalar.createApiReference('#app', {
		url: '/api/v1/openapi.yml',
		forceDarkModeState: 'light',
		hideDarkModeToggle: true,
	})
</script>
