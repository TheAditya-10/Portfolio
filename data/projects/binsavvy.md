# BinSavvy

BinSavvy is a smart waste management system that uses drones and YOLO-based detection to classify garbage hotspots.

## Dataset
- Aerial images collected from pilot routes.
- Labeled waste categories for detection and routing.
- Augmented for lighting and altitude variance.

## Architecture
- YOLO-based detection model for aerial views.
- Post-processing to map detections to geo-coordinates.
- Operations dashboard for cleanup workflows.

## Trade-offs
- Balanced accuracy with edge-device constraints.
- Drone imagery required aggressive augmentation.
- Conservative thresholds to avoid false cleanup alerts.

## Why these choices
- Drone coverage enables scalable monitoring.
- YOLO provides strong real-time detection.
- Operations teams need actionable, mapped insights.
