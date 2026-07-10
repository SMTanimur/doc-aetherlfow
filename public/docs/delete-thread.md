# Delete Chat Thread

Permanently delete a conversation thread and all of its messages. This action is irreversible.

---

### Endpoint

```http
DELETE /workspaces/:wsId/conversations/:conversationId
Authorization: Bearer af_live_42910aef192b
```

---

### Path Parameters

| Parameter | Description |
| :--- | :--- |
| `:wsId` | MongoDB ObjectId of the workspace |
| `:conversationId` | MongoDB ObjectId of the conversation to delete |

---

### Response Schema

```json
{
  "success": true,
  "message": "Conversation and all messages deleted successfully.",
  "deletedId": "6a3329fedc827a13d85059fd"
}
```

---

### Error Responses

| Status | Cause |
| :--- | :--- |
| `401 Unauthorized` | Missing or invalid integration key |
| `403 Forbidden` | Conversation belongs to a different workspace |
| `404 Not Found` | Conversation ID does not exist |

> [!CAUTION]
> Deleted conversations and their full message history cannot be recovered. Implement a soft-delete or archive strategy in your application if you need to retain history.
