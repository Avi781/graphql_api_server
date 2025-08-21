# GraphQL JSON API (Apollo Server, Node.js)

This server exposes a GraphQL API over JSON files (no database). Authentication uses a **Bearer token**.

## 📌 Endpoints
- Server: http://localhost:4000/graphql

## 🚀 Quick Start
1. Need to create `.env` and fill values:
    ```bash
   PORT=4000
   JWT_SECRET=
   
     
2. For Local Install & run
   ```bash
   npm install
   npm run start
   

## Authentication
Send header:
```
Authorization: Bearer <AUTH_TOKEN>
```

## Query Example
```graphql
query GetNode($id: ID) {
  node(nodeId: $id) {
    _id
    name
    priority
    compositeId
    global
    colour
    trigger {
      _id
      name
      resourceTemplate {
        _id
        name
        key
      }
    }
    responses {
      _id
      name
      platforms {
        integrationId
        build
        localeGroups {
          localeGroupId
          variations {
            name
            responses
          }
        }
      }
    }
    actions {
      _id
      name
      params
      resourceTemplate {
        _id
        name
        key
      }
    }
  }
}

```
Variables:
```json
{ "id": "6297164810f52524ba1a9300" }
```
You can also use the `compositeId` as `nodeId`.

## Data
JSON files live in `./data`:
- `action.json`
- `response.json`
- `trigger.json`
- `node.json`
- `resourceTemplate.json`

Edit these files and restart the server to pick up changes.
