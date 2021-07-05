# Updating n8n

In order to take advantage of the newest features and functionality added to n8n (detailed in our [Changelog](../../reference/changelog.md)) you must update to the latest [released version](https://github.com/n8n-io/n8n/releases).

## n8n.cloud

To updated your n8n.cloud instance navigate to your Dashboard:

![Admin Dashboard](../images/dashboard.png)

1. Click the **Settings** button or switch to the **Manage** tab.
2. From **Instance Settings**, use the **n8n version** dropdown to select your desired release version: Latest Stable, Beta, or Latest Beta.

![Manage Tab](../images/manage_version.png)

3. Click **Save Changes** to restart your n8n instance and perform the update. A confirmation modal will appear and the **Instance Status** will reflect the update in progress.

![Instance Status](../images/instance_status.png)

## npm

To update your n8n instance to the latest released version, run:

```bash
npm update -g n8n
```

To install/update to a specific version of n8n use the `@` syntax to specify the desired version. For example:

```bash
npm install n8n@0.126.1
```

## Docker

From your Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

![Docker Desktop](../images/docker_desktop.png)

You can also use the command line to pull the latest, or a specific version:

```sh
// Pull latest version
docker pull n8nio/n8n

// Pull specific version
docker pull n8nio/n8n:0.126.1
```
