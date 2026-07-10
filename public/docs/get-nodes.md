# Nodes Registry API

Fetch metadata definitions for all registered visual canvas nodes. Use this to discover available node types, their input/output schemas, and configuration options.

---

### Endpoint

```http
GET /workflow-nodes
Authorization: Bearer af_live_42910aef192b
```

---

### Response Schema

```json
{
  "nodes": [
    {
      "type": "chat-input",
      "name": "Chat Input",
      "category": "IO",
      "description": "Entry point that receives the incoming user message",
      "outputs": ["message"]
    },
    {
      "type": "llm",
      "name": "LLM Node",
      "category": "AI",
      "description": "Routes to any LLM via OpenRouter or direct provider",
      "inputs_schema": {
        "model": "string",
        "system_prompt": "string",
        "temperature": "number",
        "max_tokens": "number"
      },
      "outputs": ["response"]
    },
    {
      "type": "web-search",
      "name": "Web Search",
      "category": "Tools",
      "description": "Runs a Tavily search and returns structured results",
      "inputs_schema": {
        "query": "string",
        "max_results": "number"
      },
      "outputs": ["results", "answer"]
    },
    {
      "type": "chat-output",
      "name": "Chat Output",
      "category": "IO",
      "description": "Streams the final response to the caller",
      "inputs": ["message"]
    }
  ]
}
```

---

### Node Object Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `type` | `string` | Unique node type identifier used in canvas |
| `name` | `string` | Display name shown in the node palette |
| `category` | `string` | `"IO"`, `"AI"`, `"Tools"`, `"Logic"`, `"Orchestration"` |
| `description` | `string` | What the node does |
| `inputs_schema` | `object` | Configuration field names and expected types |
| `outputs` | `string[]` | Named output handles the node exposes |
