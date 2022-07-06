---
title: Transformations
description: 
tags:
  - Insight²
---

# Transformations

Transformations can be enabled on queries to transform the query results. Let's write a simple transformation to compute `first_name` and `last_name` for all the customers that we fetch in the previous step.

```javascript
// write your code here
// return value will be set as data and the original data will be available as rawData
return data.map((row) => {
  return {
    ...row,
    first_name: row.name.split(' ')[0],
    last_name: row.name.split(' ')[1],
  };
});
```

The query will now look like this:



![Insight - Tutorial - Query result transformations](/_images/insight2/tutorial/transformations/transform.png)

</div>

Click the `create` button to create the query. Saved queries can be run using the `run` icon near the query name. Queries run using the run button will behave just as if it was triggered by an app event like button click and thus will alter the state of the app. You can view the query results using the state inspector on the left side-bar of the app builder.



![Insight - Tutorial - Query result transformations](/_images/insight2/tutorial/transformations/result.png)

</div>

We can see that `first_name` and `last_name` are added to all the rows in the `data` object of the query. If you need the original data of the query, it will be available in the `rawData` object of the query.



![Insight - Tutorial - Query result transformations](/_images/insight2/tutorial/transformations/rawdata.png)

</div>

In the next section, we will see how we can display this data using Insight's built-in widgets.
