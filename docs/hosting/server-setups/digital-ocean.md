# Hosting n8n on DigitalOcean

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses n8n and [Caddy](http://caddyserver.com){:target="_blank" class=.external-link} (a reverse proxy) to allow access to the Droplet from the internet . It uses [Docker Compose](https://docs.docker.com/compose/){:target="_blank"} to create and define the application components and how they work together.

## Create a Droplet

Log in to DigitalOcean and select the project to host the Droplet and click **Droplets** from the **Manage** menu. You can use [the Docker image](https://marketplace.digitalocean.com/apps/docker){:target="_blank" class=.external-link} from the **Marketplace** tab or use one of the Linux distributions and [install Docker yourself](https://www.docker.com/get-started/){:target="_blank" class=.external-link}. The rest of this tutorial assumes you have Docker installed on the Droplet.

## Log in to your Droplet

The remainder of the steps in this guide require you to log in to the Droplet using a terminal with SSH. [Find more details on how to do this in the Digital Ocean documentation](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/){:target="_blank"}.

## Create folders and files

Both n8n and Caddy require creating folders that the host operating system (the DigitalOcean Droplet) copies to Docker containers to make them available to Docker.

Create the following on the Droplet in a location accessible by Docker. If you run Docker as root user, you can create them anywhere. If you run Docker "[Rootless](https://docs.docker.com/engine/security/rootless/){:target="_blank"}" for better security, create them in a location that user has access to:

- `caddy_config_: Holds the Caddy configuration files.
- `caddy_data_: A cache folder for Caddy.
- `local_files_: A folder for files you upload or add via n8n.

Use the following command to create the folders:

```shell
mkdir caddy_config caddy_data local_files
```

### Create Docker volume

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/){:target="_blank"} that Docker reuses between restarts.

```shell
docker volume create caddy_data
```

## Set up DNS

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the Droplet. The exact steps for this depend on your DNS provider, but typically you need to create a new [CNAME or A record](https://ns1.com/resources/dns-records-explained){:target="_blank"} for the n8n subdomain.

## Open ports

n8n runs as a web application, so the Droplet needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the Droplet's firewall by running the following two commands:

```shell
sudo ufw allow 80
sudo ufw allow 443
```

## Configure n8n

Create an `.env` file in the same folder you will run Docker Compose from, and add the following, replacing the values with your own:

Create the file:

```shell
nano .env
```

Add the contents to the file:

```env
# Path where you created folders earlier
DATA_FOLDER=/root/n8n

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

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Create a `Caddyfile` file in the *caddy_config* folder.

```shell
nano caddy_config/Caddyfile
```

Add the following configuration, adding your subdomain. The `n8n` tells Caddy to use the service definition defined in the `docker-compose.yml` file:

```text
<SUB_DOMAIN> {
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

Open the URL formed of the subdomain and domain name defined earlier, enter the user name and password defined earlier, and you should be able to access n8n.

You can stop n8n and Caddy with the following command:

```shell
sudo docker-compose stop
```