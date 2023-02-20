# Hacker News

The Hacker News node allows you to automate work in Hacker News, and integrate Hacker News with other applications. n8n has built-in support for a wide range of Hacker News features, including getting articles, and users. 

On this page, you'll find a list of operations the Hacker News node supports and links to more resources.

!!! note "Credentials"
    This node doesn't require authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Disqus integrations](https://n8n.io/integrations/hacker-news/){:target="_blank" .external-link} list.


## Basic Operations

* All
    * Get all items
* Article
    * Get a Hacker News article
* User
    * Get a Hacker News user

## Example Usage

This workflow allows you to get articles from Hacker News. You can also find the [workflow](https://n8n.io/workflows/525) on this website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Hacker News]()

The final workflow should look like the following image.

![A workflow with the Hacker News node](/_images/integrations/builtin/app-nodes/hackernews/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Hacker News node

1. Select the 'All' option from the *Resource* dropdown list.
2. Click on *Execute Node* to run the workflow.




