# Automating a (Real-world) Use Case

Meet Nathan 🙋. Nathan works as an Analytics Manager at ABCorp. His job is to support the ABCorp team with reporting and analytics. Being a true jack of all trades, he also handles several miscellaneous initiatives.

Some of the things that Nathan does are very repetitive and mind-numbing. He wants to automate some of these tasks so that he doesn’t burn out. As an **Automation Expert**, you are meeting with Nathan today to help him understand how he can offload some of his responsibilities to Workflow².

## Understanding the scenario

**You 👩‍🔧:** Nice to meet you, Nathan. Glad to be doing this! What’s a repetitive task that is error-prone and that you’d like to get off your plate first?

**Nathan 🙋:** Thanks for coming in! The most annoying one’s gotta be the weekly sales reporting.

I have to collect sales data from our legacy data warehouse, which manages data from the main business processes of an organization, such as sales or production. Now, each sales order can have the status Processing or Booked. I have to calculate the sum of all the Booked orders and announce them in the company Discord every Monday. Then I have to create a spreadsheet of all the Processing sales so that the Sales Managers can review them and check if they need to follow up with customers.

This manual work is tough and requires high attention to detail to make sure that all the numbers are right. Inevitably, I sometimes lose my focus and mistype a number or don’t get to do it on time. I’ve been criticized once by my manager for miscalculating the data.

**You 👩‍🔧:** Oh no! Doesn’t the data warehouse have a way to export the data?

**Nathan 🙋:** The data warehouse was written in-house ages ago. It doesn’t have a CSV export but they recently added a couple of API endpoints that expose this data, if that helps.

**You 👩‍🔧:** Perfect! That’s a good start. If you have a generic API, we can add some custom code and a couple of services to make an automated workflow. This gig has Doc² written all over it. Let’s get started!
