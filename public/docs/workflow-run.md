# Workflow Pipeline Executions

Launches a complete, blocking visual canvas workflow run from start to finish.

### Endpoint Contract
```http
POST /executions/runs
Content-Type: application/json
```

---

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **workflow_id** | `string` | Yes | Target workflow ID. |
| **inputs** | `object` | Yes | Custom key-value variables passed to the start node. |

---

### Request Body JSON
```json
{
  "workflow_id": "wf_60b8a1c900e2",
  "inputs": {
    "lead_name": "Sarah Miller",
    "lead_email": "sarah@example.com"
  }
}
```

---

### Response Payload
```json
{
  "run_id": "run_9918231a",
  "status": "succeeded",
  "outputs": {
    "lead_score": 92,
    "lead_status": "qualified"
  }
}
```
