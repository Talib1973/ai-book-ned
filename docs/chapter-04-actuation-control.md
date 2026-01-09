---
title: Chapter 4 - Actuation and Control
sidebar_position: 5
reading_time: 8
description: Movement systems and control algorithms for humanoid robots
tags: [actuation, control, motors, pid, trajectory]
---

# Chapter 4: Actuation and Control

## From Decisions to Motion

Once a robot has **perceived** its environment and **decided** what to do, it must **act**. This chapter explores how robots translate high-level plans into physical motion through actuation and control.

## Actuation Technologies

Actuators convert electrical, hydraulic, or pneumatic energy into mechanical motion.

### Electric Motors

The most common actuators in robotics:

#### Brushed DC Motors

**Advantages:**
- Simple control (voltage → speed)
- Low cost
- Well-understood technology

**Disadvantages:**
- Brushes wear out over time
- Lower efficiency
- Electromagnetic interference

#### Brushless DC (BLDC) Motors

**Advantages:**
- No brushes → longer lifetime
- Higher efficiency (85-90%)
- Better torque-to-weight ratio

**Disadvantages:**
- Requires electronic commutation (ESC)
- More complex control
- Higher cost

**Applications:**
- Drones, robotic arms, mobile robots

#### Servo Motors

Pre-packaged motors with:
- Integrated gearbox
- Position feedback (potentiometer or encoder)
- Control circuitry

**Types:**
- **Analog servos** - PWM control, moderate precision
- **Digital servos** - Higher update rate, better precision
- **Smart servos** - Serial communication (Dynamixel, Herkulex)

**Applications:**
- Robotic arms, humanoid joints

#### Stepper Motors

Move in discrete steps (typically 1.8° or 0.9° per step):

**Advantages:**
- Precise positioning without encoder
- Holding torque when stationary
- Open-loop control possible

**Disadvantages:**
- Can lose steps under high load
- Limited speed
- Vibration and noise

**Applications:**
- 3D printers, CNC machines, simple robots

### Hydraulic Actuators

Use pressurized fluid to generate force:

**Advantages:**
- **Very high power-to-weight ratio**
- Can generate massive forces (tons)
- Self-cooling through fluid circulation

**Disadvantages:**
- Complex system (pump, valves, reservoir)
- Potential leaks
- Expensive
- Noisy

**Applications:**
- Heavy-duty robots (Boston Dynamics Atlas)
- Construction equipment
- Exoskeletons

### Pneumatic Actuators

Use compressed air:

**Advantages:**
- Safe (air leaks are not hazardous)
- Fast response
- Compliant (naturally springy)

**Disadvantages:**
- Lower power than hydraulics
- Requires air compressor
- Difficult to control precisely

**Applications:**
- Soft robotics
- Grippers
- Industrial automation

### Series Elastic Actuators (SEA)

Add a **spring** between motor and output:

```
[Motor] → [Spring] → [Output]
```

**Advantages:**
- **Force control** by measuring spring deflection
- **Shock absorption** protects motor
- **Energy storage** for dynamic motions
- **Safe interaction** with compliant behavior

**Disadvantages:**
- Reduced bandwidth (slower response)
- Added complexity
- Larger size

**Applications:**
- Collaborative robots (cobots)
- Legged robots (ANYmal, Cassie)
- Prosthetics and exoskeletons

## Transmission and Gearing

Actuators rarely drive loads directly; transmissions adapt their output:

### Gear Reduction

Trades **speed for torque**:

- **Gear ratio** N:1 means:
  - Output torque = N × Motor torque
  - Output speed = Motor speed / N

**Types:**
- **Spur gears** - Simple, efficient, noisy
- **Planetary gears** - Compact, high ratio
- **Harmonic drives** - Very high ratio (50:1 to 320:1), low backlash

### Belt and Pulley

Transfer motion over longer distances:

**Advantages:**
- Flexibility in placement
- Shock absorption
- Overload protection (belt slips)

**Disadvantages:**
- Stretching over time
- Lower efficiency than gears

### Cable and Tendon

Mimic biological muscle-tendon systems:

**Advantages:**
- Lightweight
- Remote actuation (motor far from joint)
- Compliant

**Disadvantages:**
- Complex routing
- Friction losses
- Stretch and wear

**Applications:**
- Robotic hands (tendon-driven fingers)
- Humanoid necks

## Control Theory Fundamentals

Control systems ensure actuators produce desired motions.

### Open-Loop vs. Closed-Loop

**Open-Loop Control:**
```
Input → Controller → Actuator → Output
```
- No feedback
- Cheap and simple
- Susceptible to disturbances

**Closed-Loop (Feedback) Control:**
```
Input → [+/-] → Controller → Actuator → Output
           ↑                              |
           └──── Sensor ←─────────────────┘
```
- Measures actual output
- Corrects errors
- Robust to disturbances

### PID Control

The most common controller in robotics:

**Proportional (P):**
```
u = Kp × e
```
- Control proportional to current error
- Fast response
- Steady-state error

**Integral (I):**
```
u = Ki × ∫e dt
```
- Eliminates steady-state error
- Can cause overshoot
- Sensitive to noise

**Derivative (D):**
```
u = Kd × (de/dt)
```
- Damps oscillations
- Predicts future error
- Amplifies noise

**Combined PID:**
```
u = Kp×e + Ki×∫e dt + Kd×(de/dt)
```

**Tuning Methods:**
- **Ziegler-Nichols** - Heuristic tuning rules
- **Manual tuning** - Iterative adjustment
- **Auto-tuning** - Automated parameter search

### Advanced Control Methods

#### Feedforward Control

Use model of system to precompute control:

```
Desired trajectory → [Inverse Dynamics] → Feedforward torque
```

**Advantages:**
- Fast response
- No lag from feedback

**Challenges:**
- Requires accurate model
- Cannot compensate for disturbances (combine with feedback)

#### Computed Torque Control

For robot manipulators:

```
τ = M(q)q̈d + C(q,q̇)q̇ + G(q) + Kp(qd - q) + Kd(q̇d - q̇)
       └─── Feedforward ───┘   └─── Feedback ───┘
```

Where:
- `M(q)` = Inertia matrix
- `C(q,q̇)` = Coriolis/centrifugal terms
- `G(q)` = Gravity terms
- `Kp, Kd` = PID gains

**Effect:** Makes nonlinear robot behave like linear system

#### Model Predictive Control (MPC)

Optimization-based control:

1. Predict future states over horizon
2. Optimize control to minimize cost
3. Apply first control action
4. Repeat at next time step

**Advantages:**
- Handles constraints (joint limits, collision)
- Optimal control
- Can incorporate future predictions

**Challenges:**
- Computationally expensive
- Requires accurate model

**Applications:**
- Autonomous vehicles
- Legged robot locomotion
- Robotic manipulation

#### Impedance and Admittance Control

Control interaction forces, not just position:

**Impedance Control:**
- Set desired mass-spring-damper behavior
- Robot "feels" like a spring to external forces

**Admittance Control:**
- Measure force, adjust position
- Compliant behavior

**Applications:**
- Physical human-robot interaction
- Assembly tasks
- Polishing and grinding

## Motion Planning and Trajectory Generation

Before control, robots must plan how to move.

### Trajectory Generation

Convert high-level goals into smooth, executable trajectories:

**Polynomial Trajectories:**
- 3rd-order (cubic): Position and velocity constraints
- 5th-order (quintic): Add acceleration constraints

**Splines:**
- Smooth curves through waypoints
- B-splines, Bézier curves

**Minimum Jerk:**
- Minimize jerk (derivative of acceleration)
- Smooth, human-like motion

**Trapezoidal Velocity Profile:**
- Constant acceleration → constant velocity → constant deceleration
- Simple and efficient

### Path Planning

Find collision-free paths in the environment:

**Sampling-Based Methods:**
- **RRT (Rapidly-exploring Random Tree)** - Fast, probabilistically complete
- **PRM (Probabilistic Roadmap)** - Pre-compute connectivity graph
- **RRT*** - Asymptotically optimal version

**Optimization-Based Methods:**
- **CHOMP** - Covariant Hamiltonian Optimization
- **TrajOpt** - Sequential convex optimization

**Learning-Based Methods:**
- Neural networks trained to predict paths
- Faster than optimization at runtime

## Whole-Body Control

Humanoid robots require coordinating all joints simultaneously:

### Task-Space Control

Control end-effector (hand/foot) directly:

**Jacobian-based:**
```
q̇ = J⁻¹(q) × ẋdesired
```

Where:
- `q̇` = Joint velocities
- `J` = Jacobian matrix
- `ẋdesired` = Desired end-effector velocity

**Challenges:**
- Redundancy (more DOF than task dimensions)
- Singularities (Jacobian not invertible)

**Solution:** Pseudoinverse, damped least squares

### Prioritized Control

Handle multiple objectives with priorities:

**Example:**
1. **Priority 1:** Maintain balance (foot placement)
2. **Priority 2:** Reach target (hand position)
3. **Priority 3:** Avoid joint limits

**Null-Space Projection:**
- Higher priority tasks executed first
- Lower priorities use remaining DOF without interfering

### Quadratic Programming (QP)

Formulate control as optimization:

```
minimize: ||q̈ - q̈desired||²
subject to: Contact constraints
            Joint limits
            Torque limits
```

**Software:**
- OSQP, Gurobi, CVXPY

## Locomotion Control

Walking is one of the hardest control problems:

### Gait Generation

Common gaits for bipedal robots:

**Static Walking:**
- Always at least one foot on ground
- CoM stays within support polygon
- Slow but stable

**Dynamic Walking:**
- Periods of no ground contact (flight phase)
- Uses momentum
- Faster, more efficient

### Zero Moment Point (ZMP) Control

Classic approach for humanoid walking:

1. Plan footstep locations
2. Generate CoM trajectory such that ZMP stays within support polygon
3. Compute joint angles via IK
4. Execute with low-level control

**Limitations:**
- Conservative (only static stability)
- Cannot perform dynamic motions

### Capture Point / DCM

**Divergent Component of Motion (DCM):**
- Point where robot must step to maintain balance
- Enables dynamic walking

### Learning-Based Locomotion

Train policies using reinforcement learning:

**Advantages:**
- Discover novel gaits
- Adapt to terrain
- Robust to disturbances

**Examples:**
- ANYmal (quadruped) - RL-based locomotion
- Cassie (biped) - Learned walking and jumping

## Summary

Actuation and control bridge the gap between planning and physical execution. Electric motors (especially BLDC and servos) dominate modern robotics, while hydraulics remain important for high-power applications. Control ranges from simple PID to advanced methods like MPC and whole-body optimization. Recent learning-based approaches are enabling more robust and adaptive control, particularly for complex tasks like locomotion.

---

<div class="callout callout--tip">
<strong>🔑 Key Takeaways</strong>

- Actuators convert energy into motion; common types include electric motors, hydraulics, and pneumatics
- Transmissions (gears, belts, tendons) adapt actuator output to task requirements
- PID control is the workhorse; advanced methods include feedforward, MPC, and impedance control
- Trajectory generation creates smooth, executable motion plans
- Whole-body control coordinates many joints to achieve complex tasks like walking
</div>

---

**Previous:** [← Chapter 3: Sensors and Perception](./chapter-03-sensors-perception) | **Next:** [Chapter 5: AI Integration →](./chapter-05-ai-integration)
