# Disqus

Disqus
Disqus node allows you to automate work in the Disqus platform and integrate Disqus with other applications. n8n has built-in support for a wide range of Disqus features, which includes basic operations like returning forums.

On this page, you'll find a list of operations the Disqus node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Disqus credentials](https://docs.n8n.io/integrations/builtin/credentials/disqus/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Disqus integrations](https://n8n.io/integrations/disqus/){:target="_blank" .external-link} list.


## Basic Operations

* Forum
    * Return forum details
    * Return a list of categories within a forum
    * Return a list of threads within a forum
    * Return a list of posts within a forum

## Example Usage

This workflow allows you to get details of a forum in Disqus. You can also find the [workflow](https://n8n.io/workflows/493) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Disqus]()

The final workflow should look like the following image.

![A workflow with the Disqus node](/_images/integrations/builtin/app-nodes/disqus/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Disqus node

1. First of all, you'll have to enter credentials for the Disqus node. You can find out how to do that [here](/integrations/builtin/credentials/disqus/).
2. Enter the name of the forum in the *Forum name* field. For example, I entered `hackernoon`.
3. Click on *Execute Node* to run the workflow.
