# Delete Chat Threads

Deletes an active conversation thread and removes all of its cached messages.

### Endpoint Contract
```http
DELETE /workspaces/ws_9021aef/conversations/thread_881a029c
Authorization: Bearer <your_jwt_access_token>
```

---

### Response Payload
```json
{
  "success": true,
  "message": "Conversation thread deleted."
}
```
