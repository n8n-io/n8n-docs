# Setup via PM2

PM2 is a daemon process manager that will help you manage and keep your application online. It allows you to wrap a Node.js application into a service. You can deploy n8n via PM2.

::: warning
We don't officially support running n8n via PM2. You should follow the instructions mentioned [here](./server-setup.md) to deploy n8n via Docker.
:::

## Prerequisites

To run n8n via PM2, you need to have the following software installed:
- **Node.js and npm:** You can find instructions how to install both using nvm (Node Version Manager) [here](https://github.com/nvm-sh/nvm). The current minimum version is `14.15`. In case you already have installed Node.js, you can check your current version with following command:
```bash
node -v
```
- **PM2:** You can install PM2 globally with the following command:
```bash
npm install pm2 -g
```
- **n8n:** You can install n8n globally with the following command:
```bash
npm install n8n -g
```

## Start n8n

To start the n8n service via PM2, execute the following command:
```bash
pm2 start n8n
```

### Auto-start on machine restarts

PM2 can generate startup scripts and configure them in order to keep your process list intact across expected or unexpected machine restarts.

Refer to the official [PM2 documetation](https://pm2.keymetrics.io/docs/usage/startup/) to learn about configuring the auto-start script.

## Update n8n

To update n8n, follow the steps mentioned below:

1. Stop the n8n service
```bash
pm2 stop n8n
```
2. Install the latest version of n8n
```bash
npm install -g n8n@latest
```
3. Restart the n8n service
```bash
pm2 restart n8n
```

## Configurations

You can set environment variables to override the default n8n configurations. For example, if you want to enable basic authentication for your n8n service, use the following command:
```bash
N8N_BASIC_AUTH_ACTIVE=true N8N_BASIC_AUTH_USER=USERNAME N8N_BASIC_AUTH_PASSWORD=PASSWORD pm2 restart n8n --update-env
```

You can learn more about all the possible configurations [here](./configuration.md).

If you want to set these configurations via a file, refer to the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/application-declaration/) to learn more.
