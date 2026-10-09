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

In this quick start, you’ll build a workflow that fetches the weather for Berlin every morning and turns it into a short report anyone can read at a glance, then saves it to a data table so you build up a weather log over time.

![The finished Weather Log workflow: Every day at 8am, Get Berlin Weather, Format Weather Message, and Save Weather Report, connected in a row](.gitbook/assets/build-your-first-workflow.png)

When it runs, your workflow produces a report like this:

```
The temperature in berlin is 7.4°C. It's currently overcast.
```

The build takes about 15 minutes. You don’t need any accounts, API keys or coding experience. The weather data comes from Mockingbird, a sample-data service n8n provides for tutorials, so you’ll get similar results to this guide.

### Before you start

You need an n8n instance. Either:

- **n8n Cloud**: [sign up for a free trial](https://go.n8n.io/ekXKXJ), or
- **Self-hosted**: follow the [host n8n](https://go.n8n.io/caqo7e) guide

### Step 1 - Create the workflow

Log in to your n8n instance, then:

1. Click **Personal** in the left-hand sidebar. This is where your workflows live.

    ![Personal selected in the left-hand sidebar](.gitbook/assets/build-your-first-workflow-create-workflow-01.png)

2. Click **Create workflow** at the top right. This opens the canvas, where you’ll build your workflow and spend most of this tutorial.

    ![Create workflow button at the top right of the Personal page](.gitbook/assets/build-your-first-workflow-create-workflow-02.png)

3. Click the workflow’s name and change it to `Weather Log`. Click anywhere on the canvas to save the name.

    [Video: rename the workflow to Weather Log](.gitbook/assets/build-your-first-workflow-create-workflow-03.mp4)


### Step 2 - Run it at 8am every day

You’ll use: **Schedule Trigger**

When building a workflow, the first question to answer is: “How do I want my workflow to start?”. On a schedule e.g. 8am every day? When a user submits a form? When an application like Telegram sends a message? There are so many choices.

For this first build, you’ll set this to run at 8am every day. While you build, you’ll run the workflow yourself to test it. Once you publish it at the end, the schedule runs it for you:

1. Click **Add first step…** and select **On a schedule**.

    ![On a schedule option after selecting Add first step](.gitbook/assets/build-your-first-workflow-schedule-01.png)

2. Select `8am` from the **Trigger at Hour** field in the window that appears, then click the **x** at the top right of the window to return to the canvas.

    ![Schedule Trigger with Trigger at Hour set to 8am](.gitbook/assets/build-your-first-workflow-schedule-02.png)

3. Rename the trigger to `Every day at 8am`  by clicking on **Schedule Trigger** at the top left. Close the window to return to the canvas

    ![Schedule Trigger renamed to Every day at 8am](.gitbook/assets/build-your-first-workflow-schedule-03.png)


### Step 3 - Get the weather for Berlin

You’ll use: **HTTP Request**

You’ve got your trigger, so it’s time to fetch the weather. The **HTTP Request** node sends a request to a web address, called an endpoint, and returns the data that address provides. A service that shares data this way is called an API.

1. Click the **+** icon after the trigger, type `http` in the **Search nodes** box and select **HTTP Request**.

    ![HTTP Request node in the node search results for http](.gitbook/assets/build-your-first-workflow-get-weather-01.png)

2. Paste `https://mockingbird.n8n.io/v1/weather/berlin` into the URL field of the HTTP Request window that opens:

    ![HTTP Request node with the Mockingbird Berlin weather URL in the URL field](.gitbook/assets/build-your-first-workflow-get-weather-02.png)

3. Rename the node to `Get Berlin Weather` by clicking on its name in the top left, then press **Execute step**. You should see the weather for Berlin in the output, including the `city`, `temp_c` and `condition` fields you’ll use in the next step:

    ![Get Berlin Weather output showing the city, temp_c, and condition fields](.gitbook/assets/build-your-first-workflow-get-weather-03.png)


### Step 4 - Turn the weather into a report

You’ll use: **Edit Fields (Set)**

Next, you’ll turn the weather data into a short report that anyone can read at a glance.

1. Click **+** after **Get Berlin Weather**, select **Data transformation**, then select **Edit Fields (Set)**.

    ![Edit Fields (Set) under Data transformation in the node list](.gitbook/assets/build-your-first-workflow-report-01.png)

2. Click **Add Field** in the window that opens (it’s in the middle of the window). For **Name**, enter `report`.
3. For **Value**, enter `The temperature in` and then drag over `city` from the **Input** panel on the left. This panel shows the output from **Get Berlin Weather**, which becomes the input to this node. When you drop a field in, n8n switches the **Value** field to **Expression** mode. You’ll see you have:

    ```
    The temperature in {{ $json.city }}
    ```

    [Video: drag the city field into the report Value field](.gitbook/assets/build-your-first-workflow-report-02.mp4)

    > **Note:** `{{ $json.city }}` is a placeholder, called an expression. When the workflow runs, n8n swaps it for the real value. You drag fields in rather than typing them, and the preview under the field shows you the finished sentence. To learn more, see [Expressions](https://docs.n8n.io/build/work-with-data/expressions-versus-data-nodes#expressions) in the docs.
    >
4. Drag over `temp_c` and update the wording to be:

    ```
    The temperature in {{ $json.city }} is {{ $json.temp_c }}°C.
    ```

    ![report Value field with the city and temp_c expressions](.gitbook/assets/build-your-first-workflow-report-03.png)

    Add `It’s currently`  to the end before dragging over `condition` :

    ```
    The temperature in {{ $json.city }} is {{ $json.temp_c }}°C. It's currently {{ $json.condition }}.
    ```

    ![report Value field with the city, temp_c, and condition expressions](.gitbook/assets/build-your-first-workflow-report-04.png)

5. Rename the node to `Format Weather Message` and press **Execute step**. You should see output similar to:

    ```
    The temperature in berlin is 7.4°C. It's currently overcast.
    ```

    ![Format Weather Message output showing the finished weather report](.gitbook/assets/build-your-first-workflow-report-05.png)


### Step 5 - Save the data

You’ll use: **Data table**

You’ve fetched the data and formatted it, so now it’s time to store it. For this, you’ll use n8n’s [Data Table](https://docs.n8n.io/build/work-with-data/data-tables) feature.

1. Click **Personal** and then click on **Data tables**

    ![Data tables tab on the Personal page](.gitbook/assets/build-your-first-workflow-save-data-01.png)

2. Click **Create data table**, name it `weather_data`, and press **Create**

    ![Create data table dialog with the name weather_data](.gitbook/assets/build-your-first-workflow-save-data-02.png)

3. Click **Add Column** and for **Name** enter `report` and then click **Add Column** again. This gives you a column to store the weather report in

    ![weather_data table with a report column added](.gitbook/assets/build-your-first-workflow-save-data-03.png)

4. Open up your **Weather Log** workflow (**Personal → Weather Log)** and add a **Data table** node to the workflow, selecting **Insert row** as the action

    ![Data table node with Insert row selected as the action](.gitbook/assets/build-your-first-workflow-save-data-04.png)

5. Select `weather_data` from the **Data table** dropdown list and change **Mapping Column Mode** to be `Map Automatically`. The **report** field from **Format Weather Message** has the same name as the column in the data table so n8n can map them on your behalf. Rename the node to be `Save Weather Report`

    ![Save Weather Report node with weather_data selected and Map Automatically set](.gitbook/assets/build-your-first-workflow-save-data-05.png)


### Step 6 - Test and turn it on

Your workflow is built. Let’s test it and then publish it, so it will run on the daily schedule.

1. Click `Execute workflow` to test that it works and check in the data table to see that a row was inserted:

    ![Weather Log workflow after a successful run with Execute workflow](.gitbook/assets/build-your-first-workflow-test-and-publish-01.png)

    ![weather_data table with one row containing the weather report](.gitbook/assets/build-your-first-workflow-test-and-publish-02.png)

2. Click the **Publish** button in the workflow and follow the steps in the prompts in order to ensure it’s scheduled

    ![Publish button in the canvas header](.gitbook/assets/build-your-first-workflow-test-and-publish-03.png)


**Congratulations! Your workflow now runs at 8am every day.**

### What you learned

You’ve built a working workflow, and along the way you’ve learned how to:

- **Start a workflow with a trigger.** Yours runs on a schedule. [Triggers, link TBC]
- **Add and connect nodes.** Each node does one job and passes its result to the next. [Nodes, link TBC]
- **Fetch data from an API.** You used the HTTP Request node to get weather data from a web address. [HTTP Request, link TBC]
- **Work with data between nodes.** The output of one node becomes the input of the next. [Data structure, link TBC]
- **Use expressions.** Dragging fields in builds an expression for you, so you can use live data without writing code. [Expressions, link TBC]
- **Store data.** Each run saves a new row to your data table, so your reports are kept after the workflow finishes. [Data tables](https://docs.n8n.io/build/work-with-data/data-tables)

### Optional: Build with the n8n Assistant

The n8n Assistant is an alternative way to build workflows using prompts. Having already built the **Weather Log**, you’ll be able to understand what the Assistant has created.

> **Note:** n8n Assistant is in Preview. Check the [Use n8n Assistant](https://go.n8n.io/ZzxXro) page for more information on availability.
>
1. Open **Weather Log**, click the **...** menu at the top right and select **Unpublish**. Otherwise both workflows run at 8am and save two reports to `weather_data` every day.
2. Click n8n Assistant:

    ![n8n Assistant in the left-hand sidebar](.gitbook/assets/build-your-first-workflow-assistant-01.png)

3. Prompt the assistant with:

    ```
    Every day at 8am:
    - Get the weather for Berlin from https://mockingbird.n8n.io/v1/weather/berlin
    - Add a report field that contains the city, temperature and the conditions
    - Save the report to a data table called weather_data
    ```

    ![n8n Assistant with the Weather Log prompt entered](.gitbook/assets/build-your-first-workflow-assistant-02.png)

    > **Note:** If you built the **Weather Log** workflow yourself, the n8n Assistant will detect it. Ask the n8n Assistant to “build a fresh, separate copy”.
    >
4. Approve each step when the Assistant asks, until it completes, and you should see output similar to:

    ![n8n Assistant summary next to the Weather Log (copy) workflow it built](.gitbook/assets/build-your-first-workflow-assistant-03.png)

5. Click **Execute workflow** and check the data table to see an additional row has been inserted:

    ![Weather Log (copy) workflow after a successful run with Execute workflow](.gitbook/assets/build-your-first-workflow-assistant-04.png)

    ![weather_data table with an additional row from the n8n Assistant workflow](.gitbook/assets/build-your-first-workflow-assistant-05.png)


### Next steps

The workflow you built reports the weather, but it can’t tell you what to do about it. “7.4°C and overcast” doesn’t say whether you need a coat, or an umbrella, and writing a rule for every possible combination wouldn’t be practical.

This is what agents are for. In [Build your first agent, link TBC], you’ll add an agent that decides what the weather means for your day.

## Related resources

* [n8n Docs](./)
* [Choose how to use n8n](choose-how-to-use-n8n.md)
* [Learning paths](learning-paths.md)
* [Key concept glossary](key-concept-glossary.md)
