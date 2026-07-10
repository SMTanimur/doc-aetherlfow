# Platform Overview

AetherFlow is a **multi-tenant Agent-as-a-Service platform** that lets developers and teams build, deploy, and monetize AI agents without infrastructure complexity. Design agents visually on a drag-and-drop canvas, then expose them as embeddable chat widgets or REST API endpoints — all within isolated, secure workspaces.

---

### What You Can Build

| Use Case | Description |
| :--- | :--- |
| **Support Agents** | Deploy AI chat bots on your product site using a 1-line widget embed |
| **Workflow Automation** | Chain LLMs, tools, web search, and APIs in a visual node graph |
| **API Integrations** | Call your published agents from any backend using integration keys |
| **Multi-Agent Systems** | Connect agents as subgraph nodes within larger orchestration pipelines |

---

### Multi-Tenant Architecture

Every account operates inside an **isolated Workspace** — the fundamental unit of the platform. Workspaces are fully separated at the database level. No data leaks between tenants.

- **Workspace Isolation** — Each workspace has its own members, agents, API providers, quota limits, and integration keys.
- **Real-Time Token Gating** — Every execution checks credit balances before routing to LLM providers. Requests are blocked when quota is exhausted.
- **Role-Based Access** — Workspace members can be Owners, Editors, or Viewers. Permissions cascade to API operations.
- **Integration Key Scoping** — Programmatic API access is gated through short-lived or permanent `af_live_...` keys that are bound to a single workspace.

---

### Supported LLM Providers

AetherFlow routes to 200+ models through OpenRouter and direct provider integrations. Switch models per-node without changing your agent logic.

- OpenAI (GPT-4o, o1, o3)
- Anthropic (Claude 3.5, Claude 3 Haiku)
- Google (Gemini 1.5 Pro, Gemini Flash)
- Meta (Llama 3.1, Llama 3.3)
- Mistral, Cohere, and community models via OpenRouter

> [!NOTE]
> **API Key Safety:** Always call AetherFlow from your secure server backend. Never embed `af_live_` integration keys in client-side code or public repositories.
