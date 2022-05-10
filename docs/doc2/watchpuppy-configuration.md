---
title: "Watchdog Configuration"
description: Watchdog has multiple configuration options you can choose from. You will find the required arguments for Export to Infor IDM + LN, to FLOW² + DOC² as well as the local export on this page.
date: "2022-01-28"
tags:
  - Fileshare Import
  - Watchdog
  - IDM
  - LN
  - FLOW²
  - Local Export
  - DOC² Upload
---

# Watchdog Configuration

Watchdog has multiple configuration options you can choose from.

## IDM + LN Export

If the IDM Export is selected then WatchPuppy will check for export jobs for idm on premiss, issued from Doc2app. It will then export the document to idm.

Required arguments

- \-c idm
- \-r <input directory>
- \-e <directory for failed docs>
- \-p <directory for processed docs>
- \-k <doc2app api key>
- \--doc\_types <doc2app doc\_types you want to export>

Optional arguments:

- \--doc2\_url <doc2api url>

## Flow2 Export

When the export option is set to flow2 the user must specify a flow2 url and pass an api token for the flow2 server. This is done by base64 encoding this string <flow2-username>:<flow2-password> and then passing it to the WatchPuppy script.

Required arguments

- \-c flow
- \-r <input directory>
- \-e <directory for failed docs>
- \-p <directory for processed docs>
- \-k <doc2app api key>
- \--doc\_types <doc2app doc\_types you want to export>
- \--flow\_url <your flow2 server url>
- \--flow\_token <base64 encode this string within >'< 'flow2-username:flow2-password'>

Optional arguments:

- \--doc2\_url <doc2api url>

## Local Export

Local export only supports the MEDI\_ORDER doc\_type at the time being. If the local export is configured WatchPuppy will download the export xml, the pdf and move the two files into a user specified export folder.

Required arguments

- \-c local
- \-r <input directory>
- \-e <directory for failed docs>
- \-p <directory for processed docs>
- \-k <doc2app api key>
- \--doc\_types <doc2app doc\_types you want to export>
- \--local\_export\_folder <folder for exported docs>

Optional arguments:

- \--doc2\_url <doc2api url>

## Doc2app Upload

This will only upload the documents placed in the input directory.

Required arguments

- \-c doc2
- \-r <input directory>
- \-e <directory for failed docs>
- \-p <directory for processed docs>
- \-k <doc2app api key>

Optional arguments:

- \--doc2\_url <doc2api url>
