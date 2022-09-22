---
title: "Advanced settings for table extraction"
description: In DOC² there are various advanced settings to extract a table. On this page you will find a few examples of different table characteristics.
date: "2022-03-01"
tags:
  - Table
  - DOC²
  - Settings
---

In the table extraction view, you will find the menu item `Settings` in the upper action bar (make sure that the training mode is activated). If you click on the gear icon, a window will open in which you will find the `Advanced Settings`.

![](/_images/doc2/advanced-settings_1.png){ loading=lazy }


![](/_images/doc2/advanced-settings_2.png){ loading=lazy }

Below functionalities are available in general settings:

**Header row count**

Here you can define the number of lines of a table header. For example, the table header line can be two lines:

![](/_images/doc2/advanced-settings_3.png){ loading=lazy }

Accordingly, the value in "Header row count" is set to two:

![](/_images/doc2/advanced-settings_4.png){ loading=lazy }

Why is this needed? It might be that DOC² does not recognize the third line in the table header as header line. In this case, it incorrectly inserts it into the table as extracted value. This can be easily prevented with this function.

Example before:

![](/_images/doc2/advanced-settings_5.png){ loading=lazy }

Example after:

![](/_images/doc2/advanced-settings_6.png){ loading=lazy }

<!-- **Move Extra Rows to**

If a table starts with one single row that is above all the other information like position and so on, it might be that DOC² extracts this line as extra row and grouping of the information for example by position might not work properly.

![](/_images/doc2/image-16.png){ loading=lazy }

To work around this problem, the "Move Extra Row to" option can be enabled. This causes that this single row is taken over into the information below and can be extracted together with them into one row and then grouped.

![](/_images/doc2/image-18.png){ loading=lazy }

Example before:

![](/_images/doc2/image-21-1024x144.png){ loading=lazy }

Example after:

![](/_images/doc2/image-22-1024x132.png){ loading=lazy }

Below functionalities are available in advanced settings:

**Minimum grouped rows**

Enter the minimum number of rows in your grouped column here.

**Maximum grouped rows**

Enter the maximum number of rows in your grouped column here.

**Distinct group columns**

If you want only unique values for your grouped column, check the box here.

**Reverse grouping**

If you want to combine all the rows above the grouped attribute, check the box here.

**Split Text**

If you want to split the text exactly at the column separator, check the box here. -->