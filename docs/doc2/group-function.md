---
title: "Group function"
date: "2022-02-24"
---

Once a table has been extracted via DOC² and the columns have been mapped ([Mapping of columns](/doc2/doc2app/table-train/training-of-table-extraction/mapping-of-columns/)) the obtained data can be grouped to get a structured result set of all extracted data.

What does this mean in detail?

All documents from order confirmations to invoices can vary enormously in complexity from company to company. For example, in documents, information may be presented in tables in some columns across multiple rows and in other columns across only one row.

As an example, you can see the German invoice below, where the information in column "Bezeichnung" extends over several lines (positions).

![](/_images/doc2/image-30-1024x636.png)

At this point, another advantage of DOC² comes into play. It extracts the data in the first step 1 to 1. The result looks like this:

![](/_images/doc2/image-31-1024x633.png)

BUT: Now there is the possibility to group data based on a specific column. That means in this case it can be grouped by the column "Position" as shown in the following video. This in turn groups the rows of the "Description" column into one row. So that at the end you get a structured overall picture of the export and the data can now be processed further.

If the grouping was created by mistake, it can be removed at any time, as also shown in the video.

The result of grouping looks like this:

![](/_images/doc2/image-32-1024x567.png)
