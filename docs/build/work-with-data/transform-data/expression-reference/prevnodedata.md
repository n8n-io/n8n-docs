---
nodeTitle: Prevnodedata
originalFilePath: data/expression-reference/prevnodedata.md
originalUrl: 'https://docs.n8n.io/data/expression-reference/prevnodedata'
url: >-
  https://docs.n8n.io/build/work-with-data/transform-data/expression-reference/prevnodedata
layout:
  description:
    visible: false
---
# PrevNodeData <a href="#prevnodedata" id="prevnodedata"></a>

## **`name`** <a href="#name" id="name"></a>

**Description:** The name of the node that the current input came from. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node).

**Syntax:** **`name`**

**Returns:** String

**Source:**  Custom n8n functionality

## **`outputIndex`** <a href="#outputindex" id="outputindex"></a>

**Description:** The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an ‘If’ or ‘Switch’ node). 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 

**Syntax:** **`outputIndex`**

**Returns:** Number

**Source:**  Custom n8n functionality

## **`runIndex`** <a href="#runindex" id="runindex"></a>

**Description:** The run of the previous node that generated the current input. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 

**Syntax:** **`runIndex`**

**Returns:** Number

**Source:**  Custom n8n functionality

