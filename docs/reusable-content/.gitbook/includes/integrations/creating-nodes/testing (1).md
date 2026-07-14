---
title: testing
---
You can test your node as you build it by running it in a local n8n instance.

1. Install n8n using npm:
  ```shell
  npm install n8n -g
  ```
2. When you are ready to test your node, publish it locally:
  ```shell
  # In your node directory
  npm run build
  npm link
  ```
3. Install the node into your local n8n instance:
	```shell
	# In the nodes directory within your n8n installation
	# node-package-name is the name from the package.json
	npm link <node-package-name>
	```

	{% hint style="info" %}
	**Check your directory**

	Make sure you run `npm link <node-name>` in the nodes directory within your n8n installation.

	The default location depends on your operating system:
	- For Windows: `C:\Users\<username>\.n8n\custom`
	- For Linux: `/home/<username>/.n8n/custom`
	- For MacOS: `/Users/<username>/.n8n/custom`

	If your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`, use that custom directory instead.

	Note: The `.n8n` folder is a hidden folder so it may not appear in your file browser.
	{% endhint %}

4. Start n8n:
  ```
  n8n start
  ```
5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.

	{% hint style="info" %}
	**Node names**

	Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`.
	{% endhint %}

### Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

If there's no `custom` directory in your `.n8n` local installation, you have to create the `custom` directory manually and run `npm init`.

The `.n8n` directory location depends on your operating system:
- For Windows: `C:\Users\<username>\.n8n\custom`
- For Linux: `/home/<username>/.n8n/custom`
- For MacOS: `/Users/<username>/.n8n/custom`

Note: The `.n8n` folder is a hidden folder so it may not appear in your file browser.

```shell
# Navigate to your .n8n directory and run:
mkdir custom
cd custom
npm init
```
