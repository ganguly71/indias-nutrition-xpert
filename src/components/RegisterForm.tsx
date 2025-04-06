
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { OccupationType, DietPreference } from '@/types';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    weight: '',
    height: '',
    occupation: 'Light' as OccupationType,
    familyIncome: '',
    familyMembers: '',
    state: '',
    district: '',
    dietPreference: 'Veg' as DietPreference,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields.",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
        });
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate registration - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-xd-green">Create Your Account</h2>
        <p className="text-gray-600 mt-2">Tell us about yourself to get personalized recommendations</p>
      </div>
      
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s === step ? 'bg-xd-green text-white' : s < step ? 'bg-xd-green-light text-white' : 'bg-gray-200 text-gray-600'}`}>
                {s}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {s === 1 ? 'Account' : s === 2 ? 'Personal' : 'Location'}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className={`h-1 flex-1 ${step > 1 ? 'bg-xd-green-light' : 'bg-gray-200'}`}></div>
          <div className={`h-1 flex-1 ${step > 2 ? 'bg-xd-green-light' : 'bg-gray-200'}`}></div>
        </div>
      </div>
      
      <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-6">
        {/* Step 1: Account Information */}
        {step === 1 && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password*
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </>
        )}
        
        {/* Step 2: Personal Information */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)*
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="30"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)*
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  required
                  min="1"
                  max="300"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="70"
                />
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)*
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  required
                  min="50"
                  max="250"
                  value={formData.height}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="170"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                Occupation Type*
              </label>
              <select
                id="occupation"
                name="occupation"
                required
                value={formData.occupation}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="Light">Light Work (e.g., Office job, Teacher)</option>
                <option value="Mixed">Mixed Work (e.g., Sales, Retail)</option>
                <option value="Heavy">Heavy Work (e.g., Construction, Farming)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="familyIncome" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Family Income (₹)*
                </label>
                <input
                  id="familyIncome"
                  name="familyIncome"
                  type="number"
                  required
                  min="0"
                  value={formData.familyIncome}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="15000"
                />
              </div>
              
              <div>
                <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Family Members*
                </label>
                <input
                  id="familyMembers"
                  name="familyMembers"
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="4"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
                Diet Preference*
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="dietPreference"
                    value="Veg"
                    checked={formData.dietPreference === 'Veg'}
                    onChange={handleChange}
                    className="h-4 w-4 text-xd-green focus:ring-xd-green"
                  />
                  <span className="ml-2">Vegetarian</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="dietPreference"
                    value="NonVeg"
                    checked={formData.dietPreference === 'NonVeg'}
                    onChange={handleChange}
                    className="h-4 w-4 text-xd-green focus:ring-xd-green"
                  />
                  <span className="ml-2">Non-Vegetarian</span>
                </label>
              </div>
            </div>
          </>
        )}
        
        {/* Step 3: Location & Image */}
        {step === 3 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="input-field w-full"
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District*
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Your district"
                  disabled={!formData.state}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image (Full body photo)
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Helps us track your progress. Optional but recommended.
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <h4 className="text-amber-800 font-medium">Privacy Notice</h4>
              <p className="text-sm text-amber-700 mt-1">
                Your data will be used to personalize diet recommendations. 
                We handle your information with care and in accordance with our privacy policy.
              </p>
            </div>
          </>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-xd-green hover:bg-xd-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-xd-green"
          >
            {step === 3 ? (isLoading ? "Registering..." : "Complete Registration") : "Next"}
          </button>
        </div>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-xd-green hover:text-xd-green-dark">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
