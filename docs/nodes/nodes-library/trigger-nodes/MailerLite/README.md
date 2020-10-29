---
permalink: /nodes/n8n-nodes-base.mailerLiteTrigger
description: Learn how to use the MailerLite Trigger node in n8n
---

# MailerLite Trigger

[MailerLite](https://www.mailerlite.com/) is an email marketing solution for all types of businesses. It provides you with a user-friendly content editor, simplified subscriber management, and campaign reports with the most important statistics.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/MailerLite/README.md).
:::

## Example Usage

This workflow allows you to receive updates when a form is submitted in MailerLite using the MailerLite Trigger node and send an SMS confirmation to the submitter. You can also find the [workflow](https://n8n.io/workflows/721) on n8n.io. This example usage workflow would use the following node.
- [MailerLite Trigger]()
- [Twilio](../../nodes/Twilio/README.md)

The final workflow should look like the following image.

![A workflow with the MailerLite Trigger node](./workflow.png)

### 1. MailerLite Trigger node

The MailerLite Trigger node will trigger the workflow when a MailerLite form is submitted.

1. First of all, you'll have to enter credentials for the MailerLite Trigger node. You can find out how to do that [here](../../../credentials/MailerLite/README.md).
2. Select 'Form Submit Event' from the ***Events*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns the data that was submitted to the MailerLite form. This output is passed on to the next nodes in the workflow.

![Using the MailerLite Trigger node to trigger the workflow](./MailerLiteTrigger_node.png)

### 2. Twilio node (send: sms)

This node sends a registration confirmation SMS to the users who filled out the MailerLite form. We get the phone number of the submitter from the previous node.

1. First of all, you'll have to enter credentials for the Twilio node. You can find out how to do that [here](../../../credentials/Twilio/README.md).
::: v-pre
3. Enter the Twilio phone number in the ***From*** field.
4. Click on the gears icon next to the ***To*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > MailerLite Trigger > Output Data > JSON > MailerLite.form_on_submit > [item: 0] > submission > results > phone_number. You can also add the following expression: `{{$node["MailerLite Trigger"].json["MailerLite.form_on_submit"][0]["submission"]["results"]["phone_number"]}}`.
6. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.
7. Enter the following message in the ***Expression*** field.
```
Hey, {{$node["MailerLite Trigger"].json["MailerLite.form_on_submit"][0]["submission"]["results"]["first_name"]}} 👋
Thank you for signing up for the Webinar - Getting Started with n8n. The webinar will start at 1800 CEST on 31st October 2020.
See you there!
``` 
8. Click on ***Execute Node*** to run the node.
:::

In the screenshot below, you will notice that the node sends an SMS to the submitter whose name and phone number are returned by the MailerLite Trigger node.

![Using the Twilio node to send an SMS](./Twilio_node.png)
