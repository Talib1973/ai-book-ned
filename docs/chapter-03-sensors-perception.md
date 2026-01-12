---
title: Chapter 3 - Sensors and Perception
sidebar_position: 4
reading_time: 8
description: How robots sense and understand their environment
tags: [sensors, perception, computer-vision, lidar]
---

# Chapter 3: Sensors and Perception

## The Importance of Perception

For robots to interact intelligently with the world, they must first **perceive** it. Perception transforms raw sensor data into meaningful representations that enable:

- **Localization** - "Where am I?"
- **Mapping** - "What does the environment look like?"
- **Object recognition** - "What am I looking at?"
- **State estimation** - "What's happening around me?"

## Sensor Categories

Robot sensors fall into two main categories:

### Proprioceptive Sensors

Sensors that measure the robot's **internal state**:

- Joint encoders (position/velocity)
- Inertial Measurement Units (orientation/acceleration)
- Force/torque sensors (interaction forces)
- Motor current sensors (torque estimation)

### Exteroceptive Sensors

Sensors that measure the **external environment**:

- Cameras (visual information)
- LiDAR (3D geometry)
- Ultrasonic sensors (proximity)
- Tactile sensors (touch/contact)
- Microphones (audio)

## Vision Sensors

Visual perception is critical for understanding the world.

### RGB Cameras

**Standard cameras** capture color images:

**Advantages:**
- Rich semantic information
- Low cost
- Familiar to humans

**Challenges:**
- Sensitive to lighting conditions
- Require calibration for metric measurements
- 2D projection loses depth information

**Applications:**
- Object recognition
- Scene understanding
- Visual servoing (using vision for control)

### Depth Cameras

Depth cameras provide **3D geometry**:

**Stereo Cameras**
- Two cameras mimic human binocular vision
- Compute depth from disparity between images
- Examples: ZED, OAK-D

**Time-of-Flight (ToF) Cameras**
- Measure time for light to bounce back
- Direct depth measurement
- Examples: Azure Kinect, RealSense

**Structured Light**
- Project known pattern and observe distortion
- Indoor use (IR pattern)
- Examples: Intel RealSense D400 series

**Advantages:**
- Direct 3D measurements
- Enable metric reasoning

**Challenges:**
- Limited outdoor performance (for IR-based)
- Lower resolution than RGB
- Sensitive to reflective/transparent surfaces

### Event Cameras

**Neuromorphic cameras** that only capture pixel changes:

**Advantages:**
- High temporal resolution (microseconds)
- Low latency
- Excellent for fast motion

**Challenges:**
- Different data format (events vs. frames)
- Limited software ecosystem
- Requires specialized algorithms

## 3D Ranging Sensors

### LiDAR (Light Detection and Ranging)

LiDAR uses laser pulses to measure distances:

**Mechanical LiDAR**
- Rotating laser scanner
- 360° coverage
- High accuracy (cm-level)
- Examples: Velodyne, Ouster

**Solid-State LiDAR**
- No moving parts
- More reliable but limited field of view
- Examples: Livox, Innoviz

**Flash LiDAR**
- Entire scene captured at once
- Short range but fast

**Advantages:**
- Accurate 3D geometry
- Long range (up to 100+ meters)
- Works in various lighting

**Challenges:**
- Expensive
- Heavy data processing
- Struggles with reflective/transparent surfaces

**Applications:**
- Autonomous vehicles
- Outdoor navigation
- 3D mapping (SLAM)

### Ultrasonic Sensors

Use **sound waves** for proximity detection:

**Advantages:**
- Very low cost
- Simple to use
- Works in darkness

**Challenges:**
- Short range (few meters)
- Low resolution
- Sensitive to surface properties

**Applications:**
- Collision avoidance
- Parking assistance
- Close-range navigation

## Tactile Sensing

Touch provides crucial information for manipulation.

### Force/Torque Sensors

Measure forces and moments:

**6-Axis F/T Sensors**
- 3 forces (Fx, Fy, Fz)
- 3 torques (Tx, Ty, Tz)
- Mounted at wrist or ankles

**Applications:**
- Compliant manipulation
- Contact detection
- Force control

### Tactile Arrays

Dense arrays of pressure sensors:

**Examples:**
- ReSkin (Meta) - magnetic-based tactile skin
- GelSight - camera-based tactile sensor
- BioTac - fluid-based tactile sensor

**Applications:**
- Grasp stability
- Object recognition through touch
- Slip detection

## Inertial Measurement Units (IMUs)

IMUs measure motion and orientation:

### Components

**Accelerometer**
- Measures linear acceleration
- 3-axis (x, y, z)

**Gyroscope**
- Measures angular velocity
- 3-axis rotation rates

**Magnetometer** (optional)
- Measures magnetic field
- Acts as compass

### Sensor Fusion

Combining accelerometer and gyroscope data:

**Complementary Filter**
- Simple fusion approach
- Combines high-frequency gyro with low-frequency accelerometer

**Kalman Filter**
- Optimal state estimation
- Accounts for sensor noise

**Applications:**
- Balance control
- Orientation estimation
- Fall detection

## Perception Algorithms

Raw sensor data requires processing to extract meaning.

## Computer Vision

### Object Detection

Identify and localize objects in images:

**Classical Methods:**
- Histogram of Oriented Gradients (HOG)
- Scale-Invariant Feature Transform (SIFT)

**Deep Learning Methods:**
- YOLO (You Only Look Once) - Real-time detection
- Faster R-CNN - High accuracy
- EfficientDet - Balanced speed/accuracy

**Output:** Bounding boxes + class labels

### Semantic Segmentation

Classify every pixel in an image:

**Methods:**
- FCN (Fully Convolutional Networks)
- U-Net (for biomedical imaging)
- DeepLab - State-of-the-art segmentation

**Output:** Pixel-wise labels (e.g., road, building, person)

### Instance Segmentation

Distinguish individual objects of the same class:

**Methods:**
- Mask R-CNN
- YOLACT (real-time)

**Output:** Per-object masks

### Pose Estimation

Estimate 6D pose (position + orientation) of objects:

**Applications:**
- Robotic grasping
- Bin picking
- Assembly tasks

**Methods:**
- PnP (Perspective-n-Point) algorithms
- Deep learning (PoseCNN, DenseFusion)

## 3D Perception

### Point Cloud Processing

LiDAR and depth cameras produce **point clouds** (sets of 3D points):

**Tasks:**
- **Filtering** - Remove noise and outliers
- **Segmentation** - Group points into objects
- **Registration** - Align multiple point clouds

**Algorithms:**
- RANSAC (plane/shape fitting)
- ICP (Iterative Closest Point) for alignment
- PointNet/PointNet++ (deep learning on point clouds)

### Simultaneous Localization and Mapping (SLAM)

Build a map while localizing within it:

**Visual SLAM**
- Uses camera images
- Examples: ORB-SLAM, VINS-Mono

**LiDAR SLAM**
- Uses 3D point clouds
- Examples: LOAM, LIO-SAM

**Output:**
- Robot trajectory (pose over time)
- Environment map (2D occupancy grid or 3D point cloud)

## Multimodal Fusion

Combining multiple sensor types improves robustness:

### Vision + LiDAR

- **LiDAR** provides accurate geometry
- **Camera** provides semantic information
- **Fusion** enables semantic 3D understanding

### Vision + IMU

- **Camera** provides visual features
- **IMU** provides motion estimates
- **Fusion** enables visual-inertial odometry (VIO)

### Example: Autonomous Driving

Modern self-driving cars fuse:
- **Cameras** - Lane detection, traffic signs, pedestrians
- **LiDAR** - 3D obstacle detection, localization
- **Radar** - Velocity measurement, all-weather detection
- **GPS/IMU** - Coarse localization

## Foundation Models for Perception

Recent AI advances enable unprecedented perceptual capabilities:

### Vision-Language Models (VLMs)

Models like GPT-4V, Gemini Vision can:
- **Describe scenes** in natural language
- **Answer questions** about images
- **Guide actions** based on visual understanding

**Example:**
```
User: "Pick up the blue mug"
VLM: Identifies blue mug in image
Robot: Grasps mug based on VLM guidance
```

### Open-Vocabulary Detection

Detect objects not seen during training:

**Traditional:** Only detects pre-trained classes (e.g., 80 COCO classes)
**Open-Vocabulary:** Can detect any object described in text

**Models:**
- OWL-ViT (Google)
- GLIP (Microsoft)
- Grounding DINO

### 3D Scene Understanding

Models that understand 3D geometry and semantics:

- **NeRF** (Neural Radiance Fields) - 3D scene reconstruction
- **3D Gaussian Splatting** - Real-time 3D rendering
- **ConceptFusion** - Open-vocabulary 3D scene understanding

## Challenges in Robot Perception

### 1. Lighting Variation

- Cameras sensitive to illumination changes
- Shadows and reflections complicate vision
- Solutions: Multi-modal fusion, robust features

### 2. Occlusions

- Objects partially hidden from view
- Incomplete information for recognition
- Solutions: Multi-view fusion, prediction models

### 3. Real-Time Constraints

- Perception must run fast enough for control (often >10 Hz)
- Deep learning models can be computationally expensive
- Solutions: Model compression, edge accelerators (GPUs, TPUs)

### 4. Domain Shift

- Models trained on datasets may fail in new environments
- Sim-to-real gap for synthetic data
- Solutions: Domain adaptation, fine-tuning, robust representations

## Summary

Perception is the foundation of robot intelligence. By combining diverse sensors (cameras, LiDAR, IMUs, tactile) with advanced algorithms (deep learning, SLAM, fusion), robots can build rich representations of their environment. Recent foundation models are enabling open-vocabulary understanding and generalizable perception, bringing us closer to truly intelligent physical agents.

---

<div class="callout callout--tip">
<strong>🔑 Key Takeaways</strong>

- Proprioceptive sensors measure internal state; exteroceptive sensors measure the environment
- Vision (RGB, depth), LiDAR, IMU, and tactile sensors provide complementary information
- Perception algorithms extract semantic meaning from raw sensor data
- Multimodal sensor fusion improves robustness and capability
- Foundation models enable open-vocabulary and generalizable perception
</div>

---

**Previous:** [← Chapter 2: Humanoid Robot Fundamentals](./chapter-02-humanoid-fundamentals) | **Next:** [Chapter 4: Actuation and Control →](./chapter-04-actuation-control)
