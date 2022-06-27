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
  # In the directory where you installed n8n
  npm link <node-name>
  ```

    !!! note "Check your directory"
        Make sure you run `npm link <node-name>` in the main directory where you installed n8n. This is probably in the `node_modules` directory within your Node.js installation, if you installed n8n globally.
    
4. Start n8n:
  ```
  n8n start
  ```
5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.

    !!! note "Node names"
        Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`. 