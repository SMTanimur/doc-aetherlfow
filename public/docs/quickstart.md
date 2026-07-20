# Quickstart Guide

This guide walks you through building your first AetherFlow pipeline: an **automated email data extraction agent** that parses unstructured inbound emails (like shipping logs or invoices) and sends the structured output to an external endpoint.

---

### Step 1 — Create a Workspace & Workflow

1. Navigate to the AetherFlow console dashboard.
2. Select **Workspaces → Create Workspace**.
3. Create a new **Workflow** called `Inbound Logistics Parser`.
4. Drag and drop the following node sequence onto the canvas:
   ```
   Chat Input ──▶ LLM (GPT-4o) ──▶ HTTP Request (Webhook)
   ```

---

### Step 2 — Configure Structured Extraction

Select the **LLM Node** and define its system prompt to enforce structured JSON extraction:

```markdown
You are an AI parser. Extract the following properties from the user's email:
- `carrier` (string)
- `inbound_date` (YYYY-MM-DD)
- `volume_tons` (number)

Output raw JSON only.
```

Configure the **HTTP Request Node** to send a POST request containing the extracted JSON properties to your target logistics platform (e.g. `https://api.cargonexx.com/inbox`).

---

### Step 3 — Get Your Integration Key

Go to **Workspace Settings → Integration Keys** and generate a new access token:

```bash
af_live_your_key_here
```

---

### Step 4 — Run Sandbox Test

Trigger the workflow simulation by sending an unstructured email payload:

```bash
curl -X POST https://aetherflow-api.vercel.app/chat/stream \
  -H "Authorization: Bearer af_live_42910aef192b" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Hi Team, we have a cargo shipment coming in from Cargonexx on Friday 2026-07-12. Volume is 45 tons. Thanks!"
      }
    ],
    "agent_id": "6b4290fa8e310dc411a095e2"
  }' \
  --no-buffer
```

The LLM node extracts the structured properties in real time:

```json
{
  "carrier": "Cargonexx",
  "inbound_date": "2026-07-12",
  "volume_tons": 45
}
```

This output is then forwarded automatically to the target webhook.
