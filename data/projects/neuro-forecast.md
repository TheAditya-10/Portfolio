# NeuroForecast

NeuroForecast provides multivariate demand forecasting with transparent explanations for supply chain teams.

## Dataset
- Multi-year SKU-level sales history.
- External signals: promotions, holidays, and weather.
- Data validation with anomaly flags for outages.

## Architecture
- Temporal Fusion Transformer with feature-store inputs.
- Rolling backtests with a retraining scheduler.
- Explainability using attention and feature contribution summaries.

## Trade-offs
- Larger models improve accuracy but increase retraining cost.
- Tight evaluation windows improved responsiveness but reduced stability.
- Added guardrails for seasonal shifts to avoid overfitting.

## Why these choices
- Stakeholders need explainable forecasts to plan operations.
- Attention-based models handle long-term dependencies.
- Retraining cadence aligns with business review cycles.
