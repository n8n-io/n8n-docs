---
title: Mailgun
description: 
tags:
  - Insight²
  - Data Sources
---

# Mailgun

Insight² can connect to your Mailgun account to send emails.

<img class="screenshot-full" src="/_images/insight2/datasource-reference/mailgun/mailgun-datasource.png" alt="Insight² - Data source - Mailgun" height="420" />

:fontawesome-solid-circle-info:{ style="color: #0F17E4" }
The Mailgun API Datasource supports for interaction with the mail endpoint of the [Mailgun API](https://documentation.mailgun.com/en/latest/api-intro.html#authentication-1).


## Connection

To add a new Mailgun API datasource, click the **Datasource manager** icon on the left-sidebar of the app builder and click on the `Add datasource` button, then select Mailgun API from the modal that pops up.

Enter your **Mailgun API key** in the `Api key` field.

:fontawesome-solid-circle-info:{ style="color: #0F17E4" } **tip**:<br>
Mailgun API key is required to create an Mailgun datasource on Insight. You can generate API key by visiting [Mailgun account page](https://app.mailgun.com/app/account/security/api_keys).

Click on the `Save` button to save the data source.

## Supported operations

1.  Email service

### Email service

Required parameters:

- Send email to
- Send email from
- Subject
- Body as text

Optional parameters:

- Body as HTML

<img class="screenshot-full" src="/_images/insight2/datasource-reference/mailgun/mailgun-datasource.png" alt="Insight² - Query Mailgun" height="420"/>


:fontawesome-solid-circle-info:{ style="color: #0F17E4" }
**Send mail to** - accepts a single email id.
For example:
`{{"dev@polydocs.io"}}`.

:fontawesome-solid-circle-info:{ style="color: #0F17E4" }
**Send mail from** - accepts a string.
For example: `admin@polydocs.io`


:fontawesome-solid-circle-info:{ style="color: #0F17E4" }
**Send a single email to multiple recipients**<br> The `Send mail to` field can contain an array of recipients, which will send a single email with all of the recipients in the field.

:fontawesome-solid-circle-info:{ style="color: #0F17E4" }
**Send multiple individual emails to multiple recipients**<br> Set <b>Multiple recipients</b> field to `{{true}}` and the `Send mail to` field will be split into multiple emails and send to each recipient.


:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" } **NOTE**: Query should be saved before running.

