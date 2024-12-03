---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Hardening task runners
description: "Harden task runners for better isolation for your self-hosted n8n instance."
contentType: howto
---

# Hardening task runners

[Task runners](/hosting/configuration/task-runners/) are responsible for executing code from the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/). While Code node executions are secure, you can follow these recommendations to further harden your task runners.

## Run task runners as sidecars in external mode

To increase the isolation between the core n8n process and code in the Code node, run task runners in [external mode](/hosting/configuration/task-runners#setting-up-external-mode). External task runners launch as separate containers, providing a fully isolated environment to execute the JavaScript defined in the Code node.
