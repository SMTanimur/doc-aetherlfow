# Quota Status & Key Mode

Manage billing credit limits, rolling usage stats, and key authorization configurations.

### 1. Retrieve Quota Status
```http
GET /quota/ws_9021aef3b129
```

---

### Quota Response
```json
{
  "workspaceId": "ws_9021aef3b129",
  "limits": {
    "max_monthly_runs": 10000,
    "runs_used_this_month": 3480
  },
  "credits": {
    "balance_usd": 42.50,
    "pack_tier": "pro_tier"
  }
}
```

---

### 2. Update Key Mode
Configure whether the workspace utilizes platform credentials or custom private API keys.
```http
PATCH /quota/ws_9021aef3b129/key-mode
Authorization: Bearer <your_jwt_access_token>
Content-Type: application/json
```

---

### Key Mode Request
```json
{
  "key_mode": "own_key"
}
```

---

### Key Mode Response
```json
{
  "success": true,
  "key_mode": "own_key"
}
```
