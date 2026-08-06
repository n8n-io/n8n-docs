---
title: Jenkins node documentation
description: >-
  Learn how to use the Jenkins node in n8n. Follow technical documentation to
  integrate Jenkins node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Jenkins node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.jenkins.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.jenkins'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.jenkins'
layout:
  description:
    visible: false
---

# Jenkins node <a href="#jenkins-node" id="jenkins-node"></a>

Use the Jenkins node to automate work in Jenkins, and integrate Jenkins with other applications. n8n has built-in support for a wide range of Jenkins features, including listing builds, managing instances, and creating and copying jobs. 

On this page, you'll find a list of operations the Jenkins node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Jenkins credentials](../credentials/jenkins.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Jenkins node documentation integration templates](https://n8n.io/integrations/jenkins) or [search all templates](https://n8n.io/workflows/)
