# Retrieve LLM Models

Fetch all active language models and media generators available in the unified model registry. Use the returned `model_id` values to specify a model in chat streaming requests.

---

### Endpoint

```http
GET /ai-models/unified
Authorization: Bearer af_live_42910aef192b
```

---

### Response Schema

```json
{
  "models": [
    {
      "model": "openrouter/openai/gpt-4o",
      "provider": "openai",
      "model_name": "GPT-4o",
      "context_window": 128000,
      "type": "chat"
    },
    {
      "model": "openrouter/anthropic/claude-3-5-sonnet",
      "provider": "anthropic",
      "model_name": "Claude 3.5 Sonnet",
      "context_window": 200000,
      "type": "chat"
    },
    {
      "model": "openrouter/google/gemini-flash-1.5",
      "provider": "google",
      "model_name": "Gemini 1.5 Flash",
      "context_window": 1000000,
      "type": "chat"
    }
  ]
}
```

---

### Model Object Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `model` | `string` | Fully qualified model ID to use in API requests |
| `provider` | `string` | Provider name (`openai`, `anthropic`, `google`, etc.) |
| `model_name` | `string` | Human-readable display name |
| `context_window` | `number` | Maximum tokens the model can process in one request |
| `type` | `string` | Model capability type (`chat`, `vision`, `embedding`) |

---

### Using a Model ID

Pass the `model` value directly to the `model_id` field in chat streaming requests:

```json
{
  "messages": [{"role": "user", "content": "Hello!"}],
  "model_id": "openrouter/openai/gpt-4o"
}
```

> [!NOTE]
> Model availability depends on which provider connections your workspace has configured. Models from providers without active connections will return `402 No Active Key` when invoked.
