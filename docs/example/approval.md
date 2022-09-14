---
title: WF² Approval with DOC²
description: Documents Approval as important for any business. We show you how you can a easy Worfklow to create an approval
date: 2021-07-05
tags:
  - Workflow²
  - Approval
  - DOC²
  - Ming.le
  - Infor OS
---

# WF² Approval with DOC²



With the approval screen you can approve document for example invoice or other documents.
Infor customer can forward the document to Infor IDM with a define status to archive it.

## Video

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/cZeYRWvQ6n0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Example

``` Javascript
{
  "nodes": [
    {
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "position": [
        640,
        300
      ],
      "parameters": {},
      "typeVersion": 1
    },
    {
      "name": "Rename Keys",
      "type": "n8n-nodes-base.renameKeys",
      "position": [
        1040,
        300
      ],
      "parameters": {
        "keys": {
          "key": [
            {
              "newKey": "NewName",
              "currentKey": "name"
            }
          ]
        }
      },
      "typeVersion": 1
    },
    {
      "name": "Function",
      "type": "n8n-nodes-base.function",
      "position": [
        820,
        300
      ],
      "parameters": {
        "functionCode": "// Don't panic!\n// This is just an Example JSON Data\n\nconst json = `\n  [\n    {\n      \"_id\":\"5078c3a803ff4197dc81fbfb\",\n      \"email\":\"user1@gmail.com\",\n      \"image\":\"some_image_url\",\n      \"name\":\"Name 1\"\n    },\n    {\n      \"_id\":\"5078c3a803ff4197dc81fbfc\",\n      \"email\":\"user2@gmail.com\",\n      \"image\":\"some_image_url\",\n      \"name\":\"Name 2\"\n    }\n  ]\n`;\n\n// Parse the JSON Data and store into a Variable called array\nconst arr = JSON.parse(json);\n\n// Now, Return the Data inside the variable arr\nreturn arr;"
      },
      "typeVersion": 1
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "Function",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Function": {
      "main": [
        [
          {
            "node": "Rename Keys",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```
