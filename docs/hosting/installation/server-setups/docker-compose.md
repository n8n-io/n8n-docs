---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: tutorial
description: Install and run n8n using Docker Compose
---

# Docker-Compose

If you have already installed Docker and Docker-Compose, then you can start with [step 3](#3-dns-setup).

You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

## 1. Install Docker and Docker Compose

How you install Docker and Docker Compose can vary depending on the Linux distribution you use. You can find detailed instructions in both the [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installation documentation. The following example is for Ubuntu:

```bash
# Remove incompatible or out of date Docker implementations if they exist
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
# Install prereq packages
sudo apt-get update
sudo apt-get install ca-certificates curl
# Download the repo signing key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
# Configure the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update and install Docker and Docker Compose
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify that Docker and Docker Compose are available by typing:

```bash
docker --version
docker compose version
```

## 2. Optional: Non-root user access

You can optionally grant access to run Docker without the `sudo` command.

To grant access to the user that you're currently logged in with (assuming they have `sudo` access), run:

```bash
sudo usermod -aG docker ${USER}
# Register the `docker` group memebership with current session without changing your primary group
exec sg docker newgrp
```

To grant access to a different user, type the following, substituting `<USER_TO_RUN_DOCKER>` with the appropriate username:

```bash
sudo usermod -aG docker <USER_TO_RUN_DOCKER>
```

You will need to run `exec sg docker newgrp` from any of that user's existing sessions for it to access the new group permissions.

You can verify that your current session recognizes the `docker` group by typing:

```bash
groups
```

## 3. DNS setup

To host n8n online or on a network, create a dedicated subdomain pointed at your server.

Add an A record to route the subdomain accordingly:

* **Type**: A
* **Name**: `n8n` (or the desired subdomain)
* **IP address**: (your server's IP address)

## 4. Create an `.env` file

Create a project directory to store your n8n environment configuration and Docker Compose files and navigate inside:

```bash
mkdir n8n-compose
cd n8n-compose
```

Inside the `n8n-compose` directory, create an `.env` file to customize your n8n instance's details. Change it to match your own information:

```bash title=".env file"
# DOMAIN_NAME and SUBDOMAIN together determine where n8n will be reachable from
# The top level domain to serve from
DOMAIN_NAME=example.com

# The subdomain to serve from
SUBDOMAIN=n8n

# The above example serve n8n at: https://n8n.example.com

# Optional timezone to set which gets used by Cron and other scheduling nodes
# New York is the default value if not set
GENERIC_TIMEZONE=Europe/Berlin

# The email address to use for the TLS/SSL certificate creation
SSL_EMAIL=user@example.com
```

## 5. Create local files directory

Inside your project directory, create a directory called `local-files` for sharing files between the n8n instance and the host system (for example, using the [Read/Write Files from Disk node](/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md)):

```bash
mkdir local-files
```

The Docker Compose file below can automatically create this directory, but doing it manually ensures that it's created with the right ownership and permissions.

## 6. Create Docker Compose file

Create a `compose.yaml` file. Paste the following in the file:

```yaml title="compose.yaml file"
services:
  traefik:
    image: "traefik"
    restart: always
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "127.0.0.1:5678:5678"
    labels:
      - traefik.enable=true
      - traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.n8n.tls=true
      - traefik.http.routers.n8n.entrypoints=web,websecure
      - traefik.http.routers.n8n.tls.certresolver=mytlschallenge
      - traefik.http.middlewares.n8n.headers.SSLRedirect=true
      - traefik.http.middlewares.n8n.headers.STSSeconds=315360000
      - traefik.http.middlewares.n8n.headers.browserXSSFilter=true
      - traefik.http.middlewares.n8n.headers.contentTypeNosniff=true
      - traefik.http.middlewares.n8n.headers.forceSTSHeader=true
      - traefik.http.middlewares.n8n.headers.SSLHost=${DOMAIN_NAME}
      - traefik.http.middlewares.n8n.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.n8n.headers.STSPreload=true
      - traefik.http.routers.n8n.middlewares=n8n@docker
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./local-files:/files

volumes:
  n8n_data:
  traefik_data:
```

The above Docker Compose file configures two containers: one for n8n, and one to run [traefik](https://github.com/traefik/traefik), an application proxy to manage TLS/SSL certificates and handle routing.

It also creates and mounts two [Docker Volumes](https://docs.docker.com/engine/storage/volumes/) and mounts the `local-files` directory you created earlier:

   | Name            | Type                                                        | Container mount   | Description                                                                                                                         |
   |-----------------|-------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|
   | `n8n_data`      | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/home/node/.n8n` | Where n8n saves its SQLite database file and encryption key.                                                                        |
   | `traefik_data`  | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/letsencrypt`    | Where traefik saves the TLS/SSL certificate data.                                                                                   |
   | `./local-files` | [Bind](https://docs.docker.com/engine/storage/bind-mounts/) | `/files`          | A local directory shared between the n8n instance and host. In n8n, use the `/files` path to read from and write to this directory. |

## 7. Start Docker Compose

You can now start n8n by typing:

```bash
sudo docker compose up -d
```

To stop the container, type:

```bash
sudo docker compose stop
```

## 8. Done

You can now reach n8n using the subdomain + domain combination you defined in your `.env` file configuration. The above example would result in `https://n8n.example.com`.

n8n is only accessible using secure HTTPS, not over plain HTTP.

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
