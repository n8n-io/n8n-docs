---
description: Set up basic access authentication (basic auth) in n8n
---

# Basic access authentication

You can choose to use basic auth instead of n8n's [built-in user management](/hosting/authentication/user-management-self-hosted/). Activate it by setting the following environment variables:

```bash
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=<USER>
export N8N_BASIC_AUTH_PASSWORD=<PASSWORD>
```
