# Nodes Registry API

Fetches the configuration specifications and variables schemas for all registered visual canvas nodes.

### Endpoint Contract
```http
GET /workflow-nodes
Authorization: Bearer af_live_your_integration_key_here
```

---

### Response Payload
```json
{
  "success": true,
  "nodes": [
    {
      "type": "start",
      "name": "Start Node",
      "inputs_schema": {}
    },
    {
      "type": "llm",
      "name": "LLM Node",
      "inputs_schema": {
        "model": "string",
        "prompt": "string",
        "temperature": "number"
      }
    }
  ]
}
```
