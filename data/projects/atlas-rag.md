# Atlas RAG

Atlas RAG is a private knowledge copilot built for enterprise teams that require strict data isolation and trustworthy citations.

## Dataset
- Internal knowledge bases (policy docs, playbooks, incident reports).
- Cleaned and chunked into policy-aware segments with semantic tags.

## Architecture
- Hybrid retrieval: BM25 + dense embeddings.
- Reranking using a lightweight cross-encoder.
- Guardrails for policy compliance and data leakage prevention.

## Trade-offs
- Latency vs. accuracy: reranking adds ~150ms but improves groundedness.
- Strict citation enforcement sometimes reduces answer breadth.
- Heavy preprocessing to ensure sensitive fields are masked.

## Why these choices
- Enterprise users value correctness over verbosity.
- Hybrid retrieval improves recall on sparse, domain-specific queries.
- Guardrails are required for compliance reviews.
