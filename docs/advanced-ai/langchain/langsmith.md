---
contentType: howto
title: Use LangSmith with n8n
description: How to enable LangSmith for your self-hosted n8n instance.
---

# Use LangSmith with n8n

[LangSmith](https://www.langchain.com/langsmith) is a developer platform created by the LangChain team. You can connect your n8n instance to LangSmith to record and monitor runs in n8n, just as you can in a LangChain application.

/// info | Feature availability
Self-hosted n8n only.
///

## Connect your n8n instance to LangSmith

1. [Log in to LangSmith](https://smith.langchain.com/settings) and get your API key.

1. Set the LangSmith environment variables:

   | Variable                        | Value |
   | ------------------------------- | ----- |
   | `LANGCHAIN_ENDPOINT`            | `"https://api.smith.langchain.com"` |
   | `LANGCHAIN_TRACING_V2`          | `true` |
   | `LANGCHAIN_API_KEY`             | Set this to your API key |
   | `LANGCHAIN_PROJECT`             | Optional project name (defaults to `"default"`) |
   | `LANGCHAIN_CALLBACKS_BACKGROUND` | `true` (asynchronous trace upload) |

   /// note
   If you just created your LangSmith account, you will see a project named **"default"** only after the first trace is sent from n8n.  
   All traces go to this project unless you set `LANGCHAIN_PROJECT` to a different name.
   ///

   /// note
   Traces may appear with a short delay because `LANGCHAIN_CALLBACKS_BACKGROUND` defaults to asynchronous submission.  
   Set it to `false` if you prefer synchronous uploads for debugging.
   ///

   Set the variables so that they're available globally in the environment where you host your n8n instance. You can do this in the same way as the rest of your general configuration.

1. Restart n8n.

## Per-workflow LangSmith configuration

In addition to instance-wide environment variables, you can configure LangSmith tracing on a per-workflow basis. This lets you send traces from different workflows to different LangSmith projects or accounts without changing global settings.

### Set up a LangSmith credential

1. Go to **Settings** > **Credentials** and select **Add Credential**.
2. Search for **LangSmith API** and select it.
3. Enter your **API Key** from [LangSmith settings](https://smith.langchain.com/settings).
4. Optionally change the **API URL** if you use a self-hosted LangSmith instance.
5. Select **Save** to store the credential.

### Configure a workflow to use LangSmith

1. Open your workflow.
2. Select the **three dots icon** <span class="n8n-inline-image">![three dots icon](/_images/common-icons/three-dots-horizontal.png){.off-glb}</span> in the upper-right corner.
3. Select **Settings**.
4. In the **LangSmith** section:
   - **LangSmith Credential**: Select the LangSmith API credential to use for this workflow.
   - **LangSmith Project**: Enter the project name where traces should appear. Defaults to `"default"` if left empty.
5. Select **Save**.

Once configured, all AI node executions in that workflow send traces to the specified LangSmith project. This overrides any instance-level `LANGCHAIN_PROJECT` environment variable for this workflow.

/// note
The per-workflow setting requires creating a LangSmith API credential. The credential stores the API key securely using n8n's credential encryption.
///

For information on using LangSmith, refer to [LangSmith's documentation](https://docs.smith.langchain.com/).
