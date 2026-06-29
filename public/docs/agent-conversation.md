# Chat Streaming (SSE) Integration Guide

Runs an interactive conversation session with a canvas agent, streaming reply tokens chunk-by-chunk in real-time authenticated via your Workspace Integration Key (`af_live_...`).

### Endpoint Contract
```http
POST /chat/stream
Content-Type: application/json
Authorization: Bearer af_live_your_integration_key_here
```

---

### Authentication Headers
| Header | Value | Description |
| :--- | :--- | :--- |
| **Authorization** | `Bearer af_live_...` | Workspace Integration Key generated in your dashboard. |
| **Content-Type** | `application/json` | Request payload format. |

---

### Request Body Specification
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **messages** | `array` | Yes | List of conversation thread message objects `[{ role: "user" \| "assistant", content: "..." }]`. |
| **agentInfo** | `object` | Optional | Object containing `name` and optional `workspaceId`. (Overridden automatically by Integration Key context). |
| **conversation_id** | `string` | Optional | Unique tracking string for thread persistence. |

```json
{
  "messages": [
    { "role": "user", "content": "How do I setup workspace integration keys for AI streaming?" }
  ],
  "agentInfo": {
    "name": "Customer Support Agent"
  },
  "conversation_id": "thread_demo_9912"
}
```

---

### Integration Code Examples

#### 1. cURL Example
```bash
curl -X POST http://localhost:3000/api/backend/chat/stream \
  -H "Authorization: Bearer af_live_42910aef192b" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{ "role": "user", "content": "Hello AI agent!" }],
    "agentInfo": { "name": "Support Bot" }
  }'
```

#### 2. JavaScript / Node.js Fetch Streaming Example
```javascript
async function streamAgentResponse(prompt) {
  const response = await fetch('http://localhost:3000/api/backend/chat/stream', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer af_live_42910aef192b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      agentInfo: { name: 'Assistant' }
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    process.stdout.write(chunk);
  }
}
```

#### 3. Python Streaming Example
```python
import requests

url = "http://localhost:3000/api/backend/chat/stream"
headers = {
    "Authorization": "Bearer af_live_42910aef192b",
    "Content-Type": "application/json"
}
payload = {
    "messages": [{"role": "user", "content": "Explain AI workflows"}],
    "agentInfo": {"name": "Python Agent Bot"}
}

with requests.post(url, json=payload, headers=headers, stream=True) as r:
    for chunk in r.iter_content(chunk_size=None, decode_unicode=True):
        if chunk:
            print(chunk, end="", flush=True)
```
