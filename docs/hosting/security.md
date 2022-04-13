## Security

By default, n8n can be accessed by everybody. This is okay if you only have it running
locally but if you deploy it on a server which is accessible from the web, you have
to make sure that n8n is protected.

### Basic auth

Right now we have very basic protection in place using basic-auth. It can be activated
by setting the following environment variables:

```bash
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=<USER>
export N8N_BASIC_AUTH_PASSWORD=<PASSWORD>
```

### JWT

There is also limited support for JWT based authentication. If enabled, n8n will verify the token with the provided JSON Web Key Set URI. It can be configured through the following environment variables:

```bash
export N8N_JWT_AUTH_ACTIVE=true
export N8N_JWT_AUTH_HEADER=<HEADER>
export N8N_JWKS_URI=<URI>
```
Keep in mind that there is currently no built-in way of passing down the Token in the request, so to use JWT you have to have the token in the request manually.
