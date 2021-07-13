# Automating a (real-world) use case

[[toc]]

## Nathan's story

Meet Nathan 🙋. Nathan works as an Analytics Manager at EvilCorp. His job is to support the EvilCorp team with reporting and analytics. Being a true jack of all trades, he also handles several miscellaneous initiatives.

Some of the things that Nathan does are very repetitive and mind-numbing. He wants to automate some of these so that he doesn’t burn out. As an **Automation Expert**, you are meeting with Nathan today to help him understand how he can offload some of his responsibilities to n8n.

**You 👩‍🔧:** Nice to meet you, Nathan. Glad to be doing this! What’s a repetitive task that is error-prone and that you’d like to get off your plate first?

**Nathan 🙋:** Thanks for coming in! The most annoying one’s gotta be the weekly sales reporting.

I have to collect sales data from our legacy data warehouse, which manages data from the main business processes of an organisation, such as sales or production. Now, each sales order can have the status Processing or Booked. I have to calculate the sum of all the Booked orders and announce them in the company Discord every Monday. Then I have to create a spreadsheet of all the Processing sales, so that the Sales Managers can review them and check if they need to follow up with customers.

This manual work is tough and requires high attention to detail, to make sure that all the numbers are right. Inevitably, sometimes I lose my focus and mistype a number or don’t get to do it on time. I’ve been criticized once by my manager for miscalculating the data.

**You 👩‍🔧:** Oh no! Doesn’t the data warehouse have a way to export the data?

**Nathan 🙋:** The data warehouse was written in-house ages ago. It doesn’t have a CSV export but they recently added a couple of API endpoints that expose this data, if that helps.

**You 👩‍🔧:** Perfect! That’s a good start. If you have a generic API, we can add some custom code and a couple of services to make an automated workflow. This gig has n8n written all over it. Let’s get started!


## Designing the workflow
Now that we have an idea of what Nathan wants to automate, let’s enumerate the steps he needs to take to achieve this:

1. Get the relevant data (order id, order status, order value, employee name) from the data warehouse
2. Filter the orders by their status (processing or booked)
3. Calculate the total value of all the booked orders
4. Notify the team members about the booked orders in the company’s Discord channel
5. Insert the details about the processing orders in Airtable for follow-up
6. Schedule this workflow to run every Monday morning

Nathan’s workflow involves sending data from the company’s data warehouse to two external services: Discord and Airtable. In between, the data has to be wrangled with general functions (conditional filtering, calculation, scheduling).

n8n provides integrations for all these steps, so Nathan’s workflow in n8n would look like this:

<figure><img src="./images/chapter-two/Finished-workflow.png" alt="Finished workflow" style="width:100%"><figcaption align = "center"><i>Nathan's workflow</i></figcaption></figure>

Now you're ready to [start building the workflow!](../level-one/chapter-2-workflow.md)