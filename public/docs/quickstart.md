# Quickstart Guide

This guide will help you embed your visual agent onto a client-side HTML page in under 5 minutes.

### 1. Embed script code
Add the following JavaScript snippet at the end of your HTML body:

```html
<script src="https://cdn.aetherflow.app/widget.js" 
  data-agent-id="6b4290fa8e310dc411a095e2" 
  data-workspace-id="ws_9021aef"
  defer>
</script>
```

---

### 2. Verify connection
Once embedded, the browser console will logs:

```json
{
  "status": "connected",
  "agent": "Customer Support Bot",
  "websocket": "active"
}
```
