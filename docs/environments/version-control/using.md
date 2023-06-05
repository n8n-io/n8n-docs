---
description: How to use version control for environments in n8n.
---

# Using Version Control

If your n8n instance [connects to a Git repository](/environments/version-control/setup/), you need to keep your work in sync with Git.

[TODO: before publishing, confirm members can use git, not just instance owners - they couldn't when you started drafting]

## Fetch other people's work



## Send your work to Git



## Copy work between environments

### Automatic pulls

## Credentials and variable values

n8n doesn't currently sync credentials and variable values with Git. You must set up the credentials and variable values manually when setting up a new instance.

!!! note "Credential support coming soon"
	n8n is working on support for external secret managers to handle credentials. Once this feature is complete, n8n will support linking the secret manager to multiple instances, allowing credentials to work across environments.

### Workaround one: Populate variable values using the /pull endpoint

[TODO: TLDR is set up vars in n8n, push etc. as normal, then populate them using the API call]
https://linear.app/n8n/issue/PAY-451/publicapi-endpoint-to-pull-changes-and-set-variables

### Workaround two: Manage variables outside n8n

n8n syncs variable names, but doesn't push variable values to your Git provider. However, when pulling variables, it can pull values. If you want variable values to be stored in Git, and retrievable by n8n, you can manage the variables directly in a JSON file in your Git repo:

1. On the branch where you want the variables, create a `variables.json` file. This should be at the root of the project.
2. Add variables in this format:
	```json
	[
		{
			"id": 1,
			"key": "variable1",
			"type": "string",
			"value": "one"
		},
			{
			"id": 2,
			"key": "variable2",
			"type": "string",
			"value": "two"
		},
			{
			"id": 3,
			"key": "variable3",
			"type": "string",
			"value": "three"
		}
	]
	```
3. Commit the file.
4. In the n8n instance connected to your branch, select **Pull**. 
5. Navigate to **Variables**. n8n displays the created variables:
	![Diagram](/_images/environments/variables-created.png)

!!! warning "Don't push variables"
	If using this workaround, you must never push variables to Git, as it will overwrite all the variables created in Git. For example, if you create a new variable in n8n, and push your changes, all variables (not just the one you created in n8n) will lose their `value` in Git. If using this approach, the only thing you should do with variables in n8n is pull them from Git.
