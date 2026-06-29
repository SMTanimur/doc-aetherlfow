# NodeJS SDK Guide

Official integration package to run workflows, chat threads, and manage connections on your backend server.

### 1. Installation
Install the package inside your project directory:
```bash
npm install @aetherflow/sdk
```

---

### 2. Client Initialization
Configure authorization and set connection timeout properties:
```javascript
const { AetherFlowClient } = require('@aetherflow/sdk');

const client = new AetherFlowClient({
  apiKey: 'af_key_88031cd2e9821',      // Your developer workspace API key
  workspaceId: 'ws_9021aef3b129',      // Target workspace ID
  timeout: 10000,                      // Timeout in milliseconds (default: 15s)
  maxRetries: 3                        // Automatic request retries on 5xx status
});
```

---

### 3. Running Workflows
Execute workflow pipelines synchronously by sending input schemas:
```javascript
async function executeWorkflow() {
  try {
    const run = await client.workflows.run('wf_60b8a1c900e2', {
      inputs: {
        lead_name: "Sarah Miller",
        lead_email: "sarah@example.com"
      }
    });

    console.log(`Execution succeeded. Run ID: ${run.runId}`);
    console.log('Outputs:', run.outputs);
  } catch (error) {
    if (error.name === 'AetherFlowError') {
      console.error(`API Error [Status ${error.status}]: ${error.message}`);
    } else {
      console.error('Network error:', error);
    }
  }
}
```

---

### 4. Interactive Chat Streaming (SSE)
Establish a token streaming thread listener using asynchronous generators:
```javascript
async function streamAgentChat() {
  try {
    const stream = await client.chats.stream({
      messages: [
        { role: 'user', content: 'What shipping modes are available?' }
      ],
      agentInfo: {
        name: 'Support Bot',
        workspaceId: 'ws_9021aef3b129'
      }
    });

    console.log('Streaming response:');
    for await (const chunk of stream) {
      process.stdout.write(chunk.text);
    }
    console.log('\nStream completed.');
  } catch (error) {
    console.error('Failed to stream response:', error.message);
  }
}
```

---

### 5. API Client Typings Reference
Below are the TypeScript interfaces exported by the SDK library:

| Type / Interface | Field | Type | Description |
| :--- | :--- | :--- | :--- |
| **AetherFlowConfig** | `apiKey` | `string` | Secret developer credential token. |
| | `workspaceId` | `string` | Unique workspace identifier. |
| | `timeout` | `number` | Maximum request duration before abortion. |
| **WorkflowRunResponse** | `runId` | `string` | MongoDB execution tracker ID. |
| | `status` | `'succeeded' \| 'failed'` | Final execution pipeline status. |
| | `outputs` | `Record<string, any>` | Outputs returned from endpoint nodes. |
