# Mini-workflow

Now it’s time to apply what you learned by building your first workflow!

A simple, yet useful automation is getting articles from Hacker News, so that you’re up to date with the tech world. More specifically, let’s say you want to get the latest 10 articles related to automation.

You can build a workflow for this use case in 4 steps:

[[toc]]

## 1. Add the *Hacker News* node

Open the nodes panel, search for the *Hacker News* node, and click on it to add it to the Editor UI. The *Hacker News node* will automatically be connected to the *Start node*.

## 2. Configure the **Hacker News** node

When you add a new node to the Editor UI, the node will be automatically activated and open a window with two tabs on the left side: ***Parameters*** and ***Settings***.

::: tip 📖 Parameters vs Settings
*Parameters* are different for each node, depending on its functionality. *Settings* are largely the same for all nodes.
:::

**Parameters**

The *HackerNew node* has several parameters that need to be configured in order to make it work:

<figure><img src="./images/chapter-one/Hacker-news-node.png" alt="Hacker News node" style="width:100%"><figcaption align = "center"><i>Hacker News node</i></figcaption></figure>

- *Resource:* All <br/>
This resource selects all data records (articles).
- *Operation:* Get All <br/>
This operation fetches all the selected articles.
- *Limit:* 10 <br/>
This parameter sets a limit to how many results are returned by the Get All  operation.
- *Additional fields > Add Field > Keyword:* automation <br/>
Additional fields are options that you can add to certain nodes to make your request more specific or filter the results. In our case, we want to get only articles that include the keyword “automation”. <br/>

The configuration of the parameters for the *Hacker News node* should now look like this:

<figure><img src="./images/chapter-one/Hacker-news-params.png" alt="Hacker News node parameters" style="width:100%"><figcaption align = "center"><i>Hacker News node parameters</i></figcaption></figure>

**Settings**

The *Settings* part includes several options for node design and executions. In this case, we’ll configure only the first two settings, which are about the node’s appearance in the Editor UI. In the *Hacker News node* settings, edit:

- *Notes:* Get the 10 latest articles  
::: tip 💡 Node notes
It is often helpful, especially for complex workflows or if you share them with other users, to add a short description in the node about what it does.
:::
- *Display note in flow?:* toggle to true  
This option will display the description note under the node in the Editor UI.

The configuration of the settings for the *Hacker News node* looks like this:

<figure><img src="./images/chapter-one/Hacker-news-settings.png" alt="Hacker News node renaming" style="width:100%"><figcaption align = "center"><i>Hacker News node renaming</i></figcaption></figure>


::: tip 💡 Renaming a node
You can rename the node with a name that’s more descriptive for your use case. There are two ways to do this:
- Double-click on the node you want to rename, which will open the node window. Click on the name of the node in the top left corner of the window, rename it as you like, then click on the ✔ symbol to save the node under the new name.

<figure><img src="./images/chapter-one/Renaming-node.gif" alt="Renaming a node from the window" style="width:100%"><figcaption align = "center"><i>Renaming a node from the window</i></figcaption></figure>

- Select the node you want to rename and at the same time press the F2 key on your keyboard.

<figure><img src="./images/chapter-one/Renaming-node-keyboard.png" alt="Renaming a node from the keyboard" style="width:100%"><figcaption align = "center"><i>Renaming a node from the keyboard</i></figcaption></figure>
:::

## 3. Save the workflow

Save the workflow under the name “Hacker News workflow”
By default, your workflow is automatically saved as “My workflow”.

There are two ways in which you can save a workflow:
- Click **Ctrl + S** or **Cmd + S** on your keyboard
- Click the **Save** button in the top right corner of the Editor UI

## 4. Execute the node

Now, click on the *Execute Node* button in the top right corner of the node window. You should see 10 results in *Table* view.

<figure><img src="./images/chapter-one/Hacker-news-table.png" alt="Results in Table view for the Hacker News node" style="width:100%"><figcaption align = "center"><i>Results in Table view for the Hacker News node</i></figcaption></figure>

To consolidate what you've learned so far, have a closer look at the *JSON view* and information about the node's execution, like you learned in the [previous lesson](./chapter-1-components.md#node-executions).

----

Congratulations, you just built your first workflow! Now that you know the basic concepts and components of n8n, you can start adding more nodes to the canvas and create more powerful workflows.

In the next chapter, you will be introduced to our friend Nathan, who works as an Analytics Manager at EvilCorp. His job is to crunch numbers from different sources and send reports to his team. As you might have guessed, his tasks involve a good deal of manual work that thankfully can be automated – that’s where he needs your help as an Automation Expert! You will build a more complex workflow for Nathan’s use case, helping him become more productive at work.
