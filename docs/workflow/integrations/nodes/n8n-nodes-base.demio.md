# Demio

[Demio](https://demio.com) provides a simple, no-download webinar experience and all the marketing tools you need to generate better results.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/demio/).


## Basic Operations

* Event
    * Get an event
    * Get all events
    * Register someone to an event
* Report
    * Get an event report

## Example Usage

This workflow allows you to register your audience to an event on Demio via a Typeform submission. You can also find the [workflow](https://n8n.io/workflows/947) on n8n.io. This example usage workflow uses the following nodes.
- [Typeform Trigger](/integrations/trigger-nodes/n8n-nodes-base.typeformtrigger/)
- [Demio]()

The final workflow should look like the following image.

![A workflow with the Demio node](/_images/integrations/nodes/demio/workflow.png)

### 1. Typeform Trigger node

This node will trigger the workflow when a form response is submitted.

This example workflow uses a Typeform to collect name and email address. Create a form exactly like [this](https://n8ndocsburner.typeform.com/to/dpr2kxSL) for the example workflow. Below are the questions and their question types for the form.

|Question | Type  |
|---------|-------|
|Let's start with your name. | Short Text |
|What's your email address? | Email |

1. First of all, you'll have to enter credentials for the Typeform Trigger node. You can find out how to do that [here](/integrations/credentials/typeform/).
2. Select your form from the ***Form*** dropdown list.
3. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the Typeform Trigger node triggers the workflow and returns the response submitted by a user.

![Using the Typeform Trigger node to trigger the workflow](/_images/integrations/nodes/demio/typeformtrigger_node.png)

### 2. Demio node (register: event)

This node will use the information from the previous node to register the user for an event on Demio. If you don't have an event on Demio, make sure to create one.

1. First of all, you'll have to enter credentials for the Demio node. You can find out how to enter credentials for this node [here](/integrations/credentials/demio/).
2. Select 'Register' from the ***Operation*** dropdown list.
3. Select the event from the ***Event ID*** dropdown list.
4. Click on the gears icon next to the ***First Name*** field and click on ***Add Expression***.

5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > Let's start with your name. You can also add the following expression: `{{$json["Let's start with your name."]}}`.
6. Click on the gears icon next to the ***Email*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > What's your email address? You can also add the following expression: `{{$json["What's your email address?"]}}`.
8. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node registers the user for an event on Demio.

![Using the Demio node to register a user for an event](/_images/integrations/nodes/demio/demio_node.png)

!!! note " Activate workflow for production"
    This example workflow uses the Typeform Trigger node. You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered when a new form is submitted.

