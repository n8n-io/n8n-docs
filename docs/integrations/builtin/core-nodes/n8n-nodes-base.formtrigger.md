---
title: n8n Form Trigger
description: Documentation for the n8n Form Trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# n8n Form Trigger

Use the n8n Form Trigger to start a workflow when a user submits a form, taking the input data from the form. The node generates the form web page for you to use.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [n8n Form Trigger integrations](https://n8n.io/integrations/form-trigger/){:target=_blank .external-link} page.


## Build and test workflows

While building or testing a workflow, use the test URL. Using a test URL ensures that you can view the incoming data in the editor UI, which is useful for debugging. 

There are two ways to test:

* Select **Test Step**. n8n opens the form. When you submit the form, n8n runs the node, but not the rest of the workflow.
* Select **Execute Workflow**. n8n opens the form. When you submit the form, n8n runs the workflow.

## Production workflows

When your workflow is ready, switch to using the production URL. You can then activate your workflow, and n8n runs it automatically when a user submits the form.

When working with a production URL, ensure that you have saved and activated the workflow. Data flowing through the Form Trigger isn't visible in the editor UI with the production URL.

## Node parameters

These are the main node configuration fields.

### Form URLs

The Form Trigger node has two URLs: test URL and production URL. n8n displays the URLs at the top of the node panel. Select **Test URL** or **Production URL** to toggle which URL n8n displays.

![Screenshot of the form URLs](/_images/integrations/builtin/core-nodes/form-trigger/form-urls.png)

* **Test**: n8n registers a test webhook when you select **Test Step** or **Execute workflow**, if the workflow isn't active. When you call the URL, n8n displays the data in the workflow.
* **Production**: n8n registers a production webhook when you activate the workflow. When using the production URL, n8n doesn't display the data in the workflow. You can still view workflow data for a production execution: select the **Executions** tab in the workflow, then select the workflow execution you want to view.

### Form Title

n8n displays the **Form Title** as the webpage title and main `h1` title on the form.

### Form Description

n8n displays the **Form Description** as a subtitle below the main `h1` title on the form.

### Form Fields

Create the question fields for your form. Select **Add Form Field** to add a new field.

Every field has the following settings:

* **Field Label**: 
* **Field Type**: this can be **Text**, **Number**, **Date**, or **Dropdown List**. 
	* If you select **Date**, n8n includes a date picker in the form.
	* If you select **Dropdown List**, n8n displays **Field Options** in the node: use this to add the dropdown options. By default, the dropdown is single-choice. To make it multiple choice, activate the **Multiple Choice** toggle in **Field Options**.
* **Required Field**: activate this toggle to require users to complete this field on the form.

### Respond When

Choose when n8n sends a response to the form submission. You can respond when:

* **Form Is Submitted**: send a response to the user as soon as they submit the form.
* **Workflow Finishes**: use this if you want the workflow to complete its execution before you send a response to the user. If the workflow errors, it sends a response to the user telling them there was a problem submitting the form.

## Node options

Select **Add Option** to view more configuration options.

**Form Submitted Text**: the text to show to the user when they successfully submit the form.
