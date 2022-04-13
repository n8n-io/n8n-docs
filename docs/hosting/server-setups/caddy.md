# Hosting with Caddy Server

[Caddy](https://caddyserver.com) is a powerful, enterprise-ready, open source web server with automatic HTTPS written in Go.

1. In your Caddyfile configuration, add:

```
n8n.example.com {
    reverse_proxy localhost:5678 {
      flush_interval 10
    }
}
```

2. The `.env` should be adapted as follows:

```bash
DOMAIN_NAME=example.com
SUBDOMAIN=n8n
```

3. To start your server:

```bash
$ caddy start
```
