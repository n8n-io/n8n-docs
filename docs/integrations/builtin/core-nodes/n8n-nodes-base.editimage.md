---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Edit Image
description: Documentation for the Edit Image node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Edit Image

Use the Edit Image node to manipulate and edit images.

/// note | Dependencies
1. If you aren't running n8n on Docker, you need to install [GraphicsMagick](http://www.graphicsmagick.org/README.html){:target=_blank .external-link}.  
2. You need to use a node such as the [Read/Write Files from Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the image file as a data property to the Edit Image node.
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Edit Image integrations](https://n8n.io/integrations/edit-image/){:target=_blank .external-link} page.
///

## Operations

- Add a blur to the image to reduce sharpness
- Add a border to the image
- Create a new image
- Crop the image
- Composite an image on top of another image
- Draw on an image
- Get information about the image
- Rotate the image
- Change the size of the image
- Shear image along the X or Y axis
- Add text to the image



## Options

- **File Name**: specify the filename of the output file.
- **Format**: specify the image format of the output file:
	- BMP
	- GIF
	- JPEG
	- PNG
	- TIFF
	- WebP


## Related resources

View [example workflows and related content](https://n8n.io/integrations/edit-image/){:target=_blank .external-link} on n8n's website.

