# Google Cloud Firestore

[Google Cloud Firestore](https://firebase.google.com/docs/firestore/) is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. It keeps your data in-sync across client apps through real-time listeners and offers offline support for mobile and web.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic Operations

* Document
    * Create a document
    * Create/Update a document
    * Delete a document
    * Get a document
    * Get all documents from a collection
    * Runs a query against your documents
* Collection
    * Get all root collections

## Example Usage

This workflow allows you to create, update, and get a document in the Google Cloud Firestore. You can also find the [workflow](https://n8n.io/workflows/839) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/workflow/integrations/core-nodes/n8n-nodes-base.set/)
- [Google Cloud Firestore]()

The final workflow should look like the following image.

![A workflow with the Google Cloud Firestore node](/_images/integrations/nodes/googlecloudfirestore/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Set node

We will use the Set node to set the name and id.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `name` in the ***Name*** field.
3. Enter `n8n` in the ***Value*** field.
4. Click on ***Add Value*** and select 'Number' from the dropdown list.
5. Enter `id` in the ***Name*** field.
6. Enter `1` in the ***Value*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that node sets the value for name and id.

![Using the Set node to set the data](/_images/integrations/nodes/googlecloudfirestore/set_node.png)

### 3. Google Cloud Firestore node (document: create)

This node will create a new document in a collection in Google Cloud Firestore with the data from the previous node.

1. First of all, you'll have to enter credentials for the Google Cloud Firestore node. You can find out how to do that [here](/workflow/integrations/credentials/google/).
2. Select 'Create' from the ***Operation*** dropdown list.
3. Select a project from the ***Project ID*** dropdown list.
4. Enter the name of your collection in the ***Collection*** field.
5. Enter `id, name` in the ***Columns / attributes*** field.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates a new document using the data from the previous node.

![Using the Google Cloud Firestore node to create new document](/_images/integrations/nodes/googlecloudfirestore/googlecloudfirestore_node.png)

### 4. Set node

We will use the Set node to ensure that only the data that we set in this node gets passed on to the next nodes in the workflow. We will set a new value for `name`.

1. Click on ***Add Value*** and select 'String' from the dropdown list.
2. Enter `name` in the ***Name*** field.
3. Enter `nodemation` in the ***Value*** field.
4. Click on ***Add Value*** and select 'String' from the dropdown list.
5. Enter `document_id` in the ***Name*** field.
6. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Firestore > Output Data > JSON > _id. You can also add the following expression: `{{$node["Google Cloud Firestore"].json["_id"]}}`.
8. Toggle ***Keep Only Set*** to `true`. We set this option to true to ensure that only the data that we have set in this node get passed on to the next nodes in the workflow.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sets the values of `name` and `document_id`. These values are passed to the next node in the workflow.

![Using the Set node to set the values for name and document_id](/_images/integrations/nodes/googlecloudfirestore/set1_node.png)

### 5. Google Cloud Firestore1 node (document: upsert)

This node will update the value of the `name` field in the document that we created using the Google Cloud Firestore node.

1. Select the credentials that you entered in the previous Google Cloud Firestore node.
2. Select 'Create/Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Project ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Firestore > Parameters > projectId. You can also add the following expression: `{{$node["Google Cloud Firestore"].parameter["projectId"]}}`.
5. Click on the gears icon next to the ***Collection*** field and click on ***Add Expression***.
6. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Firestore > Parameters > collection. You can also add the following expression: `{{$node["Google Cloud Firestore"].parameter["collection"]}}`.
7. Enter `document_id` in the ***Update Key*** field.
8. Enter `name` in the ***Column /Attributes*** field.
9. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node updates the value of the `name` field in the document that we created using the Google Cloud Firestore node.

![Using the Google Cloud Firestore node to update a document](/_images/integrations/nodes/googlecloudfirestore/googlecloudfirestore1_node.png)

### 6. Google Cloud Firestore node (document: get)

This node will get the document that we created using the Google Cloud Firestore node.


1. Select the credentials that you entered in the previous node.
2. Click on the gears icon next to the ***Project ID*** field and click on ***Add Expression***.
3. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Firestore > Parameters > projectId. You can also add the following expression: `{{$node["Google Cloud Firestore"].parameter["projectId"]}}`.
4. Click on the gears icon next to the ***Collection*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Google Cloud Firestore > Parameters > collection. You can also add the following expression: `{{$node["Google Cloud Firestore"].parameter["collection"]}}`.
6. Click on the gears icon next to the ***Document ID*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Set1 > Output Data > JSON > document_id. You can also add the following expression: `{{$node["Set1"].json["document_id"]}}`.
8. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns the document that we created using the Google Cloud Firestore node.

![Using the Google Cloud Firestore node to get a document](/_images/integrations/nodes/googlecloudfirestore/googlecloudfirestore2_node.png)
