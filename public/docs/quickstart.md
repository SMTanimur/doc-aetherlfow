# Quickstart Guide

Get your first AetherFlow agent running in under **5 minutes**. This guide walks from zero to a live streaming agent — first via the widget embed, then via the REST API.

---

### Step 1 — Create a Workspace & Agent

1. Sign in at [aetherflow-omega.vercel.app](https://aetherflow-omega.vercel.app/)
2. Create a new **Workspace** from the dashboard.
3. Open the **Visual Canvas** and add a `Chat Input → LLM → Chat Output` node chain.
4. Click **Publish** to make the agent available via API.

---

### Step 2 — Generate an Integration Key

Navigate to **Workspace Settings → Integration Keys** and generate a new key.

Your key will look like:

```bash
af_live_42910aef192b...
```

Keep this key secret — it grants full API access to your workspace.

---

### Step 3 — Embed the Widget (Client-Side)

Add one script tag to your HTML page. The agent bubble will appear automatically:

```html
<script
  src="https://cdn.aetherflow.app/widget.js"
  data-agent-id="6b4290fa8e310dc411a095e2"
  data-workspace-id="6a3329fedc827a13d85059fd"
  defer
></script>
```

Once loaded, the browser console confirms:

```json
{
  "status": "connected",
  "agent": "Customer Support Bot",
  "websocket": "active"
}
```

---

### Step 4 — Call the API (Server-Side)

Use your integration key to stream a response from the agent:

```bash
curl -X POST https://aetherflow-api.vercel.app/chat/stream \
  -H "Authorization: Bearer af_live_42910aef192b" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello, what can you help me with?"}],
    "workspace_id": "6a3329fedc827a13d85059fd"
  }' \
  --no-buffer
```

The response streams token-by-token using Server-Sent Events (SSE).

---

### What's Next?

| Guide | Description |
| :--- | :--- |
| **Chat Streaming (SSE)** | Full streaming API reference with payload schema |
| **Node.js SDK** | Install `@aetherflow/sdk` for typed streaming helpers |
| **Integration Key Auth** | Key management, rotation, and security best practices |
| **Workflow Execution** | Trigger full workflow pipelines via REST |
