# Hosting n8n on Google Cloud

This hosting guide shows you how to self-host n8n on Google Cloud. It uses n8n and Caddy as a reverse proxy using Docker Compose to create the necessary resources.

## Hosting options

Google Cloud offers several ways suitable for hosting n8n, including Cloud Run (optimized for running containers), Compute Engine (VMs), and Kubernetes (containers running with Kubernetes).

This guide uses compute engine as it allows for persistent data by default, however, other options could also work for self-hosting n8n.

You can use one of the marketplace Docker images, or install Docker and Docker Compose yourself. If you would rather create an instance using the gcloud command line tool, find more details in the [Google Cloud Platform documentation](https://cloud.google.com/sdk/gcloud/reference/compute/instances/create).

## Login to instance

The remainder of the steps in this guide require you to login to the instance, GCP offers a variety of ways to do this, and you can find connection commands from the _SSH_ dropdown of the instance details page.

## Prerequisites

### Create folders

Both n8n and Caddy require creating folders and files that the host operating system copies to Docker containers. Create the following on the instance in a location accessible by Docker:

- _caddy_config_
- _caddy_config/Caddyfile_
- _caddy_data_
- _local_files_

### Setup DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static IP address of the instance.

If the instance doesn't already have a static IP address, you can assign one to it by editing the instance, and changing the network interface from "Ephemeral" to "Static".

<!-- TODO: I assume you can use n8n on an Ephemeral address, but I guess it's not recommended? -->

### Open ports

To set up secure connections to the instance, you need to open Firewall rules. You can do this when creating or editing an instance from the _Firewall_ section, or you can [use the gcloud CLI tool to open the ports](https://cloud.google.com/vpc/docs/firewall-rules-logging).

## Configure n8n

Create an _.env_ file in the same folder you will run Docker Compose from, and add the following, replacing the values with your own:

```env
# Path where you created folders and files earlier
DATA_FOLDER=/root/n8n

# The top level domain to serve from
DOMAIN_NAME=example.com

# The subdomain to serve from
SUBDOMAIN=n8n

# DOMAIN_NAME and SUBDOMAIN combined decide where n8n will be reachable from
# above example would result in: https://n8n.example.com

# The user name to use for authentication - IMPORTANT ALWAYS CHANGE!
N8N_BASIC_AUTH_USER=user

# The password to use for authentication - IMPORTANT ALWAYS CHANGE!
N8N_BASIC_AUTH_PASSWORD=password

# Optional timezone to set which gets used by Cron-Node by default
# If not set New York time will be used
GENERIC_TIMEZONE=Europe/Berlin

# The email address to use for the SSL certificate creation
SSL_EMAIL=example@example.com
```

## Create Docker Compose file

Create a _docker-compose.yml_ file, and add the following:

```yaml
version: "3.7"

services:
  caddy:
    image: caddy:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ${DATA_FOLDER}/caddy_data:/data
      - ${DATA_FOLDER}/caddy_config:/config
      - "${DATA_FOLDER}/caddy_config/Caddyfile:/etc/caddy/Caddyfile"

  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - 5678:5678
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER
      - N8N_BASIC_AUTH_PASSWORD
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - ${DATA_FOLDER}/.n8n:/home/node/.n8n
      - ${DATA_FOLDER}/local_files:/files

volumes:
  caddy_data:
    external: true
  caddy_config:
```

## Configure Caddy

Open the _Caddyfile_ you created earlier, and add the following configuration, adding your subdomain:

```text
<SUB_DOMAIN> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

Using `n8n` in the configuration

## Create Docker volume

To persist Caddy configuration between restarts, the Docker Compose file above specifies an `external` volume, create that with the following command:

```shell
docker volume create caddy_data
```

## Start Docker Compose

Start n8n and Caddy with the following command:

```shell
docker-compose up -d
```

Open the URL formed of the subdomain and domain name defined earlier, enter the user name and password defined earlier, and you should be able to access n8n.

Stop n8n and Caddy with the following command:

```shell
sudo docker-compose stop
```