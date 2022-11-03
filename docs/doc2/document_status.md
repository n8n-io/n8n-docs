---
title: All DOC² document status
description: Here is a list of every status a document in DOC² could possibly have.
date: 2022-09-14
tags:
  - Status
  - Document
  - List
  - DOC²

---

##  All DOC² document status

- `WatchDog Start`: Watchdog is starting.
- `WatchDog Split`: The document gets split in Watchdog.
- `WatchDog Upload`: The document is getting uploaded in Watchdog.
- `Upload`: The document is getting uploaded.
- `OCR`: OCR is currently running on that document.
- `Classification`: The document is getting Classified.
- `Zugferd import`: A Zugferd document is getting imported.
- `Ready for Validation`: The document is ready for validation.
- `Zugferd export`: A Zugferd document is getting exported.
- `Workflow`: Workflow is currently running with this document.
- `Pending approval`: Document has to be approved.
- `Pending second approval`: Document has to be approved a second time.
- `Auto Accounting`: Automatic Accounting is running
- `Export`: The Document is getting exported
- `Error`: An error occured in the document

##  Upload and Classify

``` mermaid
sequenceDiagram
  Upload->>Status: Get DocId from Upload?
  loop Status
      Status->>Status: Till FinalStatus is not Classify
  end
  Status->>Classify: FinalStatus is Classify
	Classify->>Delete: Delete Document with DocId

```
