# Changelog

[[toc]]

## n8n@0.82.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.81.0...n8n@0.82.0) for this version.<br />
**Release date:** 2020-09-14

- New nodes
    - Microsoft Teams
- Enhanced nodes
    - Freshdesk: Added Freshdesk contact resource
    - HTTP Request: Run parallel requests in HTTP Request Node
- Bug Fixes
    - Philips Hue: Added `APP ID` to Philips Hue node credentials
    - Postmark Trigger: Fixed parameters for the node
- The default space between nodes has been increased to two units
- Expression support has been added to the credentials
- Passwords for your n8n instance can now be hashed

## n8n@0.81.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.80.0...n8n@0.81.0) for this version.<br />
**Release date:** 2020-09-09

- New nodes
    - Sentry.io
- Enhanced nodes
    - Asana
    - ClickUp
    - Clockify
    - Google Contacts
    - Salesforce
    - Segment
    - Telegram
    - Telegram Trigger

## n8n@0.80.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.79.0...n8n@0.80.0) for this version.<br />
**Release date:** 2020-09-02

- New nodes
    - Customer.io
    - MQTT Trigger
    - S3
- Enhanced nodes
    - Acuity Scheduling
    - AWS S3
    - ClickUp
    - FTP
    - Telegram Trigger
    - Zendesk

## n8n@0.79.3 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.79.2...n8n@0.79.3) for this version.<br />
**Release date:** 2020-08-30

- The bug that caused the workflows to not get activated correctly has been fixed

## n8n@0.79.2 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.79.1...n8n@0.79.2) for this version.<br />
**Release date:** 2020-08-28

- Added missing rawBody for "application/x-www-form-urlencoded" 

## n8n@0.79.1 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.79.0...n8n@0.79.1) for this version.<br />
**Release date:** 2020-08-28

- Enhanced nodes
    - Contentful
    - HTTP Request
    - Postgres
    - Webhook
- Removed Test-Webhook also in case checkExists fails 
- HTTP Request node does not overwrite accept header if it's already set
- Add rawBody to every request so that n8n does not give an error if body is missing

## n8n@0.79.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.79.2...n8n@0.79.3) for this version.<br />
**Release date:** 2020-08-27

- New nodes
    - Contentful
    - Convertkit
    - Convertkit Trigger
    - Paddle
- Enhanced nodes
    - Airtable
    - Coda
    - Gmail
    - HubSpot
    - IMAP Email
    - Postgres
    - Salesforce
    - SIGNL4
    - Todoist
    - Trello
    - YouTube
- The Todoist node has [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0790)
- Added dynamic titles on workflow execution
- Nodes will now display a link to associated credential documentation

## n8n@0.78.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.76.0...n8n@0.78.0) for this version.<br />
**Release date:** 2020-08-18

- New nodes
    - Gmail
    - Google Contacts
    - Unleashed Software
    - YouTube
- Enhanced nodes
    - AMQP
    - AMQP Trigger
    - Bitly
    - Function Item
    - Google Sheets
    - Shopify
    - Todoist
- Enhanced support for [JWT based authentication](security.md#jwt)
- Added an option to execute a node once, using data of only the first item

## n8n@0.76.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.75.0...n8n@0.76.0) for this version.<br />
**Release date:** 2020-08-05

- New nodes
    - Customer.io Trigger
    - FTP
    - Medium
    - Philips Hue
    - TravisCI
    - Twake
- Enhanced nodes
    - CrateDB
    - Move Binary Data
- Nodes will now display a link to associated documentation

## n8n@0.75.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.74.0...n8n@0.75.0) for this version.<br />
**Release date:** 2020-07-26

- New nodes
    - Box
    - Box Trigger
    - CrateDB
    - Jira Trigger
- Enhanced nodes
    - GitLab
    - NextCloud
    - Pipedrive
    - QuestDB
- Webhooks now support OPTIONS request

## n8n@0.74.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.73.1...n8n@0.74.0) for this version.<br />
**Release date:** 2020-07-15

- New nodes
    - Hacker News
    - QuestDB
    - Xero
- Enhanced nodes
    - Affinity Trigger
    - HTTP Request
    - Mailchimp
    - MongoDB
    - Pipedrive
    - Postgres
    - Uplead
    - Webhook    
- Webhook URLs are now handled independently of the workflow ID by `https://{hostname}/webhook/{path}` instead of the older `https://{hostname}/webhook/{workflow_id}/{node_name}/{path}`.


## n8n@0.73.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.73.0...n8n@0.73.1) for this version.<br />
**Release date:** 2020-07-08

- Enhanced nodes
    - Microsoft SQL


## n8n@0.73.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.72.0...n8n@0.73.0) for this version.<br />
**Release date:** 2020-07-08

- New nodes
    - CircleCI
    - Microsoft SQL
    - Zoom
- Enhanced nodes
    - Postmark Trigger
    - Salesforce
- It is now possible to set default values for credentials that get prefilled, and the user cannot change.


## n8n@0.72.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.71.0...n8n@0.72.0) for this version.<br />
**Release date:** 2020-07-02

- Enhanced nodes
    - Drift
    - Eventbrite Trigger
    - Facebook Graph API
    - Pipedrive
- Fixed credential issue for the Execute Workflow node


## n8n@0.71.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.70.0...n8n@0.71.0) for this version.<br />
**Release date:** 2020-06-25

- New nodes
    - Google Tasks
    - SIGNL4
    - Spotify
- Enhanced nodes
    - Hubspot 
    - Mailchimp
    - Typeform
    - Webflow
    - Zendesk
- Added Postgres SSL support
- It is now possible to deploy n8n under a subfolder


## n8n@0.70.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.69.1...n8n@0.70.0) for this version.<br />
**Release date:** 2020-06-13

- Enhanced nodes
    - GitHub
    - Mautic Trigger
    - Monday.com
    - MongoDB
- Fixed the issue with multiuser-setup
