---
contentType: tutorial
nodeTitle: Install from the command line
layout:
  description:
    visible: false
---
 
## Prerequisites
 
You need Docker and Docker Compose installed. If you're not familiar with these tools, install them first:
 
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (the script checks for the `docker compose` v2 plugin, not the legacy `docker-compose` binary)

## Run the command
 
```bash
curl -fsSL https://get.n8n.io | sh
```
 
This single command:
 
1. Checks that Docker and Docker Compose are installed (and prompts with install instructions if they're missing).
2. Creates a project directory for n8n — defaults to `./n8n` in your current folder.
3. Writes the configuration files it needs: `compose.yaml` and `.env`.
4. Pulls the n8n image and starts the container.

A successful run looks like this:
 
```
$ curl -fsSL https://get.n8n.io | sh
 
✓ Docker found (24.0.6)
✓ Docker Compose found (v2.24.0)
✓ Created ./n8n/compose.yaml
✓ Created ./n8n/.env
✓ Pulled n8n:2.30.1
✓ Started postgres, n8n
 
n8n is running at: http://localhost:5678
Data stored in:    ./n8n
Config files:      ./n8n/compose.yaml, ./n8n/.env
 
To stop:    docker compose -f ./n8n/compose.yaml down
To upgrade: curl -fsSL https://get.n8n.io | sh -s -- --upgrade
```

 
{% hint style="warning" %}
n8n needs a few moments to finish starting up the first time, even after the script prints the URL. If the page doesn't load right away, wait a bit and refresh.
{% endhint %}
 
## Useful flags
 
| Flag | What it does |
|---|---|
| `--version` | Prints the installed n8n version and the CLI script's own version. |
| `--with-ssl` | Sets up `compose.yaml` with a reverse proxy pre-configured for SSL. |
| `--no-start` | Writes the configuration files but doesn't start n8n. |
| `--upgrade` | Allows the script to overwrite an existing `compose.yaml`/`.env` — required to re-run the script on a folder that already has n8n set up. |
 
For production deployments, don't rely on the defaults this script creates — see the [Docker Compose deployment guide](#) for a hardened, production-ready setup.
 
## Prefer not to curl a script? Here are two alternatives
 
**Download the config files yourself and run Compose directly:**
 
```bash
mkdir n8n && cd n8n
wget -O compose.yaml https://get.n8n.io/compose.yaml
wget -O .env https://get.n8n.io/example.env
docker compose up -d
```
 
**Or inspect the install script before running it:**
 
```bash
curl -fsSL https://get.n8n.io -o install.sh
less install.sh   # review it
sh install.sh
```
 
## Windows users
 
The curl-to-shell script doesn't run natively on Windows. Use the manual download method above from within WSL for the smoothest experience — install Docker Desktop with the WSL2 backend, or Docker Engine directly inside your Linux distro.