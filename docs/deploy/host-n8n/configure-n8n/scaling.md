---
contentType: overview
nodeTitle: Scaling
originalFilePath: hosting/scaling/overview.md
originalUrl: 'https://docs.n8n.io/hosting/scaling/overview'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling'
layout:
  description:
    visible: false
---

# Scaling n8n <a href="#scaling-n8n" id="scaling-n8n"></a>

When running n8n at scale, with a large number of users, workflows, or executions, you need to change your n8n configuration to ensure good performance.

n8n can run in different [modes](scaling/enable-queue-mode.md) depending on your needs. The `queue` mode provides the best scalability. Refer to [Queue mode](scaling/enable-queue-mode.md) for configuration details.

You can configure data saving and pruning to improve database performance. Refer to [Execution data](scaling/manage-execution-data.md) for details.

## In this section

* [Measure performance](scaling/measure-performance.md): benchmark n8n's performance and resource consumption.
* [Enable queue mode](scaling/enable-queue-mode.md): run n8n across multiple worker processes for the best scalability.
* [Control concurrency](scaling/control-concurrency.md): limit how many executions run at once.
* [Manage execution data](scaling/manage-execution-data.md): configure data saving and pruning to improve database performance.
* [Handle binary data](scaling/handle-binary-data.md): handle large files without degrading n8n's performance.
* [Use external storage](scaling/use-external-storage.md): store binary data and execution data externally.
* [Fix memory issues](scaling/fix-memory-issues.md): identify and avoid memory-related errors.

## Related resources

* [Configure n8n](./)
