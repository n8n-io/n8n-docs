---
title: "Advanced settings"
date: "2022-03-01"
tags:
  - Table
---

In the table extraction view you will find the menu item "Advance Settings" in the upper action bar (make sure that the training mode is activated):

![](/_images/doc2/image-12.png)

Following window will be opened:

![](/_images/doc2/image-13.png)

Below functionalities are available:

**Header row count**

Here you can define the number of lines of a table header. For example, the table header line can be two lines:

![](/_images/doc2/image-14.png)

Accordingly, the value in "Header row count" is set to two:

![](/_images/doc2/image-15.png)

Why is it needed? It might be that DOC² does not recognize the second line in the table header as header line. In this case, it incorrectly inserts it into the table as extracted value. This can be easily prevented with this function.

Example before:

![](/_images/doc2/image-19.png)

Example after:

![](/_images/doc2/image-20.png)

**Move Extra Row to desc**

If a table starts with one single row that is above all the other information like position and so on, it might be that DOC² extracts this line as extra row and grouping of the information for example by position might not work properly.

![](/_images/doc2/image-16.png)

To work around this problem, the "Move Extra Row to desc" option can be enabled. This causes that this single row is taken over into the information below and can be extracted together with them into one row and then grouped.

![](/_images/doc2/image-18.png)

Example before:

![](/_images/doc2/image-21-1024x144.png)

Example after:

![](/_images/doc2/image-22-1024x132.png)

**Minimum grouped rows**

+++ DOCUMENTATION IN PROGRESS +++

**Maximum grouped rows**

+++ DOCUMENTATION IN PROGRESS +++

**Distinct group columns**

+++ DOCUMENTATION IN PROGRESS
