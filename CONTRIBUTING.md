# Contributing

## Overview

If you want to contribute to this repository - thank you! Beforehand, we encourage you to have a look at the existing documentation to get an idea of the structure and writing conventions we use. In writing your documentation, please follow the guidelines described below, in order to ensure quality and consistency with our style.

## Documentation files

* **Main:** Create a directory with the name of the node at `docs/nodes/nodes-library/nodes/` containing:
  - A text file named `README.md` describing the functionality of the relevant node.
  - An image file named `workflow.png` showing a screenshot of the Start node connected to the relevant node.
* **Credentials:** Create a directory with the name of the node at `docs/nodes/credentials/` containing:
  - A text file called `README.md` describing how to obtain credentials for the relevant node.

## Writing guidelines

### Content
A standard **node documentation** `README.md` includes the following parts:
* Node Description
  - Describe briefly the purpose and function of the node.
* Basic Operations
  - Enter the resources and operations exactly as they are named in the nodes.
* Example Usage
  - Ensure that the link of the relevant node remains empty.
  - Exclude any optional steps from the example usage steps for the relevant node.
  - Create a workflow at [n8n.io](https://n8n.io/workflows) and use the resulting link in "Example Usage".
* Further Reading
  - Include n8n [Medium](https://medium.com/n8n-io) articles that are relevant for the specific node. The resulting list should be ordered alphabetically. See the [Telegram node](https://docs.n8n.io/nodes/n8n-nodes-base.telegram/).

In the **credentials** `README.md`:
* If there is more than one authentication method, list OAuth first.
* If there are steps that are necessary but out of the scope of creating a node in n8n, move them to the FAQ section. See the [Chargebee Trigger node](https://docs.n8n.io/nodes/n8n-nodes-base.chargebeeTrigger/).


### Style
* Explain clearly each step of the process or changes you make.
* Keep your writing as concise as possible.
* Use present tense, active voice, and "you"-form to address the readers.
* Spell out correctly the names of organisations or brands. For example: "GitHub", not "Github".
* Use correct spelling and grammar. [Grammarly](https://www.grammarly.com/) is a good tool to help you with that.
* Add commit messages in [this](https://gist.github.com/parmentf/035de27d6ed1dce0b36a) format.

### Screenshots

If your contribution includes screenshots, please make sure that they meet the following criteria:

- Only the Editor UI appears in the screenshot. Anything else, like the browser frame, tabs, and so on, should be omitted.
- After zooming in once, the Editor UI is 23 boxes wide and 9 boxes tall.
- The nodes have a distance of two boxes between them.
- The nodes fit inside the boxes (as much as they can).
- The workflow is centered in the Editor canvas.
- If the workflow uses a Trigger node, the Start node doesn't appear in the Editor canvas.
- In recorded GIFs, the cursor movements in the GIF are slow and easy to follow. A good rule of thumb is that the speed should be about 75% of your regular speed. In any case, make sure that GIFs capture every step of the process at a steady pace.


## General checklist

Before submitting a PR, make sure your contribution ticks all these boxes:

- [ ] All necessary files and images are included.
- [ ] All links are working and direct to the right location.
- [ ] All documentation files end with an empty newline.
- [ ] The commit message describes clearly and succintly the changes you made.
- [ ] The PR explains clearly and succintly the changes you made and why they are necessary.
- [ ] You have read and accepted the [code of conduct](https://github.com/n8n-io/n8n-docs/blob/master/CODE_OF_CONDUCT.md) and [contributor license agreement](https://github.com/n8n-io/n8n-docs/blob/master/CONTRIBUTOR_LICENSE_AGREEMENT.md).
