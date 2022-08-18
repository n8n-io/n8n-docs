# Hosting n8n on DigitalOcean

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses:

* [Caddy](http://caddyserver.com){:target="_blank" .external-link} (a reverse proxy) to allow access to the Droplet from the internet. 
* [Docker Compose](https://docs.docker.com/compose/){:target="_blank" .external-link} to create and define the application components and how they work together.

## Create a Droplet

1. [Log in](https://cloud.digitalocean.com/login){:target=_blank .external-link} to DigitalOcean. 
2. Select the project to host the Droplet, or [create a new project](https://docs.digitalocean.com/products/projects/how-to/create/){:target=_blank .external-link}.
3. In your project, select **Droplets** from the **Manage** menu. 
4. [Create a new Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/){:target=_blank .external-link} using the [Docker image](https://marketplace.digitalocean.com/apps/docker){:target="_blank" .external-link} available on the **Marketplace** tab.

!!! note "Droplet resources"
		When creating the Droplet, DigitalOcean asks you to choose a plan. For most usage levels, a basic shared CPU plan is enough.

!!! note "SSH or Password"
		DigitalOcean lets you choose between SSH and password-based authentication. SSH is more secure. The rest of this guide assumes you are using SSH.

## Log in to your Droplet

The rest of this guide requires you to log in to the Droplet using a terminal with SSH. Refer to [How to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/){:target="_blank" .external-link} for more information.

## Clone configuration repository

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-digital-ocean){:target=_blank .external-link} into the root user folder of the Droplet. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

```shell
git clone https://github.com/n8n-io/n8n-digital-ocean
```

And change directory to the root of the repository you cloned:

```shell
cd n8n-digital-ocean
```

## Default folders and files

The host operating system (the DigitalOcean Droplet) copies the three folders you created to Docker containers to make them available to Docker. The three folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `caddy_data`: A cache folder for Caddy.
- `local_files`: A folder for files you upload or add using n8n.

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

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

```shell
nano .env
```

The file contains inline comments to help you know what to change.

## The Docker Compose file

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

```shell
nano docker-compose.yml
```

## Configure Caddy

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
