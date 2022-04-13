# Docker-Compose

If you have already installed Docker and Docker-Compose, then you can start with step 4.

### 1. Install Docker

This can vary depending on the Linux distribution used. The below example is for Ubuntu:

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Depending on Version:

# Ubuntu 18.04:
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

# Ubuntu 20.04
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

sudo apt update
sudo apt upgrade -y
sudo apt install docker-ce -y
```

### 2. Optional: Non-root user access

Run when logged in as the user that should also be allowed to run docker:

```bash
sudo usermod -aG docker ${USER}
su - ${USER}
```

### 3. Install Docker-Compose

This can vary depending on the Linux distribution used. Before proceeding check the latest version of Docker Compose v1 [on the repository's release page](https://github.com/docker/compose/releases) and replace the `1.29.2` below. Should you wish to use Docker Compose v2 instead you can find detailed instructions [here in the Docker documentation](https://docs.docker.com/compose/cli-command/).

The example below is for Ubuntu:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. DNS setup

Add A record to route the subdomain accordingly:

```
Type: A
Name: n8n (or the desired subdomain)
IP address: <IP_OF_YOUR_SERVER>
```

### 5. Create docker-compose file

Create a `docker-compose.yml` file. Paste the following in the file:

```yaml
version: "3"

services:
  traefik:
    image: "traefik"
    restart: always
    command:
      - "--api=true"
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
      - ${DATA_FOLDER}/letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: n8nio/n8n
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
```

If you are planning on reading/writing local files with n8n (for example, by using the [*Write Binary File* node](/integrations/core-nodes/n8n-nodes-base.writeBinaryFile/), you will need to configure a data directory for those files here. If you are running n8n as a root user, add this under `volumes` for the n8n service:

```yaml
      - /local-files:/files
```

If you are running n8n as a non-root user, add this under `volumes` for the n8n service:

```yaml
      - /home/<YOUR USERNAME>/n8n-local-files:/files
```

You will now be able to write files to the `/files` directory in n8n and they will appear on your server in either `/local-files` or `/home/<YOUR USERNAME>/n8n-local-files`, respectively.

### 6. Create `.env` file

Create an `.env` file and change it accordingly.

```bash
# Folder where data should be saved
DATA_FOLDER=/root/n8n/

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
SSL_EMAIL=user@example.com
```

**Note:** If you want to use special characters in the password, use quotes. For example, `N8N_BASIC_AUTH_PASSWORD="p@s$w0rd"`

### 7. Create data folder

Create the folder which is defined as `DATA_FOLDER`. In the example
above, it is `/root/n8n/`.

In that folder, the database file from SQLite as well as the encryption key will be saved.

The folder can be created like this:

```
mkdir /root/n8n/
```

### 8. Start docker-compose

n8n can now be started via:

```bash
sudo docker-compose up -d
```

To stop the container:

```bash
sudo docker-compose stop
```

### 9. Done

n8n will now be reachable via the above defined subdomain + domain combination.
The above example would result in: https://n8n.example.com

n8n will only be reachable via `https` and not via `http`.
