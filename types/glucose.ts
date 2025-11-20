export interface GlucoseReading {
  _id: string;
  timestamp: number;
  value: number; // mg/dL
  trend?: 'rising' | 'falling' | 'stable';
  source: 'manual' | 'sensor';
  notes?: string;
}

export interface CreateGlucoseInput {
  timestamp: number;
  value: number;
  trend?: 'rising' | 'falling' | 'stable';
  source: 'manual' | 'sensor';
  notes?: string;
}

export interface GlucoseStatistics {
  average: number;
  min: number;
  max: number;
  timeInRange: {
    low: number; // percentage
    normal: number; // percentage
    high: number; // percentage
  };
  standardDeviation: number;
  estimatedA1c: number;
}

export const GLUCOSE_RANGES = {
  LOW: { min: 0, max: 70 },
  NORMAL: { min: 70, max: 180 },
  HIGH: { min: 180, max: 400 },
} as const;
