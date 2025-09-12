---
title: Jenkins node documentation
description: Learn how to use the Jenkins node in n8n. Follow technical documentation to integrate Jenkins node into your workflows.
contentType: [integration, reference]
---

# Jenkins node

Use the Jenkins node to automate work in Jenkins, and integrate Jenkins with other applications. n8n has built-in support for a wide range of Jenkins features, including listing builds, managing instances, and creating and copying jobs. 

On this page, you'll find a list of operations the Jenkins node supports and links to more resources.

/// note | Credentials
Refer to [Jenkins credentials](/integrations/builtin/credentials/jenkins.md) for guidance on setting up authentication. 
///

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Operations

* Build
    * List Builds
* Instance
    * Cancel quiet down state
    * Put Jenkins in quiet mode, no builds can be started, Jenkins is ready for shutdown
    * Restart Jenkins immediately on environments where it's possible
    * Restart Jenkins once no jobs are running on environments where it's possible
    * Shutdown once no jobs are running
    * Shutdown Jenkins immediately
* Job
    * Copy a specific job
    * Create a new job
    * Trigger a specific job
    * Trigger a specific job

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'jenkins') ]]
