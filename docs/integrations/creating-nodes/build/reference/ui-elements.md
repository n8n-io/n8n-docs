# Node user interface elements

n8n provides a set of predefined UI components (based on a JSON file) that allows users to input all sorts of data types. The following UI elements are available in n8n.

## String

Basic configuration:

```typescript
{
	displayName: Name, // The value the user sees in the UI
	name: name, // The name used to reference the element UI within the code
	type: string,
	required: true, // Whether the field is required or not
	default: 'n8n',
	description: 'The name of the user',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```


![String](/_images/integrations/creating-nodes/string.png)


String field for inputting passwords:

```typescript
{
	displayName: 'Password',
	name: 'password',
	type: 'string',
	required: true,
	typeOptions: {
		password: true,
	},
	default: '',
	description: `User's password`,
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Password](/_images/integrations/creating-nodes/password.png)


String field with more than one row:

```typescript
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: true,
	typeOptions: {
		rows: 4,
	},
	default: '',
	description: 'Description',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Multiple rows](/_images/integrations/creating-nodes/multiple-rows.png)

## Number

Basic configuration:

```typescript
{
	displayName: 'Age',
	name: 'age',
	type: 'number',
	required: true,
	typeOptions: {
		maxValue: 10,
		minValue: 0,
		numberStepSize: 1,
	},
	default: 10,
	description: 'Your current age',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Number](/_images/integrations/creating-nodes/number.png)

Number field with decimal points:

```typescript
{
	displayName: 'Amount',
	name: 'amount',
	type: 'number',
	required: true,
	typeOptions: {
		numberPrecision: 2,
	},
	default: 10.00,
	description: 'Your current amount',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Decimal](/_images/integrations/creating-nodes/decimal.png)

## Collection

Use the `collection` type when you need to display optional fields.

```typescript
{
	displayName: 'Filters',
	name: 'filters',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	options: [
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			options: [
				{
					name: 'Automated',
					value: 'automated',
				},
				{
					name: 'Past',
					value: 'past',
				},
				{
					name: 'Upcoming',
					value: 'upcoming',
				},
			],
			default: '',
		},
	],
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Collection](/_images/integrations/creating-nodes/collection.png)


## DateTime

The `dateTime` type provides a date picker.

```typescript
{
	displayName: 'Modified Since',
	name: 'modified_since',
	type: 'dateTime',
	default: '',
	description: 'The date and time when the file was last modified',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![DateTime](/_images/integrations/creating-nodes/datetime.png)



## Boolean

The `boolean` type adds a toggle for entering true or false.

```typescript
{
	displayName: 'Wait for Image',
	name: 'waitForImage',
	type: 'boolean',
	default: true, // Initial state of the toggle
	description: 'Whether to wait for the image or not',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Boolean](/_images/integrations/creating-nodes/boolean.png)

## Color

The `color` type provides a color selector.

```typescript
{
	displayName: 'Background Color',
	name: 'backgroundColor',
	type: 'color',
	default: '', // Initially selected color
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Color](/_images/integrations/creating-nodes/color.png)

## Options

The `options` type adds an options list. Users can select a single value.

```typescript
{
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	options: [
		{
			name: 'Image',
			value: 'image',
		},
		{
			name: 'Template',
			value: 'template',
		},
	],
	default: 'image', // The initially selected option
	description: 'Resource to consume',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Options](/_images/integrations/creating-nodes/options.png)

## Multi options

The `multiOptions` type adds an options list. Users can select more than one value.

```typescript
{
	displayName: 'Events',
	name: 'events',
	type: 'multiOptions',
	options: [
		{
			name: 'Plan Created',
			value: 'planCreated',
		},
		{
			name: 'Plan Deleted',
			value: 'planDeleted',
		},
	],
	default: [], // Initially selected options
	description: 'The events to be monitored',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Multioptions](/_images/integrations/creating-nodes/multioptions.png)


## Fixed collection

Use the `fixedCollection` type to group fields that are semantically related.

```typescript
{
	displayName: 'Metadata',
	name: 'metadataUi',
	placeholder: 'Add Metadata',
	type: 'fixedCollection',
	default: '',
	typeOptions: {
		multipleValues: true,
	},
	description: '',
	options: [
		{
			name: 'metadataValues',
			displayName: 'Metadata',
			values: [
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: 'Name of the metadata key to add.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					description: 'Value to set for the metadata key.',
				},
			],
		},
	],
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![Fixed collection](/_images/integrations/creating-nodes/fixed-collection.png)

## JSON

```typescript
{
	displayName: 'Content (JSON)',
	name: 'content',
	type: 'json',
	default: '',
	description: '',
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

![JSON](/_images/integrations/creating-nodes/json.png)

## Resource locator

![Resource locator](/_images/integrations/creating-nodes/resource-locator.png)

The resource locator element helps users find a specific resource in an external service, such as a card or label in Trello. 

The following options are available:

* ID
* URL
* List: allows users to select or search from a prepopulated list. This option requires more coding, as you must populate the list, and handle searching if you choose to support it.

You can choose which types to include.

Example:

```typescript
{
	displayName: 'Card',
	name: 'cardID',
	type: 'resourceLocator',
	default: '',
	description: 'Get a card'
	modes: [
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			hint: 'Enter an ID',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '^[0-9]'
						errorMessage: 'The ID must start with a number'
					},	
				},
			],
			placeholder: '12example',
			// How to use the ID in API call
			url: '=http://api-base-url.com/?id={{$value}}'
		},
		displayName: 'URL',
		name: 'url',
		type: 'string',
		hint: 'Enter a URL',
		validation: [
			{
				type: 'regex',
					properties: {
						regex: '^http'
						errorMessage: 'Invalid URL'
					},	
			},
		],
		placeholder: 'https://example.com/card/12example/',
		// How to get the ID from the URL
		extractValue: {
			type: 'regex',
			regex: 'example\.com\/card\/([0-9]*.*)\/'
		},
		displayName: 'List',
		name: 'list',
		type: 'list',
		typeOptions: {
			// You must always provide a search method
			// Write this method within the methods object in your base file
			// The method must populate the list, and handle searching if searchable: true
			searchListMethod: 'searchMethod'
			// If you want users to be able to search the list
			searchable: true,
			// Set to true if you want to force users to search
			// When true, users can't browse the list
			// Or false if users can browse a list
			searchFilterRequired: true
		}
	],
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				// comma-separated list of resource names
			],
			operation: [
				// comma-separated list of operation names
			]
		}
	},
}
```

Refer to the following for live examples:

* Refer to [`CardDescription.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Trello/CardDescription.ts){:target=_blank .external-link} and [`Trello.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Trello/Trello.node.ts){:target=_blank .external-link}  in n8n's Trello node for an example of a list with search that includes `searchFilterRequired: true`.
* Refer to [`GoogleDrive.node.ts`](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Drive/GoogleDrive.node.ts){:target=_blank .external-link} for an example where users can browse the list or search.





