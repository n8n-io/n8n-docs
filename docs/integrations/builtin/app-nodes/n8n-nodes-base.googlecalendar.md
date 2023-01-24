# Google Calendar

[Google Calendar](https://www.google.com/calendar/){:target="_blank" .external-link} node allows you to automate work in the Google Calendar platform and integrate Google Calendar with other applications. n8n has built-in support for a wide range of Google Calendar features, which includes basic operations like adding, retrieving, deleting and updating calendar events.

On this page, you'll find a list of operations the Google Calendar node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/){:target="_blank" .external-link} for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Google Calendar integrations](https://n8n.io/integrations/google-calendar/){:target="_blank" .external-link} list.


## Basic Operations

* Calendar
    * If a time-slot is available in a calendar
* Event
    * Add a event to calendar
    * Delete an event
    * Retrieve an event
    * Retrieve all events from a calendar
    * Update an event

## Example Usage

This workflow allows you to add an event to Google Calendar. You can also find the [workflow](https://n8n.io/workflows/427) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Calendar]()

The final workflow should look like the following image.

![A workflow with the Google Calendar node](/_images/integrations/builtin/app-nodes/googlecalendar/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Google Calendar node

1. First of all, you'll have to enter credentials for the Google Calendar node. You can find out how to do that [here](/integrations/builtin/credentials/google/).
2. Select the *Calendar* from the dropdown list of the user's calendar list.
3. Enter the start date of your event in the *Start* field.
4. Enter the end date of your event in the *End* field.
5. Click on *Execute Node* to run the workflow.




