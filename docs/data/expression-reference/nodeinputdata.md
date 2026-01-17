# NodeInputData

## item

* **Description:** Returns the input item currently being processed
* **Returns:** Item
* **Source:** n8n

## all()

* **Description:** Returns an array of the current node’s input items
* **Definition:** all(branchIndex?, runIndex?)
* **Returns:** Array<Item>
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## params

* **Description:** The configuration settings of the current node. These are the parameters you fill out within the node when configuring it (e.g. its operation).
* **Returns:** NodeParams
* **Source:** n8n

## first()

* **Description:** Returns the current node’s first input item
* **Definition:** first(branchIndex?, runIndex?)
* **Returns:** Item
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## last()

* **Description:** Returns the current node’s last input item
* **Definition:** last(branchIndex?, runIndex?)
* **Returns:** Item
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch index of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

