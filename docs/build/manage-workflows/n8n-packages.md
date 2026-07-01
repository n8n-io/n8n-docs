---
title: n8n Packages
contentType: howto
nodeTitle: n8nPackages
originalFilePath: workflows/n8n-packages.md
url: https://docs.n8n.io/build/manage-workflows/n8n-packages
description: How you can export and import content from your n8n instance with n8n pcakages
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# n8n Packages

{% hint style="warning" %}
**Beta**

The n8n packages format and APIs are still under development. Breaking changes may occur without a major version bump.
Any feedback via GitHub issues on our main n8n repository is appreciated.
{% endhint %}

A package is a “snapshot” tar file that contains n8n assets and a manifest of it’s dependencies/requirements (think of it like a `npm` package). When exporting a package you should be able to decide what “extras” are included or excluded from it and on import you should have options on “how” the package contents lands in the system. i.e. “credential stubs created’ or “reject package if not present”.

You can import and export n8n packages via the Public API of your n8n instance, as well as a CLI that wraps the same Public API endpoints.


## Known limitations

There is no support for including the following data in n8n packages yet:
- subworkflows
- error workflows
- data tables
- folders
- projects

We are working on adding support for those.