---
title: Workflow² combined with MAUTIC
description: A nice example of how to use the combined power of Workflow² and MAUTIC
tags:
  - Workflow²
  - MAUTIC
  - How-To
---

# MAUTIC New Customer Workflow 

![Start](/_images/workflows/workflows/mauticworkflow_new_customer1.png)

This workflow starts with a WooCommerce trigger node in "Customer created" mode.
The node needs a WooCommerce REST API login consisting of the client key, the client secret and the general WooCommerce API URL of your online store.
For information on how to create a WooCommerce REST API login, see:
[WooCommerce REST API](https://woocommerce.com/document/woocommerce-rest-api/)

![Next](/_images/workflows/workflows/mauticworkflow_new_customer2.png)

When triggered, the node receives general information about the registration, including the new user's first and last name and email address.
We then convert this information into a more convenient form for further processing.
To do this, we create a small JS script in the function node that assigns the information to specific terms.
Under "item.billing" in the part of the message that the WooCommerce Node receives, the customer data is stored.

![Next](/_images/workflows/workflows/mauticworkflow_new_normalize.png)

With the help of this we will now create a new contact in MAUTIC.
To do this, we first need a MAUTIC login.
The MAUTIC node needs a normal login (username and password) and the base URL of the MAUTIC instance.
After that we need to add for this in the MAUTIC Node in the respective fields with the help of the gears so-called "Expressions" and define generally, so that the MAUTIC Node also really uses the data of the respective new customer and not always the same.
Here it is to be noted:
Expressions are always written in double curly brackets. {{ Expression }}
The $json indicates that the intended information in the "Json" is part of the message that the node gets when it is called.
And depending on the wanted information and the name we set for it before, the square bracket after it is filled accordingly. (Here: ["email"] )

(The expression will be highlighted in red and in the lower section it will say that it could not be found. This is because the information can only be found if it exists. This can be tested during test runs. For the screenshot, the previous part has already been executed once to show you the filled version.
Below you will see how it looks in red if no information has been transferred yet).

![Next](/_images/workflows/workflows/mauticworkflow_new_contact.png)

![Next](/_images/workflows/workflows/mauticworkflow_new_customer5.png)

In the current example, the new contact will receive 10 points for registering and a welcome email.
For this we have to enter the contact ID of the just created new contact in the next MAUTIC node.
This ID is returned to us as a response when the contact is created and is therefore also transferred to the next node when it is triggered.
Now simply add an expression to the Contact ID and start it as shown in the screenshot with
{{ $json["id"] }} and you are done. (The same applies to the Send Email MAUTIC Node).

![Next](/_images/workflows/workflows/mauticworkflow_new_customer6.png)

![Next](/_images/workflows/workflows/mauticworkflow_new_customer7.png)

It is then saved in SugarCRM as a contact (or optionally as a lead).
The SugarCRM login is handled in the same way as MAUTIC.
So we need a username and the corresponding password as well as the base URL of the SugarCRM instance.
In the node we have to specify the expressions a little bit different than before, because information like first and last name and email are not transferred directly.
{{ $node["Normalize"].json["first_name"] }}
In the first name example here, we use $node["name of node"] to specify which node it gets the data from. In this case it is the node "Normalize". But this can be easily changed.
the part .json["first_name"] is then again as already explained above.

![Next](/_images/workflows/workflows/mauticworkflow_new_customer8.png)

![Next](/_images/workflows/workflows/mauticworkflow_new_customer9.png)


You can download the workflow as javascriptfile <a href="downloadables/newcustomermautic.js" download>here</a> and add it on your Workflow² instance using drag&drop,
or by opening the file in an editor and copy&paste the code directly into Workflow².
