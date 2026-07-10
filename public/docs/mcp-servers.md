# MCP Server Setup

Register private **Model Context Protocol (MCP)** server endpoints in your workspace. MCP servers expose tools that LLM nodes can call during execution — databases, internal APIs, file systems, and more.

---

### Endpoint

```http
POST /workspaces/:wsId/mcp/servers
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "name": "Internal Database Server",
  "url": "http://localhost:5001/mcp",
  "auth_header": "Bearer local_secret_8812"
}
```

---

### Request Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | ✅ | Display name for the MCP server shown in the canvas |
| `url` | `string` | ✅ | Full URL of your MCP server endpoint |
| `auth_header` | `string` | ❌ | Authorization header value sent to your MCP server |

---

### Response Schema

```json
{
  "success": true,
  "server": {
    "_id": "mcp_9901a88f2c3d",
    "name": "Internal Database Server",
    "url": "http://localhost:5001/mcp",
    "status": "connected",
    "tools": [
      { "name": "query_customers", "description": "Query the customers database" },
      { "name": "get_order_status", "description": "Fetch order status by ID" }
    ],
    "createdAt": "2026-07-09T12:00:00Z"
  }
}
```

---

### List Registered Servers

```http
GET /workspaces/:wsId/mcp/servers
Authorization: Bearer af_live_42910aef192b
```

---

### What is MCP?

The **Model Context Protocol** is an open standard that lets LLMs discover and invoke tools exposed by external servers. Once an MCP server is registered, its tools appear automatically in the LLM Node's tool picker inside the canvas editor.

| MCP Tool Type | Example |
| :--- | :--- |
| **Database** | Query Postgres, MongoDB, or SQLite |
| **Internal API** | Call your own microservices |
| **File System** | Read/write files on a local or remote server |
| **Custom Logic** | Run any arbitrary function as an LLM-callable tool |

> [!NOTE]
> Your MCP server must be reachable from the AetherFlow backend. For local development, use a tunnel tool like **ngrok** to expose `localhost` to the internet.
