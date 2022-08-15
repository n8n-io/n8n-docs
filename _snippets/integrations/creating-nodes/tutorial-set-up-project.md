n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter. 

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository as `n8n-nodes-nasa-pics`:
		```shell
		git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-nasa-pics
		cd n8n-nodes-nasa-pics
		```

The starter contains example nodes and credentials. Delete the following directories and files:

* `nodes/ExampleNode`
* `nodes/HTTPBin`
* `credentials/ExampleCredentials.credentials.ts`
* `credentials/HttpBinApi.credentials.ts`

