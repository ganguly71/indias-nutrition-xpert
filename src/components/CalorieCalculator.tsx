
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { calculateCalorieNeeds } from '@/utils/calculations';
import { OccupationType, DietPreference, CalorieData } from '@/types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip
} from 'recharts';

interface CalorieCalculatorProps {
  initialAge?: number;
  initialWeight?: number;
  initialHeight?: number;
  initialGender?: "male" | "female";
  initialOccupation?: OccupationType;
  initialDietPreference?: DietPreference;
}

const CalorieCalculator = ({
  initialAge = 30,
  initialWeight = 70,
  initialHeight = 170,
  initialGender = "male",
  initialOccupation = "Light",
  initialDietPreference = "Veg"
}: CalorieCalculatorProps) => {
  const [age, setAge] = useState<number>(initialAge);
  const [weight, setWeight] = useState<number>(initialWeight);
  const [height, setHeight] = useState<number>(initialHeight);
  const [gender, setGender] = useState<"male" | "female">(initialGender);
  const [occupation, setOccupation] = useState<OccupationType>(initialOccupation);
  const [dietPreference, setDietPreference] = useState<DietPreference>(initialDietPreference);
  
  const [calorieData, setCalorieData] = useState<CalorieData | null>(null);
  
  const { toast } = useToast();
  
  // Calculate calorie needs
  const calculateNeeds = () => {
    const data = calculateCalorieNeeds(age, weight, height, gender === "male", occupation);
    setCalorieData(data);
    
    toast({
      title: "Calorie needs calculated",
      description: `Your daily calorie needs are approximately ${Math.round(data.dailyCalorieNeeds)} kcal.`,
    });
  };
  
  // Initial calculation
  useEffect(() => {
    calculateNeeds();
  }, []);
  
  // Chart data for macronutrients
  const macroData = calorieData ? [
    { name: "Protein", value: calorieData.proteinNeeds * 4, color: "#F87171" },
    { name: "Carbs", value: calorieData.carbNeeds * 4, color: "#60A5FA" },
    { name: "Fat", value: calorieData.fatNeeds * 9, color: "#FBBF24" },
  ] : [];
  
  // Sample food suggestions
  const getFoodSuggestions = () => {
    if (!calorieData) return [];
    
    const suggestions = {
      Veg: {
        protein: ["Lentils (dal)", "Paneer", "Tofu", "Greek yogurt", "Chickpeas"],
        carbs: ["Brown rice", "Whole wheat roti", "Oats", "Sweet potato", "Millets"],
        fat: ["Ghee", "Coconut", "Peanut butter", "Avocado", "Nuts & seeds"]
      },
      NonVeg: {
        protein: ["Chicken breast", "Eggs", "Fish", "Lentils (dal)", "Greek yogurt"],
        carbs: ["Brown rice", "Whole wheat roti", "Oats", "Sweet potato", "Millets"],
        fat: ["Ghee", "Coconut", "Fish oil", "Nuts & seeds", "Olive oil"]
      }
    };
    
    return suggestions[dietPreference];
  };
  
  // Sample meal plan based on calorie needs
  const getMealPlan = () => {
    if (!calorieData) return null;
    
    const calorieLevel = calorieData.dailyCalorieNeeds;
    let mealPlan;
    
    if (dietPreference === "Veg") {
      mealPlan = {
        breakfast: calorieLevel < 1800 ? "Vegetable poha (1 cup) with curd" : "2 vegetable stuffed parathas with curd and fruit",
        midMorning: calorieLevel < 1800 ? "1 fruit" : "1 fruit and a handful of nuts",
        lunch: calorieLevel < 1800 ? "1 cup rice, 1 cup dal, vegetable curry & salad" : "1.5 cups rice, 1.5 cups dal, vegetable curry, salad & curd",
        evening: calorieLevel < 1800 ? "Tea with 2 whole wheat biscuits" : "Tea with small vegetable sandwich",
        dinner: calorieLevel < 1800 ? "2 rotis with vegetable curry and buttermilk" : "3 rotis with vegetable curry, dal and buttermilk"
      };
    } else {
      mealPlan = {
        breakfast: calorieLevel < 1800 ? "2 eggs with 1 slice whole wheat toast" : "3 eggs with 2 slices whole wheat toast and fruit",
        midMorning: calorieLevel < 1800 ? "1 fruit" : "1 fruit and a handful of nuts",
        lunch: calorieLevel < 1800 ? "1 cup rice, small portion chicken/fish curry & salad" : "1.5 cups rice, larger portion chicken/fish curry, dal & salad",
        evening: calorieLevel < 1800 ? "Tea with 2 whole wheat biscuits" : "Tea with small chicken sandwich",
        dinner: calorieLevel < 1800 ? "2 rotis with chicken/fish curry and salad" : "3 rotis with chicken/fish curry, vegetable side and curd"
      };
    }
    
    return mealPlan;
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold text-xd-green mb-6">Calorie & Nutrition Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Input Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Your Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as "male" | "female")}
                  className="input-field w-full"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="input-field w-full"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="input-field w-full"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value as OccupationType)}
                className="input-field w-full"
              >
                <option value="Light">Light (Office job, Teaching)</option>
                <option value="Mixed">Medium (Retail, Sales)</option>
                <option value="Heavy">Heavy (Construction, Farming)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
                Diet Preference
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="dietPreference"
                    checked={dietPreference === 'Veg'}
                    onChange={() => setDietPreference('Veg')}
                    className="h-4 w-4 text-xd-green focus:ring-xd-green"
                  />
                  <span className="ml-2">Vegetarian</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="dietPreference"
                    checked={dietPreference === 'NonVeg'}
                    onChange={() => setDietPreference('NonVeg')}
                    className="h-4 w-4 text-xd-green focus:ring-xd-green"
                  />
                  <span className="ml-2">Non-Vegetarian</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={calculateNeeds}
              className="w-full py-2 px-4 bg-xd-green text-white rounded-md hover:bg-xd-green-dark transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>
        
        {/* Results */}
        <div>
          {calorieData && (
            <>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Your Results</h3>
              
              <div className="p-4 bg-xd-green/10 rounded-lg mb-4">
                <h4 className="font-medium mb-3">Daily Calorie Requirements</h4>
                <div className="text-3xl font-bold text-xd-green">
                  {Math.round(calorieData.dailyCalorieNeeds)} kcal
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Based on your age, weight, height, and activity level
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2">Macronutrient Breakdown</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => [`${Math.round(value)} kcal`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mt-2">
                  <div>
                    <div className="text-lg font-bold text-red-400">{Math.round(calorieData.proteinNeeds)}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">{Math.round(calorieData.carbNeeds)}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-400">{Math.round(calorieData.fatNeeds)}g</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Food Suggestions & Sample Meal Plan */}
      {calorieData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-xd-green">Food Suggestions</h3>
            <div className="space-y-6">
              {Object.entries(getFoodSuggestions()).map(([category, foods]) => (
                <div key={category} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-medium mb-2 capitalize">{category} Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {(foods as string[]).map((food, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-700"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-xd-green">Sample Meal Plan</h3>
            {getMealPlan() && Object.entries(getMealPlan()!).map(([mealTime, meal]) => (
              <div key={mealTime} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                <h4 className="font-medium capitalize">{mealTime.replace(/([A-Z])/g, ' $1')}</h4>
                <p className="text-gray-700 mt-1">{meal}</p>
              </div>
            ))}
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mt-4">
              <p className="text-sm text-amber-800">
                This is a general guideline. Actual needs may vary. Consult with a nutritionist for a personalized plan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
