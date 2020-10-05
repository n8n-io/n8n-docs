# Changelog

[[toc]]
## n8n@0.86.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.85.0...n8n@0.86.0) for this version.<br />
**Release date:** 2020-10-05

- New nodes
    - Clockify
    - CoinGecko
    - G Suite Admin
    - Mindee
    - Wufoo Trigger
- Enhanced nodes
    - Slack: Added User Profile resource
    - Mattermost: Added Create and Invite operations for the User resource
- Bug Fixes
    - S3: Fixed issue with uploading files
- Webhook ID gets refreshed on node duplication

## n8n@0.85.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.84.4...n8n@0.85.0) for this version.<br />
**Release date:** 2020-09-30

- Enhanced nodes
    - Postgres: Added Schema parameter for the Update operation
- Bug Fixes
    - Jira: Fixed a bug with the Issue Type field
    - Pipedrive Trigger: Fixed issues with the credentials  
- Changed the bcrypt library to `bcrypt.js` to make it compatible with Windows
- The OAuth callback URLs are now generated in the backend

## n8n@0.84.4 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.84.3...n8n@0.84.4) for this version.<br />
**Release date:** 2020-09-23

- Bug Fixes
    - Google Sheets: Fixed issues with the update and append operations

## n8n@0.84.3 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.84.2...n8n@0.84.3) for this version.<br />
**Release date:** 2020-09-23

- Fixed an issue with the build by setting `jwks-rsa` to an older version

## n8n@0.84.2 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.84.1...n8n@0.84.2) for this version.<br />
**Release date:** 2020-09-23

- Fixed an issue with the OAuth window. The OAuth window now closes after authentication is complete

## n8n@0.84.1 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.84.0...n8n@0.84.1) for this version.<br />
**Release date:** 2020-09-23

- Additional endpoints can be excluded from authentication checks. Multiple endpoints can be added separated by colons

## n8n@0.84.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.83.0...n8n@0.84.0) for this version.<br />
**Release date:** 2020-09-23

- Enhanced nodes
    - Twitter: Added support for auto mention of users in reply tweets
- Bug Fixes
    - Google Sheets: Fixed issue with non-Latin sheet names
    - HubSpot: Fixed naming of credentials
    - Microsoft: Fixed naming of credentials
    - Mandrill: Fixed attachments with JSON parameters
- Expressions now use short variables when selecting input data for the current node
- Fixed issue with renaming credentials for active workflows

## n8n@0.83.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.82.1...n8n@0.83.0) for this version.<br />
**Release date:** 2020-09-18

- New nodes
    - LinkedIn
    - Taiga
    - Taiga Trigger
- Enhanced nodes
    - ActiveCampaign: Added multiple functions, read more [here](https://github.com/n8n-io/n8n/commit/a552febab494f8ecc022391f046752f1f9f5a4cc)
    - Airtable: Added typecast functionality
    - Asana: Added OAuth2 support
    - ClickUp: Added OAuth2 support
    - Google Drive: Added share operation
    - IMAP Email: Added support for custom rules when checking emails
    - Sentry.io: Added support for self-hosted version
    - Twitter: Added retweet, reply, and like operations
    - WordPress: Added author field to the post resource
- Bug Fixes
    - Asana Trigger: Webhook validation has been deactivated
    - Paddle: Fixed `returnData` format and coupon description
- The ActiveCampaign node has [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0830)
- Fixed issues with test-webhook registration

## n8n@0.82.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.82.0...n8n@0.82.1) for this version.<br />
**Release date:** 2020-09-14

- Speed for basic authentication with hashed password has been improved

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
