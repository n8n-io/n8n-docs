# Time Saved node


the time that is in the software
The Time Saved node lets you track and retrieve time saved using automation tools.

## Operations

The Time Saved node has the following operations:

- Get Time Saved
- Update Time Saved

## Get Time Saved

Returns total hours saved across selected tools.

### Parameters

| Name        | Type     | Required | Description          | Example    |
|-------------|----------|----------|----------------------|------------|
| Tool        | String   | Yes      | Which tool to query  | n8n        |
| Date Range  | String   | No       | Days back to check   | 30         |

### Example

Request:
```json
{
  "tool": "n8n",
  "dateRange": 30
}
