---
title: "DOC² - Postman Guides"
description: This guide will help you learn how to make http requests via Postman to your DOC² Organization.
date: "2022-10-20"
tags:
  - DOC²
  - Postman
  - Guide
  - Setup
  - Http request
  - Admin
---


# Postman for DOC²


This guide will help you learn how to make HTTP requests via Postman to your DOC² Organization. It is easy to use and super helpful for organisation admins. 


## **Setup**


First, [Download Postman](/doc2/admin-guides/doc2app.postman_collection.json) on your system.

Now Follow this step-by-step guide to learn how HTTP requests in Postman work.

1.  Click on Workspaces and create a new Workspace (You can call it what you want).
2.  Select Collections on the left-hand side of the application and create a new collection for your HTTP requests.

In this collection, you can add multiple HTTP requests. To do so click on the 3 Dots of the collection and select "Add request".

![Picture](/_images/doc2/admin_guides_add_request.png){ loading=lazy }


## **Authorization**


Now you created your HTTP request but you need the authorization to identify your user Account.

1.  First Enter the HTTP request you just created and open the Authorization Tab.

![Picture](/_images/doc2/admin_guides_authorize.png){ loading=lazy }

2.  Select "API key" for the authorization type and fill in the values.
3.  In the "Key" Field enter "x-api-key" and for the value enter your API Key (Can be found in Doc² -> Settings -> Integration)  for "Add to" select Header.

It should look like this:

![Picture](/_images/doc2/admin_guides_authorize_finish.png){ loading=lazy }


## **"GET" Method example**

The GET method is very helpful to gain information about users, organisations, documents and many more

1.  Select the GET Method in your HTTP request.
2.  Authorize yourself, as described Above.
3.  Open <a href="https://api.polydocs.io">api.polydocs.io</a> and add the path of the Function behind the polydocs URL.
    
    for example https://api.polydocs.io/users/get_users

![Picture](/_images/doc2/admin_guide_get_api.png){ loading=lazy }

4.  Now paste that link in the text box next to the GET Method in Postman.

Click on send and you should get all information about every user in your organisation.


## **"POST" Method example**

The POST method is usually used to create something like users or organisations. This method will put information into the database.

1.  Select the "POST" Method.
2.  Authorize yourself, as described above.
3.  Open <a href="https://api.polydocs.io">api.polydocs.io</a> and add the path of the Function behind the polydocs URL.
    
    for example https://api.polydocs.io/users/create

![Picture](/_images/doc2/admin_guides_post_api.png){ loading=lazy }

4.  Now paste that link in the text box next to the POST Method in Postman.
5.  Select the Body tab in your HTTP request and enter the Keys and the Values for every credential that has a red star next to their name.

If you are finished it should look somewhat like this:

![Picture](/_images/doc2/admin_guide_post_body.png){ loading=lazy }

If you wish to create an Admin account, then set the "is_admin" value to "True".

At last, click send and you can see all credentials you set in the response at the bottom, If you see them it means the User has been created.

![Picture](/_images/doc2/admin_guides_post_response.png){ loading=lazy }


## **"DELETE" Method example**

The the DELETE method is used to delete for example users, organisations, ...

1.  Select the "DELETE" Method.
2.  Authorize yourself, as described above.
3.  Open <a href="https://api.polydocs.io">api.polydocs.io</a> and add the path of the Function behind the polydocs URL.
    
    for example: https://api.polydocs.io/users/delete/{user_id}

![Picture](/_images/doc2/admin_guides_delete_api.png){ loading=lazy }

4.  Now paste that link in the text box next to the DELETE Method in Postman.
5.  Replace the {user_id} at the end of the URL with the actual user ID you want to delete. (You can get the user_id with the GET Method)
6.  If you've put the user_id in the URL there is no need for you to add a body key and value for that.

It should look something like this:

![Picture](/_images/doc2/admin_guides_delete_body.png){ loading=lazy }


If you click send you should see "Success: True" in the response.


## **"PUT" Method example**

The PUT method is mostly used to update data from users or organisations. It's very easy to use and very understandable

1.  Select the "PUT" Method.
2.  Authorize yourself, as described above.
3.  Open <a href="https://api.polydocs.io">api.polydocs.io</a> and add the path of the Function behind the polydocs URL.
    
    for example: https://api.polydocs.io/users/update/{user_id}

![Picture](/_images/doc2/admin_guides_put_api.png){ loading=lazy }

4.  Now paste that link in the text box next to the PUT Method in Postman.
5.  Replace the {user_id} at the end of the URL with the actual user ID you want to delete. (You can get the user_id with the GET Method)

Let's say you want to change the email address of one of your users in your organisation.

1.  In the Body enter "email" as the key and the new email address as the value.
2.  Then just press send and you should see a Success in the response.


If you want to have this all better visualized and interactive, you can download the Postman project <a href="/example/downloadables/doc2app.postman_collection.json" download>here</a> and test this all out. 
Just hit the Import button and select this file and you should be good to go.