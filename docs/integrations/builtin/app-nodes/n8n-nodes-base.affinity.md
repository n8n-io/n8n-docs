# Affinity

[Affinity](https://www.affinity.co/){:target="_blank" .external-link} node allows you to automate work in the Affinity platform and integrate Affinity with other applications. n8n has built-in support for a wide range of Affinity features, which includes basic operations like creating, getting, updating & deleting lists, entries, organization, and persons.

On this page, you'll find a list of operations the Affinity node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Affinity credentials](/integrations/builtin/credentials/affinity/){:target="_blank" .external-link} for guidance on setting up authentication.
	
!!! note "Examples and templates"
For example, usage and templates to help you get started, take a look at n8n's [Affinity integrations](https://n8n.io/integrations/affinity/){:target="_blank" .external-link} list.


## Basic Operations

* List
    * Get a list
    * Get all lists
* List Entry
    * Create a list entry
    * Delete a list entry
    * Get a list entry
    * Get all list entries
* Organization
    * Create an organization
    * Delete an organization
    * Get an organization
    * Get all organizations
    * Update an organization
* Person
    * Create a person
    * Delete a person
    * Get a person
    * Get all persons
    * Update a person


## Example Usage

This workflow allows you to create an organization in Affinity. You can also find the [workflow](https://n8n.io/workflows/476) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Affinity]()

The final workflow should look like the following image.

![A workflow with the Affinity node](/_images/integrations/builtin/app-nodes/affinity/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Affinity node

1. First of all, you'll have to enter credentials for the Affinity node. You can find out how to do that [here](/integrations/builtin/credentials/affinity/).
2. Enter the name of the organization in the *Name* field.
3. Enter the domain name of the organization in the *Domain* field.
4. Click on *Execute Node* to run the workflow.
