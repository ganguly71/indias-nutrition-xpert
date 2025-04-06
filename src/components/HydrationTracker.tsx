
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { calculateWaterNeeds } from '@/utils/calculations';
import { HydrationData, OccupationType } from '@/types';

interface HydrationTrackerProps {
  initialWeight?: number;
  initialOccupation?: OccupationType;
  initialLocation?: string;
}

const HydrationTracker = ({
  initialWeight = 70,
  initialOccupation = "Light",
  initialLocation = "Delhi"
}: HydrationTrackerProps) => {
  const [waterNeeds, setWaterNeeds] = useState<number>(0);
  const [currentIntake, setCurrentIntake] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [weight, setWeight] = useState<number>(initialWeight);
  const [occupation, setOccupation] = useState<OccupationType>(initialOccupation);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(false);
  const [reminderInterval, setReminderInterval] = useState<number>(60); // minutes
  
  const { toast } = useToast();
  
  // Calculate water needs based on weight and occupation
  useEffect(() => {
    const needs = calculateWaterNeeds(weight, occupation);
    setWaterNeeds(needs);
  }, [weight, occupation]);
  
  // Update percentage whenever current intake or water needs change
  useEffect(() => {
    const newPercentage = (currentIntake / waterNeeds) * 100;
    setPercentage(Math.min(newPercentage, 100));
  }, [currentIntake, waterNeeds]);
  
  // Add water intake
  const addWater = (amount: number) => {
    setCurrentIntake((prev) => Math.min(prev + amount, waterNeeds));
    toast({
      title: `${amount}ml water added!`,
      description: `Keep going! Staying hydrated is important.`,
    });
  };
  
  // Reset intake
  const resetIntake = () => {
    setCurrentIntake(0);
    toast({
      title: "Hydration tracker reset",
      description: "Your water intake has been reset to 0ml.",
    });
  };
  
  // Toggle reminders
  const toggleReminders = () => {
    setReminderEnabled(!reminderEnabled);
    if (!reminderEnabled) {
      toast({
        title: "Hydration reminders enabled",
        description: `You'll be reminded to drink water every ${reminderInterval} minutes.`,
      });
    } else {
      toast({
        title: "Hydration reminders disabled",
        description: "You won't receive any more water reminders.",
      });
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Hydration Tracker</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-700">Daily Progress</h3>
          <span className="text-sm text-gray-500">
            {currentIntake} / {waterNeeds.toFixed(0)} ml
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-6 bg-blue-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        {/* Percentage */}
        <div className="text-center mt-2">
          <span className={`text-2xl font-bold ${percentage >= 100 ? 'text-green-500' : 'text-blue-600'}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      {/* Quick Add Buttons */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Quick Add</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => addWater(200)}
            className="py-2 px-4 bg-blue-100 rounded-lg text-blue-700 hover:bg-blue-200 transition-colors"
          >
            + 200ml
          </button>
          <button
            onClick={() => addWater(300)}
            className="py-2 px-4 bg-blue-200 rounded-lg text-blue-700 hover:bg-blue-300 transition-colors"
          >
            + 300ml
          </button>
          <button
            onClick={() => addWater(500)}
            className="py-2 px-4 bg-blue-300 rounded-lg text-blue-700 hover:bg-blue-400 transition-colors"
          >
            + 500ml
          </button>
        </div>
      </div>
      
      {/* Custom Settings */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Custom Settings</h3>
        
        <div className="space-y-4">
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
        </div>
      </div>
      
      {/* Reminders */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Water Reminders</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              className="sr-only peer" 
              checked={reminderEnabled}
              onChange={toggleReminders}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {reminderEnabled && (
          <div className="mt-4">
            <label htmlFor="reminderInterval" className="block text-sm font-medium text-gray-700 mb-1">
              Reminder every (minutes)
            </label>
            <select
              id="reminderInterval"
              value={reminderInterval}
              onChange={(e) => setReminderInterval(Number(e.target.value))}
              className="input-field w-full"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        )}
      </div>
      
      {/* Tips */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
        <h4 className="text-blue-800 font-medium">Hydration Tips</h4>
        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
          <li>Start your day with a glass of water</li>
          <li>Carry a water bottle wherever you go</li>
          <li>Drink more during hot weather or physical work</li>
          <li>Set reminders to drink water regularly</li>
        </ul>
      </div>
      
      {/* Reset Button */}
      <div className="mt-6 text-center">
        <button
          onClick={resetIntake}
          className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Reset Today's Intake
        </button>
      </div>
    </div>
  );
};

export default HydrationTracker;
