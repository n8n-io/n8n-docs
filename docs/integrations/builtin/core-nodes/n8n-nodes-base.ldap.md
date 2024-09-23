---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: LDAP
description: Documentation for the LDAP node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# LDAP

This node allows you to interact with your LDAP servers to create, find, and update objects.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ldap/).
///

## Operations

* [**Compare**](#compare) an attribute
* [**Create**](#create) a new entry
* [**Delete**](#delete) an entry
* [**Rename**](#rename) the DN of an existing entry
* [**Search**](#search) LDAP
* [**Update**](#update) attributes

Refer to the sections below for details on configuring the node for each operation.

## Compare

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **DN**: Enter the Distinguished Name (DN) of the entry to compare.
* **Attribute ID**: Enter the ID of the attribute to compare.
* **Value**: Enter the value to compare.

## Create

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **DN**: Enter the Distinguished Name (DN) of the entry to create.
* **Attributes**: Add the **Attribute ID**/**Value** pairs you'd like to create.

## Delete

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **DN**: Enter the Distinguished Name (DN) of the entry to be deleted.

## Rename

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **DN**: Enter the current Distinguished Name (DN) of the entry to rename.
* **New DN**: Enter the new Distinguished Name (DN) for the entry in this field.

## Search

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **Base DN**: Enter the Distinguished Name (DN) of the subtree to search in.
* **Search For**: Select the directory object class to search for.
* **Attribute**: Select the attribute to search for.
* **Search Text**: Enter the text to search for. Use `*` for a wildcard.
* **Return All**: When turned on, the node will return all results. When turned off, the node will return results up to the set **Limit**.
* **Limit**: Only available when you turn off **Return All**. Enter the maximum number of results to return.

### Search options

You can also configure this operation using these options:

* **Attribute Names or IDs**: Enter a comma-separated list of attributes to return. Choose from the list or specify IDs using an expression.
* **Page Size**: Enter the maximum number of results to request at one time. Set to 0 to disable paging.
* **Scopes**: The set of entries at or below the **Base DN** to search for potential matches. Select from:
    * **Base Tree**: Often referred to as subordinateSubtree or just "subordinates," selecting this option will search the subordinates of the **Base DN** entry but not the **Base DN** entry itself.
    * **Single Level**: Often referred to as "one," selecting this option will search only the immediate children of the **Base DN** entry.
    * **Whole Subtree**: Often referred to as "sub," selecting this option will search the **Base DN** entry and all its subordinates to any depth.

Refer to [The LDAP Search Operation](https://ldap.com/the-ldap-search-operation/){:target="_blank" .external-link} for more information on search scopes.

## Update

Configure this operation using these parameters:

* **Credential to connect with**: Select or create an [LDAP credential](/integrations/builtin/credentials/ldap/) to connect with.
* **DN**: Enter the Distinguished Name (DN) of the entry to update.
* ***Update Attributes**: Select whether to **Add** new, **Remove** existing, or **Replace** existing attribute.
* Then enter the **Attribute ID**/**Value** pair you'd like to update.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'ldap') ]]
