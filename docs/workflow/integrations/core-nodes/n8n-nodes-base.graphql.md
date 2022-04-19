---
title: GraphQL
description: GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.
tags:
  - Workflow²

---

# GraphQL

[GraphQL](https://graphql.org/) is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.


## Basic Operations

- Query a GraphQL endpoint

## Example Usage

This workflow allows you to get information about the five most recent SpaceX launches from [spacex.land](https://spacex.land/). You can also find the [workflow](https://n8n.io/workflows/558) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [GraphQL]()

The final workflow should look like the following image.

![A workflow with the GraphQL node](/_images/integrations/core-nodes/graphql/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. GraphQL node

1. Enter `https://api.spacex.land/graphql/` in the *Endpoint* field.
2. Select the 'JSON' option from the *Request Format* dropdown list.
3. Enter the GraphQL query shown below in the *Query* field.
4. Click on *Execute Node* to run the workflow.

#### GraphQL query
```json
{
  launchesPast(limit: 5) {
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      first_stage {
        cores {
          flight
          core {
            reuse_count
            status
          }
        }
      }
      second_stage {
        payloads {
          payload_type
          payload_mass_kg
          payload_mass_lbs
        }
      }
    }
    ships {
      name
      home_port
      image
    }
  }
}
```




