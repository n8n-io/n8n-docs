---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Designing the Workflow

Now that we know what Nathan wants to automate, let's consider the steps he needs to take to achieve his goals:

1. Get the relevant data (order id, order status, order value, employee name) from the data warehouse
2. Filter the orders by their status (Processing or Booked)
3. Calculate the total value of all the Booked orders
4. Notify the team members about the Booked orders in the company's Discord channel
5. Insert the details about the Processing orders in Airtable for follow-up
6. Schedule this workflow to run every Monday morning

Nathan's workflow involves sending data from the company's data warehouse to two external services:

- Discord
- Airtable

Before that, the data has to be wrangled with general functions (conditional filtering, calculation, scheduling).

n8n provides integrations for all these steps, so Nathan's workflow in n8n would look like this:

[[ workflowDemo("file:////courses/level-one/finished.json") ]]

You will build this workflow in eight steps:

1. [Getting data from the data warehouse](/courses/level-one/chapter-5/chapter-5.1.md)
2. [Inserting data into Airtable](/courses/level-one/chapter-5/chapter-5.2.md)
3. [Filtering orders](/courses/level-one/chapter-5/chapter-5.3.md)
4. [Setting values for processing orders](/courses/level-one/chapter-5/chapter-5.4.md)
5. [Calculating booked orders](/courses/level-one/chapter-5/chapter-5.5.md)
6. [Notifying the team](/courses/level-one/chapter-5/chapter-5.6.md)
7. [Scheduling the workflow](/courses/level-one/chapter-5/chapter-5.7.md)
8. [Activating and examining the workflow](/courses/level-one/chapter-5/chapter-5.8.md)

To build this workflow, you will need the credentials found in the email you received from n8n when you signed up for this course. If you haven't signed up already, you can do it [here](https://n8n-community.typeform.com/to/PDEMrevI?typeform-source=127.0.0.1). If you haven't received a confirmation email after signing up, [contact us](mailto:help@n8n.io).

[Start building!](/courses/level-one/chapter-5/chapter-5.1.md){ .md-button }
