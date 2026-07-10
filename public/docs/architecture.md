# Architecture Design

AetherFlow is built on a **visual node-graph execution engine**. Each agent is a directed acyclic graph (DAG) of typed nodes connected by data edges. When a user sends a message, the runtime traverses the graph, executes each node in topological order, and streams the final output back to the caller.

---

### Execution Pipeline

```
User Request
     │
     ▼
┌────────────────┐     ┌──────────────┐     ┌────────────────┐
│  Auth / Rate   │────▶│  Workspace   │────▶│  Node Graph    │
│  Gate (Guard)  │     │  Resolver    │     │  Executor      │
└────────────────┘     └──────────────┘     └────────────────┘
                                                    │
                          ┌─────────────────────────┤
                          ▼                         ▼
                   ┌─────────────┐         ┌──────────────────┐
                   │  LLM Router │         │  Tool Nodes      │
                   │  (OpenRouter│         │  Web Search, MCP,│
                   │   / Direct) │         │  HTTP, Code, DB  │
                   └─────────────┘         └──────────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ SSE Stream  │──▶ Client / Widget / SDK
                   │  Response   │
                   └─────────────┘
```

---

### Core Node Types

| Node | Category | Description |
| :--- | :--- | :--- |
| **Chat Input** | I/O | Entry point that receives the user message |
| **LLM** | AI | Routes to any configured model via OpenRouter or direct API |
| **Chat Output** | I/O | Streams the final assistant response to the caller |
| **Web Search** | Tool | Runs a Tavily-powered real-time search query |
| **HTTP Request** | Tool | Calls any external REST endpoint with custom headers |
| **Code** | Tool | Executes sandboxed JavaScript or Python snippets |
| **MCP Server** | Tool | Connects to Model Context Protocol tool servers |
| **Conditional** | Logic | Branches execution flow based on LLM or data conditions |
| **Agent Node** | Orchestration | Embeds another published agent as a subgraph |

---

### Multi-Tenant Isolation

- **Database Layer** — Each workspace's data is namespace-isolated by `workspaceId` on every MongoDB collection. No cross-tenant queries are possible.
- **Quota Enforcement** — A pre-execution middleware checks `token_quota_used < quota_limit` before forwarding to any LLM. Exhausted workspaces receive `HTTP 429`.
- **Credential Vault** — Provider API keys (OpenAI, Anthropic, etc.) are stored encrypted per-workspace and resolved at runtime inside the backend — never exposed to clients.
- **Execution Isolation** — Each workflow run spawns an isolated async context with its own timeout, retry budget, and execution log record.

---

### Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15, React 19, Tailwind CSS v4 |
| **Canvas** | React Flow (custom node renderer) |
| **Backend** | NestJS, MongoDB (Mongoose), Vercel AI SDK |
| **Streaming** | Server-Sent Events (SSE) via Vercel AI SDK `streamText` |
| **Auth** | JWT (user sessions) + Integration Keys (API access) |
| **LLM Routing** | OpenRouter unified API + direct provider integrations |
| **Search** | Tavily Search API |
| **MCP** | Model Context Protocol client via `@modelcontextprotocol/sdk` |
