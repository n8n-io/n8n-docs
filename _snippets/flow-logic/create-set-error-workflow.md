1. Create a new workflow, with the Error Trigger as the first node. 
2. Give the workflow a name, for example `Error Handler`. 
3. Select **Save**.
4. In the workflow where you want to use this error workflow:
	1. Select **Options** <span class="n8n-inline-image">![Options menu icon](/_images/common-icons/three-dot-options-menu.png){.off-glb}</span> > **Settings**.
	2. In **Error workflow**, select the workflow you just created. For example, if you used the name Error Handler, select **Error handler**.
	3. Select **Save**.
	Now, when this workflow errors, the related error workflow runs.
