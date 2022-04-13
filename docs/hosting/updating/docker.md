# Docker

From your Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

![Docker Desktop](/_images/hosting/updating/docker/docker_desktop.png)

You can also use the command line to pull the latest, or a specific version:

```sh
// Pull latest version
docker pull n8nio/n8n

// Pull specific version
docker pull n8nio/n8n:0.126.1
```

Stop the container and start it again. You can also use the command line:

```sh
// Get the container ID
docker ps -a

// Stop the container with ID container_id
docker stop [container_id]

// Remove the container with ID container_id
docker rm [container_id]

// Start the container
docker run --name=[container_name] [options] -d n8nio/n8n
```

## Docker Compose

If you've running n8n using a docker-compose file, follow the below mentioned steps to update n8n.

```sh
// Pull latest version
docker-compose pull

// Stop and remove older version
docker-compose down

// Start the container
docker-compose up -d
```
