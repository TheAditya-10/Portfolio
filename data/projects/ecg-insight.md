# Deep ECG Signal Analysis

Deep ECG Signal Analysis is a transformer-based pipeline for arrhythmia classification and anomaly detection.

## Dataset
- MIT-BIH Arrhythmia and PTB diagnostic datasets.
- Signal preprocessing with filtering and segmentation.
- Multi-label annotations for rhythm classes.

## Architecture
- Dual-model pipeline: transformer classifier + anomaly detection head.
- Temporal attention to capture long-range dependencies.
- Optimized inference for near real-time deployment.

## Trade-offs
- Chose transformer models for performance with higher compute cost.
- Balanced sensitivity and specificity for clinical utility.
- Prioritized explainability with attention-based insights.

## Why these choices
- ECG signals require context across long temporal windows.
- Clinician trust improves with transparent model reasoning.
- Deployment constraints demand fast inference.
