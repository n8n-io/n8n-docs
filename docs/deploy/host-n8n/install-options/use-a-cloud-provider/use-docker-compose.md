---
contentType: tutorial
description: Install and run n8n using Docker Compose
nodeTitle: Use Docker Compose
originalFilePath: hosting/installation/server-setups/docker-compose.md
originalUrl: 'https://docs.n8n.io/hosting/installation/server-setups/docker-compose'
url: >-
  https://docs.n8n.io/deploy/host-n8n/install-options/use-a-cloud-provider/use-docker-compose
layout:
  description:
    visible: false
---

# Docker-Compose <a href="#docker-compose" id="docker-compose"></a>

These instructions cover how to run n8n on a Linux server using Docker Compose.

If you have already installed Docker and Docker-Compose, then you can start with [step 3](#3-dns-setup).

You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/4aeKXmptxbjmVpQ2Tfgn/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/CcSOA8s7oK44B90i5WIm/" %}

## 1. Install Docker and Docker Compose <a href="#1-install-docker-and-docker-compose" id="1-install-docker-and-docker-compose"></a>

The way that you install Docker and Docker Compose depends on your Linux distribution. You can find specific instructions for each component in the links below:

* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/linux/)

After following the installation instructions, verify that Docker and Docker Compose are available by typing:

```shell
docker --version
docker compose version
```

## 2. Optional: Non-root user access <a href="#2-optional-non-root-user-access" id="2-optional-non-root-user-access"></a>

You can optionally grant access to run Docker without the `sudo` command.

To grant access to the user that you're currently logged in with (assuming they have `sudo` access), run:

```shell
sudo usermod -aG docker ${USER}
# Register the `docker` group membership with current session without changing your primary group <a href="#register-the-docker-group-membership-with-current-session-without-changing-your-primary-group" id="register-the-docker-group-membership-with-current-session-without-changing-your-primary-group"></a>
exec sg docker newgrp
```

To grant access to a different user, type the following, substituting `<USER_TO_RUN_DOCKER>` with the appropriate username:

```shell
sudo usermod -aG docker <USER_TO_RUN_DOCKER>
```

You will need to run `exec sg docker newgrp` from any of that user's existing sessions for it to access the new group permissions.

You can verify that your current session recognizes the `docker` group by typing:

```shell
groups
```

## 3. DNS setup <a href="#3-dns-setup" id="3-dns-setup"></a>

To host n8n online or on a network, create a dedicated subdomain pointed at your server.

Add an A record to route the subdomain accordingly:

| Record type | Name                              | Destination                |
|-------------|-----------------------------------|----------------------------|
| A           | `n8n` (or your desired subdomain) | `<your_server_IP_address>` |

## 4. Create an `.env` file <a href="#4-create-an-env-file" id="4-create-an-env-file"></a>

Create a project directory to store your n8n environment configuration and Docker Compose files and navigate inside:

```shell
mkdir n8n-compose
cd n8n-compose
```

Inside the `n8n-compose` directory, create an `.env` file to customize your n8n instance's details. Change it to match your own information:

```shell title=".env file"
# DOMAIN_NAME and SUBDOMAIN together determine where n8n will be reachable from <a href="#domainname-and-subdomain-together-determine-where-n8n-will-be-reachable-from" id="domainname-and-subdomain-together-determine-where-n8n-will-be-reachable-from"></a>
# The top level domain to serve from <a href="#the-top-level-domain-to-serve-from" id="the-top-level-domain-to-serve-from"></a>
DOMAIN_NAME=example.com

# The subdomain to serve from <a href="#the-subdomain-to-serve-from" id="the-subdomain-to-serve-from"></a>
SUBDOMAIN=n8n

# The above example serve n8n at: https://n8n.example.com <a href="#the-above-example-serve-n8n-at-httpsn8nexamplecom" id="the-above-example-serve-n8n-at-httpsn8nexamplecom"></a>

# Optional timezone to set which gets used by Cron and other scheduling nodes <a href="#optional-timezone-to-set-which-gets-used-by-cron-and-other-scheduling-nodes" id="optional-timezone-to-set-which-gets-used-by-cron-and-other-scheduling-nodes"></a>
# New York is the default value if not set <a href="#new-york-is-the-default-value-if-not-set" id="new-york-is-the-default-value-if-not-set"></a>
GENERIC_TIMEZONE=Europe/Berlin

# The email address to use for the TLS/SSL certificate creation <a href="#the-email-address-to-use-for-the-tlsssl-certificate-creation" id="the-email-address-to-use-for-the-tlsssl-certificate-creation"></a>
SSL_EMAIL=user@example.com
```

## 5. Create local files directory <a href="#5-create-local-files-directory" id="5-create-local-files-directory"></a>

Inside your project directory, create a directory called `local-files` for sharing files between the n8n instance and the host system (for example, using the [Read/Write Files from Disk node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile)):

```shell
mkdir local-files
```

The Docker Compose file below can automatically create this directory, but doing it manually ensures that it's created with the right ownership and permissions.

## 6. Create Docker Compose file <a href="#6-create-docker-compose-file" id="6-create-docker-compose-file"></a>

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
      - N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https  
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
      - TZ=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./local-files:/files

volumes:
  n8n_data:
  traefik_data:
```

The Docker Compose file above configures two containers: one for n8n, and one to run [traefik](https://github.com/traefik/traefik), an application proxy to manage TLS/SSL certificates and handle routing.

It also creates and mounts two [Docker Volumes](https://docs.docker.com/engine/storage/volumes/) and mounts the `local-files` directory you created earlier:

| Name            | Type                                                        | Container mount   | Description                                                                                                                         |
|-----------------|-------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `n8n_data`      | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/home/node/.n8n` | Where n8n saves its SQLite database file and encryption key.                                                                        |
| `traefik_data`  | [Volume](https://docs.docker.com/engine/storage/volumes/)   | `/letsencrypt`    | Where traefik saves TLS/SSL certificate data.                                                                                       |
| `./local-files` | [Bind](https://docs.docker.com/engine/storage/bind-mounts/) | `/files`          | A local directory shared between the n8n instance and host. In n8n, use the `/files` path to read from and write to this directory. |

## 7. Start Docker Compose <a href="#7-start-docker-compose" id="7-start-docker-compose"></a>

Start n8n by typing:

```shell
sudo docker compose up -d
```

To stop the containers, type:

```shell
sudo docker compose stop
```

## 8. Done <a href="#8-done" id="8-done"></a>

You can now reach n8n using the subdomain + domain combination you defined in your `.env` file configuration. The above example would result in `https://n8n.example.com`.

n8n is only accessible using secure HTTPS, not over plain HTTP.

If you have trouble reaching your instance, check your server's firewall settings and your DNS configuration.

## Next steps <a href="#next-steps" id="next-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/yiPh3sntkE3OYC67RAnX/" %}
