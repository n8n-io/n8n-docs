# Google Books

[Google Books](https://books.google.com) is a service from Google to browse, buy, or borrow books online.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic Operations

* Bookshelf
    * Retrieve a specific bookshelf resource for the specified user
    * Get all public bookshelf resource for the specified user
* Bookshelf Volume
    * Add a volume to a bookshelf
    * Clears all volumes from a bookshelf
    * Get all volumes in a specific bookshelf for the specified user
    * Moves a volume within a bookshelf
    * Removes a volume from a bookshelf
* Volume
    * Get a volume resource based on ID
    * Get all volumes filtered by query

## Example Usage

This workflow allows you to get a volume and add it to your bookshelf using the Google Books node. You can also find the [workflow](https://n8n.io/workflows/771) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Google Books]()

The final workflow should look like the following image.

![A workflow with the Google Books node](/_images/integrations/nodes/googlebooks/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Books node (get: volume)

This node will retrieve a volume from Google Books.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2. Enter credentials for the Google Books node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/google/).
3. Enter the ID of a volume in the ***Volume ID*** field.
4. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will observe that the node retrieves the information of the volume that we specify.

![Using the Google Books node to retrieve information of a volume](/_images/integrations/nodes/googlebooks/googlebooks_node.png)

### 3. Google Books1 node (add: bookshelfVolume)

This node will add the volume that we got from the previous node to a bookshelf in Google Books.

1. Select 'OAuth2' in the ***Authentication*** field.
2. Select the credentials that you entered in the previous Google Books node.
3. Select 'Bookshelf Volume' from the ***Resource*** dropdown list.
4. Select 'Add' from the ***Operation*** dropdown list.
5. Enter a bookshelf id in the ***ID*** field.
6. Click on the gears icon next to the ***Volume ID*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Google Books > Output Data > JSON > id. You can also add the following expression: `{{$node["Google Books"].json["id"]}}`.
8. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that this node adds the volume that we got from the previous node to a bookshelf that we specified.

![Using the Google Books node to add a volume to a bookshelf volume](/_images/integrations/nodes/googlebooks/googlebooks1_node.png)

### 4. Google Books2 node (getAll: bookshelfVolume)

This node will return all the volumes in a bookshelf.

1. Select 'OAuth2' in the ***Authentication*** field.
2. Select the credentials that you entered in the previous Google Books node.
3. Select 'Bookshelf Volume' from the ***Resource*** dropdown list.
4. Select 'Get All' from the ***Operation*** dropdown list.
5. Toggle ***My Library*** to true. This will return the information for your account.
6. Click on the gears icon next to the ***Bookshelf ID*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Google Books1 > Parameters > shelfId. You can also add the following expression: `{{$node["Google Books1"].parameter["shelfId"]}}`.
8. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that this node returns all the volumes in the bookshelf that we specified.

![Using the Google Books node to get all the volumes in a bookshelf](/_images/integrations/nodes/googlebooks/googlebooks2_node.png)
