# Figma Trigger (Beta)

[Figma](https://www.figma.com/) is a prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/figma/).


!!! warning " Supported Figma Plans"
    Figma does not support webhooks on the free "Starter" plan. Your team would need to be on the "Professional" plan to use this node.


## Trigger Events

- **File Commented**: Triggers when someone comments on a file.
- **File Deleted**: Triggers when an individual file is deleted, but not when an entire folder with all files is deleted.
- **File Updated**: Triggers when a file is saved or deleted. A save occurs when a file is closed or within 30 seconds after changes have been made.
- **File Version Updated**: Triggers when a named version is created in the version history of a file.
- **Library Publish**: Triggers when a library file is published.
