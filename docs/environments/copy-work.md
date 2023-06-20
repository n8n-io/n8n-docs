---
title: Copy work between environments
description: How to get changes from one environment into another.
---

# Copy work between environments

Do copy work between environments, you need to do a pull request in your Git provider. You can't copy work directly between environments in n8n. 

A common pattern is:

1. Do work in your developments instance.
1. Push the work to the dev branch in Git.
1. Create a pull request to merge your dev branch into your production branch.
1. In your production n8n instannce, pull the changes.

## Automatically send changes to n8n

You can automate parts of the process of copying work, using the `/source-control/pull` API endpoint. Call the API once the changes are merged:

```curl
curl --location '<YOUR-INSTANCE-URL>/api/v1/source-control/pull' \
	--header 'Content-Type: application/json' \
	--header 'X-N8N-API-KEY: <YOUR-API-KEY>'
```

This means you can use a GitHub Action or GitLab CI/CD to automatically pull changes to the production instance on merge.

A GitHub Action example:

```yaml
name: CI
on:
  # Trigger the workflow on push or pull request events for the "production" branch
  push:
    branches: [ "production" ]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
jobs:
  run-pull:
    runs-on: ubuntu-latest
    steps:
      - name: PULL
				# Use GitHub secrets to protect sensitive information
        run: >
          curl --location '${{ secrets.INSTANCE_URL }}/version-control/pull' --header
          'Content-Type: application/json' --header 'X-N8N-API-KEY: ${{ secrets.INSTANCE_API_KEY }}'
```

