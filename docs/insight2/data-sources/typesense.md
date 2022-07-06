---
id: typesense
title: TypeSense
---

# TypeSense
Insight can connect to your TypeSense deployment to read and write data.

## Connection
Please make sure the host/IP of the TypeSense deployment is accessible from your VPC if you have self-hosted Insight. If you are using Insight cloud, please **whitelist our IP**.

Insight requires the following to connect to your TypeSense deployment:
- **Host**
- **Port**
- **API Key**
- **Protocol**



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/connect.png)


## Querying TypeSense

Click on `+` button of the query manager at the bottom panel of the editor and select the TypeSense added in the previous step as the data source.
Select the operation that you want to perform on your TypeSense cluster and click `Create` to save the query.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/query.png)



:::tip
Query results can be transformed using transformations. Read our transformations documentation to see how: **[link](/docs/tutorial/transformations)**
:::

## Supported operations

#### 1. Create a Collection

With this operation you can easily create `Collections` in your TypeSense cluster. In the schema field, you'll need to define the schema for creating a new collection. Check out TypeSense docs to know more about collections **[here](https://typesense.org/docs/0.22.2/api/collections.html#create-a-collection)**



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/collection.png)



#### 2. Index a document

Use this operation to index a document to your collection. You'll need to specify the **Collection Name** where you want your document to be indexed and also provide the document data according the schema defined in the collection. Read more about Indexing a document in TypeSense **[here](
https://typesense.org/docs/0.22.2/api/documents.html#index-a-single-document)**.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/index.png)



#### 3. Search

Use this operation to perform a search within the specified collection. Know more about the search parameters in the TypeSense doc **[here](https://typesense.org/docs/0.22.2/api/documents.html#search)**.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/search.png)



#### 4. Get a document

Use this operation to fetch an individual document in a collection by providing the `id` of the document. Read more about it **[here](https://typesense.org/docs/0.22.2/api/documents.html#retrieve-a-document)**.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/get.png)



#### 5. Update a document

Use this operation to update an individual document by providing the **Collection Name** and **Id** of the document. You'll need to provide the updated document data in the form of specified schema. Check out the TypeSense's doc on updating a document **[here](https://typesense.org/docs/0.22.2/api/documents.html#update-a-document)**.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/update.png)



#### 6. Delete a document

Delete a document from collection by providing the `Id` of the document. Check out the TypeSense's doc on deleting documents **[here](https://typesense.org/docs/0.22.2/api/documents.html#delete-documents)**.



![Insight - Data Source - TypeSense](/_images/insight2/datasource-reference/typesense/delete.png)



:::tip
Make sure that you supply JSON strings instead of JavaScript objects for any document or schema that is being passed to the server, in any of the above operations.
:::
