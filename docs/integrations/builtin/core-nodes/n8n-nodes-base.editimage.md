# Edit Image

The Edit Image node allows you to manipulate and edit images.

!!! note "Dependencies"
    1. If you aren't running n8n on Docker, you need to install [GraphicsMagick](http://www.graphicsmagick.org/README.html){:target=_blank .external-link}.  
    2. You need to use a node such as the [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the image file as a data property to the Edit Image node.


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
