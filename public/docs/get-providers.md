# Retrieve Active Providers

Fetches all configured API key providers (e.g., OpenAI, Google, Tavily) registered under the workspace.

### Endpoint Contract
```http
GET /api/v1/providers
Authorization: Bearer <your_developer_api_key>
X-AetherFlow-Workspace: <workspace_id>
```

---

### Response Payload
```json
{
  "success": true,
  "providers": [
    {
      "identifier": "openai",
      "name": "OpenAI Service Connection",
      "status": "active",
      "auth_mode": "aetherflow"
    },
    {
      "identifier": "tavily",
      "name": "Tavily Search Engine",
      "status": "active",
      "auth_mode": "own_key"
    }
  ]
}
```

> [!WARNING]
> **Key Status:** If a provider is marked as `inactive`, workspace nodes relying on that provider will fail connection validation checks at execution time.
