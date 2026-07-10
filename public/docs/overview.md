# Platform Overview

AetherFlow is a **multi-tenant AI Workflow Orchestration platform** designed to automate unstructured data processing, system integrations, and agent logic. 

Logistics teams, customer support groups, and operations developers use AetherFlow to build resilient node graphs that extract, classify, and route incoming data streams in real time.

---

### Inbound Email Extraction Workflow

A classic application of AetherFlow is automating the extraction of unstructured logistics and inbound email data:

```
 Inbound Email           AetherFlow Pipeline            Target System
┌──────────────┐       ┌──────────────────────┐        ┌──────────────┐
│  Email / PDF │ ───▶  │  1. Email Parse Node │ ───▶   │ ERP Database │
│  (Unstructure)       │  2. LLM Parser       │        │ (Cargonexx,  │
└──────────────┘       │  3. Connection Node  │        │  SAP, etc.)  │
                       └──────────────────────┘        └──────────────┘
```

By chaining visual nodes together, you can convert unstructured email text directly into clean database schema parameters, saving time and resource costs while enhancing operational accuracy.

---

### Key Automation Capabilities

| Capability | Description | Example Use Case |
| :--- | :--- | :--- |
| **Email Processing** | Monitor inbound SMTP, IMAP, or Outlook triggers | Extract cargo manifest details from supplier emails |
| **Structured Output** | Force LLMs to return strict JSON matching your database schema | Map loose text variables into typed DB fields |
| **Tool Integration** | Execute Tavily search, trigger webhooks, or query internal databases | Cross-reference supplier rates with live market quotes |
| **Error Handling** | Configure automatic retries, timeouts, and fallback answers | Maintain database writes even during LLM API drops |

---

### Zero-Trust Tenant Isolation

Every enterprise operates inside a secure, fully partitioned **Workspace**:

- **Encrypted Credentials** — External provider API keys (OpenAI, Anthropic, Tavily) are stored securely under workspace connections and resolved at runtime.
- **Credit Gating** — Token limits and credit balances are verified before routing any execution events, keeping resource utilization in check.
- **Isolated Node Executions** — Workflows run inside sandboxed contexts with strict memory, timeout, and execution budget boundaries.

> [!NOTE]
> **Production Gating:** Never expose your workspace integration keys (`af_live_...`) in client-side code or shared git repositories. Always trigger production executions on a secure server environment.
