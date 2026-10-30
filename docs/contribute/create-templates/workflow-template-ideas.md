---
description: Choose a practical use case and develop it into a useful n8n workflow template.
layout:
  description:
    visible: false
---

# Workflow template ideas

This page lists use cases and suggested scopes you can build into workflow templates for the n8n template library.

Use these ideas as starting points. You can submit other use cases, roles, and app combinations. An idea's inclusion here doesn't guarantee approval.

## Develop an idea into a template

Search the [template library](https://n8n.io/workflows/) to see what already exists. Define the audience, expected input, useful output, and setup requirements before building.

A generic prompt or a single API call needs context and reusable logic to become a useful template. Add the logic the use case needs, such as validation, matching, routing, duplicate handling, or review. Keep the workflow focused.

For AI workflows, define what the model should do, how you check its output, and what happens when it can't produce a useful answer.

## Explore use cases

The examples describe possible scope, not tested workflows. Check service APIs, permissions, and dependencies before choosing apps. Build and test the implementation yourself.

| Audience | Template idea | Suggested scope |
| --- | --- | --- |
| Product | Notify teams about matching database users | Filter users by documented criteria, send only new matches to Slack, and record which users you've already reported. |
| Marketing, AI | Draft a blog post from a new YouTube video | Retrieve the transcript, create a source-linked draft, and route it for review before publishing. |
| Product, Support, Sales | Classify support requests and create follow-up tasks | Classify tickets, route uncertain results for review, and create linked tasks without duplicates. |
| Sales | Find decision-makers at listed companies | Read a company list, match relevant roles, record sources, and flag missing or uncertain matches. |
| AI, Engineering | Generate code from a structured request | Check the request, generate code for a defined task, and return checks and limitations for human review. |
| AI, Engineering | Convert vector files | Accept supported input formats, convert files through a configured service, and report unsupported formats or failures. |
| AI, Engineering | Convert code between supported languages | Accept a defined source and target language, preserve input context, and return output with validation results for review. |
| Support | Send a digest of n8n release notes | Track new releases, format relevant changes, and send a digest without repeating releases already reported. |
| Sales, Marketing | Find companies from matching job postings | Filter new postings by role and location, deduplicate companies, and save source links to Google Sheets. |
| IT Ops | Support employee account recovery | Verify an authorized recovery request, route it through the required approval, and record the outcome. |
| Product | Collect product ideas through a Slack command | Check the submission, store its context in Notion, and return a confirmation with a link to the idea. |
| Sales | Find competitors for a list of companies | Resolve company identities, gather sourced competitor suggestions, and flag uncertain matches for review. |
| Marketing | Monitor competitor reviews | Collect new reviews, group them by theme, and send a source-linked summary without repeating older reviews. |
| Sales, AI | Draft outreach from a lead's social activity | Collect relevant source material, draft a message grounded in it, and require review before sending. |
| Sales | Sync Calendly meetings with a CRM | Match attendees to contacts, create meeting records, and handle reschedules or cancellations without duplicate events. |
| Marketing, AI | Turn customer reviews into follow-up tasks | Identify actionable feedback, link each task to its source, and avoid creating repeated tasks. |
| Sales | Sync Notion call notes with Pipedrive | Match the contact or deal, map note fields, and report notes without a matching record. |
| Marketing, Sales | Score newsletter subscribers and route leads | Enrich subscribers, apply documented scoring rules, and sync qualifying contacts without duplicate records. |
| Sales, Product, Support | Look up CRM contacts through Slack | Check the requester's access, resolve ambiguous matches, and return only the permitted contact fields. |
| Engineering | Sync Freshdesk tickets with Linear | Map ticket status and ownership, link corresponding records, and prevent updates from looping between systems. |
| Marketing, AI | Draft social posts and queue them in Buffer | Generate posts from defined source material, send them for review, and queue approved versions. |
| Sales | Review inactive CRM deals | Check deal activity against a defined period, flag stale records, and confirm which deals should close. |
| Marketing, Engineering, Product | Combine data sources in Google Sheets | Normalize source fields, merge by stable keys, and report conflicts or missing records. |
| IT Ops | Remove a departing employee's access | Process an approved departure, revoke the intended access, and record each completed or failed action. |
| IT Ops | Onboard an employee | Use an approved employee record to provision the required resources and report incomplete setup. |
| Marketing | Republish approved WordPress content | Map content to the destination format, preserve source attribution, and prevent duplicate publication. |
| Product | Send a product signup summary | Apply a clear reporting window and timezone, calculate signup totals, and send a summary including zero-signup days. |
| Product, Customer Success, Support | Manage subscription changes | Process subscription events, update the relevant CRM records, and handle repeated or out-of-order notifications. |
| Sales | Update CRM contacts through Slack | Check permissions, show the proposed change for confirmation, and record the update result. |
| Sales, Marketing, AI | Score new CRM contacts with AI | Use defined criteria and source fields, check structured scores, and route uncertain results for review. |
| Sales, AI | Enrich Typeform leads with AI | Use reliable source data, preserve its provenance, and flag unsupported information instead of inventing contact details. |
| Sales, Marketing, AI | Draft replies to social comments | Classify incoming comments, draft relevant replies, and route sensitive or uncertain replies for review. |
| Sales | Respond to high-priority form submissions | Check required fields, apply priority rules, and route the response while handling duplicate submissions. |
| Sales, Support, Marketing | Prepare personalized follow-ups and reminders | Draft messages from recorded interactions, schedule reminders, and stop reminders when the contact responds. |
| Sales, Marketing | Verify and enrich email addresses in a spreadsheet | Check addresses, record enrichment sources and confidence, and separate failures from confirmed results. |
| Product, Sales, Customer Success, Ops | Answer database questions through Slack | Restrict queries to permitted read operations, enforce access, and return traceable results or a clear failure. |
| Marketing, Product, Sales | Route website interest to the relevant sales owner | Match permitted visitor signals to CRM records, apply routing rules, and prepare relevant outreach for review. |
| Sales, AI | Classify contacts by function and seniority | Use defined categories, keep source fields, and flag low-confidence classifications for review. |
| Sales | Track companies that raise funding | Collect sourced funding events, resolve company identities, and add only new matches to the tracking sheet. |
| Marketing | Enrich a company list with traffic estimates | Match domains, retrieve estimates for a defined period, and report missing data and service limits. |
| Sales | Notify sales about high-priority leads | Check incoming form data, apply explicit priority rules, and send the owner a notification with the CRM record. |
| Product, Sales, AI | Turn lead responses into follow-up tasks | Classify incoming replies, map them to the right deal, and create the next action with a source link. |
| Sales | Enrich a company list with AI | Use sourced company information, check the output schema, and separate missing data from confirmed facts. |
| Engineering, Product | Route bug reports to the right team | Classify issue content, apply explicit routing rules, and leave uncertain reports for triage. |
| Ops, Engineering | Transfer files from FTP to Google Drive | Track transferred files, handle naming conflicts, and report incomplete uploads without re-uploading completed files. |
| Sales | Analyze hiring activity for target companies | Match job postings to listed companies, summarize relevant needs, and save source links with the analysis. |
| Marketing, AI | Draft pages from structured content records | Create useful drafts from distinct source records, detect duplicates, and require editorial review before publication. |
| Marketing | Draft a post from a new product record | Select relevant source fields, create a grounded draft, and send it for review with a link to the original record. |
| Product | Sync product feedback requests with Linear | Map request fields and status, link corresponding records, and prevent repeated updates or sync loops. |
| Sales | Enrich a list of professional profile URLs | Resolve permitted profile data, record sources, and flag unavailable or ambiguous profiles. |
| Sales | Verify email addresses with fallback providers | Try providers in a defined order, normalize results, and stop once the workflow reaches a documented confidence level. |
| Marketing | Send a newsletter subscriber summary | Calculate additions for a defined period, handle empty results, and send totals without exposing subscriber details. |
| Marketing | Sync incoming leads to HubSpot | Check lead fields, match existing contacts, and create or update records while recording sync failures. |
| Sales, Customer Success | Sync HubSpot contacts with Google Sheets | Map fields by stable contact IDs, document sync direction, and handle updates without adding duplicate rows. |

## Prepare your submission

Use the [submission guidelines](submission-guidelines.md) to check originality, testing, and setup requirements. Add [sticky notes](sticky-note-guidelines.md) that explain the workflow you tested, then [submit your template](README.md#submit-a-template). The Creator portal generates the title and description automatically.

## Related resources

* [Create workflow templates](./)
* [Template submission guidelines](submission-guidelines.md)
* [Add sticky notes to templates](sticky-note-guidelines.md)
