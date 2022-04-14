# Automating a business use case

Remember [our friend Nathan](https://docs.n8n.io/courses/level-one/chapter-3.html)?

**Nathan 🙋:** Hello, it's me again. My manager was so impressed with my first workflow automation solution, that she entrusted me with more responsibility.\
**You 👩‍🔧:** More work and responsibility. Congratulations, I guess. What do you need to do now?\
**Nathan 🙋:** I got access to all sales data and am responsible for creating two monthly sales reports: Regional Sales and Representative Commissions. They are based on data from different sources and come in different formats.\
**You 👩‍🔧:** Sounds like a lot of manual work––but the kind that can be automated. So let's do it!


## Designing the workflow

Nathan has to generate two sales reports: one for Regional Sales to be email to the direct manager, and one for Representative Commissions to be email to each sales rep.

The reports include data from different sources and involve different calculations.

1) Regional Sales report
	- Calculate total sales (number and value) grouped by region
	- calculate average deal age (close date - open date)
	- Email this report to the regional manager
2) Representative Commissions
	- Calculate individual rep sales total and commission due
	- Generate PDF and Email to each rep of their total

Now that we have an idea of what Nathan wants to automate, let’s list the steps he needs to take to achieve this:

1. Get and merge data from all necessary sources
2. Format and calculate dates
3. Calculate sales orders
4. Write binary data (PDF, spreadsheet)
5. Send emails

n8n provides core nodes for all these steps. This use case is somewhat complex and it will be made up of three separate workflows:

1. A workflow that merges the company data set with external information.
2. A workflow that calculates and generates the reports.
3. An error workflow that monitors the second (main) workflow.

In the end, Nathan’s workflows would look like this:

<figure><img src="./course_images/workflow.png" alt="Workflow" style="width:100%"><figcaption align = "center"><i>Workflow</i></figcaption></figure>

Next, you will build this workflow step-by-step.

## Building the workflow

### Workflow 1 – Fill in missing data

The company's customer data is stored in Airtable. The base contains information about the customers' *ID*, *country*, *email*, and *join date*, but lacks data about their respective *region* and *subregion*.

<figure><img src="./course_images/workflow_airtableTemplate.png" alt="" style="width:100%"><figcaption align = "center"><i>Airtable setup</i></figcaption></figure>

Nathan needs to fill in these last four fields in order to create the reports for the regional sales representatives. The missing information is openly available through the Countries API, which you can access with the HTTP Request node.

Build a workflow that accomplishes the following:

- Lists the Airtable table `customers`.
- Makes an HTTP request to the REST Countries API: `https://restcountries.com/v3.1/all` (needs to be split into items) to get data about countries.
- Updates the fields *region* and *subregion* in Airtable with the data from the Countries API.


### Workflow 2 – Aggregate data and create reports

1. Merge orders and customer data
2. Calculate dates.
3. Filter dates.

### Workflow 3 – Create an error workflow
In this step of the workflow, you will create an *Error Workflow* that monitors the main workflow, using the *Error Trigger node*.

1. In n8n, create a new workflow that connects the *Error Trigger node* and *Slack node*.
2. Execute the *Error Trigger node* as a test.
3. Configure the *Slack node* and execute it. If everything is set up correctly, you should get a message in the Slack channel that looks like this:
   
   	<figure><img src="./course_images/workflow_error_slackMessage.png" alt="" style="width:100%"><figcaption align = "center"><i>Message in Slack channel</i></figcaption></figure>

4. Set the newly created workflow as *Error Workflow* for the main workflow.
