---
title: API Integration
description: API Integration offers capabilities and services that connect applications, processes, people, and devices. This is where to find your API Key in DOC².
date: "2021-10-29"
icons: material/api
tags:
  - DOC²
  - Settings
  - API
---


### What is API integration? 
API integration refers to a process of connecting two or more applications via APIs to "talk" to each other. The applications can perform a common function or exchange information to ensure data integrity.

## API Calls

All you need is your API Key. You can find it [here](/doc2/settings-api/) 

* To **upload** documents you need following **POST** Request with this link:
```upl
https://doc2api.cloudintegration.eu/document/process_documents
```

* To query the **status** of the document you need following **GET** request with this link:
```sta
https://doc2api.cloudintegration.eu/document/documents_status/{doc_id}
```
