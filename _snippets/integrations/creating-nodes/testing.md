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
4. Start n8n:
  ```
  n8n start
  ```