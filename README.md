# GraphQL JSON API (Apollo Server, Node.js)

This server exposes a GraphQL API over JSON files (no database). Authentication uses a **Bearer token**.

## Requirements
- Node.js 18+
- npm or pnpm/yarn

## Install
```bash
cd graphql-json-api
cp .env.example .env   # then set AUTH_TOKEN
npm install
npm run dev
```
Server: http://localhost:4000/graphql

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
    triggerId
    trigger { _id name resourceTemplateId }
    responseIds
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
  }
}
```
Variables:
```json
{ "id": "6296be3470a0c1052f89cccb" }
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
