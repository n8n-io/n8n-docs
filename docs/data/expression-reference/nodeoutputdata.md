# NodeOutputData

## `$()`.**`all()`**

**Description:** Returns an array of the node’s output items

**Syntax:** `$()`.all(branchIndex?, runIndex?)

**Returns:** Array<Item>

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$()`.**`first()`**

**Description:** Returns the first item output by the node

**Syntax:** `$()`.first(branchIndex?, runIndex?)

**Returns:** Item

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$()`.**`isExecuted`**

**Description:** Is <code>true</code> if the node has executed, <code>false</code> otherwise

**Syntax:** `$()`.`$()`.**`isExecuted`**

**Returns:** Boolean

**Type:** n8n

## `$()`.**`item`**

**Description:** Returns the matching item, i.e. the one used to produce the current item in the current node. <a href="/data/data-mapping/data-item-linking/">More info</a>

**Syntax:** `$()`.`$()`.**`item`**

**Returns:** Item

**Type:** n8n

## `$()`.**`itemMatching()`**

**Description:** Returns the matching item, i.e. the one used to produce the item in the current node at the specified index. <a href="/data/data-mapping/data-item-linking/">More info</a>

**Syntax:** `$()`.itemMatching(currentItemIndex?)

**Returns:** Item

**Type:** n8n

**Parameters:**

  * `currentItemIndex` (Number) - The index of the item in the current node to be matched with.

## `$()`.**`last()`**

**Description:** Returns the last item output by the node

**Syntax:** `$()`.last(branchIndex?, runIndex?)

**Returns:** Item

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$()`.**`params`**

**Description:** The configuration settings of the given node. These are the parameters you fill out within the node’s UI (e.g. its operation).

**Syntax:** `$()`.`$()`.**`params`**

**Returns:** NodeParams

**Type:** n8n

