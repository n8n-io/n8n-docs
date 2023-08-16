If you're running n8n using a Docker Compose file, follow the steps below to update n8n.

```sh
# Pull latest version
docker compose pull

# Stop and remove older version
docker compose down

# Start the container
docker compose up -d
```
