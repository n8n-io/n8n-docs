---
description: Configure Google Vertex AI credentials with a service account, Google Cloud project, and region.
layout:
  description:
    visible: false
---

# Google Vertex AI credentials

Use Google Vertex AI credentials to connect n8n to Vertex AI with a service account, project, and region.

You can use these credentials with the following nodes:

* [Google Vertex Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglevertex.md)
* [Embeddings Google Vertex](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglevertex.md)

## Prerequisites

* A [Google Cloud](https://cloud.google.com/) account.
* A Google Cloud project with billing and the Vertex AI API (`aiplatform.googleapis.com`) enabled. Refer to [Google's project setup guide](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal).
* A service account with access to Vertex AI in that project. Grant the service account the `roles/aiplatform.user` role, or a custom role with the required Vertex permissions. Refer to [Google's access control documentation](https://cloud.google.com/vertex-ai/docs/general/access-control).
* A JSON key for the service account. Your organization must allow service account keys. Refer to [Create a service account key](https://cloud.google.com/iam/docs/keys-create-delete#creating).

The service account can belong to a different project. Grant its Vertex AI permissions in the project you select in the credential.

## Supported authentication methods

* Service account email and private key.

## Related resources

Refer to [Google's Vertex AI documentation](https://cloud.google.com/vertex-ai/generative-ai/docs) for more information about the service.

## Using a service account

Create a **Google Vertex AI** credential in n8n. Open your service account's JSON key file, then complete these fields:

| Field | Value |
| --- | --- |
| **Region** | A location that supports your model. The default is **Global (multi-region) - global**. Refer to [Google's model locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations). |
| **Service Account Email** | The `client_email` value from the JSON key file. |
| **Private Key** | The complete `private_key` value from the JSON key file, including the `BEGIN PRIVATE KEY` and `END PRIVATE KEY` lines. Omit the surrounding JSON quotation marks. |
| **Impersonate a User** | Leave off when you use the Vertex nodes. |
| **Set up for use in HTTP Request node** | Leave off when you use the Vertex nodes. |
| **Project** | Select a listed project, or select **Custom** to enter a project ID. The default is **Custom**. Enter the email and private key before loading the list. |
| **Project ID** | The Google Cloud project ID, such as `my-project-id`. This field appears when **Project** is **Custom**. Use the project ID, rather than its display name or project number. |

Select **Save** to save the credential.

### Select a project

The project list uses the service account's access, rather than your personal Google account. Google returns projects for which the service account has the `resourcemanager.projects.get` permission. Refer to [Google's project search documentation](https://cloud.google.com/resource-manager/reference/rest/v3/projects/search).

If the project list is empty or fails to load, select **Custom** and enter the **Project ID**. Project lookup is optional. The service account still needs Vertex AI access in the selected project.

A listed project doesn't confirm access to Vertex models. The project's enabled APIs, permissions, and model availability still apply.

### Use the credential in a workflow

1. Open a **Google Vertex Chat Model** or **Embeddings Google Vertex** node.
2. Set **Authentication** to **Google Vertex AI**.
3. Select your **Google Vertex AI** credential.
4. Select a model available in your project and region.

With this authentication method, the node reads the project from the credential. The credential also supplies the default region. A node's **Region** setting can override the credential's region.

Existing workflows can continue to use **Google Service Account** authentication. With that method, the project stays in the node. Refer to [Google Service Account credentials](google/service-account.md) for that setup.

## Common issues

### Project lookup fails

If Google reports a disabled [Cloud Resource Manager API](https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com), enable it in the project named in the error. Check that the service account has `resourcemanager.projects.get` on the project you want to select. You can use **Custom** project entry while you resolve lookup access.

### Vertex returns a permission error

Check the service account's role in the project selected in the credential. A role in the service account's own project doesn't grant access to another project. Also enable billing and the Vertex AI API for the selected project.

### The model is unavailable

Check that the model supports the credential's **Region**, or the node's **Region** override. Refer to [Google's model locations](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) for supported endpoints. Project lookup doesn't check model availability.
