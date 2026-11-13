---
description: Requirements for useful, original, tested, and documented n8n workflow templates.
layout:
  description:
    visible: false
---

# Template submission guidelines

Submit an original workflow that solves a practical problem, works after import, and includes the instructions someone else needs to use it.

## Solve a useful problem

Choose a specific audience and outcome. Explain the task your template handles and why that result helps someone.

Search the [template library](https://n8n.io/workflows/) before building. Your submission should fill a gap or make a meaningful improvement to an existing approach.

Templates need enough substance to save someone work. A trigger connected to a single action, a default chatbot, or an isolated API request needs more context or reusable logic to qualify. Develop the use case into a complete solution with the data handling, decisions, and setup it needs.

For example, a lead intake template could check required fields, match existing contacts, route qualified leads, and explain what happens to incomplete records.

Keep the design as simple as the problem allows. Extra nodes don't make a template more useful. A focused workflow can qualify when it handles a specific problem well and provides reusable logic or knowledge.

## Review AI-assisted submissions

{% hint style="info" %}
**You can submit AI-assisted work**

AI-generated workflows, code, expressions, and setup instructions are welcome when you've reviewed and tested them. You must understand how the workflow works and verify its claims before submitting it.
{% endhint %}

Review generated content before submitting:

* Check every node, expression, code snippet, API endpoint, and dependency. Replace invented or unsupported settings.
* Run the workflow with representative inputs. Inspect its output, including AI responses, for accuracy and usefulness.
* Make setup instructions match the workflow. Remove invented features, unsupported claims, generic filler, and instructions that don't apply.
* Check links, spelling, and formatting. Rewrite text that repeats information without helping someone set up or use the template.

Don't submit unreviewed AI output, batches of near-identical workflows, or generic examples with only names, prompts, or app choices changed. These are low-effort submissions and don't meet the quality requirements.

## Submit original work

Create your own templates. Don't copy, repost, or resell someone else's workflow. Plagiarism will result in an account ban.

If you build on an existing approach, explain your contribution and respect the original author's license and permissions.

## Make the workflow understandable

* Rename nodes to describe their purpose, such as **Find existing contact** or **Route incomplete submissions**.
* Arrange nodes so someone can follow the execution path.
* Follow the [sticky note guidelines](sticky-note-guidelines.md). Include one overview note and section notes where required.
* Group values that someone needs to change in an **Edit Fields (Set)** node where practical. Explain each value and use clear placeholders.
* Document required credentials, permissions, external resources, and dependencies such as sub-workflows or community nodes.
* Include the error handling the use case needs. Explain any limitations or failures that need manual attention.

Assume someone may be new to n8n. Keep required instructions with the template. You can link to detailed setup guides or add a walkthrough video as a supplement.

## Remove secrets and personal data

Use n8n credentials for authentication. Don't put API keys, tokens, passwords, or authorization headers directly in node parameters, code, expressions, or notes.

Review the exported JSON before submitting. Remove credential names and IDs that identify your accounts, personal email addresses, chat IDs, spreadsheet IDs, webhook URLs, and other private resource identifiers. Replace configurable resource values with placeholders and explain how to set them.

Remove sensitive sample data and pinned execution data. If the workflow needs example input, include synthetic data that demonstrates the expected structure.

## Test the template before submitting

Test the exact JSON file you plan to submit. A workflow that works only in your original instance isn't ready to share.

1. Export the workflow and import it into a fresh workflow.
2. Follow your setup instructions. Configure credentials and replace placeholders without relying on resources that only exist in your original workflow.
3. Run the complete workflow with representative input. Check the final result in the destination service, not just the execution status.
4. Exercise each documented branch. Test missing or empty input, multiple records, and failed service calls where they apply.
5. Check repeated executions. If the workflow creates records or sends notifications, verify its duplicate handling or explain when repeats can occur.
6. Confirm that it doesn't depend on pinned data, missing sub-workflows, local files, or undocumented resources.
7. For AI workflows, try varied inputs and review the responses. Confirm that downstream nodes handle the output format and expected failure cases.
8. Check that sticky notes, screenshots, and setup links match the tested workflow.

State the n8n release you tested when the workflow depends on version-specific behavior. Document required node or package versions and any platform restrictions. Don't claim compatibility you haven't checked.

## Templates with community nodes

Name each community node package, document the version you tested, and link to its installation instructions.

Verified community nodes can be available on n8n Cloud and self-hosted instances. Unverified community nodes require self-hosting. Check the specific package and describe the supported setup. See [community node installation](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/installation-and-management).

Include an image of the workflow when it uses community nodes, so someone can inspect the workflow if its preview doesn't render. Include the setup instructions in text as well.

## Submission checklist

Before you [submit your template](README.md#submit-a-template), confirm that:

* It solves a practical problem and adds value to the library.
* It's your work, and you've reviewed any AI-generated content.
* The exported JSON works after import using the documented setup steps.
* You've checked the expected output and relevant failure cases.
* You've removed secrets, private identifiers, and sensitive data.
* Nodes have descriptive names, and the required sticky notes are present.
* The workflow's sticky notes state requirements, setup steps, behavior, and limitations.

## Related resources

* [Create workflow templates](./)
* [Add sticky notes to templates](sticky-note-guidelines.md)
* [Workflow template ideas](workflow-template-ideas.md)
