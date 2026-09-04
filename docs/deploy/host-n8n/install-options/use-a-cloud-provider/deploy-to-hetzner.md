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

Once n8n is up and running, an optional last section covers adding the AI Assistant.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/YLv7Cqg70tj1alDgktSX/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iFLUKG9zJaouigaM7IOo/" %}

## Create a server <a href="#create-a-server" id="create-a-server"></a>

1. [Log in](https://console.hetzner.cloud/) to the Hetzner Cloud Console.
2. Select the project to host the server, or create a new project by selecting **+ NEW PROJECT**.
3. Select **+ CREATE SERVER** on the project tile you want to add it to.

You can change most of the settings to suit your needs, but as this guide uses Docker to run the application, under the **Image** section, select "Docker CE" from the **APPS** tab.

{% hint style="info" %}
**Type**

When creating the server, Hetzner asks you to choose a plan. For most usage levels, the CPX11 type is enough. If you plan to add the AI Assistant, choose a plan with at least 4 GB RAM / 2 vCPU instead. CPX11 doesn't have enough headroom once the sandbox is added.
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

{% hint style="info" %} If you add the AI Assistant later, its sandbox services stay internal to the Compose network. You don't need to open any additional ports for them. {% endhint %}

## Configure n8n <a href="#configure-n8n" id="configure-n8n"></a>

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

```shell
nano .env
```

The file contains inline comments to help you know what to change.

Refer to [Environment variables](../../configure-n8n/basic-configuration/use-environment-variables/README.md) for n8n environment variables details.

## The Docker Compose file <a href="#the-docker-compose-file" id="the-docker-compose-file"></a>

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n. There's no separate database service. n8n uses its built-in SQLite database by default.

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

## Optional: Add the AI Assistant <a href="#optional-add-the-ai-assistant" id="optional-add-the-ai-assistant"></a>

The AI Assistant needs a sandbox to run code in. You can add the same sandbox stack used in the [Docker Compose guide](../install-using-docker-compose.md) to this setup. A few things are worth knowing before you start:

* This sandbox is suitable for local development and testing. The stack below uses n8n's own bundled sandbox (`n8n-sandbox`). Since a DigitalOcean droplet with a public domain is often a real deployment, consider Daytona instead if this is going to production.
* **Resize if needed.** The sandbox runner uses Docker-in-Docker, which needs more headroom than n8n alone. Make sure you provision at least 4 GB RAM / 2 vCPU.
* **No networking changes required.** Caddy only ever proxies n8n itself; the sandbox services stay internal to the Compose network and don't need DNS, firewall, or Caddyfile changes.

1. Add the sandbox secrets to `.env`, alongside the variables already there:

   ```
   # Sandbox service secrets — pick your own values
   SANDBOX_API_KEYS=change-me-api-key
   SANDBOX_API_RUNNER_REGISTRATION_TOKEN=change-me-registration-token
   SANDBOX_API_RUNNER_API_KEY=change-me-runner-key

   # Web search: secret for the bundled SearXNG instance — pick your own value
   SEARXNG_SECRET=change-me-searxng-secret
   ```

2. Create a `searxng-settings.yml` file alongside your other config files (the stock SearXNG image only serves HTML; this turns on the JSON API n8n's web search needs):

   ``` yaml
   use_default_settings: true
   search:
     formats:
       - html
       - json
   ```

3. Open `docker-compose.yml` and add the sandbox and search services alongside the existing `caddy` and `n8n` services:

   ```yaml
   volumes:
     sandbox-tls:

   services:
     sandbox-certs:
       image: ghcr.io/n8n-io/n8n-sandbox-service-api:latest
       user: '0:0'
       entrypoint: ['sh', '-c']
       command:
         - >
           bootstrap-mtls.sh --out-dir /tls --api-san sandbox-api
           --control-san-prefix sandbox-runner &&
           chown -R sandbox-api:sandbox-api /tls/api
       environment:
         NUM_RUNNERS: '1'
       volumes:
         - sandbox-tls:/tls

     sandbox-api:
       image: ghcr.io/n8n-io/n8n-sandbox-service-api:latest
       depends_on:
         sandbox-certs:
           condition: service_completed_successfully
       environment:
         SANDBOX_API_KEYS: ${SANDBOX_API_KEYS}
         SANDBOX_API_RUNNER_REGISTRATION_TOKEN: ${SANDBOX_API_RUNNER_REGISTRATION_TOKEN}
         SANDBOX_API_RUNNER_API_KEY: ${SANDBOX_API_RUNNER_API_KEY}
         SANDBOX_API_GRPC_TLS_CERT_FILE: /tls/api/grpc-server.crt
         SANDBOX_API_GRPC_TLS_KEY_FILE: /tls/api/grpc-server.key
         SANDBOX_API_GRPC_TLS_CLIENT_CA_FILE: /tls/api/ca.crt
         SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_CA_FILE: /tls/api/ca.crt
         SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_CERT_FILE: /tls/api/control-grpc-api-client.crt
         SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_KEY_FILE: /tls/api/control-grpc-api-client.key
         SANDBOX_API_RUNNER_CONTROL_GRPC_TLS_SERVER_NAME: sandbox-runner-1
       volumes:
         - sandbox-tls:/tls:ro
       healthcheck:
         test: ["CMD", "wget", "-qO-", "http://localhost:8080/healthz"]
         interval: 5s
         timeout: 3s
         retries: 5
         start_period: 10s
       # Never publish 8080/9090 — Caddy never routes to this service, and it shouldn't.

     sandbox-runner-1:
       image: ghcr.io/n8n-io/n8n-sandbox-service-runner-dind:latest
       privileged: true
       depends_on:
         sandbox-api:
           condition: service_healthy
       environment:
         SANDBOX_RUNNER_API_KEYS: ${SANDBOX_API_RUNNER_API_KEY}
         SANDBOX_RUNNER_REGISTRATION_TOKEN: ${SANDBOX_API_RUNNER_REGISTRATION_TOKEN}
         SANDBOX_RUNNER_API_GRPC_ADDR: sandbox-api:9090
         SANDBOX_RUNNER_HTTP_BASE_URL: http://sandbox-runner-1:8080
         SANDBOX_RUNNER_CONTROL_GRPC_LISTEN_ADDR: ':9091'
         SANDBOX_RUNNER_CONTROL_GRPC_ADVERTISE_ADDR: sandbox-runner-1:9091
         SANDBOX_RUNNER_ID: runner-1
         SANDBOX_RUNNER_DOCKER_SANDBOX_IMAGE: ghcr.io/n8n-io/n8n-sandbox-service-sandbox:latest
         SANDBOX_RUNNER_REGISTRATION_GRPC_CA_FILE: /tls/runner/ca.crt
         SANDBOX_RUNNER_REGISTRATION_GRPC_CERT_FILE: /tls/runner/grpc-client.crt
         SANDBOX_RUNNER_REGISTRATION_GRPC_KEY_FILE: /tls/runner/grpc-client.key
         SANDBOX_RUNNER_REGISTRATION_GRPC_SERVER_NAME: sandbox-api
         SANDBOX_RUNNER_CONTROL_GRPC_TLS_CERT_FILE: /tls/runner/control-grpc-server.crt
         SANDBOX_RUNNER_CONTROL_GRPC_TLS_KEY_FILE: /tls/runner/control-grpc-server.key
         SANDBOX_RUNNER_CONTROL_GRPC_TLS_CLIENT_CA_FILE: /tls/runner/ca.crt
       volumes:
         - sandbox-tls:/tls:ro
       # Never expose this container's ports publicly — it runs privileged Docker-in-Docker.

     searxng:
       image: ghcr.io/searxng/searxng:latest
       environment:
         SEARXNG_SECRET: ${SEARXNG_SECRET}
       volumes:
         - ./searxng-settings.yml:/etc/searxng/settings.yml:ro
       # Internal-only: n8n reaches it by service name. Never publish its port, and don't route Caddy to it.
   ```

4. Add the matching sandbox variables to the existing `n8n` service's `environment` block:

   ```yaml
   environment:
    # ...your existing N8N_HOST, N8N_PORT, etc. stay as they are
    - N8N_ENABLED_MODULES=instance-ai
    - N8N_INSTANCE_AI_SANDBOX_ENABLED=true
    - N8N_INSTANCE_AI_SANDBOX_PROVIDER=n8n-sandbox
    - N8N_SANDBOX_SERVICE_URL=http://sandbox-api:8080
    - N8N_SANDBOX_SERVICE_API_KEY=${SANDBOX_API_KEYS}
    - N8N_INSTANCE_AI_SEARXNG_URL=http://searxng:8080
   depends_on:
    sandbox-api:
      condition: service_healthy
   ```

5. Restart everything so the new services pick up the changes:

   ```bash
   sudo docker compose up -d
   ```

6. Add your model API key. See [Set up AI Assistant](../../configure-n8n/set-up-ai-assistant.md) for the full reference, including how to pick a model provider. Web search works out of the box via the bundled SearXNG service above; add a Brave Search key instead if you'd rather use that.

{% hint style="warning" %}
Replace the `change-me-...` placeholders in `.env` with your own unique secrets before exposing this Droplet to the internet. `sandbox-runner-1` runs privileged Docker-in-Docker. Never publish its ports, and don't route Caddy to it.
{% endhint %}

## Updating <a href="#updating" id="updating"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/yA5x9FIRtnDGdghFU93g/" %}

## Next steps <a href="#next-steps" id="next-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/GtC2RL8itCPuNiwv5UUW/" %}
