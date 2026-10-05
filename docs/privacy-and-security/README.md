---
description: n8n's privacy policies
tags:
  - gdpr
  - data collection
  - pid
  - payment processor
hide:
  - tags
contentType: explanation
nodeTitle: Privacy
originalFilePath: privacy-security/privacy.md
originalUrl: 'https://docs.n8n.io/privacy-security/privacy'
url: 'https://docs.n8n.io/privacy-and-security/privacy'
layout:
  description:
    visible: false
---



# Privacy <a href="#privacy" id="privacy"></a>

This page describes n8n's data privacy practices.

## GDPR <a href="#gdpr" id="gdpr"></a>

### Data processing agreement <a href="#data-processing-agreement" id="data-processing-agreement"></a>

For Cloud versions of n8n, n8n is considered both a Controller and a Processor as defined by the GDPR. As a Processor, n8n implements policies and practices that secure the personal data you send to the platform, and includes a [Data Processing Agreement](https://n8n.io/legal/#data) as part of the company's standard [Terms of Service](https://n8n.io/legal/#terms).

The n8n Data Processing Agreement includes the [Standard Contractual Clauses (SCCs)](https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en). These clarify how n8n handles your data, and they update n8n's GDPR policies to cover the latest standards set by the European Commission.

You can find a list of n8n sub-processors [here](https://n8n.io/legal/sub-processors/).

{% hint style="info" %}
**Self-hosted n8n**

For self-hosted versions, n8n is neither a Controller nor a Processor, as we don't manage your data.
{% endhint %}

### Submitting an account deletion request <a href="#submitting-an-account-deletion-request" id="submitting-an-account-deletion-request"></a>

Email [help@n8n.io](mailto:help@n8n.io) to make an account deletion request.

### Sub-processors <a href="#sub-processors" id="sub-processors"></a>

The sub-processor list is available at [n8n.io/legal/sub-processors](https://n8n.io/legal/sub-processors/).

### GDPR for self-hosted users <a href="#gdpr-for-self-hosted-users" id="gdpr-for-self-hosted-users"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iLayKGKnzGLWFd5VGZVk/" %}


## Telemetry

n8n collects a limited amount of information about how the product is used, so we can keep it working, fix what breaks, and decide what to build next. This page sets out what we collect, why, and what you can switch off.

The short version. We collect information about how you use n8n. We do not collect the data that flows through your workflows, and we do not collect your credentials.

### How to read this page

**Self-hosted** means n8n running on your own server. This covers both the free Community Edition and a paid licence, including Enterprise.

**n8n Cloud** means n8n hosted by us, that you use in your browser. Everything below applies to Cloud as well, with the differences set out in [If you use n8n Cloud](#if-you-use-n8n-cloud).

**Pseudonymous** means the data is tied to a code rather than to your name or email, and cannot be traced back to you without information we hold separately. It is still personal data under the GDPR and we treat it as such. 

### Who is responsible for this data

For the data that flows through your workflows on a self-hosted instance, n8n is neither a controller nor a processor. That data stays on your infrastructure and we never receive it.

Telemetry is different. Where your instance sends us usage and diagnostic data, n8n is the controller of that data and decides how it is used.

### What n8n collects for telemetry

n8n keeps telemetry pseudonymous wherever possible, and avoids collecting sensitive data. We collect the following categories.

| What we collect | Example | Why we collect it | Can you switch it off? |
| --- | --- | --- | --- |
| **Instance and configuration.** A code identifying your instance, the n8n version you run, your database and deployment type, selected configuration settings, and basic details of the server such as operating system, memory and CPUs. | Deployment type `default`, database postgres, version `1.105.0` | To tell whether an n8n update has broken something that was working, and to understand how instances are configured in practice | Yes |
| **Identifiers.** A code combining your instance and your user number, and a truncated IP address. The code does not contain your name or email.  | User `5678` on instance `abc123`. `12.214.31.144` is stored as `12.214.31.0` | To tell repeat activity apart from new activity, and to keep the service secure and stable | Yes |
+| **IP address.** A truncated IP address. The last part is removed, so what we store identifies a network rather than a device. On a self-hosted instance this is your server's address, not the address of the person at the browser. On n8n Cloud, see [If you use n8n Cloud](#if-you-use-n8n-cloud). We use it to work out the country an instance is in. | `12.214.31.144` is stored as `12.214.31.0` | To keep the service secure and stable, and to understand which countries n8n is used in | Yes |
| **What you do in the product.** Creating, saving, running and deleting workflows. The shape of your workflow, meaning which node types are connected to which, but not the information flowing through them. Which features and templates you use, and how you move around the interface. | "Workflow ran successfully in production for the first time" | To find where people get stuck, and to decide what to build next | Yes |
| **Errors and diagnostics.** Error messages and failure details from the interface and the server, failed executions, and system health signals. Error messages can sometimes include text drawn from your workflow, such as a node name or an error returned by a service you connect to. | `ECONNREFUSED`, together with the node type that failed | Troubleshooting, and keeping n8n reliable | Yes |
| **Which outside services you connect to.** The registrable domain of any address configured in an HTTP Request node, and the domain of webhook calls. Since January 2026 we no longer collect the subdomain or the path. | A node pointing at `api.stripe.com/v1/charges` is recorded as `stripe.com` | To decide which services deserve a purpose-built n8n integration | Yes |
| **Licence and usage counts.** Active workflows, total workflows, executions and how many users your instance has. If you hold a paid licence, these are reported with your licence identifier. | Active workflows: 3. Production executions: 45678 | To operate your licence and bill correctly, since n8n pricing is based on executions | No. These are needed to run your subscription or licence. |

### How collection works

Most data is sent to n8n as the events that generate it occur. Workflow execution counts and an instance pulse are sent every six hours.

### What n8n doesn't collect

-   The data that flows through your workflows, meaning the information your nodes send and receive
-   The contents of your credentials
-   Node parameters, other than the `resource` and `operation` a node is set to
-   Sensitive configuration settings, for example endpoints, ports, database connections and usernames or passwords
-   Error payloads

We do not sell telemetry data, and we do not share it for anyone else's commercial purposes.

### Turning telemetry off

Telemetry is on by default. To switch it off on a self-hosted instance, set the following environment variables. This has to be done by whoever administers the instance. There is no switch inside the n8n interface.

To opt out of telemetry events:

```shell
export N8N_DIAGNOSTICS_ENABLED=false
```

To opt out of checking for new versions of n8n:

```shell
export N8N_VERSION_NOTIFICATIONS_ENABLED=false
```

To disable the templates feature, which prevents background health check calls:

```shell
export N8N_TEMPLATES_ENABLED=false
```

See [configuration](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration) for how to set environment variables.

{% hint style="warning" %} What the opt-out does not cover

If you hold a paid licence, your instance continues to report usage counts and your licence identifier whether or not telemetry is switched off. This reporting is necessary to operate your licence and cannot be disabled.

Telemetry cannot currently be switched off on n8n Cloud.
{% endhint %}

### If you use n8n Cloud

Everything above applies to n8n Cloud as well, with three differences.

**You cannot switch telemetry off.** There is no opt-out for Cloud and no setting in the interface.

**The IP address we see is different.** For anything your Cloud instance sends, the address belongs to our infrastructure rather than to you. For the Cloud dashboard in your browser, it is your network's address, truncated in the same way as above.

**We record sessions in the n8n interface.** On Cloud only, we capture what happens on screen while you use n8n, so we can see where the product is confusing. Credential values are never recorded. Recordings are deleted after 21 days. 

### AI features

n8n integrates AI-powered features that use large language models. To answer you, n8n may send context about the workflow you have open to those models.

**What n8n sends**

- **General workflow information**, including which nodes are present, how many items are in the workflow, and whether the workflow is active
- **Input and output schemas of nodes**, meaning the shape of the data, not the values in it
- **Node configuration**, meaning the operations, options and settings chosen in the node in question
- **Code and expressions** in the node in question, so the model can help debug it

**What n8n doesn't send**

- **Credentials.** Any values in the credential fields of your nodes  
- **Output data.** The actual data processed by your workflows  
- **Sensitive information** that you have not explicitly put into node parameters or into the code of a [Code node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code)

Data is only sent to AI services if your workspace has opted in to use the Assistant, which is on by default for n8n Cloud. Node-specific data is transmitted only during a direct interaction with the Assistant. This data is not used to train the AI services' models.

## Documentation telemetry

This documentation site uses cookies to recognise your repeated visits and preferences, and to measure whether people find what they are looking for. You can control cookie consent using the cookie widget.

## Retention and deletion of personal identifiable data <a href="#retention-and-deletion-of-personal-identifiable-data" id="retention-and-deletion-of-personal-identifiable-data"></a>

PID (personal identifiable data) is data that's personal to you and would identify you as an individual.

### n8n Cloud <a href="#n8n-cloud" id="n8n-cloud"></a>

#### PID retention <a href="#pid-retention" id="pid-retention"></a>

n8n only retains data for as long as necessary to provide the core service. 

For n8n Cloud, n8n stores your workflow code, credentials, and other data for as long as your account is active, until you choose to delete it or close your account. The platform stores execution data according to the retention rules on your account.

n8n deletes most internal application logs and logs tied to sub-processors within 90 days. The company retains a subset of security and audit logs for longer periods where required for security investigations, and billing records for the period required by tax and accounting law.

#### PID deletion <a href="#pid-deletion" id="pid-deletion"></a>

If you delete your n8n account from the Cloud dashboard, n8n deletes the workflow, credential, user, and execution data associated with your account on the same day, and removes it from backups within 90 days.

If your account is closed without a deletion request, n8n deletes your customer data within 100 days of closure, with backups deleted within 90 days.

### Self-hosted <a href="#self-hosted" id="self-hosted"></a>

Self-hosted users should have their own PID policy and data deletion processes. Refer to [What you can do](what-you-can-do.md) for more information.

## Payment processor <a href="#payment-processor" id="payment-processor"></a>

n8n uses Paddle.com to process payments. When you sign up for a paid plan, Paddle transmits and stores the details of your payment method according to their security policy. n8n stores no information about your payment method.


