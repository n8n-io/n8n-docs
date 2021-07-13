# 7. Scheduling the workflow
> In this step of the workflow, you will learn how to schedule your workflow, so that it runs automatically at a set time/interval, using the *Cron node*.


The workflow you’ve built so far executes only when you click on _Execute Workflow_. But Nathan needs it to run automatically every Monday morning. You can do this with the ***Cron node***, which allows you to schedule workflows to run periodically at fixed dates, times, or intervals.

In your workflow, replace the *Start node* with the *Cron node* and configure its parameters:
* _Mode:_ Every Week
* _Hour:_ 9
* _Minute:_ 0
* _Weekday:_ Monday

<figure><img src="../images/chapter-two/Cron-node.png" alt="Cron node" style="width:100%"><figcaption align = "center"><i>Cron node</i></figcaption></figure>

----
> **You 👩‍🔧**: That was it for the workflow! I've added and configured all necessary nodes. Now every time you click on Execute Workflow, all nodes will be executed: getting, filtering, calculating, and transferring the sales data.
>
> **Nathan 🙋**: This is just what I needed! So now my workflow will run automatically every Monday morning?
>
> **You 👩‍🔧**: Not so fast. To do that, you need to activate your workflow. I'll do this in the next step and show you how to interpret the execution log.
