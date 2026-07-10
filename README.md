# AetherFlow Developer Documentation & Sandbox Portal

Welcome to the documentation portal and API sandbox for **AetherFlow** — the visual AI workflow orchestrator designed to automate unstructured data processing, system integrations, and agent logic.

This portal helps developers design, build, and call automated AI pipelines (such as extracting unstructured data from inbound logistics emails, routing structured JSON payloads to ERP databases, and managing multi-tenant workspace credentials).

---

## Interactive Playground Capabilities

### 📖 Rich Markdown Narrative Renderer
- **Logistics Use Case Guides**: All document sections are grounded in real-world scenarios (e.g. connecting Gmail/Outlook → LLMs → custom webhooks for platforms like Cargonexx or SAP).
- **GitHub Alerts Native Parsing**: Fully renders alert calls (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) with custom styling and matching Lucide icons.
- **Copyable Specifications**: Code blocks include inline formatting and instant copy controls.

### 🧪 API Sandbox Playground
- **Live Endpoint Triggers**: Test backend routes directly from the sidebar.
- **SSE Stream Decoding**: Simulates `/chat/stream` token streaming character-by-character inside the response terminal.
- **Auth Credentials Resolver**: Inject workspace integration keys (`af_live_...`) to execute requests.
- **Zero-Flicker Skeleton Loaders**: Pulse animations (`DocSkeleton` and `PlaygroundSkeleton`) handle asynchronous fetch states gracefully.

---

## Directory Layout

```yaml
aetherflow-doc/
├── public/                 # Static documentation content assets
│   └── docs/               # Markdown docs (Logistics overview, extraction quickstart, SDKs)
├── src/
│   ├── app/
│   │   ├── globals.css     # Theme configs and customized scrollbars
│   │   ├── layout.tsx      # Font settings (Geist & Inter)
│   │   └── page.tsx        # Docs loading state and playground run engine
│   ├── components/
│   │   └── docs/
│   │       ├── docs-sidebar.tsx       # Grouped routes list with filter search
│   │       ├── doc-skeleton.tsx       # Page loading skeletons
│   │       └── markdown-renderer.tsx  # Alerts and structured elements compiler
│   └── lib/
│       └── docs-data.ts    # Sidebar metadata categories
├── package.json            # Scripts and dependencies
└── tsconfig.json           # Compiler rules
```

---

## Guides & Endpoints Map

### 1. Get Started
- **Platform Overview**: Unstructured email extraction flows, capabilities, and workspace isolation details.
- **Quickstart Guide**: Constructing an inbound logistics parser with structured outputs step-by-step.
- **Architecture Design**: Canvas DAG compilation, node execution cycles, and variable injection.
- **Multi-Tenant Security**: Token hashing, access guards, and secret connection key vaults.
- **Billing & Credit Tiers**: Quota multipliers, subscription limits, and token usage counts.

### 2. Developer SDKs
- **Client Widget Embed**: Embedding white-labeled agent frames on custom web pages.
- **Chat Streaming (SSE)**: Raw event-stream formats for real-time text completions.
- **Workflow Execution**: Synchronous trigger endpoints for published graph pipelines.
- **Webhook Integration**: Exposing workflows via custom webhook endpoints.
- **Node.js / Python SDK Guides**: Direct, typed client package references.

### 3. API Reference
- **Integration Key Auth**: Managing secret tokens prefixed with `af_live_`.
- **Workspace Connections**: Registering custom credentials (OpenAI keys, Tavily keys, etc.).
- **Retrieve LLM Models**: Listing active unified models (GPT-4o, Claude 3.5, Gemini).
- **Retrieve API Providers**: Fetching workspace status configs for key providers.
- **Retrieve User Profile**: Accessing user scopes and roles metadata.
- **List Thread Messages**: Querying conversation histories.
- **Delete Chat Thread**: Deactivating active threads.
- **Nodes Registry API**: Retrieving parameter definitions for visual nodes.
- **Web Search API**: Interfacing with the Tavily search engine.
- **MCP Server Setup**: Exposing microservices via Model Context Protocol.
- **Quota Analytics**: Checking credit usage metrics.

---

## Getting Started

### 1. Install Dependencies
```bash
bun install
```

### 2. Launch Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the documentation portal.

### 3. Build for Production
```bash
bun run build
```
The optimized bundle compiles under `.next/` directory.
