---
template: api.html
hide:
    - toc
    - navigation
    - feedback
    - kapaButton
description: API reference for n8n's public REST API.
contentType: reference
---


<!-- Mount point -->
<div id="app"></div>

<!-- Load the Script -->
<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>

<!-- Initialize the Scalar API Reference -->
<script>
	Scalar.createApiReference('#app', {
		url: '/api/v1/openapi.yml',
		// Avoid CORS issues
        proxyUrl: 'https://proxy.scalar.com',
		servers: [
			{
				url: 'https://{instance}.app.n8n.cloud/api/v1',
				description: 'n8n cloud instance',
				variables: {
					instance: {
						default: 'your-instance-name',
					}
				}
			},
			{
				url: '{url}/api/v1',
				description: 'self-hosted n8n instance',
				variables: {
					url: {
						default: 'https://example.com',
					}
				}
			},
		],
		forceDarkModeState: 'light',
		hideDarkModeToggle: true,
		hideClientButton: true,
	})
</script>
