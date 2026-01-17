# NodeOutputData

## first()

* **Description:** Returns the first item output by the node
* **Definition:** first(branchIndex?, runIndex?)
* **Returns:** Item
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## last()

* **Description:** Returns the last item output by the node
* **Definition:** last(branchIndex?, runIndex?)
* **Returns:** Item
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## itemMatching()

* **Description:** Returns the matching item, i.e. the one used to produce the item in the current node at the specified index. More info
* **Definition:** itemMatching(currentItemIndex?)
* **Returns:** Item
* **Source:** n8n
* **Parameters:**
  * `currentItemIndex` (Number) - The index of the item in the current node to be matched with.

## item

* **Description:** Returns the matching item, i.e. the one used to produce the current item in the current node. More info
* **Returns:** Item
* **Source:** n8n

## all()

* **Description:** Returns an array of the node’s output items
* **Definition:** all(branchIndex?, runIndex?)
* **Returns:** Array<Item>
* **Source:** n8n
* **Parameters:**
  * `branchIndex` (Number) - optional - The output branch of the node to use. Defaults to the first branch (index 0)
  * `runIndex` (Number) - optional - The run of the node to use. Defaults to the first run (index 0)

## isExecuted

* **Description:** Is `true` if the node has executed, `false` otherwise
* **Returns:** Boolean
* **Source:** n8n

## params

* **Description:** The configuration settings of the given node. These are the parameters you fill out within the node’s UI (e.g. its operation).
* **Returns:** NodeParams
* **Source:** n8n

