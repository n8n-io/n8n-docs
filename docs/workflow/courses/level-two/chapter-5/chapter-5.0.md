# Automating a business workflow

Remember [our friend Nathan](/workflow/courses/level-one/chapter-3){:target="_blank" .external}?

**Nathan 🙋:** Hello, it's me again. My manager was so impressed with my first workflow automation solution, that she entrusted me with more responsibility.<br/>
**You 👩‍🔧:** More work and responsibility. Congratulations, I guess. What do you need to do now?<br/>
**Nathan 🙋:** I got access to all sales data and am responsible for creating two reports: one for regional sales and one for orders prices. They are based on data from different sources and come in different formats.<br/>
**You 👩‍🔧:** Sounds like a lot of manual work–but the kind that can be automated. So let's do it!


## Workflow design

Now that we have an idea of what Nathan wants to automate, let's list the steps he needs to take to achieve this:

1. Get and combine data from all necessary sources.
2. Sort the data and format the dates.
3. Write binary files.
4. Send notifications via email and Discord.

n8n provides core nodes for all these steps. This use case is somewhat complex and it will be made up of three separate workflows:

1. A workflow that merges the company data with external information.
2. A workflow that generates the reports.
3. A workflow that monitors errors in the second workflow.

## Workflow prerequisites

To build the workflows, you will need the following:

* An [Airtable](https://airtable.com/){:target="_blank" .external} account and [credentials](/integrations/credentials/airtable/){:target="_blank" .external}.
* A [Google](https://www.google.com/account/about/){:target="_blank" .external} account and [credentials](/integrations/credentials/google/){:target="_blank" .external} to access Gmail.
* A [Discord](https://discord.com/){:target="_blank" .external-link} account and webhook URL (you receive this via email when you sign up for this course).

Next, you will build these three workflows with step-by-step instructions.
