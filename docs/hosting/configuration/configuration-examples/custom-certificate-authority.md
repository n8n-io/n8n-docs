---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configure n8n to use your own certificate authority
description: Customize the n8n container to work with self signed certificates when connecting to services.
contentType: howto
---

# Configure n8n to use your own certificate authority or self-signed certificate

You can add your own certificate authority (CA) or self-signed certificate to n8n. This means you are able to trust a certain SSL certificate instead of trusting all invalid certificates, which is a potential security risk.

/// note | Available in version 1.42.0
This feature is only available in version 1.42.0+.
///

To use this feature you need to place your certificates in a folder and mount the folder to `/opt/custom-certificates` in the container.

## Docker

The examples below assume you have a folder called `pki` that contains your certificates in either the directory you run the command from or next to your docker compose file.

### Docker CLI
When using the CLI you can use the `-v` flag from the command line:

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v ./pki:/opt/custom-certificates \
 docker.n8n.io/n8nio/n8n
```

### Docker Compose

```yaml
name: n8n
services:
    n8n:
        volumes:
            - ./pki:/opt/custom-certificates
        container_name: n8n
        ports:
            - 5678:5678
        image: docker.n8n.io/n8nio/n8n
```

You should also give the right permissions to the imported certs. You can do this once the container is running (assuming n8n as the container name):

```bash
docker exec --user 0 n8n chown -R 1000:1000 /opt/custom-certificates
```
