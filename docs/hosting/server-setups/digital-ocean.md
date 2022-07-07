# Hosting n8n on DigitalOcean

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses n8n and Caddy as a reverse proxy using Docker Compose to create the necessary resources.

## Create droplet

Select the project to host the Droplet and click _Droplets_ from the _Manage_ menu. You can use the Docker image from the _Marketplace_ tab or use one of the Linux distributions and [install Docker yourself](https://www.docker.com/get-started/). The rest of this tutorial assumes you have Docker installed on the Droplet.

## Login to Droplet

The remainder of the steps in this guide require you to login to the Droplet, [find more details in the Digital Ocean documentation](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/).

## Prerequisites

### Create folders

Both n8n and Caddy require creating folders and files that the host operating system copies to Docker containers. Create the following on the Droplet in a location accessible by Docker:

- _caddy_config_
- _caddy_config/Caddyfile_
- _caddy_data_
- _local_files_

### Setup DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the Droplet.

### Open ports

To set up secure connections to the Droplet, you need to open the following ports in the Droplet's firewall:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

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