---
title: docker-compose-updating
---
If you run n8n using a Docker Compose file, follow these steps to update n8n:

```sh
# Navigate to the directory containing your docker compose file <a href="#navigate-to-the-directory-containing-your-docker-compose-file" id="navigate-to-the-directory-containing-your-docker-compose-file"></a>
cd </path/to/your/compose/file/directory>

# Pull latest version <a href="#pull-latest-version" id="pull-latest-version"></a>
docker compose pull

# Stop and remove older version <a href="#stop-and-remove-older-version" id="stop-and-remove-older-version"></a>
docker compose down

# Start the container <a href="#start-the-container" id="start-the-container"></a>
docker compose up -d
```
