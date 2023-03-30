# PostBin

PostBin is a service that helps you test API clients and webhooks. The PostBin node allows you to automate work in Postbin, and integrate PostBin with other applications. n8n has built-in support for a wide range of PostBin features, including creating and deleting bins, and getting and sending requests. 

On this page, you'll find a list of operations the PostBin node supports, and links to more resources.


!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Postbin integrations](https://n8n.io/integrations/postbin/){:target="_blank" .external-link} list.

# Operations

* Bin
	* Create
	* Get
	* Delete
* Request
	* Get
	* Remove First
	* Send

## Send requests

To send requests to a Postbin bin:

1. Go to [Postbin](https://www.toptal.com/developers/postbin/){:target=_blank .external-link} and follow the steps to generate a new bin. Postbin gives you a unique URL, including a bin ID.
2. In the Postbin node, select the **Request** resource.
3. Choose the type of **Operation** you want to perform.
4. Enter your bin ID in **Bin ID**.

## Create and manage bins

You can create and manage Postbin bins using the Postbin node. 

1. In **Resource**, select **Bin**.
2. Choose an **Operation**. You can create, delete, or get a bin.
