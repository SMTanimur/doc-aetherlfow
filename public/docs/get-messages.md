# List Thread Messages

Fetches paginated list of chat history messages recorded inside a conversation thread.

### Endpoint Contract
```http
GET /workspaces/ws_9021aef/conversations/thread_881a029c/messages?page=1&limit=20
Authorization: Bearer <your_jwt_access_token>
```

---

### Response Payload
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_001aef",
      "role": "user",
      "content": "How do I upgrade my shipping?",
      "createdAt": "2026-06-29T09:30:00Z"
    },
    {
      "id": "msg_002aef",
      "role": "assistant",
      "content": "You can upgrade to express shipping inside your profile page under orders.",
      "createdAt": "2026-06-29T09:30:02Z"
    }
  ]
}
```
