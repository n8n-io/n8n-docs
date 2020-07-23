# Changelog

[[toc]]

## n8n@0.74.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.73.1...n8n@0.74.0) for this version.

- New nodes
    - QuestDB
    - Hacker News
    - Xero
- Enhanced nodes
    - MongoDB
    - Postgres
    - Webhook
    - Mailchimp
    - Pipedrive
    - HTTP Request
    - Affinity Trigger
    - Uplead
- Webhook URLs are now handled independently of the workflow ID by `https://{hostname}/webhook/{path}` instead of the older `https://{hostname}/webhook/{workflow_id}/webhook/{path}`.


## n8n@0.73.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.73.0...n8n@0.73.1) for this version.

- Enhanced nodes
    - Microsoft SQL


## n8n@0.73.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.72.0...n8n@0.73.0) for this version.

- New nodes
    - Zoom
    - Salesforce
    - CircleCI
- Enhanced nodes
    - Microsoft SQL
    - Postmark Trigger
- It is now possible to set default values for credentials that get prefilled, and the user cannot change.


## n8n@0.72.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.71.0...n8n@0.72.0) for this version.

- Enhanced nodes
    - Pipedrive
    - Facebook Graph API
    - Drift
    - Eventbrite Trigger
- Fixed credential issue for the Execute Workflow node


## n8n@0.71.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.70.0...n8n@0.71.0) for this version.

- New nodes
    - Google Tasks
    - Spotify
    - SIGNL4
- Enhanced nodes
    - Hubspot 
    - Mailchimp
    - Typeform
    - Webflow
    - Zendesk
- Added Postgres SSL support
- It is now possible to deploy n8n under a subfolder


## n8n@0.70.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.69.1...n8n@0.70.0) for this version.

- Enhanced nodes
    - GitHub
    - Mautic Trigger
    - MongoDB
    - Monday.com
- Fixed the issue with multiuser-setup
