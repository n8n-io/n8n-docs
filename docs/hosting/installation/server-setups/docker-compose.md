---
contentType: tutorial
---

# Docker-Compose

If you have already installed Docker and Docker-Compose, then you can start with step 4.

--8<-- "_snippets/self-hosting/warning.md"

--8<-- "_snippets/self-hosting/installation/latest-next-version.md"

### 1. Install Docker

This can vary depending on the Linux distribution used. You can find detailed instructions in the [Docker documentation](https://docs.docker.com/engine/install/){:target=_blank .external-link}. The following example is for Ubuntu:

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### 2. Optional: Non-root user access

Run when logged in as the user that should also be allowed to run docker:

```bash
sudo usermod -aG docker ${USER}
su - ${USER}
```

### 3. Install Docker-Compose

This can vary depending on the Linux distribution used. You can find detailed instructions in the [Docker documentation](https://docs.docker.com/compose/){:target=_blank .external-link}.

The example below is for Ubuntu:

```bash
sudo apt-get install docker-compose-plugin
```

### 4. DNS setup

Add A record to route the subdomain accordingly:

```
Type: A
Name: n8n (or the desired subdomain)
IP address: <IP_OF_YOUR_SERVER>
```

### 5. Create Docker Compose file

Create a `docker-compose.yml` file. Paste the following in the file:

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
      - caddy_data:/data
      - ${DATA_FOLDER}:/config
      - ${DATA_FOLDER}/Caddyfile:/etc/caddy/Caddyfile

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "127.0.0.1:5678:5678"
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data/.n8n:/home/node/.n8n

	volumes:
		n8n_data:
			external: true
		caddy_data:
			external: true
```

If you are planning on reading/writing local files with n8n (for example, by using the [Write Binary File node](/integrations/builtin/core-nodes/n8n-nodes-base.writebinaryfile/), you will need to configure a data directory for those files here. If you are running n8n as a root user, add this under `volumes` for the n8n service:

```yaml
      - /root/local-files:/files
```

If you are running n8n as a non-root user, add this under `volumes` for the n8n service:

```yaml
      - /home/<YOUR USERNAME>/n8n-local-files:/files
```

You will now be able to write files to the `/files` directory in n8n and they will appear on your server in either `/root/local-files` or `/home/<YOUR USERNAME>/n8n-local-files`, respectively.

### 6. Create `.env` file

Create a `.env` file and change it accordingly.

```bash
# Replace <directory-path> with the path where you created folders earlier
DATA_FOLDER=/<directory-path>/caddy-data

# The top level domain to serve from
DOMAIN_NAME=example.com

# The subdomain to serve from
SUBDOMAIN=n8n

# DOMAIN_NAME and SUBDOMAIN combined decide where n8n will be reachable from
# above example would result in: https://n8n.example.com

# Optional timezone to set which gets used by Cron-Node by default
# If not set New York time will be used
GENERIC_TIMEZONE=Europe/Berlin

# The email address to use for the SSL certificate creation
SSL_EMAIL=user@example.com
```

### 7. Create a Caddyfile

Create a `Caddyfile` in the `DATA_FOLDER` path you set in the `.env` file, Make sure you replace `<subdomain>` and `<domain_name>` with the same values you set in the `.env` file.

```
<subdomain>.<domain_name> {
    reverse_proxy n8n:5678 {
      flush_interval -1
    }
}
```

### 7. Create the Docker volumes

Create the Docker volume which is defined as `n8n_data`, In this volume, the database file from SQLite as well as the encryption key will be saved.

```sh
docker volume create n8n_data
```

We will also create a volume for the Caddy data, This is defined as `caddy_data`.

```sh
docker volume create caddy_data
```

### 8. Start Docker Compose

n8n can now be started via:

```bash
sudo docker compose up -d
```

To stop the container:

```bash
sudo docker compose stop
```

### 9. Done

n8n will now be reachable using the above defined subdomain + domain combination.
The above example would result in: <https://n8n.example.com>

n8n will only be reachable using `https` and not using `http`.

!!! warning "Secure your n8n instance"
    Make sure that you [set up authentication](/hosting/user-management/) your n8n instance.

## Updating

--8<-- "_snippets/self-hosting/installation/docker-compose-updating.md"

## Next steps

--8<-- "_snippets/self-hosting/installation/server-setups-next-steps.md"
