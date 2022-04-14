## Doc² with tunnel

!!! danger
    This is only meant for local development and testing. Do not use it in production.

To be able to use webhooks for trigger nodes of external services like GitHub, Doc² has to be reachable from the web. To make that easy, Doc² has a special [tunnel service](https://github.com/localtunnel/localtunnel) which redirects requests from our servers to your local Doc² instance.
