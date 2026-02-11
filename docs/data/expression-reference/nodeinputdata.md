# NodeInputData

## `$input`.**`all()`**

**Description:** Returns an array of the current node’s input items

**Syntax:** `$input`.all(branchIndex?, runIndex?)

**Returns:** Array<Item>

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$input`.**`first()`**

**Description:** Returns the current node’s first input item

**Syntax:** `$input`.first(branchIndex?, runIndex?)

**Returns:** Item

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$input`.**`item`**

**Description:** Returns the input item currently being processed

**Syntax:** `$input`.`$input`.**`item`**

**Returns:** Item

**Type:** n8n

## `$input`.**`last()`**

**Description:** Returns the current node’s last input item

**Syntax:** `$input`.last(branchIndex?, runIndex?)

**Returns:** Item

**Type:** n8n

**Parameters:**

  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## `$input`.**`params`**

**Description:** The configuration settings of the current node. These are the parameters you fill out within the node when configuring it (e.g. its operation).

**Syntax:** `$input`.`$input`.**`params`**

**Returns:** NodeParams

**Type:** n8n

