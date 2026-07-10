# Web Search API

Trigger a real-time web search powered by the Tavily Search Engine. Returns structured results including page titles, URLs, and summarized snippets.

---

### Endpoint

```http
POST /workflow-nodes/web-search
Authorization: Bearer af_live_42910aef192b
Content-Type: application/json

{
  "query": "Latest advances in AI agent frameworks 2026",
  "max_results": 5
}
```

---

### Request Schema

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `query` | `string` | ✅ | — | The natural language search query |
| `max_results` | `number` | ❌ | `3` | Maximum number of results to return (1–10) |
| `search_depth` | `string` | ❌ | `"basic"` | `"basic"` or `"advanced"` — advanced uses more credits |
| `include_domains` | `string[]` | ❌ | `[]` | Restrict results to these domains |
| `exclude_domains` | `string[]` | ❌ | `[]` | Exclude results from these domains |

---

### Response Schema

```json
{
  "query": "Latest advances in AI agent frameworks 2026",
  "answer": "In 2026, leading AI agent frameworks include...",
  "results": [
    {
      "title": "Top AI Agent Frameworks in 2026",
      "url": "https://aiweekly.co/ai-agent-frameworks",
      "snippet": "The landscape of AI agent frameworks has shifted dramatically...",
      "published_date": "2026-06-15"
    },
    {
      "title": "LLM Orchestration Tools Compared",
      "url": "https://towardsdatascience.com/llm-orchestration",
      "snippet": "LangChain, CrewAI, and AetherFlow are leading the orchestration space...",
      "published_date": "2026-05-28"
    }
  ]
}
```

---

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `query` | `string` | The original search query |
| `answer` | `string` | AI-generated answer synthesized from top results |
| `results` | `array` | Array of matching web pages |
| `results[].title` | `string` | Page title |
| `results[].url` | `string` | Source URL |
| `results[].snippet` | `string` | Relevant excerpt from the page |
| `results[].published_date` | `string` | Publication date if available |

> [!NOTE]
> Web search requires an active Tavily connection in your workspace. Add your Tavily API key under **Workspace Settings → Connections**.
