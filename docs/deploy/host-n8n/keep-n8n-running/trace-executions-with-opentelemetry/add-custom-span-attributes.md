---
description: >-
  Add your own attributes to the project, workflow, and node spans that n8n
  exports, and change their prefixes.
layout:
  description:
    visible: false
status: preview
---

# Add custom span attributes

You can add custom attributes to project, workflow, and node spans. n8n exports each custom attribute as an OpenTelemetry span attribute to your configured observability backend.

{% hint style="info" %}
**Preview status**

OpenTelemetry tracing is in Preview and may change in future releases. Avoid relying on it in production workflows. Refer to [Understand feature availability](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/understand-feature-availability#feature-maturity-preview-ga-deprecated-and-removed) for what Preview means.
{% endhint %}

{% hint style="info" %}
**Feature availability**

Custom span attributes are available on:

- **Self-hosted:** Enterprise

They aren't available on n8n Cloud.

Project and workflow custom span attributes are available from n8n 2.24.0. Node custom span attributes are available from n8n 2.22.0.
{% endhint %}

Don't include secrets, personal data, or other sensitive values in attribute values.

n8n supports the following custom attribute levels:

| Level | Configure in | Exported span | Default attribute prefix |
| :---- | :----------- | :------------ | :--------------- |
| Project | **Project settings** | `workflow.execute`, and `node.execute` from n8n 2.42.0 | `n8n.project.custom.<key>` |
| Workflow | **Workflow settings** | `workflow.execute` | `n8n.workflow.custom.<key>` |
| Node | Node **Settings** tab | `node.execute` | `n8n.node.custom.<key>` |

## Add project span attributes <a href="#add-project-span-attributes" id="add-project-span-attributes"></a>

To add project-level span attributes:

1. Open a project.
1. Select **Project settings**.
1. Under **Custom Span Attributes**, add one or more span attributes.
1. Select **Save**.

Use plain text for project attribute values.

## Add workflow span attributes <a href="#add-workflow-span-attributes" id="add-workflow-span-attributes"></a>

To add workflow-level span attributes:

1. Open the workflow.
1. Open **Workflow settings**.
1. Under **Custom Span Attributes**, select **Configure**.
1. Add one or more span attributes.
1. Select **Save**.

Use plain text for workflow attribute values.

## Add node span attributes <a href="#add-node-span-attributes" id="add-node-span-attributes"></a>

To add node-level span attributes:

1. Open the node and select the **Settings** tab.
1. Under **Custom Span Attributes**, select **Add Attribute**.
1. Enter a **Key**. Keys must be plain text.
1. Enter a **Value**. Values can be plain text or expressions, such as `={{ $json.environment }}`.

Node attribute values must resolve to a string, number, or boolean.

## Add attributes programmatically in a custom node <a href="#add-attributes-programmatically-in-a-custom-node" id="add-attributes-programmatically-in-a-custom-node"></a>

If you're [building a custom node](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/overview), you can attach custom key-value pairs from code. Call `setMetadata` from the node's `execute` method:

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	this.setMetadata({
		tracing: {
			'llm.model': 'gpt-4o',
			'llm.token.input': 1500,
			'llm.token.output': 340,
		},
	});

	return [this.getInputData()];
}
```

By default, n8n prefixes each key with `n8n.node.custom.`. You can [change the attribute prefixes](#change-the-attribute-prefixes). Values must be strings, numbers, or boolean.

This API isn't available from the Code node. It's intended for node authors who want to enrich spans with domain-specific data.

If a node sets an attribute key here that's also configured as a [custom node span attribute](#add-node-span-attributes), the programmatic value takes precedence.

## Change the attribute prefixes

{% hint style="info" %}
**Feature availability**

Custom attribute prefixes are available from n8n 2.46.0.
{% endhint %}

n8n adds a prefix to custom attribute keys. To change or remove the prefix, set `N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES` to a JSON object. The object accepts these keys, each with a string value:

| Key | Sets the prefix for | Default prefix |
| :-- | :------------------ | :------------- |
| `project` | Project attributes | `n8n.project.custom.` |
| `workflow` | Workflow attributes | `n8n.workflow.custom.` |
| `node` | Node attributes | `n8n.node.custom.` |

An empty string removes the prefix. A key you leave out keeps its default prefix. Set the same value on the main instance, workers, and webhook processors.

To remove both prefixes and use attribute names exactly as entered in the UI:

```bash
# A project attribute named team becomes team
export N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES='{"project":"","node":""}'
```

Set custom prefixes:

```bash
# A project attribute named team becomes acme.project.team
export N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES='{"project":"acme.project.","node":"acme.node."}'
```

Change only one prefix:

```bash
# A project attribute named team becomes acme.team
# Node attributes keep their default prefix
export N8N_OTEL_TRACES_CUSTOM_ATTRIBUTE_PREFIXES='{"project":"acme."}'
```

If the value isn't valid JSON, uses any other key, or has a non-string value, n8n logs a warning and uses the default prefixes for all levels.

If you change a prefix, a custom key can end up the same as another key on the same span:

- If it's the same as a built-in attribute, such as `n8n.workflow.id` or `service.name`, n8n keeps its own value and drops yours.
- If two levels use the same key, the more specific level wins. Node wins over workflow, and workflow wins over project.

{% hint style="warning" %}
**OpenTelemetry standard attributes**

n8n doesn't check custom keys against the [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/). If your key matches a standard attribute, such as `user.id` or `http.request.method`, your backend reads your value as that attribute. Avoid standard keys unless your value has the standard meaning.
{% endhint %}

## Change exported telemetry with an external hook

{% hint style="info" %}
**Feature availability**

The `otel.configure` external hook is available from n8n 2.47.0.
{% endhint %}

With the `otel.configure` [external hook](../../configure-n8n/external-hooks.md), you can add your own resource attributes and `baggage` entries to what n8n sends. n8n runs the hook once when it starts. If you change the hook file, restart n8n.

The hook gives you four functions. You pass each one a function of your own, called a mapper:

| Function | What it does |
| :------- | :----------- |
| `registerResourceAttributeMapper` | Adds resource attributes to each exported span. n8n keeps its own value for `service.name`, `service.version`, `n8n.instance.id`, and `n8n.instance.role`. |
| `registerOutboundBaggageMapper` | Adds entries to the `baggage` header on outbound requests. You need [outbound trace headers](propagate-trace-context.md#outbound-trace-headers) turned on and `baggage` included in `OTEL_PROPAGATORS`. |
| `dangerouslyOverrideResourceAttributes` | From n8n 2.49.0. Replaces resource attributes that n8n sets, such as `service.name`. |
| `dangerouslyOverrideSpanAttributes` | From n8n 2.49.0. Replaces attributes on each exported span, such as `gen_ai.agent.id`. Return `{}` for spans you don't want to change. |

{% hint style="warning" %}
**Use your collector instead**

n8n doesn't recommend the `dangerouslyOverride` functions. Change n8n's own attributes in your OpenTelemetry Collector, and use these functions only when you have no other way.
{% endhint %}

A mapper gets the attributes of one span and returns an object of keys and values:

- Return string values. n8n ignores other values.
- Don't make the mapper `async`.
- If a mapper throws an error, n8n logs a warning and skips it.
- In a `dangerouslyOverride` mapper, n8n ignores keys that start with `n8n.`.

To try the example below, save it as a file. Then set `EXTERNAL_HOOK_FILES` to its path on the main instance, workers, and webhook processors:

```js
// Copy the project ID to a resource attribute and a baggage entry
const projectIdFrom = (spanAttributes) => {
	const projectId = spanAttributes['n8n.project.id'];
	return typeof projectId === 'string' ? { 'project.id': projectId } : {};
};

module.exports = {
	otel: {
		configure: [
			async (api) => {
				api.registerResourceAttributeMapper(projectIdFrom);
				api.registerOutboundBaggageMapper(projectIdFrom);
			},
		],
	},
};
```

## Related resources

- [Trace executions with OpenTelemetry](./)
- [Set up OpenTelemetry tracing](set-up-tracing.md)
- [Choose which spans n8n exports](choose-which-spans-n8n-exports.md)
- [Propagate trace context](propagate-trace-context.md)
- [Span reference](span-reference.md)
- [Troubleshoot OpenTelemetry tracing](troubleshoot-tracing.md)
- [OpenTelemetry environment variables](../../configure-n8n/basic-configuration/use-environment-variables/opentelemetry.md)
