---
title: testing
---
You can test your node as you build it by running it in a local n8n instance with the [`n8n-node` tool](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/build-your-node/using-the-n8n-node-tool). You don't need to install n8n separately: `n8n-node` includes it.

1. In your project's root directory, run the `dev` command:
	```shell
	npm run dev
	```
	This runs `n8n-node dev`, which builds your node, links it into the n8n custom nodes directory, starts a local n8n instance with your node loaded, and rebuilds your node when you change a file.

	{% hint style="info" %}
	**Custom nodes directory**

	`n8n-node dev` uses its own n8n user folder, `.n8n-node-cli`, so it doesn't touch an existing n8n installation. The default location depends on your operating system:
	- For Windows: `C:\Users\<username>\.n8n-node-cli\.n8n\custom`
	- For Linux: `/home/<username>/.n8n-node-cli/.n8n/custom`
	- For MacOS: `/Users/<username>/.n8n-node-cli/.n8n/custom`

	To test against an n8n instance you run yourself, pass `--external-n8n` and set `--custom-user-folder <path>` to that instance's user folder (the parent of its `.n8n` directory). Set `N8N_DEV_RELOAD=true` on that instance so it picks up your changes.

	Note: The `.n8n-node-cli` and `.n8n` folders are hidden folders so they may not appear in your file browser.
	{% endhint %}
2. Open `http://localhost:5678` in your browser and sign in to your n8n instance.
3. Open a workflow and search for your node in the nodes panel.

	{% hint style="info" %}
	**Node names**

	Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`.
	{% endhint %}

Add the node to your workflow and test it as you develop. To stop n8n, press `ctrl` + `c`.
