# Hunter

The Hunter node allows you to automate work in Hunter, and integrate Hunter with other applications. n8n has built-in support for a wide range of Hunter features, including getting, generating, and verifying email addresses. 

On this page, you'll find a list of operations the Hunter node supports and links to more resources.

!!! note "Credentials"
    Refer to [Hunter credentials](/integrations/builtin/credentials/hunter/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Hunter integrations](https://n8n.io/integrations/hunter/){:target="_blank" .external-link} list.


## Basic Operations

* Get every email address found on the internet using a given domain name, with sources
* Generate or retrieve the most likely email address from a domain name, a first name and a last name
* Verify the deliverability of an email address


## Example Usage

This workflow allows you to verify the deliverability of an email address using Hunter. You can also find the [workflow](https://n8n.io/workflows/519) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Hunter]()

The final workflow should look like the following image.

![A workflow with the Hunter node](/_images/integrations/builtin/app-nodes/hunter/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Hunter node

1. First of all, you'll have to enter credentials for the Hunter node. You can find out how to do that [here](/integrations/builtin/credentials/hunter/).
2. Select 'Email Verifier' from the *Operation* dropdown list.
3. Enter the email in the *Email* field.
4. Click on *Execute Node* to run the workflow.
