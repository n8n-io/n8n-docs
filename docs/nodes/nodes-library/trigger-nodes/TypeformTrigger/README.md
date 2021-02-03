---
permalink: /nodes/n8n-nodes-base.typeformTrigger
description: Learn how to use the Typeform Trigger node in n8n
---

# Typeform Trigger

[Typeform](https://www.typeform.com/) is an online software as a service company that specializes in online form building and online surveys. Its main software creates dynamic forms based on user needs.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Typeform/README.md).
:::


## Example Usage

This workflow allows you to store the response of a form submission to Airtable and send a message to a channel on Slack. You can also find the [workflow](https://n8n.io/workflows/916) on the website. This example usage workflow would use the following node.
- [Typeform Trigger]()
- [Set](../../core-nodes/Set/README.md)
- [Airtable](../../nodes/Airtable/README.md)
- [Slack](../../nodes/Slack/README.md)

The final workflow should look like the following image.

![A workflow with the Typeform Trigger node](./workflow.png)


### 1. Typeform Trigger node

This node will trigger the workflow when a form response is submitted.

This example workflow uses a Typeform to collect name and email address. Below are the questions and their question type used in the form.

|Question | Type  |
|---------|-------|
|Let's start with your name. | Short Text |
|What's your email address? | Email |

If you haven't, create a form exactly the same as this [form](https://n8ndocsburner.typeform.com/to/dpr2kxSL).


1. First of all, you'll have to enter credentials for the Typeform Trigger node. You can find out how to do that [here](../../../credentials/Typeform/README.md).
2. Select your form from the ***Form*** dropdown list.
3. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the Typeform Trigger node triggers the workflow and returns the response submitted by a user.

![Using the Typeform Trigger node to trigger the workflow](./TypeformTrigger_node.png)

### 2. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow. We will set the value of `Name` and `Email` in this node.
::: v-pre
1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > Let's start with your name.. You can also add the following expression: `{{$json["Let's start with your name."]}}`.
5. Click on ***Add Value*** and select 'String' from the dropdown list.
6. Enter `Email` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > What's your email address?. You can also add the following expression: `{{$json["What's your email address?"]}}`.
9. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
10. Click on ***Execute Node*** to run the node.
:::
In the screenshot below, you will notice that the node sets the values of `Name` and `Email`. These values are passed to the next node in the workflow.

![Using the Set node to set the values](./Set_node.png)

### 4. Airtable node (Append)

This node will append the data that we set in the previous node to a table. Create a table like [this](https://airtable.com/shreoj1AmTE6S6Eep) in your Airtable base.

1. First of all, you'll have to enter credentials for the Airtable node. You can find out how to do that [here](../../../credentials/Airtable/README.md).
2. Select 'Append' from the ***Operation*** dropdown list.
3. Enter the Base ID in the ***Base ID*** field. For obtaining the Base ID, head over to their [API page](https://airtable.com/api) and select the correct base. You’ll find the Base ID there.
4. Enter the name of your table in the ***Table*** field.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node appends the data that we had set in the previous node.

![Using the Airtable node to insert data into an Airtable table](./Airtable_node.png)

### 5. Slack node (post: message)

This node will send a message about the new form submission to a channel in a Slack workspace.

1. First of all, you'll have to enter credentials for the Slack node. You can find out how to do that [here](../../../credentials/Slack/README.md).
2. Enter the name of a channel in the ***Channel*** field.
3. Click on the gears icon next to the ***Text*** field and click on ***Add Expression***.
4. Enter the following text in the ***Expression Editor***
```
*New Submission* 🙌
Name: {{$node["Set"].json["Name"]}}
Email: {{$node["Set"].json["Email"]}}
```
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sends a message with the new form response on Slack.

![Using the Slack node to send a message to channel](./Slack_node.png)

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Typeform Trigger node.
:::

## Further Reading

- [Automating Conference Organization Processes with n8n](https://medium.com/n8n-io/automating-conference-organization-processes-with-n8n-ab8f64a7a520)
- [Building an expense tracking app in 10 minutes 📱](https://medium.com/n8n-io/building-an-expense-tracking-app-in-10-minutes-74b0cececc90)
- [Supercharging your conference registration process with n8n 🎫](https://medium.com/n8n-io/supercharging-your-conference-registration-process-with-n8n-2831cdff37f9)
