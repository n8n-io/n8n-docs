# Node base file

The node base file contains the core code of your node. All nodes must have a base file. The contents of this file are different depending on whether you're building a declarative-style or programmatic-style node. For guidance on which style to use, refer to [Choose your node building approach](/integrations/creating-nodes/plan/choose-node-method/).

## Structure of the node base file

The node base file follows this basic structure:

1. Import statements
2. Create a class for the node
3. Within the node class, create a `description` object, which defines the node.

A programmatic-style node also has an `execute()` method, which reads incoming data and parameters, then builds a request. The declarative style handles this using the `routing` key in the `properties` object.

## Shared options

These parameters are the same for all node types.



## Declarative-style options

## Programmatic-style options