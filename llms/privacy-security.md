

# privacy-security/incident-response.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Incident response
description: n8n's incident response procedures.
contentType: explanation
---
<!-- vale off -->
# Incident response

n8n implements incident response best practices for identifying, documenting, resolving and communicating incidents. 

n8n publishes incident notifications to a status page at [n8n Status](https://status.n8n.cloud/){:target=_blank .external-link}.

n8n notifies customers of any data breaches according to the company's [Data Processing Addendum](https://n8n.io/legal/#data){:target=_blank .external-link}.
<!-- vale on -->


# privacy-security/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Privacy and security
description: Learn about privacy and security at n8n. Explore how n8n handles and secures your data, with an overview of key policies and procedures.
contentType: overview
---
<!-- vale off -->
# Privacy and security at n8n

n8n is committed to the privacy and security of your data. This section outlines how n8n handles and secures data. This isn't an exhaustive list of practices, but an overview of key policies and procedures.

If you have any questions related to data privacy, email privacy@n8n.io. 

If you have any security-related questions, or if you want to report a suspected vulnerability, email security@n8n.io.

[[% import "_macros/section-toc.html" as sectionToc %]]

[[ sectionToc.sectionToc(page) ]]

<!-- vale on -->


# privacy-security/privacy.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: n8n's privacy policies
tags:
  - gdpr
  - data collection
  - pid
  - payment processor
hide:
  - tags
contentType: explanation
---

<!-- vale off -->

# Privacy

This page describes n8n's data privacy practices.

## GDPR

### Data processing agreement

For Cloud versions of n8n, n8n is considered both a Controller and a Processor as defined by the GDPR. As a Processor, n8n implements policies and practices that secure the personal data you send to the platform, and includes a [Data Processing Agreement](https://n8n.io/legal/#data){:target=_blank .external-link} as part of the company's standard [Terms of Service](https://n8n.io/legal/#terms){:target=_blank .external-link}.

The n8n Data Processing Agreement includes the [Standard Contractual Clauses (SCCs)](https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en){:target=_blank .external-link}. These clarify how n8n handles your data, and they update n8n's GDPR policies to cover the latest standards set by the European Commission.

You can find a list of n8n sub-processors [here](https://n8n.io/legal/#subprocessors){:target=_blank .external-link}.

/// note | Self-hosted n8n
For self-hosted versions, n8n is neither a Controller nor a Processor, as we don't manage your data
///
### Submitting a GDPR deletion request

Email privacy@n8n.io to request data deletion.

### Sub-processors

This is a list of sub-processors authorized to process customer data for n8n's service. n8n audits each sub-processor's security controls and applicable regulations for the protection of personal data.

| Sub-processor name | Contact details | Geographic location of processing |
| ------------------ | --------------- | --------------------------------- |
| Microsoft Azure | Microsoft Azure <br /> 1 Microsoft Way <br /> Redmond <br /> WA 98052 <br /> USA <br /> Contact information: https://privacy.microsoft.com/en-GB/privacystatement#mainhowtocontactusmodule | Germany (West Central Region) |
| Hetzner Online | Hetzner Online GmbH <br /> Industriestr. 25 <br /> 91710 Gunzenhausen <br /> Germany <br /> data-protection@hetzner.com | Germany |

Subscribe [here](https://n8n-community.typeform.com/to/FdeRxSkH?typeform-source=n8n.io){:target=_blank .external-link} to receive updates when n8n adds or changes a sub-processor.

### GDPR for self-hosted users

--8<-- "_snippets/privacy-security/gdpr-self-hosted.md"



## Data collection 

n8n collects selected usage and performance data to help diagnose problems and improve the platform. Read about how n8n stores and processes this information in the [privacy policy](https://n8n.io/legal/#privacy){:target=_blank .external-link}.

The data gathered is different in self-hosted n8n and n8n Cloud.

### Data collection in self-hosted n8n

n8n takes care to keep self-hosted data anonymous and avoids collecting sensitive data. 

#### What n8n collects

- Error codes and messages of failed executions (excluding any payload data, and not for custom nodes)
- Error reports for app crashes and API issues
- The graph of a workflow (types of nodes used and how they're connected)
- From node parameters:
    - The 'resource' and 'operation' that a node is set to (if applicable)
    - For HTTP request nodes, the domain, path, and method (with personal data anonymized)
- Data around workflow executions:  
    - Status
    - The user ID of the user who ran the execution
    - The first time a workflow loads data from an external source
    - The first successful production (non-manual) workflow execution
- The domain of webhook calls, if specified (excluding subdomain).
- Details on how the UI is used (for example, navigation, nodes panel searches)
- Diagnostic information:
    - n8n version
    - Selected settings:
        - DB_TYPE
        - N8N_VERSION_NOTIFICATIONS_ENABLED
        - N8N_DISABLE_PRODUCTION_MAIN_PROCESS
        - [Execution variables](/hosting/configuration/environment-variables/executions.md)
    - OS, RAM, and CPUs
    - Anonymous instance ID
 - IP address

#### What n8n doesn't collect

n8n doesn't collect private or sensitive information, such as:

- Personally identifiable information (except IP address)
- Credential information
- Node parameters (except 'resource' and 'operation')
- Execution data
- Sensitive settings (for example, endpoints, ports, DB connections, username/password)
- Error payloads

#### How collection works

Most data is sent to n8n as events that generate it occur. Workflow execution counts and an instance pulse are sent periodically (every 6 hours).

#### Opting out of telemetry

Telemetry collection is enabled by default. To disable it you can configure the following environment variables.

To opt out of telemetry events:

```bash
export N8N_DIAGNOSTICS_ENABLED=false
```

To opt out of checking for new versions of n8n:

```bash
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

See [configuration](/hosting/configuration/configuration-methods.md) for more info on how to set environment variables.

### Data collection in n8n Cloud

n8n Cloud collects everything listed in [Data collection in self-hosted n8n](#data-collection-in-self-hosted-n8n).

Additionally, in n8n Cloud, n8n uses [PostHog](https://posthog.com/){:target=_blank .external-link} to track events and visualise usage, including using session recordings. Session recordings comprise the data seen by a user on screen, with the exception of credential values. n8n's product team uses this data to improve the product. All recordings are deleted after 21 days.

### AI in n8n

To provide enhanced assistance, n8n integrates AI-powered features that leverage Large Language Models (LLMs).

#### How n8n uses AI

To assist and improve user experience, n8n may send specific context data to LLMs. This context data is strictly limited to information about the current workflow. n8n does not send any values from credential fields or actual output data to AI services. The data will not be incorporated, used, or retained to train the models of the AI services. Any data will be deleted after 30 days.

#### When n8n shares data

Data is only sent to AI services if workspaces have opted in to use the assistant. The Assistant is enabled by default for n8n Cloud users. When a workspace opts in to use the assistant, node-specific data is transmitted only during direct interactions and active sessions with the AI assistant, ensuring no unnecessary data sharing occurs.

#### What n8n shares

- **General Workflow Information**: This includes details about which nodes are present in your workflow, the number of items currently in the workflow, and whether the workflow is active.
- **Input & Output Schemas of Nodes**: This includes the schema of all nodes with incoming data and the output schema of a node in question. We do not send the actual data value of the schema.
- **Node Configuration**: This includes the operations, options, and settings chosen in the referenced node.
- **Code and Expressions**: This includes any code or expressions in the node in question to help with debugging potential issues and optimizations.

#### What n8n doesn't share

- **Credentials**: Any values of the credential fields of your nodes.
- **Output Data**: The actual data processed by your workflows.
- **Sensitive Information**: Any personally identifiable information or other sensitive data that could compromise your privacy or security that you have not explicitly mentioned in node parameters or your code of a [Code Node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

### Documentation telemetry

n8n's documentation (this website) uses cookies to recognize your repeated visits and preferences, as well as to measure the effectiveness of n8n's documentation and whether users find what they're searching for. With your consent, you're helping n8n to make our documentation better.

[Change cookie settings](#__consent){ .md-button }

## Retention and deletion of personal identifiable data

PID (personal identifiable data) is data that's personal to you and would identify you as an individual.

### n8n Cloud

#### PID retention

n8n only retains data for as long as necessary to provide the core service. 

For n8n Cloud, n8n stores your workflow code, credentials, and other data indefinitely, until you choose to delete it or close your account. The platform stores execution data according to the retention rules on your account.

n8n deletes most internal application logs and logs tied to subprocessors within 90 days. The company retains a subset of logs for longer periods where required for security investigations.

#### PID deletion

If you choose to delete your n8n account, n8n deletes all customer data and event data associated with your account. n8n deletes customer data in backups within 90 days.

### Self-hosted

Self-hosted users should have their own PID policy and data deletion processes. Refer to [What you can do](/privacy-security/what-you-can-do.md) for more information.

## Payment processor

n8n uses Paddle.com to process payments. When you sign up for a paid plan, Paddle transmits and stores the details of your payment method according to their security policy. n8n stores no information about your payment method.

<!-- vale on -->


# privacy-security/what-you-can-do.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What you can do
description: What you can do to improve privacy and data security when using n8n.
contentType: howto
---
<!-- vale off -->
# What you can do

It's also your responsibility as a customer to ensure you are securing your code and data. This document lists some steps you can take.

## All users

* Report security issues and [terms of service](https://n8n.io/legal/#terms){:target=_blank .external-link} violations to security@n8n.io.
* If more than one person uses your n8n instance, set up [User management](/user-management/index.md) and follow the [Best practices](/user-management/best-practices.md).
* Use OAuth to connect integrations whenever possible.

## Self-hosted users

If you self-host n8n, there are additional steps you can take:

* Set up a reverse proxy to handle TLS, ensuring data is encrypted in transit.
* Ensure data is encrypted at rest by using encrypted partitions, or encryption at the hardware level, and ensuring n8n and its database is written to that location.
* Run a [Security audit](/hosting/securing/security-audit.md).
* Be aware of the [Risks](/integrations/community-nodes/risks.md) when installing community nodes, or choose to disable them.
* Make sure users can't import external modules in the Code node. Refer to [Environment variables | Nodes](https://docs.n8n.io/hosting/configuration/environment-variables/nodes) for more information.
* Choose to exclude certain nodes. For example, you can disable nodes like Execute Command or SSH. Refer to [Environment variables | Nodes](https://docs.n8n.io/hosting/configuration/environment-variables/nodes) for more information.
* For maximum privacy, you can [Isolate n8n](/hosting/configuration/configuration-examples/isolation.md).

### GDPR for self-hosted users

--8<-- "_snippets/privacy-security/gdpr-self-hosted.md"

<!-- vale on -->
