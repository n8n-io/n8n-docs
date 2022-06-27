# Nodelinter

[TODO: update this to reflect using nodelinter from within the starter rather than assuming n8n install availability https://github.com/n8n-io/nodelinter]

[Nodelinter](https://github.com/n8n-io/nodelinter) is an extensible static analysis tool for checking your n8n node files. It helps you to follow n8n recommended best practices when developing new nodes.

This includes rules for:

* Alphabetization of node parameters and options
* Casing for display names and descriptions
* Default values for each parameter type
* Required and optional key-value pairs

See the full linting list [here](https://github.com/n8n-io/nodelinter/blob/master/src/lintings.ts) for more details.

## Installation and Usage

Nodelinter is a dependency of the `nodes-base` package and available upon [installing](/hosting/installation/) n8n.

You can run Nodelinter from the `packages/nodes-base` directory as follows:

```sh
npm run nodelinter -- --<options>
```

!!! note "Lint before submitting nodes"
    Run Nodelinter and verify your code before submitting a node to the community nodes repository.


## Options

| Option            | Description                                        | Example |
| ----------------- | -------------------------------------------------- | -------- |
| `--target`        | Path of the file or directory to lint              | Lint a single file:<br>`--target=nodes/Stripe/Stripe.node.ts` <br><br>Lint all files in a directory:<br>`--target=nodes/Stripe` |
| `--config`        | Path of the [custom configuration](#custom-configuration) to use | `--config=/Users/john/Documents/myConfig.json` |
| `--patterns`      | Lintable file patterns                             | `--patterns:.node.ts,Description.ts` |
| `--print`         | Print output to JSON<br><br>You can specify a custom filename. | `--print=myLintOutput` |
| `--errors-only`   | Enable error logs only                             |
| `--warnings-only` | Enable warning logs only                           |
| `--infos-only`    | Enable info logs only                              |

### Custom configuration

The Nodelinter [default configuration](https://github.com/n8n-io/nodelinter/blob/master/src/defaultConfig.ts){:target=_blank .external-link} can be overridden. For example, you can change the areas or issues linted.

To do so create a JSON file containing the key values you want to override. For example:

```json
{
  "target": "/Users/john/n8n/packages/nodes-base/nodes/Notion/Notion.node.ts",
  "patterns": [".node.ts"],
  "sortMethod": "lineNumber",
  "lintings": {
    "PARAM_DESCRIPTION_MISSING_WHERE_OPTIONAL": {
      "enabled": false
    },
    "NAME_WITH_NO_CAMELCASE": {
      "enabled": false
    }
  }
}
```

Name this file `nodelinter.config.json` and place it anywhere in your `nodes-base` directory and it will be automatically detected. Alternatively, you can specify the custom config file and location using the `--config` option.

## Lint exceptions

You can create exceptions for individual lines of code from any or all linting rules as follows:

```
// nodelinter-ignore-next-line <LINTING_NAME> <LINTING_NAME>
```

If no specific linting name is provided that line will be excepted from all rules. For example:

Exception for one rule:
```
// nodelinter-ignore-next-line PARAM_DESCRIPTION_WITH_EXCESS_WHITESPACE
description: 'Time zone used in the response.    The default is the time zone of the calendar.',
```

Exception for all rules:
```
// nodelinter-ignore-next-line
description: 'Time zone used in the response.    The default is the time zone of the calendar.',
```