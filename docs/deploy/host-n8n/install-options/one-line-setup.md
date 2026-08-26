---
description: Install n8n from the command line using a one-line setup.
layout:
  description:
    visible: false
---

# One-line setup <a href="#one-line-setup" id="one-line-setup"></a>

## Who this is for

This guide sets up a brand-new n8n instance with a single command that replaces the old `npm install n8n` / `npx n8n` approach, which no longer works from n8n 3.0 (launching October 2026). It's the fastest way to get n8n running, whether you've used Docker before or not.

It's meant for fresh installs, not for changing an existing setup:

- **Already self-hosting with your own Docker Compose file?** You don't need to switch to this script, but feel free to take inspiration from [the Docker Compose setup process](./install-using-docker-compose.md).
- **Currently installing n8n with npm?** From n8n 3.0, n8n is only distributed through Docker. Your existing npm install keeps working for now, but new installs (and future upgrades) should use this method instead. A step-by-step migration guide is coming soon.

## What you need before you start

This method uses Docker, a tool that runs n8n in a self-contained package so you don't have to install or configure anything else yourself. If you don't already have it:

- Install [Docker](https://docs.docker.com/get-docker/). This includes Docker Compose, which the setup command also needs.

You don't need to know Docker to use this guide; just have it installed and running in the background.

{% hint style="info" %}
The one-line setup command requires the `docker compose` v2 plugin specifically (not the older standalone `docker-compose` binary), and checks that the Docker daemon is running. If you're using Podman, Colima, or other Docker-compatible engines, install the `docker` CLI with the compose plugin and point `DOCKER_HOST` at their socket.
{% endhint %}

Watch a video guide covering this setup, from installing Docker to [turning on the AI Assistant](#optional-turn-on-the-ai-assistant):

{% embed url="https://www.youtube.com/embed/t5RBVTby9EU" %}

## Run the command

Open a terminal and run:

```bash
curl -fsSL https://get.n8n.io | sh
```

This does everything for you:

1. Checks that Docker is installed and running, and tells you how to fix it if not.
2. Creates a new folder called `n8n` in your current directory to hold everything.
3. Writes the configuration files n8n needs to run.
4. Downloads n8n and starts it up.

It's safe to run more than once. If n8n is already set up in that folder, the command just tells you it's already there instead of changing anything.

A successful run looks like this:

```
$ curl -fsSL https://get.n8n.io | sh

✓ Docker found (24.0.6)
✓ Docker Compose found (v2.24.0)
✓ Created ./n8n/compose.yml
✓ Created ./n8n/searxng-settings.yml
✓ Created ./n8n/.env (unique secrets generated)
Pulling images and starting (this can take a few minutes on first run)...
✓ Started n8n 2.32.0 and sandbox services

n8n is running at: http://localhost:5678
Data stored in:    ./n8n (Docker volume: n8n-data)
Config files:      ./n8n/compose.yml, ./n8n/.env

To stop:      docker compose -f ./n8n/compose.yml down
To upgrade:   curl -fsSL https://get.n8n.io | sh -s -- --upgrade
To uninstall: docker compose -f ./n8n/compose.yml down -v   # -v DELETES all n8n data
              rm -rf ./n8n
```

{% hint style="warning" %}
n8n takes a moment to finish starting the first time. The command waits and only prints the URL once it's ready. If the page doesn't load right away, wait a bit and refresh.
{% endhint %}

## What's included by default

Running the command sets up everything below automatically. There's nothing extra to install:

| Component | What it's for |
|---|---|
| **n8n** | The workflow editor itself, running at `http://localhost:5678`. |
| **A built-in database** | Stores your workflows, credentials, and execution history. This is [SQLite](https://www.sqlite.org/), a lightweight database that lives in a file. You don't need to install or manage a separate database server. |
| **AI Assistant support services** | A sandbox that safely runs the code the AI Assistant writes, and a bundled search tool so it can look things up on the web. These start automatically alongside n8n, but the assistant itself stays switched off until you add an AI provider key. See [Turn on the AI Assistant](#optional-turn-on-the-ai-assistant) |

If you're setting n8n up for a team or a production environment, consider a more robust database like Postgres rather than the built-in default. See [Install using Docker Compose](./install-using-docker-compose.md) for that setup.

The same goes for the sandbox: this setup uses n8n's own bundled sandbox, which is a good fit for trying things out, but for production, n8n currently recommends Daytona instead. See [Set up the AI Assistant](../configure-n8n/set-up-ai-assistant.md) for how to configure it.

## Optional: Turn on the AI Assistant

n8n works fully without the AI Assistant, which is an optional extra. Once n8n is running, the easiest way to turn it on is from the UI in the instance's AI settings. Add your model API key there. Prefer to configure it before you ever log in? Edit `.env` instead:

1. Open the `.env` file the command created (in `./n8n/.env` by default).
2. Add your AI provider key to the `N8N_INSTANCE_AI_MODEL_API_KEY` line.
3. Restart n8n: `docker compose -f ./n8n/compose.yml up -d`

Full setup steps, including the supported providers, are in [Set up the AI Assistant](../configure-n8n/set-up-ai-assistant.md).

By default, the AI Assistant's web search runs through a bundled search tool with no setup needed. If you'd rather use Brave Search, add your Brave API key to `INSTANCE_AI_BRAVE_SEARCH_API_KEY` in the same `.env` file. It's used automatically once it's set.

{% hint style="info" %}
You don't need to open any extra ports or configure anything for these services. Only n8n itself (port `5678`) is ever reachable from outside your machine. Everything else stays private by default.
{% endhint %}

## Everyday commands

| To do this | Run this |
|---|---|
| Stop n8n | `docker compose -f ./n8n/compose.yml down` |
| Start it again | `docker compose -f ./n8n/compose.yml up -d` |
| Upgrade to the latest version | `curl -fsSL https://get.n8n.io \| sh -s -- --upgrade` |
| Remove n8n and delete its data | `docker compose -f ./n8n/compose.yml down -v` then `rm -rf ./n8n` |

## Flags (for more control)

Adding these to the end of the install command changes what it does:

| Flag | What it does |
|---|---|
| `--version` | On its own, shows the script's version and the latest n8n version it would install. Followed by a version number (for example, `--version 2.31.4`), installs or upgrades to that specific version. |
| `--no-start` | Sets up the configuration files without starting n8n yet. |
| `--upgrade` | Upgrades an existing install to a newer n8n version. Only updates the version number. Your data, settings, and any customizations stay untouched. |
| `--help` | Shows all available options. |

## Prefer not to run a script from the internet?

You can download and read it first, then run it yourself:

```bash
curl -fsSL https://get.n8n.io -o get-n8n.sh
less get-n8n.sh   # review it
sh get-n8n.sh
```

## Windows users

The one-line setup command needs a terminal that understands shell scripts, which the standard Windows Command Prompt or PowerShell don't. Run it instead from:

- **WSL** (Windows Subsystem for Linux), with Docker Desktop's WSL2 integration turned on.
- **Git Bash** (installed alongside [Git for Windows](https://git-scm.com/downloads/win)) with Docker Desktop running can also run POSIX shell scripts, but n8n hasn't verified it end-to-end for the one-line setup command. Stick with WSL unless you've confirmed Git Bash works for your setup.



