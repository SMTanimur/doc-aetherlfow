# Workspace Connections

Connections are encrypted API credentials (OpenAI keys, Tavily keys, etc.) stored securely in your workspace. Node executions reference connections by ID — your raw API keys are never exposed to clients.

---

### Endpoint

```http
POST /workspaces/:wsId/connections
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "provider": "tavily",
  "name": "Tavily Web Search Key",
  "credentials": {
    "apiKey": "tvly-prod-XXXXXXXXXXXXXXXX"
  }
}
```

---

### Request Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `provider` | `string` | ✅ | Provider identifier (e.g. `openai`, `tavily`, `anthropic`) |
| `name` | `string` | ✅ | Human-readable label shown in the canvas node picker |
| `credentials` | `object` | ✅ | Provider-specific credential fields |

### Credentials by Provider

| Provider | Credential Key | Example |
| :--- | :--- | :--- |
| `openai` | `apiKey` | `sk-proj-...` |
| `anthropic` | `apiKey` | `sk-ant-...` |
| `tavily` | `apiKey` | `tvly-prod-...` |
| `google` | `apiKey` | `AIza...` |

---

### Response Schema

```json
{
  "success": true,
  "connection": {
    "_id": "68490a3f2c1e4b90012345ab",
    "provider": "tavily",
    "name": "Tavily Web Search Key",
    "workspaceId": "6a3329fedc827a13d85059fd",
    "createdAt": "2026-07-09T10:34:00Z"
  }
}
```

Raw credential values are **never returned** in any response after creation.

---

### List Connections

```http
GET /workspaces/:wsId/connections
Authorization: Bearer af_live_42910aef192b
```

Returns all connections for the workspace with masked credential values.

---

### Delete a Connection

```http
DELETE /workspaces/:wsId/connections/:connectionId
Authorization: Bearer af_live_42910aef192b
```

> [!WARNING]
> Deleting a connection that is referenced by active workflow nodes will cause those nodes to fail at execution time. Update the node configuration before deleting.
