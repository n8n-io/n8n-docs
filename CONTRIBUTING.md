# Contributing

## Overview

These are a set of guidelines to contribute to this repository, helping ensure consistency and quality.

## Documentation files

* **Main:** Create a directory at `docs/nodes/nodes-library/nodes/` containing:
  - a text file called `README.md` describing the functionality of the relevant node, and
  - an image file called `workflow.png` showing a screencap of the Start node connected to the relevant node.
* **Credentials:** Create a directory at `docs/nodes/credentials/` containing:
  - a text file called `README.md` describing how to obtain credentials for the relevant node.

## Writing guidelines

* Follow the structure and writing conventions of the existing documentation.
  - In the main file,
    - under "Basic Operations", enter resources and operations exactly as they are named in the nodes.
    - under "Example Usage", ensure that the link of the relevant node remains empty.
    - exclude any optional steps from the example usage steps for the relevant node.
    - create a workflow at [n8n.io](https://n8n.io/workflows) and use the resulting link in "Example Usage".
    - if there is a relevant [n8n medium article](https://medium.com/n8n-io), include it under "Further Reading". See the [Telegram node](https://docs.n8n.io/nodes/n8n-nodes-base.telegram/).
  - In the credentials file,
    - if there is more than one authentication method, list OAuth first.
    - if there are steps that are necessary but out of the scope of creating a node in n8n, move them to the FAQ section. See the [Chargebee Trigger node](https://docs.n8n.io/nodes/n8n-nodes-base.chargebeeTrigger/).
* Keep your writing as concise as possible.
* Make sure to include commit messages in [this](https://gist.github.com/parmentf/035de27d6ed1dce0b36a) format.

## General checklist

The following is a list of common errors that you can use to check your own work locally before submitting a PR:

- [ ] Check spelling and grammar. [Grammarly](https://www.grammarly.com/) is a good tool to help.
- [ ] Check for any broken links.
- [ ] Ensure that branding is correct. For example, "GitHub", not "Github".
- [ ] Ensure that GIFs capture every step of the process at a uniform pace.
- [ ] Ensure all documentation files end with an empty newline.

