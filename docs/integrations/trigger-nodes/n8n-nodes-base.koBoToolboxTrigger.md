# KoBo Toolbox trigger

[KoBo toolbox](https://www.kobotoolbox.org/) is a field survey and data collection tool that makes it easy to design interactive forms to be completed offline from mobile devices. It is available both as a free cloud solution or as a self-hosted version.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/kobotoolbox/).

This node starts a workflow upon new submissions of a specified form. The trigger node handles the creation/deletion of the hook, so you don't need to do any setup in KoBo Toolbox.

It works the same way as the Get Submission operation in the [KoBoToolbox](/integrations/nodes/n8n-nodes-base.koBoToolbox/) node, including supporting the same reformatting options.