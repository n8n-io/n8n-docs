---
title: "AI Indicators"
date: "2022-03-23"
description: Show how good a document trained to extract the data

tags:
  - General
---

In the document view you will find options to display the quality of the extraction using graphical indicators. The so-called AI indicator.

To do this, open a document as known via the dashboard:

![](/_images/doc2/image-50-1024x391.png)

In the Document View there are now two indicators for the quality of the extraction.

- Extraction quality in percent per field and current document
- Overall extraction quality including previous extractions of documents of the same type.

![](/_images/doc2/image-51-1024x474.png)

**Extraction quality in percent per field and current document**

For each field, a value is available on the right side, which indicates the quality of extraction for the current document. The display is a percentage value:

![](/_images/doc2/image-52.png)

**Overall extraction quality including previous extractions of documents of the same type**

Furthermore, there is a graph that shows the quality of all previous extractions for a document type. This refers in each case to the extraction value with the lowest quality:

![](/_images/doc2/image-53.png)

**Technical Details:**

The AI indicator shows how well a document is trained. This is done via an internal score. This means that as soon as a document is read in and the fields extracted by DOC² are confirmed by the user, this score is increased. The higher the score, the further the display of the AI indicator is in the green area. If fields are changed manually by the user after the export, this score is decreased again and the display of the AI indicator falls back into the red area. Only when the document has been taught and the extraction has determined the correct value for some imports without manual intervention, the score reaches 100%.
