# Retrieve Available Models

Use this endpoint to fetch all active language models and media generators available for workspace executions.

### Endpoint Contract
```http
GET /ai-models/unified
Authorization: Bearer af_live_your_integration_key_here
```

---

### Response Payload
```json
{
  "success": true,
  "models": [
    {
      "id": "gemini-1.5-pro",
      "name": "Gemini 1.5 Pro",
      "provider": "google",
      "type": "chat",
      "max_tokens": 1048576,
      "temperature_range": {
        "min": 0.0,
        "max": 2.0
      }
    },
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "provider": "openai",
      "type": "chat",
      "max_tokens": 4096,
      "temperature_range": {
        "min": 0.0,
        "max": 2.0
      }
    }
  ]
}
```
