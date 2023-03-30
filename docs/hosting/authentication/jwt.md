---
description: Set up JavaScript Web Tokens in n8n
---

# JavaScript Web Tokens (JWT)

There's limited support for JWT based authentication. If enabled, n8n verifies the token with the provided JSON Web Key Set URI. You can configure it using the following environment variables:

```bash
export N8N_JWT_AUTH_ACTIVE=true
export N8N_JWT_AUTH_HEADER=<HEADER>
export N8N_JWKS_URI=<URI>
```

Note that there is no built-in way of passing down the token in the request, so to use JWT you have to add the token to the request manually.
