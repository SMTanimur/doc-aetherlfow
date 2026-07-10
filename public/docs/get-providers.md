# Retrieve API Providers

Fetch all API provider configurations registered in the workspace. Providers represent the LLM services and tool integrations available for node execution.

---

### Endpoint

```http
GET /workspaces/:wsId/providers
Authorization: Bearer af_live_42910aef192b
```

---

### Response Schema

```json
{
  "providers": [
    {
      "_id": "68490a3f2c1e4b90012345ab",
      "name": "OpenAI Service",
      "identifier": "openai",
      "keyMode": "aetherflow",
      "isActive": true,
      "createdAt": "2026-07-01T10:00:00Z"
    },
    {
      "_id": "68490a3f2c1e4b90012345cd",
      "name": "Tavily Search Engine",
      "identifier": "tavily",
      "keyMode": "own_key",
      "isActive": true,
      "createdAt": "2026-07-01T10:05:00Z"
    }
  ]
}
```

---

### Provider Object Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | MongoDB ObjectId of the provider record |
| `name` | `string` | Display name shown in the canvas node picker |
| `identifier` | `string` | System identifier used in model routing |
| `keyMode` | `string` | `"aetherflow"` (platform key) or `"own_key"` (custom credential) |
| `isActive` | `boolean` | Whether this provider is currently available for execution |

---

### Key Modes

| Mode | Description |
| :--- | :--- |
| `aetherflow` | AetherFlow's shared platform API key is used — no setup required |
| `own_key` | Workspace owner supplies their own provider API key via Connections |

> [!WARNING]
> Providers with `"isActive": false` will cause node executions that depend on them to fail. Activate providers by adding a valid connection credential in Workspace Settings.
