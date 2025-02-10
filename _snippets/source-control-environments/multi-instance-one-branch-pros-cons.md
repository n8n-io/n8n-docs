The advantage of this pattern is that work is instantly available to other environments when you push from one instance.

The disadvantages are:

* If you push by mistake, there is a risk the work will make it into your production instance. If you [use a GitHub Action to automate pulls](/source-control-environments/create-environments.md#optional-use-a-github-action-to-automate-pulls) to production, you must either use the multi-instance, multi-branch pattern, or be careful to never push work that you don't want in production.
* Pushing and pulling to the same instance can cause data loss as changes are overridden when performing these actions. You should set up processes to ensure content flows in one direction.
