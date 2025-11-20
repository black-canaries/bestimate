export interface UserSettings {
  _id: string;
  userId: string;
  defaultICR: number; // Insulin-to-carb ratio
  icrByTimeOfDay?: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  ISF: number; // Insulin sensitivity factor
  targetGlucoseRange: {
    min: number;
    max: number;
  };
  preferredUnits: 'mgdl' | 'mmol';
  updatedAt: number;
}

export interface UpdateSettingsInput {
  defaultICR?: number;
  icrByTimeOfDay?: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  ISF?: number;
  targetGlucoseRange?: {
    min: number;
    max: number;
  };
  preferredUnits?: 'mgdl' | 'mmol';
}
