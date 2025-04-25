---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: The PDF Maker node documentation
description: Learn how to use the The PDF Maker node in n8n. Follow technical documentation to integrate The PDF Maker node into your workflows.
contentType: [integration, reference]
---

# The PDF Maker node

Use the The PDF Maker node to Automate document creation to save time, effort, and money.
For businesses and individuals looking to streamline document generation.
Create professional invoices, reports, and more from your data sources.

On this page, you'll find a list of operations the The PDF Maker node supports and links to more resources.

/// note | Credentials
Refer to [The PDF Maker credentials](/integrations/builtin/credentials/thepdfmaker.md) for guidance on setting up authentication. 
///

## Generation Task

You need to pass a node containing JSON data with key-value pairs. This object should be assigned to the data key.
For eg
```json
{
  "data": {
    "Name": "This is name",
    "Notes": "This is notes",
    "image_profile_100": "https://example.com/sample.jpg",
    "Address": "This is example text",
    "lineitems_InvoiceTable": [{
        "Name": "LED",
      "Assignee": "Jhon",
      "Quantity": "3",
      "image_productImg_100": "https://example.com/sample.jpg"
    }]
 }
}
```

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'thepdfmaker') ]]

## Related resources

Refer to The PDF Maker's [documentation](https://help.thepdfmaker.com/en/){:target=_blank .external-link} for more information about the service.
