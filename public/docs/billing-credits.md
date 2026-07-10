# Billing & Credit Tiers

AetherFlow uses a **token-based credit system**. Every LLM call, tool execution, and search query consumes credits from your workspace's monthly quota. Credits are pre-allocated per tier and reset on your billing cycle.

---

### Subscription Tiers

| Tier | Monthly Credits | Seats | Features |
| :--- | :--- | :--- | :--- |
| **Free** | 50,000 tokens | 1 | 3 active agents, widget embed, community support |
| **Pro** | 2,000,000 tokens | 5 | Unlimited agents, webhook triggers, priority support |
| **Business** | 10,000,000 tokens | 25 | Custom domains, SSO, audit logs, SLA guarantee |
| **Enterprise** | Unlimited | Unlimited | Dedicated infra, custom contracts, white-labeling |

---

### How Credits Are Consumed

Credits are deducted per **execution event** based on the model and tool type:

| Operation | Approximate Cost |
| :--- | :--- |
| GPT-4o input (1K tokens) | ~15 credits |
| GPT-4o output (1K tokens) | ~60 credits |
| Claude 3.5 Sonnet (1K tokens) | ~18 credits |
| Gemini 1.5 Flash (1K tokens) | ~2 credits |
| Web Search (per query) | ~50 credits |
| MCP Tool Call (per invocation) | ~10 credits |

---

### Quota Enforcement

Quota checks happen **before** each LLM call:

1. Runtime reads `tokens_used` and `token_quota` from the workspace record.
2. If `tokens_used >= token_quota`, the request is blocked with `HTTP 429 Too Many Requests`.
3. After a successful call, `tokens_used` is incremented asynchronously.

Use the **Quota Analytics** API (`GET /workspaces/:wsId/quota`) to monitor live consumption programmatically.

---

### Upgrading Your Plan

Manage billing, view invoices, and upgrade plans directly from the workspace settings at [aetherflow-omega.vercel.app](https://aetherflow-omega.vercel.app/).

> [!NOTE]
> Unused credits do not roll over between billing cycles on the Free and Pro tiers. Enterprise plans support custom credit rollover agreements.
