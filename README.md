# Bestimate - AI-Powered Diabetes Meal Tracker

Bestimate is a React Native app designed to help individuals with Type 1 diabetes better evaluate the carbohydrates and glycemic effects of food and liquid consumption. By leveraging AI to analyze historical data, Bestimate provides intelligent insulin dosing recommendations based on your unique metabolic responses.

## Overview

Living with Type 1 diabetes requires constant vigilance around food intake and insulin dosing. While automated pump therapy has dramatically improved time in range for many diabetics, the challenge of accurately estimating carbohydrates and predicting glycemic responses remains. Bestimate aims to solve this problem by:

- **Learning from your data**: Analyzing your logged meals, blood sugar responses, and insulin intake to understand how specific foods affect YOU
- **Providing intelligent recommendations**: Suggesting optimal pre-meal insulin timing and dosing based on historical patterns
- **Improving accuracy over time**: Continuously refining its understanding of your unique metabolic responses to different foods

## Key Features

### Core Functionality
- 📊 **Meal Logging**: Easy input of food and liquid consumption with carb and glycemic index tracking
- 📈 **Blood Sugar Monitoring**: Integration-ready design for glucose sensor data
- 💉 **Insulin Tracking**: Log insulin doses and timing
- 🤖 **AI-Powered Analysis**: Convex Agents analyze patterns to provide personalized recommendations
- 🎯 **Smart Recommendations**: Pre-meal insulin timing and dosing suggestions based on your historical data
- 📱 **Intuitive Mobile UI**: Built with React Native and NativeWind for a smooth native experience

### AI Capabilities
- Historical pattern recognition for specific foods
- Personalized carb ratio and insulin sensitivity calculations
- Glycemic response predictions based on past meals
- Optimal pre-bolus timing recommendations
- Trend analysis and insights

## Tech Stack

This is a proof-of-concept build using modern, scalable technologies:

- **React Native**: Cross-platform mobile development
- **Expo**: Simplified React Native development and deployment
- **NativeWind**: Tailwind CSS for React Native styling
- **Expo UI**: Pre-built UI components optimized for mobile
- **Convex**: Real-time backend with built-in database and APIs
- **Convex Agents**: AI-powered data analysis and recommendations
- **TypeScript**: Type safety throughout the application

## Project Status

🚧 **Proof of Concept Phase** 🚧

This project is currently in early development. Authentication is disabled for this POC to focus on core functionality. See [PLAN.md](./PLAN.md) for the detailed development roadmap and progress tracking.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (package manager)
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Installation

```bash
# Clone the repository
git clone https://github.com/black-canaries/bestimate.git
cd bestimate

# Install dependencies
pnpm install

# Set up Convex (first time only)
# This will prompt you to login and create/select a Convex project
npx convex dev

# In a separate terminal, start the Expo development server
pnpm start
```

### First Time Setup

1. **Install dependencies**: `pnpm install`
2. **Set up Convex**:
   - Run `npx convex dev` (keep this running in a terminal)
   - Follow the prompts to login and create a Convex project
   - This will generate a `.env.local` file with your Convex URL
3. **Start the app**: In a new terminal, run `pnpm start`
4. **Choose your platform**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

### Development Workflow

1. Make changes to the React Native code
2. Test on iOS/Android simulators or physical devices
3. Convex functions update automatically in dev mode
4. Use Convex dashboard to monitor backend operations

## Project Structure

```
bestimate/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
├── components/            # Reusable React components
│   ├── meal/             # Meal logging components
│   ├── glucose/          # Blood sugar display components
│   ├── insulin/          # Insulin tracking components
│   └── ui/               # Common UI components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── meals.ts          # Meal-related functions
│   ├── glucose.ts        # Glucose data functions
│   ├── insulin.ts        # Insulin tracking functions
│   └── agents/           # AI agents for analysis
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── constants/            # App constants
└── types/                # TypeScript type definitions
```

## Key Concepts

### Carbohydrate Counting
Accurate carb counting is crucial for insulin dosing. Bestimate helps by:
- Learning your typical portion sizes
- Tracking how you estimate vs. actual responses
- Suggesting adjustments based on patterns

### Glycemic Index (GI)
Different foods affect blood sugar at different rates. Bestimate considers:
- GI of individual foods
- Combined meal GI
- Your personal responses to high vs. low GI foods

### Pre-Bolus Timing
Taking insulin before eating can improve post-meal glucose control. Bestimate recommends:
- Optimal timing based on current glucose level
- Food type considerations (high GI vs. low GI)
- Historical success patterns

### Insulin-to-Carb Ratio
This ratio varies by individual and time of day. Bestimate:
- Calculates your ratios based on historical data
- Identifies patterns (e.g., different breakfast vs. dinner ratios)
- Adjusts recommendations accordingly

## Safety Notice

⚠️ **IMPORTANT MEDICAL DISCLAIMER** ⚠️

Bestimate is a proof-of-concept tool and should NOT be used as the sole basis for medical decisions. Always:
- Consult with your healthcare provider before making changes to your insulin regimen
- Use your own judgment and experience when dosing insulin
- Monitor your blood glucose levels regularly
- Be aware that many factors affect blood sugar beyond food intake
- Keep emergency supplies (glucose tabs, glucagon) readily available

This app is designed to provide insights and suggestions, not to replace medical advice or your own diabetes management expertise.

## Contributing

This is currently a personal proof-of-concept project. If you're interested in contributing or have suggestions, please open an issue to discuss.

## Development Plan

See [PLAN.md](./PLAN.md) for the comprehensive development roadmap with phase-by-phase checklists.

## License

TBD

## Acknowledgments

Built with the needs of Type 1 diabetics in mind, inspired by the challenges of daily diabetes management and the potential of AI to improve quality of life.

---

**Note**: This is a proof-of-concept application. Future versions will include proper authentication, data security, and integration with actual CGM devices and insulin pumps.
