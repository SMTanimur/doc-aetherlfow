# Billing & Credit Tiers

Learn how your workspace token runs are calculated, billed, and debited.

### Consumption Rules
* **Chat Conversations:** Billed at a rate of `$0.15` per 1M LLM tokens.
* **Workflow Pipelines:** Billed based on nodes traversed.

---

### Billing Details
```json
{
  "monthly_runs_limit": 10000,
  "additional_runs_rate": "$0.002/run",
  "credit_multiplier": 1.0
}
```
