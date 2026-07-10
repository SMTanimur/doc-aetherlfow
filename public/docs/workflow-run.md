# Workflow Execution

Trigger a complete visual canvas workflow from start to finish via REST. The execution runs synchronously and returns all node outputs when the pipeline completes.

---

### Endpoint

```http
POST /workspaces/:wsId/workflows/:workflowId/run
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "inputs": {
    "lead_name": "Sarah Miller",
    "lead_email": "sarah@example.com"
  }
}
```

---

### Request Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `inputs` | `object` | ✅ | Key-value pairs passed to the workflow's Start node |

Each key in `inputs` maps to a named input variable defined in the workflow's canvas editor.

---

### Response Schema

```json
{
  "run_id": "run_9918231a4b05",
  "status": "succeeded",
  "duration_ms": 1840,
  "outputs": {
    "lead_score": 92,
    "lead_status": "qualified",
    "email_sent": true
  }
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `run_id` | `string` | Unique execution record ID |
| `status` | `string` | `"succeeded"` or `"failed"` |
| `duration_ms` | `number` | Total execution time in milliseconds |
| `outputs` | `object` | Output values from all terminal nodes |

---

### Error Responses

| Status | Cause |
| :--- | :--- |
| `401 Unauthorized` | Invalid or missing integration key |
| `402 Payment Required` | Workspace token quota exhausted |
| `404 Not Found` | Workflow ID does not exist |
| `422 Unprocessable Entity` | Missing required `inputs` fields |
| `504 Gateway Timeout` | Workflow exceeded maximum execution time |

> [!NOTE]
> Workflow executions are recorded in your audit log. View run history, input/output snapshots, and token costs in the **Executions** tab of your workspace dashboard.
