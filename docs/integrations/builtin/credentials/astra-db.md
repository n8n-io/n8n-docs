---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Astra DB credentials
description: Learn how to set up Astra DB credentials in n8n. Follow technical documentation to authenticate with Astra DB.
contentType: [integration, reference]
priority: medium
---

# Astra DB credentials

Use these credentials to authenticate with Astra DB in your n8n workflows.

## Prerequisites

- An Astra DB database
- An Astra DB application token

## Parameters

### Endpoint

The Astra DB endpoint URL for your database. This should be in the format:
```
https://{database-id}-{region}.apps.astra.datastax.com
```

Example:
```
https://01234567-89ab-cdef-0123-456789abcdef-us-east-1.apps.astra.datastax.com
```

### Token

Your Astra DB application token. This should start with `AstraCS:`.

To create an application token:
1. Go to your Astra DB dashboard
2. Navigate to your database
3. Go to the "Connect" tab
4. Click "Generate Token"
5. Copy the generated token

### Keyspace

The keyspace name in your Astra DB database. This is typically `default_keyspace` for new databases.

## Getting Started

1. **Create an Astra DB Database**:
   - Go to [Astra DB](https://astra.datastax.com/)
   - Sign up or log in to your account
   - Create a new database
   - Choose your region and database name

2. **Get Your Endpoint**:
   - In your database dashboard, go to the "Connect" tab
   - Copy the "API Endpoint" URL

3. **Generate an Application Token**:
   - In the same "Connect" tab
   - Click "Generate Token"
   - Give it a name and select the appropriate permissions
   - Copy the generated token (it starts with `AstraCS:`)

4. **Configure in n8n**:
   - Add the Astra DB credentials in n8n
   - Enter your endpoint, token, and keyspace
   - Test the connection

## Permissions

Your application token needs the following permissions for the Astra DB Vector Store node to work:

- **Database User**: Read and write access to collections
- **Collection Management**: Ability to create and manage collections
- **Vector Operations**: Ability to perform vector searches and insertions

## Security

- Keep your application token secure and never share it publicly
- Use environment variables to store sensitive credentials
- Regularly rotate your tokens
- Use the principle of least privilege when setting token permissions

## Troubleshooting

### Common Issues

**Invalid endpoint format**: Ensure your endpoint URL follows the correct format and includes the protocol (https://).

**Authentication failed**: Verify your token is correct and hasn't expired. Check that the token starts with `AstraCS:`.

**Database not found**: Ensure the database ID in your endpoint is correct and the database exists.

**Insufficient permissions**: Check that your token has the required permissions for the operations you're trying to perform.

**Keyspace not found**: Verify the keyspace name is correct. It's usually `default_keyspace` for new databases.

### Testing the Connection

n8n will automatically test your credentials when you save them. If the test fails:

1. Double-check your endpoint URL format
2. Verify your token is valid and has the correct permissions
3. Ensure your database is active and accessible
4. Check that the keyspace exists

## Resources

- [Astra DB Documentation](https://docs.datastax.com/en/astra-db-serverless/)
- [Astra DB Getting Started Guide](https://docs.datastax.com/en/astra-db-serverless/get-started/)
- [Application Tokens Guide](https://docs.datastax.com/en/astra-db-serverless/administration/manage-application-tokens/)
- [Astra DB Community Forums](https://community.datastax.com/)

For community support, refer to [Astra DB Community Forums](https://community.datastax.com/).
