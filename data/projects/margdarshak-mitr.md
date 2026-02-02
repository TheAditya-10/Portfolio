# MargDarshak-Mitr

MargDarshak-Mitr is a railway travel assistant that supports coach tracking, food discovery, and trip planning.

## Dataset
- Public railway schedules and station metadata.
- Vendor listings and food availability data.
- Geo-coordinates for station tracking.

## Architecture
- Web app with live coach tracking layer.
- Recommendation layer for food options.
- UI flows for trip planning and alerts.

## Trade-offs
- Prioritized user experience over deep personalization.
- Limited real-time APIs required graceful fallbacks.
- Focused on speed to support on-the-go usage.

## Why these choices
- Travelers need quick, reliable insights.
- Coach tracking improves journey comfort.
- Clear UX reduces friction for first-time users.
