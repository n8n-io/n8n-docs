# Data pinning

n8n allows you to 'pin' data during workflow development. Data pinning means saving the output data of a node, and using the saved data instead of fetching fresh data in future workflow executions. This isn't available for active workflows. It's a feature to help test workflows during development.

You can use this when working with data from external sources, to avoid having to repeatedly use the external system. This can save time and resources:

* If your workflow relies on an external system to trigger it, such as a webhook call, being able to pin data means you don't need to use the external system every time you test the workflow.
* If the external resource has data or usage limits, pinning data during tests avoids consuming your resource limits.
* You can fetch and pin the data you want to test, then have confidence that the data is consistent in all your workflow tests.


## Pin data

To pin data in a node:

1. Run the node to load data.
2. In the **OUTPUT** view, select **Pin data** <span class="inline-image">![Pin data icon](/_images/data/data-pinning/data-pinning-button.png)</span>. When data pinning is active, the button changes to show this <span class="inline-image">![Active pin data icon](/_images/data/data-pinning/data-pinning-button-active.png)</span>.

!!! note "Nodes that output binary data"
    You can't pin data if the output data includes binary data.


## Unpin data

When data pinning is active, the button changes to show this <span class="inline-image">![Active pin data icon](/_images/data/data-pinning/data-pinning-button-active.png)</span>. To unpin data and fetch fresh data on the next execution, select the active **Pin data** <span class="inline-image">![Active pin data icon](/_images/data/data-pinning/data-pinning-button-active.png)</span> icon.

## Edit output data

You can edit the output data of a node. This allows you to check different scenarios without setting up each scenario and sending the relevant data from your external system.

To edit output data:

1. Run the node to load data.
2. In the **OUTPUT** view, select **JSON** to switch to JSON view.
3. Select **Edit** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png)</span>.
4. Edit your data.
5. Select **Save**. n8n saves your data changes and pins your data.


## Use data from previous executions

You can copy data from nodes in previous workflow executions:

1. Open the left menu.
2. Select **Executions**.
3. Browse the workflow executions list to find the one with the data you want to copy.
4. Select **Open Past Execution** <span class="inline-image">![Open past execution icon](/_images/data/data-pinning/open-execution.png)</span>.
5. Double click the node whose data you want to copy.
6. If it's table layout, select **JSON** to switch to JSON view.
7. There are two ways to copy the JSON:
  1. Select the JSON you want by highlighting it, like selecting text. Then use `ctrl` + `c` to copy it.
  2. Select the JSON you want to copy by clicking on a parameter. Then:
    1. Hover over the JSON. n8n displays the **Copy** <span class="inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png)</span> button.
    2. Select **Copy** <span class="inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png)</span>.
    3. You can choose what to copy:
        * **Copy Item Path** and **Copy Parameter Path** gives you expressions that access parts of the JSON.
        * **Copy Value**: copies the entire selected JSON. This is usually what you want when copying data from past executions.
8. Return to the workflow you're currently working on:  
    1. Open the left menu.
    2. Select **Workflows**.
    3. Select **Open**.
    4. Select the workflow you want to open.
9. Open the node where you want to use the copied data.
10. If there is no data, run the node to load data.
11. In the **OUTPUT** view, select **JSON** to switch to JSON view. 
12. Select **Edit** <span class="inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png)</span>.
15. Paste in the data from the previous execution.
16. Select **Save**. n8n saves your data changes and pins your data.
