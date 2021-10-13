# 8. Activating and Examining the Workflow

In this step of the workflow you will learn how to activate your workflow and change the default workflow settings.

Activating a workflow means that it will run automatically every time a trigger node receives input or meets a condition. By default, all newly created workflows are deactivated.

To activate your workflow toggle the *Active* button on the top right corner of the Editor UI. Nathan’s workflow will now be executed automatically every Monday at 9 am.

<figure><img src="../images/chapter-two/Activated-workflow.png" alt="Activated workflow" style="width:100%"><figcaption align = "center"><i>Activated workflow</i></figcaption></figure>

**Workflow Executions**

An execution represents a completed run of a workflow, from the first to the last node. n8n logs workflow executions allowing you to see if the workflow was completed successfully or not. The execution log is really useful for debugging your workflow and seeing at what stage it runs into issues.

To see the execution log click on the icon with three lines in the left panel, which will open the *Workflow Executions* window.

<figure><img src="../images/chapter-two/Execution-list.png" alt="Workflow Execution List" style="width:100%"><figcaption align = "center"><i>Workflow Execution List</i></figcaption></figure>

::: tip 💡 Workflow execution status
In the *Workflow Executions* window you can filter the displayed executions by workflow and by status (*All*, *Error*, *Running*, or *Success*).
:::

The *Workflow Executions* window displays a table with the following information:

* _Started At / ID:_ The date and time when the workflow started, followed by the ID of this workflow execution
* _Name:_ The name of the workflow
* _Status:_ The status of the workflow (Error, Running, or Success)
* _Mode:_ How the workflow was triggered (trigger or webhook)
* _Running Time:_ The duration it took the workflow to execute

**Workflow Settings**

If you need to customize your workflows and executions, or overwrite some of the global default settings, you can do this in *Workflow Settings*. To access them click on *Workflow Settings* under the *Workflows* section in the left panel.

<figure><img src="../images/chapter-two/Workflow-setting.png" alt="Workflow Setting" style="width:100%"><figcaption align = "center"><i>Workflow Setting</i></figcaption></figure>

In the *Workflow Settings* window you can configure six settings:

* _[Error Workflow](../../../getting-started/key-concepts/README.md#error-workflow):_ A workflow to run in case the execution of the current workflow fails.
* _Timezone:_ The timezone to use in the current workflow. If not set, the global Timezone (by default "New York") is used. This setting is particularly important for the Cron node, as you want to make sure that the workflow gets executed at the right time.
* _Save Data Error Execution:_ If the Execution data of the workflow should be saved when it fails.
* _Save Data Success Execution:_ If the Execution data of the workflow should be saved when it succeeds.
* _Save Manual Executions:_ If executions started from the Editor UI should be saved.
* _Save Execution Progress:_ If the execution data of each node should be saved. If Yes, you can resume the workflow from where it stopped in case of an error, though keep in mind that this might make the execution slower.

## What's next?

**You 👩‍🔧**: That was it! Now you have a 7-node workflow that will run automatically every Monday morning. You don't have to worry about remembering to wrangle the data. Instead, you can start your week with more meaningful or exciting work.

**Nathan 🙋**: This workflow is incredibly helpful, thank you! Now, what's next for you?

**You 👩‍🔧**: I'd like to build more workflows, share them with others, and use some workflows built by other people.
