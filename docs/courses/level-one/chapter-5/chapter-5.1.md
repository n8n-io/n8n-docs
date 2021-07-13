# 1. Getting data from the data warehouse
> In this part of the workflow, you will learn how to get data by making HTTP requests using the *HTTP Request node*.


First of all, let’s set up the scene for building Nathan’s workflow. Open your Editor UI and create a new workflow with one of the two possible commands:

- Click **Ctrl + Alt + N** or **Cmd + Alt + N** on your keyboard
- Open the left menu and click on *New* under the Workflow section

Name this new workflow “Nathan’s workflow”.

The first step we need to take is to get data from Evil Corp’s old data warehouse.

In the previous chapter, we used a regular node for a specific app (Hacker News). However, not all apps or services have dedicated nodes – like the legacy data warehouse from Nathan’s company. Nathan mentioned that it’s not possible to directly export the data, however the data warehouse has a couple of API endpoints.

That’s all we need to access the data via the [***HTTP Request node***](https://docs.n8n.io/nodes/n8n-nodes-base.httpRequest/)in n8n.

::: tip 💡 No node for that service?
The *HTTP Request node* is one of the most versatile nodes, allowing you to make HTTP requests which can be used to query data from apps and services. You can use it to access data from apps or services that don’t have a dedicated node in n8n.
:::

Now, in your Editor UI, add an *HTTP Request node*, like you learned in the [lesson *Adding nodes*](./chapter-1-components.md#adding-nodes). The node window will open, where you need to configure some parameters.

<figure><img src="../images/chapter-two/HTTP-request-node.png" alt="HTTP Request node" style="width:100%"><figcaption align = "center"><i>HTTP Request node</i></figcaption></figure>


In the left panel, select:

- *Authentication:* Header Auth
- *URL:* https://internal.users.n8n.cloud/webhook/custom-erp
- *Options > Add Option > Split Into Items:* toggle to true.
This option will output each element of an array as its own item.
- *Headers > Add Header:*
  - *Name:* email
  - *Value:* your_address@mail.com

Since you selected *Header Authentication*, now you need to enter your [credentials](https://docs.n8n.io/reference/glossary.html%23credentials), in order to be able to access the data.

::: tip 📖 Credentials
Credentials are unique pieces of information that identify a user or a service and enable them to access apps or services (in our case, represented as n8n nodes). A common form of credentials is a pair of a username and a password, but they can take other forms depending on the service.
:::

Go to the top parameter *Credentials* and click on the pencil icon on the right of the field. This will open the Credentials window, where you need to add information to three fields:

- *Credentials Name:* beginner_course
You can name your credentials however you want. It’s good practice to give them descriptive names for the app/service, type, and purpose of the credential. A naming convention will make it easier for you to keep track of and identify your credentials.
- *Name:* `api_key`
- *Value:* `"j[vKYdY68H(:WFb`

Your *Credentials* window should look like this:

<figure><img src="../images/chapter-two/HTTP-credentials.png" alt="HTTP Request node credentials" style="width:100%"><figcaption align = "center"><i>HTTP Request node credentials</i></figcaption></figure>

Now click the *Save* button in the bottom right corner of the window.

In the *HTTP Request node* window, click the *Execute Node* button. The result of the HTTP request should look like this:

<figure><img src="../images/chapter-two/HTTP-Request-window.png" alt="HTTP Request node window" style="width:100%"><figcaption align = "center"><i>HTTP Request node window</i></figcaption></figure>

This view should be familiar to you from the [Hacker News mini-workflow](../chapter-2.md). This is the data from Nathan’s data warehouse that he needs to work with. His data set includes sales information of 30 customers with 5 features:

- *orderID:* the unique id of each order.
- *customerID:* the unique id of each customer.
- *employeeName:* the name of Nathan’s colleagues who are responsible for each client.
- *orderPrice:* the total price of the customer’s order.
- *orderStatus:* whether the customer’s order is booked or still in processing.

----
> **Nathan 🙋**: This is great! You already automated an important part of my job with only one node. Now instead of manually accessing the data every time I need it, I can use the HTTP Node to automatically get the information.
>
> **You 👩‍🔧**: Exactly! In the next step, I’ll help you one step further and insert the received data into Airtable, as you need it.
