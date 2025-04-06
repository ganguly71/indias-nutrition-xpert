
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar, Droplets, Heart, ChartBar, User } from 'lucide-react';

const Dashboard = () => {
  const [userData] = useState({
    name: "John Doe",
    weight: 70,
    height: 170,
    bmi: 24.2,
    bmiCategory: "Normal",
    dietPlan: "Customized Vegetarian",
    waterIntake: 2100,
    waterTarget: 2800,
    calorieIntake: 1850,
    calorieTarget: 2200,
    nextAppointment: "May 10, 2025 at 10:30 AM"
  });
  
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Welcome, {userData.name}</h2>
              <p className="text-gray-600">Here's an overview of your health journey</p>
            </div>
            <Link
              to="/profile"
              className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <User size={18} className="mr-2" />
              View Profile
            </Link>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
                <h3 className="ml-3 font-medium text-gray-700">BMI Status</h3>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{userData.bmi}</span>
                <span className={`text-sm font-medium ${userData.bmiCategory === 'Normal' ? 'text-xd-green' : 'text-xd-red'}`}>
                  {userData.bmiCategory}
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ChartBar className="text-green-600" size={20} />
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Diet Plan</h3>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium">{userData.dietPlan}</span>
                <Link to="/diet" className="text-sm text-blue-600 hover:underline mt-1">
                  View Details
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplets className="text-blue-600" size={20} />
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Water Intake</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{userData.waterIntake}ml / {userData.waterTarget}ml</span>
                  <span className="text-sm text-gray-600">{Math.round((userData.waterIntake / userData.waterTarget) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.round((userData.waterIntake / userData.waterTarget) * 100)}%` }}
                  ></div>
                </div>
                <Link to="/hydration" className="text-sm text-blue-600 hover:underline mt-2">
                  Update Tracker
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart className="text-red-600" size={20} />
                </div>
                <h3 className="ml-3 font-medium text-gray-700">Calories</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{userData.calorieIntake} / {userData.calorieTarget} kcal</span>
                  <span className="text-sm text-gray-600">{Math.round((userData.calorieIntake / userData.calorieTarget) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${Math.round((userData.calorieIntake / userData.calorieTarget) * 100)}%` }}
                  ></div>
                </div>
                <Link to="/calories" className="text-sm text-blue-600 hover:underline mt-2">
                  View Calculator
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Diet Recommendations */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Today's Diet Recommendations</h3>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-lg text-xd-green">Breakfast <span className="text-gray-500 text-sm">7:00 - 8:30 AM</span></h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-green-dark rounded-full mr-2"></span>
                      Vegetable Poha (1 cup)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-green-dark rounded-full mr-2"></span>
                      1 glass buttermilk or curd
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-green-dark rounded-full mr-2"></span>
                      1 seasonal fruit
                    </li>
                  </ul>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-lg text-xd-yellow-dark">Lunch <span className="text-gray-500 text-sm">12:30 - 2:00 PM</span></h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-yellow-dark rounded-full mr-2"></span>
                      Rice (1 cup)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-yellow-dark rounded-full mr-2"></span>
                      Dal (1 cup)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-yellow-dark rounded-full mr-2"></span>
                      Mixed vegetable curry
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-yellow-dark rounded-full mr-2"></span>
                      Salad
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg text-xd-red">Dinner <span className="text-gray-500 text-sm">7:30 - 9:00 PM</span></h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-red rounded-full mr-2"></span>
                      Roti (2-3)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-red rounded-full mr-2"></span>
                      Paneer curry or other protein-rich dish
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-1.5 h-1.5 bg-xd-red rounded-full mr-2"></span>
                      Steamed vegetables
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/diet"
                  className="text-xd-green hover:text-xd-green-dark hover:underline font-medium"
                >
                  View full diet plan →
                </Link>
              </div>
            </div>
            
            {/* Upcoming Appointment & Quick Links */}
            <div className="space-y-6">
              {/* Upcoming Appointment */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Upcoming Appointment</h3>
                
                {userData.nextAppointment ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <Calendar className="text-xd-green" size={20} />
                      <span className="ml-2 font-medium">{userData.nextAppointment}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Reschedule
                      </button>
                      <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">No upcoming appointments.</p>
                    <Link
                      to="/appointment"
                      className="px-4 py-2 bg-xd-green text-white rounded-md text-sm hover:bg-xd-green-dark"
                    >
                      Schedule Appointment
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Quick Links */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                
                <div className="space-y-3">
                  <Link 
                    to="/diet"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <ChartBar className="text-xd-green" size={20} />
                    <span className="ml-3 text-gray-700">Update Diet Preferences</span>
                  </Link>
                  
                  <Link 
                    to="/hydration"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <Droplets className="text-blue-600" size={20} />
                    <span className="ml-3 text-gray-700">Log Water Intake</span>
                  </Link>
                  
                  <Link 
                    to="/calories"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <Heart className="text-red-600" size={20} />
                    <span className="ml-3 text-gray-700">Update Calorie Goals</span>
                  </Link>
                  
                  <Link 
                    to="/appointment"
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <Calendar className="text-purple-600" size={20} />
                    <span className="ml-3 text-gray-700">Request Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
