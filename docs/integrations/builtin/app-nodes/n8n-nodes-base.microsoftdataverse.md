---
description: Create, update, delete, and query Microsoft Dataverse rows in n8n workflows.
layout:
  description:
    visible: false
---

# Microsoft Dataverse node

Use the Microsoft Dataverse node to automate work in Microsoft Dataverse and integrate it with other applications. You can create, read, update, and delete rows in standard and custom tables using the Dataverse Web API.

{% hint style="info" %}
**Credentials**

Refer to [Microsoft Dataverse credentials](../credentials/microsoftdataverse.md) for authentication setup. The node supports delegated user access and app-only access through the **Microsoft Dataverse OAuth2 API** credential.
{% endhint %}

## Operations

* **Row**
	* **Create**: Add a new row.
	* **Create or Update**: Create a row or update an existing row using a row ID or alternate key.
	* **Delete**: Delete a row.
	* **Get**: Get a row by its ID.
	* **Get Many**: Get multiple rows, with optional filtering and sorting.
	* **Update**: Update an existing row. This operation doesn't create a missing row.

## Select a table and row

Set **Resource** to **Row**, then select an **Operation**.

In **Table Name or ID**, choose **From List** to search your environment's tables. To enter a table manually, choose **By ID** and enter its Web API entity set name, such as `accounts` or `contacts`. This isn't the table's display name, singular logical name, or GUID.

For **Get**, **Update**, and **Delete**, use **Row ID** to select a row **From List** or enter its GUID **By ID**. For example, `00000000-0000-0000-0000-000000000001` has the required format. Replace it with the ID of a row in your environment.

Only **Create or Update** supports [alternate-key addressing](#create-or-update-a-row).

## Create and update rows

For **Create**, **Update**, and **Create or Update**, choose an **Input Mode**:

| Input mode | How to enter values |
| --- | --- |
| **JSON** (default) | Enter an object in **Row Item (JSON)**. Use column logical names as keys and the data types the columns expect. |
| **Fields (Key / Value Pairs)** | Under **Fields**, select **Add Field**, choose a **Field Name or ID**, and enter a **Field Value**. Repeat for each column. |

Provide at least one field. The node rejects an empty row item. The field picker shows writable columns for the selected operation. For **Create or Update**, it shows columns that support both creating and updating rows.

The **Field Value** input is a string field. The node doesn't automatically convert literal text to numbers or booleans. Use **JSON** when you need to preserve these types or send `null`.

### Create an account

To create an account, select **Create**, set **Table Name or ID** to `accounts`, and use **JSON** input. Enter this object in **Row Item (JSON)**:

```json
{
	"name": "Contoso",
	"accountnumber": "ACC-001",
	"numberofemployees": 25,
	"creditonhold": false
}
```

For **Update**, select the existing account's **Row ID** and send only the fields you want to change. For example, `{"telephone1": "555-0100"}` updates the phone number without replacing the other fields.

### Set lookup columns

A lookup column refers to a row in another table. When relationship metadata is accessible, the node converts lookup values to the navigation-property bindings Dataverse requires.

| Lookup type | Value to provide |
| --- | --- |
| One target table, such as `primarycontactid` on an account | A row GUID or a reference such as `/contacts(<contact-id>)`. |
| Multiple target tables, such as a Customer column | An explicit reference such as `/accounts(<account-id>)` or `/contacts(<contact-id>)`. A bare GUID is ambiguous. |
| Owner column | `/systemusers(<user-id>)` or `/teams(<team-id>)`. A bare GUID is ambiguous. |

Replace the angle-bracket placeholders with row GUIDs from your environment. You can omit the leading slash in these references.

For example, to set an account's primary contact and owner, include the following fields in **Row Item (JSON)**:

```json
{
	"primarycontactid": "/contacts(<contact-id>)",
	"ownerid": "/systemusers(<user-id>)"
}
```

You can also supply an explicit binding, such as `{"primarycontactid@odata.bind": "/contacts(<contact-id>)"}`. The node passes explicit bindings through unchanged. Use the exact, case-sensitive navigation property name from your table's metadata, which can differ from the column logical name.

To clear a single-target lookup, send `null`, for example `{"primarycontactid": null}`. For a multi-table lookup, clear the specific navigation property instead, if Dataverse permits clearing that relationship.

## Create or update a row

Select **Create or Update** to address a row using either of these **Identifier Type** values:

* **Row ID (GUID)**: Select or enter a **Row ID**. If the row doesn't exist, Dataverse creates it with that GUID.
* **Alternate Key**: Enter an **Alternate Key Predicate**, such as `accountnumber='ACC-001'`. Configure the alternate key on the table in Dataverse before using it.

Enter only the predicate, without the table name or surrounding parentheses. For a string key, keep the single quotes around the value. The node rejects URL delimiters, path separators, and control characters in the predicate.

Under **Options**, use **Behavior** to control the write:

| Behavior | Result |
| --- | --- |
| **Create or Update** (default) | Create the row if it doesn't exist, or update it if it does. |
| **Update Only** | Update an existing row. Fail if the row doesn't exist. |
| **Create Only** | Create a new row. Fail if the row already exists. |

For example, select the `accounts` table, choose **Alternate Key**, and enter `accountnumber='ACC-001'`. Send `{"name": "Contoso"}` in **Row Item (JSON)** to create or update the account with that account number.

## Query rows

The **Get** operation supports **Select Column Names or IDs** and **Expand Query** under **Options**. **Get Many** supports those options and additional filters, sorting, and result limits.

### Get many rows with OData

Select **Get Many** and configure the following parameters:

| Parameter | Default | Description |
| --- | --- | --- |
| **Return All** | Off | Follow OData pagination links until no more results remain. |
| **Limit** | `50` | Maximum number of rows to return when **Return All** is off. Minimum: `1`. |
| **Select Column Names or IDs** | None selected | Choose the columns to retrieve. Leave empty to use Dataverse's default projection. |
| **Filter Rows** | Empty | OData filter expression, such as `statecode eq 0`. Don't include the `$filter=` prefix. |
| **Expand Query** | Empty | OData expression to retrieve related rows, such as `primarycontactid($select=fullname)`. |
| **Sort Column Name or ID** | None selected | Column to sort by. |
| **Sort Direction** | **Ascending** | Sort direction for the selected column. |
| **Sort By Override** | Empty | Raw OData sort expression, such as `createdon desc, name asc`. Used only when **Sort Column Name or ID** is empty. |
| **Row Count ($Top)** | Unset | Server-side cap on results. Overrides the `$top` value derived from **Limit** and disables server-driven paging. |

For example, to retrieve up to 100 active accounts whose names start with `Contoso`:

1. Set **Table Name or ID** to `accounts`.
2. Leave **Return All** off and set **Limit** to `100`.
3. Under **Options**, select `name` and `accountnumber` in **Select Column Names or IDs**.
4. Set **Filter Rows** to `statecode eq 0 and startswith(name,'Contoso')`.
5. Set **Sort Column Name or ID** to `name` and **Sort Direction** to **Ascending**.

The read-column pickers use lookup property names such as `_primarycontactid_value` automatically. When writing raw filters or sort expressions, use that property form for lookup GUIDs. For example, filter by `_primarycontactid_value eq <contact-id>`, replacing `<contact-id>` with the GUID without quotes. Use navigation property names for **Expand Query**.

### Pagination and result limits

For OData queries, the node follows `@odata.nextLink` until it reaches **Limit** or retrieves all available results.

When **Limit** is 5,000 or less, the node also sends it as `$top`. For larger limits, the node leaves `$top` unset so Dataverse can return multiple pages. An explicit **Row Count ($Top)** takes precedence and can restrict results even when **Return All** is on.

To retrieve more than 5,000 rows, leave **Row Count ($Top)** unset and either enable **Return All** or set **Limit** above 5,000. These paging rules apply to OData queries, not FetchXML.

### Use FetchXML

Set **Options** > **FetchXML Query** to run a FetchXML query. It replaces the OData select, filter, sort, expand, and top options. Keep **Return All** off and set **Limit** to cap the returned rows.

For example, select the `accounts` table and enter this query to retrieve up to 50 active accounts:

```xml
<fetch top="50">
	<entity name="account">
		<attribute name="name" />
		<attribute name="accountnumber" />
		<filter>
			<condition attribute="statecode" operator="eq" value="0" />
		</filter>
	</entity>
</fetch>
```

FetchXML uses the table's logical name, `account`, even though **Table Name or ID** uses the entity set name, `accounts`.

{% hint style="warning" %}
**FetchXML pagination**

The Microsoft Dataverse node doesn't support FetchXML pagination. **FetchXML Query** with **Return All** produces an error. Turning off **Return All** avoids the error, but increasing **Limit** doesn't retrieve additional FetchXML pages. Use an OData query for automatic pagination.
{% endhint %}

## Work with elastic tables

For **Get**, **Get Many**, and **Delete**, set **Options** > **Partition ID** when you need to target an elastic-table partition.

**Create**, **Update**, and **Create or Update** don't expose a **Partition ID** option. For **Create**, include `partitionid` in the row JSON when creating a partitioned row.

To update or upsert a partitioned row, use **Create or Update** with **Identifier Type** set to **Alternate Key**. Include the table's primary key and `partitionid` in **Alternate Key Predicate**:

```text
<primary-key-column>=<row-id>,partitionid='<partition-id>'
```

Replace the placeholders with your table's primary key column logical name, row GUID, and partition ID. Set **Behavior** to **Update Only** if the row must already exist. Refer to Microsoft's [elastic table documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/use-elastic-tables) for table-specific behavior and restrictions.

## Output and metadata

* **Create**, **Update**, and **Create or Update** request the row after the write and return Dataverse's response.
* **Get** returns a single row.
* **Get Many** returns each row as a separate n8n item, rather than a collection inside a `value` field.
* **Delete** returns `{"success": true, "id": "<row-id>"}` after a successful deletion.

All operations except **Delete** offer **Options** > **Return Full Metadata**, which is off by default. Turn it on to request OData annotations, including formatted values where Dataverse provides them. The node doesn't rename columns or simplify annotations.

## Common issues

### Table or column options don't load

Check the HTTP status and Dataverse error shown in the picker. Verify the environment URL and credential access, including access to table metadata. Refer to [Microsoft Dataverse credential troubleshooting](../credentials/microsoftdataverse.md#common-issues).

If you know the table's entity set name, you can enter it using **Table Name or ID** > **By ID**. This doesn't bypass Dataverse permissions.

### A lookup value is rejected

Don't use a display name as a lookup value. Use a GUID for a single-target lookup, or a reference containing the entity set name and row ID. Customer and Owner columns need an explicit target table. Refer to [Set lookup columns](#set-lookup-columns) for examples.

### A query returns fewer rows than expected

Check **Limit**, remove **Row Count ($Top)** if you need paging, and confirm whether the query uses FetchXML. Refer to [Pagination and result limits](#pagination-and-result-limits) and [Use FetchXML](#use-fetchxml).

## Related resources

* [Microsoft Dataverse credentials](../credentials/microsoftdataverse.md)
* [Dataverse Web API documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview)
* [Query data using the Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query/overview)
* [Use alternate keys with the Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/use-alternate-key-reference-record)