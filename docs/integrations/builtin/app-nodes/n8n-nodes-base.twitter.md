# Twitter

The Twitter node allows you to automate work in Twitter, and integrate Twitter with other applications. n8n has built-in support for a wide range of Twitter features, including creating direct messages, and deleting, searching, liking and retweeting a tweet. 

On this page, you'll find a list of operations the Twitter node supports and links to more resources.

!!! note "Credentials"
    Refer to [Twitter credentials](/integrations/builtin/credentials/twitter/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Twitter integrations](https://n8n.io/integrations/twitter/){:target="_blank" .external-link} list.


## Basic Operations

* Direct Message
    * Create a direct message
* Tweet
    * Create or reply a tweet
    * Delete a tweet
    * Search tweets
    * Like a tweet
    * Retweet a tweet

## Example Usage

This workflow allows you to tweet on Twitter. You can also find the [workflow](https://n8n.io/workflows/445) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Twitter]()

The final workflow should look like the following image.

![A workflow with the Twitter node](/_images/integrations/builtin/app-nodes/twitter/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Twitter node

1. First of all, you'll have to enter credentials for the Twitter node. You can find out how to do that [here](/integrations/builtin/credentials/twitter/).
2. Type the message you want to tweet in the *Text* field.
3. Click on *Execute Node* to run the workflow.
