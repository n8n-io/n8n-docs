# Changelog

## n8n@0.100.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.99.1...n8n@0.100.0) for this version.<br />
**Release date:** 2020-12-30

- New nodes
    - Microsoft Outlook
- Enhanced nodes
    - ActiveCampaign: The node loads more options for the fields
    - Asana: Added Subtask resource and Get All operation for the Task resource
    - Edit Image: Added Multi Step option
    - HTTP Request: Added Use Querystring option
    - IF: Added Ends With and Starts With operations
    - Jira: Added Issue Comment resource
    - Switch: Added Ends With and Starts With operations
    - Telegram: Added File resource
- Bug fixes
    - Box Trigger: Fixed a typo in the description
    - Edit Image: Fixed an issue with multiple composite operations
    - HTTP Request: Fixed an issue with the binary data getting used by multiple nodes
    - S3: Fixed an issue with uploading files
    - Stripe Trigger: Fixed an issue with the existing webhooks
    - Telegram: Fixed an issue with the Send Audio operation
- Binary data stays visible if a node gets re-executed

## n8n@0.99.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.98.0...n8n@0.99.0) for this version.<br />
**Release date:** 2020-12-24

- New nodes
    - e-goi
    - RabbitMQ
    - RabbitMQ Trigger
	- uProc
- Enhanced nodes
    - ActiveCampaign: Added the functionality to load the tags for a user
    - FTP: Added Delete and Rename operation
    - Google Cloud Firestore: The node now gives the Collection ID in response
    - Iterable: Added User List resource
    - MessageBird: Added Balance resource
    - TheHive Trigger: Added support for the TheHive3 webhook events, and added Log Updated and Log Deleted events
- Bug fixes
    - Dropbox: Fixed an issue with the OAuth credentials
	- Google Sheets: Fixed an issue with the parameters getting hidden for other operations
- Added functionality to easily copy the data and the path from the output
- Fixed an issue with the node getting selected after it was duplicated

## n8n@0.98.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.97.0...n8n@0.98.0) for this version.<br />
**Release date:** 2020-12-16

- New nodes
    - Brandfetch
	- Pushcut
    - Pushcut Trigger
- Enhanced nodes
    - Google Sheets: Added Spreadsheet resource
	- IF: Added Is Empty option
	- Slack: Added Reaction and User resource, and Member operation to the Channel resource
    - Spreadsheet File: Added the option Include Empty Cell to display empty cells
    - Webhook: Added option to send a custom response body. The node can now also return string data
- Bug fixes
	- GitLab: Fixed an issue with GitLab OAuth credentials. You can now specify your GitLab server to configure the credentials
    - Mautic: Fixed an issue with the OAuth credentials
- If a workflow is using the Error Trigger node, by default, the workflow will use itself as the Error Workflow
- Fixed a bug that caused the Editor UI to display an incorrect (save) state upon activating or deactivating a workflow
## n8n@0.97.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.96.0...n8n@0.97.0) for this version.<br />
**Release date:** 2020-12-10

- New nodes
	- Ghost
	- Nasa
	- Snowflake
	- Twist
- Enhanced nodes
	- Automizy: Added options to add and remove tabs for the Update operation of the Contact resource
	- Pipedrive: Added label field to Person, Organization, and Deal resources. Also added Update operation for the Organization resource
- Bug fixes
	- Fixed a bug that caused OAuth1 requests to break
	- Fixed Docker user mount path

## n8n@0.96.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.95.1...n8n@0.96.0) for this version.<br />
**Release date:** 2020-12-03

- New nodes
    - Cortex
    - Iterable
    - Kafka Trigger
    - TheHive
    - TheHive Trigger
    - Yourls
- Enhanced nodes
    - Hubspot: Added Contact List resource and Search operation for the Deal resource
    - Google Calendar: You can now add multiple attendees in the Attendees field
    - Slack: The node now loads both private and public channels
- Bug Fixes
    - MQTT: Fixed an issue with the connection. The node now uses `mqtt@4.2.1`
	- Fixed a bug which caused the Trigger-Nodes to require data from the first output
- Added configuration to load only specific nodes

## n8n@0.95.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.95.0...n8n@0.95.1) for this version.<br />
**Release date:** 2020-11-25

- Bug Fixes
    - Airtable Trigger: Fixed the icon of the node

## n8n@0.95.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.94.1...n8n@0.95.0) for this version.<br />
**Release date:** 2020-11-25

- New nodes
    - Airtable Trigger
    - LingvaNex
    - OpenThesaurus
    - ProfitWell
    - Quick Base
    - Spontit
- Enhanced nodes
    - Airable: The Application ID field has been renamed to Base ID, and the Table ID field has been renamed to Table. The List operation now downloads attachments automatically
    - Harvest: Added OAuth authentication method
- Bug Fixes
    - Slack: Fixed an issue with creating channels and inviting users to a channel

## n8n@0.94.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.94.0...n8n@0.94.1) for this version.<br />
**Release date:** 2020-11-20

- Bug Fixes
    - GraphQL: Fixed an issue with the variables
    - WooCommerce Trigger: Fixed an issue with the webhook. The node now reuses a webhook if it already exists.

## n8n@0.94.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.93.0...n8n@0.94.0) for this version.<br />
**Release date:** 2020-11-19

- New nodes
    - Google Cloud Natural Language
	- Google Firebase Cloud Firestore
    - Google Firebase Realtime Database
    - Humantic AI
- Enhanced nodes
    - ActiveCampaign: Added Contact List and List resource
    - Edit Image: Added support for drawing, font selection, creating a new image, and added the Composite resource
    - FTP: Added Private Key and Passphrase fields to the SFTP credentials and made the directory creation more robust
    - IMAP: Increased the timeout
    - Matrix: Added option to send notice, emote, and HTML messages
    - Segment: Made changes to the properties `traits` and `properties`. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0940) page
- Bug Fixes
    - GraphQL: Fixed an issue with the variables
    - Mailchimp: Fixed an issue with the OAuth credentials. The credentials are now sent with the body instead of the header
    - YouTube: Fixed a typo for the Unlisted option
- Added horizontal scrolling

## n8n@0.93.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.92.0...n8n@0.93.0) for this version.<br />
**Release date:** 2020-11-11

- New nodes
    - GetResponse
    - Gotify
    - Line
    - Strapi
- Enhanced nodes
    - AMQP: Connection is now closed after a message is sent
    - AMQP Trigger: Added Message per Cycle option to retrieve the specified number of messages from the bus for every cycle
    - Hubspot: Added Custom Properties for the Deal resource as Additional Fields
    - Jira: The node retrieves all the projects for the Project field instead of just 50
    - Mattermost: Improved the channel selection
    - Microsoft SQL: Added TLS parameter for the credentials
    - Pipedrive Trigger: Added OAuth authentication method. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0930) page
    - Segment: Added Custom Traits option for the Traits field
- Bug Fixes
    - Shopify Trigger: Fixed an issue with activating the workflow
- For custom nodes, you can now set custom documentation URLs

## n8n@0.92.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.91.0...n8n@0.92.0) for this version.<br />
**Release date:** 2020-11-04

- New nodes
    - Facebook Trigger
    - Google Books
    - Orbit
    - Storyblok
- Enhanced nodes
    - Google Drive: Removed duplicate parameters
    - Twitter: Added Direct Message resource
- Bug Fixes
    - Gmail: Fixed an issue with the encoding for the subject field
- Improved the Editor UI for the save workflow functionality

## n8n@0.91.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.90.0...n8n@0.91.0) for this version.<br />
**Release date:** 2020-10-23

- New nodes
    - Kafka
    - MailerLite
    - MailerLite Trigger
    - Pushbullet
- Enhanced nodes
    - Airtable: Added Ignore Fields option for the Update operation
    - AMQP Sender: Added Azure Service Bus support
    - Google Calendar: Added Calendar resource and an option to add a conference link
    - G Suite Admin: Added Group resource
    - HTTP Request: Added Batch Size and Batch Interval option
    - Mautic: Added Company resource
    - Salesforce: Added OAuth 2.0 JWT authentication method
- Bug Fixes
    - IF: Fixed an issue with undefined expression
    - Paddle: Fixed an issue with the Return All parameter
    - Switch: Fixed an issue with undefined expression
- Added CLI commands to deactivate the workflow
- Added an option to get the full execution data from the server
- The Editor UI gives an alert if you redirect without saving a workflow
- The Editor UI now indicates if a workflow is saved or not
- Added a check for the Node.js version on startup. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0900) page
- Improved support for touch devices
- Node properties now load on demand
- Updated the Node.js version for the Docker images


## n8n@0.90.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.89.2...n8n@0.90.0) for this version.<br />
**Release date:** 2020-10-23

- Bug Fixes
    - Google Translate: Fixed an issue with the rendering of the image in n8n.io

## n8n@0.89.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.89.1...n8n@0.89.2) for this version.<br />
**Release date:** 2020-10-22

- Bug Fixes
    - Strava Trigger: Fixed a typo in the node name

## n8n@0.89.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.89.0...n8n@0.89.1) for this version.<br />
**Release date:** 2020-10-22

- Removed debug messages

## n8n@0.89.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.88.1...n8n@0.89.0) for this version.<br />
**Release date:** 2020-10-22

- New Nodes
    - Pushover
    - Strava
    - Strava Trigger
    - Google Translate
- Bug Fixes
    - HTTP Request: Fixed an issue with the POST request method for the 'File' response format
- Fixed issue with displaying non-active workflows as active
- Fixed an issue related to multiple-webhooks

## n8n@0.88.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.88.0...n8n@0.88.1) for this version.<br />
**Release date:** 2020-10-16

- Bug Fixes
    - HTTP Request: Fixed an issue with the Form-Data Mutipart and the RAW/Custom Body Content Types

## n8n@0.88.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.87.2...n8n@0.88.0) for this version.<br />
**Release date:** 2020-10-16

- Enhanced Fixes
    - Matrix: Added support for specifying a Matrix Homeserver URL
    - Salesforce: Added Custom Object resource and Custom Fields and Sort options
- Bug Fixes
    - AWS SES: Fixed an issue with the Send Template operation for the Email resource
    - AWS SNS Trigger: Fixed an issue with the Subscriptions topic

## n8n@0.87.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.87.1...n8n@0.87.2) for this version.<br />
**Release date:** 2020-10-15

- Bug Fixes
    - Google Sheets: Fixed an issue with spaces in sheet names
    - Automizy: Fixed an issue with the default resource

## n8n@0.87.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.87.0...n8n@0.87.1) for this version.<br />
**Release date:** 2020-10-15

- Bug Fixes
    - Gmail: Fixed an issue with the Message ID
    - HTTP Request: Fixed an issue with the GET Request
- Added `HMAC-SHA512` signature method for OAuth 1.0

## n8n@0.87.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.86.1...n8n@0.87.0) for this version.<br />
**Release date:** 2020-10-14

- New nodes
    - Automizy
    - AWS Rekognition
    - Matrix
    - Sendy
    - Vonage
    - Wekan
- Enhanced nodes
    - AWS SES: Added Send Template operation for the Email resource and added the Template resource
    - ClickUp: Added Time Entry and Time Entry Tag resources
    - Function: The Function field is now called the JavaScript Code field
    - Mailchimp: Added Campaign resource
    - Mindee: Added currency to the simplified response
    - OneDrive: Added Share operation
    - OpenWeatherMap: Added Language parameter
    - Pipedrive: Added additional parameters to the Get All operation for the Note resource
    - Salesforce: Added Flow resource
    - Spreadsheet File: Added Range option for the Read from file operation
- Bug Fixes
    - ClickUp Trigger: Fixed issue with creating credentials
    - Pipedrive Trigger: Fixed issue with adding multiple webhooks to Pipedrive
- The link.fish Scrape node has been removed from n8n. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0870) page

## n8n@0.86.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.86.0...n8n@0.86.1) for this version.<br />
**Release date:** 2020-10-06

- Enhanced nodes
    - CoinGecko: Small fixes to the CoinGecko node

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
