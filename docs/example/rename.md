---
title: Rename JSON Key
descpriton: This is a Sample Workflow for demonstrating Rename Keys Node
tags:
  - Workflow²
  - Example
  - Rename

---

---

# Rename Keys

Example to show how to rename Keys in a JSON

![Workflow Example](/_images/example/Example-JSON.png)


## How to use this workflow


**Instructions**

1. Copy the workflow
2. Navigate to your Workflow editor
3. Click anywhere in the Workflow² window
4. Paste the code (ctrl + v or cmd + v)




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
