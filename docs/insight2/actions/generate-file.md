---
title: Generate file
description: 
tags:
  - Insight²
  - Actions
---

# Generate file

This action allows you to construct files on the fly and let users download it.
Presently, the only file type supported is `CSV`.

## Options

| Option | Description |
|--------|-------------|
| Type   | Type of file to be generated |
| File name | Name of the file to be generated |
| Data | Data that will be used to construct the file. Its format will depend on the file type, as specified in the following section |

### Data format for CSV

For `CSV` file type, the data field should be supplied with an array objects. Insight² assumes that the keys of each of
these objects are the same and that they represent the column headers of the csv file.

Example:

```javascript
{{
  [
    { name: 'Daniel', email: 'daniel@polydocs.io' },
    { name: 'Ines', email: 'ines@polydocs.io' },
  ]
}}
```

Supplying the above snippet will generate a csv file which looks like this:

```csv
name,email
Daniel,daniel@polydocs.io
Ines,ines@polydocs.io
```