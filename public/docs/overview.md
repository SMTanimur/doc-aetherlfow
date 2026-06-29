# Platform Overview

AetherFlow functions as a multi-tenant **Agent-as-a-Service** provider. Any developer or business can build complex AI agents on our visual canvas, and expose them as embeddable widgets or API integrations on their own external websites.

### Key Multi-Tenant Features
* **Isolated Workspaces:** Every developer manages their own workspace, billing tier, and connections.
* **Token Quota Gating:** Outgoing API runs check the workspace credit balances in real-time.
* **Custom API Keys:** Developers generate workspace-scoped API keys to authorize external execution queries securely.

> [!NOTE]
> **API Key Safety:** Always execute AetherFlow queries on your secure server backend if utilizing platform-wide API keys to prevent exposure.
