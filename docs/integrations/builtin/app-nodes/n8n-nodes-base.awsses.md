---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: AWS SES node documentation
description: Learn how to use the AWS SES node in n8n. Follow technical documentation to integrate AWS SES node into your workflows.
contentType: integration
---

# AWS SES node

Use the AWS SES node to automate work in AWS SES, and integrate AWS SES with other applications. n8n has built-in support for a wide range of AWS SES features, including creating, getting, deleting, sending, updating, and adding templates and emails.

On this page, you'll find a list of operations the AWS SES node supports and links to more resources.

/// note | Credentials
Refer to [AWS SES credentials](/integrations/builtin/credentials/aws/) for guidance on setting up authentication. 
///

## Operations

* Custom Verification Email
    * Create a new custom verification email template
    * Delete an existing custom verification email template
    * Get the custom email verification template
    * Get all the existing custom verification email templates for your account
    * Add an email address to the list of identities
    * Update an existing custom verification email template.
* Email
    * Send
    * Send Template
* Template
    * Create a template
    * Delete a template
    * Get a template
    * Get all templates
    * Update a template

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'aws-ses') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

