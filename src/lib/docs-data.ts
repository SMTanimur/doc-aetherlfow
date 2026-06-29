export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  description: string;
  headers?: Record<string, string>;
  body?: Record<string, string>;
  response: Record<string, unknown> | string;
}

export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface SchemaDef {
  name: string;
  description: string;
  fields: SchemaField[];
  indexes?: string[];
}

export interface NodeParam {
  name: string;
  type: string;
  description: string;
}

export interface NodeDef {
  type: string;
  name: string;
  description: string;
  inputs: NodeParam[];
  outputs: NodeParam[];
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    path: '/auth/login',
    method: 'POST',
    description: 'Authenticates a user and returns a JWT access token.',
    body: {
      email: 'user@example.com (Required)',
      password: '•••••••• (Required)',
    },
    response: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: { id: '6a326e1e4342e491013ca5b3', email: 'user@example.com', name: 'John Doe' }
    }
  },
  {
    path: '/workspaces',
    method: 'GET',
    description: 'Retrieves all workspaces the current user has access to.',
    headers: { Authorization: 'Bearer <token>' },
    response: {
      docs: [
        { _id: '6f81a7b2901ce8d53ef69021', name: 'Dev Workspace', ownerId: '6a326e1e4342e491013ca5b3' }
      ]
    }
  },
  {
    path: '/quota/:workspaceId',
    method: 'GET',
    description: 'Fetches active plan details, remaining tokens, and agent limit flags.',
    headers: { Authorization: 'Bearer <token>' },
    response: {
      tokens_used: 12500,
      effective: { token_limit: 100000, agent_cap: 50 },
      window: { chat_used: 12, workflow_run_used: 4 },
      agent_count: 12,
      is_over_quota: false,
      subscription: { plan: 'BASIC', status: 'active' }
    }
  },
  {
    path: '/quota/:workspaceId/key-mode',
    method: 'PATCH',
    description: 'Toggles key authorization mode between central key and own API keys.',
    headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
    body: {
      key_mode: 'own_key | aetherflow (Required)'
    },
    response: {
      success: true,
      key_mode: 'own_key'
    }
  },
  {
    path: '/workflows',
    method: 'POST',
    description: 'Creates a new workflow/agent on the canvas.',
    headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
    body: {
      name: 'Customer Support Bot (Required)',
      description: 'Handles basic inquiries',
      agent_type: 'CONVERSATIONAL_AGENT | WORKFLOW',
    },
    response: {
      _id: '6b4290fa8e310dc411a095e2',
      name: 'Customer Support Bot',
      is_draft: true,
      nodes: [],
      edges: []
    }
  },
  {
    path: '/executions/runs',
    method: 'POST',
    description: 'Starts execution of a workflow. Gated by workspace quota limits.',
    headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
    body: {
      workflow_id: '6b4290fa8e310dc411a095e2 (Required)',
      inputs: '{ "query": "hello" }'
    },
    response: {
      run_id: 'run-1718002931',
      status: 'running',
      started_at: '2026-06-29T03:14:00Z'
    }
  }
];

export const schemasData: SchemaDef[] = [
  {
    name: 'Workflow',
    description: 'Models a canvas agent/workflow graph.',
    fields: [
      { name: 'workspace_id', type: 'ObjectId (ref Workspace)', required: false, description: 'Association with workspace' },
      { name: 'name', type: 'String', required: true, description: 'Display name' },
      { name: 'agent_type', type: 'Enum (AgentType)', required: true, description: 'CONVERSATIONAL_AGENT or WORKFLOW' },
      { name: 'nodes', type: 'Array<Object>', required: false, description: 'ReactFlow raw node objects list' },
      { name: 'edges', type: 'Array<Object>', required: false, description: 'ReactFlow edge connections list' },
      { name: 'is_template', type: 'Boolean', required: false, description: 'Whether it is visible in the library templates' },
      { name: 'is_global', type: 'Boolean', required: false, description: 'Whether it is a system-wide administrative template' }
    ],
    indexes: ['workspace_id: 1, agent_type: 1', 'workspace_id: 1, creator_id: 1']
  },
  {
    name: 'WorkspaceQuota',
    description: 'Manages rolling usage windows and token usage balances.',
    fields: [
      { name: 'workspace_id', type: 'ObjectId', required: true, description: 'Unique association with workspace' },
      { name: 'tokens_used', type: 'Number', required: true, description: 'Tokens consumed in current window' },
      { name: 'credits_balance', type: 'Number', required: true, description: 'Pay-as-you-go credits balance' },
      { name: 'override_token_limit', type: 'Number', required: false, description: 'Manual override set by system admin' }
    ]
  }
];

export const nodesData: NodeDef[] = [
  {
    type: 'llm',
    name: 'LLM Node',
    description: 'Executes a language model prompt using configured system/personal API keys.',
    inputs: [
      { name: 'prompt_template', type: 'Array<{ role, content }>', description: 'Jinja-templated prompt structure' },
      { name: 'model', type: 'String', description: 'Model identifier (e.g. gemini-1.5-pro)' }
    ],
    outputs: [
      { name: 'text', type: 'String', description: 'Resulting text completion' },
      { name: 'usage', type: 'Object', description: 'Tokens usage log object' }
    ]
  },
  {
    type: 'http-request',
    name: 'HTTP Client Node',
    description: 'Issues dynamic HTTP calls to external APIs with path parameter substitution.',
    inputs: [
      { name: 'url', type: 'String', description: 'Target URL with braces placeholders' },
      { name: 'method', type: 'Enum (GET|POST|PATCH|DELETE)', description: 'HTTP method verb' }
    ],
    outputs: [
      { name: 'status_code', type: 'Number', description: 'HTTP Response status' },
      { name: 'body', type: 'String', description: 'Raw body string outcome' }
    ]
  }
];
