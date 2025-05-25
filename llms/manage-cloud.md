

# manage-cloud/ai-assistant.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# AI Assistant

The n8n AI Assistant helps you build, debug, and optimize your workflows seamlessly. From answering questions about n8n to providing help with coding and [expressions](/glossary.md#expression-n8n), the AI Assistant can streamline your workflow-building process and support you as you navigate n8n's capabilities.

## Current capabilities

The AI Assistant offers a range of tools to support you:

- **Debug helper**: Identify and troubleshoot node execution issues in your workflows to keep them running without issues.
- **Answer n8n questions**: Get instant answers to your n8n-related questions, whether they're about specific features or general functionality.
- **Coding support**: Receive guidance on coding, including SQL and JSON, to optimize your nodes and data processing.
- **Expression assistance**: Learn how to create and refine [expressions](/code/expressions.md) to get the most out of your workflows.
- **Credential setup tips**: Find out how to set up and manage node [credentials](/integrations/builtin/credentials/index.md) securely and efficiently.

## Tips for getting the most out of the Assistant

1. **Engage in a conversation**: The AI Assistant can collaborate with you step-by-step. If a suggestion isn't what you need, let it know! The more context you provide, the better the recommendations will be.
<!-- vale from-microsoft.FirstPerson = NO -->
2. **Ask specific questions**: For the best results, ask focused questions (for example, "How do I set up credentials for Google Sheets?"). The assistant works best with clear queries.
3. **Iterate on suggestions**: Don't hesitate to build on the assistant's responses. Try different approaches and keep refining based on the assistant's feedback to get closer to your ideal solution.
4. **Things to try out**:
    - Debug any error you're seeing
    - Ask how to setup credentials
    - "Explain what this workflow does."
    - "I need your help to write code: [Explain your code here]"
    - "How can I build X in n8n?"
<!-- vale from-microsoft.FirstPerson = YES -->

## FAQs

<!-- vale from-microsoft.HeadingPunctuation = NO -->
### What context does the Assistant have?

The AI Assistant has access to all elements displayed on your n8n screen, excluding actual input and output data values (like customer information). To learn more about what data n8n shares with the Assistant, refer to [AI in n8n](https://docs.n8n.io/privacy-security/privacy/#ai-in-n8n).

<!-- vale from-microsoft.FirstPerson = NO -->
### Who can use the Assistant?
<!-- vale from-microsoft.FirstPerson = YES -->

Any user on a Cloud plan can use the assistant.

### How does the Assistant work?

The underlying logic of the assistant is build with the advanced AI capabilities of n8n. It uses a combination of different [agents](/glossary.md#ai-agent), specialized in different areas of n8n, RAG to gather knowledge from the docs and the community forum, and custom prompts, [memory](/glossary.md#ai-memory) and context.
<!-- vale from-microsoft.HeadingPunctuation = YES -->


# manage-cloud/change-ownership-or-username.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Change Instance Ownership or Username
Description: Change instance ownership or username.
contentType: howto
---

## Change instance ownership

You can change the ownership of an instance by navigating to the **Settings** page in the owner's account and editing the **Email** field. After making the changes, scroll down and press **Save**.
Note that for the change to be effective, the new email address can't be linked to any other n8n account.

Changing emails will change the owner of the instance, the email you log in with, and the email your invoices and general communication gets sent to.

If the workspace is deactivated, there will be no **Settings** page and no possibility to change the email address or the owner info.

## Change instance username

It's not currently possible to change usernames.

If you want your instance to have a different name you will need to create a new account and transfer your work into it. [The import/export documentation](https://docs.n8n.io/workflows/export-import/) explains how you can transfer your work to a new n8n instance.


# manage-cloud/cloud-admin-dashboard.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to access the Cloud admin dashboard.
contentType: howto
---

# Cloud admin dashboard

Instance owners can access the admin dashboard to manage their Cloud instance. This is where you can upgrade your n8n version and set the timezone.

## Access the dashboard from the app

1. [Log in to n8n](https://app.n8n.cloud/magic-link){:target=_blank .external-link}
1. Select **Admin Dashboard**. n8n opens the dashboard.

## Access the dashboard if the app is offline

If your instance is down, you can still access the admin dashboard. When you log in to the app, n8n will ask you if you want a magic link to access your dashboard. Select **Send magic link**, then check your email for the link.


# manage-cloud/cloud-data-management.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to manage your data on Cloud.
contentType: howto
---

# Cloud data management

There are two concerns when managing data on Cloud:

* Memory usage: complex workflows processing large amounts of data can exceed n8n's memory limits. If this happens, the instance can crash and become inaccessible.
* Data storage: depending on your execution settings and volume, your n8n database can grow in size and run out of storage. 

To avoid these issues, n8n recommends that you build your workflows with memory efficiency in mind, and don't save unnecessary data

## Memory limits on each Cloud plan

Current plans:

* Trial: 320MiB RAM, 10 millicore CPU burstable
* Starter: 320MiB RAM, 10 millicore CPU burstable
* Pro-1 (10k executions): 640MiB RAM, 20 millicore CPU burstable
* Pro-2 (50k executions): 1280MiB RAM, 80 millicore CPU burstable
* Enterprise: 4096MiB RAM, 80 millicore CPU burstable

Legacy plans:

* Start: 320MiB RAM, 10 millicore CPU burstable
* Power: 1280MiB RAM, 80 millicore CPU burstable

n8n gives each instance up to 100GB of data storage.

## How to reduce memory consumption in your workflow

The way you build workflows affects how much data they consume when executed. Although these guidelines aren't applicable to all cases, they provide a baseline of best practices to avoid exceeding instance memory.

--8<-- "_snippets/self-hosting/scaling/reduce-memory-consumption.md"

Note that n8n itself consumes memory to run. On average, the software alone uses around 180MiB RAM.

Interactions with the UI also consume memory. Playing around with the workflow UI while it performs heavy executions could also push the memory capacity over the limit.

## How to manage execution data on Cloud

Execution data includes node data, parameters, variables, execution context, and binary data references. It's text-based.

Binary data is non-textual data that n8n can't represent as plain text. This is files and media such as images, documents, audio files, and videos. It's much larger than textual data.

If a workflow consumes a large amounts of data and is past testing stage, it's a good option to stop saving the successful executions.

There are two ways you can control how much execution data n8n stores in the database:

In the admin dashboard:

1. From your workspace or editor, navigate to **Admin Panel**.
1. Select **Manage**.
1. In **Executions to Save** deselect the executions you don't want to log.

In your workflow settings:

1. Select the **Options** <span class="inline-image">![Options menu](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> menu.
1. Select **Settings**. n8n opens the **Workflow settings** modal.
1. Change **Save successful production executions** to **Do not save**.

## Cloud data pruning and out of memory incident prevention

### Automatic data pruning

n8n automatically prunes execution logs after a certain time or once you reach the max storage limit, whichever comes first. The pruning always happens from oldest to newest and the limits depend on your Could plan:

* Start and Starter plans: max 2500 executions saved and 7 days execution log retention;
* Pro and Power plans: max 25000 executions saved and 30 days execution log retention;
* Enterprise plan: max 50000 executions saved and unlimited execution log retention time.

### Manual data pruning

Heavier executions and use cases can exceed database capacity despite the automatic pruning practices. In cases like this, n8n will manually prune data to protect instance stability.

1. An alert system warns n8n if an instance is at 85% disk capacity.
2. n8n prunes execution data. n8n does this by running a backup of the instance (workflows, users, credentials and execution data) and restoring it without execution data.
 	

Due to the human steps in this process, the alert system isn't perfect. If warnings are triggered after hours or if data consumption rates are high, there might not be time to prune the data before the remaining disk space fills up.


# manage-cloud/cloud-ip.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: reference
---

# Cloud IP addresses

/// warning | Cloud IP addresses change without warning
n8n can't guarantee static source IPs, as Cloud operates in a dynamic cloud provider environment and scales its infrastructure to meet demand. You should use strong authentication and secure transport protocols when connecting into and out of n8n.
///

Outbound traffic may appear to originate from any of:

* 20.79.227.226/32
* 20.113.47.122/32
* 20.218.202.73/32
* 98.67.233.91/32
* 4.182.111.50/32
* 4.182.129.20/32
* 4.182.88.118/32
* 4.182.212.136/32
* 98.67.244.108/32
* 72.144.128.145/32
* 72.144.83.147/32
* 72.144.69.38/32
* 72.144.111.50/32
* 4.182.128.108/32
* 4.182.190.144/32
* 4.182.191.184/32
* 98.67.233.200/32

* 20.52.126.0/28
* 20.218.238.112/28
* 4.182.64.64/28
* 20.218.174.0/28


# manage-cloud/concurrency.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Cloud concurrency

/// info | Only for n8n Cloud
This document discusses concurrency in n8n Cloud. Read [self-hosted n8n concurrency control](/hosting/scaling/concurrency-control.md) to learn how concurrency works with self-hosted n8n instances.
///

Too many concurrent executions can cause performance degradation and unresponsiveness. To prevent this and improve instance stability, n8n sets concurrency limits for production executions in regular mode.

Any executions beyond the limits queue for later processing. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

## Concurrency limits

n8n limits the number of concurrent executions for Cloud instances according to their plan:

* Starter and Trial: 5
* Pro (10k workflow executions, 15 active workflows): 20
* Pro (50k workflow executions, 50 active workflows): 50
* Enterprise (in regular mode): 200

You can view the number of active executions and your plan's concurrency limit at the top of a project's or workflow's executions tab.

## Details

Some other details about concurrency to keep in mind:

- Concurrency control applies only to production executions: those started from a webhook or trigger node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, or error executions.
- [Test evaluations](/glossary.md#evaluation-n8n) do not count towards concurrency limits. Your test evaluation concurrency limit is equal to, but separate from, your plan's regular concurrency limit.
- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.
- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.

## Comparison to queue mode

/// info | Feature availability
Queue mode is available for Cloud Enterprise plans. To enable it, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa){:target=_blank .external-link}.
///

Concurrency in queue mode is a separate mechanism from concurrency in regular mode. In queue mode, the concurrency settings determine how many jobs each worker can run in parallel. In regular mode, concurrency limits apply to the entire instance.


# manage-cloud/download-workflows.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Download workflows
description: How to download workflows from n8n Cloud with the admin dashboard.
contentType: howto
---

# Download workflows

n8n Cloud instance owners can download workflows from the most recent backup.

You can do this with the [Cloud admin dashboard](/manage-cloud/cloud-admin-dashboard.md).

## How to download workflows

1. [Log in to n8n](https://app.n8n.cloud/magic-link).
1. Select **Admin Dashboard** to open the dashboard.
1. In the **Manage** section, select the **Export** tab.
1. Select **Download Workflows**.

## Accessing workflows after your free trial

You have **90 days** to download your workflows after your free trial ends. After that, all workflows will be **permanently deleted** and are unrecoverable.


# manage-cloud/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
hide:
  - toc
---

# n8n Cloud

n8n Cloud is n8n's hosted solution. It provides:

- No technical set up or maintenance for your n8n instance
- Continual uptime monitoring
- Managed OAuth for authentication
- One-click upgrades to the newest n8n versions

[Sign up for n8n Cloud](https://www.n8n.io/){:target=_blank .external-link}

/// note | Russia and Belarus
n8n Cloud isn't available in Russia and Belarus. Refer to this blog post: [Update on n8n cloud accounts in Russia and Belarus](https://blog.n8n.io/update-on-n8n-cloud-accounts-in-russia-and-belarus/) for more information.
///







# manage-cloud/set-cloud-timezone.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to set your timezone on n8n Cloud.
contentType: howto
---

# Set the Cloud instance timezone

You can change the timezone for your n8n instance. This affects the [Schedule Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/index.md) and [Date & Time node](/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md). Users can configure the timezone for individual workflows in [Workflow settings](/workflows/settings.md).

1. On your dashboard, select **Manage**.
1. Change the **Timezone** dropdown to the timezone you want.


# manage-cloud/update-cloud-version.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: How to update your n8n version on Cloud.
contentType: howto
---

# Update your Cloud version

n8n recommends regularly updating your Cloud version. Check the [Release notes](/release-notes.md) to learn more about changes.

/// info
Only instance owners can upgrade n8n Cloud versions. Contact your instance owner if you don't have permission to update n8n Cloud.
///

1. [Log in to the n8n Cloud dashboard](https://app.n8n.cloud/manage){:target=_blank .external-link}
1. On your dashboard, select **Manage**.
1. Use the **n8n version** dropdown to select your preferred release version: 
	* Latest Stable: recommended for most users.
	* Latest Beta: get the newest n8n. This may be unstable.
1. Select **Save Changes** to restart your n8n instance and perform the update. 
1. In the confirmation modal, select **Confirm**.


## Best practices for updating

--8<-- "_snippets/manage-cloud/updating-best-practices.md"

## Automatic update

n8n automatically updates outdated Cloud instances. 

If you don't update you instance for 120 days, n8n emails you to warn you to update. After a further 30 days, n8n automatically updates your instance.
