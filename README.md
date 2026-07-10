# AetherFlow AI 🌌

AetherFlow AI is a premium, multi-tenant visual autonomous agent orchestrator and studio. It empowers developers and teams to build, simulate, test, and scale complex, stateful AI workflows using a low-code, drag-and-drop node canvas.

---

## How It Works

AetherFlow compiles visual canvas topologies into a **Directed Acyclic Graph (DAG) state machine**. It handles variable passing, conditional branching, database writes, and external API requests automatically.

### 🚚 Real-World Use Case: Autonomous Agentic Loop Ingestion
AetherFlow excels at automating complex decision-making, such as running a reasoning loop to parse emails, retrieve database facts, call tools, and sync-write to target ERP platforms (like Cargonexx):

```
                  ┌───────────────────────┐
                  │ 📧 Goal / Email Input │
                  └───────────────────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   Agent Planner/LLM   │◀────┐
                  │ (Reasoning & Routing) │     │ (Autonomous loop)
                  └───────────────────────┘     │
                              │                 │
                ┌─────────────┴─────────────┐   │ Execute & Refine
                ▼                           ▼   │ context
       ┌─────────────────┐         ┌─────────────────┐  │
       │ Web Search Tool │         │ MCP Database DB │  │
       │ (Tavily Query)  │         │ (SQL/Postgres)  │  │
       └─────────────────┘         └─────────────────┘  │
                │                           │           │
                └─────────────┬─────────────┘           │
                              ▼                         │
                      [ Evaluate Results ] ─────────────┘
                              │
                    (Goal Achieved / Done)
                              │
                              ▼
                  ┌───────────────────────┐
                  │    Target Integration │
                  │  (ERP / Cargonexx)    │
                  └───────────────────────┘
```

---

## Core Features 🌟

### 🎨 Visual Flow Builder
- **React Flow v12 Engine** — An infinite, zoomable canvas with grid support, customizable nodes, and visual connectors.
- **Node Topology** — Chain start triggers, LLM solvers, branch conditions, iterative loops, DB helpers, and HTTP triggers.

### 🧠 Dynamic LLM Router
- **Unified Providers** — Connect OpenAI, Anthropic, Google Gemini, DeepSeek, or community models via OpenRouter.
- **On-the-Fly Switching** — Switch model providers inside a node configuration without modifying variables or downstream nodes.

### 📁 Structured Output Enforcement
- **JSON Schema Mapping** — Force LLMs to return strict JSON matching your database schema parameters.
- **Unstructured Data Parsing** — Automatically extract variables from loose emails, document texts, and PDFs.

### ⚡ Real-Time Streaming Simulator
- **SSE Stream Decoding** — Test executions inside the Studio via the chat sidebar. Text tokens stream in real time.
- **Variable Tracing** — Check system prompts, token usage counts, runtime costs, and individual node latency metrics.

### 🔌 Secure Connections Vault
- **AES-256-GCM Encryption** — Third-party API credentials (keys for Tavily, OpenAI, database URIs) are encrypted at rest.
- **Decoupled Node Configurations** — Canvas nodes reference connections by ID instead of hardcoding raw secret values.

### 🛡️ Workspace Quota & Key Gating
- **Shared Key Mode** — Execute queries using platform-provided keys, capped by your workspace credit balance.
- **Own Key Mode** — Use your own API keys for executions, completely bypassing credit billing gates.

### 📊 Admin Control Center
- **Plan Configuration** — Manage global plan templates, seat caps, reset windows, and discount rates.
- **Workspace Billing Analytics** — Monitor MRR metrics and trace workspace usage trends.
