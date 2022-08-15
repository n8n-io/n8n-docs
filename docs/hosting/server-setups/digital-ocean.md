# Hosting n8n on DigitalOcean

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses:

* [Caddy](http://caddyserver.com){:target="_blank" .external-link} (a reverse proxy) to allow access to the Droplet from the internet. 
* [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.
* The [n8n Docker image](https://hub.docker.com/r/n8nio/n8n){:target=_blank .external-link}.

## Create a Droplet

1. [Log in](https://cloud.digitalocean.com/login){:target=_blank .external-link} to DigitalOcean. 
2. Select the project to host the Droplet, or [create a new project](https://docs.digitalocean.com/products/projects/how-to/create/){:target=_blank .external-link}.
3. In your project, select **Droplets** from the **Manage** menu. 
4. [Create a new Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/){:target=_blank .external-link} using the [Docker image](https://marketplace.digitalocean.com/apps/docker){:target="_blank" .external-link} available on the **Marketplace** tab.

!!! note "Droplet resources"
		When creating the Droplet, DigitalOcean asks you to choose a plan. For most usage levels, a basic shared CPU plan is enough.

!!! note "SSH or Password"
		DigitalOcean lets you to choose between SSH and password-based authentication. SSH is more secure. The rest of this guide assumes you are using SSH.

## Log in to your Droplet

The rest of this guide requires you to log in to the Droplet using a terminal with SSH. Refer to [How to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/){:target="_blank" .external-link} for more information.

## Create folders and files

Both n8n and Caddy require creating folders that the host operating system (the DigitalOcean Droplet) copies to Docker containers to make them available to Docker.

Create the following in the Droplet root user's home folder:

- `caddy_config`: Holds the Caddy configuration files.
- `caddy_data`: A cache folder for Caddy.
- `local_files`: A folder for files you upload or add using n8n.

Use the following command to create the folders:

```shell
mkdir caddy_config caddy_data local_files
```

### Create Docker volume

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/){:target="_blank" .external-link} that Docker reuses between restarts:

```shell
docker volume create caddy_data
```

## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the Droplet. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts){:target="_blank" .external-link}.

## Open ports

n8n runs as a web application, so the Droplet needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the Droplet's firewall by running the following two commands:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

## Configure n8n

Create a `.env` file in the same folder you will run Docker Compose from, and add the following, replacing the values with your own.

Create the file:

```shell
nano .env
```

Add the contents to the file:

```env
# Path where you created folders earlier. 
# Change this if you didn't create them in the root directory.
DATA_FOLDER=/root/

# The top level domain to serve from, this should be the same as the subdomain you created above
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

For more information on n8n environment variables, refer to [Environment variables](/hosting/environment-variables/).

## Create Docker Compose file

The Docker compose file defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

Create a `docker-compose.yml` file, make sure to create it in the same location as the `.env` file:

```shell
nano docker-compose.yml
```

Add the following to the file:

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
      - ${DATA_FOLDER}/caddy_config/Caddyfile:/etc/caddy/Caddyfile

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

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Create a `Caddyfile` file in the `caddy_config` folder.

```shell
nano caddy_config/Caddyfile
```

Add the following configuration, adding your domain. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

```text
n8n.<domain>.<suffix> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

## Start Docker Compose

Start n8n and Caddy with the following command:

```shell
docker-compose up -d
```

This may take a few minutes.

## Test your setup

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy

You can stop n8n and Caddy with the following command:

```shell
sudo docker-compose stop
```
