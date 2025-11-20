export interface InsulinDose {
  _id: string;
  timestamp: number;
  units: number;
  type: 'bolus' | 'basal' | 'correction';
  associatedMealId?: string;
  notes?: string;
}

export interface CreateInsulinInput {
  timestamp: number;
  units: number;
  type: 'bolus' | 'basal' | 'correction';
  associatedMealId?: string;
  notes?: string;
}
