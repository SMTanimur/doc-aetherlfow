# Integration Key Authentication Guide

All AetherFlow API endpoints and SDKs authenticate requests using **Workspace Integration Keys** (`af_live_...`).

---

### Authentication Contract
Every programmatic HTTP request sent to AetherFlow must include your workspace Integration Key in the standard HTTP `Authorization` header using the `Bearer` scheme.

```http
Authorization: Bearer af_live_your_integration_key_here
Content-Type: application/json
```

---

### Key Format & Security
- **Key Prefix**: Valid integration keys always start with `af_live_` (e.g., `af_live_42910aef192b...`).
- **Workspace Scope**: Each key is permanently bound to your workspace. Requests made with an Integration Key inherit workspace permissions automatically.
- **Header Example**:
  ```http
  POST /chat/stream HTTP/1.1
  Host: aetherflow-api.vercel.app
  Authorization: Bearer af_live_42910aef192b
  Content-Type: application/json
  ```

---

### Managing Integration Keys
Generate and manage integration keys directly in your workspace dashboard under **Workspace Settings > Integration Keys**.
- Keep your keys secure and never expose them in client-side public repositories.
- When generating keys, you can set an optional expiration period (`Never`, `30 Days`, or `3 Days`).
