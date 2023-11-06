---
description: Design your workflow's logic.
---

[TODO: I'm not sure this page is helpful, especially if focused on a dev audience]

# Plan your workflow logic

When you build a workflow, you create a set of instructions for how to process data. This can include:

* Accessing external applications to retrieve and export data. 
* Manipulating data.
* Performing different actions based on the data.


To define your data process, you link nodes together in a sequence. This is your workflow logic. n8n supports complex logic.

///  Details  | What is data?
In n8n, data is any information processed by the workflow. n8n formats data as JSON. Refer to [Data](/data/) for more information on the data structure, and working with n8n workflow data.
///
## Fetch data

Your workflow needs data. There are three main ways to get this data:

* From the trigger node that starts the workflow. For example, if you use the Gmail trigger to start a workflow in response to an event in Gmail, the Gmail trigger node provides data about the event.
* Using an app node to retrieve data. For example, you can use the Gmail node to fetch information from Gmail (after starting the workflow with a different trigger).
* Generate the data within the workflow. For example, you can use the Code node to create data.


## Manipulate data



