---
title: OpenAI Image operations 
description: Documentation for the Image operations in OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# OpenAI Image operations

Use this operation to analyze or generate an image in OpenAI. Refer to [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) for more information on the OpenAI node itself.

## Analyze Image

Use this operation to take in images and answer questions about them.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Image**.
- **Operation**: Select **Analayze Image**.
- **Model**: Select the model you want to use to analyze an image. 
- **Text Input**: Ask a question about the image.
- **Input Type**: Select how you'd like to input the image. Options include:
    - **Image URL(s)**: Enter the **URL(s)** of the image(s) to analyze. Add multiple URLs in a comma-separated list.
    - **Binary File(s)**: Enter the name of the binary property which contains the image(s) in the **Input Data Field Name**.

### Options

- **Detail**: Specify the balance between response time versus token usage. 
- **Length of Description (Max Tokens)**: Defaults to 300. Fewer tokens will result in shorter, less detailed image description.

Refer to [Images | OpenAI](https://platform.openai.com/docs/api-reference/images) documentation for more information.

## Generate an Image

Use this operation to create an image from a text prompt.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Image**.
- **Operation**: Select **Generate an Image**.
- **Model**: Select the model you want to use to generate an image. 
- **Prompt**: Enter the text description of the desired image(s). The maximum length is 1000 characters for `dall-e-2` and 4000 characters for `dall-e-3`.

### Options

- **Quality**: The quality of the image you generate. **HD** creates images with finer details and greater consistency across the image. This option is only supported for `dall-e-3`. Otherwise, choose **Standard**.
- **Resolution**: Select the resolution of the generated images. Select **1024x1024** for `dall-e-2`. Select one of **1024x1024**, **1792x1024**, or **1024x1792** for `dall-e-3` models.
- **Style**: Select the style of the generated images. This option is only supported for `dall-e-3`. 
    - **Natural**: Use this to produce more natural looking images.
    - **Vivid**: Use this to produce hyper-real and dramatic images.
- **Respond with image URL(s)**: Whether to return image URL(s) instead of binary file(s).
- **Put Output in Field**: Defaults to `data`. Enter the name of the output field to put the binary file data in. Only available if **Respond with image URL(s)** is turned off.

Refer to [Create image | OpenAI](https://platform.openai.com/docs/api-reference/images/create) documentation for more information.

## Edit an Image

Use this operation to edit an image from a text prompt.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Image**.
- **Operation**: Select **Edit Image**.
- **Model**: Select the model you want to use to generate an image. Supports `dall-e-2` and `gpt-image-1`.
- **Prompt**: Enter the text description of the desired edits to the input image(s).
- **Image(s)**: Add one or more binary fields to include images with your prompt. Each image should be a png, webp, or jpg file less than 50MB. You can provide up to 16 images.
- **Number of Images**: The number of images to generate. Must be between 1 and 10.
- **Size**: The size and dimensions of the generated images (in px).
- **Quality**: The quality of the image that will be generated (auto, low, medium, high, standard). Only supported for `gpt-image-1`.
- **Output Format**: The format in which the generated images are returned (png, webp, or jpg). Only supported for gpt-image-1.
- **Output Compression**: The compression level (0-100%) for the generated images. Only supported for `gpt-image-1` with webp or jpeg output formats.

### Options
- **Background**: Allows to set transparency for the background of the generated image(s). Only supported for `gpt-image-1`.
- **Input Fidelity**: Control how much effort the model will exert to match the style and features of input images. Only supported for `gpt-image-1`.
- **Image Mask**: Name of the binary property that contains the image. A second image whose fully transparent areas (for example, where alpha is zero) shows where the image should be edited. If there are multiple images provided, the mask will be applied on the first image. Must be a valid PNG file, less than 4MB, and have the same dimensions as image.
- **User**: A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
