# Safeguard LLM

Safeguard LLM is a safety layer that filters prompts and audits responses for policy compliance in GenAI systems.

## Dataset
- Curated policy examples from customer support and internal guidelines.
- Synthetic red-team prompts for adversarial testing.
- Labeled safety categories and severity levels.

## Architecture
- Two-stage filter: rule-based checks + transformer classifier.
- Streaming response auditing with policy tags.
- Evaluation harness for regression tests and red-team replay.

## Trade-offs
- Conservative filtering can block benign content.
- Extra latency added by classifier stage (~80ms).
- Complex policy trees require constant maintenance.

## Why these choices
- Combined approach improves precision and recall.
- Streaming audit logs help compliance and incident response.
- Evaluation harness prevents regressions during model updates.
