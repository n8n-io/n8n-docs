---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: KoboToolbox node documentation
description: Learn how to use the KoboToolbox node in n8n. Follow technical documentation to integrate KoboToolbox node into your workflows.
contentType: [integration, reference]
---

# KoboToolbox node

Use the KoboToolbox node to automate work in KoboToolbox, and integrate KoboToolbox with other applications. n8n has built-in support for a wide range of KoboToolbox features, including creating, updating, deleting, and getting files, forms, hooks, and submissions. 

On this page, you'll find a list of operations the KoboToolbox node supports and links to more resources.

/// note | Credentials
Refer to [KoboToolbox credentials](/integrations/builtin/credentials/kobotoolbox.md) for guidance on setting up authentication. 
///

## Operations

* File
	* Create
	* Delete
	* Get
	* Get Many
* Form
    * Get
    * Get Many
		* Redeploy
* Hook
    * Get
    * Get Many
    * Logs
    * Retry All
    * Retry One
* Submission
    * Delete
    * Get
    * Get Many
    * Get Validation Status
    * Update Validation Status

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'kobotoolbox') ]]

## Options

### Query Options

The Query Submission operation supports query options:

* In the main section of the **Parameters** panel:
    * **Start** controls the index offset to start the query from (to use the API pagination logic).
    * **Limit** sets the maximum number of records to return. Note that the API always has a limit of 30,000 returned records, whatever value you provide.
* In the **Query Options** section, you can activate the following parameters:
    * **Query** lets you specify filter predicates in MongoDB's JSON query format. For example: `{"status": "success", "_submission_time": {"$lt": "2021-11-01T01:02:03"}}` queries for all submissions with the value `success` for the field `status`, and submitted before November 1st, 2021, 01:02:03.
    * **Fields** lets you specify the list of fields you want to fetch, to make the response lighter.
    * **Sort** lets you provide a list of sorting criteria in MongoDB JSON format. For example, `{"status": 1, "_submission_time": -1}` specifies a sort order by ascending status, and then descending submission time.

More details about these options can be found in the [Formhub API docs](https://github.com/SEL-Columbia/formhub/wiki/Formhub-Access-Points-(API)#api-parameters)

### Submission options

All operations that return form submission data offer options to tweak the response. These include:

- Download options lets you download any attachment linked to each particular form submissions, such as pictures and videos. It also lets you select the naming pattern, and the file size to download (if available - typically for images). 
- Formatting options perform some reformatting as described in [About reformatting](#about-reformatting).

#### About reformatting

The default JSON format for KoboToolbox submission data is sometimes hard to deal with, because it's not schema-aware, and all fields are therefore returned as strings.

This node provides a lightweight opinionated reformatting logic, enabled with the **Reformat?** parameter, available on all operations that return form submissions: the submission query, get, and the attachment download operations.

When enabled, the reformatting:

- Reorganizes the JSON into a multi-level hierarchy following the form's groups. By default, question grouping hierarchy is materialized by a `/` character in the field names, for example `Group1/Question1`. With reformatting enabled, n8n reorganizes these into `Group1.Question1`, as nested JSON objects.
- Renames fields to trim `_` (not supported by many downstream systems).
- Parses all geospatial fields (Point, Line, and Area question types) into their standard GeoJSON equivalent.
- Splits all fields matching any of the **Multiselect Mask** wildcard masks into an array. Since the multi-select fields appear as space-separated strings, they can't be guessed algorithmically, so you must provide a field naming mask. Format the masks as a comma-separated list. Lists support the `*` wildcard.
- Converts all fields matching any of the **Number Mask** wildcard masks into a JSON float.

Here's a detailed example in JSON:

```json
{
  "_id": 471987,
  "formhub/uuid": "189436bb09a54957bfcc798e338b54d6",
  "start": "2021-12-05T16:13:38.527+02:00",
  "end": "2021-12-05T16:15:33.407+02:00",
  "Field_Details/Field_Name": "Test Fields",
  "Field_Details/Field_Location": "-1.932914 30.078211 1421 165",
  "Field_Details/Field_Shape": "-1.932914 30.078211 1421 165;-1.933011 30.078085 0 0;-1.933257 30.078004 0 0;-1.933338 30.078197 0 0;-1.933107 30.078299 0 0;-1.932914 30.078211 1421 165",
  "Field_Details/Crops_Grown": "maize beans avocado",
  "Field_Details/Field_Size_sqm": "2300",
  "__version__": "veGcULpqP6JNFKRJbbMvMs",
  "meta/instanceID": "uuid:2356cbbe-c1fd-414d-85c8-84f33e92618a",
  "_xform_id_string": "ajXVJpBkTD5tB4Nu9QXpgm",
  "_uuid": "2356cbbe-c1fd-414d-85c8-84f33e92618a",
  "_attachments": [],
  "_status": "submitted_via_web",
  "_geolocation": [
    -1.932914,
    30.078211
  ],
  "_submission_time": "2021-12-05T14:15:44",
  "_tags": [],
  "_notes": [],
  "_validation_status": {},
  "_submitted_by": null
}
```

With reformatting enabled, and the appropriate masks for multi-select and number formatting (for example, `Crops_*` and `*_sqm` respectively), n8n parses it into:

```json
{
  "id": 471987,
  "formhub": {
    "uuid": "189436bb09a54957bfcc798e338b54d6"
  },
  "start": "2021-12-05T16:13:38.527+02:00",
  "end": "2021-12-05T16:15:33.407+02:00",
  "Field_Details": {
    "Field_Name": "Test Fields",
    "Field_Location": {
      "lat": -1.932914,
      "lon": 30.078211
    },
    "Field_Shape": {
      "type": "polygon",
      "coordinates": [
        {
          "lat": -1.932914,
          "lon": 30.078211
        },
        {
          "lat": -1.933011,
          "lon": 30.078085
        },
        {
          "lat": -1.933257,
          "lon": 30.078004
        },
        {
          "lat": -1.933338,
          "lon": 30.078197
        },
        {
          "lat": -1.933107,
          "lon": 30.078299
        },
        {
          "lat": -1.932914,
          "lon": 30.078211
        }
      ]
    },
    "Crops_Grown": [
      "maize",
      "beans",
      "avocado"
    ],
    "Field_Size_sqm": 2300
  },
  "version": "veGcULpqP6JNFKRJbbMvMs",
  "meta": {
    "instanceID": "uuid:2356cbbe-c1fd-414d-85c8-84f33e92618a"
  },
  "xform_id_string": "ajXVJpBkTD5tB4Nu9QXpgm",
  "uuid": "2356cbbe-c1fd-414d-85c8-84f33e92618a",
  "attachments": [],
  "status": "submitted_via_web",
  "geolocation": {
    "lat": -1.932914,
    "lon": 30.078211
  },
  "submission_time": "2021-12-05T14:15:44",
  "tags": [],
  "notes": [],
  "validation_status": {},
  "submitted_by": null
}
```


--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"
