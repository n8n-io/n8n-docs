---
title: Trello Trigger node documentation
description: Learn how to use the Trello Trigger node in n8n. Follow technical documentation to integrate Trello Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Trello Trigger node

[Trello](https://trello.com/) is a web-based Kanban-style list-making application which is a subsidiary of Atlassian. Users can create their task boards with different columns and move the tasks between them.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/trello.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Trello Trigger integrations](https://n8n.io/integrations/trello-trigger/) page.
///

## Find the Model ID

The model ID is the ID of any model in Trello. Depending on the use-case, it could be the User ID, List ID, and so on.

For this specific example, the List ID would be the Model ID:

1. Open the Trello board that contains the list.
2. If the list doesn't have any cards, add a card to the list.
3. Open the card, add `.json` at the end of the URL, and press enter.
4. In the JSON file, you will see a field called `idList`.
5. Copy `idList`and paste it in the **Model ID** field in n8n.

