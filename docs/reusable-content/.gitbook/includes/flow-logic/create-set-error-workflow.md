---
title: create-set-error-workflow
---
1. Create a new workflow, with the Error Trigger as the first node. 
2. Give the workflow a name, for example `Error Handler`. 
3. Select **Save**.
4. In the workflow where you want to use this error workflow:
	1. Select **Options** <img src="../../assets/three-dot-options-menu.png" alt="Options menu icon" data-size="line"> > **Settings**.
	2. In **Error workflow**, select the workflow you just created. For example, if you used the name Error Handler, select **Error handler**.
	3. Select **Save**.
	Now, when this workflow errors, the related error workflow runs.
