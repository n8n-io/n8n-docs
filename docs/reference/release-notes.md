# Release notes

## n8n@0.194.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.5...n8n@0.194.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-09-15

This release includes new nodes: a Gmail trigger, Google Cloud Storage, and Adalo. It also contains major overhauls of the Gmail and Merge nodes.

### New features

* CLI: load all nodes and credentials code in isolation.
* Core, Editor UI: introduce support for node deprecation.
* Editor: implement HTML sanitization for Notification and Message components.
* Editor: display the input number on multi-input nodes.

### New nodes

<div class="n8n-new-features" markdown>

#### Adalo

Adalo is a low code app builder. Refer to our [Adalo node documentation](/integrations/builtin/app-nodes/n8n-nodes-base.adalo/) for more information.

</div>

<div class="n8n-new-features" markdown>

#### Google Cloud Storage

n8n now has a [Google Cloud Storage node](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudStorage/). 

</div>

<div class="n8n-new-features" markdown>

#### Gmail Trigger

n8n now has a [Gmail trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailTrigger/). This allows you to trigger workflows in response to a Gmail account receiving an email.

</div>


### Node enhancements

* Gmail node: this release includes an overhaul of the [Gmail node](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/), with updated resources and operations.
* Merge node: a major overhaul. Merge mode's have new names, and have been simplified. Refer to the [Merge node documentation](/integrations/builtin/core-nodes/n8n-nodes-base.merge/) to learn more.
* MongoDB node: updated the Mongo driver to 4.9.1.


### Bug fixes

* CLI: core: address Dependabot warnings.
* CLI: avoid scanning unnecessary directories on Windows.
* CLI: load nodes and directories on Windows using the correct file path.
* CLI: ensure password reset triggers internal and external hooks.
* CLI: use absolute paths for loading custom nodes and credentials.
* Core: returnJsonArray helper no longer breaks nodes that return no data.
* Core: fix an issue with node renaming and expressions.
* Core: update OAuth endpoints to use the instance base URL.
* Nodes: resolved an issue that was preventing versioned nodes from loading.
* Public API: better error handling for bad requests.
* AWS nodes: fixed an issue with credentials testing.
* GoogleBigQuery node: fix for empty responses when creating records.
* Hubspot node: correct the node name on the canvas.

### Contributors

[Rhys Williams](https://github.com/rhyswilliamsza){:target=_blank .external-link}

## n8n@0.193.5

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.4...n8n@0.193.5){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-09-07

This is a bug fix release.

### Bug fixes

* Editor: prevent editing in the Function nodes in executions view.
* Editor: ensure button widths are correct.
* Editor: fix a popup title.
* Gmail node: fix an issue introduced due to incorrect automatic data formatting.

## n8n@0.193.4

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.3...n8n@0.193.4){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-09-06

This release contains new features that lay the groundwork for upcoming releases, and bug fixes.

### New features

* It's now possible to configure the stop time for workers.
* CLI: Added external hooks for when members are added or deleted.
* Editor: Use the i18n component for localization (replacing v-html)

### Bug fixes


* CLI: include "auth-excluded" endpoints on the history middleware as well.
* Core: fix MySQL migration issue with table prefix.
* Correct spelling.
* Fix n8n-square-button import.
* AWS nodes: handle query string and body properly for AWS related requests.
* AWS Lambda node: fix JSON data being sent to AWS Lambda as string.
* Beeminder node: fix request ID not being sent when creating a new data point.
* GitHub node: fix binary data not being returned.
* GraphQL node: fix issue with return items.
* Postgres node: fix issue with Postgres insert and paired item.
* Kafka trigger node: fix Kafka trigger not working with default max requests value.
* MonicaCrm node: fix pagination when using return all.
* Gmail node: fix bug related to paired items.
* Raindrop node: fix issue refreshing OAuth2 credentials.
* Shopify node: fix pagination when empty fields are sent.

### Contributors

[Aaron Delasy](https://github.com/delasy){:target=_blank .external-link}  
[ruanjiefeng](https://github.com/ruanjf){:target=_blank .external-link}


## n8n@0.193.3

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.2...n8n@0.193.3){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-09-01

This release contains bug fixes and node enhancements.

### Node enhancements

MongoDB node: add credential testing and two new operations.

### Bug fixes

* CLI: only initialize the mailer if the connection can be verified.
* Core: fix an issue with disabled parent outputs in partial executions.
* Nodes: remove duplicate wrapping of paired item data.


## n8n@0.193.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.1...n8n@0.193.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-09-01

This is a bug fix release. It resolves an issue that was causing errors with OAuth2 credentials.

## n8n@0.193.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.193.0...n8n@0.193.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-31

This is a bug fix release. It resolves an issue that was preventing column headings from displaying correctly in the editor.

## n8n@0.193.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.192.2...n8n@0.193.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-31

This release contains a new node, feature enhancements, and bug fixes.

### New nodes

This release adds an integration for [HighLevel](/integrations/builtin/app-nodes/n8n-nodes-base.highLevel/), an all-in-one sales and marketing platform.

### Enhancements

* Docker: reduce the size of Alpine Docker images.
* Editor: improve mapping tooltip behavior.

### Bug fixes

* Core: make digest auth work with query parameters.
* Editor: send data as query on DELETE requests.
* Fix credentials_entity table migration for MySQL.
* Improve `.npmignore` to reduce the size of the published packages.

### Contributors

[pemontto](https://github.com/pemontto){:target=_blank .external-link}  
[Tzachi Shirazi](https://github.com/TzachiSh){:target=_blank .external-link}

## n8n@0.192.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.192.1...n8n@0.192.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-25

This is a bug fix release.

### Bug fixes

* Editor: fix the feature flag check when PostHog is unavailable.
* Editor: fix for a mapping bug that occured when value is null.

## n8n@0.192.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.192.0...n8n@0.192.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-25

This is a bug fix release.

### Bug fixes

Account for non-array types in `pinData` migration.

## n8n@0.192.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.191.1...n8n@0.192.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-24

This release contains new features and enhancements, as well as bug fixes.

### New features

<div class="n8n-new-features" markdown>

#### Map nested fields

n8n@0.187.0 saw the first release of [data mapping](/data/data-mapping/), allowing you to drag and drop top level data from a node's **INPUT** panel into parameter fields. With this release, you can now drag and drop data from any level.

</div>

* Core and editor: support `pairedItem` for pinned data.
* Core and editor: integrate PostHog.
* Core: add a command to scripts making it easier to launch n8n with tunnel.
* CLI: notify external hooks about user profile and password changes.

### Bug fixes

* Core: account for the enabled state in the first pinned trigger in a workflow.
* Core: fix pinned trigger execution.
* CLI: handle unparseable strings during JSON key migration.
* CLI: fix the excessive instantiation type error for flattened executions.
* CLI: initiate the nodes directory to ensure `npm install` succeeds.
* CLI: ensure tsc build errors also cause Turbeorepo builds to fail.
* NextCloud node: fix an issue with credential verification.
* Freshdesk node: fix an issue where the getAll operation required non-existant options.

## n8n@0.191.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.191.0...n8n@0.191.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-19

This is a bug fix release. It resolves an issue that was causing node connectors to disappear after a user renamed them.

## n8n@0.191.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.190.0...n8n@0.191.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-17

This release lays the groundwork for wider community nodes support. It also includes some bug fixes.

### New features

* Community nodes are now enabled based on npm availability on the host system. This allows n8n to introduce community nodes to the Desktop edition in a future release.
* Improved in-app guidance on mapping data.

### Bug fixes

* CLI: fix the community node tests on Postgres and MySQL.
* Core: fix an issue preventing child workflow executions from displaying.
* Editor: handle errors when opening settings and executions.
* Editor: improve expression and parameters performance.
* Public API: fix executions pagination for n8n instances using Postgres and MySQL.

## n8n@0.190.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.189.1...n8n@0.190.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-10

This is a bug fix release.

### Bug fixes

* Core: fix a crash caused by parallel calls to test webhooks.
* Core: fix an issue preventing static data being saved for poll triggers.
* Public API: fix a pagination issue.
* GitHub Trigger: typo fix.

### Contributors

[Nathan Poirier](https://github.com/nathan818fr){:target=_blank .external-link}


## n8n@0.189.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.189.0...n8n@0.189.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-05

This is a bug fix release.

### Bug fixes

Fixed an issue with MySQL and MariaDB migrations.

## n8n@0.189.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.188.0...n8n@0.189.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-08-03

This release includes a new node, Sendinblue, as well as bug fixes.

### New nodes

[Sendinblue node](/integrations/builtin/app-nodes/n8n-nodes-base.sendInBlue/) and Sendinblue trigger node: introducing our [Sendinblue](https://www.sendinblue.com/){:target=_blank .external-link} integration.

### Node enhancements

[NocoDB node](/integrations/builtin/app-nodes/n8n-nodes-base.nocoDb/): add support for v0.90.0+

### Bug fixes

* Editor: fix a label cut off.
* Fix an issue with saving workflows when tags are disabled.
* Ensure support for community nodes on Windows.

### Contributors

[mertmit](https://github.com/mertmit){:target=_blank .external-link}  
[Nicholas Penree](https://github.com/drudge){:target=_blank .external-link}

## n8n@0.188.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.187.2...n8n@0.188.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-27

This release contains a new node for Metabase, bug fixes, and node and product enhancements.

### New nodes

<div class="n8n-new-features" markdown>

#### Metabase

This release includes a new [Metabase node](/integrations/builtin/app-nodes/n8n-nodes-base.metabase/). [Metabase](https://www.metabase.com/){:target=_blank .external-link} is a business data analysis tool.

</div>

### Enhancements

This release includes improvements to n8n's core pairedItems functionality.

### Node enhancements

* [Item Lists node](/integrations/builtin/core-nodes/n8n-nodes-base.itemLists/): add an operation to create arrays from input items.
* [Kafka trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkaTrigger/): add more option fields.


### Bug fixes

* Core: add Windows support to `import:credentials --separate`.
* Editor: correct linking buttons color.
* Editor: ensure data pinning works as expected when `pinData` is null.
* Editor: fix a bug with spaces.
* Editor: resolve an issue with sticky note duplication and positioning.
* Editor: restore missing header colors.
* AWS DynamoDB node: fix for errors with expression attribute names.
* Mautic node: fix an authentication issue.
* Rocketchat node: fix an authentication issue.

### Contributors

[Nicholas Penree](https://github.com/drudge){:target=_blank .external-link}

## n8n@0.187.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.187.1...n8n@0.187.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-21

This is a bug fix release.

* Editor: fix for a console issue.
* Editor: fix a login issue for non-admin users.
* Editor: fix problems with the credentials modal that occured when no node is open.
* NocoDB node: fix for an authentication issue.

## n8n@0.187.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.187.0...n8n@0.187.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-20

This release fixes a bug that was preventing new nodes from reliably displaying in all browsers.

## n8n@0.187.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.186.1...n8n@0.187.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-20

This release includes several major new features, including:

* The community nodes repository: a new way to build and share nodes.
* Data pinning and data mapping: accelerate workflow development with better data manipulation functionality.

### New features

<div class="n8n-new-features" markdown>

#### Community nodes repository

This release introduces the [community node repository](/integrations/community-nodes/). This allows developers to build and share nodes as npm packages. Users can install community-built nodes directly in n8n.

</div>

<div class="n8n-new-features" markdown>

#### Data pinning

[Data pinning](/data/data-pinning/) allows you to freeze and edit data during workflow development. Data pinning means saving the output data of a node, and using the saved data instead of fetching fresh data in future workflow executions. This avoids repeated API calls when developing a workflow, reducing calls to external systems, and speeding up workflow development.

</div>

<div class="n8n-new-features" markdown>

#### Data mapping

This release introduces a drag and drop interface for [data mapping](/data/data-mapping/), as a quick way to map data without using expressions.

</div>

<div class="n8n-new-features" markdown>

#### Simplify authentication setup for node creators

This release introduces a simpler way of handling authorization when building a node. All credentials should now contain an `authenticate` property that dictates how the credential is used in a request.
n8n has also simplified authentication types: instead of specifying an authentication type and using the correct interface, you can now set the type as `"generic"`, and use the `IAuthenticateGeneric` interface.

You can use this approach for any authentication method where data is sent in the header, body, or query string. This includes methods like bearer and basic auth. You can't use this approach for more complex authentication types that require multiple calls, or for methods that don't pass authentication data. This includes OAuth.

For an example of the new authentication syntax, refer to n8n's [Asana node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/credentials/AsanaApi.credentials.ts){:target=_blank .external-link}.

```js
// in AsanaApi.credentials.ts
import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AsanaApi implements ICredentialType {
	name = 'asanaApi';
	displayName = 'Asana API';
	documentationUrl = 'asana';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};
}
```
</div>

#### Other new features

* Added a `preAuthentication` method to credentials.
* Added more credentials tests.
* Introduce automatic fixing for paired item information in some scenarios.

### Node enhancements

* [ERPNext node](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/): add credential tests, and add support for unauthorized certs.
* [Google Drive node](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/): add support for move to trash.
* [Mindee node](/integrations/builtin/app-nodes/n8n-nodes-base.mindee/): support new version.
* [Notion node](/integrations/builtin/app-nodes/n8n-nodes-base.notion/): support ignoring the Notion URL property if empty.
* [Shopify node](/integrations/builtin/app-nodes/n8n-nodes-base.shopify/): add OAuth support.

### Bug fixes

* API: add missing node settings parameters.
* API: validate static data value for resource workflow.
* Baserow Node: fix an issue preventing table names from loading.
* Editor: hide the **Execute previous node** button when in read-only mode.
* Editor: hide tabs if there's only one branch.
* Roundup of link fixes in nodes.

### Contributors

[Florian Bachmann](https://github.com/baflo){:target=_blank .external-link}
[Olivier Aygalenq](https://github.com/oaygalenq){:target=_blank .external-link}


## n8n@0.186.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.186.0...n8n@0.186.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-14

This is a bug fix release. It includes a fix for an issue with the Airtable node.

## n8n@0.186.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.185.0...n8n@0.186.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-13

This release contains bug fixes and node enhancements.

### New features

* Add item information to more node errors.
* Update multiple credentials with tests, and add support for custom operations.

### Node enhancements


* [AWS DynamoDB node](/integrations/builtin/app-nodes/n8n-nodes-base.awsDynamoDb/): improve error handling and add an optional GetAll Scan FilterExpression.
* [Customer.io node](/integrations/builtin/app-nodes/n8n-nodes-base.customerIo/): add support for tracking region selection.
* [Elasticsearch node](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch/): add 'Source Excludes' and 'Source Includes' options to the Document: getAll operation. Add credential tests, index pipelines, and index refresh.
* [Freshworks CRM node](/integrations/builtin/app-nodes/n8n-nodes-base.freshworksCrm/): add search and lookup functionality.
* [JIRA node](/integrations/builtin/trigger-nodes/n8n-nodes-base.jiraTrigger/): add optional query authentication.
* [Postgres node](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/): improve handling of large numbers.
* [Redis node](/integrations/builtin/app-nodes/n8n-nodes-base.redis/): add push and pop operations.
* [Rename node](/integrations/builtin/core-nodes/n8n-nodes-base.renameKeys/): add regex replace.
* [Spreadsheet file node](/integrations/builtin/core-nodes/n8n-nodes-base.spreadsheetFile/): allow skipping headers when writing spreadsheets.



### Bug fixes

* Editor: Fix an error that occured after repeated executions.
* [EmailReadImap node](/integrations/builtin/core-nodes/n8n-nodes-base.imapEmail/): improve handling of network problems.
* [Google Drive node](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/): process input items using the list operation.
* [Telegram node](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/): fix for a bug affecting sending binary data (images, documents and so on).

### Contributors

[Bryce Sheehan](https://github.com/ctrl-freak){:target=_blank .external-link}
[h4ux](https://github.com/h4ux){:target=_blank .external-link}
[miguel-mconf](https://github.com/miguel-mconf){:target=_blank .external-link}
[Nicholas Penree](https://github.com/drudge){:target=_blank .external-link}
[pemontto](https://github.com/pemontto){:target=_blank .external-link}
[Yann Jouanique](https://github.com/Yann-J){:target=_blank .external-link}

## n8n@0.185.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.184.0...n8n@0.185.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-07-05

This release adds a new node, Google Ads. It also contains bug fixes and node enhancements, as well as a small addition to core.

### New features

Core: add the `action` parameter to INodePropertyOptions. This parameter is now available when building nodes.

### New nodes

[Google Ads node](/integrations/builtin/app-nodes/n8n-nodes-base.googleAds/): n8n now provides a Google Ads node, allowing you to get data from Google Ad campaigns.

### Node enhancements

* [DeepL node](/integrations/builtin/app-nodes/n8n-nodes-base.deepL/): Add support for longer text fields, and add credentials tests.
* [Facebook Graph API node](/integrations/builtin/app-nodes/n8n-nodes-base.facebookGraphAPI/): Add support for Facebook Graph API 14.
* [JIRA node](/integrations/builtin/app-nodes/n8n-nodes-base.jira/): Add support for the simplified option with rendered fields.
* [Webflow trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowTrigger/): Reduce the chance of webhook duplication. Add a credentials test.
* [WordPress node](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/): Add a post template option.

### Bug fixes

* [HubSpot node](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/): Fix for search endpoints.
* [KoboToolbox node](/integrations/builtin/app-nodes/n8n-nodes-base.koBoToolbox/): Improve attachment matching logic and GeoJSON Polygon format.
* [Odoo node](/integrations/builtin/app-nodes/n8n-nodes-base.odoo/): Prevent possible issues with some custom fields.
* Sticky note node: Fix an issue that was causing the main header to hide.
* [Todoist node](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/): Improve multi-item support.

### Contributors

[cgobrech](https://github.com/cgobrech){:target=_blank .external-link}
[pemontto](https://github.com/pemontto){:target=_blank .external-link}
[Yann Jouanique](https://github.com/Yann-J){:target=_blank .external-link}
[Zapfmeister](https://github.com/Zapfmeister){:target=_blank .external-link}


## n8n@0.184.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.183.0...n8n@0.184.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-29

This release includes:

* New core features
* Enhancements to the Clockify node.
* Bug fixes.

### New features

* You can now access `getBinaryDataBuffer` in the pre-send method.
* n8n now exposes the item index being processed by a node.
* Migrated the expressions templating engine to [n8n's fork of riot-tmpl](https://github.com/n8n-io/tmpl){:target=_blank .external-link}.


### Node enhancements

[Clockify node](/integrations/builtin/app-nodes/n8n-nodes-base.clockify/): added three new resources: Client, User, and Workspace. Also added support for custom API calls.


### Bug fixes

* Core: fixed an error with logging circular links in JSON.
* Editor UI: now display the full text of long error messages.
* Editor UI: fix for an issue with credentials rendering when the node has no parameters.
* [Cortex node](/integrations/builtin/app-nodes/n8n-nodes-base.cortex/): fix an issue preventing all analyzers being returned.
* [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/): ensure all OAuth2 credentials work with this node.
* [LinkedIn node](/integrations/builtin/app-nodes/n8n-nodes-base.linkedIn/): fix an issue with image preview.
* [Salesforce node](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/): fix an issue that was causing the lead status to not use the new name when name is updated.
* Fixed an issue with required/optional parameters.

### Contributors

[pemontto](https://github.com/pemontto){:target=_blank .external-link}

## n8n@0.183.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.182.1...n8n@0.183.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-21

This release contains node enhancements and bug fixes, as well as an improved trigger nodes panel.

### New features

Enhancements to the **Trigger** inputs panel: When using a trigger node, you will now see an **INPUT** view that gives guidance on how to load data into your trigger.

### Node enhancements

* [HubSpot node](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot){:target=_blank}: you can now assign a stage on ticket update.
* [Todoist node](/integrations/builtin/app-nodes/n8n-nodes-base.todoist){:target=_blank}: it's now possible to move tasks between sections.
* [Twake node](/integrations/builtin/app-nodes/n8n-nodes-base.twake){:target=_blank}: updated icon, credential test added, and added support for custom operations.

### Bug fixes

* Core: don't allow OPTIONS requests from any source.
* Core: GET `/workflows/:id` now returns tags.
* Core: ensure predefined credentials show up in the HTTP Request node.
* Core: return the correct error message on Axios error.
* Core: updates to the expressions allow-list and deny-list.

### Contributors

[Bryce Sheehan](https://github.com/ctrl-freak){:target=_blank .external-link}
[Rahimli Rahim](https://github.com/rahimlis){:target=_blank .external-link}

## n8n@0.182.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.182.0...n8n@0.182.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-16

This is a bug fix release. It resolves an issue with restarting waiting executions.

## n8n@0.182.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.181.2...n8n@0.182.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-14

This release contains enhancements to the Twilio and Wise integrations, and adds support for a new grant type for OAuth2. It also includes some bug fixes.

### New features

Added support for the client_credentials grant type for OAuth2.

### Node enhancements

* [Twilio node](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/){:target=_blank}: added the ability to make a voice call using TTS.
* [Wise node](/integrations/builtin/app-nodes/n8n-nodes-base.wise/){:target=_blank}: added support for downloading statements as JSON, CSV, or PDF.

### Bug fixes

* Core: fixes an issue that was causing parameters to get lost in some edge cases.
* Core: fixes an issue with combined expressions not resolving if one expression was invalid.
* Core: fixed an issue that was causing the public API to fail to build on Windows.
* Editor: ensure errors display correctly.
* [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/){:target=_blank}: better handling for requests that return null.
* [Pipedrive node](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/){:target=_blank}: fixes a limits issue with the GetAll operation on the Lead resource.
* [Postbin node](/integrations/builtin/app-nodes/n8n-nodes-base.postbin/){:target=_blank}: remove a false error.

### Contributors

[Albrecht Schmidt](https://github.com/IamDrowsy){:target=_blank .external-link}
[Erick Friis](https://github.com/efriis){:target=_blank .external-link}
[JoLo](https://github.com/jolo-dev){:target=_blank .external-link}
[Shaun](https://github.com/simshaun){:target=_blank .external-link}
[Valentin Mocanu](https://github.com/rontav){:target=_blank .external-link}

## n8n@0.181.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.181.1...n8n@0.181.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-09

This is a bug fix release. It resolves an issue that was sometimes causing nodes to error when they didn't return data.

## n8n@0.181.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.181.0...n8n@0.181.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-09

This is a bug fix release. It fixes two issues with multi-input nodes.

## n8n@0.181.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.180.0...n8n@0.181.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-08

This release introduces the public API.

### New feature highlights

<div class="n8n-new-features" markdown>

#### The n8n public API

This release introduces the n8n public REST API. Using n8n's public API, you can programmatically perform many of the same tasks as you can in the GUI. The API includes a built-in Swagger UI playground. Refer to the [API documentation](/api/){:target=_blank} for more information.

</div>

### Other new features

* **Core**: you can now block user access to environment variables using the `N8N_BLOCK_ENV_ACCESS_IN_NODE` variable.

### Bug fixes

* **Core**: properly resolve expressions in declarative style nodes.

## n8n@0.180.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.179.0...n8n@0.180.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-06-07

This release adds a new node for Cal.com, support for tags in workflow import and export, UI improvements, node enhancements, and bug fixes.

### New features

<div class="n8n-new-features" markdown>

#### Tags in workflow import and export

When importing or exporting a workflow, the JSON can now include workflow tags.

</div>

<div class="n8n-new-features" markdown>

#### Improved handling of activation errors

n8n now supports running an error workflow in response to an activation error.

</div>

### New nodes

<div class="n8n-new-features" markdown>

#### Cal.com trigger

This release adds a new trigger node for Cal.com. Refer to the [Cal trigger documentation](/integrations/builtin/trigger-nodes/n8n-nodes-base.caltrigger/){:target=_blank} for more guidance.

</div>

### Node enhancements

* [GitHub node](/integrations/builtin/app-nodes/n8n-nodes-base.github/){:target=_blank}: add the Get All operation to the Organization resource.
* [QuickBooks node](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/){:target=_blank}: add a new optional field for tax items.

### Bug fixes

* Restore support for `window` in expressions.
* Fix to the `user-management:reset` command.
* Resolve crashes in queue mode.
* Correct delete button hover spacing.
* Resolve a bug causing stuck loading states.
* [EmailReadImap node](/integrations/core-nodes/n8n-nodes-base.imapEmail){:target=_blank}: improve error handling.
* [Hubspot node](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/){:target=_blank}: fix contact loading.

### Contributors

[Mark Steve Samson](https://github.com/marksteve){:target=_blank .external-link}
[Syed Ali Shahbaz](https://github.com/alishaz-polymath){:target=_blank .external-link}

## n8n@0.179.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.178.2...n8n@0.179.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-05-30

This release features a new node for PostBin, as well as various node enhancements and bug fixes.

### New nodes

<div class="n8n-new-features" markdown>

#### PostBin node

PostBin serves as a wrapper for standard HTTP libraries which can be used to test arbitrary API/Webhooks by sending requests and providing more advanced ways to analyze the responses.

</div>

### Node enhancements

* [RabbitMQ Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqTrigger/): Made message acknowledgement and parallel processing configurable.
* [ServiceNow node](/integrations/builtin/app-nodes/n8n-nodes-base.serviceNow/): Added support for attachments.
* [Todoist node](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/): Added support for specifying the parent task when adding and listing tasks.

### Bug fixes

* **Core**: Fixed migrations on non-public Postgres schema.
* **Core**: Mitigated possible XSS vulnerability when importing workflow templates.
* **Editor UI**: fixed erroneous hover state detection close to the sticky note button.
* **Editor UI**: fixed display behavior of credentials assigned to versioned nodes.
* [Discord node](/integrations/builtin/app-nodes/n8n-nodes-base.discord){:target=_blank}: Fixed rate limit handling.
* [Gmail node](/integrations/builtin/app-nodes/n8n-nodes-base.gmail){:target=_blank}: Fixed sending attachments in filesystem data mode.
* [Google Sheets node](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets){:target=_blank}: Fixed an error preventing the *Use Header Names as JSON Paths* option from working as expected.
* [Nextcloud node](/integrations/builtin/app-nodes/n8n-nodes-base.nextCloud){:target=_blank}: Updated the node so the list:folder operation works with Nextcloud version 24.
* [YouTube node](/integrations/builtin/app-nodes/n8n-nodes-base.youTube){:target=_blank}: Fixed problem with uploading large files.


## n8n@0.178.2

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.178.1...n8n@0.178.2){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-05-25

This is a bug fix release. It solves an issue with loading parameters when making custom operations calls.

## n8n@0.178.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.178.0...n8n@0.178.1){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-05-24

This is a bug fix release. It solves an issue with setting credentials in the HTTP Request node.

## n8n@0.178.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.177.0...n8n@0.178.0){:target=_blank .external-link} for this version.<br />
**Release date:** 2022-05-24

This release adds support for reusing existing credentials in the HTTP Request node, making it easier to do custom operation with APIs where n8n already has an integration.

The release also includes improvements to the nodes view, giving better detail about incoming data, as well as some bug fixes.

### New features

<div class="n8n-new-features" markdown>

#### Credential reuse for custom API operations

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this by making a custom API call using the HTTP Request node.

One of the most complex parts of setting up API calls is managing authentication. To simplify this, n8n now provides a way to use existential credential types (credentials associated with n8n nodes) in the HTTP Request node.

For more information, refer to [Custom API operations](/integrations/custom-operations/){:target=_blank}.

#### Node details view

An improved node view, showing more detail about node inputs.

</div>

### Node enhancements

[Salesforce Node](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce){:target=_blank}: Add the **Country** field.

### Bug fixes

* **Editor UI**: don't display the dividing line unless necessary.
* **Editor UI**: don't display the 'Welcome' sticky in template workflows.
* [Slack Node](/integrations/builtin/app-nodes/n8n-nodes-base.slack){:target=_blank}: Fix the kick operation for the channel resource.


## n8n@0.177.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.176.0...n8n@0.177.0){:target="_blank" .external-link} for this version.<br />
**Release date:** 2022-05-17

This release contains node enhancements, an improved welcome experience, and bug fixes.

### New features

<div class="n8n-new-features" markdown>

#### Improved welcome experience

A new [introductory video](https://youtu.be/RpjQTGKm-ok){:target="_blank" .external-link}, automatically displayed for new users.

#### Automatically convert Luxon dates to strings

n8n now automatically converts Luxon DateTime objects to strings.

</div>


### Node enhancements

* [Google Drive Node](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/){:target="_blank"}: Drive upload, delete, and share operations now support shared Drives.
* [Microsoft OneDrive](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/){:target="_blank"}: Add the rename operation for files and folders.
* [Trello](/integrations/builtin/app-nodes/n8n-nodes-base.trello/){:target="_blank"}: Add support for operations relating to board members.

### Bug fixes

* **core:** Fix call to `/executions-current` with unsaved workflow.
* **core:** Fix issue with fixedCollection having all default values.
* [Edit Image Node](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/){:target="_blank"}: Fix font selection.
* [Ghost Node](/integrations/builtin/app-nodes/n8n-nodes-base.ghost/){:target="_blank"}: Fix post tags and add credential tests.
* [Google Calendar Node](/integrations/builtin/app-nodes/n8n-nodes-base.googleCalendar/){:target="_blank"}: Make it work with public calendars and clean up.
* [KoBoToolbox Node](/integrations/builtin/app-nodes/n8n-nodes-base.koBoToolbox/){:target="_blank"}: Fix query and sort + use question name in attachments.
* [Mailjet Trigger Node](/integrations/builtin/app-nodes/n8n-nodes-base.mailjet/){:target="_blank"}: Fix issue that node couldn't get activated.
* [Pipedrive Node](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/){:target="_blank"}: Fix resolve properties when using multi option field.

### Contributors

[Cristobal Schlaubitz Garcia](https://github.com/CxGarcia){:target="_blank" .external-link}
[Yann Jouanique](https://github.com/Yann-J){:target="_blank" .external-link}

## n8n@0.176.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.175.1...n8n@0.176.0) for this version.<br />
**Release date:** 2022-05-10

This release contains bug fixes and node enhancements.

### Node enhancements

* [Pipedrive node](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/): adds support for filters to the Organization: Get All operation.
* [Pushover node](/integrations/builtin/app-nodes/n8n-nodes-base.pushover/): adds an HTML formatting option, and a credential test.
* [UProc node](/integrations/builtin/app-nodes/n8n-nodes-base.uproc/): adds new tools.

### Bug fixes

* **core**: a fix for filtering the executions list by waiting status.
* **core**: improved webhook error messages.
* [Edit Image node](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/): node now works correctly with the binary-data-mode 'filesystem'.

### Contributors

[Albert Kiskorov](https://github.com/Albatrosicks)
[Miquel Colomer](https://github.com/mcolomer)

## n8n@0.175.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.175.0...n8n@0.175.1) for this version.<br />
**Release date:** 2022-05-03

This is a bug fix release.

### Bug fixes

Fixes a bug in the editor UI related to node versioning.

## n8n@0.175.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.174.0...n8n@0.175.0) for this version.<br />
**Release date:** 2022-05-02

This release adds support for node versioning, along with node enhancements and bug fixes.



### New features

<div class="n8n-new-features" markdown>

#### Node versioning

0.175.0 adds support for a lightweight method of node versioning. One node can contain multiple versions, allowing small version increments without code duplication. To use this feature, change the `version` parameter in your node to an array, and add your version numbers, including your existing version. You can then access the version parameter with `@version` in your `displayOptions` (to control which version n8n displays). You can also query the version in your `execute` function using `const nodeVersion = this.getNode().typeVersion;`.

</div>

### Node enhancements

* [Google Sheets node](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/): n8n now handles header names formatted as JSON paths.
* [Microsoft Dynamics CRM node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftDynamicsCrm/): add support for regions other than North America.
* [Telegram node](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/): add support for querying chat administrators.

### Bug fixes

* **core**: fixed an issue that was causing n8n to apply authentication checks, even when user management was disabled.
* **core**: n8n now skips credentials checks for disabled nodes.
* **editor**: fix a bug affecting touchscreen monitors.
* [HubSpot node](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/): fix for search operators.
* [SendGrid node](/integrations/builtin/app-nodes/n8n-nodes-base.sendGrid/): fixed an issue with sending attachments.
* [Wise node](/integrations/builtin/app-nodes/n8n-nodes-base.wise/): respect the time parameter on `get: exchangeRate`.

### Contributors

[Jack Rudenko](https://github.com/erudenko)
[MC Naveen](https://github.com/mcnaveen)
[vcrwr](https://github.com/vcrwr)


## n8n@0.174.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.173.1...n8n@0.174.0) for this version.<br />
**Release date:** 2022-04-25

### New features

<div class="n8n-new-features" markdown>

#### Sticky Notes

This release adds Sticky Notes, a new feature that allows you to annotate and comment on your workflows. Refer to the [Sticky Notes](/workflows/sticky-notes/) for more information.
</div>

### Enhancements

* **core**: allow external OAuth connection. This enhancement adds support for connecting OAuth apps without access to n8n.
* All AWS nodes now support AWS temporary credentials.
* [Google Sheets node](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/): Added upsert support.
* [Microsoft Teams node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftTeams/): adds several enhancements:
    * An option to limit groups to "member of", rather than retrieving the whole directory.
    * An option to get all tasks from a plan instead of just a group member.
    * Autocompletion for plans, buckets, labels, and members in update fields for tasks.
* [MongoDB node](/integrations/builtin/app-nodes/n8n-nodes-base.mongoDb/): you can now parse dates using dot notation.

### Bug fixes


* [Calendly trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.calendlyTrigger/): updated the logo.
* [Microsoft OneDrive node](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/): fixed an issue that was preventing upload of files with special characters in the file name.
* [QuickBooks node](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/): fixed a pagination issue.

### Contributors

[Basit Ali](https://github.com/BasitAli)
[Cody Stamps](https://github.com/crstamps2)
[Luiz Eduardo de Oliveira](https://github.com/luizeof)
[Oliver Trajceski](https://github.com/SchnapsterDog)
[pemontto](https://github.com/pemontto)
[Ryan Goggin](https://github.com/Goggin)


## n8n@0.173.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.173.0...n8n@0.173.1) for this version.<br />
**Release date:** 2022-04-19

Fixes a bug with the Discord node icon name.

## n8n@0.173.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.172.0...n8n@0.173.0) for this version.<br />
**Release date:** 2022-04-19

### New nodes

<div class="n8n-new-features" markdown>

#### Markdown node

[Markdown node](/integrations/builtin/core-nodes/n8n-nodes-base.markdown/): added a new Markdown node to convert between Markdown and HTML.

</div>

### Enhancements

**editor**: you can now drag and drop nodes from the nodes panel onto the canvas.

### Node enhancements

* [Discord node](/integrations/builtin/app-nodes/n8n-nodes-base.discord/): additional fields now available when sending a message to Discord.
* [GoogleBigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googleBigQuery/): added support for service account authentication.
* [Google Cloud Realtime Database node](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudRealtimeDatabase/): you can now select a region.
* [PagerDuty node](/integrations/builtin/app-nodes/n8n-nodes-base.pagerDuty/): now supports more detail in incidents.
* [Slack node](/integrations/builtin/app-nodes/n8n-nodes-base.slack/): added support for blocks in Slack message update.

### Bug fixes

* **core**: make the email for user management case insensitive.
* **core**: add `rawBody` for XML requests.
* **editor**: fix a glitch that caused dropdowns to break after adding expressions.
* **editor**: reset text input value when closed with `Esc`.
* [Discourse node](/integrations/builtin/app-nodes/n8n-nodes-base.discourse/): fix an issue that was causing incomplete results when getting posts. Added a credentials test.
* [Zendesk trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.zendeskTrigger): remove deprecated targets, replace with webhooks.
* [Zoho node](/integrations/builtin/app-nodes/n8n-nodes-base.zohoCrm): fix pagination issue.

### Contributors

[Florian Metz](https://github.com/Timeraa)
[Francesco Pongiluppi](https://github.com/willywongi)
[Mark Steve Samson](https://github.com/marksteve)
[Mike Quinlan](https://github.com/mjquinlan2000)


## n8n@0.172.0

View the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.171.1...n8n@0.172.0) for this version.<br />
**Release date:** 2022-04-11

### Enhancements

* Changes to the data output display in nodes.

### Node enhancements
<br>
[Magento 2 Node:](/integrations/builtin/app-nodes/n8n-nodes-base.magento2/) Added credential tests.
[PayPal Node:](/integrations/builtin/app-nodes/n8n-nodes-base.payPal/) Added credential tests and updated the API URL.

### Bug fixes

**core**: Luxon now applies the correct timezone. Refer to [Luxon](/code-examples/expressions/luxon/) for more information.<br>
**core**: fixed an issue with localization that was preventing i18n files from loading.<br>
[Action Network Node:](/integrations/builtin/app-nodes/n8n-nodes-base.actionNetwork/) Fix a pagination issue and add credentials test.

### Contributors

[Paolo Rechia](https://github.com/paolo-rechia)

## n8n@0.171.1

View the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.171.0...n8n@0.171.1) for this version.<br />
**Release date:** 2022-04-06

This is a small bug fix release.

### Bug fixes

* **core**: fix issue with current executions not displaying.<br>
* **core**: fix an issue causing n8n to falsely skip some authentication.<br>
* [WooCommerce Node:](/integrations/builtin/app-nodes/n8n-nodes-base.wooCommerce) Fix a pagination issue with the GetAll operation.

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

* [Emelia Node:](/integrations/builtin/app-nodes/n8n-nodes-base.emelia/) Add Campaign > Duplicate functionality.
* [FTP Node:](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/) Add option to recursively create directories on rename.
* [Mautic Node:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Add credential test and allow trailing slash in host.
* [Microsoft Teams Node:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftteams/) Add chat message support.
* [Mocean Node:](/integrations/builtin/app-nodes/n8n-nodes-base.mocean/) Add 'Delivery Report URL' option and credential tests.
* [ServiceNow Node:](/integrations/builtin/app-nodes/n8n-nodes-base.serviceNow/) Add basicAuth support and fix getColumns loadOptions.
* [Strava Node:](/integrations/builtin/app-nodes/n8n-nodes-base.strava/) Add 'Get Streams' operation.


### Bug fixes

* **core:** Fix crash on webhook when last node did not return data
* [EmailReadImap Node:](/integrations/builtin/core-nodes/n8n-nodes-base.imapEmail/) Fix issue that crashed process if node was configured wrong.
* [Google Tasks Node:](/integrations/builtin/app-nodes/n8n-nodes-base.googleTasks/) Fix 'Show Completed' option and hide title field where not needed.
* [NocoDB Node:](/integrations/builtin/app-nodes/n8n-nodes-base.nocoDb/) Fix pagination.
* [Salesforce Node:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fix issue that 'status' did not get used for Case => Create & Update

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

* [Crypto Node:](/integrations/builtin/core-nodes/n8n-nodes-base.crypto/) Add Generate operation to generate random values.
* [HTTP Request Node:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Add support for OPTIONS method.
* [Jira Node:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Add Simplify Output option to Issue > Get.
* [Reddit Node:](/integrations/builtin/app-nodes/n8n-nodes-base.reddit/) Add possibility to query saved posts.
* [Zendesk Node:](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/) Add ticket status On-hold.

### Bug fixes

* **core:** Add logs and error catches for possible failures in queue mode.<br>
* [AWS Lambda Node:](/integrations/builtin/app-nodes/n8n-nodes-base.awslambda/) Fix Invocation Type > Continue Workflow.
* [Supabase Node:](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/) Send token also via Authorization Bearer; fix Row > Get operation.
* [Xero Node:](/integrations/builtin/app-nodes/n8n-nodes-base.xero/) Fix some operations and add support for setting address and phone number.
* [Wise Node:](/integrations/builtin/app-nodes/n8n-nodes-base.wise/) Fix issue when executing a transfer.

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

* [Linear Node:](/integrations/builtin/app-nodes/n8n-nodes-base.linear/) Add Linear Node.

### Enhanced nodes

* [HTTP Request Node:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Allow Delete requests with body.
* [KoBoToolbox Node:](/integrations/builtin/app-nodes/n8n-nodes-base.koBoToolbox/) Add KoBoToolbox Regular and Trigger Node.
* [Mailjet Node:](/integrations/builtin/app-nodes/n8n-nodes-base.mailjet/) Add credential tests and support for sandbox, JSON parameters & variables.
* [Mattermost Node:](/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/) Add support for Channel search.

### Other improvements

- Add support for reading IDs from file with executeBatch command.

### Bug fixes

* [GitHub node:](/integrations/builtin/app-nodes/n8n-nodes-base.github/) Fix credential tests and File List operation.
* [Telegram node:](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/) Fix sending binary data when disable notification is set.

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

User management in n8n allows you to invite people to work in your self-hosted n8n instance. It includes:

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

* [Redis Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.redisTrigger/) Added a Redis Trigger node.

### Core functionality

- Added support for [Luxon](https://moment.github.io/luxon/#/) and [JMESPath](https://jmespath.org/).
- Added two new expressions variables, `$now` and `$today`.
- Added more negative operations for numbers and strings.
- Added a link to the course from the help menu.

### Nodes


* [Facebook Graph API:](/integrations/builtin/app-nodes/n8n-nodes-base.facebookGraphApi/) Added suport for Facebook Graph API 13.
* [Hubspot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Added suport for private app token authentication.
* [MongoDB:](/integrations/builtin/app-nodes/n8n-nodes-base.mongoDb/) Added the aggregate operation.
* [Redis Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.redisTrigger/) Added a Redis Trigger node.
* [Redis:](/integrations/builtin/app-nodes/n8n-nodes-base.redis/) Added support for publish operations.
* [Strapi:](/integrations/builtin/app-nodes/n8n-nodes-base.strapi/) Added support for Strapi 4.
* [WordPress:](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/) Added status as an option to getAll post requests.


### Bugfixes

- The Google Calendar node now correctly applies timezones when creating, updating, and scheduling all day events.
- Fixed a bug that occasionally caused n8n to crash, or shut down workflows unexpectedly.
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


* [Odoo](/integrations/builtin/app-nodes/n8n-nodes-base.odoo/)

### Enhanced nodes


* [Function:](/integrations/builtin/core-nodes/n8n-nodes-base.function/) Added support for items without a JSON key.

### Core functionality

- Added new environment variable `N8N_HIRING_BANNER_ENABLED` to enable/disable the hiring banner.
- Fixed a bug preventing keyboard shortcuts from working as expected.
- Fixed a bug causing tooltips to be hidden behind other elements.
- Fixed a bug causing some credentials to be hidden from the credentials list.

### Bug fixes


* [Baserow:](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/) Fixed a bug preventing the Sorting option of the Get All operation from working as expected.
* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug causing Digest Authentication to fail in some scenarios.
* [Wise:](/integrations/builtin/app-nodes/n8n-nodes-base.wise/) Fixed a bug causing API requests requiring Strong Customer Authentication (SCA) to fail.

### Contributors

[pemontto](https://github.com/pemontto)

## n8n@0.165.0

For a comprehensive list of changes, view the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.164.1...n8n@0.165.0) for this version.<br />
**Release date:** 2022-02-28

!!! warning "Breaking changes"
    Please note that this version contains breaking changes. You can read more about them [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01650).



### New nodes



* [Onfleet](/integrations/builtin/app-nodes/n8n-nodes-base.onfleet/)

### Enhanced nodes


* [Asana:](/integrations/builtin/app-nodes/n8n-nodes-base.asana/) Added Create operation to the Project resource.
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Added Edit Contact Points, Edit Do Not Contact List, Send Email operations to Contact resource. Also added new Segment Email resource.
* [Notion (Beta):](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Added support for rollup fields to the Simplify Output option. Also added the Parent ID to the Get All operation of the Block resource.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added Marketing Status field to the Create operation of the Person resource, also added User ID field to the Create and Update operations of the Person resource.

### Core functionality

- Added support for workflow templates.
- Fixed a bug causing credentials tests to fail for versioned nodes.
- Fixed a build problem by addind dependencies `@types/lodash.set` to the `workflow` package and `@types/uuid` to the `core` package.
- Fixed an error causing some resources to ignore a non-standard `N8N_PATH` value.
- Fixed an error preventing the placeholder text from being shown when entering credentials.
- Improved error handling for telemetry-related errors.

### Bug fixes


* [Orbit:](/integrations/builtin/app-nodes/n8n-nodes-base.orbit/) Fixed a bug causing API requests to use an incorrect workspace identifier.
* [TheHive:](/integrations/builtin/app-nodes/n8n-nodes-base.theHive/)  Fixed a bug causing the Ignore SSL Issues option to be applied incorrectly.

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


* [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googleChat/)

### Enhanced nodes


* [Grist:](/integrations/builtin/app-nodes/n8n-nodes-base.grist/) Added support for self-hosted Grist instances.
* [Telegram Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramTrigger/) Added new Extra Large option to Image Size field.
* [Webhook:](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) Added new No Response Body option. Also added support for DELETE, PATCH and PUT methods.

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


* [HaloPSA](/integrations/builtin/app-nodes/n8n-nodes-base.haloPSA/)
* [Linear Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.linearTrigger/)
* [Zammad](/integrations/builtin/app-nodes/n8n-nodes-base.zammad/)

### Enhanced nodes


* [GitHub:](/integrations/builtin/app-nodes/n8n-nodes-base.github/) Added Reference option to the Get operation of the File resource.
* [Twilio:](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/) Added Status Callbacks option.
* [uProc:](/integrations/builtin/app-nodes/n8n-nodes-base.uproc/) Sanitized Data Webhook field description.

### Core Functionality

- Added automatic sorting by relative position to the node list inside the expression editor.
- Added new `/workflows/demo` page to allow read-only rendering of workflows inside an iframe.
- Added optional `/healthz` health check endpoint to worker instances.
- Fixed unwanted list autofill behaviour inside the expression editor.
- Improved the GitHub actions used by the nightly Docker image.

### Bug fixes


* [Function:](/integrations/builtin/core-nodes/n8n-nodes-base.function/) Fixed a bug leaving the code editor size unchanged after resizing the window.
* [Function Item:](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) Fixed a bug leaving the code editor size unchanged after resizing the window.
* [IF:](/integrations/builtin/core-nodes/n8n-nodes-base.if/) Removed the empty sections left after removing a condition.
* [Item Lists:](/integrations/builtin/core-nodes/n8n-nodes-base.itemLists/) Fixed an erroneous placeholder text.

### Contributors

[Iñaki Breinbauer](https://github.com/quansenB), [Manuel](https://github.com/tennox), [pemontto](https://github.com/pemontto)

## n8n@0.162.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.161.1...n8n@0.162.0) for this version.<br />
**Release date:** 2022-02-06

### Enhanced nodes


* [GitHub:](/integrations/builtin/app-nodes/n8n-nodes-base.github/) Added new List operation to File resource.

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


* [XML:](/integrations/builtin/core-nodes/n8n-nodes-base.xml/) Fixed a bug causing the node to alter incoming data.

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


* [Airtable:](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/) Improved field description.
* [Airtable Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.airtableTrigger/) Improved field description.
* [erpNext:](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/) Prevented the node from throwing an error when no data is found.
* [Gmail:](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) Fixed a bug causing the BCC field to be ignored.
* [Move Binary Data:](/integrations/builtin/core-nodes/n8n-nodes-base.moveBinaryData/) Fixed a bug causing the binary data to JSON conversion to fail when using filesystem-based binary data handling.
* [Slack:](/integrations/builtin/app-nodes/n8n-nodes-base.slack/) Fixed a typo in the Type field.

### Contributors

[fabian wohlgemuth](https://github.com/wohfab)

## n8n@0.160.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.159.1...n8n@0.160.0) for this version.<br />
**Release date:** 2022-01-22

### New nodes


* [BambooHR](/integrations/builtin/app-nodes/n8n-nodes-base.bambooHr/)

### Core Functionality

- Fixed a bug preventing the binary data preview from using the full available height and width.
- Fixed a build problem by pinning chokidar version 3.5.2.
- Prevent workflow activation when no trigger is presentand introduced a modal explaining production data handling.
- Fixed *Filter by tags* placeholder text used in the Open Workflow modal.

### Bug fixes


* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug causing custom headers from being ignored.
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Fixed a bug preventing all items from being returned in some situations.
* [Microsoft OneDrive:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/) Fixed a bug preventing more than 200 items from being returned.
* [Spotify:](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/) Fixed a bug causing the execution to fail if there are more than 1000 search results, also fixed a bug preventing the Get New Releases operation of the Album resource from working as expected.

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


* [Jenkins](/integrations/builtin/app-nodes/n8n-nodes-base.jenkins/)

### Enhanced nodes


* [GraphQL:](/integrations/builtin/core-nodes/n8n-nodes-base.graphql/) Added support for additional authentication methods Basic Auth, Digest Auth, OAuth1, OAuth2, and Query Auth.

### Core Functionality

- Added support for executing workflows without an ID through the CLI.
- Fixed a build problem.
- Fixed a bug preventing the tag description from being shown on the canvas.
- Improved build performance by skipping the `node-dev` package during build.

### Bug fixes


* [Box:](/integrations/builtin/app-nodes/n8n-nodes-base.box/) Fixed a bug causing some files to be corrupted during download.
* [Philips Hue:](/integrations/builtin/app-nodes/n8n-nodes-base.philipsHue/) Fixed a bug preventing the node from connecting to Philips Hue.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fixed a bug preventing filters on date and datetime fields from working as expected.
* [Supabase:](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/) Fixed an errorneous documentation link.

### Contributors

[Phil Clifford](https://github.com/philclifford)

## n8n@0.158.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.157.1...n8n@0.158.0) for this version.<br />
**Release date:** 2022-01-09

### New nodes


* [Microsoft Graph Security](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftGraphSecurity/)
* [SyncroMSP](/integrations/builtin/app-nodes/n8n-nodes-base.syncroMsp/)
* [Supabase](/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)

### Enhanced nodes


* [Edit Image:](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/) Added Transparent operation.
* [Kafka:](/integrations/builtin/app-nodes/n8n-nodes-base.kafka/) Added Use Schema Registry option.
* [Kafka Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkaTrigger/) Added Use Schema Registry option.
* [Redis:](/integrations/builtin/app-nodes/n8n-nodes-base.redis/) Added database field to credentials.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Account Number field.

### Core Functionality

- Added new external hook when active workflows finished initializing.
- Fixed a bug preventing the personalisation survey from showing up.
- Improved telemetry.

### Bug fixes


* [Edit Image:](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/) Fixed a bug causing two items to be returned.
* [iCalendar:](/integrations/builtin/core-nodes/n8n-nodes-base.iCal/) Fixed a bug preventing dates in January from working as expected.
* [Merge:](/integrations/builtin/core-nodes/n8n-nodes-base.merge/) Fixed causing empty binary data to overwrite other binary data on merge.

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


* [Function:](/integrations/builtin/core-nodes/n8n-nodes-base.function/) The node now prevents unsupported data from being returned.
* [Function Item:](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) The node now prevents unsupported data from being returned.
* [HubSpot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Added Engagement resource with Create, Delete, Get, and Get All operations.
* [Notion (Beta):](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Upgraded the Notion node: Added Search operation for the Database resource, Get operation for Database Page resource, Archive operation for the Page resource. Also added Simplify Output option and test for credential validity.
* [Wait:](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) Added new Ignore Bots option.
* [Webhook:](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) Added new Ignore Bots option.

### Core Functionality

- Fixed a bug where a wrong number suffix was used after duplicating nodes.

### Bug fixes


* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed a bug where using Digest Auth would fail.

### Contributors

[pemontto](https://github.com/pemontto)

## n8n@0.156.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.155.2...n8n@0.156.0) for this version.<br />
**Release date:** 2021-12-25

### Enhanced nodes


* [GitLab Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabTrigger/) Added new trigger events: Confidential Issue, Confidential Comment, Deployment, Release.
* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Added support for downloading and converting native Google files.
* [Kitemaker:](/integrations/builtin/app-nodes/n8n-nodes-base.kitemaker/) Added Space ID field to Create operation of Work Item resource.
* [Raindrop:](/integrations/builtin/app-nodes/n8n-nodes-base.raindrop/) Added Parse Metadata option to Create, Update operations of the Bookmark resource.

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


* [Plivo:](/integrations/builtin/app-nodes/n8n-nodes-base.plivo/) Added user agent to all API requests.

### Core Functionality

- Allow deletion of nodes from the canvas using the backspace key
- Fixed an issue causing clicks in the value survey to impact the main view
- Fixed an issue preventing the update panel from closing

### Bug fixes


* [Todoist:](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/) Fixed a bug where using the additional field Due Date Time on the Task resource would cause the Create operation to fail.

### Contributors

[Mohammed Huzaif](https://github.com/huzaif-plivo), [Лебедев Иван](https://github.com/X-pech)

## n8n@0.153.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.152.0...n8n@0.153.0) for this version.<br />
**Release date:** 2021-12-11

### New nodes


* [Figma Trigger (Beta)](/integrations/builtin/trigger-nodes/n8n-nodes-base.figmaTrigger/)
* [Workable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.workableTrigger/)

### Enhanced nodes


* [Google Contacts:](/integrations/builtin/app-nodes/n8n-nodes-base.googleContacts/) Added Query option to Get All operation, also prevented the node from failing when no contacts are found.
* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Added support for query-based authentication.
* [Home Assistant:](/integrations/builtin/app-nodes/n8n-nodes-base.homeAssistant/) Added support for loading possible options in the Domain, Service, and Entity ID fields.
* [One Simple API:](/integrations/builtin/app-nodes/n8n-nodes-base.oneSimpleApi/) Added support for Social Profile resources.
* [PagerDuty:](/integrations/builtin/app-nodes/n8n-nodes-base.pagerDuty/) Write scope is now requested upon authentication against the PagerDuty OAuth2 API.

### Core Functionality

- Added frontend for value surveys
- Fixed an issue preventing the recommendation logic from working as expected after selecting a work area
- Fixed an issue where a wrong exit code was sent when running n8n on an unsupported version of Node.js
- Fixed an issue where node options would disappear on hovering when a node is not selected
- Fixed an issue where the execution id was missing when running n8n in queue mode
- Fixed an issue where execution data was missing when waiting for a webhook in queue mode
- Improved error handling when the n8n port is already in use
- Improved diagnostic events
- Removed toast notification on webhook deletion, added toast notification after node is copied
- Removed default trigger tooltip for polling trigger nodes

### Bug fixes


* [APITemplate.io:](/integrations/builtin/app-nodes/n8n-nodes-base.apiTemplateIo/) Fixed a bug where the Create operation on the Image resource would fail when the Download option is not enabled.
* [HubSpot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Fixed authentication for new Hubspot applications by using granular scopes when authenticating against the Hubspot OAuth2 API.
* [HubSpot Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspotTrigger/) Fixed authentication for new Hubspot applications by using granular scopes when authenticating against the Hubspot Developer API.
* [Jira Software:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Fixed an issue where the Reporter field would not work as expected on Jira Server instances.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fixed a typo preventing the value in the amount field of from being saved.

### Contributors

[pemontto](https://github.com/pemontto), [Jascha Lülsdorf](https://github.com/buelsenfrucht), [Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.152.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.151.0...n8n@0.152.0) for this version.<br />
**Release date:** 2021-12-04

### New nodes


* [Google Calendar Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googleCalendarTrigger/)

### Enhanced nodes


* [Telegram Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramTrigger/) Added support for downloading images to channel_post updates.

### Core Functionality

- Added a plus (+) connector to end nodes
- Allowed opening workflows and executions in a new window when using Ctrl + Click
- Enforced type checking for all node parameters
- Fixed a build issue in the custom n8n docker image
- Fixed a memory leak in the UI which could occur when renaming nodes or navigate to another workflow
- Improved stability of internal test workflows
- Improved expression security
- Introduced redirect to a new page and UI error message when trying to open a deleted workflow
- Introduced support for multiple arguments when logging
- Updated the onboarding survey

### Bug fixes


* [Google BigQuery:](/integrations/builtin/app-nodes/n8n-nodes-base.googleBigQuery/) Fixed a bug preventing pagination from working as expected when the Return All option is enabled.
* [RabbitMQ Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqTrigger/) Added Trigger to the name of the trigger node.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fixed a typo affecting the Type field of the Opportunity resource.

### Contributors

[Zvonimir Erdelja](https://github.com/zvonimir-ebot7), [m2scared](https://github.com/m2scared)

## n8n@0.151.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.150.0...n8n@0.151.0) for this version.<br />
**Release date:** 2021-11-26

### New nodes


* [DHL](/integrations/builtin/app-nodes/n8n-nodes-base.dhl/)
* [Grafana](/integrations/builtin/app-nodes/n8n-nodes-base.grafana/)

### Core Functionality

- Fixed a bug causing connections between nodes to disappear when renaming a newly added node after drawing a connection to its endpoints.
- Fixed a build issue by adding TypeScript definitions for validator.js to CLI package, also fixed a linting issue by removing an unused import.
- Improved the waiting state of trigger nodes to explain when an external event is required.
- Loops are now drawn below their source node.

### Bug fixes


* [Edit Image:](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/) Fixed an issue preventing the Composite operation from working correctly in some cases.

### Contributors

[Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.150.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.149.0...n8n@0.150.0) for this version.<br />
**Release date:** 2021-11-19

### Enhanced nodes


* [Jira Software:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Added Components as an additional field.

### Core Functionality

- Fixed a build issue by pinning rudder-sdk-node version 1.0.6 in CLI package.
- Fixed an issue preventing the `n8n import:workflow --separate` CLI command from finding workflows on Windows.
- Further improved the expression security.
- Moved all nodes into separate directories in preparation for internationalization.
- Removing default headers for PUT and PATCH operations when using axios.
- Revamped the workflow canvas.

### Bug fixes


* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue causing the wrong Content-Type header to be set when downloading a file.
* [ServiceNow:](/integrations/builtin/app-nodes/n8n-nodes-base.serviceNow/) Fixed incorrect mapping of incident urgency and impact values.
* [Start:](/integrations/builtin/core-nodes/n8n-nodes-base.start/) Fixed an issue causing the node to be disabled in a new workflow.
* [Xero:](/integrations/builtin/app-nodes/n8n-nodes-base.xero/) Fixed an issue causing the node to only fetch the first page when querying the Xero API.

## n8n@0.149.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.148.0...n8n@0.149.0) for this version.<br />
**Release date:** 2021-11-13

### New nodes


* [One Simple API](/integrations/builtin/app-nodes/n8n-nodes-base.oneSimpleApi/)

### Enhanced nodes


* [Edit Image:](/integrations/builtin/core-nodes/n8n-nodes-base.editImage/) Added Circle Primitive to Draw operation. Also added Composite operation.
* [Zendesk:](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/) Added check for API credentials validity.
* [Zulip:](/integrations/builtin/app-nodes/n8n-nodes-base.zulip/) Added additional field Role to the Update operation of the User resource.

### Core Functionality

- Fixed an issue causing an error message to be thrown when executing a workflow through the CLI.
- Improved expression security by limiting the available process properties.
- Improved the behaviour of internal tests executed through the CLI.
- Updated the owner of the node user's home directory in the custom docker image.

### Bug fixes


* [Google Tasks:](/integrations/builtin/app-nodes/n8n-nodes-base.googleTasks/) Fixed an issue where the Due Date field had no effect (Update operation) or was unavailable (Create operation).
* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue where the Content-Length header was not calculated and sent when using the a Body Content Type of Form-Data Multipart.
* [Stripe Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.stripeTrigger/) Fixed an issue preventing the node from being activated when a previously created webhook no longer exists.
* [Toggl Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.togglTrigger/) Updated the API URL used by the node.

### Contributors

[GeylaniBerk](https://github.com/GeylaniBerk), [Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.148.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.147.1...n8n@0.148.0) for this version.<br />
**Release date:** 2021-11-05

### New nodes


* [Dropcontact](/integrations/builtin/app-nodes/n8n-nodes-base.dropcontact/)
* [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondToWebhook/)

### Enhanced nodes


* [Lemlist:](/integrations/builtin/app-nodes/n8n-nodes-base.lemlist/) Added additional fields to Create operation of Lead resource.
* [Slack:](/integrations/builtin/app-nodes/n8n-nodes-base.slack/) Added User Group resource.
* [Todoist:](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/) Added Update operation to Task resource.
* [Wait:](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) Improved descriptions of available Respond options.
* [WooCommerce:](/integrations/builtin/app-nodes/n8n-nodes-base.wooCommerce/) Added password field to Crate operation of Customer resource.

### Core Functionality

- Added a hook after workflow creation.
- Fixed a build issue with npm v7 by overriding unwanted behaviour through the .npmrc file.
- Fixed an issue preventing unknown node types from being imported.
- Fixed an issue with the UI falsely indicating a credential cannot be selected when using SQLite and multiple credentials with the same name exist.

### Bug fixes


* [Stripe:](/integrations/builtin/app-nodes/n8n-nodes-base.stripe/) Fixed an issue where setting additional Metadata fields would not have the expected effect. Also fixed an issue where pagination would not work as expected.
* [Zendesk:](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/) Fixed an issue preventing the additional field External ID from being evaulated correctly.

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


* [Local File Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.localFileTrigger/)

### Core Functionality

- Improved the database migration process to reduce memory footprint.
- Fixed an issue with telemetry by adding an anonymous ID.

## n8n@0.146.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.145.0...n8n@0.146.0) for this version.<br />
**Release date:** 2021-10-29

### New nodes


* [Microsoft Dynamics CRM](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftDynamicsCrm/)

### Enhanced nodes


* [Agile CRM:](/integrations/builtin/app-nodes/n8n-nodes-base.agileCrm/) Added Filters to Get All operation of Contact and Company resources.
* [Date & Time:](/integrations/builtin/core-nodes/n8n-nodes-base.dateTime/) Ensuring the return values are always of type string.
* [IF:](/integrations/builtin/core-nodes/n8n-nodes-base.if/) Added support for moment types to Date & Time condition.

### Core Functionality

- Added name and ID of a workflow to its settings.
- Added parameter inputs to be multi-line.
- Fixed an issue with declaring proxies when axios is used.
- Fixed an issue with serializing arrays and special characters.
- Fixed an issue with updating expressions after renaming a node.

### Bug fixes


* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed an issue with the Full Response option not taking effect when used with the Ignore Response Code option.

### Contributors

[Valentina Lilova](https://github.com/valentina98), [Oliver Trajceski](https://github.com/SchnapsterDog)

## n8n@0.145.0

For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.144.0...n8n@0.145.0) for this version.<br />
**Release date:** 2021-10-22

### New nodes


* [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awsTextract/)
* [Google Drive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googleDriveTrigger/)

### Enhanced nodes


* [Bitbucket Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.bitbucketTrigger/) Added check for credentials validity. Removed deprecated User and Team resources, and added the Workspace resource.
* [GitHub:](/integrations/builtin/app-nodes/n8n-nodes-base.github/) Added check for API credentials validity.
* [Home Assistant:](/integrations/builtin/app-nodes/n8n-nodes-base.homeAssistant/) Added check for credentials validity.
* [Jira Software:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Added check for credentials validity.
* [Microsoft OneDrive:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/) Added functionality to create folder hierarchy automatically upon subfolder creation.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added All Users option to Get All operation of Activity resource.
* [Slack:](/integrations/builtin/app-nodes/n8n-nodes-base.slack/) Increase the Slack default query limit from 5 to 100 in order to reduce number of requests.
* [Twitter:](/integrations/builtin/app-nodes/n8n-nodes-base.twitter/) Added Tweet Mode additional field to the Search operation of Tweet resource.

### Core Functionality

- Changed `vm2` library version from `3.9.3` to `3.9.5`.
- Fixed an issue with ignoring the response code.
- Fixed an issue with overwriting credentials via environment variables.
- Fixed an issue with using query strings combined with the `x-www-form-urlencoded` content type.
- Introduced telemetry.

### Bug fixes


* [Jira Software:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Fixed an issue with the Expand option for the Issue resource. Also fixed an issue with using custom fields on Jira Server.
* [Slack:](/integrations/builtin/app-nodes/n8n-nodes-base.slack/) Fixed an issue with pagination when loading more than 1,000 channels.
* [Strapi:](/integrations/builtin/app-nodes/n8n-nodes-base.strapi/) Fixed an issue using the Where option of the Get All operation.
* [WooCommerce:](/integrations/builtin/app-nodes/n8n-nodes-base.wooCommerce/) Fixed an issue where a wrong postcode field name was used for the Order resource.

### Contributors

[pemontto](https://github.com/pemontto), [rdd2](https://github.com/rdd2), [robertodamiani](https://github.com/robertodamiani), [Rodrigo Correia](https://github.com/rodrigoscdc)

## n8n@0.144.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.143.0...n8n@0.144.0) for this version.<br />
**Release date:** 2021-10-15

### Enhanced nodes

* [Nextcloud:](/integrations/builtin/app-nodes/n8n-nodes-base.nextCloud/) Added Share operation to the File and Folder resources.
* [Zendesk:](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/) Added support for deleting, listing, getting, and recovering suspended tickets. Added the query option for regular tickets. Added assignee emails, internal notes, and public replies options to the update ticket operation.

### Core Functionality
- Improved the autofill behaviour on Google Chrome when entering credentials.

### Bug fixes

* [Airtable:](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/) Fixed an issue with the sort field.
* [Cron:](/integrations/builtin/core-nodes/n8n-nodes-base.cron/) Set the version of the cron library to 1.7.2.

### Contributors
[Jonathan Bennetts](https://github.com/Joffcom)

## n8n@0.143.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.142.0...n8n@0.143.0) for this version.<br />
**Release date:** 2021-10-14

### Enhanced nodes

* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added support for getting activities from deal ID.
* [Facebook Graph API:](/integrations/builtin/app-nodes/n8n-nodes-base.facebookGraphApi/) Added support for Facebook Graph API versions 11 and 12.

### Core Functionality
- Fixed a build issue affecting a number of AWS nodes.
- Changed workflows to use credential ids primarily (instead of names), allowing users to have different credentials with the same name.

### Bug fixes

* [ FTP:](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/) Fixed error when opening FTP/SFTP credentials.

### Contributors
[Rodrigo Correia](https://github.com/rodrigoscdc)

## n8n@0.142.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.141.1...n8n@0.142.0) for this version.<br />
**Release date:** 2021-10-07

### New nodes

* [Stop and Error](/integrations/builtin/core-nodes/n8n-nodes-base.stopAndError/)

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

* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Fixed 'Ignore response code' flag.
* [Rundeck:](/integrations/builtin/app-nodes/n8n-nodes-base.rundeck/) Fixed issue with async loading of credentials.
* [SeaTable:](/integrations/builtin/app-nodes/n8n-nodes-base.seaTable/) Fixed issue when entering a Baser URI with a trailing slash.

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

* [Grist](/integrations/builtin/app-nodes/n8n-nodes-base.grist/)
* [SeaTable](/integrations/builtin/app-nodes/n8n-nodes-base.seaTable/)
* [SeaTable Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.seaTableTrigger/)
* [urlscan.io](/integrations/builtin/app-nodes/n8n-nodes-base.urlScanIo/)

### Core Functionality
- Performance improvements in Editor UI
- Improved error reporting

### Contributors
[Alex Hall](https://github.com/alexmojaki), [Tom Klingenberg](https://github.com/ktomk)

## n8n@0.140.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.139.1...n8n@0.140.0) for this version.<br />
**Release date:** 2021-09-29

### New nodes

* [Splunk](/integrations/builtin/app-nodes/n8n-nodes-base.splunk/)

### Enhanced nodes

* [Telegram:](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/) Added binary data support to the Send Animation, Send Audio, Send Document, Send Photo, Send Video, and Send Sticker operations.

### Core Functionality
- Fixed startup behavior when running n8n in scaled mode (i.e. `skipWebhoooksDeregistrationOnShutdown` is enabled).
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

* [Elastic Security](/integrations/builtin/app-nodes/n8n-nodes-base.elasticSecurity/)
* [Misp](/integrations/builtin/app-nodes/n8n-nodes-base.misp/)
* [Netlify](/integrations/builtin/app-nodes/n8n-nodes-base.netlify/)
* [Netlify Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.netlifyTrigger/)

### Enhanced nodes

* [HubSpot Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspotTrigger/) Authentication method changed to OAuth2.
* [Wait:](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) Added improved status messages for Wait behavior.

### Core Functionality
- Updated node design to include support for versioned nodes.

### Bug fixes

* [SendGrid:](/integrations/builtin/app-nodes/n8n-nodes-base.sendGrid/) Fixed issue with adding contacts to lists.

### Contributors
[Matías Aguirre](https://github.com/omab)

## n8n@0.138.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.137.0...n8n@0.138.0) for this version.<br />
**Release date:** 2021-09-15

### New nodes

* [Item Lists](/integrations/builtin/core-nodes/n8n-nodes-base.itemLists/)
* [Magento 2](/integrations/builtin/app-nodes/n8n-nodes-base.magento2/)

### Enhanced nodes

* [Baserow:](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/) Added the following filter options: Contains, Contains Not, Date Before Date, Date After Date, Filename Contains, Is Empty, Is Not Empty, Link Row Has, Link Row Does Not Have, Single Select Equal, and Single Select Not Equal.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added support for Notes on Leads.
* [Wekan:](/integrations/builtin/app-nodes/n8n-nodes-base.wekan/) Added Sort field to the Card resource.


### Core Functionality

- General UX improvements to the Editor UI.
- Fixed an issue with the `PayloadTooLargeError`.

### Bug fixes

* [Lemlist:](/integrations/builtin/app-nodes/n8n-nodes-base.lemlist/) Fixed issue where events were not sent in the correct property.
* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Fixed issue listed unnamed databases.

### Contributors
[bramknuever](https://github.com/bramknuever), [Chris Magnuson](https://github.com/ChrisMagnuson)

## n8n@0.137.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.136.0...n8n@0.137.0) for this version.<br />
**Release date:** 2021-09-05

### New nodes

* [Freshservice](/integrations/builtin/app-nodes/n8n-nodes-base.freshservice/)

### Enhanced nodes

* [Clockify:](/integrations/builtin/app-nodes/n8n-nodes-base.clockify/) Added Task resource.
* [Hubspot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Added dropdown selection for Properties and Properties with History filters for Get All Deals operations.
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Added Campaign Contact resource.
* [MongoDB:](/integrations/builtin/app-nodes/n8n-nodes-base.mongoDb/) Added ability to query documents by '_id'.
* [MQTT:](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt/) Added SSL/TLS support to authentication.
* [MQTT Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.mqttTrigger/) Added SSL/TLS support to authentication.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added File Extension option to the Document resource. Added Type field to Task resource.
* [Sms77:](/integrations/builtin/app-nodes/n8n-nodes-base.sms77/) Added Voice Call resource. Added the following options to SMS resource: Debug, Delay, Foreign ID, Flash, Label, No Reload, Performance Tracking, TTL.
* [Zendesk:](/integrations/builtin/app-nodes/n8n-nodes-base.zendesk/) Added Organization resource. Added Get Organizations and Get Related Data operations to User resource.

### Core Functionality

- Added execution ID to logs of queue processes.
- Added description to operation errors.
- Added ability for webhook processes to wake waiting executions.

### Bug fixes

* [Hubspot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Fixed issue with 'RequestAllItems' API.
* [Wordpress:](/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/) Fixed issue with 'RequestAllItems' API only returning the first 10 items.

### Contributors
[André Matthies](https://github.com/matthiez), [DeskYT](https://github.com/DeskYT), [Frederic Alix](https://github.com/fredericalix), [Jonathan Bennetts](https://github.com/Joffcom), [Ketan Somvanshi](https://github.com/KetanSomvanshi), [Luiz Eduardo de Oliveira Fonseca](https://github.com/luizeof), [TheFSilver](https://github.com/TheFSilver)

## n8n@0.136.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.135.3...n8n@0.136.0) for this version.<br />
**Release date:** 2021-08-30

### Enhanced nodes

* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Added handling of Rich Text when simplifying data.

### Core Functionality
- General UI design improvements.
- Improved errors messages during debugging of custom nodes.
- All packages upgraded to TypeScript 4.3.5, improved linting and formatting.

### Bug fixes

* [FTP:](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/) Fixed issue where incorrect paths were displayed when using the node.
* [Wait:](/integrations/builtin/core-nodes/n8n-nodes-base.wait/) Fixed issue when receiving multiple files using On Webhook Call operation.
* [Webhook:](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) Fixed issue when receiving multiple files.


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
- Fixed an issue where if n8n was shutdown during database migration while upgrading versions, errors would result upon next startup.

## n8n@0.135.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.134.0...n8n@0.135.0) for this version.<br />
**Release date:** 2021-08-22

!!! warning "Breaking changes"
    Please note that this version contains breaking changes. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350).
    The features that introduced the breaking changes have been flagged below.


### New nodes

* [Form.io Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formIoTrigger/)
* [Formstack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formstackTrigger/)
* [Wait](/integrations/builtin/core-nodes/n8n-nodes-base.wait/)

### Core Functionality
- In-node method for accessing binary data is now asynchronous and a helper function for this has been implemented. [](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350)
- Credentials are now loaded from the database on-demand. [](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01350)
- Webhook UUIDs are automatically updated when duplicating a workflow.
- Fixed an issue when referencing values before loops.

### Bug fixes

* [Interval:](/integrations/builtin/core-nodes/n8n-nodes-base.interval/) Fixed issue where entering too large a value (> 2147483647ms) resulted in an interval of 1sec being used rather than an error.

### Contributors
[Aniruddha Adhikary](https://github.com/aniruddha-adhikary), [lublak](https://github.com/lublak), [parthibanbalaji](https://github.com/parthibanbalaji)


## n8n@0.134.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.133.0...n8n@0.134.0) for this version.<br />
**Release date:** 2021-08-15

### Enhanced nodes

* [AWS DynamoDB:](/integrations/builtin/app-nodes/n8n-nodes-base.awsDynamoDb/) Added Scan option to Item > Get All operation.
* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Added File Name option to File > Update operation.
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Added the following fields to Company resource: Address, Annual Revenue, Company Email, Custom Fields, Description, Fax, Industry, Number of Employees, Phone, Website.
* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Added Timezone option when inserting Date fields.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added the following Filters options to the Deal > Get All operation: Predefined Filter, Stage ID, Status, and User ID.
* [QuickBooks:](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/) Added the Transaction resource and Get Report operation.

### Core Functionality
- Integrated [Nodelinter](/integrations/creating-nodes/test/node-linter/) in n8n.
- Fix to add a trailing slash (`/`) to all webhook URLs for proper functionality.

### Bug fixes

* [AWS SES:](/integrations/builtin/app-nodes/n8n-nodes-base.awsSes/) Fixed issue where special characters in the message were not encoded.
* [Baserow:](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/) Fixed issue where Create operation inserted null values.
* [Hubspot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Fixed issue when sending context parameter.

### Contributors
[calvintwr](https://github.com/calvintwr), [CFarcy](https://github.com/CFarcy), [Jeremie Dokime](https://github.com/dokime7), [Michael Hirschler](https://github.com/mvhirsch), [Rodrigo Correia](https://github.com/rodrigoscdc), [sol](https://github.com/5pecia1)

## n8n@0.133.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n%400.132.2...n8n@0.133.0) for this version.<br />
**Release date:** 2021-08-08

### New nodes

* [Monica CRM](/integrations/builtin/app-nodes/n8n-nodes-base.monicaCrm/)

### Enhanced nodes

* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Added Follow All Redirects option.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Record Type ID field.

### Core Functionality
- Fixed UI lag when editing large workflows.

### Bug fixes

* [Nextcloud:](/integrations/builtin/app-nodes/n8n-nodes-base.nextCloud/) Fixed issue where List operation on an empty Folder returned an error.
* [Spotify:](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/) Fixed issues with pagination and infinite executions.

### Contributors
[Jacob Burrell](https://github.com/jacobburrell), [Лебедев Иван](https://github.com/X-pech)

## n8n@0.132.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.132.1...n8n@0.132.2) for this version.<br />
**Release date:** 2021-08-02

### Bug fixes

* [Interval:](/integrations/builtin/core-nodes/n8n-nodes-base.interval/) Fixed issue with infinite executions.

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

* [Freshworks CRM](/integrations/builtin/app-nodes/n8n-nodes-base.freshworksCrm/)
* [Google Perspective](/integrations/builtin/app-nodes/n8n-nodes-base.googlePerspective/)
* [Marketstack](/integrations/builtin/app-nodes/n8n-nodes-base.marketstack/)
* [NocoDB](/integrations/builtin/app-nodes/n8n-nodes-base.nocoDb/)


### Enhanced nodes

* [Facebook Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebookTrigger/) Added Fields parameter.
* [Gmail:](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) Added Sender Name parameter.
* [Home Assistant:](/integrations/builtin/app-nodes/n8n-nodes-base.homeAssistant/) Added Event resource.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added Deal Product resource.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Document resource with Upload operation.
* [WooCommerce:](/integrations/builtin/app-nodes/n8n-nodes-base.woocommerce/) Added Customer resource.


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

* [Webex by Cisco](/integrations/builtin/app-nodes/n8n-nodes-base.ciscoWebex/)
* [Webex by Cisco Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscoWebexTrigger/)


### Enhanced nodes

* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added Lead resource. Added Search operation to Organization resource.
* [Taiga Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.taigaTrigger/) Added Resource and Operations filters.


### Core Functionality
- Added Continue-on-fail support to all nodes.
- Added new version notifications.
- Added Refresh List for remote options lists.
- Added `$position` expression variable to return the index of an item within a list.

### Bug fixes

* [Spreadsheet File:](/integrations/builtin/core-nodes/n8n-nodes-base.spreadsheetFile/) Fixed issue when saving dates.

### Contributors
[Anthr@x](https://github.com/AnthraX1), [Felipe Cecagno](https://github.com/fcecagno)

## n8n@0.130.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.129.0...n8n@0.130.0) for this version.<br />
**Release date:** 2021-07-18

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/  blob/master/packages/cli/BREAKING-CHANGES.md#01300).
    The features that introduced the breaking changes have been flagged below.



### New nodes

* [AWS DynamoDB](/integrations/builtin/app-nodes/n8n-nodes-base.awsDynamoDb/)
* [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch/)
* [ServiceNow](/integrations/builtin/app-nodes/n8n-nodes-base.serviceNow/)

### Enhanced nodes

* [Kafka Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.kafkaTrigger/) Added Read Messages From Beginning option.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Sandbox Environment Type for OAuth2 credentials.
* [Taiga:](/integrations/builtin/app-nodes/n8n-nodes-base.taiga/) Added Epic, Task, and User Story operations.
* [TheHive:](/integrations/builtin/app-nodes/n8n-nodes-base.theHive/) Added Custom Fields option to the available Additional Fields.

### Core Functionality
- Fixed an issue where failed workflows were displayed as "running".
- Fixes issues with uncaught errors.

### Bug fixes

* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Fixed issue when filtering field data type.

### Contributors
[Michael Hirschler](https://github.com/mvhirsch), [Mika Luhta](https://github.com/mluhta), [Pierre Lanvin](https://github.com/planvin)

## n8n@0.129.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.128.0...n8n@0.129.0) for this version.<br />
**Release date:** 2021-07-12

### New nodes

* [Baserow](/integrations/builtin/app-nodes/n8n-nodes-base.baserow/)

### Bug fixes

* [SSH:](/integrations/builtin/core-nodes/n8n-nodes-base.ssh/) Fixed issue with access rights when downloading files.

### Contributors
[Jérémie Pardou-Piquemal](https://github.com/jrmi)

## n8n@0.128.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.127.0...n8n@0.128.0) for this version.<br />
**Release date:** 2021-07-11

### New nodes

* [Home Assistant](/integrations/builtin/app-nodes/n8n-nodes-base.homeAssistant/)
* [Stripe](/integrations/builtin/app-nodes/n8n-nodes-base.stripe/)

### Enhanced nodes

* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Added support for arrays in Querystring. Any parameter appearing multiple times with the same name is grouped into an array.
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Added Contact Segment resource.
* [Telegram:](/integrations/builtin/app-nodes/n8n-nodes-base.telegram/) Added Delete operation to the Message resource.

### Core Functionality
- Performance improvement for loading of historical executions (> 3mil) when using Postgres.
- Fixed error handling for unending workflows and display of "unknown" workflow status.
- Fixed format of Workflow ID when downloading from UI Editor to enable compatibility with importing from CLI.

### Bug fixes

* [Microsoft SQL:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftSql/) Fixed an issue with sending the connectionTimeout parameter, and creating and updating data using columns with spaces.

### Contributors
[Kaito Udagawa](https://github.com/umireon), [Rodrigo Correia](https://github.com/rodrigoscdc)


## n8n@0.127.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.1...n8n@0.127.0) for this version.<br />
**Release date:** 2021-07-04

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01270).
    The features that introduced the breaking changes have been flagged below.


### Enhanced nodes

* [Airtable:](/integrations/builtin/app-nodes/n8n-nodes-base.airtable/) Added Bulk Size option to all Operations.
* [Box:](/integrations/builtin/app-nodes/n8n-nodes-base.box/) Added Share operation to File and Folder resources.
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Last Name field to Update operation on Contact resource.
* [Zoho CRM:](/integrations/builtin/app-nodes/n8n-nodes-base.zohoCrm/) Added Account, Contact, Deal, Invoice, Product, Purchase, Quote, Sales Order, and Vendor resources.

### Core Functionality
- Added a workflow testing framework via a new CLI command to execute all desired workflows. Run `n8n executeBatch --help` for details.
- Added support to display binary video content in Editor UI.

### Bug fixes

* [Google Sheets:](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) Fixed an issue with handling 0 value that resulted in empty cells.
* [SSH:](/integrations/builtin/core-nodes/n8n-nodes-base.ssh/) Fixed an issue with setting passphrases.

### Contributors
[flybluewolf](https://github.com/flybluewolf), [Kaito Udagawa](https://github.com/umireon)

## n8n@0.126.1
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.126.0...n8n@0.126.1) for this version.<br />
**Release date:** 2021-06-29

### Core Functionality
- Fixed issues with keyboard shortcuts when a modal was open.

### Bug fixes

* [Microsoft SQL:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftSQL/) Fixed an issue with handling of Boolean values when inserting.
* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Fixed an issue with the node icon.

## n8n@0.126.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.125.0...n8n@0.126.0) for this version.<br />
**Release date:** 2021-06-27

### New nodes

* [Action Network](/integrations/builtin/app-nodes/n8n-nodes-base.actionNetwork/)
* [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googleDocs/)

### Enhanced nodes

* [AWS S3:](/integrations/builtin/app-nodes/n8n-nodes-base.awsS3/) Added Delete operation to the Bucket Resource.
* [Google Analytics:](/integrations/builtin/app-nodes/n8n-nodes-base.googleAnalytics/) Added Dimension Filters to the available Additional Fields.
* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Added Split Into Items option.
* [MQTT:](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt/) Added mqqts protocol for MQTT credentials.
* [QuickBooks:](/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/) Added Purchase resource with Get and Get All operations.


### Core Functionality
- Templates from the [n8n Workflows](https://n8n.io/workflows) page can now be directly imported by appending `/workflows/templates/<templateId>` to your instance base URL. For example, `localhost:5678/workflows/templates/1142`.
- Added new Editor UI shortcuts. See [Keyboard Shortcuts](keyboard-shortcuts.md) for details.
- Fixed an issue causing console errors when deleting a node from the canvas.

### Bug fixes

* [Ghost:](/integrations/builtin/app-nodes/n8n-nodes-base.ghost/) Fixed an issue with the Get All operation functionality.
* [Google Analytics:](/integrations/builtin/app-nodes/n8n-nodes-base.googleAnalytics/) Fixed an issue that caused an error when attempting to sort with no data present.
* [Microsoft SQL:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftSQL/) Fixed an issue when escaping single quotes and mapping empty fields.
* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Fixed an issue with pagination of databases and users.

### Contributors
[calvintwr](https://github.com/calvintwr), [Jan Baykara](https://github.com/janbaykara)

## n8n@0.125.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.124.1...n8n@0.125.0) for this version.<br />
**Release date:** 2021-06-20

### Enhanced nodes

* [Spotify:](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/) Added Search operation to Album, Artist, Playlist, and Track resources, and Resume and Volume operations to Player resource.

### Core Functionality
- Implemented new design of the Nodes Panel, adding categories and subcategories, along with improved search. For full details, see the [commits](https://github.com/n8n-io/n8n/commit/0470740737c5ee199447a68b7277c43be2042976).

### Bug fixes

* [MySQL:](/integrations/builtin/app-nodes/n8n-nodes-base.mySql/) Fixed an issue where n8n was unable to save data due to collation, resulting in workflows ending with Unknown status.

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

* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Added APP Properties and Properties options to the Upload operation of the File resource
* [HTTP Request:](/integrations/builtin/core-nodes/n8n-nodes-base.httpRequest/) Added the functionlaity to log the request to the browser console for testing
* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Added the Include Time parameter date field types
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Upsert operation to Account, Contact, Custom Object, Lead, and Opportunity resources
* [Todoist:](/integrations/builtin/app-nodes/n8n-nodes-base.todoist/) Added the Description option to the Task resource

### Core Functionality
- Implemented the functionality to display the error details in a toast message for trigger nodes
- Improved error handling by removing circular references from API errors

### Bug fixes

* [Jira:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Fixed an issues with the API version and fixed an issue with fetching the custom fields for the Issue resource

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

* [Git](/integrations/builtin/core-nodes/n8n-nodes-base.git/)
* [Microsoft To Do](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftToDo/)

### Enhanced nodes

* [Pipedrive:](/integrations/builtin/app-nodes/n8n-nodes-base.pipedrive/) Added a feature to fetch data from the Pipedrive API, added Search operation to the Deals resource, and added custom fields option
* [Spotify:](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/) Added My Data resource

### Core Functionality
- Fixed issues with NodeViewNew navigation handling
- Fixed an issue with the view crashing with large requests

### Bug fixes

* [ASW Transcribe:](/integrations/builtin/app-nodes/n8n-nodes-base.awsTranscribe/) Fixed issues with options

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

* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Fixed an issue with parsing the last edited time

## n8n@0.122.2
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.122.1...n8n@0.122.2) for this version.<br />
**Release date:** 2021-05-31

### Enhanced nodes

* [Function:](/integrations/builtin/core-nodes/n8n-nodes-base.function/) Added console.log support for writing to browser console
* [Function Item:](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) Added console.log support for writing to browser console

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

* [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awsTranscribe/)
* [SSH](/integrations/builtin/core-nodes/n8n-nodes-base.ssh/)
* [UptimeRobot](/integrations/builtin/app-nodes/n8n-nodes-base.uptimeRobot/)

### Enhanced nodes

* [DeepL:](/integrations/builtin/app-nodes/n8n-nodes-base.deepL/) Added support for Free API
* [Function:](/integrations/builtin/core-nodes/n8n-nodes-base.function/) Added the functionality to log console.log messages to the browser console
* [Function Item:](/integrations/builtin/core-nodes/n8n-nodes-base.functionItem/) Added the functionality to log console.log messages to the browser console

### Core Functionality
- Changed `bcrypt` library from `@node-rs/bcrypt` to `bcryptjs`
- Fixed an issue with optional parameters that have the same name
- Added the functionality to tag workflows
- Fixed errors in the Expression Editor
- Fixed an issue with nodes that only get connected to the second input. This solves the issue of copying and pasting the workflows where only one output of the IF node gets connected to a node

### Bug fixes

* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Fixed an issue with the Drive resource
* [Notion:](/integrations/builtin/app-nodes/n8n-nodes-base.notion/) Fixed an issue with the filtering fields type and fixed an issue with the link option
* [Switch:](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) Fixed an issue with the Expression mode

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

* [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/)
* [Notion Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.notionTrigger/)

### Enhanced nodes

* [GraphQL:](/integrations/builtin/core-nodes/n8n-nodes-base.graphql/) Added Header Auth authentication method
* [Twilio:](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/) Added API Key authentication method

### Bug fixes

* [HubSpot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Fixed an issue with pagination for Deals resource
* [Keap:](/integrations/builtin/app-nodes/n8n-nodes-base.keap/) Fixed an issue with the data type of the Order Title field
* [Orbit:](/integrations/builtin/app-nodes/n8n-nodes-base.orbit/) Fixed an issue with the activity type in Post operation
* [Slack:](/integrations/builtin/app-nodes/n8n-nodes-base.slack/) Fixed an issue with the Get Profile operation
* [Strava:](/integrations/builtin/app-nodes/n8n-nodes-base.strava/) Fixed an issue with the paging parameter

### Contributors

[Jacob Spizziri](https://github.com/jspizziri)

## n8n@0.120.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.119.0...n8n@0.120.0) for this version.<br />
**Release date:** 2021-05-17

### New nodes

* [iCalendar](/integrations/builtin/core-nodes/n8n-nodes-base.iCal/)

### Enhanced nodes

* [Google Cloud Firestore:](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudFirestore/) Added the functionality for GeoPoint parsing and added ISO-8601 format for date validation
* [IMAP Email:](/integrations/builtin/core-nodes/n8n-nodes-base.imapEmail/) Added the Force reconnect option
* [Paddle:](/integrations/builtin/app-nodes/n8n-nodes-base.paddle/) Added the Use Sandbox environment API parameter
* [Spotify:](/integrations/builtin/app-nodes/n8n-nodes-base.spotify/) Added the Position parameter to the Add operation of the Playlist resource
* [WooCommerce:](/integrations/builtin/app-nodes/n8n-nodes-base.wooCommerce/) Added the Include Credentials in Query parameter

### Core Functionality
- Added await to hooks to fix issues with the `Unknown` status of the workflows
- Changed the data type of the `credentials_entity` field for MySQL database to fix issues with long credentials
- Fixed an issue with the ordering of the executions when the list is auto-refreshed
- Added the functionality that allows reading sibling parameters

### Bug fixes

* [Clockify Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.clockifyTrigger/) Fixed an issue that occurred when the node returned an empty array
* [Google Cloud Firestore:](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudFirestore/) Fixed an issue with parsing empty document, and an issue with the detection of date
* [HubSpot:](/integrations/builtin/app-nodes/n8n-nodes-base.hubspot/) Fixed an issue with the Return All option

### Contributors

[DeskYT](https://github.com/DeskYT), [Daniel Lazaro](https://github.com/1izardo), [DerEnderKeks](https://github.com/DerEnderKeks), [mdasmendel](https://github.com/mdasmendel)

## n8n@0.119.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.118.1...n8n@0.119.0) for this version.<br />
**Release date:** 2021-05-09

### Enhanced nodes

* [AWS Comprehend:](/integrations/builtin/app-nodes/n8n-nodes-base.awsComprehend/) Added the Detect Entities operation
* [AWS Lambda:](/integrations/builtin/app-nodes/n8n-nodes-base.awsLambda/) Added the ability to list functions recursively if the number of functions exceeds 50
* [Google Analytics:](/integrations/builtin/app-nodes/n8n-nodes-base.googleAnalytics/) Added pagination to the Report resource
* [Mailjet:](/integrations/builtin/app-nodes/n8n-nodes-base.mailjet/) Added Reply To parameter
* [Redis:](/integrations/builtin/app-nodes/n8n-nodes-base.redis/) Added the Increment operation
* [Spreadsheet File:](/integrations/builtin/core-nodes/n8n-nodes-base.spreadsheetFile/) Added the Header Row option
* [Webflow Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowTrigger/) Added Collection Item Created, Collection Item Updated, and Collection Item Deleted events

### Core Functionality
- Implemented timeout for subworkflows
- Removed the deregistration webhooks functionality from the webhook process

### Bug fixes

* [Google Cloud Firestore:](/integrations/builtin/app-nodes/n8n-nodes-base.googleCloudFirestore/) Fixed an issue with parsing null value
* [Google Sheets:](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Key Row parameter
* [HubSpot:](/integrations/builtin/app-nodes/n8n-nodes-base.zohoCrm/) Fixed an issue with the authentication

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

* [Kitemaker](/integrations/builtin/app-nodes/n8n-nodes-base.kitemaker/)
* [MQTT](/integrations/builtin/app-nodes/n8n-nodes-base.mqtt/)

### Enhanced nodes

* [CrateDB:](/integrations/builtin/app-nodes/n8n-nodes-base.crateDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [ERPNext:](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/) Added support for self-hosted ERPNext instances
* [FTP:](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/) Added the functionality to delete folders
* [Google Calendar:](/integrations/builtin/app-nodes/n8n-nodes-base.googleCalendar/) Added the Continue on Fail functionality
* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Added the functionality to add file name when downloading files
* [Gmail:](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) Added functionality to handle multiple binary properties
* [Microsoft Outlook:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOutlook/) Added Is Read and Move option to the Message resource
* [Postgres:](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [QuestDB:](/integrations/builtin/app-nodes/n8n-nodes-base.questDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [QuickBase:](/integrations/builtin/app-nodes/n8n-nodes-base.quickbase/) Added option to use Field IDs
* [TimescaleDB:](/integrations/builtin/app-nodes/n8n-nodes-base.timescaleDb/) Added query parameters. The Execute Query operation returns the result from all queries executed instead of just one of the results.
* [Twist:](/integrations/builtin/app-nodes/n8n-nodes-base.twist/) Added Get, Get All, Delete, and Update operations to the Message Conversation resource. Added Archive, Unarchive, and Delete operations to the Channel resource. Added Thread and Comment resource

### Core Functionality
- Implemented the native `fs/promise` library where possible
- Added the functionality to output logs to the console or a file
- We have updated the minimum required version for Node.js to v14.15. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01180) page

### Bug fixes

* [GetResponse Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.getResponseTrigger/) Fixed an issue with error handling
* [GitHub Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.githubTrigger/) Fixed an issue with error handling
* [GitLab Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabTrigger/) Fixed an issue with error handling
* [Google Sheets:](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Lookup operation for returning empty rows
* [Orbit:](/integrations/builtin/app-nodes/n8n-nodes-base.orbit/) Fixed issues with the Post resource
* [Redis:](/integrations/builtin/app-nodes/n8n-nodes-base.redis/) Fixed an issue with the node not returning an error
* [Xero:](/integrations/builtin/app-nodes/n8n-nodes-base.xero/) Fixed an issue with the Create operation for the Contact resource

### Contributors

[Gustavo Arjones](https://github.com/arjones), [lublak](https://github.com/lublak), [Colton Anglin](https://github.com/Colton), [Mika Luhta](https://github.com/mluhta)


## n8n@0.117.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.116.1...n8n@0.117.0) for this version.<br />
**Release date:** 2021-04-24

!!! warning "Breaking change"
    Please note that this version contains a breaking change. You can read more about it [here](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170).
    The features that introduced the breaking changes have been flagged below.


### New nodes

* [Mailcheck](/integrations/builtin/app-nodes/n8n-nodes-base.mailcheck/)
* [n8n Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.n8nTrigger/)
* [Workflow Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.workflowTrigger/)

### Enhanced nodes

* [CrateDB:](/integrations/builtin/app-nodes/n8n-nodes-base.crateDb/) Added the Mode option that allows you to execute queries as transactions
* [Nextcloud:](/integrations/builtin/app-nodes/n8n-nodes-base.nextcloud/) Added Delete, Get, Get All, and Update operation to the User resource
* [Postgres:](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/) Added the Mode option that allows you to execute queries as transactions
* [QuestDB:](/integrations/builtin/app-nodes/n8n-nodes-base.questDb/) Added the Mode option that allows you to execute queries as transactions
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Added Owner option to the Case and Lead resources. Added custom fields to Create and Update operations of the Case resource
* [Sentry.io:](/integrations/builtin/app-nodes/n8n-nodes-base.sentryIo/) Added Delete and Update operations to Project, Release, and Team resources
* [TimescaleDB:](/integrations/builtin/app-nodes/n8n-nodes-base.timescaleDb/) Added the Mode option that allows you to execute queries as transactions
* [Zendesk Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.zendeskTrigger/) Added support to retrieve custom fields

### Core Functionality
- The Activation Trigger node has been deprecated. It has been replaced by two new nodes - the n8n Trigger and the Workflow Trigger node. For more details, check out the entry in the [breaking changes](https://github.com/n8n-io/n8n/blob/master/packages/cli/BREAKING-CHANGES.md#01170) page
- Added the functionality to open the New Credentials dropdown by default

### Bug fixes

* [Google Sheets:](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) Fixed an issue with the Lookup operation for returning multiple empty rows
* [Intercom:](/integrations/builtin/app-nodes/n8n-nodes-base.intercom/) Fixed an issue with the User operation in the Company resource
* [Mautic:](/integrations/builtin/app-nodes/n8n-nodes-base.mautic/) Fixed an issue with sending the lastActive parameter

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

* [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googleBigQuery/)
* [Webflow](/integrations/builtin/app-nodes/n8n-nodes-base.webflow/)

### Enhanced nodes

* [Date & Time:](/integrations/builtin/core-nodes/n8n-nodes-base.dateTime/) Added Calculate a Date action that allows you to add or subtract time from a date
* [GitLab:](/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/) Added Get, Get All, Update, and Delete operations to the Release resource
* [Microsoft OneDrive:](/integrations/builtin/app-nodes/n8n-nodes-base.microsoftOneDrive/) Added Delete operation to the Folder resource
* [Monday:](/integrations/builtin/app-nodes/n8n-nodes-base.mondayCom/) Added support for OAuth2 authentication
* [MongoDB:](/integrations/builtin/app-nodes/n8n-nodes-base.mongoDb/) Added Limit, Skip, and Sort options to the Find operation and added Upsert parameter to the Update operation. Added the functionality to close the connection after use
* [MySQL:](/integrations/builtin/app-nodes/n8n-nodes-base.mySql/) Added support for insert modifiers and added support for SSL
* [RabbitMQ:](/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq/) Added the functionality to close the connection after use and added support for AMPQS

### Core Functionality

- Changed `bcrypt` library from `bcryptjs` to `@node-rs/bcrypt`
- Improved node error handling. Status codes and error messages in API responses have been standardized
- Added global timeout setting for all HTTP requests (except HTTP Request node)
- Implemented timeout for workers and corrected timeout for sub workflows

### Bug fixes

* [AWS SQS:](/integrations/builtin/app-nodes/n8n-nodes-base.awsSqs/) Fixed an issue with API version and casing
* [IMAP:](/integrations/builtin/core-nodes/n8n-nodes-base.imapEmail/) Fixed re-connection issue
* [Keap:](/integrations/builtin/app-nodes/n8n-nodes-base.keap/) Fixed an issue with the Opt In Reason parameter
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fixed an issue with loading custom fields

### Contributors

[Allan Daemon](https://github.com/AllanDaemon), [Anton Romanov](https://github.com/theone74), [Bart Vollebregt](https://github.com/bartvollebregt), [Cassiano Vailati](https://github.com/cassvail), [entrailz](https://github.com/entrailz), [Konstantin Nosov](https://github.com/nosovk), [LongYinan](https://github.com/Brooooooklyn)

## n8n@0.115.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.114.0...n8n@0.115.0) for this version.<br />
**Release date:** 2021-04-10

### New nodes

* [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleSlides/)

### Enhanced nodes

* [GitHub:](/integrations/builtin/app-nodes/n8n-nodes-base.github/) Added Release resource
* [TheHive:](/integrations/builtin/app-nodes/n8n-nodes-base.theHive/) Added support to fetch observable data types
* [RabbitMQ:](/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq/) Added header parameters

### Core Functionality

- Fixed an issue with expressions not being displayed in read-only mode
- Fixed an issue that didn't allow editing JavaScript code in read-only mode
- Added support for configuring the maximum payload size
- Added support to dynamically add menu items

### Bug fixes

* [Jira:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Fixed an issue with loading issue types with classic project type
* [RabbitMQ Trigger:](/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqTrigger/) Fixed an issue with the node reusing the same item
* [SendGrid:](/integrations/builtin/app-nodes/n8n-nodes-base.sendGrid/) Fixed an issue with the dynamic field generation

### Contributors

[Mika Luhta](https://github.com/mluhta), [Loran](https://github.com/loranmutafov), [stwonary](https://github.com/stwonary)

## n8n@0.114.0
For a comprehensive list of changes, check out the [commits](https://github.com/n8n-io/n8n/compare/n8n@0.113.0...n8n@0.114.0) for this version.<br />
**Release date:** 2021-04-03

### New nodes

* [AWS SQS](/integrations/builtin/app-nodes/n8n-nodes-base.awsSqs/)
* [Copper](/integrations/builtin/app-nodes/n8n-nodes-base.copper/)
* [ERPNext](/integrations/builtin/app-nodes/n8n-nodes-base.erpNext/)
* [Oura](/integrations/builtin/app-nodes/n8n-nodes-base.oura/)

### Enhanced nodes

* [Google Drive:](/integrations/builtin/app-nodes/n8n-nodes-base.googleDrive/) Added support for creating folders for shared drives
* [Google Sheets:](/integrations/builtin/app-nodes/n8n-nodes-base.googleSheets/) Added Create and Remove operation to the Sheet resource
* [Harvest:](/integrations/builtin/app-nodes/n8n-nodes-base.harvest/) Added Update operation to the Task resource
* [Jira:](/integrations/builtin/app-nodes/n8n-nodes-base.jira/) Added Reporter field to the Issue resource
* [Postgres:](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/) Added support for type casting

### Core Functionality

- Fixed an issue with the Redis connection to prevent memory leaks

### Bug fixes

* [Bitwarden:](/integrations/builtin/app-nodes/n8n-nodes-base.bitwarden/) Fixed an issue with the Update operation of the Group resource
* [Cortex:](/integrations/builtin/app-nodes/n8n-nodes-base.cortex/) Fixed an issue where only the last item got returned
* [Invoice Ninja:](/integrations/builtin/app-nodes/n8n-nodes-base.invoiceNinja/) Fixed an issue with the Project parameter
* [Salesforce:](/integrations/builtin/app-nodes/n8n-nodes-base.salesforce/) Fixed an issue with the Get All operation of the Custom Object resource

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
