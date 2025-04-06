
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { DietChartData, MealPlan } from '@/types';

interface DietChartProps {
  dietData?: DietChartData;
  isLoading?: boolean;
}

// Sample diet data
const sampleDietChart: DietChartData = {
  breakfast: [
    {
      name: "Vegetable Poha",
      ingredients: ["Poha (flattened rice)", "Potato", "Peas", "Onion", "Spices"],
      cost: 15,
      calories: 280,
      protein: 6,
      carbs: 56,
      fat: 5
    },
    {
      name: "Milk & Fruit",
      ingredients: ["Milk", "Seasonal fruit (banana/apple)"],
      cost: 20,
      calories: 180,
      protein: 8,
      carbs: 30,
      fat: 2
    }
  ],
  lunch: [
    {
      name: "Rice & Dal",
      ingredients: ["Rice", "Toor dal", "Seasonal vegetables", "Spices"],
      cost: 25,
      calories: 340,
      protein: 12,
      carbs: 70,
      fat: 3
    },
    {
      name: "Curd",
      ingredients: ["Homemade curd/yogurt"],
      cost: 10,
      calories: 80,
      protein: 5,
      carbs: 6,
      fat: 4
    }
  ],
  dinner: [
    {
      name: "Roti & Sabzi",
      ingredients: ["Whole wheat roti", "Seasonal vegetable curry", "Spices"],
      cost: 20,
      calories: 300,
      protein: 10,
      carbs: 45,
      fat: 7
    },
    {
      name: "Buttermilk",
      ingredients: ["Buttermilk with cumin and mint"],
      cost: 5,
      calories: 40,
      protein: 3,
      carbs: 3,
      fat: 2
    }
  ],
  totalCost: 95,
  totalCalories: 1220,
  totalProtein: 44,
  totalCarbs: 210,
  totalFat: 23
};

const DietChart = ({ dietData = sampleDietChart, isLoading = false }: DietChartProps) => {
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const { toast } = useToast();
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Diet plan downloaded",
      description: "Your diet plan has been saved to your device.",
    });
  };
  
  const handleEmail = () => {
    // In a real app, this would send an email
    toast({
      title: "Diet plan sent",
      description: "Your diet plan has been sent to your email address.",
    });
  };
  
  const MealSection = ({ title, meals }: { title: string; meals: MealPlan[] }) => (
    <div>
      <h3 className="text-xl font-bold text-xd-green mb-4">{title}</h3>
      <div className="space-y-4">
        {meals.map((meal, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{meal.name}</h4>
              <span className="text-xd-yellow-dark font-medium">₹{meal.cost}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {meal.ingredients.join(", ")}
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
              <div>
                <span className="font-medium">{meal.calories}</span> kcal
              </div>
              <div>
                <span className="font-medium">{meal.protein}g</span> protein
              </div>
              <div>
                <span className="font-medium">{meal.carbs}g</span> carbs
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="w-full p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Personalized Diet Plan</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="py-2 px-4 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Download
          </button>
          <button
            onClick={handleEmail}
            className="py-2 px-4 text-sm bg-xd-green text-white rounded-md hover:bg-xd-green-dark"
          >
            Email Plan
          </button>
        </div>
      </div>
      
      <div className="mb-6 flex justify-center">
        <div className="flex rounded-md overflow-hidden">
          <button
            onClick={() => setActiveTab('breakfast')}
            className={`px-4 py-2 text-sm ${activeTab === 'breakfast' ? 'bg-xd-green text-white' : 'bg-white text-gray-700'} border-r border-gray-200`}
          >
            Breakfast
          </button>
          <button
            onClick={() => setActiveTab('lunch')}
            className={`px-4 py-2 text-sm ${activeTab === 'lunch' ? 'bg-xd-green text-white' : 'bg-white text-gray-700'} border-r border-gray-200`}
          >
            Lunch
          </button>
          <button
            onClick={() => setActiveTab('dinner')}
            className={`px-4 py-2 text-sm ${activeTab === 'dinner' ? 'bg-xd-green text-white' : 'bg-white text-gray-700'}`}
          >
            Dinner
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        {activeTab === 'breakfast' && <MealSection title="Breakfast" meals={dietData.breakfast} />}
        {activeTab === 'lunch' && <MealSection title="Lunch" meals={dietData.lunch} />}
        {activeTab === 'dinner' && <MealSection title="Dinner" meals={dietData.dinner} />}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4">Daily Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-xl font-bold text-xd-yellow-dark">₹{dietData.totalCost}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-xl font-bold text-xd-green">{dietData.totalCalories} kcal</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-xl font-bold text-xd-red">{dietData.totalProtein}g</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Carbohydrates</p>
            <p className="text-xl font-bold text-xd-orange">{dietData.totalCarbs}g</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="text-yellow-800 font-medium">Nutrition Tips</h4>
        <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
          <li>Drink plenty of water throughout the day</li>
          <li>Try to include more seasonal and local vegetables</li>
          <li>Minimize fried foods and processed snacks</li>
          <li>This plan is designed to be nutritious while staying within your budget</li>
        </ul>
      </div>
    </div>
  );
};

export default DietChart;
