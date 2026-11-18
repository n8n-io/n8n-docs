---
contentType: howto
nodeTitle: Install private nodes
originalFilePath: integrations/creating-nodes/deploy/install-private-nodes.md
originalUrl: 'https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes'
url: >-
  https://docs.n8n.io/connect/create-nodes/deploy-your-node/install-private-nodes
layout:
  description:
    visible: false
---

# Install private nodes <a href="#install-private-nodes" id="install-private-nodes"></a>

You can build your own nodes and install them in your n8n instance without publishing them on npm. This is useful for nodes that you create for internal use only at your company.

## Install your node in a Docker n8n instance <a href="#install-your-node-in-a-docker-n8n-instance" id="install-your-node-in-a-docker-n8n-instance"></a>

Extend the official n8n image to include your compiled private node. You don't need to build n8n from source or download its entrypoint script.

Before you start, [build your node with the n8n node CLI](../build-your-node/using-the-n8n-node-tool.md). This example uses n8n 2.42.0. It covers a node that needs only the `n8n-workflow` runtime dependency. If your node imports other packages, you must also make those packages available in the container.

1. Run the build command from your node project:

	```sh
	npm run build
	```

	Check that `dist/` contains your compiled `.node.js` file and its assets.

2. Create a `Dockerfile` in your node project, next to `dist/`:

	```dockerfile
	FROM n8nio/n8n:2.42.0@sha256:862c954d784885f0406b19d9ee8f6a2ec9f93e976e2a6580ad85dedd58463bb1

	ENV N8N_CUSTOM_EXTENSIONS=/opt/n8n-custom
	ENV NODE_PATH=/usr/local/lib/node_modules/n8n/node_modules

	COPY --chown=node:node dist/ /opt/n8n-custom/
	USER node
	```

	`N8N_CUSTOM_EXTENSIONS` tells n8n where to load your node. The directory is outside `/home/node/.n8n`, so the data volume doesn't hide the node files.

	`NODE_PATH` lets your node resolve `n8n-workflow` from this n8n image. Retest this path and your node before changing the image version.

	The image runs as the `node` user. `COPY --chown=node:node` gives that user ownership of the compiled files. Keep the files readable and their directories accessible to that user.

3. Create a `.dockerignore` file next to the `Dockerfile`:

	```text
	*
	!Dockerfile
	!dist/
	```

	This limits the build context to the Dockerfile and compiled files. Don't copy your host's `node_modules` directory into the image.

4. Build your image from the node project directory:

	```sh
	docker build --tag customizedn8n:2.42.0 .
	```

5. Start a test instance with a separate data volume:

	```sh
	docker run -d --name n8n-private-node \
		-p 127.0.0.1:5682:5678 \
		-v n8n-private-node-data:/home/node/.n8n \
		customizedn8n:2.42.0
	```

	The data directory must be writable by the `node` user. This example uses a Docker-managed volume.

6. Open `http://127.0.0.1:5682` and complete owner setup for the test instance.

7. Create a workflow with a **Manual Trigger** node. Add your private node from the node panel. Connect the trigger to your node.

8. Select **Execute workflow**. Check that your node returns the expected output.

Save the workflow before you recreate the container. Use the same data volume and custom image when you recreate it. Confirm that the saved workflow still contains your node and returns the expected output.


## Install your node in a global n8n instance <a href="#install-your-node-in-a-global-n8n-instance" id="install-your-node-in-a-global-n8n-instance"></a>

If you've installed n8n globally, make sure that you install your node inside n8n. n8n will find the module and load it automatically.

## Related resources

* [Deploy your node](./)
* [Submit community nodes](submit-community-nodes.md)
