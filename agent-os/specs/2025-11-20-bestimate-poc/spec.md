# Bestimate - Technical Specification

## Overview

Bestimate is an AI-powered diabetes meal tracker that helps Type 1 diabetics make better insulin dosing decisions based on historical meal and glucose data. This specification outlines the technical implementation for the proof-of-concept (POC).

## System Architecture

### Frontend Architecture
- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based navigation
- **Styling**: NativeWind for Tailwind-based styling
- **State Management**: Convex reactive queries (minimal local state)
- **Type System**: TypeScript in strict mode

### Backend Architecture
- **Platform**: Convex serverless backend
- **Database**: Convex tables with schema validation
- **Functions**: Convex queries, mutations, and actions
- **AI Processing**: Convex Agents with OpenAI integration

### Project Structure
```
/app                          # Expo Router screens
  /(tabs)                     # Tab navigation screens
    /index.tsx                # Home/Dashboard
    /meals.tsx                # Meals list
    /glucose.tsx              # Glucose tracking
    /insulin.tsx              # Insulin logging
    /insights.tsx             # AI insights
/components                   # React components
  /meal                       # Meal-related components
  /glucose                    # Glucose components
  /insulin                    # Insulin components
  /ui                         # Reusable UI components
  /recommendations            # AI recommendation components
/convex                       # Backend functions
  /agents                     # AI agents
  /lib                        # Utility functions
  schema.ts                   # Database schema
  meals.ts                    # Meal functions
  glucose.ts                  # Glucose functions
  insulin.ts                  # Insulin functions
  settings.ts                 # User settings
/hooks                        # Custom React hooks
/types                        # TypeScript type definitions
/utils                        # Utility functions
/constants                    # App constants
```

## Data Models

### Meals Table
```typescript
{
  id: string
  timestamp: number
  name: string
  description?: string
  totalCarbs: number
  estimatedGI?: number
  foods: Array<{
    foodId: string
    portionGrams: number
    carbs: number
  }>
  preBolusMinutes?: number
  insulinTaken?: number
  tags?: string[]
  notes?: string
}
```

### Foods Table
```typescript
{
  id: string
  name: string
  category: string
  carbsPer100g: number
  proteinPer100g?: number
  fatPer100g?: number
  glycemicIndex?: number
  glycemicLoad?: number
  commonServingSizes?: Array<{
    name: string
    grams: number
  }>
}
```

### Glucose Readings Table
```typescript
{
  id: string
  timestamp: number
  value: number  // mg/dL
  trend?: 'rising' | 'falling' | 'stable'
  source: 'manual' | 'sensor'
}
```

### Insulin Doses Table
```typescript
{
  id: string
  timestamp: number
  units: number
  type: 'bolus' | 'basal' | 'correction'
  associatedMealId?: string
}
```

### Meal Analyses Table
```typescript
{
  id: string
  mealId: string
  timestamp: number
  actualGlucoseResponse: {
    peakGlucose: number
    timeToPeak: number
    returnToBaseline: number
  }
  predictedResponse?: object
  accuracyMetrics?: object
}
```

### User Settings Table
```typescript
{
  id: string
  userId: string  // for future multi-user
  defaultICR: number  // insulin-to-carb ratio
  ISF: number  // insulin sensitivity factor
  targetGlucoseRange: {
    min: number
    max: number
  }
  preferredUnits: 'mg/dL' | 'mmol/L'
}
```

## AI Agent Architecture

### Agent Types

#### 1. Meal Analyzer Agent
**Purpose**: Analyze meal outcomes and glucose responses

**Triggers**: Automatically runs 2-4 hours after a meal

**Inputs**:
- Meal data (foods, carbs, timing)
- Insulin dose taken
- Glucose readings (pre-meal and 4 hours post-meal)

**Outputs**:
- Analysis of carb content accuracy
- Actual vs. expected glucose response
- Comparison to similar historical meals
- Suggestions for future similar meals

#### 2. Pattern Recognition Agent
**Purpose**: Identify trends and patterns in user data

**Triggers**: Batch analysis (daily or weekly)

**Inputs**:
- Historical meals, glucose, and insulin data

**Outputs**:
- Foods that consistently spike glucose
- Time-of-day patterns
- Successful meal/insulin combinations
- Pattern summaries

#### 3. ICR Calculator Agent
**Purpose**: Calculate personalized insulin-to-carb ratios

**Triggers**: Weekly or on-demand

**Inputs**:
- Historical meal carbs vs. insulin doses
- Actual glucose responses
- Time of day data

**Outputs**:
- Recommended ICR by time of day
- Confidence intervals
- Suggested adjustments to user settings

#### 4. Recommendation Engine Agent
**Purpose**: Provide real-time insulin dosing recommendations

**Triggers**: User requests recommendation before meal

**Inputs**:
- Planned meal composition
- Current glucose level
- Time of day
- Historical similar meals
- Learned ICR

**Outputs**:
- Recommended insulin dose
- Recommended pre-bolus timing
- Explanation of reasoning
- Confidence level

## User Interface Specification

### Navigation Structure
- **Tab Navigation** with 5 tabs:
  1. Home (Dashboard)
  2. Meals
  3. Glucose
  4. Insulin
  5. Insights

### Screen Specifications

#### Home/Dashboard Screen
**Components**:
- Current glucose reading (large display with trend)
- Today's summary (meals, carbs, insulin)
- Quick action buttons:
  - Log Meal
  - Log Glucose
  - Log Insulin
- Recent activity feed

#### Meals Screen
**List View**:
- Meal cards showing:
  - Name and time
  - Total carbs
  - Associated insulin
  - Glucose impact indicator
- Date range filter
- Pull-to-refresh

**Detail View**:
- Full meal information
- List of foods with portions
- Nutritional breakdown
- Associated glucose readings chart
- Edit/Delete options
- View analysis (if available)

**Meal Entry Form**:
- Meal name and description
- Food search and selection
- Portion size inputs
- Auto-calculated total carbs
- Pre-bolus timing
- Insulin dose entry
- "Get Recommendation" button
- Notes field

#### Glucose Screen
**Components**:
- Current reading (large display)
- Line chart with:
  - Color-coded ranges (low/normal/high)
  - Meal markers
  - Date range selector
- Statistics panel:
  - Average glucose
  - Time in range percentage
  - Min/Max
  - Standard deviation
- Glucose entry form:
  - Numeric input
  - Unit selector
  - Timestamp
  - Trend indicator

#### Insulin Screen
**Components**:
- List of recent doses
- Daily total insulin
- Bolus vs. basal breakdown
- Dose entry form:
  - Units input
  - Type selector
  - Meal association (optional)
  - Timestamp

#### Insights Screen
**Components**:
- Overall statistics
- Learned patterns display:
  - Personalized ICR by time of day
  - Problematic foods list
  - Best-performing meals
  - Time-of-day patterns
- Pattern visualizations
- Confidence indicators
- "Teaching moments" section

## API Layer (Convex Functions)

### Meal Functions
- `createMeal(data)` - Create new meal
- `getMeals(filters?)` - Get meals with optional filters
- `getMealById(id)` - Get single meal
- `updateMeal(id, data)` - Update meal
- `deleteMeal(id)` - Delete meal
- `searchMealsByFood(query)` - Search meals

### Food Functions
- `getFoods(search?)` - Get/search foods
- `getFoodById(id)` - Get single food
- `createFood(data)` - Create custom food
- `updateFood(id, data)` - Update food
- `getFoodsByCategory(category)` - Get foods by category

### Glucose Functions
- `addGlucoseReading(data)` - Add reading
- `getGlucoseReadings(filters?)` - Get readings
- `getCurrentGlucose()` - Get most recent reading
- `getGlucoseStatistics(dateRange)` - Calculate stats

### Insulin Functions
- `logInsulinDose(data)` - Log dose
- `getInsulinDoses(filters?)` - Get doses
- `getTotalDailyInsulin(date)` - Get daily total
- `getInsulinByMeal(mealId)` - Get doses for meal

### Settings Functions
- `getSettings()` - Get user settings
- `updateSettings(data)` - Update settings

### AI Functions (Actions)
- `analyzeMeal(mealId)` - Trigger meal analysis
- `getRecommendation(mealData, currentGlucose)` - Get insulin recommendation
- `calculateICR()` - Calculate personalized ICR
- `identifyPatterns()` - Run pattern recognition

## Data Seeding

### Food Database
Initial database includes 50+ common foods with accurate nutritional data:
- Fruits and vegetables
- Grains and starches
- Proteins and dairy
- Snacks and desserts
- Each with GI, carbs per 100g, common serving sizes

## Testing Strategy

### Development Testing
- Test Convex functions via dashboard
- Manual testing of UI flows
- Test on both iOS and Android simulators
- Test with various data volumes

### Validation Testing
- Verify AI recommendations with domain knowledge
- Test edge cases (empty data, extreme values)
- Validate glucose calculations
- Test offline behavior

## Performance Considerations

### Optimization Strategies
- Lazy loading for lists
- Pagination for large datasets
- Indexed Convex queries
- Optimistic UI updates
- Minimal re-renders

### Bundle Size
- Tree-shaking unused code
- Optimize images and assets
- Monitor bundle size during development

## Security & Privacy

### Data Protection
- Secure Convex credentials
- Environment variables for API keys
- No sensitive data in git
- Prepared for authentication layer

### Medical Safety
- Clear disclaimers on all recommendation screens
- Safety checks on insulin doses (warn if > 20 units)
- Recommendations always user-overridable
- Explanations for all AI decisions

## Error Handling

### Error Boundaries
- Screen-level error boundaries
- Fallback UI for errors
- Error logging for debugging

### Input Validation
- Validate all form inputs
- Range checks on glucose/insulin values
- Required field validation
- Type checking via TypeScript

### Network Resilience
- Retry logic for failed requests
- Offline support where possible
- Loading states
- User-friendly error messages

## Accessibility

### Requirements
- Accessibility labels on all interactive elements
- Sufficient color contrast
- Support for screen readers
- Keyboard navigation support
- Font scaling support

## Future Extensibility

### Planned Enhancements (Post-POC)
- Multi-user authentication (Convex Auth)
- CGM integration (Dexcom, Libre)
- Insulin pump integration
- Photo-based meal logging
- Exercise tracking
- Social features
- Notifications and reminders

### Architecture Preparation
- User ID field in all tables (ready for multi-user)
- Extensible agent architecture
- Modular component design
- API versioning considerations
