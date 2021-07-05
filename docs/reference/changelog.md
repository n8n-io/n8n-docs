# Changelog

🛠 = Version contains a breaking change. Check out the list of all the breaking changes [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md).

## n8n@0.127.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.1...n8n@0.127.0) for this version.<br />
**Release date:** 2021-07-04

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.airtable" title="Airtable:" text="Added Bulk Size option to all Operations."/>
<Changelog node="n8n-nodes-base.box" title="Box:" text="Added Share operation to File and Folder resources."/>
<Changelog node="n8n-nodes-base.salesforce" title="Salesforce:" text="Added Last Name field to Update operation on Contact resource."/>
<Changelog node="n8n-nodes-base.zohoCrm" title="Zoho CRM:" text="Added Account, Contact, Deal, Invoice, Product, Purchase, Quote, Sales Order, and Vendor resources."/>

### Core Functionality ⚙️
- Added a workflow testing framework via a new CLI command to execute all desired workflows. Run `n8n executeBatch --help` for details.
- Added support to display binary video content in Editor UI.

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.googleSheets" title="Google Sheets:" text="Fixed an issue with handling 0 value that resulted in empty cells."/>
<Changelog node="n8n-nodes-base.ssh" title="SSH:" text="Fixed an issue with setting passphrases."/>

### Contributors 🙌
[flybluewolf](https://github.com/flybluewolf), [Kaito Udagawa](https://github.com/umireon)

## n8n@0.126.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.0...n8n@0.126.1) for this version.<br />
**Release date:** 2021-06-29

### Core Functionality ⚙️
- Fixed issues with keyboard shortcuts when a modal was open.

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.microsoftSQL" title="Microsoft SQL:" text="Fixed an issue with handling of Boolean values when inserting."/>
<Changelog node="n8n-nodes-base.pipedrive" title="Pipedrive:" text="Fixed an issue with the node icon."/>

## n8n@0.126.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.125.0...n8n@0.126.0) for this version.<br />
**Release date:** 2021-06-27

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.actionNetwork" title="Action Network" />
<Changelog node="n8n-nodes-base.googleDocs" title="Google Docs"/>

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.awsS3" title="AWS S3:" text="Added Delete operation to the Bucket Resource."/>
<Changelog node="n8n-nodes-base.googleAnalytics" title="Google Analytics:" text="Added Dimension Filters to the available Additional Fields."/>
<Changelog node="n8n-nodes-base.httpRequest" title="HTTP Request:" text="Added Split Into Items option."/>
<Changelog node="n8n-nodes-base.mqtt" title="MQTT:" text="Added mqqts protocol for MQTT credentials."/>
<Changelog node="n8n-nodes-base.quickbooks" title="QuickBooks:" text="Added Purchase resource with Get and Get All operations."/>


### Core Functionality ⚙️
- Templates from the [n8n Workflows](https://n8n.io/workflows) page can now be directly imported by appending `/workflows/templates/<templateId>` to your instance base URL. For example, `localhost:5678/workflows/templates/1142`.
- Added new Editor UI shortcuts. See [Keyboard Shortcuts](keyboard-shortcuts.md) for details.
- Fixed an issue causing console errors when deleting a node from the canvas.

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.ghost" title="Ghost:" text="Fixed an issue with the Get All operation functionality."/>
<Changelog node="n8n-nodes-base.googleAnalytics" title="Google Analytics:" text="Fixed an issue that caused an error when attempting to sort with no data present."/>
<Changelog node="n8n-nodes-base.microsoftSQL" title="Microsoft SQL:" text="Fixed an issue when escaping single quotes and mapping empty fields."/>
<Changelog node="n8n-nodes-base.notion" title="Notion:" text="Fixed an issue with pagination of databases and users."/>

### Contributors 🙌
[calvintwr](https://github.com/calvintwr), [Jan Baykara](https://github.com/janbaykara)

## n8n@0.125.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.124.1...n8n@0.125.0) for this version.<br />
**Release date:** 2021-06-20

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.spotify" title="Spotify:" text="Added Search operation to Album, Artist, Playlist, and Track resources, and Resume and Volume operations to Player resource."/>

### Core Functionality ⚙️
- Implemented new design of the Nodes Panel, adding categories and subcategories, along with improved search. For full details, see the [commits](https://github.com/n8n-io/n8n/commit/0470740737c5ee199447a68b7277c43be2042976).

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.mySql" title="MySQL:" text="Fixed an issue where n8n was unable to save data due to collation, resulting in workflows ending with Unknown status."/>

### Contributors 🙌
[Amudhan Manivasagam](https://github.com/smamudhan), [Carlos Alexandro Becker](https://github.com/caarlos0), [Kaito Udagawa](https://github.com/umireon)

## n8n@0.124.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.124.0...n8n@0.124.1) for this version.<br />
**Release date:** 2021-06-16

### Core Functionality ⚙️
- Improved error log messages
- Fixed an issue where the tags got removed when deactivating the workflow or updating settings
- Removed the circular references for the error caused by the request library

## n8n@0.124.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.123.1...n8n@0.124.0) for this version.<br />
**Release date:** 2021-06-13

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.googleDrive" title="Google Drive:" text="Added APP Properties and Properties options to the Upload operation of the File resource"/>
<Changelog node="n8n-nodes-base.httpRequest" title="HTTP Request:" text="Added the functionlaity to log the request to the browser console for testing"/>
<Changelog node="n8n-nodes-base.notion" title="Notion:" text="Added the Include Time parameter date field types"/>
<Changelog node="n8n-nodes-base.salesforce" title="Salesforce:" text="Added Upsert operation to Account, Contact, Custom Object, Lead, and Opportunity resources"/>
<Changelog node="n8n-nodes-base.todoist" title="Todoist:" text="Added the Description option to the Task resource"/>

### Core Functionality ⚙️
- Implemented the functionality to display the error details in a toast message for trigger nodes
- Improved error handling by removing circular references from API errors

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.jira" title="Jira:" text="Fixed an issues with the API version and fixed an issue with fetching the custom fields for the Issue resource"/>

### Contributors 🙌

[Jean M](https://github.com/jemos), [romaincolombo-daily](https://github.com/romaincolombo-daily), [Thomas Jost](https://github.com/Schnouki), [Vincent](https://github.com/vbouchet31)

## n8n@0.123.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.123.0...n8n@0.123.1) for this version.<br />
**Release date:** 2021-06-06

### Core Functionality ⚙️
- Fixed a build issue for missing node icons

## n8n@0.123.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.3...n8n@0.123.0) for this version.<br />
**Release date:** 2021-06-06

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.git" title="Git" />
<Changelog node="n8n-nodes-base.microsoftToDo" title="Microsoft To Do" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.pipedrive" title="Pipedrive:" text="Added a feature to fetch data from the Pipedrive API, added Search operation to the Deals resource, and added custom fields option"/>
<Changelog node="n8n-nodes-base.spotify" title="Spotify:" text="Added My Data resource"/>

### Core Functionality ⚙️
- Fixed issues with NodeViewNew navigation handling
- Fixed an issue with the view crashing with large requests

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.awsTranscribe" title="ASW Transcribe:" text="Fixed issues with options"/>

### Contributors 🙌

[Rodrigo Correia](https://github.com/rodrigoscdc), [Sam Roquitte](https://github.com/samr28)

## n8n@0.122.3
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.2...n8n@0.122.3) for this version.<br />
**Release date:** 2021-06-04

### Core Functionality ⚙️
- Fixed error messages for the Textarea field
- Added the missing winston dependency
- Fixed an issue with adding values via the Variable selector. The deleted values don't reappear
- Fixed an issue with the Error Workflows not getting executed in the queue mode

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.notion" title="Notion:" text="Fixed an issue with parsing the last edited time"/>

## n8n@0.122.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.1...n8n@0.122.2) for this version.<br />
**Release date:** 2021-05-31

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.function" title="Function:" text="Added console.log support for writing to browser console"/>
<Changelog node="n8n-nodes-base.functionItem" title="Function Item:" text="Added console.log support for writing to browser console"/>

### Core Functionality ⚙️
- Fixed an issue that enables clicks on tags
- Fixed an issue with escaping workflow name
- Fixed an issue with selecting variables in the Expression Editor

## n8n@0.122.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.0...n8n@0.122.1) for this version.<br />
**Release date:** 2021-05-30

### Core Functionality ⚙️
- Fixed an issue with the order in migration rollback

## n8n@0.122.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.121.0...n8n@0.122.0) for this version.<br />
**Release date:** 2021-05-30

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.awsTranscribe" title="AWS Transcribe" />
<Changelog node="n8n-nodes-base.ssh" title="SSH" />
<Changelog node="n8n-nodes-base.uptimeRobot" title="UptimeRobot" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.deepL" title="DeepL:" text="Added support for Free API"/>
<Changelog node="n8n-nodes-base.function" title="Function:" text="Added the functionality to log console.log messages to the browser console"/>
<Changelog node="n8n-nodes-base.functionItem" title="Function Item:" text="Added the functionality to log console.log messages to the browser console"/>

### Core Functionality ⚙️
- Changed `bcrypt` library from `@node-rs/bcrypt` to `bcryptjs`
- Fixed an issue with optional parameters that have the same name
- Added the functionality to tag workflows
- Fixed errors in the Expression Editor
- Fixed an issue with nodes that only get connected to the second input. This solves the issue of copying and pasting the workflows where only one output of the IF node gets connected to a node

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.googleDrive" title="Google Drive:" text="Fixed an issue with the Drive resource"/>
<Changelog node="n8n-nodes-base.notion" title="Notion:" text="Fixed an issue with the filtering fields type and fixed an issue with the link option"/>
<Changelog node="n8n-nodes-base.switch" title="Switch:" text="Fixed an issue with the Expression mode"/>

### Contributors 🙌

[Alexander Mustafin](https://github.com/sashker)

## n8n@0.121.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.121.0...n8n@0.121.1) for this version.<br />
**Release date:** 2021-06-01

### Core Functionality ⚙️
- Fixed an issue with copying the output values
- Fixed issues with the Expression Editor
- Made improvements to the Expression Editor

## n8n@0.121.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.120.0...n8n@0.121.0) for this version.<br />
**Release date:** 2021-05-20

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.notion" title="Notion" />
<Changelog node="n8n-nodes-base.notionTrigger" title="Notion Trigger" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.graphql" title="GraphQL:" text="Added Header Auth authentication method"/>
<Changelog node="n8n-nodes-base.twilio" title="Twilio:" text="Added API Key authentication method"/>

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.hubspot" title="HubSpot:" text="Fixed an issue with pagination for Deals resource"/>
<Changelog node="n8n-nodes-base.keap" title="Keap:" text="Fixed an issue with the data type of the Order Title field"/>
<Changelog node="n8n-nodes-base.orbit" title="Orbit:" text="Fixed an issue with the activity type in Post operation"/>
<Changelog node="n8n-nodes-base.slack" title="Slack:" text="Fixed an issue with the Get Profile operation"/>
<Changelog node="n8n-nodes-base.strava" title="Strava:" text="Fixed an issue with the paging parameter"/>

### Contributors 🙌

[Jacob Spizziri](https://github.com/jspizziri)

## n8n@0.120.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.119.0...n8n@0.120.0) for this version.<br />
**Release date:** 2021-05-17

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.iCal" title="iCalendar" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.googleFirebaseCloudFirestore" title="Google Cloud Firestore:" text="Added the functionality for GeoPoint parsing and added ISO-8601 format for date validation"/>
<Changelog node="n8n-nodes-base.emailReadImap" title="IMAP Email:" text="Added the Force reconnect option"/>
<Changelog node="n8n-nodes-base.paddle" title="Paddle:" text="Added the Use Sandbox environment API parameter"/>
<Changelog node="n8n-nodes-base.spotify" title="Spotify:" text="Added the Position parameter to the Add operation of the Playlist resource"/>
<Changelog node="n8n-nodes-base.wooCommerce" title="WooCommerce:" text="Added the Include Credentials in Query parameter"/>

### Core Functionality ⚙️
- Added await to hooks to fix issues with the `Unknown` status of the workflows
- Changed the data type of the `credentials_entity` field for MySQL database to fix issues with long credentials
- Fixed an issue with the ordering of the executions when the list is auto-refreshed
- Added the functionality that allows reading sibling parameters

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.clockifyTrigger" title="Clockify Trigger:" text="Fixed an issue that occurred when the node returned an empty array"/>
<Changelog node="n8n-nodes-base.googleFirebaseCloudFirestore" title="Google Cloud Firestore:" text="Fixed an issue with parsing empty document, and an issue with the detection of date"/>
<Changelog node="n8n-nodes-base.hubspot" title="HubSpot:" text="Fixed an issue with the Return All option"/>

### Contributors 🙌

[DeskYT](https://github.com/DeskYT), [Daniel Lazaro](https://github.com/1izardo), [DerEnderKeks](https://github.com/DerEnderKeks), [mdasmendel](https://github.com/mdasmendel)

## n8n@0.119.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.118.1...n8n@0.119.0) for this version.<br />
**Release date:** 2021-05-09

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.awsComprehend" title="AWS Comprehend:" text="Added the Detect Entities operation"/>
<Changelog node="n8n-nodes-base.awsLambda" title="AWS Lambda:" text="Added the ability to list functions recursively if the number of functions exceeds 50"/>
<Changelog node="n8n-nodes-base.googleAnalytics" title="Google Analytics:" text="Added pagination to the Report resource"/>
<Changelog node="n8n-nodes-base.mailjet" title="Mailjet:" text="Added Reply To parameter"/>
<Changelog node="n8n-nodes-base.redis" title="Redis:" text="Added the Increment operation"/>
<Changelog node="n8n-nodes-base.spreadsheetFile" title="Spreadsheet File:" text="Added the Header Row option"/>
<Changelog node="n8n-nodes-base.webflowTrigger" title="Webflow Trigger:" text="Added Collection Item Created, Collection Item Updated, and Collection Item Deleted events"/>

### Core Functionality ⚙️
- Implemented timeout for subworkflows
- Removed the deregistration webhooks functionality from the webhook process

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.googleFirebaseCloudFirestore" title="Google Cloud Firestore:" text="Fixed an issue with parsing null value"/>
<Changelog node="n8n-nodes-base.googleSheets" title="Google Sheets:" text="Fixed an issue with the Key Row parameter"/>
<Changelog node="n8n-nodes-base.zohoCrm" title="HubSpot:" text="Fixed an issue with the authentication"/>

### Contributors 🙌

[Nikita](https://github.com/Rirush)


## n8n@0.118.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.118.0...n8n@0.118.1) for this version.<br />
**Release date:** 2021-05-05

### Core Functionality ⚙️

- Fixed an issue with error workflows

## n8n@0.118.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.117.0...n8n@0.118.0) for this version.<br />
**Release date:** 2021-05-02

::: warning ⚠️ Breaking change
Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01180).
The features that introduced the breaking changes have been flagged below.
:::

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.kitemaker" title="Kitemaker" />
<Changelog node="n8n-nodes-base.mqtt" title="MQTT" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.crateDb" title="CrateDB:" text="Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results." breakingChanges=true breakingChangeVersion="01180"/>
<Changelog node="n8n-nodes-base.erpNext" title="ERPNext:" text="Added support for self-hosted ERPNext instances"/>
<Changelog node="n8n-nodes-base.ftp" title="FTP:" text="Added the functionality to delete folders"/>
<Changelog node="n8n-nodes-base.googleCalendar" title="Google Calendar:" text="Added the Continue on Fail functionality"/>
<Changelog node="n8n-nodes-base.googleDrive" title="Google Drive:" text="Added the functionality to add file name when downloading files"/>
<Changelog node="n8n-nodes-base.gmail" title="Gmail:" text="Added functionality to handle multiple binary properties"/>
<Changelog node="n8n-nodes-base.microsoftOutlook" title="Microsoft Outlook:" text="Added Is Read and Move option to the Message resource"/>
<Changelog node="n8n-nodes-base.postgres" title="Postgres:" text="Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results." breakingChanges=true breakingChangeVersion="01180"/>
<Changelog node="n8n-nodes-base.questDb" title="QuestDB:" text="Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results." breakingChanges=true breakingChangeVersion="01180"/>
<Changelog node="n8n-nodes-base.quickbase" title="QuickBase:" text="Added option to use Field IDs"/>
<Changelog node="n8n-nodes-base.timescaleDb" title="TimescaleDB:" text="Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results." breakingChanges=true breakingChangeVersion="01180"/>
<Changelog node="n8n-nodes-base.twist" title="Twist:" text="Added Get, Get All, Delete, and Update operations to the Message Conversation resource. Added Archive, Unarchive, and Delete operations to the Channel resource. Added Thread and Comment resource"/>

### Core Functionality ⚙️
- Implemented the native `fs/promise` library where possible
- Added the functionality to output logs to the console or a file
- We have updated the minimum required version for Node.js to v14.15. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01180) page

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.getResponseTrigger" title="GetResponse Trigger:" text="Fixed an issue with error handling"/>
<Changelog node="n8n-nodes-base.githubTrigger" title="GitHub Trigger:" text="Fixed an issue with error handling"/>
<Changelog node="n8n-nodes-base.gitlabTrigger" title="GitLab Trigger:" text="Fixed an issue with error handling"/>
<Changelog node="n8n-nodes-base.googleSheets" title="Google Sheets:" text="Fixed an issue with the Lookup operation for returning empty rows"/>
<Changelog node="n8n-nodes-base.orbit" title="Orbit:" text="Fixed issues with the Post resource"/>
<Changelog node="n8n-nodes-base.redis" title="Redis:" text="Fixed an issue with the node not returning an error"/>
<Changelog node="n8n-nodes-base.xero" title="Xero:" text="Fixed an issue with the Create operation for the Contact resource"/>

### Contributors 🙌

[Gustavo Arjones](https://github.com/arjones), [lublak](https://github.com/lublak), [Colton Anglin](https://github.com/Colton), [Mika Luhta](https://github.com/mluhta)


## n8n@0.117.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.116.1...n8n@0.117.0) for this version.<br />
**Release date:** 2021-04-24

::: warning ⚠️ Breaking change
Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170).
The features that introduced the breaking changes have been flagged below.
:::

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.mailcheck" title="Mailcheck" />
<Changelog node="n8n-nodes-base.n8nTrigger" title="n8n Trigger" />
<Changelog node="n8n-nodes-base.workflowTrigger" title="Workflow Trigger" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.crateDb" title="CrateDB:" text="Added the Mode option that allows you to execute queries as transactions"/>
<Changelog node="n8n-nodes-base.nextcloud" title="Nextcloud:" text="Added Delete, Get, Get All, and Update operation to the User resource"/>
<Changelog node="n8n-nodes-base.postgres" title="Postgres:" text="Added the Mode option that allows you to execute queries as transactions"/>
<Changelog node="n8n-nodes-base.questDb" title="QuestDB:" text="Added the Mode option that allows you to execute queries as transactions"/>
<Changelog node="n8n-nodes-base.salesforce" title="Salesforce:" text="Added Owner option to the Case and Lead resources. Added custom fields to Create and Update operations of the Case resource"/>
<Changelog node="n8n-nodes-base.sentryIo" title="Sentry.io:" text="Added Delete and Update operations to Project, Release, and Team resources"/>
<Changelog node="n8n-nodes-base.timescaleDb" title="TimescaleDB:" text="Added the Mode option that allows you to execute queries as transactions"/>
<Changelog node="n8n-nodes-base.zendeskTrigger" title="Zendesk Trigger:" text="Added support to retrieve custom fields"/>

### Core Functionality ⚙️
- The Activation Trigger node has been deprecated. It has been replaced by two new nodes - the n8n Trigger and the Workflow Trigger node. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page
- Added the functionality to open the New Credentials dropdown by default

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.googleSheets" title="Google Sheets:" text="Fixed an issue with the Lookup operation for returning multiple empty rows"/>
<Changelog node="n8n-nodes-base.intercom" title="Intercom:" text="Fixed an issue with the User operation in the Company resource"/>
<Changelog node="n8n-nodes-base.mautic" title="Mautic:" text="Fixed an issue with sending the lastActive parameter"/>

### Contributors 🙌

[Bart Vollebregt](https://github.com/bartvollebregt), [Ivan Timoshenko](https://github.com/bugagashenkj), [Konstantin Nosov](https://github.com/nosovk), [lublak](https://github.com/lublak), [Umair Kamran](https://github.com/UmairKamran),

## n8n@0.116.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.116.0...n8n@0.116.1) for this version.<br />
**Release date:** 2021-04-20

### Core Functionality ⚙️
- Fixed a timeout issue with the workflows in the main process

## n8n@0.116.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.115.0...n8n@0.116.0) for this version.<br />
**Release date:** 2021-04-17

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.googleBigQuery" title="Google BigQuery" />
<Changelog node="n8n-nodes-base.webflow" title="Webflow" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.dateTime" title="Date & Time:" text="Added Calculate a Date action that allows you to add or subtract time from a date"/>
<Changelog node="n8n-nodes-base.gitlab" title="GitLab:" text="Added Get, Get All, Update, and Delete operations to the Release resource"/>
<Changelog node="n8n-nodes-base.microsoftOneDrive" title="Microsoft OneDrive:" text="Added Delete operation to the Folder resource"/>
<Changelog node="n8n-nodes-base.mondayCom" title="Monday:" text="Added support for OAuth2 authentication"/>
<Changelog node="n8n-nodes-base.mongoDb" title="MongoDB:" text="Added Limit, Skip, and Sort options to the Find operation and added Upsert parameter to the Update operation. Added the functionality to close the connection after use"/>
<Changelog node="n8n-nodes-base.mySql" title="MySQL:" text="Added support for insert modifiers and added support for SSL"/>
<Changelog node="n8n-nodes-base.rabbitmq" title="RabbitMQ:" text="Added the functionality to close the connection after use and added support for AMPQS"/>

### Core Functionality ⚙️

- Changed `bcrypt` library from `bcryptjs` to `@node-rs/bcrypt`
- Improved node error handling. Status codes and error messages in API responses have been standardized
- Added global timeout setting for all HTTP requests (except HTTP Request node)
- Implemented timeout for workers and corrected timeout for sub workflows

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.awsSqs" title="AWS SQS:" text="Fixed an issue with API version and casing"/>
<Changelog node="n8n-nodes-base.emailReadImap" title="IMAP:" text="Fixed re-connection issue"/>
<Changelog node="n8n-nodes-base.keap" title="Keap:" text="Fixed an issue with the Opt In Reason parameter"/>
<Changelog node="n8n-nodes-base.salesforce" title="Salesforce:" text="Fixed an issue with loading custom fields"/>

### Contributors 🙌

[Allan Daemon](https://github.com/AllanDaemon), [Anton Romanov](https://github.com/theone74), [Bart Vollebregt](https://github.com/bartvollebregt), [Cassiano Vailati](https://github.com/cassvail), [entrailz](https://github.com/entrailz), [Konstantin Nosov](https://github.com/nosovk), [LongYinan](https://github.com/Brooooooklyn)

## n8n@0.115.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.114.0...n8n@0.115.0) for this version.<br />
**Release date:** 2021-04-10

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.googleSlides" title="Google Slides" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.github" title="GitHub:" text="Added Release resource"/>
<Changelog node="n8n-nodes-base.theHive" title="TheHive:" text="Added support to fetch observable data types"/>
<Changelog node="n8n-nodes-base.rabbitmq" title="RabbitMQ:" text="Added header parameters"/>

### Core Functionality ⚙️

- Fixed an issue with expressions not being displayed in read-only mode
- Fixed an issue that didn't allow editing JavaScript code in read-only mode
- Added support for configuring the maximum payload size
- Added support to dynamically add menu items

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.jira" title="Jira:" text="Fixed an issue with loading issue types with classic project type"/>
<Changelog node="n8n-nodes-base.rabbitmqTrigger" title="RabbitMQ Trigger:" text="Fixed an issue with the node reusing the same item"/>
<Changelog node="n8n-nodes-base.sendGrid" title="SendGrid:" text="Fixed an issue with the dynamic field generation"/>

### Contributors 🙌

[Mika Luhta](https://github.com/mluhta), [Loran](https://github.com/loranmutafov), [stwonary](https://github.com/stwonary)

## n8n@0.114.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.113.0...n8n@0.114.0) for this version.<br />
**Release date:** 2021-04-03

### New nodes ✨
<br />
<Changelog node="n8n-nodes-base.awsSqs" title="AWS SQS" />
<Changelog node="n8n-nodes-base.copper" title="Copper" />
<Changelog node="n8n-nodes-base.erpNext" title="ERPNext" />
<Changelog node="n8n-nodes-base.oura" title="Oura" />

### Enhanced nodes 🚀
<br />
<Changelog node="n8n-nodes-base.googleDrive" title="Google Drive:" text="Added support for creating folders for shared drives"/>
<Changelog node="n8n-nodes-base.googleSheet" title="Google Sheets:" text="Added Create and Remove operation to the Sheet resource"/>
<Changelog node="n8n-nodes-base.harvest" title="Harvest:" text="Added Update operation to the Task resource"/>
<Changelog node="n8n-nodes-base.jira" title="Jira:" text="Added Reporter field to the Issue resource"/>
<Changelog node="n8n-nodes-base.postgres" title="Postgres:" text="Added support for type casting"/>

### Core Functionality ⚙️

- Fixed an issue with the Redis connection to prevent memory leaks

### Bug fixes 🐛
<br />
<Changelog node="n8n-nodes-base.bitwarden" title="Bitwarden:" text="Fixed an issue with the Update operation of the Group resource"/>
<Changelog node="n8n-nodes-base.cortex" title="Cortex:" text="Fixed an issue where only the last item got returned"/>
<Changelog node="n8n-nodes-base.invoiceNinja" title="Invoice Ninja:" text="Fixed an issue with the Project parameter"/>
<Changelog node="n8n-nodes-base.salesforce" title="Salesforce:" text="Fixed an issue with the Get All operation of the Custom Object resource"/>

### Contributors 🙌

[Agata M](https://github.com/curryy), [Allan Daemon](https://github.com/AllanDaemon), [Craig McElroy](https://github.com/camcelroy), [mjysci](https://github.com/mjysci)

## n8n@0.113.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.112.0...n8n@0.113.0) for this version.<br />
**Release date:** 2021-03-26

- New nodes
	- Activation Trigger
	- Plivo
- Enhanced nodes
	- ClickUp: Added Space Tag, Task List, and Task Tag resource
	- GitHub: Added pagination to Get Issues and Get Repositories operations
	- Mattermost: Added Reaction resource and Post Ephemeral operation
	- Move Binary Data: Added Encoding and Add BOM option to JSON to Binary mode and Strip BOM to Binary to JSON mode
	- SendGrid: Added Mail resource
	- Spotify: Added Library resource
	- Telegram: Added Answer Inline Query operation to the Callback resource
	- uProc: Added Get ASIN code by EAN code, Get EAN code by ASIN code, Get Email by Social Profile, Get Email by Fullname and Company's domain, and Get Email by Fullname and Company's name operations
- Bug fixes
	- Clearbit: Fixed an issue with the autocomplete URI
	- Dropbox: Fixed an issue with the Dropbox credentials by adding the APP Access Type parameter in the credentials. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01130) page
	- Spotify: Fixed an issue with the Delete operation of the Playlist resource
- The variable selector now displays empty arrays
- Fixed a permission issue with the Raspberry Pi Docker image

## n8n@0.112.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.111.0...n8n@0.112.0) for this version.<br />
**Release date:** 2021-03-19

- New nodes
	- DeepL
- Enhanced nodes
	- TheHive: Added Mark as Read and Mark as Unread operations and added Ignore SSL Issues parameter to the credentials
- Bug fixes
	- AWS SES: Fixed an issue to map CC addresses correctly
	- Salesforce: Fixed an issue with custom object for Get All operations and fixed an issue with the first name field for the Create and Update operations for the Lead resource
	- Strava: Fixed an issue with the access tokens not getting refreshed
	- TheHive: Fixed an issue with the case resolution status
- Fixed an issue with importing separate decrypted credentials
- Fixed issues with the sub-workflows not finishing
- Fixed an issue with the sub-workflows running on the main process
- Fixed concurrency issues with sub-workflows

## n8n@0.111.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.110.3...n8n@0.111.0) for this version.<br />
**Release date:** 2021-03-12

- New nodes
	- Autopilot
	- Autopilot Trigger
	- Wise
	- Wise Trigger
- Enhanced nodes
	- Box: Added Get operation to the Folder resource
	- Dropbox: Added Search operation to the File resource. All operations are now performed relative to the user's root directory. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01110) page
	- Facebook Graph API: Added new API versions
	- Google Drive: Added Update operation to the File resource
	- HubSpot: Added the Deal Description option
	- Kafka: Added the SASL mechanism
	- Monday.com: Added Move operation to Board Item resource
	- MongoDB: Added Date field to the Insert and Update operations
	- Micrsoft SQL: Added connection timeout parameter to credentials
	- Salesforce: Added Mobile Phone field to the Lead resource
	- Spotify: Added Create a Playlist operation to Playlist resource and Get New Releases to the Album resource
- Bug fixes
	- Airtable: Fixed a bug with updating and deleting records
- Added the functionality to expose metrics to Prometheus. Read more about that [here](configuration.md#prometheus)
- Updated fallback values to match the value type
- Added the functionality to display debugging information for pending workflows on exit
- Fixed an issue with queue mode for the executions that should not be saved
- Fixed an issue with workflows crashing and displaying `Unknown` status in the execution list
- Fixed an issue to prevent crashing while saving execution data when the `data` field has over 64KB in MySQL
- Updated `jws-rsa` to version `1.12.1`

## n8n@0.110.3
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.110.0...n8n@0.110.3) for this version.<br />
**Release date:** 2021-03-04

- Bug fixes
	- APITemplate.io: Fixed an issue with the naming of the node

## n8n@0.110.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.109.0...n8n@0.110.0) for this version.<br />
**Release date:** 2021-03-04

- New nodes
	- APITemplate.io
	- Bubble
	- Lemlist
	- Lemlist Trigger
- Enhanced nodes
	- Microsoft Teams: Added option to reply to a message
- Bug fixes
	- Dropbox: Fixed an issue with parsing the response with the Upload operation
	- Gmail: Fixed an issue with the scope for the Service Account authentication method and fixed an issue with the label filter
	- Google Drive: Fixed an issue with the missing Parent ID field for the Create operation and fixed an issue with the Permissions field
	- HelpScout: Fixed an issue with sending tags when creating a conversation
	- HTTP Request: Fixed an issue with the raw data and file response
	- HubSpot: Fixed an issue with the OAuth2 credentials
- Added support for Date & Time in the IF node and the Switch node
- Fixed an issue with mouse selection when zooming in or out
- Fixed an issue with current executing workflows when using queues for Postgres
- Fixed naming and description for the `N8N_SKIP_WEBHOOK_DEREGISTRATION_SHUTDOWN` environment variable
- Fixed an issue with auto-refresh of the execution list

## n8n@0.109.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.108.0...n8n@0.109.0) for this version.<br />
**Release date:** 2021-02-22

- New nodes
	- Bitwarden
	- Emelia
	- Emelia Trigger
	- GoToWebinar
	- Raindrop
- Enhanced nodes
	- AWS Rekognition: Added the Detect Text type to the Ananlyze operation for the Image resource
	- Google Calendar: Added RRULE parameter to the Get All operation for the Event resource
	- Jira: Added User resource and operations
	- Reddit: Added the Search operation for the Post resource
	- Telegram: Added the Send Location operation
- Bug fixes
	- RocketChat: Fixed error responses
- Fixed the issue which caused the execution history of subworkflows (workflows started via the Execute Workflow node) not to be saved
- Added an option to export the credential data in plain text format using the CLI

## n8n@0.108.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.107.0...n8n@0.108.0) for this version.<br />
**Release date:** 2021-02-15

- New nodes
	- Demio
	- PostHog
	- QuickBooks
- Enhanced nodes
	- Trello: Added Create Checklist Item operation to the Checklist resource
	- Webhook: Removed trailing slash in routes and updated logic to select dynamic webhook
- Bug fixes
	- Google Drive: Fixed an issue with returning the fields the user selects for the Folder and File resources
	- Twitter: Fixed a typo in the description
	- Webhook: Fixed logic for static route matching
- Added the functionality to sort the values that you add in the IF node, Rename node, and the Set node
- Added the functionality to optionally save execution data after each node
- Added queue mode to scale workflow execution
- Separated webhook from the core to scale webhook separately
- Fixed an issue with current execution query for unsaved running workflows
- Fixed an issue with the regex that detected node names
- n8n now generates a unified execution ID instead of two separate IDs for currently running and saved executions

## n8n@0.107.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.106.0...n8n@0.107.0) for this version.<br />
**Release date:** 2021-02-08

- New nodes
	- AWS Comprehend
	- GetResponse Trigger
	- Peekalink
	- Stackby
- Enhanced nodes
	- AWS SES: Added Custom Verification Email resource
	- Microsoft Teams: Added Task resource
	- Twitter: Added Delete operation to the Tweet resource
- Bug fixes
	- Google Drive: Fixed an issue with the Delete and Share operations
	- Filemaker: Fixed an issue with the script list parsing
- Updated Node.js version of Docker images to `14.15`
- Added a shortcut `CTRL + scroll` to zoom

## n8n@0.106.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.105.0...n8n@0.106.0) for this version.<br />
**Release date:** 2021-02-05

- New nodes
	- Reddit
	- Tapfiliate
- Enhanced nodes
	- Airtable Trigger: Added Download Attachment option
	- HubSpot: Added Custom Properties option to the Create and Update operations of the Company resource
	- MySQL: Added Connection Timeout parameter to the credentials
	- Telegram: Added Pin Chat Message and Unpin Chat Message operations for the Message resource
- Bug fixes
	- Typeform: Fixed an issue with the OAuth2 authentication method
- Added support for `s` and `u` flags for regex in the IF node and the Switch node

## n8n@0.105.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.104.2...n8n@0.105.0) for this version.<br />
**Release date:** 2021-02-01

- New nodes
	- Discourse
	- SecurityScorecard
	- TimescaleDB
- Enhanced nodes
	- Affinity: Added List and List Entry resource
	- Asana: Added Project IDs option to the Create operation of the Task resource
	- Hubspot Trigger: Added support for multiple subscriptions
	- Jira: Added Issue Attachment resource and added custom fields to Create and Update operations of the Issue resource
	- Todoist: Added Section option
- Bug fixes
	- SIGNL4: Fixed an issue with the attachment functionality
- Added variable `$mode` to check the mode in which the workflow is being executed


## n8n@0.104.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.104.1...n8n@0.104.2) for this version.<br />
**Release date:** 2021-01-27

- Fixed an issue with the credentials parameters that have the same name

## n8n@0.104.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.104.0...n8n@0.104.1) for this version.<br />
**Release date:** 2021-01-26

- Fixed a bug with expressions in credentials

## n8n@0.104.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.103.1...n8n@0.104.0) for this version.<br />
**Release date:** 2021-01-26

- New nodes
	- Compression
- Enhanced nodes
	- GitHub: Added Invite operation to the User resource
	- EmailReadImap: Increased the authentication timeout
	- Mautic: Added Custom Fields option to the Create and Update operations of the Contact resource. Also, the Mautic OAuth credentials have been updated. Now you don't have to enter the Authorization URL and the Access Token URL
	- Nextcloud: Added User resource
	- Slack: Added Get Permalink and Delete operations to the Message resource
	- Webhook: Added support for request parameters in webhook paths
- Bug fixes
	- Google Drive: Fixed the default value for the Send Notification Email option
- Added support for expressions to credentials
- Removed support for MongoDB as a database for n8n. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01040) page

## n8n@0.103.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.103.0...n8n@0.103.1) for this version.<br />
**Release date:** 2021-01-21

- Bug fixes
	- Trello: Fixed the icon

## n8n@0.103.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.102.0...n8n@0.103.0) for this version.<br />
**Release date:** 2021-01-21

- New nodes
	- SendGrid
- Enhanced nodes
	- AMQP: Added Container ID, Reconnect, and Reconnect limit options
	- AMQP Trigger: Added Container ID, Reconnect, and Reconnect Limit options
	- GitHub: Added Review resource
	- Google Drive: Added Drive resource
	- Trello: Added Get All and Get Cards operation to the List resource
- Bug fixes
	- AWS Lambda: Fixed an issue with signature
	- AWS SNS: Fixed an issue with signature
- Fixed an issue with nodes not executing if two input gets passed and one of them didn't return any data
- The code editor does not get closed when clicked anywhere outside the editor
- Added CLI commands to [export](start-workflows-via-cli.md#export-workflows-and-credentials) and [import](start-workflows-via-cli.md#import-workflows-and-credentials) credentials and workflows
- The title in the browser tab now resets for new workflows


## n8n@0.102.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.101.0...n8n@0.102.0) for this version.<br />
**Release date:** 2021-01-15

- New nodes
	- Beeminder
- Enhanced nodes
	- Crypto: Added hash type `SHA384`
	- Google Books: Added support for user impersonification
	- Google Drive: Added support for user impersonification
	- Google Sheets: Added support for user impersonification
	- Gmail: Added support for user impersonification
	- Microsoft Outlook: Added support for a shared mailbox
	- RabbitMQ: Added Exchange mode
	- Salesforce: Added filters to all Get All operations
	- Slack: Made changes to the properties `As User` and `Ephemeral`. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01020) page
	- Typeform Trigger: The node now displays the recall information in the question in square brackets. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01020) page
	- Zendesk: Removed the `Authorization URL` and `Access Token URL` fields from the OAuth2 credentials. The node now uses the subdomain passed by a user to connect to Zendesk.
- Bug fixes
	- CoinGecko: Fixed an issue to process multiple input items correctly

## n8n@0.101.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.100.0...n8n@0.101.0) for this version.<br />
**Release date:** 2021-01-07

- New nodes
	- Google Analytics
	- Phantombuster
- Enhanced nodes
	- AWS: Added support for custom endpoints
	- Gmail: Added an option to send messages formatted as HTML
	- Philips Hue: Added Room/Group name to Light name to make it easier to identify lights
	- Slack: Added ephemeral message option
	- Telegram: Removed the Bot resource as the endpoint is no longer supported
- Bug fixes
	- E-goi: Fixed the name of the node
	- Edit Image: Fixed an issue with the Border operation
	- HTTP Request: Fixed batch sizing to work when `batchSize = 1`
	- PayPal: Fixed a typo in the Environment field
	- Split In Batches: Fixed a typo in the description
	- Telegram: Fixed an issue with the Send Audio operation
- Based on your settings, vacuum runs on SQLite on startup
- Updated axios to version `0.21.1`

## n8n@0.100.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.99.1...n8n@0.100.0) for this version.<br />
**Release date:** 2020-12-30

- New nodes
	- Microsoft Outlook
- Enhanced nodes
	- ActiveCampaign: The node loads more options for the fields
	- Asana: Added Subtask resource and Get All operation for the Task resource
	- Edit Image: Added Multi Step operation
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

## n8n@0.99.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.99.0...n8n@0.99.1) for this version.<br />
**Release date:** 2020-12-24

- Fixed a bug that caused HTML to render in JSON view

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

## n8n@0.95.0 🛠
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
	- Harvest: Moved the account field from the credentials to the node parameters. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0950) page
- Bug Fixes
	- Slack: Fixed an issue with creating channels and inviting users to a channel

## n8n@0.94.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.94.0...n8n@0.94.1) for this version.<br />
**Release date:** 2020-11-20

- Bug Fixes
	- GraphQL: Fixed an issue with the variables
	- WooCommerce Trigger: Fixed an issue with the webhook. The node now reuses a webhook if it already exists.

## n8n@0.94.0 🛠
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

## n8n@0.93.0 🛠
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
- Improved support for touch devices
- Node properties now load on demand
- Updated the Node.js version for the Docker images


## n8n@0.90.0 🛠
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.89.2...n8n@0.90.0) for this version.<br />
**Release date:** 2020-10-23

- Added a check for the Node.js version on startup. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0900) page
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

## n8n@0.87.0 🛠
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

## n8n@0.83.0 🛠
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

## n8n@0.79.0 🛠
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
