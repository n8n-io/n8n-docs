---
title: Email Import to DOC² 
description: This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address and uploads it to our DOC² system.
date: 2022-09-14
tags:
  - Workflow²
  - Email
  - Outlook
  - Import
  - DOC²

---

#  Outlook Import to DOC²

With the following workflow you can upload the attachments from your outlook emails to DOC².

![](/_images/workflows/workflows/WF-outlook-import.png)

/1. The **Interval** node is used to trigger the workflow to run at regular intervals of time
/2. You can customize the **Function** node as you want to. This flow uses the Function node to define the Folder IDs of your Outlook account:

Edit JavaScript Code
``` Javascript
parent_folder_ids = {
  "AQMKADU3MDE3NmZILWU2YzItNGQ00S05NWRiLTMOMmVKNZY2NTRjNgAuAAADu1RgjMDZpowqTbb026ZmKQEAUHOYFZIcxE_bNey91760TQAAA05hAAAA": "Invoice",
  "AQMKADU3MDE3NmZLLWU2YzItNGQ00S05NWRiLTMOMmVkNzY2NTRjNgAuAAADu1RgjMDZpowqTbb026ZmKQEAUHOYFZIcxE_bNey91760TQAAA05sAAAA": "Delivery Note"
}

if ($node["Get unread messages"]. json["parentFolderId"]){
  folder _id = snode["Get unread messages"]. json["parentFolderId"];

  for (const [key, valuel of Object.entries (parent_folder_ids)) {
    if (key == folder id){
      item.inbox = value;
    }
  }  

}

console.log('Done!');

return item;

```

/3. The **Get Unread Messages** checks for all the messages that are unread

![](/_images/workflows/workflows/WF-outlook-import-get-unread-messages.png)

