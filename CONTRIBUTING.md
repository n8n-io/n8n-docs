# Contributing

## Overview

If you want to contribute to this repository - thank you! Beforehand, we encourage you to have a look at the existing documentation to get an idea of the structure and writing conventions we use. In writing your documentation, please follow the guidelines described below, in order to ensure quality and consistency with our style.

## Documenting nodes

* **Nodes and trigger nodes:** Create a directory with the name of the node at `docs/integrations/nodes/` or `docs/integrations/trigger-nodes` containing:
  - A text file named `n8n-nodes-base.<node-nam>.md` describing the functionality of the relevant node.
* **Credentials:** Create a directory with the name of the node at `docs/integrations/credentials/` containing:
  - A text file with the node name describing how to obtain credentials for the relevant node.

A standard node doc includes the following parts:
* Node description
  - Describe briefly the purpose and function of the node.
* Operations
  - Enter the resources and operations exactly as they are named in the nodes.

In the credentials doc:
* If there is more than one authentication method, list OAuth first.
* If possible, avoid documenting external products. Instead, provide links to the relevant product documentation. For example, for guidance on getting credentials (such as how to get an API token for a service), provide a link to the product's API authentication docs. 


## Style

n8n uses the [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

Some quick tips:

* Plain language:
  * Clearly explain each step of the process you are documenting.
  * Use present tense, active voice, and "you"-form to address the readers.
  * Keep your writing as concise as possible. [Hemingway](https://hemingwayapp.com/) is a free browser app to measure language complexity. There is no fixed rule about what grade to aim for, but the lower the reading grade, the better.
* Formatting:
  * Make sure you match brand names precisely. For example: "GitHub", not "Github".
  * Headings should be sentence case
  * Use bold when referring to UI elements. For example, "Click **Save** to proceed."
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
