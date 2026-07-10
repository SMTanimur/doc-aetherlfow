# Architecture Design

AetherFlow compiles visual canvas topologies into a **Directed Acyclic Graph (DAG) state machine**. This architecture allows you to chain raw trigger inputs, conditional logic branches, custom tools, and output sinks into a unified, serverless execution context.

---

### Data Flow Execution Pipeline

Below is the lifecycle of an execution trigger (for example, a parsed inbound email route):

```
Inbound Trigger (Webhook / API)
         │
         ▼
┌────────────────┐     ┌──────────────┐     ┌────────────────┐
│  Auth Guard    │────▶│  Credential  │────▶│  Topological   │
│  (FlexAuth)    │     │  Resolver    │     │  Graph Engine  │
└────────────────┘     └──────────────┘     └────────────────┘
                                                    │
                      ┌─────────────────────────────┤
                      ▼                             ▼
             ┌─────────────────┐           ┌──────────────────┐
             │ LLM Solver Node │           │ Custom Tool Nodes│
             │ GPT-4o / Claude │           │ Web Search, MCP, │
             │ JSON extraction │           │ Database Queries │
             └─────────────────┘           └──────────────────┘
                      │                             │
                      └──────────────┬──────────────┘
                                     ▼
                            ┌─────────────────┐
                            │ Webhook Outbox  │ ──▶ External ERP
                            │ (SAP/Cargonexx) │
                            └─────────────────┘
```

---

### Core Pipeline Node Types

| Node Type | Category | Core Purpose |
| :--- | :--- | :--- |
| **Trigger Input** | I/O | Receives unstructured raw strings (emails, messages) from API calls or webhooks |
| **LLM Solver** | AI | Processes prompts, formats outputs via strict schemas, and routes to selected providers |
| **Web Search** | Tool | Queries search engines (Tavily) to augment prompts with real-time web facts |
| **Database Connector** | Tool | Connects directly to PostgreSQL, MySQL, or MongoDB databases inside the workspace |
| **MCP Server** | Tool | Interlaces Model Context Protocol tool endpoints directly into LLM nodes |
| **HTTP Action** | Tool | Executes custom requests to external endpoints (e.g. POST manifests to Cargonexx) |

---

### Safe Multi-Tenant Architecture

- **Context Isolation** — Each run spins up an isolated node state. Data variable references like `{{trigger.body.subject}}` are compiled on-the-fly and cleaned up immediately after run completion.
- **Quota Enforcer** — A pre-flight guard verifies workspace credit balances before routing payloads to LLM APIs, preventing runaways.
- **Envelope Encryption** — API keys stored in workspace Connections are encrypted at rest using AES-256-GCM.
- **Visual Compile** — The React Flow canvas exports node states into a clean JSON manifest. The backend validates and compile-checks this graph before publish.
