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

    /// note | Check your directory
	Make sure you run `npm link <node-name>` in the nodes directory within your n8n installation. This can be: 
	
	* `~/.n8n/custom/`
	* `~/.n8n/<your-custom-name>`: if your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`.
	///

4. Start n8n:
  ```
  n8n start
  ```
5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.

    /// note | Node names
    Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`. 
    ///

### Troubleshooting

If there's no `custom` directory in `~/.n8n` local installation, you have to create `custom` directory manually and run `npm init`:

```shell
# In ~/.n8n directory run
mkdir custom 
cd custom 
npm init
```
