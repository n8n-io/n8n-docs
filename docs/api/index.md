# n8n public REST API

Using n8n's public API, you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

* How to [authenticate](/api/authentication/)
* [Paginating](/api/pagination/) results
* [Endpoint reference](/api/api-reference/)

## API playground and built-in documentation

The n8n API comes with a built-in Swagger UI playground. This provides interactive documentation, allowing you to try out requests. The path to access the playground depends on your hosting.

For self-hosted users, n8n constructs the path from values set in your environment variables:

```shell
N8N_HOST:N8N_PORT/N8N_PATH/api/v1/docs
```

For n8n Cloud users, the API playground path contains your cloud instance URL:

```shell
<your-cloud-instance>/api/v1/docs
```

The API includes built-in documentation about credential formats. This is available using the `credentials` endpoint:

```shell
/api/credentials/schema/{credentialTypeId}
```

## Learn about REST APIs

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis): a basic introduction, including examples of how to call REST APIs.
* [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api): this gives a general, but technical, introduction to APIs.
* [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis): more detailed information about REST APIs.
* [mdn web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): REST APIs work over HTTP, and use HTTP verbs, or methods, to indicate the type of action to perform.