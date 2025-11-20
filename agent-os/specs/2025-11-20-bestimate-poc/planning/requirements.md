# Bestimate - Requirements Document

## Project Overview

**Goal**: Build a proof-of-concept React Native app that uses AI to help Type 1 diabetics make better insulin dosing decisions based on historical meal and glucose data.

**Target Users**: Type 1 diabetics who want to improve their insulin dosing accuracy

## Core Requirements

### Functional Requirements

#### 1. Data Entry & Management
- Users must be able to log meals with detailed food information
- Users must be able to log glucose readings
- Users must be able to log insulin doses
- All data must persist reliably in the backend
- Users must be able to view, edit, and delete their logged data

#### 2. AI-Powered Recommendations
- System must analyze historical meal and glucose data
- System must provide insulin dosing recommendations based on patterns
- System must explain the reasoning behind recommendations
- System must show confidence levels for recommendations
- System must learn and improve from more data

#### 3. Pattern Recognition & Insights
- System must identify foods that consistently spike glucose
- System must detect time-of-day patterns
- System must calculate personalized insulin-to-carb ratios (ICR)
- System must show meaningful insights to users

#### 4. Data Visualization
- System must display glucose trends over time
- System must show meal impacts on glucose levels
- System must visualize patterns and statistics
- Charts must be clear and easy to understand

### Non-Functional Requirements

#### Performance
- App must respond quickly and smoothly
- Charts must render without noticeable lag
- Data must sync reliably with backend

#### Usability
- UI must be intuitive and easy to navigate
- Forms must be simple and quick to complete
- Navigation must be clear and logical
- App must work offline where possible

#### Cross-Platform
- Must work on both iOS and Android
- Must provide consistent experience across platforms

#### Safety & Accuracy
- Recommendations are suggestions only, not medical directives
- Clear disclaimers must be present
- Safety checks for unreasonable insulin doses
- Medical accuracy must not be compromised

## Technical Requirements

### Technology Stack
- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: Expo Router
- **Backend**: Convex (serverless backend with real-time data)
- **AI**: Convex Agents with OpenAI integration
- **Package Manager**: pnpm
- **Language**: TypeScript (strict mode)

### Architecture Requirements
- Clean separation of components, screens, and backend logic
- Type-safe data models throughout
- Reactive data updates via Convex queries
- Modular agent-based AI architecture

## User Flows

### Meal Logging Flow
1. User taps "Log Meal"
2. User searches and selects foods from database
3. User enters portion sizes
4. System calculates total carbs and estimated GI
5. User can optionally request AI recommendation for insulin dose
6. User reviews and confirms meal entry
7. User logs associated insulin dose

### Glucose Tracking Flow
1. User enters current glucose reading
2. System records reading with timestamp
3. System updates dashboard and charts
4. System triggers post-meal analysis if applicable

### Recommendation Request Flow
1. User is about to eat a meal
2. User requests recommendation
3. System analyzes current glucose and meal composition
4. System searches for similar historical meals
5. System provides insulin dose recommendation with explanation
6. User can accept, modify, or ignore recommendation

## Success Criteria

### POC Success Criteria
1. **Data Entry Works**: Users can easily log meals, glucose, and insulin
2. **Data Persists**: All data reliably stored and retrieved
3. **AI Recommendations Function**: App provides recommendations based on historical data
4. **Recommendations Improve**: Accuracy increases with more data
5. **Insights Are Valuable**: Insights screen shows meaningful patterns
6. **UX Is Intuitive**: Users can navigate without instruction
7. **Performance Is Acceptable**: Quick and smooth responses
8. **Cross-Platform**: Works well on iOS and Android

## Out of Scope (for POC)

The following features are planned for future releases but NOT included in the POC:
- Multi-user authentication
- CGM (Continuous Glucose Monitor) integration
- Insulin pump integration
- Photo-based meal logging
- Social features
- Notifications and reminders
- Exercise tracking
- Stress/illness adjustments

## Constraints & Limitations

### Medical Safety
- This is a POC/decision support tool, not a medical device
- All recommendations must be clearly labeled as suggestions
- User retains final control over all insulin dosing decisions
- Clear disclaimers must be present throughout the app

### Data Privacy
- Sensitive health data must be protected
- Even for POC, security best practices must be followed
- Convex credentials must never be shared or committed

### Development Timeline
- Estimated 24-34 days of focused development
- Prioritize core functionality over polish in early phases
- Iterate based on testing and feedback
