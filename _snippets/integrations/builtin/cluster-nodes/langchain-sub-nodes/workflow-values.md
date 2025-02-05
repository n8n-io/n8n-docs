Set values to pass to the workflow you're calling.

These values appear in the output data of the trigger node in the workflow you call. You can access these values in expressions in the workflow. For example, if you have:

* **Workflow Values** with a **Name** of `myCustomValue`
* A workflow with an Execute Sub-workflow Trigger node as its trigger

The expression to access the value of `myCustomValue` is `{{ $('Execute Sub-workflow Trigger').item.json.myCustomValue }}`.
