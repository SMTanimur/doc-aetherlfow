# Architecture Design

AetherFlow compiles your visual canvas layouts into a Directed Acyclic Graph (DAG) state machine schema, resolving connections and node variables upstream.

### Execution Cycle
1. **Trigger Intake:** Receives external payload inputs via webhooks or chat stream calls.
2. **Variable Mappings:** Interpolates workspace environment vars (e.g. `{{secrets.openai_key}}`).
3. **Graph Traversal:** Processes nodes in execution order.
4. **Output Compilation:** Compiles outputs and calculates credit quota consumption.

---

### Node Topology Schema
```json
{
  "graph_id": "dag_8019a2e3b",
  "nodes_count": 4,
  "edges": [
    { "from": "start_node", "to": "llm_node" }
  ]
}
```
