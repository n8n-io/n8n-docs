# Troubleshooting

**When reloading the UI, I get the error message “There was a problem loading init data: API-Server can not be reached. It is probably down”.**

Make sure the node’s file name, class’s name and node’s folder name matches the path added to packages/nodes-base/package.json.
Make sure the names used in the displayOptions property are names used by UI elements in the node.

**Credentials of type “*” are not known**

Make sure in the node, the name in the credentials array matches the name used in the property name of the credentials class.

**The node’s logo does show neither in the Create Node menu nor when added to the Editor UI.**

Make sure the logo is in the same folder the node is. Also, it’s either a PNG or SVG. Additionally, make sure when the logo is referenced in the property “icon”, it includes the logo extension (.png or .svg) and it’s preceded by the world ‘file:’. Example: file:friendGrid.png or file:friendGrid.svg.

**The logo shows but it does not fit correctly.**

If you are using a .png make sure it's 60x60 pixels.
If you are a svg make sure the canvas size is a square. You can find instructions to change the canvas size of a svg using GIMP here.

**The node does not show up in the Create Node menu**

Make sure the node is registered in the packages/nodes-base/package.json.

**Getting the error below in the console and the parameters not showing correctly.**

Make sure the names referenced in the displayOptions exist.

**I’m making changes to the description properties but they do not show in the UI when I refresh the page.**

Every time a change is made to the description properties, you have to stop the current n8n process (ctrl + c) and running it again (npm run dev)
