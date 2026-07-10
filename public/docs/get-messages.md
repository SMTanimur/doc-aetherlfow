# List Thread Messages

Fetch the paginated message history for a specific conversation thread. Returns messages in chronological order (oldest first).

---

### Endpoint

```http
GET /workspaces/:wsId/conversations/:conversationId/messages?page=1&limit=20
Authorization: Bearer af_live_42910aef192b
```

---

### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `number` | `1` | Page number for pagination |
| `limit` | `number` | `20` | Messages per page (max: 100) |

---

### Response Schema

```json
{
  "docs": [
    {
      "_id": "msg_68490a3f001",
      "conversationId": "6a3329fedc827a13d85059fd",
      "role": "user",
      "content": "What are the top features of AetherFlow?",
      "createdAt": "2026-07-09T09:30:00Z"
    },
    {
      "_id": "msg_68490a3f002",
      "conversationId": "6a3329fedc827a13d85059fd",
      "role": "assistant",
      "content": "AetherFlow offers three standout features: visual agent building...",
      "createdAt": "2026-07-09T09:30:03Z"
    }
  ],
  "totalDocs": 48,
  "totalPages": 3,
  "page": 1,
  "limit": 20,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

### Message Object Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `string` | Unique message ObjectId |
| `conversationId` | `string` | Parent conversation ObjectId |
| `role` | `string` | `"user"`, `"assistant"`, or `"system"` |
| `content` | `string` | Full text content of the message |
| `createdAt` | `string` | ISO 8601 creation timestamp |
