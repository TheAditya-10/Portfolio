# MarDDarshak

MarDDarshak is a road safety intelligence platform that predicts hazardous zones and supports traffic risk planning.

## Dataset
- Historical accident reports with geolocation metadata.
- Road quality indicators and traffic density signals.
- Weather and time-of-day features for risk modeling.

## Architecture
- Gradient-boosted risk prediction model.
- Geospatial clustering for hotspot detection.
- Dashboard layer for patrol and infrastructure planning.

## Trade-offs
- Prioritized recall for high-risk areas over false positives.
- Limited real-time data led to periodic batch updates.
- Geospatial smoothing to reduce noise in rural zones.

## Why these choices
- Safety planning benefits from conservative risk alerts.
- Geospatial clustering supports resource allocation.
- Batch pipelines keep data governance simple.
