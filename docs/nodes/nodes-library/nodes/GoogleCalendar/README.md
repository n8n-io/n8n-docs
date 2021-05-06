---
permalink: /nodes/n8n-nodes-base.googleCalendar
description: Learn how to use the Google Calendar node in n8n
---

# Google Calendar

[Google Calendar](https://www.google.com/calendar/) is a time-management and scheduling calendar service developed by Google.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.googleCalendar" />

## Example Usage

This workflow allows you to add an event to Google Calendar. You can also find the [workflow](https://n8n.io/workflows/427) on the website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Calendar]()

The final workflow should look like the following image.

![A workflow with the Google Calendar node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Calendar node

1. First of all, you'll have to enter credentials for the Google Calendar node. You can find out how to do that [here](../../../credentials/Google/README.md).
2. Select the *Calendar* from the dropdown list of the user's calendar list.
3. Enter the start date of your event in the *Start* field.
4. Enter the end date of your event in the *End* field.
5. Click on *Execute Node* to run the workflow.

## Further Reading

- [How to host virtual coffee breaks with n8n ☕️](https://n8n.io/blog/how-to-host-virtual-coffee-breaks-with-n8n/)
- [Supercharging your conference registration process with n8n 🎫](https://medium.com/n8n-io/supercharging-your-conference-registration-process-with-n8n-2831cdff37f9)
- [Tracking Time Spent in Meetings With Google Calendar, Twilio, and n8n 🗓](https://medium.com/n8n-io/tracking-time-spent-in-meetings-with-google-calendar-twilio-and-n8n-a5d00f77da8c)
