# Merging items

You can merge items together in your workflows. There are three main use cases for merging items:

* **Merge items of a single execution**: You can merge all incoming items into a single item using the Item Lists node. Please note that since you are merging different items into a single item the next node in the workflow will now process just that single item.
* **Merge items returned by different nodes**: If you want to merge items returned by different nodes, use the [Merge node](/integrations/builtin/core-nodes/n8n-nodes-base.merge/).
* **Merge items of different executions**: You can also merge items that get returned in different executions. Refer to this [workflow](https://n8n.io/workflows/1160) to learn how:
    ![Merge multiple executions](/_images/flow-logic/merging/multiple_merge.png)
