# Workspace Connections Setup

Connections are secure API credentials (e.g. Tavily API Keys, OpenAI keys) saved in the workspace. Node executions query these connections to execute tools.

### 1. Create Workspace Connection
```http
POST /connections/workspace/ws_9021aef3b129
Authorization: Bearer af_live_your_integration_key_here
Content-Type: application/json
```

---

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **provider** | `string` | Yes | Target provider service (e.g. `tavily`, `openai`). |
| **name** | `string` | Yes | Custom identifier label for the connection. |
| **credentials** | `object` | Yes | Object containing sensitive API keys. |

---

### Request Body JSON
```json
{
  "provider": "tavily",
  "name": "My Tavily Web Search Key",
  "credentials": {
    "apiKey": "tvly-prod-XXXXXXX"
  }
}
```

---

### Response Payload
```json
{
  "success": true,
  "connection": {
    "id": "conn_60b819f20109",
    "provider": "tavily",
    "name": "My Tavily Web Search Key",
    "createdAt": "2026-06-29T09:34:00Z"
  }
}
```
