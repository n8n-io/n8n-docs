# Security

By default, anyone can access n8n. This is okay if it's running
locally, but if you deploy it on a server which is exposed to the web, you have
to make sure that n8n is secure.

### User management

n8n provides built-in user management for self-hosted n8n instances. Refer to the [User management](/hosting/user-management/) documentation for more information.

### Basic auth

You can choose to use basic auth instead of n8n's built-in user management. Activate it
by setting the following environment variables:

```bash
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=<USER>
export N8N_BASIC_AUTH_PASSWORD=<PASSWORD>
```

### JWT

There's limited support for JWT based authentication. If enabled, n8n will verify the token with the provided JSON Web Key Set URI. You can configure it using the following environment variables:

```bash
export N8N_JWT_AUTH_ACTIVE=true
export N8N_JWT_AUTH_HEADER=<HEADER>
export N8N_JWKS_URI=<URI>
```
Keep in mind that there is no built-in way of passing down the token in the request, so to use JWT you have to have the token in the request manually.
