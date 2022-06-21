# LaMetric

[LaMetric](https://www.lametric.com/) is a clock that allows to display the time and many more information, such as clockfaces, calendar events, weather forecast, customized messages, etc. In addition to visual information, any sound can also be played. In order to control the information that will be displayed and the sounds that will be played, LaMetric offers an API and basic authentication. 

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/lametric/).

## Basic Operations

* Send/Delete Notifications. More info about this operation [here](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html#). A notification can have multiple frames. The frame types that are available are: 
    * Simple frame
    * Goal frame
    * Chart data frame
* One sound can be played with each notification. Two types of sound are available: 
    * Notifications
    * Alarms
* Return information about the display. More info about this operation [here](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-display.html)
* Return audio state. More info about this operation [here](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-audio.html)

## Example Usage

This workflow allows to send a notification with a message, an icon and sound everyday at 8am.

The workflow that was use in this example is the following:
![A workflow with the LaMetric node](/_images/integrations/nodes/lametric/workflow.png)

### 1. Cron node

In order to periodically send a message we need to create a cron node and connect it to the LaMetric node. Here is the configuration that is expected for the cron:

![Cron node to trigger LaMetric node](/_images/integrations/nodes/lametric/cronNode.png)

### 2. LaMetric node

The basic information for a notification needs to be filled on the configuration menu of LaMetric node:

![Notification from LaMetric node](/_images/integrations/nodes/lametric/lametricNode1.png)

1. First of all, you'll have to enter credentials for the Lametric node. You can find out how to do that [here](/integrations/credentials/lametric/).
2. Select *Notifications* in the *Interaction* field
3. Select *Send Notifications* in the *Notification interaction* field
4. Select one of the priorities that are available: Info, Warning, Critical. The priority behaviour is explained in [here](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html#body)
5. Select 1 on *cycle*. The notification will be display as many times as the value introduced here.
6. Select *icon type*. If *none* selected, no icon will be displayed for the notification. If *info* selected an "i" icon will be displayed. If *alert* selected, "!!!" icon will be displayed.
7. Select the *lifetime* if you want to modify the default lifetime of 2 minutes for a notification. The value is expected in milliseconds.

One notification can contain one or more frames where specific informations can be displayed. Have a look on the following screenshot for this specific example: 

![Notification from LaMetric node](/_images/integrations/nodes/lametric/lametricNode2.png)

1. There are 3 types of frames. In this example we are using the simple one. Please, go to the notification LaMetric documentation for more information about the other types. 
2. Select an icon to be displayed. The full list of available icons can be found [here](https://developer.lametric.com/icons)
3. Introduce the text to be displayed. 

A notification can also play a sound. 

![Notification from LaMetric node](/_images/integrations/nodes/lametric/lametricNode3.png)

1. Enable the *Sound* button in order to introduce the rest of required parameters.
2. Select *Notifications* on the *sound category*. An *Alarm* can also be selected. The available sound set is different for each of these categories.
3. Select an sound, in this particular case *bicycle*, on the *Sound ID* field
4. Select a value on the *Repeat* field. 

Once all the configuration is completed, Click on "Execute Node* to run the workflow
