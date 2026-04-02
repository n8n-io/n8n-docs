1. Go to **Settings** > **Environments**.
1. Choose your connection method:
	- **SSH**: In **Git repository URL**, enter the SSH URL for your repository (for example, `git@github.com:username/repo.git`).
	- **HTTPS**: In **Git repository URL** enter the HTTPS URL for your repository (for example, `https://github.com/username/repo.git`).
1. Configure authentication based on your connection method:
	- **For SSH**: n8n supports ED25519 and RSA public key algorithms. ED25519 is the default. Select **RSA** under **SSH Key** if your git host requires RSA. Copy the SSH key.
	- **For HTTPS**: Enter your credentials:
		- **Username**: Your Git provider username.
		- **Token**: Your Personal Access Token (PAT) from your Git provider.
