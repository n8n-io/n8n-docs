---
title: code-node
---
Use the Code node to write custom JavaScript or Python and run it as a step in your workflow.

{% hint style="info" %}
**Coding in n8n**

This page gives usage information about the Code node. For more guidance on coding in n8n, refer to the [Code](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n) section. It includes:

* Reference documentation on [Built-in methods and variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/use-built-in-shortcuts)
* Guidance on [Handling dates](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/handle-special-data-types/work-with-dates-and-times) and [Querying JSON](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/handle-special-data-types/query-json-data)
* A growing collection of examples in the [Cookbook](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/cookbook/code-node)
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Code integrations](https://n8n.io/integrations/code/) page.
{% endhint %}

{% hint style="info" %}
**Function and Function Item nodes**

The Code node replaces the Function and Function Item nodes from version 0.198.0. If you're using an older version of n8n, you can still view the [Function node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.function.md) and [Function Item node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.functionItem.md).
{% endhint %}
## Usage <a href="#usage" id="usage"></a>

How to use the Code node.

### Choose a mode <a href="#choose-a-mode" id="choose-a-mode"></a>

There are two modes:

* **Run Once for All Items**: this is the default. When your workflow runs, the code in the code node executes once, regardless of how many input items there are.
* **Run Once for Each Item**: choose this if you want your code to run for every input item.

## JavaScript <a href="#javascript" id="javascript"></a>

The Code node supports Node.js.

### Supported JavaScript features <a href="#supported-javascript-features" id="supported-javascript-features"></a>

The Code node supports:

* Promises. Instead of returning the items directly, you can return a promise which resolves accordingly.
* Writing to your browser console using `console.log`. This is useful for debugging and troubleshooting your workflows.

### External libraries <a href="#external-libraries" id="external-libraries"></a>

If you self-host n8n, you can import and use built-in and external npm modules in the Code node. To learn how to enable external modules, refer to the [Enable modules in Code node](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-modules-in-code-node) guide.

If you use n8n Cloud, you can't import external npm modules. n8n makes two modules available for you:

* [crypto Node.js module](https://nodejs.org/docs/latest-v18.x/api/crypto.html)
* [moment npm package](https://www.npmjs.com/package/moment)

### Built-in methods and variables <a href="#built-in-methods-and-variables" id="built-in-methods-and-variables"></a>

n8n provides built-in methods and variables for working with data and accessing n8n data. Refer to [Built-in methods and variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/use-built-in-shortcuts) for more information.

The syntax to use the built-in methods and variables is `$variableName` or `$methodName()`. Type `$` in the Code node or expressions editor to see a list of suggested methods and variables.

### Keyboard shortcuts <a href="#keyboard-shortcuts" id="keyboard-shortcuts"></a>

The Code node editing environment supports time-saving and useful keyboard shortcuts for a range of operations from autocompletion to code-folding and using multiple-cursors. See the full list of [keyboard shortcuts](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts).

## Python (Pyodide - legacy) <a href="#python-pyodide-legacy" id="python-pyodide-legacy"></a>

Pyodide is a legacy feature. n8n v2 no longer supports this feature.

n8n added Python support in version 1.0. It doesn't include a Python executable. Instead, n8n provides Python support using [Pyodide](https://pyodide.org/en/stable/), which is a port of CPython to WebAssembly. This limits the available Python packages to the [Packages included with Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide). n8n downloads the package automatically the first time you use it.

{% hint style="info" %}
**Slower than JavaScript**

The Code node takes longer to process Python than JavaScript. This is due to the extra compilation steps.
{% endhint %}
### Built-in methods and variables <a href="#built-in-methods-and-variables" id="built-in-methods-and-variables"></a>

n8n provides built-in methods and variables for working with data and accessing n8n data. Refer to [Built-in methods and variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/use-built-in-shortcuts) for more information.

The syntax to use the built-in methods and variables is `_variableName` or `_methodName()`. Type `_` in the Code node to see a list of suggested methods and variables.

### Keyboard shortcuts <a href="#keyboard-shortcuts" id="keyboard-shortcuts"></a>

The Code node editing environment supports time-saving and useful keyboard shortcuts for a range of operations from autocompletion to code-folding and using multiple-cursors. See the full list of [keyboard shortcuts](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts).

## File system and HTTP requests <a href="#file-system-and-http-requests" id="file-system-and-http-requests"></a>

You can't access the file system or make HTTP requests. Use the following nodes instead:

* [Read/Write File From Disk](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.readwritefile)
* [HTTP Request](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.httprequest)

## Python (Native) <a href="#python-native" id="python-native"></a>

n8n added native Python support using task runners in version 1.111.0. This feature is stable as of n8n v2. 

Main differences from Pyodide:

- Native Python supports only `_items` in all-items mode and `_item` in per-item mode. It doesn't support other n8n built-in methods and variables.
- On self-hosted, native Python supports importing native Python modules from the standard library and from third-parties, if the `n8nio/runners` image includes them and explicitly allowlists them. See [adding extra dependencies for task runners](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/set-up-task-runners#adding-extra-dependencies) for more details.
- Native Python denies insecure built-ins by default. See [task runners environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/task-runners) for more details.
- Unlike Pyodide, which accepts dot access notation, for example, `item.json.myNewField`, native Python only accepts bracket access notation, for example, `item["json"]["my_new_field"]`. There may be other minor syntax differences where Pyodide accepts constructs that aren't legal in native Python.
- On n8n cloud, the Python option for the Code node doesn't allow users to import any Python libraries — whether from the standard library or third-party packages. Self-hosting users can find setup instructions to include external libraries [here](https://docs.n8n.io/hosting/configuration/task-runners/#adding-extra-dependencies). In the long term, the n8n team is committed to allowing users to securely execute arbitrary Python code with any first- and third-party libraries using task runners.

Upgrading to native Python is a breaking change, so you may need to adjust your Python scripts to use the native Python runner. 

## Coding in n8n <a href="#coding-in-n8n" id="coding-in-n8n"></a>

There are two places where you can use code in n8n: the Code node and the expressions editor. When using either area, there are some key concepts you need to know, as well as some built-in methods and variables to help with common tasks.

### Key concepts <a href="#key-concepts" id="key-concepts"></a>

When working with the Code node, you need to understand the following concepts:

* [Data structure](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure): understand the data you receive in the Code node, and requirements for outputting data from the node.
* [Item linking](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/reference-data/link-data-items): learn how data items work, and how to link to items from previous nodes. You need to handle item linking in your code when the number of input and output items doesn't match.

### Built-in methods and variables <a href="#built-in-methods-and-variables" id="built-in-methods-and-variables"></a>

n8n includes built-in methods and variables. These provide support for:

* Accessing specific item data
* Accessing data about workflows, executions, and your n8n environment
* Convenience variables to help with data and time

Refer to [Built-in methods and variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/use-built-in-shortcuts) for more information.



## Use AI in the Code node <a href="#use-ai-in-the-code-node" id="use-ai-in-the-code-node"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/gvo0l6HUfoQWSJcu8JMl/" %}
