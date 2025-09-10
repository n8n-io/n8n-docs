---
contentType: howto
---

# Data editing

n8n allows you to edit [pinned data](/data/data-pinning.md). This means you can check different scenarios without setting up each scenario and sending the relevant data from your external system. It makes it easier to test edge cases.

/// note | For development only
Data editing isn't available for production workflow executions. It's a feature to help test workflows during development.
///
## Edit output data

To edit output data:

1. Run the node to load data.
2. In the **OUTPUT** view, select **JSON** to switch to JSON view.
3. Select **Edit** <span class="n8n-inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span>.
4. Edit your data.
5. Select **Save**. n8n saves your data changes and pins your data.

## Use data from previous executions

You can copy data from nodes in previous workflow executions:

1. Open the left menu.
2. Select **Executions**.
3. Browse the workflow executions list to find the one with the data you want to copy.
4. Select **Open Past Execution** <span class="n8n-inline-image">![Open past execution icon](/_images/data/data-pinning/open-execution.png){.off-glb}</span>.
5. Double click the node whose data you want to copy.
6. If it's table layout, select **JSON** to switch to JSON view.
7. There are two ways to copy the JSON:
  1. Select the JSON you want by highlighting it, like selecting text. Then use `ctrl` + `c` to copy it.
  2. Select the JSON you want to copy by clicking on a parameter. Then:
    1. Hover over the JSON. n8n displays the **Copy** <span class="n8n-inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png){.off-glb}</span> button.
    2. Select **Copy** <span class="n8n-inline-image">![Copy data icon](/_images/data/data-pinning/copy-data.png){.off-glb}</span>.
    3. You can choose what to copy:
        * **Copy Item Path** and **Copy Parameter Path** gives you expressions that access parts of the JSON.
        * **Copy Value**: copies the entire selected JSON.
8. Return to the workflow you're working on:  
    1. Open the left menu.
    2. Select **Workflows**.
    3. Select **Open**.
    4. Select the workflow you want to open.
9. Open the node where you want to use the copied data.
10. If there is no data, run the node to load data.
11. In the **OUTPUT** view, select **JSON** to switch to JSON view. 
12. Select **Edit** <span class="n8n-inline-image">![Edit data icon](/_images/data/data-pinning/edit-data.png){.off-glb}</span>.
15. Paste in the data from the previous execution.
16. Select **Save**. n8n saves your data changes and pins your data.
