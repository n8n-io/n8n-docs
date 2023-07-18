---
title: Scaling binary data in n8n
description: How to handle large files without degrading n8n's performance.
contentType: howto
---

# Binary data filesystem mode

Binary data is any file-type data, such as image files or documents.

When handling binary data, n8n keeps the data in memory. This can cause crashes when working with large files. 

To avoid this, change the `N8N_DEFAULT_BINARY_DATA_MODE` to `filesystem`. This causes n8n to save data to disk, instead of using memory.
