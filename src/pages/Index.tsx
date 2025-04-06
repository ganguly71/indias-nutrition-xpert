
import { ChartBar, Heart, CalendarCheck, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const features = [
    {
      icon: ChartBar,
      title: "Diet Chart Creator",
      description: "Get a customized diet plan based on your location, income and dietary preferences.",
      path: "/diet",
      color: "bg-xd-green"
    },
    {
      icon: Droplets,
      title: "Hydration Tracker",
      description: "Track your daily water intake and get reminders to stay hydrated throughout the day.",
      path: "/hydration",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Calorie Calculator",
      description: "Calculate your daily calorie needs and get a balanced macronutrient breakdown.",
      path: "/calories",
      color: "bg-xd-red"
    },
    {
      icon: CalendarCheck,
      title: "Nutrition Appointments",
      description: "Schedule a consultation with a nutrition expert for personalized advice.",
      path: "/appointment",
      color: "bg-xd-yellow"
    }
  ];

  return (
    <Layout>
      <Hero />
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tools designed to help you maintain a balanced diet without breaking your budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.path}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconBgColor={feature.color}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get your personalized nutrition plan
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-xd-green"></div>
              
              {/* Steps */}
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <h3 className="text-xl font-bold mb-2 text-xd-green">Register & Share Details</h3>
                    <p className="text-gray-600">
                      Create an account and provide your personal details, location, and dietary preferences.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 w-12 h-12 rounded-full bg-xd-green flex items-center justify-center z-10">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right md:order-1 md:mt-0 mt-4"></div>
                  <div className="mt-8 md:mt-0 w-12 h-12 rounded-full bg-xd-green flex items-center justify-center z-10">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-2">
                    <h3 className="text-xl font-bold mb-2 text-xd-green">Get Your Diet Plan</h3>
                    <p className="text-gray-600">
                      Receive a customized diet plan based on your local food availability, preferences, and budget.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    <h3 className="text-xl font-bold mb-2 text-xd-green">Track Your Progress</h3>
                    <p className="text-gray-600">
                      Use our hydration tracker and calorie calculator to stay on track with your health goals.
                    </p>
                  </div>
                  <div className="mt-8 md:mt-0 w-12 h-12 rounded-full bg-xd-green flex items-center justify-center z-10">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:mt-0 mt-4"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right md:order-1 md:mt-0 mt-4"></div>
                  <div className="mt-8 md:mt-0 w-12 h-12 rounded-full bg-xd-green flex items-center justify-center z-10">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-2">
                    <h3 className="text-xl font-bold mb-2 text-xd-green">Get Expert Support</h3>
                    <p className="text-gray-600">
                      Schedule appointments with nutrition experts for personalized advice and guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/register"
              className="px-8 py-3 bg-xd-green text-white rounded-lg font-medium shadow-lg hover:bg-xd-green-dark transition-all inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Xpert-Diet</h2>
            <p className="text-lg text-gray-600 mb-8">
              Xpert-Diet is a nutrition platform designed specifically for Indian families on a budget. 
              Our mission is to make healthy eating accessible to everyone, regardless of their income level.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We analyze regional food availability, local dietary habits, and budget constraints 
              to create personalized diet plans that are both nutritious and affordable.
            </p>
            <div className="bg-xd-green/10 p-6 rounded-lg">
              <blockquote className="text-xl italic text-gray-800">
                "Good nutrition should be a right, not a privilege. We're committed to helping
                every Indian family eat well, within their means."
              </blockquote>
              <p className="mt-4 font-medium">— The Xpert-Diet Team</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
