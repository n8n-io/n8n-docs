# Release notes

## n8n@0.172.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.171.1...n8n@0.172.0) for this version.<br />
**Release date:** 2022-04-11

### Enhancements

* Changes to the data output display in nodes. 

### Node enhancements
<br>
[Magento 2 Node:](/workflow/integrations/nodes/n8n-nodes-base.magento2/) text="Added credential tests.
[PayPal Node:](/workflow/integrations/nodes/n8n-nodes-base.payPal/) Added credential tests and updated the API URL.

### Bug fixes

**core**: Luxon now applies the correct timezone. Refer to [Luxon](/code-examples/expressions/luxon/) for more information.<br>
**core**: fixed an issue with localization that was preventing i18n files from loading.<br>
[Action Network Node:](/workflow/integrations/nodes/n8n-nodes-base.actionNetwork/) Fix a pagination issue and add credentials test.

### Contributors

[Paolo Rechia](https://github.com/paolo-rechia)  

## n8n@0.171.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.171.0...n8n@0.171.1) for this version.<br />
**Release date:** 2022-04-06

This is a small bug fix release.

### Bug fixes

* **core**: fix issue with current executions not displaying.<br>
* **core**: fix an issue causing Doc² to falsely skip some authentication.<br>
* [WooCommerce Node:](/workflow/integrations/nodes/n8n-nodes-base.wooCommerce) Fix a pagination issue with the GetAll operation.

## n8n@0.171.0 

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.170.0...n8n@0.171.0) for this version.<br />
**Release date:** 2022-04-03

!!! warning "Breaking changes"
    Please note that this version contains breaking changes. You can read more about them [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01710).


This release focuses on bug fixes and node enhancements, with one new feature, and one breaking change to the GraphQL node.

### Breaking change to GraphQL node

The GraphQL node now errors when the response includes an error. If you use this node, you can choose to:

* Do nothing: a GraphQL response containing an error will now cause the workflow to fail.
* Update your GraphQL node settings: set **Continue on Fail** to true to allow the workflow to continue even when the GraphQL response contains an error.

### New features

You can now download binary data from individual nodes in your workflow.

### Enhanced nodes

* [Emelia Node:](/workflow/integrations/nodes/n8n-nodes-base.emelia/) Add Campaign > Duplicate functionality.
* [FTP Node:](/workflow/integrations/core-nodes/n8n-nodes-base.ftp/) Add option to recursively create directories on rename.
* [Mautic Node:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Add credential test and allow trailing slash in host.
* [Microsoft Teams Node:](/workflow/integrations/nodes/n8n-nodes-base.microsoftteams/) Add chat message support.
* [Mocean Node:](/workflow/integrations/nodes/n8n-nodes-base.mocean/) Add 'Delivery Report URL' option and credential tests.
* [ServiceNow Node:](/workflow/integrations/nodes/n8n-nodes-base.serviceNow/) Add basicAuth support and fix getColumns loadOptions.
* [Strava Node:](/workflow/integrations/nodes/n8n-nodes-base.strava/) Add 'Get Streams' operation.


### Bug fixes

* **core:** Fix crash on webhook when last node did not return data
* [EmailReadImap Node:](/workflow/integrations/core-nodes/n8n-nodes-base.imapEmail/) Fix issue that crashed process if node was configured wrong.
* [Google Tasks Node:](/workflow/integrations/nodes/n8n-nodes-base.googleTasks/) Fix 'Show Completed' option and hide title field where not needed.
* [NocoDB Node:](/workflow/integrations/nodes/n8n-nodes-base.nocoDb/) Fix pagination.
* [Salesforce Node:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fix issue that 'status' did not get used for Case => Create & Update

### Contributors

* [Charles Lecalier](https://github.com/chlec)
* [d3no](https://github.com/d3no)
* [Ketan Somvanshi](https://github.com/KetanSomvanshi)
* [Luis Cipriani](https://github.com/lfcipriani)
* [pemontto](https://github.com/pemontto)
* [Rhys Williams](https://github.com/rhyswilliamsza)

## n8n@0.170.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.169.0...n8n@0.170.0) for this version.<br />
**Release date:** 2022-03-27

This release focuses on bug fixes and adding functionality to existing nodes.

### Enhanced nodes

* [Crypto Node:](/workflow/integrations/core-nodes/n8n-nodes-base.crypto/) Add Generate operation to generate random values.
* [HTTP Request Node:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Add support for OPTIONS method.
* [Jira Node:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Add Simplify Output option to Issue > Get.
* [Reddit Node:](/workflow/integrations/nodes/n8n-nodes-base.reddit/) Add possibility to query saved posts.
* [Zendesk Node:](/workflow/integrations/nodes/n8n-nodes-base.zendesk/) Add ticket status On-hold.

### Bug fixes

* **core:** Add logs and error catches for possible failures in queue mode.<br>
* [AWS Lambda Node:](/workflow/integrations/nodes/n8n-nodes-base.awslambda/) Fix Invocation Type > Continue Workflow.
* [Supabase Node:](/workflow/integrations/nodes/n8n-nodes-base.supabase/) Send token also via Authorization Bearer; fix Row > Get operation.
* [Xero Node:](/workflow/integrations/nodes/n8n-nodes-base.xero/) Fix some operations and add support for setting address and phone number.
* [Wise Node:](/workflow/integrations/nodes/n8n-nodes-base.wise/) Fix issue when executing a transfer.

### Contributors

* [FFTDB](https://github.com/FFTDB)
* [Fred](https://github.com/choudat)
* [Jasper Zonneveld](https://github.com/JaZo)
* [pemontto](https://github.com/pemontto)
* [Sergio](https://github.com/mcmx)
* [TheFSilver](https://github.com/TheFSilver)
* [Valentin Mocanu](https://github.com/rontav)
* [Yassine Fathi](https://github.com/m4tt72)



## n8n@0.169.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.168.2...n8n@0.169.0) for this version.<br />
**Release date:** 2022-03-20

This release includes:

* New functionality for existing nodes
* A new node for Linear
* Bug fixes
* And a license change!

### New license

This release changes n8n's license, from [Apache 2.0 with Commons Clause](https://github.com/n8n-io/n8n/blob/181ba3c4e236279b65d102a8a33ae6896f160487/LICENSE.md) to [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md).

This change aims to clarify our license terms, and our position as a fair-code project.

Read more about the new license in [License](/reference/license/).

### New nodes

* [Linear Node:](/workflow/integrations/nodes/n8n-nodes-base.linear/) Add Linear Node.

### Enhanced nodes

* [HTTP Request Node:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Allow Delete requests with body.
* [KoBoToolbox Node:](/workflow/integrations/nodes/n8n-nodes-base.kobo/) Add KoBoToolbox Regular and Trigger Node.
* [Mailjet Node:](/workflow/integrations/nodes/n8n-nodes-base.mailjet/) Add credential tests and support for sandbox, JSON parameters & variables.
* [Mattermost Node:](/workflow/integrations/nodes/n8n-nodes-base.mattermost/) Add support for Channel search.

### Other improvements

- Add support for reading IDs from file with executeBatch command.

### Bug fixes

* [GitHub node:](/workflow/integrations/nodes/n8n-nodes-base.github/) Fix credential tests and File List operation.
* [Telegram node:](/workflow/integrations/nodes/n8n-nodes-base.telegram/) Fix sending binary data when disable notification is set.

### Contributors

* [Manuel](https://github.com/tennox)
* [Marcin Kozey](https://github.com/marcinkoziej)
* [Matthew Walther](https://github.com/mashiox)
* [Yann Jouanique](https://github.com/Yann-J)

## n8n@0.168.2

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.168.1...n8n@0.168.2) for this version.<br />
**Release date:** 2022-03-16

This release contains an important bug fix for 0.168.0. Users on 0.168.0 or 0.168.1 should upgrade to this.

## n8n@0.168.1

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.168.0...n8n@0.168.1) for this version.<br />
**Release date:** 2022-03-15

A bug fix for user management: fixed an issue with email templates that was preventing owners from inviting members.

## n8n@0.168.0

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.167.0...n8n@0.168.0) for this version.<br />
**Release date:** 2022-03-14

### New feature: user management

User management in Doc² allows you to invite people to work in your self-hosted Doc² instance. It includes:

* Login and password management
* Adding and removing users
* Two account types: owner and member

Check out the [user management documentation](/hosting/user-management/) for more information.

## n8n@0.167.0

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.166.0...n8n@0.167.0) for this version.<br />
**Release date:** 2022-03-13

### Highlights

#### Luxon and JMESPath

0.167.0 adds support for two new libraries:

* [Luxon](https://moment.github.io/luxon/#/): a JavaScript library for working with date and time
* [JMESPath](https://jmespath.org/): a query language for JSON

You can use Luxon and JMESPath in the code editor and in expressions.

#### New expressions variables

We've added two new variables to simplify working with date and time in expressions:

* `$now`: a Luxon object containing the current timestamp. Equivalent to DateTime.now().
* `$today`: a Luxon object containing the current timestamp, rounded down to the day. Equivalent to DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).

#### Negative operations in If and Switch nodes

Made it easier to perform negative operations on strings.

This release adds one new operation for numbers:

* Is Not Empty

And the following new operations for strings:

* Not Ends With
* Regex Not Match
* Not Starts With
* Is Not Empty

Additionally, Regex is now labelled Regex Match.

#### New node: Redis Trigger

Added a Redis Trigger node, so you can now start workflows based on a Redis event.

* [Redis Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.redisTrigger/) Added a Redis Trigger node.

### Core functionality

- Added support for [Luxon](https://moment.github.io/luxon/#/) and [JMESPath](https://jmespath.org/).
- Added two new expressions variables, `$now` and `$today`.
- Added more negative operations for numbers and strings.
- Added a link to the course from the help menu.

### Nodes


* [Facebook Graph API:](/workflow/integrations/nodes/n8n-nodes-base.facebookGraphApi/) Added suport for Facebook Graph API 13.
* [Hubspot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Added suport for private app token authentication.
* [MongoDB:](/workflow/integrations/nodes/n8n-nodes-base.mongoDb/) Added the aggregate operation.
* [Redis Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.redisTrigger/) Added a Redis Trigger node.
* [Redis:](/workflow/integrations/nodes/n8n-nodes-base.redis/) Added support for publish operations.
* [Strapi:](/workflow/integrations/nodes/n8n-nodes-base.strapi/) Added support for Strapi 4.
* [WordPress:](/workflow/integrations/nodes/n8n-nodes-base.wordpress/) Added status as an option to getAll post requests.


### Bugfixes

- The Google Calendar node now correctly applies timezones when creating, updating, and scheduling all day events.
- Fixed a bug that occasionally caused Doc² to crash, or shut down workflows unexpectedly.
- You can now use long credential type names with Postgres.

### Contributors

* [Luiz Eduardo de Oliveira Fonseca](https://github.com/luizeof)
* [Vitaliy Fratkin](https://github.com/viiy)
* [sol](https://github.com/5pecia1)
* [vcrwr](https://github.com/vcrwr)
* [FFTDB](https://github.com/FFTDB)


## n8n@0.166.0

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.165.1...n8n@0.166.0) for this version.<br />
**Release date:** 2022-03-08

### New nodes 


* [Odoo](/workflow/integrations/nodes/n8n-nodes-base.odoo/)

### Enhanced nodes 


* [Function:](/workflow/integrations/core-nodes/n8n-nodes-base.function/) Added support for items without a JSON key.

### Core functionality 

- Added new environment variable `N8N_HIRING_BANNER_ENABLED` to enable/disable the hiring banner.
- Fixed a bug preventing keyboard shortcuts from working as expected.
- Fixed a bug causing tooltips to be hidden behind other elements.
- Fixed a bug causing some credentials to be hidden from the credentials list.

### Bug fixes 


* [Baserow:](/workflow/integrations/nodes/n8n-nodes-base.baserow/) Fixed a bug preventing the Sorting option of the Get All operation from working as expected.
* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug causing Digest Authentication to fail in some scenarios.
* [Wise:](/workflow/integrations/nodes/n8n-nodes-base.wise/) Fixed a bug causing API requests requiring Strong Customer Authentication (SCA) to fail.

### Contributors 

[pemontto](https://github.com/pemontto)

## n8n@0.165.0 

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.164.1...n8n@0.165.0) for this version.<br />
**Release date:** 2022-02-28

!!! warning "Breaking changes"
    Please note that this version contains breaking changes. You can read more about them [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01650).



### New nodes 



* [Onfleet](/workflow/integrations/nodes/n8n-nodes-base.onfleet/)

### Enhanced nodes 


* [Asana:](/workflow/integrations/nodes/n8n-nodes-base.asana/) Added Create operation to the Project resource.
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Added Edit Contact Points, Edit Do Not Contact List, Send Email operations to Contact resource. Also added new Segment Email resource.
* [Notion (Beta):](/workflow/integrations/nodes/n8n-nodes-base.notion/) Added support for rollup fields to the Simplify Output option. Also added the Parent ID to the Get All operation of the Block resource.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added Marketing Status field to the Create operation of the Person resource, also added User ID field to the Create and Update operations of the Person resource.

### Core functionality 

- Added support for workflow templates.
- Fixed a bug causing credentials tests to fail for versioned nodes.
- Fixed a build problem by addind dependencies `@types/lodash.set` to the `workflow` package and `@types/uuid` to the `core` package.
- Fixed an error causing some resources to ignore a non-standard `N8N_PATH` value.
- Fixed an error preventing the placeholder text from being shown when entering credentials.
- Improved error handling for telemetry-related errors.

### Bug fixes 


* [Orbit:](/workflow/integrations/nodes/n8n-nodes-base.orbit/) Fixed a bug causing API requests to use an incorrect workspace identifier.
* [TheHive:](/workflow/integrations/nodes/n8n-nodes-base.theHive/)  Fixed a bug causing the Ignore SSL Issues option to be applied incorrectly.

### Contributors 

[alexwitkowski](https://github.com/awitkowski0), [Iñaki Breinbauer](https://github.com/quansenB), [lsemaj](https://github.com/jamesliupenn), [Luiz Eduardo de Oliveira Fonseca](https://github.com/luizeof), [Rodrigo Correia](https://github.com/rodrigoscdc), [Santiago Botero Ruiz](https://github.com/yoky-devsavant), [Saurabh Kashyap](https://github.com/saurabharch), [Ugo Bataillard](https://github.com/knshiro)

## n8n@0.164.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.164.0...n8n@0.164.1) for this version.<br />
**Release date:** 2022-02-20

### Core Functionality 

- Fixed a bug preventing webhooks from working as expected in some scenarios.

## n8n@0.164.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.163.1...n8n@0.164.0) for this version.<br />
**Release date:** 2022-02-20

### New nodes 


* [Google Chat](/workflow/integrations/nodes/n8n-nodes-base.googleChat/)

### Enhanced nodes 


* [Grist:](/workflow/integrations/nodes/n8n-nodes-base.grist/) Added support for self-hosted Grist instances.
* [Telegram Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.telegramTrigger/) Added new Extra Large option to Image Size field.
* [Webhook:](/workflow/integrations/core-nodes/n8n-nodes-base.webhook/) Added new No Response Body option. Also added support for DELETE, PATCH and PUT methods.

### Core Functionality 

- Added new database indices to improve the performance when querying past executions.
- Fixed a bug causing the base portion of a URL not to be prepended as expected in some scenarios.
- Fixed a bug cuasing expressions to resolve incorrectly when referencing non-existent nodes or parameters.

### Contributors 

[Jhalter5Stones](https://github.com/Jhalter5Stones), [Valentina Lilova](https://github.com/valentina98), [thorstenfreitag](https://github.com/thorstenfreitag)

## n8n@0.163.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.163.0...n8n@0.163.1) for this version.<br />
**Release date:** 2022-02-13

### Core Functionality 

- Fixed a bug preventing OAuth2 authentication from working as expected in some scenarios.

## n8n@0.163.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.162.0...n8n@0.163.0) for this version.<br />
**Release date:** 2022-02-13

### New nodes 


* [HaloPSA](/workflow/integrations/nodes/n8n-nodes-base.haloPSA/)
* [Linear Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.linearTrigger/)
* [Zammad](/workflow/integrations/nodes/n8n-nodes-base.zammad/)

### Enhanced nodes 


* [GitHub:](/workflow/integrations/nodes/n8n-nodes-base.github/) Added Reference option to the Get operation of the File resource.
* [Twilio:](/workflow/integrations/nodes/n8n-nodes-base.twilio/) Added Status Callbacks option.
* [uProc:](/workflow/integrations/nodes/n8n-nodes-base.uproc/) Sanitized Data Webhook field description.

### Core Functionality 

- Added automatic sorting by relative position to the node list inside the expression editor.
- Added new `/workflows/demo` page to allow read-only rendering of workflows inside an iframe.
- Added optional `/healthz` health check endpoint to worker instances.
- Fixed unwanted list autofill behaviour inside the expression editor.
- Improved the GitHub actions used by the nightly Docker image.

### Bug fixes 


* [Function:](/workflow/integrations/core-nodes/n8n-nodes-base.function/) Fixed a bug leaving the code editor size unchanged after resizing the window.
* [Function Item:](/workflow/integrations/core-nodes/n8n-nodes-base.functionItem/) Fixed a bug leaving the code editor size unchanged after resizing the window.
* [IF:](/workflow/integrations/core-nodes/n8n-nodes-base.if/) Removed the empty sections left after removing a condition.
* [Item Lists:](/workflow/integrations/core-nodes/n8n-nodes-base.itemLists/) Fixed an erroneous placeholder text.

### Contributors 

[Iñaki Breinbauer](https://github.com/quansenB), [Manuel](https://github.com/tennox), [pemontto](https://github.com/pemontto)

## n8n@0.162.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.161.1...n8n@0.162.0) for this version.<br />
**Release date:** 2022-02-06

### Enhanced nodes 


* [GitHub:](/workflow/integrations/nodes/n8n-nodes-base.github/) Added new List operation to File resource.

### Core Functionality 

- Added configurable debug logging for telemetry.
- Added support for defining nodes through JSON. This functionality is in alpha state and breaking changes to the interface can take place in upcoming versions.
- Added telemetry support to page events occuring before telemetry is initialized.
- Fixed a bug preventing errors in sub-workflows from appearing in parent executions.
- Fixed a bug where node versioning would not work as expected.
- Fixed a bug where remote parameters would not load as expected.
- Fixed a bug where unkown node types would not work as expected.
- Prevented the node details view from opening automatically after duplicating a node.
- Removed dependency `fibers` which is incompatible with the current LTS version 16 of Node.js.

### Bug fixes 


* [XML:](/workflow/integrations/core-nodes/n8n-nodes-base.xml/) Fixed a bug causing the node to alter incoming data.

### Contributors 

[pemontto](https://github.com/pemontto)

## n8n@0.161.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.161.0...n8n@0.161.1) for this version.<br />
**Release date:** 2022-02-01

### Core Functionality 

- Added optional debug logging to health check functionality.

## n8n@0.161.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.160.0...n8n@0.161.0) for this version.<br />
**Release date:** 2022-01-30

### Core Functionality 

- Added default polling interval for trigger nodes using polling.
- Added support for additional hints below parameter fields.
- Fixed a bug preventing default values from being used when testing credentials.
- Improved the wording in the *Save your Changes?* dialog.

### Bug fixes 


* [Airtable:](/workflow/integrations/nodes/n8n-nodes-base.airtable/) Improved field description.
* [Airtable Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.airtableTrigger/) Improved field description.
* [erpNext:](/workflow/integrations/nodes/n8n-nodes-base.erpNext/) Prevented the node from throwing an error when no data is found.
* [Gmail:](/workflow/integrations/nodes/n8n-nodes-base.gmail/) Fixed a bug causing the BCC field to be ignored.
* [Move Binary Data:](/workflow/integrations/core-nodes/n8n-nodes-base.moveBinaryData/) Fixed a bug causing the binary data to JSON conversion to fail when using filesystem-based binary data handling.
* [Slack:](/workflow/integrations/nodes/n8n-nodes-base.slack/) Fixed a typo in the Type field.

### Contributors 

[fabian wohlgemuth](https://github.com/wohfab)

## n8n@0.160.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.159.1...n8n@0.160.0) for this version.<br />
**Release date:** 2022-01-22

### New nodes 


* [BambooHR](/workflow/integrations/nodes/n8n-nodes-base.bambooHr/)

### Core Functionality 

- Fixed a bug preventing the binary data preview from using the full available height and width.
- Fixed a build problem by pinning chokidar version 3.5.2.
- Prevent workflow activation when no trigger is presentand introduced a modal explaining production data handling.
- Fixed *Filter by tags* placeholder text used in the Open Workflow modal.

### Bug fixes 


* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug causing custom headers from being ignored.
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Fixed a bug preventing all items from being returned in some situations.
* [Microsoft OneDrive:](/workflow/integrations/nodes/n8n-nodes-base.microsoftOneDrive/) Fixed a bug preventing more than 200 items from being returned.
* [Spotify:](/workflow/integrations/nodes/n8n-nodes-base.spotify/) Fixed a bug causing the execution to fail if there are more than 1000 search results, also fixed a bug preventing the Get New Releases operation of the Album resource from working as expected.

### Contributors 

[fabian wohlgemuth](https://github.com/wohfab)

## n8n@0.159.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.159.0...n8n@0.159.1) for this version.<br />
**Release date:** 2022-01-18

### Core Functionality 

- Temporarily removed debug logging for axios requests.

## n8n@0.159.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.158.0...n8n@0.159.0) for this version.<br />
**Release date:** 2022-01-16

### New nodes 


* [Jenkins](/workflow/integrations/nodes/n8n-nodes-base.jenkins/)

### Enhanced nodes 


* [GraphQL:](/workflow/integrations/core-nodes/n8n-nodes-base.graphql/) Added support for additional authentication methods Basic Auth, Digest Auth, OAuth1, OAuth2, and Query Auth.

### Core Functionality 

- Added support for executing workflows without an ID through the CLI.
- Fixed a build problem.
- Fixed a bug preventing the tag description from being shown on the canvas.
- Improved build performance by skipping the `node-dev` package during build.

### Bug fixes 


* [Box:](/workflow/integrations/nodes/n8n-nodes-base.box/) Fixed a bug causing some files to be corrupted during download.
* [Philips Hue:](/workflow/integrations/nodes/n8n-nodes-base.philipsHue/) Fixed a bug preventing the node from connecting to Philips Hue.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fixed a bug preventing filters on date and datetime fields from working as expected.
* [Supabase:](/workflow/integrations/nodes/n8n-nodes-base.supabase/) Fixed an errorneous documentation link.

### Contributors 

[Phil Clifford](https://github.com/philclifford)

## n8n@0.158.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.157.1...n8n@0.158.0) for this version.<br />
**Release date:** 2022-01-09

### New nodes 


* [Microsoft Graph Security](/workflow/integrations/nodes/n8n-nodes-base.microsoftGraphSecurity/)
* [SyncroMSP](/workflow/integrations/nodes/n8n-nodes-base.syncroMsp/)
* [Supabase](/workflow/integrations/nodes/n8n-nodes-base.supabase/)

### Enhanced nodes 


* [Edit Image:](/workflow/integrations/core-nodes/n8n-nodes-base.editImage/) Added Transparent operation.
* [Kafka:](/workflow/integrations/nodes/n8n-nodes-base.kafka/) Added Use Schema Registry option.
* [Kafka Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.kafkaTrigger/) Added Use Schema Registry option.
* [Redis:](/workflow/integrations/nodes/n8n-nodes-base.redis/) Added database field to credentials.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Account Number field.

### Core Functionality 

- Added new external hook when active workflows finished initializing.
- Fixed a bug preventing the personalisation survey from showing up.
- Improved telemetry.

### Bug fixes 


* [Edit Image:](/workflow/integrations/core-nodes/n8n-nodes-base.editImage/) Fixed a bug causing two items to be returned.
* [iCalendar:](/workflow/integrations/core-nodes/n8n-nodes-base.iCal/) Fixed a bug preventing dates in January from working as expected.
* [Merge:](/workflow/integrations/core-nodes/n8n-nodes-base.merge/) Fixed causing empty binary data to overwrite other binary data on merge.

### Contributors 

[Ricardo Georgel](https://github.com/rgeorgel), [Pierre](https://github.com/hnb2), [Vahid Sebto](https://github.com/sebto)

## n8n@0.157.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.157.0...n8n@0.157.1) for this version.<br />
**Release date:** 2022-01-03

### Core Functionality 

- Fixed a bug where not all nodes could use the new binary data handling.

## n8n@0.157.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.156.0...n8n@0.157.0) for this version.<br />
**Release date:** 2022-01-02

### Enhanced nodes 


* [Function:](/workflow/integrations/core-nodes/n8n-nodes-base.function/) The node now prevents unsupported data from being returned.
* [Function Item:](/workflow/integrations/core-nodes/n8n-nodes-base.functionItem/) The node now prevents unsupported data from being returned.
* [HubSpot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Added Engagement resource with Create, Delete, Get, and Get All operations.
* [Notion (Beta):](/workflow/integrations/nodes/n8n-nodes-base.notion/) Upgraded the Notion node: Added Search operation for the Database resource, Get operation for Database Page resource, Archive operation for the Page resource. Also added Simplify Output option and test for credential validity.
* [Wait:](/workflow/integrations/core-nodes/n8n-nodes-base.wait/) Added new Ignore Bots option.
* [Webhook:](/workflow/integrations/core-nodes/n8n-nodes-base.webhook/) Added new Ignore Bots option.

### Core Functionality 

- Fixed a bug where a wrong number suffix was used after duplicating nodes.

### Bug fixes 


* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug where using Digest Auth would fail.

### Contributors 

[pemontto](https://github.com/pemontto)

## n8n@0.156.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.155.2...n8n@0.156.0) for this version.<br />
**Release date:** 2021-12-25

### Enhanced nodes 


* [GitLab Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.gitlabTrigger/) Added new trigger events: Confidential Issue, Confidential Comment, Deployment, Release.
* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Added support for downloading and converting native Google files.
* [Kitemaker:](/workflow/integrations/nodes/n8n-nodes-base.kitemaker/) Added Space ID field to Create operation of Work Item resource.
* [Raindrop:](/workflow/integrations/nodes/n8n-nodes-base.raindrop/) Added Parse Metadata option to Create, Update operations of the Bookmark resource.

### Core Functionality 

- Added execution ID to workflow.postExecute hook
- Added response body to UI for failed Axios requests
- Added support for automatically removing new lines from Google Service Account credentials
- Added support for disabling the UI via environment variable
- Fixed a bug causing the wrong expression result to be shown for items from an output other than the first
- Improved binary data management
- Introduced Monaco as new UI code editor

### Contributors 

[Arpad Gabor](https://github.com/arpadgabor), [Leo Lou](https://github.com/l4u), [Manuel](https://github.com/tennox)

## n8n@0.155.2

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.154.0...n8n@0.155.2) for this version.<br />
**Release date:** 2021-12-19

### Core Functionality 

- Added support for internationalization (i18n). This functionality is currently in alpha status and breaking changes are to be expected.

## n8n@0.154.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.153.0...n8n@0.154.0) for this version.<br />
**Release date:** 2021-12-19

### Enhanced nodes 


* [Plivo:](/workflow/integrations/nodes/n8n-nodes-base.plivo/) Added user agent to all API requests.

### Core Functionality 

- Allow deletion of nodes from the canvas using the backspace key
- Fixed an issue causing clicks in the value survey to impact the main view
- Fixed an issue preventing the update panel from closing

### Bug fixes 


* [Todoist:](/workflow/integrations/nodes/n8n-nodes-base.todoist/) Fixed a bug where using the additional field Due Date Time on the Task resource would cause the Create operation to fail.

### Contributors 

[Mohammed Huzaif](https://github.com/huzaif-plivo), [Лебедев Иван](https://github.com/X-pech)

## n8n@0.153.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.152.0...n8n@0.153.0) for this version.<br />
**Release date:** 2021-12-11

### New nodes 


* [Figma Trigger (Beta)](/workflow/integrations/trigger-nodes/n8n-nodes-base.figmaTrigger/)
* [Workable Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.workableTrigger/)

### Enhanced nodes 


* [Google Contacts:](/workflow/integrations/nodes/n8n-nodes-base.googleContacts/) Added Query option to Get All operation, also prevented the node from failing when no contacts are found.
* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Added support for query-based authentication.
* [Home Assistant:](/workflow/integrations/nodes/n8n-nodes-base.homeAssistant/) Added support for loading possible options in the Domain, Service, and Entity ID fields.
* [One Simple API:](/workflow/integrations/nodes/n8n-nodes-base.oneSimpleApi/) Added support for Social Profile resources.
* [PagerDuty:](/workflow/integrations/nodes/n8n-nodes-base.pagerDuty/) Write scope is now requested upon authentication against the PagerDuty OAuth2 API.

### Core Functionality 

- Added frontend for value surveys
- Fixed an issue preventing the recommendation logic from working as expected after selecting a work area
- Fixed an issue where a wrong exit code was sent when running Doc² on an unsupported version of Node.js
- Fixed an issue where node options would disappear on hovering when a node is not selected
- Fixed an issue where the execution id was missing when running Doc² in queue mode
- Fixed an issue where execution data was missing when waiting for a webhook in queue mode
- Improved error handling when the Doc² port is already in use
- Improved diagnostic events
- Removed toast notification on webhook deletion, added toast notification after node is copied
- Removed default trigger tooltip for polling trigger nodes

### Bug fixes 


* [APITemplate.io:](/workflow/integrations/nodes/n8n-nodes-base.apiTemplateIo/) Fixed a bug where the Create operation on the Image resource would fail when the Download option is not enabled.
* [HubSpot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Fixed authentication for new Hubspot applications by using granular scopes when authenticating against the Hubspot OAuth2 API.
* [HubSpot Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.hubspotTrigger/) Fixed authentication for new Hubspot applications by using granular scopes when authenticating against the Hubspot Developer API.
* [Jira Software:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Fixed an issue where the Reporter field would not work as expected on Jira Server instances.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fixed a typo preventing the value in the amount field of from being saved.

### Contributors 

[pemontto](https://github.com/pemontto), [Jascha Lülsdorf](https://github.com/buelsenfrucht), [Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.152.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.151.0...n8n@0.152.0) for this version.<br />
**Release date:** 2021-12-04

### New nodes 


* [Google Calendar Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.googleCalendarTrigger/)

### Enhanced nodes 


* [Telegram Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.telegramTrigger/) Added support for downloading images to channel_post updates.

### Core Functionality 

- Added a plus (+) connector to end nodes
- Allowed opening workflows and executions in a new window when using Ctrl + Click
- Enforced type checking for all node parameters
- Fixed a build issue in the custom Doc² docker image
- Fixed a memory leak in the UI which could occur when renaming nodes or navigate to another workflow
- Improved stability of internal test workflows
- Improved expression security
- Introduced redirect to a new page and UI error message when trying to open a deleted workflow
- Introduced support for multiple arguments when logging
- Updated the onboarding survey

### Bug fixes 


* [Google BigQuery:](/workflow/integrations/nodes/n8n-nodes-base.googleBigQuery/) Fixed a bug preventing pagination from working as expected when the Return All option is enabled.
* [RabbitMQ Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.rabbitmqTrigger/) Added Trigger to the name of the trigger node.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fixed a typo affecting the Type field of the Opportunity resource.

### Contributors 

[Zvonimir Erdelja](https://github.com/zvonimir-ebot7), [m2scared](https://github.com/m2scared)

## n8n@0.151.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.150.0...n8n@0.151.0) for this version.<br />
**Release date:** 2021-11-26

### New nodes 


* [DHL](/workflow/integrations/nodes/n8n-nodes-base.dhl/)
* [Grafana](/workflow/integrations/nodes/n8n-nodes-base.grafana/)

### Core Functionality 

- Fixed a bug causing connections between nodes to disappear when renaming a newly added node after drawing a connection to its endpoints.
- Fixed a build issue by adding TypeScript definitions for validator.js to CLI package, also fixed a linting issue by removing an unused import.
- Improved the waiting state of trigger nodes to explain when an external event is required.
- Loops are now drawn below their source node.

### Bug fixes 


* [Edit Image:](/workflow/integrations/core-nodes/n8n-nodes-base.editImage/) Fixed an issue preventing the Composite operation from working correctly in some cases.

### Contributors 

[Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.150.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.149.0...n8n@0.150.0) for this version.<br />
**Release date:** 2021-11-19

### Enhanced nodes 


* [Jira Software:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Added Components as an additional field.

### Core Functionality 

- Fixed a build issue by pinning rudder-sdk-node version 1.0.6 in CLI package.
- Fixed an issue preventing the `n8n import:workflow --separate` CLI command from finding workflows on Windows.
- Further improved the expression security.
- Moved all nodes into separate directories in preparation for internationalization.
- Removing default headers for PUT and PATCH operations when using axios.
- Revamped the workflow canvas.

### Bug fixes 


* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue causing the wrong Content-Type header to be set when downloading a file.
* [ServiceNow:](/workflow/integrations/nodes/n8n-nodes-base.serviceNow/) Fixed incorrect mapping of incident urgency and impact values.
* [Start:](/workflow/integrations/core-nodes/n8n-nodes-base.start/) Fixed an issue causing the node to be disabled in a new workflow.
* [Xero:](/workflow/integrations/nodes/n8n-nodes-base.xero/) Fixed an issue causing the node to only fetch the first page when querying the Xero API.

## n8n@0.149.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.148.0...n8n@0.149.0) for this version.<br />
**Release date:** 2021-11-13

### New nodes 


* [One Simple API](/workflow/integrations/nodes/n8n-nodes-base.oneSimpleApi/)

### Enhanced nodes 


* [Edit Image:](/workflow/integrations/core-nodes/n8n-nodes-base.editImage/) Added Circle Primitive to Draw operation. Also added Composite operation.
* [Zendesk:](/workflow/integrations/nodes/n8n-nodes-base.zendesk/) Added check for API credentials validity.
* [Zulip:](/workflow/integrations/nodes/n8n-nodes-base.zulip/) Added additional field Role to the Update operation of the User resource.

### Core Functionality 

- Fixed an issue causing an error message to be thrown when executing a workflow through the CLI.
- Improved expression security by limiting the available process properties.
- Improved the behaviour of internal tests executed through the CLI.
- Updated the owner of the node user's home directory in the custom docker image.

### Bug fixes 


* [Google Tasks:](/workflow/integrations/nodes/n8n-nodes-base.googleTasks/) Fixed an issue where the Due Date field had no effect (Update operation) or was unavailable (Create operation).
* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue where the Content-Length header was not calculated and sent when using the a Body Content Type of Form-Data Multipart.
* [Stripe Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.stripeTrigger/) Fixed an issue preventing the node from being activated when a previously created webhook no longer exists.
* [Toggl Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.togglTrigger/) Updated the API URL used by the node.

### Contributors 

[GeylaniBerk](https://github.com/GeylaniBerk), [Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.148.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.147.1...n8n@0.148.0) for this version.<br />
**Release date:** 2021-11-05

### New nodes 


* [Dropcontact](/workflow/integrations/nodes/n8n-nodes-base.dropcontact/)
* [Respond to Webhook](/workflow/integrations/core-nodes/n8n-nodes-base.respondToWebhook/)

### Enhanced nodes 


* [Lemlist:](/workflow/integrations/nodes/n8n-nodes-base.lemlist/) Added additional fields to Create operation of Lead resource.
* [Slack:](/workflow/integrations/nodes/n8n-nodes-base.slack/) Added User Group resource.
* [Todoist:](/workflow/integrations/nodes/n8n-nodes-base.todoist/) Added Update operation to Task resource.
* [Wait:](/workflow/integrations/core-nodes/n8n-nodes-base.wait/) Improved descriptions of available Respond options.
* [WooCommerce:](/workflow/integrations/nodes/n8n-nodes-base.wooCommerce/) Added password field to Crate operation of Customer resource.

### Core Functionality 

- Added a hook after workflow creation.
- Fixed a build issue with npm v7 by overriding unwanted behaviour through the .npmrc file.
- Fixed an issue preventing unknown node types from being imported.
- Fixed an issue with the UI falsely indicating a credential cannot be selected when using SQLite and multiple credentials with the same name exist.

### Bug fixes 


* [Stripe:](/workflow/integrations/nodes/n8n-nodes-base.stripe/) Fixed an issue where setting additional Metadata fields would not have the expected effect. Also fixed an issue where pagination would not work as expected.
* [Zendesk:](/workflow/integrations/nodes/n8n-nodes-base.zendesk/) Fixed an issue preventing the additional field External ID from being evaulated correctly.

### Contributors 

[mizzimizzi](https://github.com/mizzimizzi), [nikozila](https://github.com/nikozila), [Pauline](https://github.com/PaulineDropcontact)

## n8n@0.147.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.147.0...n8n@0.147.1) for this version.<br />
**Release date:** 2021-11-03

### Core Functionality 

- Fixed a build issue by moving the `chokidar` dependency to a regular dependency.

## n8n@0.147.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.146.0...n8n@0.147.0) for this version.<br />
**Release date:** 2021-11-03

### New nodes 


* [Local File Trigger](/workflow/integrations/core-nodes/n8n-nodes-base.localFileTrigger/)

### Core Functionality 

- Improved the database migration process to reduce memory footprint.
- Fixed an issue with telemetry by adding an anonymous ID.

## n8n@0.146.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.145.0...n8n@0.146.0) for this version.<br />
**Release date:** 2021-10-29

### New nodes 


* [Microsoft Dynamics CRM](/workflow/integrations/nodes/n8n-nodes-base.microsoftDynamicsCrm/)

### Enhanced nodes 


* [Agile CRM:](/workflow/integrations/nodes/n8n-nodes-base.agileCrm/) Added Filters to Get All operation of Contact and Company resources.
* [Date & Time:](/workflow/integrations/core-nodes/n8n-nodes-base.dateTime/) Ensuring the return values are always of type string.
* [IF:](/workflow/integrations/core-nodes/n8n-nodes-base.if/) Added support for moment types to Date & Time condition.

### Core Functionality 

- Added name and ID of a workflow to its settings.
- Added parameter inputs to be multi-line.
- Fixed an issue with declaring proxies when axios is used.
- Fixed an issue with serializing arrays and special characters.
- Fixed an issue with updating expressions after renaming a node.

### Bug fixes 


* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue with the Full Response option not taking effect when used with the Ignore Response Code option.

### Contributors 

[Valentina Lilova](https://github.com/valentina98), [Oliver Trajceski](https://github.com/SchnapsterDog)

## n8n@0.145.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.144.0...n8n@0.145.0) for this version.<br />
**Release date:** 2021-10-22

### New nodes 


* [AWS Textract](/workflow/integrations/nodes/n8n-nodes-base.awsTextract/)
* [Google Drive Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.googleDriveTrigger/)

### Enhanced nodes 


* [Bitbucket Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.bitbucketTrigger/) Added check for credentials validity. Removed deprecated User and Team resources, and added the Workspace resource.
* [GitHub:](/workflow/integrations/nodes/n8n-nodes-base.github/) Added check for API credentials validity.
* [Home Assistant:](/workflow/integrations/nodes/n8n-nodes-base.homeAssistant/) Added check for credentials validity.
* [Jira Software:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Added check for credentials validity.
* [Microsoft OneDrive:](/workflow/integrations/nodes/n8n-nodes-base.microsoftOneDrive/) Added functionality to create folder hierarchy automatically upon subfolder creation.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added All Users option to Get All operation of Activity resource.
* [Slack:](/workflow/integrations/nodes/n8n-nodes-base.slack/) Increase the Slack default query limit from 5 to 100 in order to reduce number of requests.
* [Twitter:](/workflow/integrations/nodes/n8n-nodes-base.twitter/) Added Tweet Mode additional field to the Search operation of Tweet resource.

### Core Functionality 

- Changed `vm2` library version from `3.9.3` to `3.9.5`.
- Fixed an issue with ignoring the response code.
- Fixed an issue with overwriting credentials via environment variables.
- Fixed an issue with using query strings combined with the `x-www-form-urlencoded` content type.
- Introduced telemetry.

### Bug fixes 


* [Jira Software:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Fixed an issue with the Expand option for the Issue resource. Also fixed an issue with using custom fields on Jira Server.
* [Slack:](/workflow/integrations/nodes/n8n-nodes-base.slack/) Fixed an issue with pagination when loading more than 1,000 channels.
* [Strapi:](/workflow/integrations/nodes/n8n-nodes-base.strapi/) Fixed an issue using the Where option of the Get All operation.
* [WooCommerce:](/workflow/integrations/nodes/n8n-nodes-base.wooCommerce/) Fixed an issue where a wrong postcode field name was used for the Order resource.

### Contributors 

[pemontto](https://github.com/pemontto), [rdd2](https://github.com/rdd2), [robertodamiani](https://github.com/robertodamiani), [Rodrigo Correia](https://github.com/rodrigoscdc)

## n8n@0.144.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.143.0...n8n@0.144.0) for this version.<br />
**Release date:** 2021-10-15

### Enhanced nodes 

* [Nextcloud:](/workflow/integrations/nodes/n8n-nodes-base.nextCloud/) Added Share operation to the File and Folder resources.
* [Zendesk:](/workflow/integrations/nodes/n8n-nodes-base.zendesk/) Added support for deleting, listing, getting, and recovering suspended tickets. Added the query option for regular tickets. Added assignee emails, internal notes, and public replies options to the update ticket operation.

### Core Functionality 
- Improved the autofill behaviour on Google Chrome when entering credentials.

### Bug fixes 

* [Airtable:](/workflow/integrations/nodes/n8n-nodes-base.airtable/) Fixed an issue with the sort field.
* [Cron:](/workflow/integrations/core-nodes/n8n-nodes-base.cron/) Set the version of the cron library to 1.7.2.

### Contributors 
[Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.143.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.142.0...n8n@0.143.0) for this version.<br />
**Release date:** 2021-10-14

### Enhanced nodes 

* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added support for getting activities from deal ID.
* [Facebook Graph API:](/workflow/integrations/nodes/n8n-nodes-base.facebookGraphApi/) Added support for Facebook Graph API versions 11 and 12.

### Core Functionality 
- Fixed a build issue affecting a number of AWS nodes.
- Changed workflows to use credential ids primarily (instead of names), allowing users to have different credentials with the same name.

### Bug fixes 

* [ FTP:](/workflow/integrations/core-nodes/n8n-nodes-base.ftp/) Fixed error when opening FTP/SFTP credentials.

### Contributors 
[Rodrigo Correia](https://github.com/rodrigoscdc)

## n8n@0.142.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.141.1...n8n@0.142.0) for this version.<br />
**Release date:** 2021-10-07

### New nodes 

* [Stop and Error](/workflow/integrations/core-nodes/n8n-nodes-base.stopAndError/)

### Core Functionality 
- Fixed overlapping buttons when viewing on mobile.
- Fixed issue with partial workflow executions when Wait node was last.
- Fixed issue with broken non-JSON requests.
- Node errors now only displayed for executing nodes, not disconnected nodes.
- Automatic save when executing new workflows with Webhook node.
- Fixed an issue with how arrays were serialized for certain nodes.
- Fixed an issue where executions could not be cancelled when running in Main mode.
- Duplicated workflows now open in a new window.

### Bug fixes 

* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Fixed 'Ignore response code' flag.
* [Rundeck:](/workflow/integrations/nodes/n8n-nodes-base.rundeck/) Fixed issue with async loading of credentials.
* [SeaTable:](/workflow/integrations/nodes/n8n-nodes-base.seaTable/) Fixed issue when entering a Baser URI with a trailing slash.

### Contributors 
[Günther](https://github.com/erbg), [Tom Klingenberg](https://github.com/ktomk)

## n8n@0.141.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.141.0...n8n@0.141.1) for this version.<br />
**Release date:** 2021-10-01

### Core Functionality 
- Fixed issue with body formatting of `x-form-www-urlencoded` requests.

## n8n@0.141.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.140.0...n8n@0.141.0) for this version.<br />
**Release date:** 2021-09-30

### New nodes 

* [Grist](/workflow/integrations/nodes/n8n-nodes-base.grist/)
* [SeaTable](/workflow/integrations/nodes/n8n-nodes-base.seaTable/)
* [SeaTable Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.seaTableTrigger/)
* [urlscan.io](/workflow/integrations/nodes/n8n-nodes-base.urlScanIo/)

### Core Functionality 
- Performance improvements in Editor UI
- Improved error reporting

### Contributors 
[Alex Hall](https://github.com/alexmojaki), [Tom Klingenberg](https://github.com/ktomk)

## n8n@0.140.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.139.1...n8n@0.140.0) for this version.<br />
**Release date:** 2021-09-29

### New nodes 

* [Splunk](/workflow/integrations/nodes/n8n-nodes-base.splunk/)

### Enhanced nodes 

* [Telegram:](/workflow/integrations/nodes/n8n-nodes-base.telegram/) Added binary data support to the Send Animation, Send Audio, Send Document, Send Photo, Send Video, and Send Sticker operations.

### Core Functionality 
- Fixed startup behavior when running Doc² in scaled mode (i.e. `skipWebhoooksDeregistrationOnShutdown` is enabled).
- Fixed behavior around handling empty response bodies.
- Fixed an issue with handling of refresh tokens.

### Contributors 
[pemontto](https://github.com/pemontto)

## n8n@0.139.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.139.0...n8n@0.139.1) for this version.<br />
**Release date:** 2021-09-23

### Core Functionality 
- Bug fixes and improvements for Editor UI.

## n8n@0.139.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.138.0...n8n@0.139.0) for this version.<br />
**Release date:** 2021-09-22

### New nodes 

* [Elastic Security](/workflow/integrations/nodes/n8n-nodes-base.elasticSecurity/)
* [Misp](/workflow/integrations/nodes/n8n-nodes-base.misp/)
* [Netlify](/workflow/integrations/nodes/n8n-nodes-base.netlify/)
* [Netlify Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.netlifyTrigger/)

### Enhanced nodes 

* [HubSpot Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.hubspotTrigger/) Authentication method changed to OAuth2.
* [Wait:](/workflow/integrations/core-nodes/n8n-nodes-base.wait/) Added improved status messages for Wait behavior.

### Core Functionality 
- Updated node design to include support for versioned nodes.

### Bug fixes 

* [SendGrid:](/workflow/integrations/nodes/n8n-nodes-base.sendGrid/) Fixed issue with adding contacts to lists.

### Contributors 
[Matías Aguirre](https://github.com/omab)

## n8n@0.138.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.137.0...n8n@0.138.0) for this version.<br />
**Release date:** 2021-09-15

### New nodes 

* [Item Lists](/workflow/integrations/core-nodes/n8n-nodes-base.itemLists/)
* [Magento 2](/workflow/integrations/nodes/n8n-nodes-base.magento2/)

### Enhanced nodes 

* [Baserow:](/workflow/integrations/nodes/n8n-nodes-base.baserow/) Added the following filter options: Contains, Contains Not, Date Before Date, Date After Date, Filename Contains, Is Empty, Is Not Empty, Link Row Has, Link Row Does Not Have, Single Select Equal, and Single Select Not Equal.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added support for Notes on Leads.
* [Wekan:](/workflow/integrations/nodes/n8n-nodes-base.wekan/) Added Sort field to the Card resource.


### Core Functionality 

- General UX improvements to the Editor UI.
- Fixed an issue with the `PayloadTooLargeError`.

### Bug fixes 

* [Lemlist:](/workflow/integrations/nodes/n8n-nodes-base.lemlist/) Fixed issue where events were not sent in the correct property.
* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Fixed issue listed unnamed databases.

### Contributors 
[bramknuever](https://github.com/bramknuever), [Chris Magnuson](https://github.com/ChrisMagnuson)

## n8n@0.137.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.136.0...n8n@0.137.0) for this version.<br />
**Release date:** 2021-09-05

### New nodes 

* [Freshservice](/workflow/integrations/nodes/n8n-nodes-base.freshservice/)

### Enhanced nodes 

* [Clockify:](/workflow/integrations/nodes/n8n-nodes-base.clockify/) Added Task resource.
* [Hubspot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Added dropdown selection for Properties and Properties with History filters for Get All Deals operations.
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Added Campaign Contact resource.
* [MongoDB:](/workflow/integrations/nodes/n8n-nodes-base.mongoDb/) Added ability to query documents by '_id'.
* [MQTT:](/workflow/integrations/nodes/n8n-nodes-base.mqtt/) Added SSL/TLS support to authentication.
* [MQTT Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.mqttTrigger/) Added SSL/TLS support to authentication.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added File Extension option to the Document resource. Added Type field to Task resource.
* [Sms77:](/workflow/integrations/nodes/n8n-nodes-base.sms77/) Added Voice Call resource. Added the following options to SMS resource: Debug, Delay, Foreign ID, Flash, Label, No Reload, Performance Tracking, TTL.
* [Zendesk:](/workflow/integrations/nodes/n8n-nodes-base.zendesk/) Added Organization resource. Added Get Organizations and Get Related Data operations to User resource.

### Core Functionality 

- Added execution ID to logs of queue processes.
- Added description to operation errors.
- Added ability for webhook processes to wake waiting executions.

### Bug fixes 

* [Hubspot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Fixed issue with 'RequestAllItems' API.
* [Wordpress:](/workflow/integrations/nodes/n8n-nodes-base.wordpress/) Fixed issue with 'RequestAllItems' API only returning the first 10 items.

### Contributors 
[André Matthies](https://github.com/matthiez), [DeskYT](https://github.com/DeskYT), [Frederic Alix](https://github.com/fredericalix), [Jonathan Bennetts](https://github.com/Joffcom), [Ketan Somvanshi](https://github.com/KetanSomvanshi), [Luiz Eduardo de Oliveira Fonseca](https://github.com/luizeof), [TheFSilver](https://github.com/TheFSilver)

## n8n@0.136.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.135.3...n8n@0.136.0) for this version.<br />
**Release date:** 2021-08-30

### Enhanced nodes 

* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Added handling of Rich Text when simplifying data.

### Core Functionality 
- General UI design improvements.
- Improved errors messages during debugging of custom nodes.
- All packages upgraded to TypeScript 4.3.5, improved linting and formatting.

### Bug fixes 

* [FTP:](/workflow/integrations/core-nodes/n8n-nodes-base.ftp/) Fixed issue where incorrect paths were displayed when using the node.
* [Wait:](/workflow/integrations/core-nodes/n8n-nodes-base.wait/) Fixed issue when receiving multiple files using On Webhook Call operation.
* [Webhook:](/workflow/integrations/core-nodes/n8n-nodes-base.webhook/) Fixed issue when receiving multiple files.


## n8n@0.135.3
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.135.2...n8n@0.135.3) for this version.<br />
**Release date:** 2021-08-27

### Core Functionality 
- Fixed Canvas UI inconsistencies when duplicating workflows.
- Added log message during upgrade to indicate database migration has started.
- General improvements to parameter labels and tooltips.

### Contributors 
[Kyle Mohr](https://github.com/kylefmohr)


## n8n@0.135.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.135.1...n8n@0.135.2) for this version.<br />
**Release date:** 2021-08-26

### Core Functionality 

- Added expression support for credentials.
- Fixed performance issues when loading credentials.

## n8n@0.135.1

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.135.0...n8n@0.135.1) for this version.<br />
**Release date:** 2021-08-23

### Core Functionality 
- Fixed an issue where if Doc² was shutdown during database migration while upgrading versions, errors would result upon next startup.

## n8n@0.135.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.134.0...n8n@0.135.0) for this version.<br />
**Release date:** 2021-08-22

!!! warning "Breaking changes"
    Please note that this version contains breaking changes. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350).
    The features that introduced the breaking changes have been flagged below.


### New nodes 

* [Form.io Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.formIoTrigger/)
* [Formstack Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.formstackTrigger/)
* [Wait](/workflow/integrations/core-nodes/n8n-nodes-base.wait/)

### Core Functionality 
- In-node method for accessing binary data is now asynchronous and a helper function for this has been implemented. [](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350)
- Credentials are now loaded from the database on-demand. [](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350)
- Webhook UUIDs are automatically updated when duplicating a workflow.
- Fixed an issue when referencing values before loops.

### Bug fixes 

* [Interval:](/workflow/integrations/core-nodes/n8n-nodes-base.interval/) Fixed issue where entering too large a value (> 2147483647ms) resulted in an interval of 1sec being used rather than an error.

### Contributors 
[Aniruddha Adhikary](https://github.com/aniruddha-adhikary), [lublak](https://github.com/lublak), [parthibanbalaji](https://github.com/parthibanbalaji)


## n8n@0.134.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.133.0...n8n@0.134.0) for this version.<br />
**Release date:** 2021-08-15

### Enhanced nodes 

* [AWS DynamoDB:](/workflow/integrations/nodes/n8n-nodes-base.awsDynamoDb/) Added Scan option to Item > Get All operation.
* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Added File Name option to File > Update operation.
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Added the following fields to Company resource: Address, Annual Revenue, Company Email, Custom Fields, Description, Fax, Industry, Number of Employees, Phone, Website.
* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Added Timezone option when inserting Date fields.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added the following Filters options to the Deal > Get All operation: Predefined Filter, Stage ID, Status, and User ID.
* [QuickBooks:](/workflow/integrations/nodes/n8n-nodes-base.quickbooks/) Added the Transaction resource and Get Report operation.

### Core Functionality 
- Integrated [Nodelinter](/workflow/integrations/creating-nodes/code/node-linter/) in n8n.
- Fix to add a trailing slash (`/`) to all webhook URLs for proper functionality.

### Bug fixes 

* [AWS SES:](/workflow/integrations/nodes/n8n-nodes-base.awsSes/) Fixed issue where special characters in the message were not encoded.
* [Baserow:](/workflow/integrations/nodes/n8n-nodes-base.baserow/) Fixed issue where Create operation inserted null values.
* [Hubspot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Fixed issue when sending context parameter.

### Contributors 
[calvintwr](https://github.com/calvintwr), [CFarcy](https://github.com/CFarcy), [Jeremie Dokime](https://github.com/dokime7), [Michael Hirschler](https://github.com/mvhirsch), [Rodrigo Correia](https://github.com/rodrigoscdc), [sol](https://github.com/5pecia1)

## n8n@0.133.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.132.2...n8n@0.133.0) for this version.<br />
**Release date:** 2021-08-08

### New nodes 

* [Monica CRM](/workflow/integrations/nodes/n8n-nodes-base.monicaCrm/)

### Enhanced nodes 

* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Added Follow All Redirects option.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Record Type ID field.

### Core Functionality 
- Fixed UI lag when editing large workflows.

### Bug fixes 

* [Nextcloud:](/workflow/integrations/nodes/n8n-nodes-base.nextCloud/) Fixed issue where List operation on an empty Folder returned an error.
* [Spotify:](/workflow/integrations/nodes/n8n-nodes-base.spotify/) Fixed issues with pagination and infinite executions.

### Contributors 
[Jacob Burrell](https://github.com/jacobburrell), [Лебедев Иван](https://github.com/X-pech)

## n8n@0.132.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.132.1...n8n@0.132.2) for this version.<br />
**Release date:** 2021-08-02

### Bug fixes 

* [Interval:](/workflow/integrations/core-nodes/n8n-nodes-base.interval/) Fixed issue with infinite executions.

### Contributors 
[Лебедев Иван](https://github.com/X-pech)

## n8n@0.132.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.132.0...n8n@0.132.1) for this version.<br />
**Release date:** 2021-08-02

### Core Functionality 
- Changed TypeORM version to 0.2.34

## n8n@0.132.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.131.0...n8n@0.132.0) for this version.<br />
**Release date:** 2021-08-01

### New nodes 

* [Freshworks CRM](/workflow/integrations/nodes/n8n-nodes-base.freshworksCrm/)
* [Google Perspective](/workflow/integrations/nodes/n8n-nodes-base.googlePerspective/)
* [Marketstack](/workflow/integrations/nodes/n8n-nodes-base.marketstack/)
* [NocoDB](/workflow/integrations/nodes/n8n-nodes-base.nocoDb/)


### Enhanced nodes 

* [Facebook Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.facebookTrigger/) Added Fields parameter.
* [Gmail:](/workflow/integrations/nodes/n8n-nodes-base.gmail/) Added Sender Name parameter.
* [Home Assistant:](/workflow/integrations/nodes/n8n-nodes-base.homeAssistant/) Added Event resource.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added Deal Product resource.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Document resource with Upload operation.
* [WooCommerce:](/workflow/integrations/nodes/n8n-nodes-base.woocommerce/) Added Customer resource.


### Core Functionality 
- Fixed an issue for large internal values.

### Contributors 
[Ed Linklater](https://github.com/edlinklater), [Rodrigo Correia](https://github.com/rodrigoscdc)

## n8n@0.131.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.130.0...n8n@0.131.0) for this version.<br />
**Release date:** 2021-07-24

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01310).
    The features that introduced the breaking changes have been flagged below.


### New nodes 

* [Webex by Cisco](/workflow/integrations/nodes/n8n-nodes-base.ciscoWebex/)
* [Webex by Cisco Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.ciscoWebexTrigger/)


### Enhanced nodes 

* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added Lead resource. Added Search operation to Organization resource.
* [Taiga Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.taigaTrigger/) Added Resource and Operations filters.


### Core Functionality 
- Added Continue-on-fail support to all nodes.
- Added new version notifications.
- Added Refresh List for remote options lists.
- Added `$position` expression variable to return the index of an item within a list.

### Bug fixes 

* [Spreadsheet File:](/workflow/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/) Fixed issue when saving dates.

### Contributors 
[Anthr@x](https://github.com/AnthraX1), [Felipe Cecagno](https://github.com/fcecagno)

## n8n@0.130.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.129.0...n8n@0.130.0) for this version.<br />
**Release date:** 2021-07-18

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/  blob/master/packages/cli/BREAKING-CHANGES.md#01300).
    The features that introduced the breaking changes have been flagged below.



### New nodes 

* [AWS DynamoDB](/workflow/integrations/nodes/n8n-nodes-base.awsDynamoDb/)
* [Elasticsearch](/workflow/integrations/nodes/n8n-nodes-base.elasticsearch/)
* [ServiceNow](/workflow/integrations/nodes/n8n-nodes-base.serviceNow/)

### Enhanced nodes 

* [Kafka Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.kafkaTrigger/) Added Read Messages From Beginning option.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Sandbox Environment Type for OAuth2 credentials.
* [Taiga:](/workflow/integrations/nodes/n8n-nodes-base.taiga/) Added Epic, Task, and User Story operations.
* [TheHive:](/workflow/integrations/nodes/n8n-nodes-base.theHive/) Added Custom Fields option to the available Additional Fields.

### Core Functionality 
- Fixed an issue where failed workflows were displayed as "running".
- Fixes issues with uncaught errors.

### Bug fixes 

* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Fixed issue when filtering field data type.

### Contributors 
[Michael Hirschler](https://github.com/mvhirsch), [Mika Luhta](https://github.com/mluhta), [Pierre Lanvin](https://github.com/planvin)

## n8n@0.129.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.128.0...n8n@0.129.0) for this version.<br />
**Release date:** 2021-07-12

### New nodes 

* [Baserow](/workflow/integrations/nodes/n8n-nodes-base.baserow/)

### Bug fixes 

* [SSH:](/workflow/integrations/core-nodes/n8n-nodes-base.ssh/) Fixed issue with access rights when downloading files.

### Contributors 
[Jérémie Pardou-Piquemal](https://github.com/jrmi)

## n8n@0.128.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.127.0...n8n@0.128.0) for this version.<br />
**Release date:** 2021-07-11

### New nodes 

* [Home Assistant](/workflow/integrations/nodes/n8n-nodes-base.homeAssistant/)
* [Stripe](/workflow/integrations/nodes/n8n-nodes-base.stripe/)

### Enhanced nodes 

* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Added support for arrays in Querystring. Any parameter appearing multiple times with the same name is grouped into an array.
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Added Contact Segment resource.
* [Telegram:](/workflow/integrations/nodes/n8n-nodes-base.telegram/) Added Delete operation to the Message resource.

### Core Functionality 
- Performance improvement for loading of historical executions (> 3mil) when using Postgres.
- Fixed error handling for unending workflows and display of "unknown" workflow status.
- Fixed format of Workflow ID when downloading from UI Editor to enable compatibility with importing from CLI.

### Bug fixes 

* [Microsoft SQL:](/workflow/integrations/nodes/n8n-nodes-base.microsoftSql/) Fixed an issue with sending the connectionTimeout parameter, and creating and updating data using columns with spaces.

### Contributors 
[Kaito Udagawa](https://github.com/umireon), [Rodrigo Correia](https://github.com/rodrigoscdc)


## n8n@0.127.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.1...n8n@0.127.0) for this version.<br />
**Release date:** 2021-07-04

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01270).
    The features that introduced the breaking changes have been flagged below.


### Enhanced nodes 

* [Airtable:](/workflow/integrations/nodes/n8n-nodes-base.airtable/) Added Bulk Size option to all Operations.
* [Box:](/workflow/integrations/nodes/n8n-nodes-base.box/) Added Share operation to File and Folder resources.
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Last Name field to Update operation on Contact resource.
* [Zoho CRM:](/workflow/integrations/nodes/n8n-nodes-base.zohoCrm/) Added Account, Contact, Deal, Invoice, Product, Purchase, Quote, Sales Order, and Vendor resources.

### Core Functionality 
- Added a workflow testing framework via a new CLI command to execute all desired workflows. Run `n8n executeBatch --help` for details.
- Added support to display binary video content in Editor UI.

### Bug fixes 

* [Google Sheets:](/workflow/integrations/nodes/n8n-nodes-base.googleSheets/) Fixed an issue with handling 0 value that resulted in empty cells.
* [SSH:](/workflow/integrations/core-nodes/n8n-nodes-base.ssh/) Fixed an issue with setting passphrases.

### Contributors 
[flybluewolf](https://github.com/flybluewolf), [Kaito Udagawa](https://github.com/umireon)

## n8n@0.126.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.0...n8n@0.126.1) for this version.<br />
**Release date:** 2021-06-29

### Core Functionality 
- Fixed issues with keyboard shortcuts when a modal was open.

### Bug fixes 

* [Microsoft SQL:](/workflow/integrations/nodes/n8n-nodes-base.microsoftSQL/) Fixed an issue with handling of Boolean values when inserting.
* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Fixed an issue with the node icon.

## n8n@0.126.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.125.0...n8n@0.126.0) for this version.<br />
**Release date:** 2021-06-27

### New nodes 

* [Action Network](/workflow/integrations/nodes/n8n-nodes-base.actionNetwork/)
* [Google Docs](/workflow/integrations/nodes/n8n-nodes-base.googleDocs/)

### Enhanced nodes 

* [AWS S3:](/workflow/integrations/nodes/n8n-nodes-base.awsS3/) Added Delete operation to the Bucket Resource.
* [Google Analytics:](/workflow/integrations/nodes/n8n-nodes-base.googleAnalytics/) Added Dimension Filters to the available Additional Fields.
* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Added Split Into Items option.
* [MQTT:](/workflow/integrations/nodes/n8n-nodes-base.mqtt/) Added mqqts protocol for MQTT credentials.
* [QuickBooks:](/workflow/integrations/nodes/n8n-nodes-base.quickbooks/) Added Purchase resource with Get and Get All operations.


### Core Functionality 
- Templates from the [n8n Workflows](https://n8n.io/workflows) page can now be directly imported by appending `/workflows/templates/<templateId>` to your instance base URL. For example, `localhost:5678/workflows/templates/1142`.
- Added new Editor UI shortcuts. See [Keyboard Shortcuts](keyboard-shortcuts.md) for details.
- Fixed an issue causing console errors when deleting a node from the canvas.

### Bug fixes 

* [Ghost:](/workflow/integrations/nodes/n8n-nodes-base.ghost/) Fixed an issue with the Get All operation functionality.
* [Google Analytics:](/workflow/integrations/nodes/n8n-nodes-base.googleAnalytics/) Fixed an issue that caused an error when attempting to sort with no data present.
* [Microsoft SQL:](/workflow/integrations/nodes/n8n-nodes-base.microsoftSQL/) Fixed an issue when escaping single quotes and mapping empty fields.
* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Fixed an issue with pagination of databases and users.

### Contributors 
[calvintwr](https://github.com/calvintwr), [Jan Baykara](https://github.com/janbaykara)

## n8n@0.125.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.124.1...n8n@0.125.0) for this version.<br />
**Release date:** 2021-06-20

### Enhanced nodes 

* [Spotify:](/workflow/integrations/nodes/n8n-nodes-base.spotify/) Added Search operation to Album, Artist, Playlist, and Track resources, and Resume and Volume operations to Player resource.

### Core Functionality 
- Implemented new design of the Nodes Panel, adding categories and subcategories, along with improved search. For full details, see the [commits](https://github.com/n8n-io/n8n/commit/0470740737c5ee199447a68b7277c43be2042976).

### Bug fixes 

* [MySQL:](/workflow/integrations/nodes/n8n-nodes-base.mySql/) Fixed an issue where Doc² was unable to save data due to collation, resulting in workflows ending with Unknown status.

### Contributors 
[Amudhan Manivasagam](https://github.com/smamudhan), [Carlos Alexandro Becker](https://github.com/caarlos0), [Kaito Udagawa](https://github.com/umireon)

## n8n@0.124.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.124.0...n8n@0.124.1) for this version.<br />
**Release date:** 2021-06-16

### Core Functionality 
- Improved error log messages
- Fixed an issue where the tags got removed when deactivating the workflow or updating settings
- Removed the circular references for the error caused by the request library

## n8n@0.124.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.123.1...n8n@0.124.0) for this version.<br />
**Release date:** 2021-06-13

### Enhanced nodes 

* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Added APP Properties and Properties options to the Upload operation of the File resource
* [HTTP Request:](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) Added the functionlaity to log the request to the browser console for testing
* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Added the Include Time parameter date field types
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Upsert operation to Account, Contact, Custom Object, Lead, and Opportunity resources
* [Todoist:](/workflow/integrations/nodes/n8n-nodes-base.todoist/) Added the Description option to the Task resource

### Core Functionality 
- Implemented the functionality to display the error details in a toast message for trigger nodes
- Improved error handling by removing circular references from API errors

### Bug fixes 

* [Jira:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Fixed an issues with the API version and fixed an issue with fetching the custom fields for the Issue resource

### Contributors 

[Jean M](https://github.com/jemos), [romaincolombo-daily](https://github.com/romaincolombo-daily), [Thomas Jost](https://github.com/Schnouki), [Vincent](https://github.com/vbouchet31)

## n8n@0.123.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.123.0...n8n@0.123.1) for this version.<br />
**Release date:** 2021-06-06

### Core Functionality 
- Fixed a build issue for missing node icons

## n8n@0.123.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.3...n8n@0.123.0) for this version.<br />
**Release date:** 2021-06-06

### New nodes 

* [Git](/workflow/integrations/core-nodes/n8n-nodes-base.git/)
* [Microsoft To Do](/workflow/integrations/nodes/n8n-nodes-base.microsoftToDo/)

### Enhanced nodes 

* [Pipedrive:](/workflow/integrations/nodes/n8n-nodes-base.pipedrive/) Added a feature to fetch data from the Pipedrive API, added Search operation to the Deals resource, and added custom fields option
* [Spotify:](/workflow/integrations/nodes/n8n-nodes-base.spotify/) Added My Data resource

### Core Functionality 
- Fixed issues with NodeViewNew navigation handling
- Fixed an issue with the view crashing with large requests

### Bug fixes 

* [ASW Transcribe:](/workflow/integrations/nodes/n8n-nodes-base.awsTranscribe/) Fixed issues with options

### Contributors 

[Rodrigo Correia](https://github.com/rodrigoscdc), [Sam Roquitte](https://github.com/samr28)

## n8n@0.122.3
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.2...n8n@0.122.3) for this version.<br />
**Release date:** 2021-06-04

### Core Functionality 
- Fixed error messages for the Textarea field
- Added the missing winston dependency
- Fixed an issue with adding values via the Variable selector. The deleted values don't reappear
- Fixed an issue with the Error Workflows not getting executed in the queue mode

### Bug fixes 

* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Fixed an issue with parsing the last edited time

## n8n@0.122.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.1...n8n@0.122.2) for this version.<br />
**Release date:** 2021-05-31

### Enhanced nodes 

* [Function:](/workflow/integrations/core-nodes/n8n-nodes-base.function/) Added console.log support for writing to browser console
* [Function Item:](/workflow/integrations/core-nodes/n8n-nodes-base.functionItem/) Added console.log support for writing to browser console

### Core Functionality 
- Fixed an issue that enables clicks on tags
- Fixed an issue with escaping workflow name
- Fixed an issue with selecting variables in the Expression Editor

## n8n@0.122.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.0...n8n@0.122.1) for this version.<br />
**Release date:** 2021-05-30

### Core Functionality 
- Fixed an issue with the order in migration rollback

## n8n@0.122.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.121.0...n8n@0.122.0) for this version.<br />
**Release date:** 2021-05-30

### New nodes 

* [AWS Transcribe](/workflow/integrations/nodes/n8n-nodes-base.awsTranscribe/)
* [SSH](/workflow/integrations/core-nodes/n8n-nodes-base.ssh/)
* [UptimeRobot](/workflow/integrations/nodes/n8n-nodes-base.uptimeRobot/)

### Enhanced nodes 

* [DeepL:](/workflow/integrations/nodes/n8n-nodes-base.deepL/) Added support for Free API
* [Function:](/workflow/integrations/core-nodes/n8n-nodes-base.function/) Added the functionality to log console.log messages to the browser console
* [Function Item:](/workflow/integrations/core-nodes/n8n-nodes-base.functionItem/) Added the functionality to log console.log messages to the browser console

### Core Functionality 
- Changed `bcrypt` library from `@node-rs/bcrypt` to `bcryptjs`
- Fixed an issue with optional parameters that have the same name
- Added the functionality to tag workflows
- Fixed errors in the Expression Editor
- Fixed an issue with nodes that only get connected to the second input. This solves the issue of copying and pasting the workflows where only one output of the IF node gets connected to a node

### Bug fixes 

* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Fixed an issue with the Drive resource
* [Notion:](/workflow/integrations/nodes/n8n-nodes-base.notion/) Fixed an issue with the filtering fields type and fixed an issue with the link option
* [Switch:](/workflow/integrations/core-nodes/n8n-nodes-base.switch/) Fixed an issue with the Expression mode

### Contributors 

[Alexander Mustafin](https://github.com/sashker)

## n8n@0.121.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.121.0...n8n@0.121.1) for this version.<br />
**Release date:** 2021-06-01

### Core Functionality 
- Fixed an issue with copying the output values
- Fixed issues with the Expression Editor
- Made improvements to the Expression Editor

## n8n@0.121.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.120.0...n8n@0.121.0) for this version.<br />
**Release date:** 2021-05-20

### New nodes 

* [Notion](/workflow/integrations/nodes/n8n-nodes-base.notion/)
* [Notion Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.notionTrigger/)

### Enhanced nodes 

* [GraphQL:](/workflow/integrations/core-nodes/n8n-nodes-base.graphql/) Added Header Auth authentication method
* [Twilio:](/workflow/integrations/nodes/n8n-nodes-base.twilio/) Added API Key authentication method

### Bug fixes 

* [HubSpot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Fixed an issue with pagination for Deals resource
* [Keap:](/workflow/integrations/nodes/n8n-nodes-base.keap/) Fixed an issue with the data type of the Order Title field
* [Orbit:](/workflow/integrations/nodes/n8n-nodes-base.orbit/) Fixed an issue with the activity type in Post operation
* [Slack:](/workflow/integrations/nodes/n8n-nodes-base.slack/) Fixed an issue with the Get Profile operation
* [Strava:](/workflow/integrations/nodes/n8n-nodes-base.strava/) Fixed an issue with the paging parameter

### Contributors 

[Jacob Spizziri](https://github.com/jspizziri)

## n8n@0.120.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.119.0...n8n@0.120.0) for this version.<br />
**Release date:** 2021-05-17

### New nodes 

* [iCalendar](/workflow/integrations/core-nodes/n8n-nodes-base.iCal/)

### Enhanced nodes 

* [Google Cloud Firestore:](/workflow/integrations/nodes/n8n-nodes-base.googleCloudFirestore/) Added the functionality for GeoPoint parsing and added ISO-8601 format for date validation
* [IMAP Email:](/workflow/integrations/core-nodes/n8n-nodes-base.imapEmail/) Added the Force reconnect option
* [Paddle:](/workflow/integrations/nodes/n8n-nodes-base.paddle/) Added the Use Sandbox environment API parameter
* [Spotify:](/workflow/integrations/nodes/n8n-nodes-base.spotify/) Added the Position parameter to the Add operation of the Playlist resource
* [WooCommerce:](/workflow/integrations/nodes/n8n-nodes-base.wooCommerce/) Added the Include Credentials in Query parameter

### Core Functionality 
- Added await to hooks to fix issues with the `Unknown` status of the workflows
- Changed the data type of the `credentials_entity` field for MySQL database to fix issues with long credentials
- Fixed an issue with the ordering of the executions when the list is auto-refreshed
- Added the functionality that allows reading sibling parameters

### Bug fixes 

* [Clockify Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.clockifyTrigger/) Fixed an issue that occurred when the node returned an empty array
* [Google Cloud Firestore:](/workflow/integrations/nodes/n8n-nodes-base.googleCloudFirestore/) Fixed an issue with parsing empty document, and an issue with the detection of date
* [HubSpot:](/workflow/integrations/nodes/n8n-nodes-base.hubspot/) Fixed an issue with the Return All option

### Contributors 

[DeskYT](https://github.com/DeskYT), [Daniel Lazaro](https://github.com/1izardo), [DerEnderKeks](https://github.com/DerEnderKeks), [mdasmendel](https://github.com/mdasmendel)

## n8n@0.119.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.118.1...n8n@0.119.0) for this version.<br />
**Release date:** 2021-05-09

### Enhanced nodes 

* [AWS Comprehend:](/workflow/integrations/nodes/n8n-nodes-base.awsComprehend/) Added the Detect Entities operation
* [AWS Lambda:](/workflow/integrations/nodes/n8n-nodes-base.awsLambda/) Added the ability to list functions recursively if the number of functions exceeds 50
* [Google Analytics:](/workflow/integrations/nodes/n8n-nodes-base.googleAnalytics/) Added pagination to the Report resource
* [Mailjet:](/workflow/integrations/nodes/n8n-nodes-base.mailjet/) Added Reply To parameter
* [Redis:](/workflow/integrations/nodes/n8n-nodes-base.redis/) Added the Increment operation
* [Spreadsheet File:](/workflow/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/) Added the Header Row option
* [Webflow Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.webflowTrigger/) Added Collection Item Created, Collection Item Updated, and Collection Item Deleted events

### Core Functionality 
- Implemented timeout for subworkflows
- Removed the deregistration webhooks functionality from the webhook process

### Bug fixes 

* [Google Cloud Firestore:](/workflow/integrations/nodes/n8n-nodes-base.googleCloudFirestore/) Fixed an issue with parsing null value
* [Google Sheets:](/workflow/integrations/nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Key Row parameter
* [HubSpot:](/workflow/integrations/nodes/n8n-nodes-base.zohoCrm/) Fixed an issue with the authentication

### Contributors 

[Nikita](https://github.com/Rirush)


## n8n@0.118.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.118.0...n8n@0.118.1) for this version.<br />
**Release date:** 2021-05-05

### Core Functionality 

- Fixed an issue with error workflows

## n8n@0.118.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.117.0...n8n@0.118.0) for this version.<br />
**Release date:** 2021-05-02

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01180).
    The features that introduced the breaking changes have been flagged below.


### New nodes 

* [Kitemaker](/workflow/integrations/nodes/n8n-nodes-base.kitemaker/)
* [MQTT](/workflow/integrations/nodes/n8n-nodes-base.mqtt/)

### Enhanced nodes 

* [CrateDB:](/workflow/integrations/nodes/n8n-nodes-base.crateDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [ERPNext:](/workflow/integrations/nodes/n8n-nodes-base.erpNext/) Added support for self-hosted ERPNext instances
* [FTP:](/workflow/integrations/core-nodes/n8n-nodes-base.ftp/) Added the functionality to delete folders
* [Google Calendar:](/workflow/integrations/nodes/n8n-nodes-base.googleCalendar/) Added the Continue on Fail functionality
* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Added the functionality to add file name when downloading files
* [Gmail:](/workflow/integrations/nodes/n8n-nodes-base.gmail/) Added functionality to handle multiple binary properties
* [Microsoft Outlook:](/workflow/integrations/nodes/n8n-nodes-base.microsoftOutlook/) Added Is Read and Move option to the Message resource
* [Postgres:](/workflow/integrations/nodes/n8n-nodes-base.postgres/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [QuestDB:](/workflow/integrations/nodes/n8n-nodes-base.questDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [QuickBase:](/workflow/integrations/nodes/n8n-nodes-base.quickbase/) Added option to use Field IDs
* [TimescaleDB:](/workflow/integrations/nodes/n8n-nodes-base.timescaleDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [Twist:](/workflow/integrations/nodes/n8n-nodes-base.twist/) Added Get, Get All, Delete, and Update operations to the Message Conversation resource. Added Archive, Unarchive, and Delete operations to the Channel resource. Added Thread and Comment resource

### Core Functionality 
- Implemented the native `fs/promise` library where possible
- Added the functionality to output logs to the console or a file
- We have updated the minimum required version for Node.js to v14.15. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01180) page

### Bug fixes 

* [GetResponse Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.getResponseTrigger/) Fixed an issue with error handling
* [GitHub Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.githubTrigger/) Fixed an issue with error handling
* [GitLab Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.gitlabTrigger/) Fixed an issue with error handling
* [Google Sheets:](/workflow/integrations/nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Lookup operation for returning empty rows
* [Orbit:](/workflow/integrations/nodes/n8n-nodes-base.orbit/) Fixed issues with the Post resource
* [Redis:](/workflow/integrations/nodes/n8n-nodes-base.redis/) Fixed an issue with the node not returning an error
* [Xero:](/workflow/integrations/nodes/n8n-nodes-base.xero/) Fixed an issue with the Create operation for the Contact resource

### Contributors 

[Gustavo Arjones](https://github.com/arjones), [lublak](https://github.com/lublak), [Colton Anglin](https://github.com/Colton), [Mika Luhta](https://github.com/mluhta)


## n8n@0.117.0 
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.116.1...n8n@0.117.0) for this version.<br />
**Release date:** 2021-04-24

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170).
    The features that introduced the breaking changes have been flagged below.


### New nodes 

* [Mailcheck](/workflow/integrations/nodes/n8n-nodes-base.mailcheck/)
* [n8n Trigger](/workflow/integrations/core-nodes/n8n-nodes-base.n8nTrigger/)
* [Workflow Trigger](/workflow/integrations/core-nodes/n8n-nodes-base.workflowTrigger/)

### Enhanced nodes 

* [CrateDB:](/workflow/integrations/nodes/n8n-nodes-base.crateDb/) Added the Mode option that allows you to execute queries as transactions
* [Nextcloud:](/workflow/integrations/nodes/n8n-nodes-base.nextcloud/) Added Delete, Get, Get All, and Update operation to the User resource
* [Postgres:](/workflow/integrations/nodes/n8n-nodes-base.postgres/) Added the Mode option that allows you to execute queries as transactions
* [QuestDB:](/workflow/integrations/nodes/n8n-nodes-base.questDb/) Added the Mode option that allows you to execute queries as transactions
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Added Owner option to the Case and Lead resources. Added custom fields to Create and Update operations of the Case resource
* [Sentry.io:](/workflow/integrations/nodes/n8n-nodes-base.sentryIo/) Added Delete and Update operations to Project, Release, and Team resources
* [TimescaleDB:](/workflow/integrations/nodes/n8n-nodes-base.timescaleDb/) Added the Mode option that allows you to execute queries as transactions
* [Zendesk Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.zendeskTrigger/) Added support to retrieve custom fields

### Core Functionality 
- The Activation Trigger node has been deprecated. It has been replaced by two new nodes - the Doc² Trigger and the Workflow Trigger node. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page
- Added the functionality to open the New Credentials dropdown by default

### Bug fixes 

* [Google Sheets:](/workflow/integrations/nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Lookup operation for returning multiple empty rows
* [Intercom:](/workflow/integrations/nodes/n8n-nodes-base.intercom/) Fixed an issue with the User operation in the Company resource
* [Mautic:](/workflow/integrations/nodes/n8n-nodes-base.mautic/) Fixed an issue with sending the lastActive parameter

### Contributors 

[Bart Vollebregt](https://github.com/bartvollebregt), [Ivan Timoshenko](https://github.com/bugagashenkj), [Konstantin Nosov](https://github.com/nosovk), [lublak](https://github.com/lublak), [Umair Kamran](https://github.com/UmairKamran),

## n8n@0.116.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.116.0...n8n@0.116.1) for this version.<br />
**Release date:** 2021-04-20

### Core Functionality 
- Fixed a timeout issue with the workflows in the main process

## n8n@0.116.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.115.0...n8n@0.116.0) for this version.<br />
**Release date:** 2021-04-17

### New nodes 

* [Google BigQuery](/workflow/integrations/nodes/n8n-nodes-base.googleBigQuery/)
* [Webflow](/workflow/integrations/nodes/n8n-nodes-base.webflow/)

### Enhanced nodes 

* [Date & Time:](/workflow/integrations/core-nodes/n8n-nodes-base.dateTime/) Added Calculate a Date action that allows you to add or subtract time from a date
* [GitLab:](/workflow/integrations/nodes/n8n-nodes-base.gitlab/) Added Get, Get All, Update, and Delete operations to the Release resource
* [Microsoft OneDrive:](/workflow/integrations/nodes/n8n-nodes-base.microsoftOneDrive/) Added Delete operation to the Folder resource
* [Monday:](/workflow/integrations/nodes/n8n-nodes-base.mondayCom/) Added support for OAuth2 authentication
* [MongoDB:](/workflow/integrations/nodes/n8n-nodes-base.mongoDb/) Added Limit, Skip, and Sort options to the Find operation and added Upsert parameter to the Update operation. Added the functionality to close the connection after use
* [MySQL:](/workflow/integrations/nodes/n8n-nodes-base.mySql/) Added support for insert modifiers and added support for SSL
* [RabbitMQ:](/workflow/integrations/nodes/n8n-nodes-base.rabbitmq/) Added the functionality to close the connection after use and added support for AMPQS

### Core Functionality 

- Changed `bcrypt` library from `bcryptjs` to `@node-rs/bcrypt`
- Improved node error handling. Status codes and error messages in API responses have been standardized
- Added global timeout setting for all HTTP requests (except HTTP Request node)
- Implemented timeout for workers and corrected timeout for sub workflows

### Bug fixes 

* [AWS SQS:](/workflow/integrations/nodes/n8n-nodes-base.awsSqs/) Fixed an issue with API version and casing
* [IMAP:](/workflow/integrations/core-nodes/n8n-nodes-base.imapEmail/) Fixed re-connection issue
* [Keap:](/workflow/integrations/nodes/n8n-nodes-base.keap/) Fixed an issue with the Opt In Reason parameter
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fixed an issue with loading custom fields

### Contributors 

[Allan Daemon](https://github.com/AllanDaemon), [Anton Romanov](https://github.com/theone74), [Bart Vollebregt](https://github.com/bartvollebregt), [Cassiano Vailati](https://github.com/cassvail), [entrailz](https://github.com/entrailz), [Konstantin Nosov](https://github.com/nosovk), [LongYinan](https://github.com/Brooooooklyn)

## n8n@0.115.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.114.0...n8n@0.115.0) for this version.<br />
**Release date:** 2021-04-10

### New nodes 

* [Google Slides](/workflow/integrations/nodes/n8n-nodes-base.googleSlides/)

### Enhanced nodes 

* [GitHub:](/workflow/integrations/nodes/n8n-nodes-base.github/) Added Release resource
* [TheHive:](/workflow/integrations/nodes/n8n-nodes-base.theHive/) Added support to fetch observable data types
* [RabbitMQ:](/workflow/integrations/nodes/n8n-nodes-base.rabbitmq/) Added header parameters

### Core Functionality 

- Fixed an issue with expressions not being displayed in read-only mode
- Fixed an issue that didn't allow editing JavaScript code in read-only mode
- Added support for configuring the maximum payload size
- Added support to dynamically add menu items

### Bug fixes 

* [Jira:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Fixed an issue with loading issue types with classic project type
* [RabbitMQ Trigger:](/workflow/integrations/trigger-nodes/n8n-nodes-base.rabbitmqTrigger/) Fixed an issue with the node reusing the same item
* [SendGrid:](/workflow/integrations/nodes/n8n-nodes-base.sendGrid/) Fixed an issue with the dynamic field generation

### Contributors 

[Mika Luhta](https://github.com/mluhta), [Loran](https://github.com/loranmutafov), [stwonary](https://github.com/stwonary)

## n8n@0.114.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.113.0...n8n@0.114.0) for this version.<br />
**Release date:** 2021-04-03

### New nodes 

* [AWS SQS](/workflow/integrations/nodes/n8n-nodes-base.awsSqs/)
* [Copper](/workflow/integrations/nodes/n8n-nodes-base.copper/)
* [ERPNext](/workflow/integrations/nodes/n8n-nodes-base.erpNext/)
* [Oura](/workflow/integrations/nodes/n8n-nodes-base.oura/)

### Enhanced nodes 

* [Google Drive:](/workflow/integrations/nodes/n8n-nodes-base.googleDrive/) Added support for creating folders for shared drives
* [Google Sheets:](/workflow/integrations/nodes/n8n-nodes-base.googleSheets/) Added Create and Remove operation to the Sheet resource
* [Harvest:](/workflow/integrations/nodes/n8n-nodes-base.harvest/) Added Update operation to the Task resource
* [Jira:](/workflow/integrations/nodes/n8n-nodes-base.jira/) Added Reporter field to the Issue resource
* [Postgres:](/workflow/integrations/nodes/n8n-nodes-base.postgres/) Added support for type casting

### Core Functionality 

- Fixed an issue with the Redis connection to prevent memory leaks

### Bug fixes 

* [Bitwarden:](/workflow/integrations/nodes/n8n-nodes-base.bitwarden/) Fixed an issue with the Update operation of the Group resource
* [Cortex:](/workflow/integrations/nodes/n8n-nodes-base.cortex/) Fixed an issue where only the last item got returned
* [Invoice Ninja:](/workflow/integrations/nodes/n8n-nodes-base.invoiceNinja/) Fixed an issue with the Project parameter
* [Salesforce:](/workflow/integrations/nodes/n8n-nodes-base.salesforce/) Fixed an issue with the Get All operation of the Custom Object resource

### Contributors 

[Agata M](https://github.com/curryy), [Allan Daemon](https://github.com/AllanDaemon), [Craig McElroy](https://github.com/camcelroy), [mjysci](https://github.com/mjysci)

## n8n@0.113.0 
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

## n8n@0.111.0 
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
- Added the functionality to expose metrics to Prometheus. Read more about that [here](/hosting/configuration/#prometheus)
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
- Doc² now generates a unified execution ID instead of two separate IDs for currently running and saved executions

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

## n8n@0.104.0 
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
- Added CLI commands to [export](/reference/cli-commands/#export-workflows-and-credentials) and [import](/reference/cli-commands/#import-workflows-and-credentials) credentials and workflows
- The title in the browser tab now resets for new workflows


## n8n@0.102.0 
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
- Harvest: Moved the account field from the credentials to the node parameters. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#0950) page
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
- Improved support for touch devices
- Node properties now load on demand
- Updated the Node.js version for the Docker images


## n8n@0.90.0 
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
- Passwords for your Doc² instance can now be hashed

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
- Add rawBody to every request so that Doc² does not give an error if body is missing

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
- Enhanced support for [JWT based authentication](/hosting/security/#jwt)
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
- It is now possible to deploy Doc² under a subfolder


## n8n@0.70.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.69.1...n8n@0.70.0) for this version.<br />
**Release date:** 2020-06-13

- Enhanced nodes
- GitHub
- Mautic Trigger
- Monday.com
- MongoDB
- Fixed the issue with multiuser-setup
