---
nodeTitle: Httpresponse
originalFilePath: data/expression-reference/httpresponse.md
originalUrl: 'https://docs.n8n.io/data/expression-reference/httpresponse'
url: >-
  https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/httpresponse
layout:
  description:
    visible: false
---
# HTTPResponse <a href="#httpresponse" id="httpresponse"></a>

## `$response`.**`body`** <a href="#dollarresponsebody" id="dollarresponsebody"></a>

**Description:** The body of the response object from the last HTTP call. Only available in the ‘HTTP Request’ node

**Syntax:** `$response`.`$response`.**`body`**

**Returns:** Object

**Source:**  Custom n8n functionality

## `$response`.**`headers`** <a href="#dollarresponseheaders" id="dollarresponseheaders"></a>

**Description:** The headers returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

**Syntax:** `$response`.`$response`.**`headers`**

**Returns:** Object

**Source:**  Custom n8n functionality

## `$response`.**`statusCode`** <a href="#dollarresponsestatuscode" id="dollarresponsestatuscode"></a>

**Description:** The HTTP status code returned by the last HTTP call. Only available in the ‘HTTP Request’ node.

**Syntax:** `$response`.`$response`.**`statusCode`**

**Returns:** Number

**Source:**  Custom n8n functionality

## `$response`.**`statusMessage`** <a href="#dollarresponsestatusmessage" id="dollarresponsestatusmessage"></a>

**Description:** An optional message regarding the request status. Only available in the ‘HTTP Request’ node.

**Syntax:** `$response`.`$response`.**`statusMessage`**

**Returns:** String

**Source:**  Custom n8n functionality

