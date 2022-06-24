---
title: Weather
descpriton: Sample Workflow to query the weather by Webhook
tags:
  - Workflow²
  - Example
  - Weather
  - Cron

---

# Weather

Example of a cronjob workflow to send a weather forecast by email when it rains

![Workflow Example](/_images/example/weather_rain.png)


## How to use this workflow

**Instructions**

1. Copy the workflow
2. Navigate to your Workflow editor
3. Click anywhere in the Workflow² window
4. Paste the code (ctrl + v or cmd + v)






``` Javascript
{
  "id": "4",
  "name": "Email me if it's going to rain",
  "nodes": [
    {
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "position": [
        360,
        300
      ],
      "parameters": {},
      "typeVersion": 1
    },
    {
      "name": "OpenWeatherMap",
      "type": "n8n-nodes-base.openWeatherMap",
      "position": [
        530,
        300
      ],
      "parameters": {
        "zipCode": "90210",
        "operation": "5DayForecast",
        "locationSelection": "zipCode"
      },
      "credentials": {
        "openWeatherMapApi": "OpenWeatherMap API Key"
      },
      "typeVersion": 1
    },
    {
      "name": "IF",
      "type": "n8n-nodes-base.if",
      "position": [
        840,
        300
      ],
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "=rain",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "snow",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "sleet",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "hail",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "storm",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "drizzle",
              "operation": "contains"
            },
            {
              "value1": "={{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}},{{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
              "value2": "downpour",
              "operation": "contains"
            }
          ]
        },
        "combineOperation": "any"
      },
      "typeVersion": 1
    },
    {
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [
        1030,
        200
      ],
      "parameters": {
        "text": "=Forecast:\n{{$node[\"Function\"].json[\"list\"][0][\"hour\"]}} - {{$node[\"OpenWeatherMap\"].json[\"list\"][0][\"weather\"][0][\"description\"]}}\n{{$node[\"Function\"].json[\"list\"][1][\"hour\"]}} - {{$node[\"OpenWeatherMap\"].json[\"list\"][1][\"weather\"][0][\"description\"]}}\n{{$node[\"Function\"].json[\"list\"][2][\"hour\"]}} - {{$node[\"OpenWeatherMap\"].json[\"list\"][2][\"weather\"][0][\"description\"]}}\n{{$node[\"Function\"].json[\"list\"][3][\"hour\"]}} - {{$node[\"OpenWeatherMap\"].json[\"list\"][3][\"weather\"][0][\"description\"]}}\n{{$node[\"Function\"].json[\"list\"][4][\"hour\"]}} - {{$node[\"OpenWeatherMap\"].json[\"list\"][4][\"weather\"][0][\"description\"]}}",
        "options": {},
        "subject": "It's going to rain today",
        "toEmail": "changeme@example.com",
        "fromEmail": "n8n@example.com"
      },
      "credentials": {
        "smtp": "Amazon SES"
      },
      "typeVersion": 1
    },
    {
      "name": "Cron",
      "type": "n8n-nodes-base.cron",
      "position": [
        360,
        160
      ],
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "hour": 7
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
        680,
        300
      ],
      "parameters": {
        "functionCode": "for (let i = 0; i < items[0].json.list.length; i++) {\n  var h = new Date(items[0].json.list[i].dt * 1000).getHours();\n  var m = new Date(items[0].json.list[i].dt * 1000).getMinutes();\n  h = (h<10) ? '0' + h : h;\n  m = (m<10) ? '0' + m : m;\n\n  var output = h + ':' + m;\n  items[0].json.list[i].hour = output;\n}\nreturn items\n"
      },
      "typeVersion": 1
    },
    {
      "name": "NoOp",
      "type": "n8n-nodes-base.noOp",
      "position": [
        1030,
        370
      ],
      "parameters": {},
      "typeVersion": 1
    }
  ],
  "active": true,
  "settings": {},
  "connections": {
    "IF": {
      "main": [
        [
          {
            "node": "Send Email",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "NoOp",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Cron": {
      "main": [
        [
          {
            "node": "OpenWeatherMap",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Start": {
      "main": [
        [
          {
            "node": "OpenWeatherMap",
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
            "node": "IF",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenWeatherMap": {
      "main": [
        [
          {
            "node": "Function",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```
