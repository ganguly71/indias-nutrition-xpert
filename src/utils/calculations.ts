
import { OccupationType, DietPreference, CalorieData } from "../types";

// BMI Calculation
export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25) return "Normal weight";
  if (bmi >= 25 && bmi < 30) return "Overweight";
  return "Obese";
};

// Calorie Calculation
export const calculateCalorieNeeds = (
  age: number,
  weight: number,
  heightCm: number,
  isMale: boolean,
  occupation: OccupationType
): CalorieData => {
  // Harris-Benedict BMR Formula
  let bmr: number;
  
  if (isMale) {
    bmr = 88.362 + (13.397 * weight) + (4.799 * heightCm) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * heightCm) - (4.330 * age);
  }
  
  // Activity multiplier based on occupation
  const activityMultipliers = {
    Light: 1.375,
    Mixed: 1.55,
    Heavy: 1.725
  };
  
  const dailyCalorieNeeds = bmr * activityMultipliers[occupation];
  
  // Macronutrient breakdown
  const proteinNeeds = (dailyCalorieNeeds * 0.15) / 4; // 15% of calories from protein, 4 calories per gram
  const fatNeeds = (dailyCalorieNeeds * 0.25) / 9; // 25% of calories from fat, 9 calories per gram
  const carbNeeds = (dailyCalorieNeeds * 0.60) / 4; // 60% of calories from carbs, 4 calories per gram
  
  return {
    bmr,
    dailyCalorieNeeds,
    proteinNeeds,
    carbNeeds,
    fatNeeds
  };
};

// Per Member Cost calculation
export const calculatePMC = (familyIncome: number, familyMembers: number): number => {
  // Monthly income per member
  const monthlyPMC = familyIncome / familyMembers;
  
  // Daily food budget per member (assuming 40% of income goes to food)
  return (monthlyPMC * 0.4) / 30;
};

// Water intake calculation
export const calculateWaterNeeds = (
  weight: number,
  occupation: OccupationType,
  averageTemp: number = 30 // Default average temperature for India
): number => {
  // Base water needs: 30ml per kg of body weight
  let waterNeeds = weight * 30;
  
  // Adjust for occupation
  const occupationMultipliers = {
    Light: 1.0,
    Mixed: 1.2,
    Heavy: 1.5
  };
  
  waterNeeds *= occupationMultipliers[occupation];
  
  // Adjust for temperature (increase by 10% for every 5°C above 25°C)
  if (averageTemp > 25) {
    const tempFactor = 1 + (0.1 * Math.floor((averageTemp - 25) / 5));
    waterNeeds *= tempFactor;
  }
  
  return waterNeeds; // Return in ml
};

// Sample data for regions in India (simplified)
export const getRegionalFoodAvailability = (state: string, district: string): string[] => {
  // This is a placeholder function. In a real app, you would have a database of regional foods.
  
  // Some common foods available across India
  const commonFoods = [
    "Rice", "Wheat", "Dal", "Potato", "Onion", "Tomato",
    "Milk", "Curd", "Buttermilk", "Seasonal vegetables"
  ];
  
  // Basic regional categorization
  const regionalFoods: { [key: string]: string[] } = {
    "North": ["Roti", "Paratha", "Paneer", "Rajma", "Chole"],
    "South": ["Dosa", "Idli", "Sambhar", "Coconut", "Tamarind"],
    "East": ["Fish", "Mustard Oil", "Panta Bhat", "Bamboo Shoots"],
    "West": ["Dhokla", "Thepla", "Fafda", "Khandvi"],
    "Central": ["Poha", "Bafla", "Daal Baati", "Gatte"]
  };
  
  // Map states to regions (simplified)
  const stateToRegion: { [key: string]: string } = {
    "Punjab": "North",
    "Haryana": "North",
    "Delhi": "North",
    "Uttar Pradesh": "North",
    "Rajasthan": "North",
    "Tamil Nadu": "South",
    "Kerala": "South",
    "Karnataka": "South",
    "Andhra Pradesh": "South",
    "Telangana": "South",
    "West Bengal": "East",
    "Odisha": "East",
    "Bihar": "East",
    "Assam": "East",
    "Gujarat": "West",
    "Maharashtra": "West",
    "Goa": "West",
    "Madhya Pradesh": "Central",
    "Chhattisgarh": "Central"
  };
  
  const region = stateToRegion[state] || "North"; // Default to North if not found
  
  return [...commonFoods, ...regionalFoods[region]];
};
