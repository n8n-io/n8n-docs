---
description: Frequently asked questions about n8n's Community License.
layout:
  description:
    visible: false
---

# n8n Community license FAQ

You may be wondering if you can use n8n's Sustainable Use License for your own project. Use this page for more guidance. In doubt, contact us at [license@n8n.io](mailto:license@n8n.io). 

{% hint style="info" %}
**Options (pick one before finalizing)**

1. If n8n’s workflow editor is used only by people in your organization, you can use n8n Community license for free.
2. If workflows are only created or modified by you or people in your organization, you can use n8n under the Community license for free.

{% endhint %}


## When does the community license apply?

The Community license, officially the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) (”**SUL**”), is free and applies to the self-hosted version of n8n only. n8n Cloud is a paid subscription with its own terms; this page doesn't apply to it.


{% hint style="info" %}
Sustainable Use License “**`Internal business purpose`**” refers to the use n8n within your organization or product where people outside of your business can receive or see what your workflows produce. 
{% endhint %}

## What you can do under the community license

- Use n8n community version to help run your business
- Use n8n community version for personal projects, learning or research.
- Build automations for your clients on your instance, as long as your clients do not have the possibility to create or edit them.
- Charge your customers for workflow creation, setup, and maintenance services.
- Charge your customers for training and consultancy services
- Use n8n behind the scenes in your own product, where users can use and trigger the automations you built, and even connect their own accounts to them.
- Run several instances of n8n community version

## What you cannot do under the community license

- Host n8n as a service and allow your clients to build workflows
- Allow external end users to build or configure their own workflows through your product, whether via a custom UI, our API, MCP, or an AI agent acting on the user's behalf.
- Fork n8n's code to launch your own automation product
- White-label n8n by removing our branding and offering n8n as is.
- Use enterprise features that ask for a license key without an Enterprise license.

## Still unsure?

If your use case isn't clearly covered by the examples above:

- For licensing questions, contact [license@n8n.io](mailto:license@n8n.io)
- To discuss a commercial license, contact [sales@n8n.io](mailto:sales@n8n.io)

## More examples

<details>
<summary>n8n as a backend engine in your own product</summary>

#### Under the Community license

You can use n8n as a backend processing engine in your own product under the Community license, as long as only your backend communicates with n8n, and end users do not access n8n UI or configure n8n workflows. 

#### Example: SaaS application using n8n for background data processing

A project management SaaS uses n8n to automatically score incoming support tickets. When a user submits a ticket, the app sends the data to n8n via an internal API call. n8n processes it and returns a priority score. The user sees only the result; n8n is invisible throughout.

This is allowed because n8n is a silent internal processing layer. No user credentials are involved, and the product's value comes from the application itself, not from n8n.

#### Example: Next.js platform using n8n for background marketing automation

A Next.js website uses n8n on a company-operated server to automate background marketing workflows: generating content ideas, scheduling posts, and managing integrations. End users interact only with the website. n8n is invisible — it is not a feature of the platform, and no user ever accesses or configures it.

This is allowed because n8n supports the operator's own operations. The operator's own API keys are used throughout, and the commercial value of the platform derives from the website and its content, not from n8n.

#### Example: SaaS platform with embedded workflow builder

A SaaS platform for freelancers includes a workflow automation feature where users build their own automations through a custom UI. n8n runs on the operator's server as the backend. Users never see n8n directly.

This is not allowed. The custom UI layer does not change the nature of the use. End users are configuring their own automation logic powered by n8n, and workflow building is the core commercial value of the product. The SUL test is not about UI visibility — it is about who controls the workflow logic and whose commercial interests are being served.

**What to do:** Contact [sales@n8n.io](mailto:sales@n8n.io) to discuss an Enterprise license, which is designed for this architecture.

</details>

<details>
<summary>Community or educational workshops</summary>

Ambassadors, community organizers or other organizations may use a self-hosted n8n instance for hands-on exercises during a free educational event, such as a meetup or workshop, where attendees temporarily build, reuse, or test workflows as part of the session.

This is allowed where the access is temporary, event-limited, and educational. Attendees should not retain ongoing access to the organizer’s instance after the event, and the instance should not be used to provide hosted n8n access as a service.

If attendees want to continue using n8n after the event, they should create their own n8n Cloud trial or self-host their own instance.

Organizers should remove attendee access and any attendee-provided credentials promptly after the event. If access is accidentally left in place, it should be removed as soon as discovered.
</details>

<details>
<summary>When product value derives from n8n</summary>

The Sustainable Use License restricts use where the commercial value of a product derives entirely or substantially from n8n functionality. In practice, this means: is n8n the thing being sold, or is it a tool that supports something else being sold?

#### Example: Technology training company using n8n for live workshop demonstrations

A technology education business self-hosts n8n to run live demonstrations during paid workshops on data, AI and automation. Learners interact with the n8n instance hands-on during sessions. No accounts or ongoing access are provided after the workshop ends.

This is allowed because the commercial product is the training itself, not n8n. n8n is illustrative — the same way a cooking school uses professional kitchen equipment without selling the equipment. Learner access is time-bounded and purpose-limited to the workshop. Fees are charged for the training, not for n8n access.

The conditions that keep this within SUL boundaries:

- n8n is not provided to participants as a deliverable
- No ongoing access after the session
- Only systems owned or controlled by the operator are connected
- No enterprise features used
- Fees are charged for the training service, not for n8n access

#### Example: “Automation-as-a-service”

A company sells a subscription product called “AutoOps” that lets customers:

- connect their apps (Google Workspace, Slack, HubSpot, etc.)
- build automations using a visual builder in AutoOps
- run those automations on a hosted backend

#### Why the value derives entirely or substantially from n8n:

- The commercial value is the automation capability itself, not some separate product where automation is incidental or services provided around n8n.
- Customers are buying the ability to create/operate workflows powered by n8n, regardless of whether they ever see the n8n UI.
</details>

<details>
<summary>Workflow building, credentials and control</summary>

There have been many questions around the use of third party credentials with n8n community edition. The key question is not whose credentials are used, but **who controls the workflow logic**. End users may connect their own accounts and credentials to automations you have built for them, as long as they cannot access the n8n workflow builder or configure workflow logic themselves. 

Whether credentials are end-user-owned or operator-owned is secondary; what matters is whether the end user can build or modify workflows. The test is also medium-neutral: what matters is whether the end user determines the workflow logic, not the interface used (UI, n8n API, MCP, or an AI agent acting for the user). Triggering or executing pre-built workflows via API or webhooks is fine. 

#### Example: Document processing tool with customer-hosted n8n and customer credentials

A software vendor sells a document processing tool that retrieves email attachments, extracts data from PDFs using OCR, and writes results into a customer's SQL database. n8n is self-hosted at the customer's premises. Customers enter their own credentials (e.g. OpenAI) into the n8n instance. The vendor charges a monthly fee for the document processing platform.

This is permissible, but it may sit in gray territory. Shipping n8n to your customers as part of a paid product comes with extra conditions under the license, and once the customer has local access, it's hard to guarantee they can't build workflows. Confirm your architecture with [license@n8n.io](mailto:license@n8n.io) before launch.

#### Example: Freelance consultant using client-owned credentials in shared n8n instance

A freelance automation consultant runs a single self-hosted n8n instance and builds custom workflows for clients. Each client generates their own OAuth credentials or API keys, and opens n8n to authenticate to the service via OAuth. 

This is allowed. The clients have no access to the n8n interface or workflow logic. What makes this permissible is not that the consultant enters the credentials, it is that clients cannot build or modify workflows.
</details>

<details>
<summary>Consulting and agency use</summary>

If you want to manage n8n across multiple client environments, contact [license@n8n.io](mailto:license@n8n.io); a **partner program** covering multi-instance management is in development. 

Consulting and automation services are explicitly permitted under the Sustainable Use License. The key condition is that n8n remains your internal tool, where clients receive outputs, not access.

#### Can I use n8n to deliver automation solutions to multiple clients as a managed service?

Yes, provided clients do not access your n8n instance directly.

Building, running, and maintaining workflows on your own n8n instance on behalf of clients is permitted, including charging consulting or development fees. There is no limit on the number of clients you can serve from a single instance. The determining factor is client access, not client count or revenue volume.

#### Example: Automation agency

An automation consultant builds custom n8n workflows for small business clients on a single n8n instance hosted by the agency. Clients pay consulting fees and receive only the automation outputs: automated messages, synced data, chatbot responses. No client has access to n8n, its interface, or the underlying workflows.

- Single n8n instance operated entirely by the consultant
- Clients pay for outcomes, not for n8n access
- Clients receive outputs only
- No client access to n8n interface or workflow logic

#### Can I install and manage n8n on a client's own server?

Yes, provided that you are not *also* hosting for them. Where a client runs n8n on their own infrastructure and needs consultancy or implementation services, you can charge the client for installing, configuring, building workflows, and maintaining n8n on their behalf. This is allowed as long as you don’t offer hosting as well, which would compete with n8n's own Cloud offering. 

<details>
<summary>More prohibited uses</summary>

The following are explicitly prohibited under the Sustainable Use License, regardless of how the use case is structured.

#### Building a competing automation product

The Sustainable Use License restricts use to internal business purposes or non-commercial/personal use. Using n8n's source code to build a product that competes with n8n — such as a workflow automation platform, an iPaaS tool, or any product whose core value is automation orchestration — falls outside those permitted uses. This applies whether or not you charge for the competing product, and whether or not you modify the source code.

#### Forking n8n to create a derivative automation platform

Forks and derivative works are permitted for personal, non-commercial, or internal use only. Creating a fork specifically to offer automation-as-a-service or to launch a competing product is not permitted under the SUL.

#### Using enterprise-only features without an Enterprise license

Enterprise-only features are identifiable by the `.ee.` string in their source file names. Using these features without a valid Enterprise license is a breach of the license terms regardless of whether you are self-hosting or using n8n Cloud. If you are unsure whether a feature you are using is enterprise-only, contact [license@n8n.io](mailto:license@n8n.io).
</details>


