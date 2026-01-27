---
title: JustCall
description: Use JustCall with n8n
---

# JustCall

[JustCall](https://justcall.io) is a cloud-based phone system for sales and support teams.

## Operations

### Actions

The JustCall node supports the following resources and operations:

#### 📞 Call
- **Get** - Retrieve a specific call by ID
- **Get Many** - List and filter calls with advanced filtering options (agent, direction, status, date range, etc.)
- **Update** - Update call notes, disposition, and rating

#### 💬 SMS
- **Send** - Send SMS or MMS messages
- **Get** - Retrieve a specific SMS by ID
- **Get Many** - List and filter SMS messages

#### 👤 Contact
- **Create** - Create a new contact
- **Get** - Retrieve a specific contact
- **Get Many** - List and filter contacts
- **Update** - Update an existing contact
- **Delete** - Delete a contact

#### 📱 Phone Number
- **Get** - Retrieve a specific phone number
- **Get Many** - List all phone numbers
- **Detect Incoming** - Detect incoming calls

#### 🤖 AI Voice Agent
- **List Agents** - List all available AI voice agents
- **Initiate Call** - Initiate a call with an AI voice agent

### Triggers

The JustCall Trigger node automatically starts workflows when JustCall events occur:

- **Call Answered** - Triggered when a call is answered
- **Call Completed** - Triggered when a call is completed
- **Call Initiated** - Triggered when a call is initiated
- **Call Missed** - Triggered when a call is missed
- **Call Updated** - Triggered when a call is updated
- **Incoming Call** - Triggered when an incoming call is received
- **SMS Received** - Triggered when an SMS is received
- **SMS Sent** - Triggered when an SMS is sent
- **Voicemail Received** - Triggered when a voicemail is received

## Credentials

To use JustCall with n8n, you need:
- API Key
- API Secret

Get these from: Settings → API & Integrations in JustCall dashboard.

## Installation

```bash
npm install n8n-nodes-justcall
```

Or in n8n:
Settings → Community Nodes → Install → `n8n-nodes-justcall`

## Resources

- [npm package](https://www.npmjs.com/package/n8n-nodes-justcall)
- [GitHub repository](https://github.com/saaslabsco/n8n-nodes-justcall)
- [JustCall API docs](https://developer.justcall.io)
