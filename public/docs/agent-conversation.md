# Chat Streaming (SSE)

Runs an interactive conversation session with a canvas agent, streaming reply tokens chunk-by-chunk in real-time.

### Endpoint Contract
```http
POST /chat/stream
Content-Type: application/json
```

---

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **messages** | `array` | Yes | List of conversation thread message objects. |
| **agentInfo** | `object` | Yes | Object containing `name` and `workspaceId`. |
| **conversation_id** | `string` | No | Unique tracking string for the thread. |

---

### Request Body JSON
```json
{
  "messages": [
    { "role": "user", "content": "How do I upgrade my shipping?" }
  ],
  "agentInfo": {
    "name": "Customer Support Bot",
    "workspaceId": "ws_9021aef3b129"
  },
  "conversation_id": "thread_881a029c"
}
```

---

### Response Chunk stream
The response is streamed dynamically using chunked encoding with content-type `text/plain`:

```http
You
can
upgrade
to
express
shipping
inside
your
orders
profile
page.
```
