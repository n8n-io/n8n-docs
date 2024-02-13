---
description: Use workflow templates
contentType: howto
---

# Workflow templates

When creating a new workflow, you can choose whether to start with an empty workflow, or use an existing template.

Templates provide:

* Help getting started: n8n might already have a template that does what you need.
* Examples of what you can build
* Best practices for creating your own workflows

## Use a workflow template

In the sidebar, select **Templates**. The next steps depend on whether you use n8n's template library, or a custom library provided by your organization.

Using the n8n templates library:

1. The app directs you to [Workflows](https://n8n.io/workflows/){:target=_blank .external-link} on the n8n website.
1. Filter or search to find templates.
1. Select a workflow to view more information. n8n opens the workflow details page.
1. On the workflow details page, either:
	- Select **Use workflow**. n8n opens the workflow in your Cloud instance.
	- Select **Copy workflow** to download the workflow JSON.

Using a custom library:

1. Browse or search the workflow templates list.
1. Select a workflow to view more information. n8n opens the workflow details page.
1. On the workflow details page, select **Use this workflow**. n8n opens the workflow.
1. Select **Save** to add the workflow to your workflows.

/// note | Workflow templates are available in 0.165.0 and above
Workflow templates are available on all flavors of n8n. If you can't access workflow templates in n8n, check that your n8n version is 0.165.0 or above, and check whether you are using a self-hosted or embedded version of n8n with templates disabled.
///

## Add your workflow to the n8n library

--8<-- "_snippets/workflows/templates/submit-templates.md"

## Self-hosted n8n: Disable templates

--8<-- "_snippets/workflows/templates/disable-templates.md"

## Self-hosted n8n: Use your own library

--8<-- "_snippets/workflows/templates/custom-templates-library.md"
