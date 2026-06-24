---
contentType: tutorial
nodeTitle: Deploy to Hetzner
originalFilePath: hosting/installation/server-setups/hetzner.md
originalUrl: 'https://docs.n8n.io/hosting/installation/server-setups/hetzner'
url: >-
  https://docs.n8n.io/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-hetzner
layout:
  description:
    visible: false
---

# Hosting n8n on Hetzner cloud <a href="#hosting-n8n-on-hetzner-cloud" id="hosting-n8n-on-hetzner-cloud"></a>

This hosting guide shows you how to self-host n8n on a Hetzner cloud server. It uses:

* [Caddy](https://caddyserver.com) (a reverse proxy) to allow access to the Server from the internet.
* [Docker Compose](https://docs.docker.com/compose/) to create and define the application components and how they work together.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4aeKXmptxbjmVpQ2Tfgn/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/CcSOA8s7oK44B90i5WIm/" %}

## Create a server <a href="#create-a-server" id="create-a-server"></a>

1. [Log in](https://console.hetzner.cloud/) to the Hetzner Cloud Console.
2. Select the project to host the server, or create a new project by selecting **+ NEW PROJECT**.
3. Select **+ CREATE SERVER** on the project tile you want to add it to.

You can change most of the settings to suit your needs, but as this guide uses Docker to run the application, under the **Image** section, select "Docker CE" from the **APPS** tab.

{% hint style="info" %}
**Type**

When creating the server, Hetzner asks you to choose a plan. For most usage levels, the CPX11 type is enough.
{% endhint %}
{% hint style="info" %}
**SSH keys**

Hetzner lets you choose between SSH and password-based authentication. SSH is more secure. The rest of this guide assumes you are using SSH.
{% endhint %}
## Log in to your server <a href="#log-in-to-your-server" id="log-in-to-your-server"></a>

The rest of this guide requires you to log in to the server using a terminal with SSH. Refer to [Access with SSH/rsync/BorgBackup](https://docs.hetzner.com/robot/storage-box/access/access-ssh-rsync-borg) for more information. You can find the public IP in the listing of the servers in your project.

## Install Docker Compose <a href="#install-docker-compose" id="install-docker-compose"></a>

The Hetzner Docker app image doesn't have Docker compose installed. Install it with the following commands:

```shell
apt update && apt -y upgrade
apt install docker-compose-plugin
```

## Clone configuration repository <a href="#clone-configuration-repository" id="clone-configuration-repository"></a>

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-docker-caddy) into the root user folder of the server. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-docker-caddy.git
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-docker-caddy
```

## Default folders and files <a href="#default-folders-and-files" id="default-folders-and-files"></a>

The host operating system (the server) copies the two folders you created to Docker containers to make them available to Docker. The two folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `local_files`: A folder for files you upload or add using n8n.

### Create Docker volume <a href="#create-docker-volume" id="create-docker-volume"></a>

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/) that Docker reuses between restarts:

```shell
docker volume create caddy_data
```

Create a Docker volume for the n8n data:

```shell
sudo docker volume create n8n_data
```

## Set up DNS <a href="#set-up-dns" id="set-up-dns"></a>

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the server. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts).

## Open ports <a href="#open-ports" id="open-ports"></a>

n8n runs as a web application, so the server needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the server's firewall by running the following two commands:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

## Configure n8n <a href="#configure-n8n" id="configure-n8n"></a>

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

```shell
nano .env
```

The file contains inline comments to help you know what to change.

Refer to [Environment variables](../../configure-n8n/basic-configuration/use-environment-variables/README.md) for n8n environment variables details.

## The Docker Compose file <a href="#the-docker-compose-file" id="the-docker-compose-file"></a>

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

```shell
nano docker-compose.yml
```

## Configure Caddy <a href="#configure-caddy" id="configure-caddy"></a>

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Edit the `Caddyfile` file in the `caddy_config` folder.

```shell
nano caddy_config/Caddyfile
```

Change the placeholder subdomain to yours. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

```text
n8n.<domain>.<suffix> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

## Start Docker Compose <a href="#start-docker-compose" id="start-docker-compose"></a>

Start n8n and Caddy with the following command:

```shell
docker compose up -d
```

This may take a few minutes.

## Test your setup <a href="#test-your-setup" id="test-your-setup"></a>

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy <a href="#stop-n8n-and-caddy" id="stop-n8n-and-caddy"></a>

You can stop n8n and Caddy with the following command:

```shell
sudo docker compose stop
```

## Updating <a href="#updating" id="updating"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/UAXlFTg1DgfuqwJWPziz/" %}

## Next steps <a href="#next-steps" id="next-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/yiPh3sntkE3OYC67RAnX/" %}
