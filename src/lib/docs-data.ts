export interface DocSection {
  id: string;
  category: 'GET STARTED' | 'DEVELOPER SDK' | 'API REFERENCE';
  title: string;
  subtitle: string;
  filePath: string;
}

export const docsSections: DocSection[] = [
  // ─── GET STARTED ──────────────────────────────────────────────────────────
  {
    id: 'overview',
    category: 'GET STARTED',
    title: 'Platform Overview',
    subtitle: 'AetherFlow multi-tenant Agent-as-a-Service architecture.',
    filePath: '/docs/overview.md'
  },
  {
    id: 'quickstart',
    category: 'GET STARTED',
    title: 'Quickstart Guide',
    subtitle: 'Deploy your first agent widget in under 5 minutes.',
    filePath: '/docs/quickstart.md'
  },
  {
    id: 'architecture',
    category: 'GET STARTED',
    title: 'Architecture Design',
    subtitle: 'Visual node graph execution pipeline and engines.',
    filePath: '/docs/architecture.md'
  },
  {
    id: 'security',
    category: 'GET STARTED',
    title: 'Multi-Tenant Security',
    subtitle: 'Data isolation, auth keys, and workspace safety.',
    filePath: '/docs/security.md'
  },
  {
    id: 'billing-credits',
    category: 'GET STARTED',
    title: 'Billing & Credit Tiers',
    subtitle: 'Token usage metrics, consumption, and plans.',
    filePath: '/docs/billing-credits.md'
  },

  // ─── DEVELOPER SDK ────────────────────────────────────────────────────────
  {
    id: 'widget-embed',
    category: 'DEVELOPER SDK',
    title: 'Client Widget Embed',
    subtitle: 'Embed chat bubbles on third-party HTML pages.',
    filePath: '/docs/widget-embed.md'
  },
  {
    id: 'agent-conversation',
    category: 'DEVELOPER SDK',
    title: 'Chat Streaming (SSE)',
    subtitle: 'Stream real-time agent reply tokens over SSE.',
    filePath: '/docs/agent-conversation.md'
  },
  {
    id: 'workflow-run',
    category: 'DEVELOPER SDK',
    title: 'Workflow Execution',
    subtitle: 'Execute visual canvas workflow pipelines.',
    filePath: '/docs/workflow-run.md'
  },
  {
    id: 'webhook-trigger',
    category: 'DEVELOPER SDK',
    title: 'Webhook Integration',
    subtitle: 'Trigger workflow pipelines via secure callbacks.',
    filePath: '/docs/webhook-trigger.md'
  },
  {
    id: 'sdk-nodejs',
    category: 'DEVELOPER SDK',
    title: 'NodeJS SDK Guide',
    subtitle: 'Official AetherFlow NPM integration package guide.',
    filePath: '/docs/sdk-nodejs.md'
  },
  {
    id: 'sdk-python',
    category: 'DEVELOPER SDK',
    title: 'Python SDK Guide',
    subtitle: 'Official Python client package integration guide.',
    filePath: '/docs/sdk-python.md'
  },

  // ─── API REFERENCE ────────────────────────────────────────────────────────
  {
    id: 'auth-login',
    category: 'API REFERENCE',
    title: 'Developer Auth',
    subtitle: 'Generate token authorizations via developer keys.',
    filePath: '/docs/auth-login.md'
  },
  {
    id: 'connections',
    category: 'API REFERENCE',
    title: 'Workspace Connections',
    subtitle: 'Manage secure connection credentials in workspaces.',
    filePath: '/docs/connections.md'
  },
  {
    id: 'get-models',
    category: 'API REFERENCE',
    title: 'Retrieve LLM Models',
    subtitle: 'Endpoint to fetch active LLM and media models.',
    filePath: '/docs/get-models.md'
  },
  {
    id: 'get-providers',
    category: 'API REFERENCE',
    title: 'Retrieve API Providers',
    subtitle: 'Endpoint to fetch configured service key providers.',
    filePath: '/docs/get-providers.md'
  },
  {
    id: 'get-profile',
    category: 'API REFERENCE',
    title: 'Retrieve User Profile',
    subtitle: 'Fetch authenticated user details and active scopes.',
    filePath: '/docs/get-profile.md'
  },
  {
    id: 'get-messages',
    category: 'API REFERENCE',
    title: 'List Thread Messages',
    subtitle: 'Fetch paginated chat messages for a thread.',
    filePath: '/docs/get-messages.md'
  },
  {
    id: 'delete-thread',
    category: 'API REFERENCE',
    title: 'Delete Chat Threads',
    subtitle: 'Remove conversation threads and delete cached history.',
    filePath: '/docs/delete-thread.md'
  },
  {
    id: 'get-nodes',
    category: 'API REFERENCE',
    title: 'Nodes Registry API',
    subtitle: 'Get metadata definitions for all canvas nodes.',
    filePath: '/docs/get-nodes.md'
  },
  {
    id: 'web-search',
    category: 'API REFERENCE',
    title: 'Web Search API',
    subtitle: 'Trigger background Tavily engine queries.',
    filePath: '/docs/web-search.md'
  },
  {
    id: 'mcp-servers',
    category: 'API REFERENCE',
    title: 'MCP Server Setup',
    subtitle: 'Register private Model Context Protocol endpoints.',
    filePath: '/docs/mcp-servers.md'
  }
];
