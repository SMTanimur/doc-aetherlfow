# Client Widget Embed

Embed a full-featured AI chat interface into any HTML page with a single script tag. The AetherFlow widget renders a floating chat bubble that connects to your published agent in real time.

---

### Basic Embed

Add this snippet before the closing `</body>` tag of any HTML page:

```html
<div id="aetherflow-chat-root"></div>
<script>
  window.AETHERFLOW_CONFIG = {
    workspaceId: "6a3329fedc827a13d85059fd",
    agentId: "6b4290fa8e310dc411a095e2",
    theme: "light"
  };
</script>
<script src="https://cdn.aetherflow.app/widget.js" defer></script>
```

Once loaded, the widget confirms connection via the browser console:

```json
{
  "status": "connected",
  "agent": "Customer Support Bot",
  "config": { "theme": "light", "position": "bottom-right" }
}
```

---

### Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `workspaceId` | `string` | — | Your workspace MongoDB ObjectId |
| `agentId` | `string` | — | ID of the published agent to load |
| `theme` | `"light"` \| `"dark"` | `"light"` | Widget color scheme |
| `position` | `"bottom-right"` \| `"bottom-left"` | `"bottom-right"` | Bubble position on screen |
| `primaryColor` | `string` | `"#4F46E5"` | Custom accent hex color for the chat header |
| `placeholder` | `string` | `"Ask anything..."` | Input placeholder text |
| `autoOpen` | `boolean` | `false` | Auto-open the chat window on page load |

---

### Advanced Initialization

For more control, initialize the widget programmatically after page load:

```html
<script src="https://cdn.aetherflow.app/widget.js"></script>
<script>
  AetherFlow.init({
    workspaceId: "6a3329fedc827a13d85059fd",
    agentId: "6b4290fa8e310dc411a095e2",
    theme: "dark",
    position: "bottom-left",
    primaryColor: "#7C3AED",
    autoOpen: true,
    onReady: () => console.log("Widget loaded"),
    onMessage: (msg) => console.log("User sent:", msg)
  });
</script>
```

---

### Publishing Your Agent

Before embedding, your agent must be published. Navigate to the **Canvas Editor → Publish** button in the dashboard. Unpublished agents will refuse widget connections with a `403 Agent Not Published` error.

> [!NOTE]
> The widget script is loaded from AetherFlow's CDN and cached at the edge. Widget code updates roll out automatically without requiring re-embedding.
