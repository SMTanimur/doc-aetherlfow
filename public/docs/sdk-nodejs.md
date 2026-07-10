# Node.js SDK Guide

The official `@aetherflow/sdk` package gives you a typed TypeScript client to stream AI completions, manage conversations, and list agents — with zero boilerplate.

---

### Installation

```bash
# npm
npm install @aetherflow/sdk

# yarn
yarn add @aetherflow/sdk

# bun
bun add @aetherflow/sdk
```

---

### Initialize the Client

```typescript
import { AetherFlow } from '@aetherflow/sdk';

const af = new AetherFlow({
  apiKey: process.env.AF_API_KEY!,        // af_live_... integration key
  workspaceId: process.env.AF_WORKSPACE!, // your workspace ObjectId
  baseUrl: 'https://aetherflow-api.vercel.app', // optional: default is cloud
});
```

---

### Stream a Chat Completion

```typescript
const { text } = await af.chat.stream(
  {
    messages: [{ role: 'user', content: 'Explain REST APIs in one paragraph.' }],
    modelId: 'openrouter/openai/gpt-4o',
  },
  (chunk, accumulated) => {
    process.stdout.write(chunk); // stream tokens as they arrive
  }
);

console.log('\n\nFull response:', text);
```

---

### Continue a Conversation

```typescript
// Step 1 — Create a thread
const thread = await af.conversations.create({ title: 'Support Chat' });

// Step 2 — First turn
await af.chat.stream(
  { messages: [{ role: 'user', content: 'What is AetherFlow?' }], conversationId: thread._id },
  (chunk) => process.stdout.write(chunk)
);

// Step 3 — Follow-up (history auto-hydrated from server)
await af.chat.stream(
  { messages: [{ role: 'user', content: 'How do I create my first agent?' }], conversationId: thread._id },
  (chunk) => process.stdout.write(chunk)
);
```

---

### Manage Conversations

```typescript
// List all threads
const { docs } = await af.conversations.list({ page: 1, limit: 20 });

// Get a single thread with its messages
const messages = await af.conversations.messages(thread._id);

// Delete a thread
await af.conversations.delete(thread._id);
```

---

### Client Configuration Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | **required** | Integration key starting with `af_live_` |
| `workspaceId` | `string` | `''` | Default workspace ID for all resource calls |
| `baseUrl` | `string` | AetherFlow cloud | Your backend API URL |
| `timeout` | `number` | `60000` | Request timeout in milliseconds |

---

### Error Handling

```typescript
import { AetherFlow, AetherFlowError } from '@aetherflow/sdk';

try {
  await af.chat.stream({ messages: [...] });
} catch (err) {
  if (err instanceof AetherFlowError) {
    console.error(`[${err.statusCode}] ${err.message}`);
  }
}
```

> [!NOTE]
> The SDK is compatible with Node.js 18+, Deno, Bun, and modern browsers. It uses the native `fetch` API and `ReadableStream` — no polyfills required.
