# Desktop app

The n8n desktop app is the fastest way to try n8n on Windows or Mac computers (support for Linux is coming soon). 

## Install Desktop

Download the app from the link below:

[Download for Windows](https://downloads.n8n.io/file/n8n-downloads/n8n-win.zip)

[Download for macOS](https://downloads.n8n.io/file/n8n-downloads/n8n-mac.zip)

!!! note "Keep in mind"
    If you have already installed n8n locally via `npm`, the desktop app will connect to the existing `sqlite` database.


!!! note "Tunnel credentials"
    The n8n desktop creates a tunnel in order to receive webhooks from external services such as Google. This tunnel is protected using a randomly generated combination of username and password. If you are asked for a login to your personal tunnel URL, you can find the generated credentials in the `n8n-desktop.env` file in the `.n8n` folder of your home directory.

## Update Desktop

If you're using the n8n desktop app follow the below mentioned steps to update n8n.

### For Windows

1. [Download](https://downloads.n8n.io/file/n8n-downloads/n8n-win.zip) the latest version.
2. Run the installer.

### For MacOS

1. Move the old app to trash.
2. [Download](https://downloads.n8n.io/file/n8n-downloads/n8n-mac.zip) the latest app.
