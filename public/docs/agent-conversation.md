# Chat Streaming (SSE)

Stream real-time AI responses token-by-token from any published agent in your workspace. The endpoint uses **Server-Sent Events (SSE)** — the response body streams plain text chunks as the model generates them.

---

### Endpoint

```http
POST /chat/stream
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "What are the top 3 features of AetherFlow?" }
  ],
  "agent_id": "6b4290fa8e310dc411a095e2",
  "model_id": "openrouter/openai/gpt-4o"
}
```

---

### Request Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `messages` | `Message[]` | ✅ | Array of chat messages in conversation order |
| `agent_id` | `string` | ❌ | Agent / Workflow ID to execute |
| `model_id` | `string` | ❌ | Optional. Model ID to override default (e.g. `google/gemini-2.5-flash`, `openrouter/openai/gpt-4o`) |
| `workspace_id` | `string` | ❌ | Optional. Auto-detected from Integration Key if omitted |
| `conversation_id` | `string` | ❌ | Existing conversation ID to hydrate prior history |
| `workflow_id` | `string` | ❌ | Agent/workflow ID to use as system prompt context |

### Message Object

| Field | Type | Values |
| :--- | :--- | :--- |
| `role` | `string` | `"user"` \| `"assistant"` \| `"system"` |
| `content` | `string` | The message text content |

---

### Response Format

The response body is a **plain text SSE stream**. Each chunk is a partial token or word fragment. Concatenate all chunks to build the full response.

```json
{
  "status": 200,
  "content-type": "text/event-stream",
  "body": "Sure! Here are the top 3 features...\n\n1. **Visual Canvas**..."
}
```

The stream ends when the server closes the connection (no `data: [DONE]` wrapper — raw token stream only).

---

### Error Responses

| Status | Cause |
| :--- | :--- |
| `401 Unauthorized` | Missing or invalid integration key |
| `402 Payment Required` | Workspace token quota exhausted |
| `422 Unprocessable Entity` | Invalid `messages` schema |
| `500 Internal Server Error` | LLM provider error or timeout |

---

### cURL Example

```bash
curl -X POST https://aetherflow-api.vercel.app/chat/stream \
  -H "Authorization: Bearer af_live_42910aef192b" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role":"user","content":"Explain quantum computing briefly"}],
    "agent_id": "6b4290fa8e310dc411a095e2"
  }' \
  --no-buffer
```

> [!NOTE]
> Use `--no-buffer` with cURL to see tokens as they stream. In production, read the response as a `ReadableStream` and process each chunk incrementally.
