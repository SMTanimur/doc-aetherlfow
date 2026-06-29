# Client Widget Embeds

You can render conversational agent chat frames dynamically inside client sites.

### Embedding Script
```html
<div id="aetherflow-chat-root"></div>
<script>
  window.AETHERFLOW_CONFIG = {
    workspaceId: "ws_9021aef",
    agentId: "6b4290fa8e310dc411a095e2",
    theme: "light"
  };
</script>
<script src="https://cdn.aetherflow.app/widget.js" defer></script>
```

---

### Loaded callback
```json
{
  "loaded": true,
  "config": {
    "theme": "light",
    "position": "bottom-right"
  }
}
```
