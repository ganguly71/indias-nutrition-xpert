
export type OccupationType = "Heavy" | "Light" | "Mixed";

export type DietPreference = "Veg" | "NonVeg";

export interface UserData {
  id?: string;
  name: string;
  email: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  occupation: OccupationType;
  familyIncome: number;
  familyMembers: number;
  state: string;
  district: string;
  dietPreference: DietPreference;
  profileImage?: string;
  weeklyImages?: string[];
}

export interface DietChartData {
  breakfast: MealPlan[];
  lunch: MealPlan[];
  dinner: MealPlan[];
  totalCost: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealPlan {
  name: string;
  ingredients: string[];
  cost: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface HydrationData {
  dailyTarget: number; // in ml
  currentIntake: number; // in ml
  percentage: number;
  lastUpdated: Date;
}

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  reason: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

export interface CalorieData {
  bmr: number; // Basal Metabolic Rate
  dailyCalorieNeeds: number;
  proteinNeeds: number; // in grams
  carbNeeds: number; // in grams
  fatNeeds: number; // in grams
}
