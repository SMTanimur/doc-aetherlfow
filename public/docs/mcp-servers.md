# MCP Server Configurations

Manage private Model Context Protocol (MCP) server endpoints registered in the workspace.

### Endpoint Contract
```http
POST /mcp/workspace/:workspaceId/servers
Authorization: Bearer af_live_your_integration_key_here
Content-Type: application/json
```

---

### Request Body JSON
```json
{
  "name": "Local Database Server",
  "url": "http://localhost:5001/mcp",
  "auth_header": "Bearer local_secret_8812"
}
```

---

### Response Payload
```json
{
  "success": true,
  "mcp_server": {
    "id": "mcp_9901a88f",
    "name": "Local Database Server",
    "status": "connected"
  }
}
```
