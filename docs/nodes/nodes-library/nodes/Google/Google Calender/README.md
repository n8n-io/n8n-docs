---
permalink: /nodes/n8n-nodes-base.googleCalender
---

# Google Calender

[Google Calender](https://www.google.com/calendar/) a time-management and scheduling calendar service developed by Google.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

- Event
    - Add an event to the calender
    - Delete an event
    - Get an event
	- Retrieve all the events
    - Update an event

## Example Usage

This workflow allows you to add an event to Google Calender. You can also find the [workflow](https://n8n.io/workflows/427) on the website. This example usage workflow uses the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Google Calender]()

The final workflow should look like the following image.

![A workflow with the Google Calender node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Calender node

1. First of all, you'll have to enter credentials for the Google Calender node. You can find out how to do that [here](../../../credentials/Google/README.md).
2. To add an event to the calender, select *Event* under the *Resource* field.
3. Select the *Create* option in the *Operation* field.
4. Select the *Calender* from the dropdown list of the user's calender list.
5. Enter the start date of your event in the *Start* field.
6. Enter the end date of your event in the *End* field.
7. Enable or disable *Use Default Reminder* field according to your needs.
8. If you want to enter optional fields such as the attendees or location, etc as JSON data, then add those JSON parameters under the *Additional fields* field.
9. Click on *Execute Node* to run the workflow.
