# Vision Foundry

Vision Foundry automates visual inspection in manufacturing using active learning and resilient computer vision models.

## Dataset
- Mixed lighting factory-floor images.
- Labeled defects across multiple production lines.
- Active learning loop to prioritize uncertain samples.

## Architecture
- YOLOv8 with custom augmentation pipeline.
- Active learning triage for rapid labeling cycles.
- Edge deployment with model distillation for low-power devices.

## Trade-offs
- Balance between high recall and tolerable false positives.
- Aggressive augmentations improved robustness but required more tuning.
- Edge constraints forced smaller models with smart post-processing.

## Why these choices
- Manufacturing environments are noisy and variable.
- Active learning reduced labeling cost while improving rare defect detection.
- On-device inference kept latency predictable.
