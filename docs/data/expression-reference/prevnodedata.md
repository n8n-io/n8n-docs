# PrevNodeData

## outputIndex

* **Description:** The index of the output connector that the current input came from. Use this when the previous node had multiple outputs (such as an ‘If’ or ‘Switch’ node). 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 
* **Returns:** Number
* **Source:** n8n

## name

* **Description:** The name of the node that the current input came from. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node).
* **Returns:** String
* **Source:** n8n

## runIndex

* **Description:** The run of the previous node that generated the current input. 

Always uses the current node’s first input connector if there is more than one (e.g. in the ‘Merge’ node). 
* **Returns:** Number
* **Source:** n8n

