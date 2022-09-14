---
title: Workflow² combined with MAUTIC
description: A nice example of how to use the combined power of Workflow² and MAUTIC
tags:
  - Workflow²
  - MAUTIC
  - How-To
---

# MAUTIC New Order Workflow

![Start](/_images/workflows/workflows/mauticworkflow_new_order1.png)

This workflow starts with a WooCommerce trigger node in "Order created" mode.
The node needs a WooCommerce REST API login consisting of the client key, the client secret and the general WooCommerce API URL of your online store.
For information on how to create a WooCommerce REST API login, see:
[WooCommerce REST API](https://woocommerce.com/document/woocommerce-rest-api/)

![Next](/_images/workflows/workflows/mauticworkflow_new_order2.png)

When activated, general information is received by the node, which is then converted into a better form for us.

To do this, we create a small JS script in the functionnode that maps the information to specific terms.
Under "item.billing" in the part of the message the WooCommerce node receives, that contains the customer data.

Edit JavaScript Code
``` Javascript
dict = {
  'first_name': item.billing.first_name,
  'last_name': item.billing.last_name,
  'email': item.billing.email,
}

return dict;

```

Since we are talking about orders here and on many webshops it is quite possible to place an order even as a non-registered user, we will consequently look if we already have a contact in MAUTIC with the given email and/or with the first and last name.
To do this, we request all contacts via the MAUTIC Node.
The MAUTIC node needs a normal login (username and password) and the base URL of your MAUTIC instance.

![Next](/_images/workflows/workflows/mauticworkflow_new_order3.png)

From the contact data received from MAUTIC, we now filter out the registered email addresses using the functionnode and a small javascript code and create a list of them.
( In this example we check only the used email address )

![Next](/_images/workflows/workflows/mauticworkflow_new_order4.png)

With the following IF node we check whether the e-mail address used for the order occurs in the list from MAUTIC and act accordingly.
For the check by means of the IF Node we must insert the variable data there with the help of so-called expressions.
We do this by clicking on the gears and selecting "Add Expression".

![Next](/_images/workflows/workflows/mauticworkflow_new_order5.png)

This will open the following window where in the case of Value1 under Expression as in the screenshot below we will use {{ $json["thelist"].join(', ') }}.
Short explanation:
Expressions are always specified in {{ }}.
$json specifies that it gets the information when the specific node is activated by the previous one, and the content within ["thelist"] is what we want to use.
.join(', ') specifies that it is a comma-separated list.
(The expression will be highlighted in red and the bottom section will say that it could not be found. This is because the information can only be found if it currently exists. This can be tested during test runs but won't be shown during normal activation).

![Next](/_images/workflows/workflows/mauticworkflow_new_order6.png)

For Value2, the email address entered by the user when placing the order is passed with
{{ $node["Normalize"].json["email"] }}.
Here $node["Normalize"] specifies the name of the node from which the information is obtained. (Needed because the Normalize Node is not the preceding node)
.json["email"] then again specifies that we want to use the value "email" of the note output.

![Next](/_images/workflows/workflows/mauticworkflow_new_order7_9.png)

If it is a new customer, it will be saved as a new MAUTIC contact.
For this we need again a MAUTIC Node, which is this time on "Contact" and "Create".
Depending on what information customers provide when ordering or what information you actually want to use, you can set the contact creation individually.
In the current example, we will use the customer's first and last name and email to create a MAUTIC contact.
According to this we have to insert expressions in the MAUTIC node again to use the correct data.
We pull the information from the Normalize Node as above and can therefore use the same expression {{ $node["Normalize"].json["Information"] }}.
(For information we have to enter the desired name. In this example then email, first_name or last_name.

![Next](/_images/workflows/workflows/mauticworkflow_new_contact.png)

![Next](/_images/workflows/workflows/mauticworkflow_new_order7_9.png)

To send the person a welcome email, we use the contact ID we got back during the contact creation in the preceding MAUTIC node.
There we specify Contact and Send Email, set which email should be sent by MAUTIC and specify the contact ID by expression in Contact ID.

![Next](/_images/workflows/workflows/mauticworkflow_new_order10.png)



You can download the workflow as javascriptfile <a href="downloadables/newordermautic.js" download>here</a> and add it on your Workflow² instance using drag&drop,
or by opening the file in an editor and copy&paste the code directly into Workflow².
