---
title: Configure webhook URLs with reverse proxy
description: Customize n8n webhook URLs for compatibility with reverse proxy setups.
contentType: howto
nodeTitle: Configure webhook URLs with reverse proxy
originalFilePath: hosting/configuration/configuration-examples/webhook-url.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy
layout:
  description:
    visible: false
---

# Configure n8n webhooks with reverse proxy <a href="#configure-n8n-webhooks-with-reverse-proxy" id="configure-n8n-webhooks-with-reverse-proxy"></a>

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443.

When running n8n behind a reverse proxy, it's important to do the following:

* set the webhook URL manually with the `N8N_WEBHOOK_URL` environment variable so that n8n can display it in the editor UI and register the correct webhook URLs with external services. (`N8N_WEBHOOK_URL` replaces `WEBHOOK_URL`, which is deprecated from n8n 2.35.0; n8n logs a deprecation warning if you still use `WEBHOOK_URL`.)
* Set the `N8N_PROXY_HOPS` environment variable to `1`.
* On the last proxy on the request path, set the following headers to pass on information about the initial request:
    * [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For)
    * [`X-Forwarded-Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Host)
    * [`X-Forwarded-Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Proto)

```bash
export N8N_WEBHOOK_URL=https://n8n.example.com/
export N8N_PROXY_HOPS=1
```
Refer to [Environment variables reference](../use-environment-variables/endpoints.md) for more information on this variable.

If you also run n8n's [instance-level MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) behind the same reverse proxy, make sure it forwards the [MCP request headers](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server#mcp-request-headers) too.

## Serve forms from a separate host behind an authentication proxy

{% hint style="info" %}
**Feature availability**

`N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX` is available from n8n 2.15.0.
{% endhint %}

Some authentication proxies, such as Google Identity-Aware Proxy, use a session cookie. To put n8n forms behind such a proxy, serve webhooks and forms from their own hostname. Then set [`N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX`](../use-environment-variables/security.md) to `true`.

The setting applies to every page that n8n serves as a form:

* Pages from the [n8n Form Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.formtrigger) and [n8n Form](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.form) nodes, including form completion pages
* Forms from the [Wait](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.wait#on-form-submitted) node when it resumes **On Form Submitted**
* Approval forms from the **Send and Wait for Response** operation of app nodes such as Slack and Microsoft Teams

### Why form submissions fail behind an authentication proxy

n8n serves form pages with a `sandbox` directive in the Content Security Policy (CSP) header. The sandbox gives the page an opaque origin. As a result, the browser sends the form submission with `Origin: null` and without cookies. The proxy doesn't get its session cookie and rejects the request. The form loads, but submitting it shows **Problem submitting response**, and no execution starts.

Setting `N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX` to `true` removes the `sandbox` directive from form pages. The form page keeps its real origin, and the browser sends the proxy's session cookie with the submission.

### When it's safe to disable the form sandbox

{% hint style="danger" %}
**The form sandbox protects the people who open your forms**

Form pages can show HTML from the workflow, for example from **Custom HTML** form elements and completion pages. The sandbox stops that HTML from using the n8n session of the person who opens the form. Without the sandbox, if the form shares a hostname with the editor, a script on the page can send requests to n8n as that person.
{% endhint %}

Only set `N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX` to `true` when all three conditions are true:

* `N8N_WEBHOOK_URL` and `N8N_EDITOR_BASE_URL` use different hostnames, for example `hooks.example.com` and `n8n.example.com`. A different port on the same hostname isn't enough, because browsers share cookies across ports.
* The webhook hostname serves only webhook and form paths. Configure your proxy so that the editor and n8n's internal REST API (`/rest`) aren't reachable on it. Users don't sign in to n8n through the webhook hostname.
* n8n runs with `NODE_ENV=production`. The official n8n Docker image sets this for you. If you install n8n with npm, set it yourself. Without it, n8n runs in development mode and accepts cross-origin requests from any website.

By default, n8n serves webhooks and forms on these paths. If you changed them with the [endpoint environment variables](../use-environment-variables/endpoints.md), use your values instead:

* Forms: `/form/`, `/form-test/`, and `/form-waiting/`, set by `N8N_ENDPOINT_FORM`, `N8N_ENDPOINT_FORM_TEST`, and `N8N_ENDPOINT_FORM_WAIT`
* Webhooks: `/webhook/`, `/webhook-test/`, and `/webhook-waiting/`, set by `N8N_ENDPOINT_WEBHOOK`, `N8N_ENDPOINT_WEBHOOK_TEST`, and `N8N_ENDPOINT_WEBHOOK_WAIT`

With this setup, the browser doesn't send the n8n session cookie to the webhook hostname. A script on the form page can't send authenticated requests to n8n on the editor hostname.

### Example configuration for forms on a separate hostname

This example serves the editor on `n8n.example.com`, and webhooks and forms on `hooks.example.com`:

```bash
# The editor stays on the main hostname
export N8N_EDITOR_BASE_URL=https://n8n.example.com/
# Webhooks and forms use their own hostname, behind the authentication proxy
export N8N_WEBHOOK_URL=https://hooks.example.com/
export N8N_PROXY_HOPS=1
# Required: without it, n8n runs in development mode
export NODE_ENV=production
export N8N_INSECURE_DISABLE_FORM_HTML_SANDBOX=true
```

`N8N_WEBHOOK_URL` is available from n8n 2.30.0. On earlier versions, use `WEBHOOK_URL` instead.

### Test forms from the editor behind an authentication proxy

From n8n 2.47.0, the editor opens test forms on a webhook hostname behind an authentication proxy. When you select **Execute workflow** or **Execute step** on a workflow with an **n8n Form Trigger** node, the editor opens the test form in a new window. If you aren't signed in to the proxy yet, the proxy's sign-in page shows first. After you sign in, the form loads.

On earlier versions, the editor doesn't open the test form in this setup. To test the form, open the **n8n Form Trigger** node, copy its **Test URL**, and open it in a new browser tab.

## Related resources

* [Configuration examples](./)
