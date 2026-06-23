---
title: Configure n8n to use your own certificate authority
description: >-
  Customize the n8n container to work with self signed certificates when
  connecting to services.
contentType: howto
nodeTitle: Configure custom SSL certificate authorities
originalFilePath: hosting/configuration/configuration-examples/custom-certificate-authority.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/configuration-examples/custom-certificate-authority
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-custom-ssl-certificate-authorities
layout:
  description:
    visible: false
---

# Configure n8n to use your own certificate authority or self-signed certificate <a href="#configure-n8n-to-use-your-own-certificate-authority-or-self-signed-certificate" id="configure-n8n-to-use-your-own-certificate-authority-or-self-signed-certificate"></a>

You can add your own certificate authority (CA) or self-signed certificate to n8n. This means you are able to trust a certain SSL certificate instead of trusting all invalid certificates, which is a potential security risk.

{% hint style="info" %}
**Added in version 1.42.0**

This feature is available in version 1.42.0 and above.
{% endhint %}

To use this feature you need to place your certificates in a folder and mount the folder to `/opt/custom-certificates` in the container. The external path that you map to `/opt/custom-certificates` must be writable by the container. 

## Docker <a href="#docker" id="docker"></a>

The examples below assume you have a folder called `pki` that contains your certificates in either the directory you run the command from or next to your docker compose file.

### Docker CLI <a href="#docker-cli" id="docker-cli"></a>
When using the CLI you can use the `-v` flag from the command line:

```bash
docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -v ./pki:/opt/custom-certificates \
 docker.n8n.io/n8nio/n8n
```

### Docker Compose <a href="#docker-compose" id="docker-compose"></a>

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

## Certificate requirements for Custom Trust Store <a href="#certificate-requirements-for-custom-trust-store" id="certificate-requirements-for-custom-trust-store"></a>

Supported certificate types:

- Root CA Certificates: these are certificates from Certificate Authorities that sign other certificates. Trust these to accept all certificates signed by that CA.
- Self-Signed Certificates: certificates that servers create and sign themselves. Trust these to accept connections to that specific server only.

You must use PEM format:

- Text-based format with BEGIN/END markers
- Supported file extensions: `.pem`, `.crt`, `.cer`
- Contains the public certificate (no private key needed)

For example:

```
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/heBjcOuMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
[base64 encoded data]
-----END CERTIFICATE-----
```

The system doesn't accept:

- DER/binary format files
- PKCS#7 (.p7b) files
- PKCS#12 (.pfx, .p12) files
- Private key files
- Convert these formats to PEM before use.
