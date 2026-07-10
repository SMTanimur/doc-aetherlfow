# Webhook Integration

Trigger AetherFlow workflow pipelines from any external event source — Stripe payments, Typeform submissions, Shopify orders, GitHub pushes — using a unique webhook URL.

---

### Endpoint

```http
POST /workspaces/:wsId/webhooks/:webhookId/trigger
Content-Type: application/json

{
  "event": "payment.succeeded",
  "data": {
    "customer": {
      "email": "customer@example.com",
      "name": "David Miller"
    },
    "amount": 2900
  }
}
```

No `Authorization` header is required — the webhook URL itself is the secret. Treat it as a credential.

---

### Request Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event` | `string` | ❌ | Event name label for audit trail (e.g. `"payment.succeeded"`) |
| `data` | `object` | ❌ | Arbitrary JSON payload forwarded to workflow inputs |

The entire request body is passed as `inputs` to the workflow's Start node. Field names in `data` must match the workflow's declared input variable names.

---

### Response Schema

```json
{
  "success": true,
  "run_id": "run_90812acb9f31",
  "status": "triggered",
  "message": "Webhook execution queued."
}
```

---

### Configuring a Webhook

1. Open your workspace dashboard and navigate to **Webhooks**.
2. Click **New Webhook** and select the target workflow.
3. Copy the generated webhook URL — it includes the workspace and webhook IDs.
4. Paste the URL into your external service's webhook settings.

---

### Signature Verification (Recommended)

For production webhooks, enable **HMAC signature verification** in the webhook settings. AetherFlow will sign each delivery with a secret and include the signature in the `X-AetherFlow-Signature` header.

```typescript
import { createHmac } from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  return signature === `sha256=${expected}`;
}
```

> [!CAUTION]
> Webhook URLs contain embedded secrets. Never log incoming webhook URLs and rotate them periodically from the dashboard.
