# Webhook Event Callbacks

Trigger any workflow dynamically from third-party webhook integrations (such as Stripe payment success, Typeform submissions, or Shopify checkouts).

### Endpoint Contract
```http
POST /webhooks/whsec_88f29ac02e1c93a0
Content-Type: application/json
```

---

### Request Body JSON
The incoming webhook payload is forwarded directly to the workflow pipeline as input parameters:

```json
{
  "event": "payment.succeeded",
  "data": {
    "customer": {
      "email": "customer@gmail.com",
      "name": "David Miller"
    },
    "amount": 2900
  }
}
```

---

### Response Payload
```json
{
  "success": true,
  "message": "Webhook execution run triggered.",
  "run_id": "run_90812acb9"
}
```
