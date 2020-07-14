---
permalink: /nodes/n8n-nodes-base.disqus
---

# Disqus

[Disqus](https://disqus.com/) is a worldwide blog comment hosting service for web sites and online communities that use a networked platform. The company's platform includes various features, such as social integration, social networking, user profiles, spam and moderation tools, analytics, email notifications, and mobile commenting.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Disqus/README.md).
:::

## Basic Operations

- Forum
    - Return forum details
    - Return a list of categories within a forum
    - Return a list of threads within a forum
    - Return a list of posts within a forum


## Example Usage

This workflow allows you to get details of a forum in Disqus. You can also find the [workflow](https://n8n.io/workflows/493) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Disqus]()

The final workflow should look like the following image.

![A workflow with the Disqus node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Disqus node

1. First of all, you'll have to enter credentials for the Disqus node. You can find out how to do that [here](../../../credentials/Disqus/README.md).
2. Enter the name of the forum in the *Forum name* field. For example, I entered `hackernoon`.
3. Click on *Execute Node* to run the workflow.
