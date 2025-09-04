---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mindee V2 node documentation
description: Learn how to use the Mindee V2 node in n8n. Follow technical documentation to integrate Mindee node into your workflows.
contentType: [integration, reference]
---

# Mindee V2 node

Use the **Mindee V2** node to analyze **any kind of document** (invoices, receipts, ID cards, contracts, payslips, custom models, …) with Mindee’s V2 “Queues & Polling” API.  
Unlike the deprecated V1 node, the V2 node is **model-agnostic**: just specify the *Model ID* you want to run (an off-the-shelf or a custom one) and Mindee returns a structured JSON for every page.

On this page you will find:

* Supported operations  
* All node parameters  
* Links to credentials setup and templates

/// note | Credentials  
Refer to [Mindee V2 credentials](/integrations/builtin/credentials/mindeev2Api.md) for guidance on creating and storing your API key.  
///

## Operations

Mindee V2 currently exposes one generic operation:

| Resource  | Operation           | Description                                                                                                           |
|-----------|---------------------|-----------------------------------------------------------------------------------------------------------------------|
| Inference | **Enqueue and Get** | Upload a document (PDF, image, etc.), run the selected model, poll the server for results, and return the parsed data |

### Predict

| Parameter                 | Description                                                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Binary Property Name**  | Name of the binary field that contains the file (default: `data`).                                                              |
| **Model ID**              | The identifier of the model to run (*e.g.* `expense_receipts`, `invoice`, `your_custom_model`).                                 |
| **File Alias (optional)** | Friendly filename displayed in Mindee web app.                                                                                  |
| **Enable RAG**            | `Enabled` / `Disabled` or `Use Model Default`. Adds Retrieval-Augmented Generation for higher accuracy (supported models only). |
| **Enable Polygons**       | Return location polygons for all extracted fields.                                                                              |
| **Enable Confidence**     | Return confidence score for each field.                                                                                         |
| **Enable Raw Text**       | Return full raw text of each page.                                                                                              |
| **Polling Timeout (s)**   | How long n8n should poll Mindee for results (default 120 s).                                                                    |

## How it works

1. The node builds a `multipart/form-data` request with your file and options.  
2. Mindee queues the inference and returns an `enqueue_id`.  
3. The node polls `/inferences/{enqueue_id}` until the inference is finished or the timeout is reached.  
4. The final structured JSON is returned to your workflow.

## Example workflow

1. **HTTP Request** – download a public receipt image.
2. **Mindee V2** – set *Binary Property Name* to `data` and *Model ID* to your desired model.
3. **(optional) Set** – post-process or map the parsed fields.

Running the workflow returns fields such as `total_amount`, `date`, `supplier_name`, etc., depending on the chosen model.

## Templates and examples

[[ templatesWidget(page.title, 'mindeeV2') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

