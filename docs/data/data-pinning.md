---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Data pinning

You can 'pin' data during workflow development. Data pinning means saving the output data of a node, and using the saved data instead of fetching fresh data in future workflow executions. 


You can use this when working with data from external sources, to avoid having to repeatedly use the external system. This can save time and resources:

* If your workflow relies on an external system to trigger it, such as a webhook call, being able to pin data means you don't need to use the external system every time you test the workflow.
* If the external resource has data or usage limits, pinning data during tests avoids consuming your resource limits.
* You can fetch and pin the data you want to test, then have confidence that the data is consistent in all your workflow tests.

/// note | For development only
Data pinning isn't available for production workflow executions. It's a feature to help test workflows during development.
///

## Pin data

--8<-- "_snippets/data/how-to-pin-data.md"

## Unpin data

When data pinning is active, the button changes to show this <span class="inline-image">![Active pin data icon](/_images/data/data-pinning/data-pinning-button-active.png){.off-glb}</span>. To unpin data and fetch fresh data on the next execution, select the active **Pin data** <span class="inline-image">![Active pin data icon](/_images/data/data-pinning/data-pinning-button-active.png){.off-glb}</span> icon.



