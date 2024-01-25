---
contentType: tutorial
---

# Building a Mini-workflow

In this lesson, you will build a small workflow that gets 10 articles about automation from Hacker News. The workflow consists of four steps:

[1. Add the Hacker News node](#1-add-the-hacker-news-node)<br/>
[2. Configure the Hacker News node](#2-configure-the-hacker-news-node)<br/>
[3. Save the workflow](#3-save-the-workflow)<br/>
[4. Execute the node](#4-execute-the-node)<br/>

## 1. Add the Hacker News node

Open the nodes panel, search for the *Hacker News* node, and click on it to add it to the Editor UI. Connect the *Hacker News node* to the *Manual Trigger node*.

## 2. Configure the Hacker News node

When you add a new node to the Editor UI, the node will be automatically activated and open a window with two tabs on the left side: ***Parameters*** and ***Settings***.

/// note | Parameters vs Settings
*Parameters* are different for each node, depending on its functionality.<br />
*Settings* are the same for all nodes.
///


### Parameters

The *Hacker News node* has several parameters that need to be configured in order to make it work:

- *Resource:* All <br/>
This resource selects all data records (articles).
- *Operation:* Get Many <br/>
This operation fetches all the selected articles.
- *Limit:* 10 <br/>
This parameter sets a limit to how many results are returned by the Get Many operation.
- *Additional fields > Add Field > Keyword:* automation <br/>
Additional fields are options that you can add to certain nodes to make your request more specific or filter the results. In our case, we want to get only articles that include the keyword “automation.” <br/>

The configuration of the parameters for the *Hacker News node* should now look like this:

<figure><img src="/_images/courses/level-one/chapter-two/l1-c-2-hacker-news-node-parameters.png" alt="Hacker News node parameters" style="width:100%"><figcaption align = "center"><i>Hacker News node parameters</i></figcaption></figure>

### Settings

The *Settings* section includes several options for node design and executions. In this case, we'll configure only the first two settings, which set the node's appearance in the Editor UI. In the *Hacker News node* settings, edit:

- *Notes:* Get the 10 latest articles
/// note | Node notes
It's often helpful, especially for complex or shared workflows, to add a short description in the node about what it does.
///
- *Display note in flow?:* toggle to true<br/>
This option will display the description note under the node in the Editor UI.

The configuration of the settings for the *Hacker News node* looks like this:

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-hacker-news-node-setting-configuration.png" alt="Hacker News node renaming" style="width:100%"><figcaption align = "center"><i>Hacker News node renaming</i></figcaption></figure>


/// note | Renaming a node
You can rename the node with a name that's more descriptive for your use case. There are two ways to do this:

- Select the node you want to rename and at the same time press the F2 key on your keyboard.
- Double-click on the node to open the node window. Click on the name of the node in the top left corner of the window, rename it as you like, then click *Rename* to save the node under the new name.

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-renaming-a-node-from-the-keyboard.png" alt="Renaming a node" style="width:100%"><figcaption align = "center"><i>Renaming a node from the keyboard</i></figcaption></figure>
///


## 3. Save the workflow

Save the workflow under the name “Hacker News workflow”
By default, your workflow is automatically saved as “My workflow.”

There are two ways in which you can save a workflow:

- From the Canvas in Editor UI, click **Ctrl + S** or **Cmd + S** on your keyboard
- Click the **Save** button in the top right corner of the Editor UI. You may need to leave the node editor first by clicking outside the dialog.

## 4. Execute the node

Click on the *Execute Node* button in the top right corner of the node window. You should see 10 results in *Table* view.

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-results-in-table-view-for-the-hacker-news-node.png" alt="Results in Table view for the Hacker News node" style="width:100%"><figcaption align = "center"><i>Results in Table view for the Hacker News node</i></figcaption></figure>

## Node executions

/// note | Node execution
A node execution represents a run of that node to retrieve the specified data.
///

If a node is executed successfully a small green checkmark appear on top of the node.

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-successfully-executed-workflow.png" alt="Successfully executed workflow" style="width:100%"><figcaption align = "center"><i>Successfully executed workflow</i></figcaption></figure>

If the parameters are configured correctly and everything works fine, the requested data will be displayed in the node window in *Table*, *JSON* and *Schema* format. You can switch between these views by selecting the one you want from the *JSON|Table|Schema* button at the top of the node window.

/// note | Table vs JSON views
The *Table* view is the default. It displays the requested data in a table, where the rows are the records and the columns are the available attributes of those records.
///

<figure><img src="/_images/courses/level-one/chapter-two/l1-c2-results-in-json-view-for-the-hacker-news-node.png" alt="Results in JSON view for the Hacker News node" style="width:100%"><figcaption align = "center"><i>Results in JSON view for the Hacker News node</i></figcaption></figure>

The node window displays more information about the node execution:

- In the top left corner of the output window, you'll notice another piece of information: **10 items**.
This field displays the number of items (records) that are returned by the node request. In our case, it's expected to be 10, since this is the limit we set in the node. But if you don't set a limit, it's useful to see how many records are actually returned.
- Next to the *Items* information, notice a small grey *i* icon. If you hover on it, you'll get two more pieces of information: ***Start Time*** (when the node execution started) and ***Execution Time*** (how long it took for the node to return the results from the moment it started executing).
*Start Time* and *Execution Time* can provide insights into the performance of each individual node.
- Under the node name beside the **Parameters** tab, there is a link to the node's **Docs**. Check it out if you run into trouble or aren't sure how to configure the node's parameters.


/// warning | Error in nodes
A red warning icon on a node means that the node has errors. This might happen if the node credentials are missing or incorrect, or the node parameters aren't configured correctly.
///
<figure style="text-align:center;"><img src="/_images/courses/level-one/chapter-one/error-node.png" alt="Error in nodes" style="width:30%" align="center"><figcaption align = "center"><i>Error in nodes</i></figcaption></figure>


## Summary

Congratulations, you just built your first workflow! In this lesson, you learned how to use actions in app nodes, configure their parameters and settings, and save and execute your workflow.

In the next lesson you will be introduced to your client, Nathan, who needs to automate his sales reporting work. You will build a more complex workflow for his use case, helping him become more productive at work.
