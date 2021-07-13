# Designing the workflow
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

You will build this workflow is 8 steps:
1. [Getting data from the data warehouse](../level-one/chapter-2-workflow-1.md)
2. [Inserting data into Airtable](../level-one/chapter-2-workflow-2.md)
3. [Filtering orders](../level-one/chapter-2-workflow-3.md)
4. [Setting values for processing orders](../level-one/chapter-2-workflow-4.md)
5. [Calculating booked orders](../level-one/chapter-2-workflow-5.md)
6. [Notifying the team](../level-one/chapter-2-workflow-6.md)
7. [Scheduling the workflow](../level-one/chapter-2-workflow-7.md)
8. [Activating and examining the workflow](../level-one/chapter-2-workflow-8.md)


Now you're ready to [start building the workflow!](../level-one/chapter-2-workflow-1.md)