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
3. Install the node into your local n8n instance:<br>
  ```shell
  # In the nodes directory within your n8n installation
  # node-package-name is the name from the package.json
  npm link <node-package-name>
  ```

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Check your directory</strong></p><p>Make sure you run <code>npm link &lt;node-name&gt;</code> in the nodes directory within your n8n installation. This can be:</p><ul><li><code>~/.n8n/custom/</code></li><li><code>~/.n8n/&lt;your-custom-name&gt;</code>: if your n8n installation set a different name using <code>N8N_CUSTOM_EXTENSIONS</code>.</li></ul></div>

4. Start n8n:
  ```
  n8n start
  ```
5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.<br>

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Node names</strong></p><p>Make sure you search using the node name, not the package name. For example, if your npm package name is <code>n8n-nodes-weather-nodes</code>, and the package contains nodes named <code>rain</code>, <code>sun</code>, <code>snow</code>, you should search for <code>rain</code>, not <code>weather-nodes</code>.</p></div>

### Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

If there's no `custom` directory in `~/.n8n` local installation, you have to create `custom` directory manually and run `npm init`:

```shell
# In ~/.n8n directory run <a href="#in-n8n-directory-run" id="in-n8n-directory-run"></a>
mkdir custom 
cd custom 
npm init
```
