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
}
```

![JSON](/_images/integrations/creating-nodes/json.png)

