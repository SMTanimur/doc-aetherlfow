# Web Search API

Trigger a background search engine query via Tavily, returning structured search summaries and page references.

### Endpoint Contract
```http
POST /chat/search
Authorization: Bearer af_live_your_integration_key_here
Content-Type: application/json
```

---

### Request Body JSON
```json
{
  "query": "Who won the 2026 World Cup?",
  "max_results": 3
}
```

---

### Response Payload
```json
{
  "success": true,
  "results": [
    {
      "title": "World Cup 2026 Winner Summary",
      "url": "https://sports-news.com/worldcup",
      "snippet": "The tournament concluded with a historic win..."
    }
  ]
}
```
