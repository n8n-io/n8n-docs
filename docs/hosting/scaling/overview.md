---
contentType: overview
---

# Scaling n8n

When running n8n at scale, with a large number of users, workflows, or executions, you need to change your n8n configuration to ensure good performance.

n8n can run in different [modes](/hosting/scaling/queue-mode.md) depending on your needs. The `queue` mode provides the best scalability. Refer to [Queue mode](/hosting/scaling/queue-mode.md) for configuration details.

You can configure data saving and pruning to improve database performance. Refer to [Execution data](/hosting/scaling/execution-data.md) for details.
