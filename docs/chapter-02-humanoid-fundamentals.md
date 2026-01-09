---
title: Chapter 2 - Humanoid Robot Fundamentals
sidebar_position: 3
reading_time: 8
description: Core concepts and architectures of humanoid robotics
tags: [humanoid, robotics, kinematics, dynamics]
---

# Chapter 2: Humanoid Robot Fundamentals

## Why Humanoid Form?

Humanoid robots are designed to mimic human form and movement. This design choice offers several advantages:

### Environmental Compatibility

Our world is designed for humans:
- **Stairs and doorways** sized for human proportions
- **Tools and interfaces** designed for human hands
- **Furniture and spaces** optimized for human use

A humanoid form can navigate and use these existing infrastructures without modification.

### Natural Interaction

Human-like appearance facilitates:
- **Intuitive communication** through gestures and expressions
- **Social acceptance** in human environments
- **Predictable behavior** based on human movement patterns

### Versatility

The human form evolved for general-purpose manipulation:
- **Bipedal locomotion** frees hands for manipulation
- **Dexterous hands** enable fine motor skills
- **Upright posture** provides good sensor placement

## Anatomy of a Humanoid Robot

A typical humanoid robot consists of several subsystems:

### 1. Skeletal Structure

The mechanical skeleton provides:
- **Rigid links** forming the body segments
- **Joints** connecting links and enabling motion
- **Load-bearing capability** to support the robot's weight

Common materials include:
- **Aluminum alloys** (lightweight but strong)
- **Carbon fiber** (high strength-to-weight ratio)
- **Titanium** (for high-stress components)

### 2. Actuation System

Motors and actuators provide movement:

**Electric Motors**
- **Brushless DC motors** - Efficient and precise
- **Servo motors** - Position control with feedback
- **Stepper motors** - Precise positioning without encoders

**Hydraulic Actuators**
- High force output
- Used in large humanoids (e.g., Boston Dynamics Atlas)
- Require hydraulic pumps and fluid systems

**Series Elastic Actuators (SEAs)**
- Spring element between motor and output
- Enable force control and shock absorption
- Common in collaborative robots

### 3. Sensor Suite

Sensors provide awareness of the robot and environment:

**Internal Sensors (Proprioception)**
- **Encoders** - Joint position and velocity
- **Inertial Measurement Units (IMUs)** - Orientation and acceleration
- **Force/torque sensors** - Interaction forces
- **Motor current sensors** - Torque estimation

**External Sensors (Exteroception)**
- **Cameras** - RGB and depth perception
- **LiDAR** - 3D environment mapping
- **Tactile sensors** - Contact detection
- **Microphones** - Audio input

### 4. Computing Platform

Onboard computers handle:
- **Real-time control loops** (1-10 kHz)
- **Perception processing** (cameras, LiDAR)
- **Planning and decision-making**
- **Communication** with external systems

Modern humanoids use:
- **Embedded computers** (NVIDIA Jetson, Intel NUC)
- **FPGAs** for real-time control
- **Cloud connectivity** for heavy computation

### 5. Power System

Batteries provide onboard power:
- **Lithium-ion** or **Lithium-polymer** batteries
- Typical runtime: 30 minutes to 2 hours
- Power distribution and management circuitry

## Degrees of Freedom (DOF)

The **degrees of freedom** define a robot's movement capability:

### Human DOF Baseline

The human body has approximately:
- **7 DOF per arm** (shoulder: 3, elbow: 1, wrist: 3)
- **6-7 DOF per leg** (hip: 3, knee: 1, ankle: 2-3)
- **3 DOF torso** (pitch, roll, yaw)
- **20+ DOF per hand** (finger joints)

**Total:** 50+ DOF for full human-like mobility

### Typical Humanoid DOF

Most humanoid robots have:
- **Simplified hands** (1-5 DOF vs. 20+ human DOF)
- **6 DOF legs** for locomotion
- **7 DOF arms** for manipulation
- **2-3 DOF head** for sensor orientation

**Total:** 25-35 DOF for most research humanoids

### Examples

| **Robot** | **Total DOF** | **Notable Features** |
|-----------|---------------|----------------------|
| **Atlas (Boston Dynamics)** | 28 | Hydraulic actuation, dynamic mobility |
| **Optimus (Tesla)** | 28 | Electric actuation, designed for manufacturing |
| **Figure 01** | 27 | General-purpose humanoid |
| **ASIMO (Honda)** | 57 | Advanced dexterity, discontinued |
| **Digit (Agility Robotics)** | 20 | Simplified for logistics |

## Kinematics: The Geometry of Motion

Kinematics studies robot motion without considering forces.

### Forward Kinematics

**Problem:** Given joint angles, where is the end-effector (hand/foot)?

**Example:**
```
Joint angles: θ₁, θ₂, ..., θₙ
↓ Forward Kinematics
End-effector position: (x, y, z)
```

**Solution:** Use transformation matrices (Denavit-Hartenberg parameters)

### Inverse Kinematics (IK)

**Problem:** Given desired end-effector position, what joint angles are needed?

**Example:**
```
Desired hand position: (x, y, z)
↓ Inverse Kinematics
Joint angles: θ₁, θ₂, ..., θₙ
```

**Challenges:**
- **Multiple solutions** - Same position can be reached multiple ways
- **No solution** - Position may be out of reach
- **Singularities** - Configurations where IK fails

**Solution Methods:**
- **Analytical** - Closed-form equations (fast, limited cases)
- **Numerical** - Iterative optimization (general, slower)
- **Learning-based** - Neural networks trained on data

## Dynamics: Forces and Motion

Dynamics considers forces and torques causing motion.

### Forward Dynamics

**Problem:** Given joint torques, what motion results?

**Equation of Motion:**
```
τ = M(θ)θ̈ + C(θ,θ̇)θ̇ + G(θ)
```

Where:
- `τ` = Applied torques
- `M(θ)` = Mass matrix
- `C(θ,θ̇)` = Coriolis and centrifugal terms
- `G(θ)` = Gravity terms

### Inverse Dynamics

**Problem:** Given desired motion, what torques are needed?

Used for:
- **Feed-forward control** - Compensate for known dynamics
- **Gravity compensation** - Support robot's weight
- **Trajectory tracking** - Follow planned motions

## Balance and Stability

Maintaining balance is critical for bipedal robots.

### Center of Mass (CoM)

The **center of mass** is the average position of all mass in the robot.

For stability:
- CoM projection must be within **support polygon** (area enclosed by feet)

### Zero Moment Point (ZMP)

The **ZMP** is the point where net ground reaction moment is zero.

**ZMP Criterion:**
- If ZMP is inside support polygon → **Stable**
- If ZMP is on boundary → **Marginally stable**
- If ZMP is outside → **Falling**

### Balancing Strategies

**Ankle Strategy**
- Small corrections using ankle torques
- Effective for small disturbances

**Hip Strategy**
- Large corrections using hip movement
- For larger disturbances

**Stepping Strategy**
- Take a step to expand support polygon
- For large disturbances or recovery

## Control Architectures

Humanoid robots use hierarchical control:

### High-Level Planning

- Task planning (what to do)
- Motion planning (how to move)
- Typically runs at 1-10 Hz

### Mid-Level Control

- Trajectory generation
- Whole-body coordination
- Typically runs at 100-1000 Hz

### Low-Level Control

- Joint position/velocity/torque control
- PID or more advanced controllers
- Typically runs at 1-10 kHz

## Challenges in Humanoid Robotics

### 1. Complexity

- 25+ DOF require sophisticated control
- Coupling between joints complicates planning
- Real-time computation for dynamics

### 2. Energy Efficiency

- Bipedal locomotion is energetically expensive
- Battery life limits operational time
- Efficient gaits and actuators needed

### 3. Robustness

- Must handle uneven terrain
- Recover from pushes and disturbances
- Operate reliably for extended periods

### 4. Dexterity

- Human-level manipulation is extremely challenging
- Fine motor control requires precise sensing and actuation
- Grasping diverse objects robustly

## State of the Art (2024-2025)

Recent humanoid robots demonstrate impressive capabilities:

### Boston Dynamics Atlas

- **Hydraulic actuation** for high power
- **Parkour and backflips** demonstrating dynamic control
- **Tool use** with integrated perception

### Tesla Optimus (Gen 2)

- **All-electric design** for manufacturing
- **Tactile sensing** in hands
- **$20-30K target price** for mass production

### Figure 01

- **General-purpose design**
- **OpenAI VLM integration** for language-guided tasks
- **Commercial deployment** in warehouses

### Sanctuary AI Phoenix

- **Teleoperation** and **autonomous modes**
- **Human-like hands** with 20 DOF
- **Retail and logistics** applications

## Summary

Humanoid robots combine mechanical design, actuation, sensing, and control to create machines capable of human-like movement and interaction. While significant challenges remain in dexterity, energy efficiency, and robustness, rapid progress in hardware and AI is bringing general-purpose humanoid robots closer to reality.

---

<div class="callout callout--tip">
<strong>🔑 Key Takeaways</strong>

- Humanoid form enables interaction with human-designed environments
- Key subsystems: skeleton, actuators, sensors, computing, power
- Degrees of freedom (DOF) determine movement capability
- Kinematics (geometry) and dynamics (forces) govern motion
- Balance and stability are critical for bipedal robots
</div>

---

**Previous:** [← Chapter 1: Introduction to Physical AI](./chapter-01-intro-physical-ai) | **Next:** [Chapter 3: Sensors and Perception →](./chapter-03-sensors-perception)
