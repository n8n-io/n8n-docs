---
contentType: tutorial
nodeTitle: Build your first workflow
originalFilePath: try-it-out/tutorial-first-workflow.md
originalUrl: https://docs.n8n.io/try-it-out/tutorial-first-workflow
url: https://docs.n8n.io/get-started/build-your-first-workflow
description: Create your first workflow in n8n and learn some key concepts.
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

# Build your first workflow

In this quick start, you’ll build a workflow that fetches the weather for Berlin every morning and turns it into a short report anyone can read at a glance. The workflow saves each report to a data table, so you build up a weather log over time.

![8 AM schedule trigger connected to Get Berlin weather, Add weather report, and Save weather log](.gitbook/assets/build-your-first-workflow.png)

When it runs, your workflow produces a report like this:

```
The temperature in Berlin is 6.8 degrees C and it's currently cloudy.
```

You’ll build it with n8n Assistant, which turns a prompt into a working workflow. That takes less than five minutes. If you’d rather build it node by node, an optional section at the end walks you through the same workflow by hand.

You can also follow along with this video:

{% embed url="https://www.youtube.com/embed/0BzaIm7Fwyo" %}

Apart from n8n, you don’t need any coding experience. The weather data comes from Mockingbird, a sample-data service n8n provides for tutorials, so you’ll get similar results to this guide.

## Before you start

You need an n8n instance. Either:

- **n8n Cloud**: [sign up for a free trial](https://go.n8n.io/ekXKXJ), or
- **Self-hosted**: follow the [host n8n](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n) guide, then [set up n8n Assistant](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-n8n-assistant) with your own AI provider account

## Build the workflow with n8n Assistant

{% hint style="info" %}
**Feature availability**

n8n Assistant is available on:

- **n8n Cloud:** Starter, Pro
- **Self-hosted:** Community, Registered Community, Business

On n8n Cloud Enterprise and self-hosted Enterprise, contact your Customer Success Manager about preview access.
{% endhint %}

{% hint style="info" %}
**Preview status**

n8n Assistant is in Preview and may change in future releases.

Your results may differ from the screenshots in this guide.
{% endhint %}

n8n Assistant builds workflows from prompts. You describe what you want, approve each step, and end up with a workflow you can open, edit, and publish.

1. Log in to your n8n instance and select **New chat** in the left menu to talk to the n8n Assistant.

    ![New chat selected in the left menu, with the n8n Assistant chat box open](.gitbook/assets/build-your-first-workflow-assistant-01.png)

2. Enter this prompt, or dictate it, and select the send arrow:

    ```
    Build a workflow called Weather Log that runs every day at 8 AM:
    - Get the weather for Berlin from https://mockingbird.n8n.io/v1/weather/berlin
    - Add a report field that contains the city, temperature, and conditions e.g. The temperature in Berlin is 10°C. It's currently overcast.
    - Save the report to a new data table
    ```

    ![The weather workflow prompt entered in the n8n Assistant chat box](.gitbook/assets/build-your-first-workflow-assistant-02.png)

    {% hint style="info" %}
    Mockingbird is a sample API with weather for about 40 European cities. Other cities return an error.
    {% endhint %}

3. Approve any prompts from n8n Assistant with **Allow once**. As it builds the workflow, you'll see the progress on the canvas to the right of the chat.

    ![n8n Assistant asking the user for permission](.gitbook/assets/build-your-first-workflow-assistant-03.png)

4. Approve a run if prompted by n8n Assistant. Otherwise, ask n8n Assistant to run a test for you.

    ![n8n Assistant asking to run a live test, with the finished workflow on the canvas](.gitbook/assets/build-your-first-workflow-assistant-04.png)

5. Select **Publish and enable the schedule** if prompted by n8n Assistant, as the workflow only runs at 8 AM every day once you publish it. Otherwise, ask n8n Assistant to publish it for you.

    ![User asking assistant to publish workflow](.gitbook/assets/build-your-first-workflow-assistant-05.png)

6. Select the `weather log` data table at the top of the right-hand pane to check the workflow ran as intended. Otherwise, ask n8n Assistant to show you the data table.

    ![weather log tab selected at the top of the right-hand pane](.gitbook/assets/build-your-first-workflow-assistant-06.png)

7. Select **Personal** in the left menu to see the workflow. n8n Assistant saves all workflows under **Personal**.

    ![weather log listed under Personal, marked as Published](.gitbook/assets/build-your-first-workflow-assistant-07.png)

## What your workflow does

Open **weather log** on the canvas and you'll see four [nodes](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/workflow-components/work-with-nodes), each doing one job and passing its result to the next:

| Node | What it does |
| --- | --- |
| **Every day at 8 AM** | A [Schedule Trigger](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.scheduletrigger) that starts the workflow at 8 AM every day. |
| **Get Berlin weather** | An [HTTP Request](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.httprequest) node that fetches the weather from the Mockingbird API. |
| **Add weather report** | An [Edit Fields (Set)](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.set) node that builds the `report` text, using an [expression](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/transform-data/expressions-for-data-transformation) to pull in the live weather values. |
| **Save weather log** | A [Data table](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.datatable) node that inserts the report as a new row in the table. |

{% hint style="info" %}
n8n Assistant chooses the node names itself, so yours may differ from the ones above.
{% endhint %}

## Optional: Build the workflow yourself

This section builds the weather log workflow by hand, one node at a time, without n8n Assistant.

You'll end up with a second workflow built from the same four nodes: **Every day at 8 AM**, **Get Berlin weather**, **Add weather report**, and **Save weather log**. You'll also create a new data table in the process.

### 1. Create the workflow

1. Select **Personal** in the left menu followed by **Create workflow**. This opens the canvas, where you’ll build your workflow and spend most of this section.

    ![Personal in the left menu and the create workflow button](.gitbook/assets/build-your-first-workflow-optional-01-01.png)

2. Select the workflow’s name and change it to `Weather Log 2` (or something more creative). Select anywhere on the canvas to save the name.

### 2. Run it at 8 AM every day

You’ll use: **Schedule Trigger**

When building a workflow, the first question to answer is: “How should this workflow start?” On a schedule, for example 8 AM every day? When a user submits a form? When an application like Telegram sends a message?

For this build, you'll set it to run at 8 AM every day. While you build, you’ll run the workflow yourself to test it. Once you publish it at the end, the schedule runs it for you:

1. Select **Add first step**, then select **On a schedule**.

    ![On a schedule option](.gitbook/assets/build-your-first-workflow-optional-02-01.png)

2. Select `8am` from the **Trigger at Hour** field in the Node details view. Select the X in the top right to close the window.

    ![Trigger at Hour set to 8 AM](.gitbook/assets/build-your-first-workflow-optional-02-02.png)

3. Select the **Schedule Trigger** node and press space bar to open up the rename dialog box. Rename it to `Every day at 8 AM`.

    ![Renamed Schedule Trigger](.gitbook/assets/build-your-first-workflow-optional-02-03.png)

### 3. Get the weather for Berlin

You’ll use: **HTTP Request**

You’ve got your trigger, so it’s time to fetch the weather. The **HTTP Request** node sends a request to a web address, called an endpoint, and returns the data that address provides. Services that share data this way are APIs.

1. Select **+** after the trigger, type `http` in the **Search nodes** box, and select **HTTP Request**.

    ![HTTP Request in the search results](.gitbook/assets/build-your-first-workflow-optional-03-01.png)

2. Paste `https://mockingbird.n8n.io/v1/weather/berlin` into the **URL** field in the Node details view.

    ![Mockingbird URL in the URL field](.gitbook/assets/build-your-first-workflow-optional-03-02.png)

    {% hint style="info" %}
    Mockingbird is a sample API with weather for about 40 European cities. Other cities return an error.
    {% endhint %}

3. Press **Execute step**. You should see the weather for Berlin in the output, including the `city`, `temp_c`, and `condition` fields you’ll use in the next step.

    ![Berlin weather output](.gitbook/assets/build-your-first-workflow-optional-03-03.png)

4. Rename the node to be `Get Berlin weather`.

### 4. Turn the weather into a report

You’ll use: **Edit Fields (Set)**

Next, you’ll turn the weather data into a short report that anyone can read at a glance.

1. Select **+** after **Get Berlin weather**, select **Data transformation**, then select **Edit Fields (Set)**.

    ![Edit Fields (Set) under Data transformation](.gitbook/assets/build-your-first-workflow-optional-04-01.png)

2. Select **Add Field** in the middle of the Node details view. For **Name**, enter `report`.

    ![Add Field button](.gitbook/assets/build-your-first-workflow-optional-04-02-01.png)

    ![Field named report](.gitbook/assets/build-your-first-workflow-optional-04-02-02.png)

3. Enter `The temperature in` for **Value**, then drag `city` from the input panel on the left. When you drop a field in, n8n switches **Value** to **Expression** mode, and you see:

    ```
    The temperature in {{ $json.city }}
    ```

    ![city dragged into the Value field](.gitbook/assets/build-your-first-workflow-optional-04-03.png)

    {% hint style="info" %}
    **What's an expression?**

    `{{ $json.city }}` is a placeholder, called an expression. When the workflow runs, n8n swaps it for the real value. The input panel shows the output from **Get Berlin weather**, which becomes the input to this node. You drag fields in rather than typing them, and the preview under the field shows you the finished sentence. To learn more, see [Expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes#expressions).
    {% endhint %}

4. Drag `temp_c` in and update the wording to:

    ```
    The temperature in {{ $json.city }} is {{ $json.temp_c }}°C.
    ```

    ![Value with city and temperature](.gitbook/assets/build-your-first-workflow-optional-04-04-01.png)

    Add `It's currently` to the end, then drag `condition` in:

    ```
    The temperature in {{ $json.city }} is {{ $json.temp_c }}°C. It's currently {{ $json.condition }}.
    ```

    ![Value with city, temperature, and condition](.gitbook/assets/build-your-first-workflow-optional-04-04-02.png)

5. Rename the node to `Add weather report` and select **Execute step**.

### 5. Save the data

You’ll use: **Data table**

You’ve fetched the data and formatted it, so now it’s time to store it. You'll create a data table in the process.

1. Add a **Data table** node after **Add weather report** and select **Insert row** as the action.

    ![Insert row action](.gitbook/assets/build-your-first-workflow-optional-05-01.png)

2. Open the node, select the drop down under **Data table**, then select **Create new data table**:

    ![Create a new data table](.gitbook/assets/build-your-first-workflow-optional-05-02.png)

    A new browser tab will open.

3. Enter `weather log 2` for the name of your data table (or something creative!), and select **Create**:

    ![Name the new data table](.gitbook/assets/build-your-first-workflow-optional-05-03.png)

4. Select **Add Column** on the top right and enter `report` before selecting **Add Column**. This will be the column the data from the `Add weather report` node gets saved to.

    ![Add a column to the new data table](.gitbook/assets/build-your-first-workflow-optional-05-04.png)

    Navigate back to the workflow tab.

5. Select the data table you just created from the **Data table** list and change **Mapping Column Mode** to **Map Automatically**. The `report` field from **Add weather report** has the same name as the column in the data table, so n8n maps them for you.

    ![Data table node with the data table selected and Map Automatically set](.gitbook/assets/build-your-first-workflow-optional-05-05.png)

6. Rename the node to `Save weather log`.

### 6. Test and publish the workflow

Your workflow is complete. Test it, then publish it so it runs every day at 8 AM.

1. Select **Execute** under the canvas to test it. You should see green check marks on all four nodes:

    ![Successful workflow run after execution](.gitbook/assets/build-your-first-workflow-optional-06-01.png)

2. Navigate to **Personal** > **Data tables** to see the new row.

3. Select **Publish** in the Canvas header and follow the prompts to publish the workflow.

    ![Publish the workflow](.gitbook/assets/build-your-first-workflow-optional-06-03.png)

## Next steps

- Take [courses at n8n Academy](https://go.n8n.io/gfzWgF).
- Explore more examples in [workflow templates](https://n8n.io/workflows/).

## Related resources

* [n8n Docs](./)
* [Choose how to use n8n](choose-how-to-use-n8n.md)
* [Use n8n Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/n8n-assistant)
* [Learning paths](learning-paths.md)
* [Key concept glossary](key-concept-glossary.md)
