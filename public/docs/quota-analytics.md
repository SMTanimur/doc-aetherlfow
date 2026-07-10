# Quota Analytics

Monitor your workspace's token consumption, credit balance, and quota limits in real time. Use these endpoints to build usage dashboards or trigger alerts when quotas approach their limits.

---

### Get Quota Status

```http
GET /workspaces/:wsId/quota
Authorization: Bearer af_live_42910aef192b
```

---

### Response Schema

```json
{
  "workspaceId": "6a3329fedc827a13d85059fd",
  "plan": "pro",
  "quota": {
    "token_limit": 2000000,
    "tokens_used": 834521,
    "tokens_remaining": 1165479,
    "usage_percent": 41.7
  },
  "billing_cycle": {
    "start": "2026-07-01T00:00:00Z",
    "end": "2026-07-31T23:59:59Z",
    "days_remaining": 22
  },
  "key_mode": "aetherflow"
}
```

---

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `plan` | `string` | Current subscription tier (`free`, `pro`, `business`) |
| `quota.token_limit` | `number` | Total tokens available this billing cycle |
| `quota.tokens_used` | `number` | Tokens consumed since billing cycle start |
| `quota.usage_percent` | `number` | Percentage of quota consumed |
| `key_mode` | `string` | `"aetherflow"` (platform key) or `"own_key"` |

---

### Update Key Mode

Switch between using AetherFlow's shared platform API key or your own provider credentials:

```http
PATCH /workspaces/:wsId/quota/key-mode
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "key_mode": "own_key"
}
```

| Mode | Description |
| :--- | :--- |
| `aetherflow` | Use AetherFlow's platform key — counts against your subscription quota |
| `own_key` | Use your own provider API key — does not consume AetherFlow credits |

---

### Usage History

```http
GET /workspaces/:wsId/quota/analytics?period=30d
Authorization: Bearer af_live_42910aef192b
```

Returns daily token consumption breakdown for the specified period (`7d`, `30d`, `90d`).

> [!NOTE]
> Switching to `own_key` mode requires adding valid provider credentials under **Workspace Settings → Connections** first. Executions will fail until credentials are configured.
