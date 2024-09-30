For example, there's an Execute Workflow node in **Workflow A**. The Execute Workflow node calls another workflow, **Workflow B**:

1. The Execute Workflow node passes the data to the Execute Workflow Trigger node of **Workflow B**.
2. The last node of **Workflow B** sends the data back to the Execute Workflow node in **Workflow A**.
