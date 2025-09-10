---
title: OpenAI File operations 
description: Documentation for the File operations in OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# OpenAI File operations

Use this operation to create, delete, list, message, or update a file in OpenAI. Refer to [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) for more information on the OpenAI node itself.

## Delete a File

Use this operation to delete a file from the server.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **File**.
- **Operation**: Select **Delete a File**.
- **File**: Enter the ID of the file to use for this operation or select the file name from the dropdown.

Refer to [Delete file | OpenAI](https://platform.openai.com/docs/api-reference/files/delete) documentation for more information.

## List Files

Use this operation to list files that belong to the user's organization. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **File**.
- **Operation**: Select **List Files**.

### Options

- **Purpose**: Use this to only return files with the given purpose. Use **Assistants** to return only files related to Assistants and Message operations. Use **Fine-Tune** for files related to [Fine-tuning](https://platform.openai.com/docs/api-reference/fine-tuning).

Refer to [List files | OpenAI](https://platform.openai.com/docs/api-reference/files/list) documentation for more information.

## Upload a File

Use this operation to upload a file. This can be used across various operations. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **File**.
- **Operation**: Select **Upload a File**.
- **Input Data Field Name**: Defaults to `data`. Enter the name of the binary property which contains the file. The size of individual files can be a maximum of 512 MB or 2 million tokens for Assistants.

### Options

- **Purpose**: Enter the intended purpose of the uploaded file. Use **Assistants** for files associated with Assistants and Message operations. Use **Fine-Tune** for [Fine-tuning](https://platform.openai.com/docs/api-reference/fine-tuning).

Refer to [Upload file | OpenAI](https://platform.openai.com/docs/api-reference/files/create) documentation for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
