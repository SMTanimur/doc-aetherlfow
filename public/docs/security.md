# Multi-Tenant Security

AetherFlow is designed from the ground up as a **zero-trust, multi-tenant system**. Every request is authenticated, workspace-scoped, and quota-gated before execution reaches the AI layer.

---

### Authentication Layers

| Layer | Mechanism | Scope |
| :--- | :--- | :--- |
| **User Sessions** | JWT Bearer tokens (15-min access + refresh) | Web dashboard, console API |
| **Integration Keys** | `af_live_...` HMAC tokens | Programmatic / external API access |
| **Workspace Guard** | Membership check on every workspace route | Prevents cross-tenant access |

Both JWT tokens and integration keys are accepted via the same `Authorization: Bearer` header. The `FlexAuthGuard` middleware resolves which strategy to use based on the key prefix.

---

### Integration Key Security

Integration keys are **hashed on creation** using SHA-256. The raw key is shown once and never stored in plaintext in the database.

```
Creation Flow:
  raw_key = "af_live_" + crypto.randomBytes(32).hex()
  stored  = SHA256(raw_key)          ← only hash is persisted
  masked  = "af_live_a1b2...c3d4"   ← for display in dashboard
```

- **Key Expiry** — Keys can be set to expire in `3 days`, `30 days`, or `never`.
- **Automatic Cleanup** — Expired keys are deleted on first use attempt.
- **Revocation** — Keys can be revoked instantly from the workspace settings panel.
- **Last Used Tracking** — `lastUsedAt` is updated asynchronously on each successful validation.

---

### Workspace Data Isolation

Every MongoDB document that belongs to a workspace carries a `workspaceId` field and every query filters by it. It is **structurally impossible** for a workspace member to read or write another workspace's data.

```
WorkspaceMemberGuard verifies:
  1. Request user/key is authenticated
  2. The :wsId route param belongs to that user's workspace membership
  3. If either check fails → 403 Forbidden
```

---

### Credential Vault

Provider API keys (OpenAI, Anthropic, Google, etc.) entered by workspace owners are:

1. Stored in MongoDB under the workspace's `connections` collection.
2. Never returned in API responses — only used server-side at execution time.
3. Referenced by `connectionId` in node configurations — not by value.

---

### Rate Limiting & Quota

- **Token Quota** — Each workspace has a `token_quota_limit`. Executions are blocked when `tokens_used >= limit`.
- **Per-Request Timeout** — Each LLM call has a configurable timeout. Runaway completions are cancelled.
- **Audit Logs** — Every execution records a timestamped log entry with model used, tokens consumed, and status.

> [!CAUTION]
> Never expose `af_live_` integration keys in frontend JavaScript, public Git repositories, or CI/CD environment variables that are printed to logs.
