# Python SDK Guide

Use the `aetherflow-py` Python client to stream AI responses, trigger workflows, and manage conversation threads from any Python server or script.

---

### Installation

```bash
pip install aetherflow
```

---

### Initialize the Client

```python
from aetherflow import AetherFlow

af = AetherFlow(
    api_key="af_live_42910aef192b",          # integration key
    workspace_id="6a3329fedc827a13d85059fd", # workspace ObjectId
    base_url="https://aetherflow-api.vercel.app",  # optional
    timeout=60.0,                            # seconds
)
```

---

### Stream a Chat Completion

```python
import sys

def on_chunk(chunk: str, accumulated: str) -> None:
    sys.stdout.write(chunk)
    sys.stdout.flush()

result = af.chat.stream(
    messages=[{"role": "user", "content": "Summarize the benefits of AI agents"}],
    model_id="openrouter/openai/gpt-4o",
    on_chunk=on_chunk,
)

print(f"\n\nFull response: {result.text}")
```

---

### Continue a Conversation

```python
# Create a conversation thread
thread = af.conversations.create(title="Support Session")

# First turn
af.chat.stream(
    messages=[{"role": "user", "content": "What is AetherFlow?"}],
    conversation_id=thread["_id"],
    on_chunk=on_chunk,
)

# Second turn (history auto-hydrated from server)
af.chat.stream(
    messages=[{"role": "user", "content": "How do I publish my first agent?"}],
    conversation_id=thread["_id"],
    on_chunk=on_chunk,
)
```

---

### Trigger a Workflow Run

```python
try:
    run = af.workflows.run(
        workflow_id="6849a3f2c1e4b90087654321",
        inputs={
            "lead_name": "Sarah Miller",
            "lead_email": "sarah@example.com"
        }
    )
    print(f"Execution succeeded. Run ID: {run['run_id']}")
    print("Outputs:", run["outputs"])

except af.AetherFlowError as e:
    print(f"API error [{e.status_code}]: {e.message}")
```

---

### Client Configuration Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `api_key` | `str` | **required** | Integration key (`af_live_...`) |
| `workspace_id` | `str` | `""` | Default workspace for all resource calls |
| `base_url` | `str` | AetherFlow cloud | Backend API URL |
| `timeout` | `float` | `60.0` | Request timeout in seconds |

---

### Error Handling

```python
from aetherflow import AetherFlow, AetherFlowError

try:
    result = af.chat.stream(messages=[...])
except AetherFlowError as e:
    print(f"[{e.status_code}] {e.message}")
except Exception as e:
    print(f"Network error: {e}")
```

> [!NOTE]
> Python SDK requires Python 3.10+. The client uses `httpx` with streaming support. Install with `pip install aetherflow[async]` to enable the asyncio-compatible async client.
