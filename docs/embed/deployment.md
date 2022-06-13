# Deployment

See the [official n8n documentation](https://docs.n8n.io/reference/server-setup.html) for detailed setup options.

## User data

It is recommended that you follow the same or similar practices we use internally for n8n.cloud: User data is saved using [Rook](https://rook.io/) and, if an n8n server goes down, a new instance is started on another machine using the same data.

In this manner, backups only need to be used in case of a catastrophic failure, or when a user wants to reactivate their account within your prescribed retention period (2 weeks for n8n.cloud).

## Backups

We recommend creating nightly backups by attaching another container, and copying all data to this second container. In this manner, RAM usage is negligible, and so does not impact the amount of users you can place on the server.

## Restarting

If your instance is down or restarting, missed executions (e.g. Cron or Webhook nodes) during this time are not recoverable. If it is important for you, you would have to build another proxy in front of it which caches the data.
