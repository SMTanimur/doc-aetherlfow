# Integration Key Authentication

All AetherFlow API endpoints authenticate requests using **Workspace Integration Keys** — short strings prefixed with `af_live_`. These are the only credentials needed to call the API programmatically.

---

### How to Authenticate

Pass your integration key in the `Authorization` header of every request:

```http
POST /chat/stream HTTP/1.1
Host: aetherflow-api.vercel.app
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json
```

There are no cookies, sessions, or separate login flows for API access.

---

### Key Format

| Property | Detail |
| :--- | :--- |
| **Prefix** | Always starts with `af_live_` |
| **Length** | 72 characters total (prefix + 64-char hex token) |
| **Scope** | Bound to a single workspace — inherits all workspace permissions |
| **Expiry** | `Never`, `30 days`, or `3 days` — chosen at creation |

---

### Generating a Key

1. Go to **Workspace Settings → Integration Keys** in the dashboard.
2. Click **Generate New Key**.
3. Copy the raw key immediately — it is shown **once** and never stored in plaintext.
4. Set an expiry policy appropriate for your use case.

---

### Key Lifecycle

```
Generate → Active → (Optional expiry) → Auto-deleted on use
                  ↘
                   Revoke → Deleted immediately
```

- **Rotation** — To rotate a key, generate a new one and revoke the old one from the dashboard.
- **Revocation** — Revoked keys are deleted from the database immediately and reject all subsequent requests with `HTTP 401`.
- **Expiry** — Expired keys are cleaned up automatically on the first request that presents them.

---

### Security Rules

> [!CAUTION]
> **Never expose integration keys in client-side code.** If a key is compromised, revoke it immediately from Workspace Settings and generate a replacement.

- Store keys in environment variables (`process.env.AF_API_KEY`) — never in source code.
- Rotate keys on a regular schedule for production workloads.
- Use short-lived keys (`3 days`) for CI/CD pipelines and testing environments.
- Monitor `lastUsedAt` timestamps in the dashboard to detect unauthorized usage.
