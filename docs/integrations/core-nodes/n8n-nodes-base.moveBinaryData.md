# Move Binary Data

The Move Binary Data node is useful to move data between binary and JSON properties.

!!! note "Hint"
    If you need to convert an entire CSV file to JSON, use the [Spreadsheet File](/integrations/core-nodes/n8n-nodes-base.spreadsheetFile/) node.


## Node Reference

- ***Mode:*** This field specifies from where and to the data should be moved.
    - Binary to JSON
    - JSON to Binary
- ***Set all Data:*** If set to active, all JSON data is replaced with the data retrieved from binary key. If it is not set to active, the data will be written to a single key. This field is displayed when 'Binary to JSON' is selected from the ***Mode*** dropdown list.
- ***Source Key:*** The name of the binary key to get data from. It is also possible to define deep keys by using dot-notation. For example, "level1.level2.currentKey". This field is displayed when 'Binary to JSON' is selected from the ***Mode*** dropdown list.
- ***Destination Key:*** The name the JSON key to copy data to. It is also possible to define deep keys by using dot-notation. For example, "level1.level2.newKey". This field is displayed when 'Binary to JSON' is selected from the ***Mode*** dropdown list.
- ***Convert all Data:*** If set to active all JSON data will be converted to binary. If it is not set to active only the data with one key will be converted. This field is displayed when 'JSON to Binary' is selected from the ***Mode*** dropdown list.
- ***Destination Key:*** The name of the binary key to copy data to. It is also possible to define deep keys by using dot-notation. For example, "level1.level2.newKey". This field is displayed when 'JSON to Binary' is selected from the ***Mode*** dropdown list.

- ***Options***
    - ***Keep Source:*** Keep the source key. By default it gets deleted.
    - ***Encoding:*** Set the encoding of the data stream.
    - The following are the options when 'Binary to JSON' is selected from the ***Mode*** dropdown list.
        - ***JSON Parse:*** Run JSON parse on the data to get proper object data. This field is displayed when ***Set all Data*** is set to 'false'.
        - ***Keep As Base64:*** Keeps the binary data as base64 string. This field is displayed when ***Set all Data*** is set to 'false'.
        - ***Strip BOM:*** Strip the byte order mark (BOM) from the string. This field is displayed when ***Encoding*** is selected.
    - The following are the options when 'JSON to Binary' is selected from the ***Mode*** dropdown list.
        - ***Add BOM:*** Add the byte order mark (BOM) to the string. This field is displayed when ***Encoding*** is selected.
        - ***File Name:*** The file name to set.
        - ***Mime Type:*** The mime-type to set. By default the JSON mime-type will be set.
        - ***Use Raw Data:*** Use data as is and do not stringify it.
        - ***Data is Base64:*** Keeps the binary data as base64 string. This field is displayed when ***Convert all Data*** is set to 'false'.


## Example Usage

This workflow allows you to store the JSON data received from the [CocktailDB API](https://www.thecocktaildb.com/) to your machine. You can also find the [workflow](https://n8n.io/workflows/652) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [Write Binary Data](/integrations/core-nodes/n8n-nodes-base.writeBinaryFile/)

The final workflow should look like the following image.

![A workflow with the Move Binary Data node](/_images/integrations/core-nodes/movebinarydata/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

1. Enter `https://www.thecocktaildb.com/api/json/v1/1/random.php` in the ***URL*** field.
2. Click on ***Execute Node*** to run the node.

![Get random cocktail data from CocktailDB API using the HTTP Request node](/_images/integrations/core-nodes/movebinarydata/httprequest_node.png)


### 3. Move Binary Data node (JSON to Binary)

1. Select 'JSON to Binary' from the ***Mode*** dropdown list.
2. Click on ***Execute Node*** to run the node.

![Convert JSON to binary using the Move Binary Data node](/_images/integrations/core-nodes/movebinarydata/movebinarydata_node.png)


### 4. Write Binary File node

1. Enter the file name in the ***File Name*** field.
2. Click on ***Execute Node*** to run the node.

![Writing a file to the disk using the Write Binary File node](/_images/integrations/core-nodes/movebinarydata/writebinaryfile_node.png)
