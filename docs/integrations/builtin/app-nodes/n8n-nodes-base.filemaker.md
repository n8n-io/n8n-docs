# FileMaker

The FileMaker node allows you to automate work in the FileMaker platform and integrate FileMaker with other applications. n8n has built-in support for a wide range of FileMaker features, which includes basic operations like creating, finding, getting, editing, and duplicating files.

On this page, you'll find a list of operations the FileMaker node supports and links to more resources.

!!! note "Credentials"
    Refer to the [FileMaker credentials](https://docs.n8n.io/integrations/builtin/credentials/filemaker/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [FileMaker integrations](https://n8n.io/integrations/filemaker/){:target="_blank" .external-link} list.


## Basic Operations

- Find Records
- Get Records
- Get Records by Id
- Perform Script
- Create Record
- Edit Record
- Duplicate Record
- Delete Record

## Example Usage

This workflow allows you to create, update, and retrieve a record from FileMaker. You can also find the [workflow](https://n8n.io/workflows/1068) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [FileMaker]()

The final workflow should look like the following image.

![A workflow with the FileMaker node](/_images/integrations/builtin/app-nodes/filemaker/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. FileMaker node

This node will create a new record in FileMaker.

1. First of all, you'll have to enter credentials for the FileMaker node. You can find out how to do that [here](/integrations/builtin/credentials/filemaker/).
2. Select 'Create Record' from the ***Action*** dropdown list.
3. Select a layout from the ***Layout*** dropdown list.
4. Click on the ***Add Field*** button.
5. Select a field from the ***Field*** dropdown list.
6. Enter a value in the ***Value*** field.
7. Click on the ***Add field*** button.
8. Select a field from the ***Field*** dropdown list.
9. Enter a value in the ***Value*** field.
10. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new record in FileMaker.

![Using the FileMaker node to create a new record](/_images/integrations/builtin/app-nodes/filemaker/filemaker_node.png)

### 3. FileMaker1 node

This node will add a new field to the record that we created in the previous node.

1. Select the credentials that you entered in the previous node.
2. Select 'Edit Record' from the ***Action*** dropdown list.
3. Select a layout from the ***Layout*** dropdown list.
4. Click on the gears icon next to the ***Record Id*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > response > recordId. You can also add the following expression: `{{$json["response"]["recordId"]}}`.
6. Click on the gears icon next to the ***Mod Id*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Current Node > Input Data > JSON > response > modId. You can also add the following expression: `{{$json["response"]["modId"]}}`.
8. Click on the ***Add field*** button.
9. Select a field from the ***Field*** dropdown list.
10. Enter a value in the ***Value*** field.
11. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node adds the `address_country` field to the record that we created in the previous node.

![Using the FileMaker node to update a record](/_images/integrations/builtin/app-nodes/filemaker/filemaker1_node.png)

### 4. FileMaker2 node

This node will get the information about the record that we created earlier.

1. Select the credentials that you entered in the previous node.
2. Select 'Get Records by Id' from the ***Action*** dropdown list.
3. Select a layout from the ***Layout*** dropdown list.
4. Click on the gears icon next to the ***Record Id*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > FileMaker > Output Data > JSON > response > recordId. You can also add the following expression: `{{$node["FileMaker"].json["response"]["recordId"]}}`.
6. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the information of the record.

![Using the FileMaker node to return the information a record](/_images/integrations/builtin/app-nodes/filemaker/filemaker2_node.png)
