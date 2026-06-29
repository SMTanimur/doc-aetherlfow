# Python SDK Guide

Official Python library integration package to execute canvas workflows, manage chat threads, and retrieve active connections.

### 1. Installation
Install the package from PyPI using pip:
```bash
pip install aetherflow
```

---

### 2. Client Initialization
Create a client instance by registering workspace keys and custom request limits:
```python
from aetherflow import AetherFlowClient

client = AetherFlowClient(
    api_key="af_key_88031cd2e9821",       # Workspace developer API key
    workspace_id="ws_9021aef3b129",       # Active workspace ID
    timeout=12.0,                         # Connection timeout duration (seconds)
    max_retries=3                         # Retries on server connection drops
)
```

---

### 3. Running Workflows
Submit input parameter blocks to execute visual canvas graphs synchronously:
```python
try:
    response = client.workflows.run(
        workflow_id="wf_60b8a1c900e2",
        inputs={
            "lead_name": "Sarah Miller",
            "lead_email": "sarah@example.com"
        }
    )
    print(f"Pipeline succeeded. Run ID: {response.run_id}")
    print("Outputs:", response.outputs)

except Exception as e:
    # Catch custom library request exception blocks
    if hasattr(e, "status_code"):
        print(f"API Error [Code {e.status_code}]: {e.message}")
    else:
        print("Connection exception occurred:", e)
```

---

### 4. Interactive Chat Streaming (SSE)
Generate response token increments using stream generators:
```python
import sys

def stream_chat():
    try:
        # Establish a connection to the streaming controller
        stream = client.chats.stream(
            messages=[
                {"role": "user", "content": "How do I upgrade my shipping?"}
            ],
            agent_info={
                "name": "Customer Support Bot",
                "workspace_id": "ws_9021aef3b129"
            }
        )

        print("Streaming response:")
        for chunk in stream:
            sys.stdout.write(chunk.text)
            sys.stdout.flush()
        print("\nStream completed successfully.")

    except Exception as err:
        print("Chat streaming failed:", err)
```

---

### 5. SDK Parameter Schema
Below are the data classes defined inside the client library helper interfaces:

| Parameter Model | Field | Type | Description |
| :--- | :--- | :--- | :--- |
| **AetherFlowClient** | `api_key` | `str` | Developer credentials token. |
| | `workspace_id` | `str` | Target workspace identifier. |
| | `timeout` | `float` | Request timeout interval. |
| **WorkflowResponse** | `run_id` | `str` | Unique database execution run ID. |
| | `status` | `str` | Success status tracker string. |
| | `outputs` | `dict` | Output keys gathered from terminal nodes. |
