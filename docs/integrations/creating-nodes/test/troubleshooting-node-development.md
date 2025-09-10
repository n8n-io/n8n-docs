---
contentType: howto
---

# Troubleshooting

## Credentials

<!-- vale off -->
### Error message: 'Credentials of type "*" aren't known'
<!-- vale on -->

Check that the name in the credentials array matches the name used in the property name of the credentials' class.

![Troubleshooting credentials](/_images/integrations/creating-nodes/troubleshooting-credentials-1.png)

<!-- vale off -->
## Editor UI
<!-- vale on -->

<!-- vale off -->
### Error message: 'There was a problem loading init data: API-Server can not be reached. It's probably down'
<!-- vale on -->

- Check that the names of the node file, node folder, and class match the path added to `packages/nodes-base/package.json`.
- Check that the names used in the `displayOptions` property are names used by UI elements in the node.

<!-- vale off -->
### Node icon doesn't show up in the Add Node menu and the Editor UI
<!-- vale on -->

- Check that the icon is in the same folder as the node.
- Check that it's either in PNG or SVG format.
- When the `icon` property references the icon file, check that it includes the logo extension (`.png` or `.svg`) and that it prefixes it with `file:`. For example, `file:friendGrid.png` or `file:friendGrid.svg`.

### Node icon doesn't fit

- If you use an SVG file, make sure the canvas size is square. You can find instructions to change the canvas size of an SVG file using GIMP [here](https://docs.gimp.org/2.10/en/gimp-image-resize.html).
- If you use a PNG file, make sure that it's 60x60 pixels.

### Node doesn't show up in the Add Node menu

Check that you registered the node in the `package.json` file in your project.

<!-- vale off -->
### Changes to the description properties don't show in the UI on refreshing
<!-- vale on -->

Every time you change the description properties, you have to stop the current n8n process (`ctrl` + `c`) and run it again. You may also need to re-run `npm link`.

### Linter incorrectly warning about file name case

The node linter has rules for file names, including what case they should be. Windows users may encounter an issue when renaming files that causes the linter to continue giving warnings, even after you rename the files. This is due to a [known Windows issue](https://answers.microsoft.com/en-us/windows/forum/all/file-renaming-when-changing-case-doesnt-work/aa15ff7c-dd2d-4ed3-bcce-799ca90d4e58) with changing case when renaming files.
