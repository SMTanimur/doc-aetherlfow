# Delete Chat Threads

Deletes an active conversation thread and removes all of its cached messages.

### Endpoint Contract
```http
DELETE /workspaces/ws_9021aef/conversations/thread_881a029c
Authorization: Bearer af_live_your_integration_key_here
```

---

### Response Payload
```json
{
  "success": true,
  "message": "Conversation thread deleted."
}
```
