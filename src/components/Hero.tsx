
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-50 pt-16 pb-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-xd-green">
              <span className="block">Healthy Eating</span>
              <span className="block">Doesn't Have to be</span>
              <span className="block text-xd-yellow-dark">Expensive</span>
            </h1>
            <p className="text-lg mb-8 max-w-lg text-gray-700">
              Get personalized diet plans that fit your budget and nutritional needs. Built specifically for Indian diets across all regions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-xd-green text-white rounded-lg font-medium shadow-lg hover:bg-xd-green-dark transition-all text-center"
              >
                Get Started
              </Link>
              <Link
                to="/diet"
                className="px-8 py-3 border-2 border-xd-green text-xd-green rounded-lg font-medium hover:bg-xd-green hover:text-white transition-all text-center"
              >
                See Sample Diet
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                alt="Indian healthy food"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
            <div 
              className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-xd-yellow rounded-full opacity-80 z-0"
              aria-hidden="true"
            ></div>
            <div 
              className="hidden md:block absolute -top-10 -right-10 w-24 h-24 bg-xd-red rounded-full opacity-60 z-0"
              aria-hidden="true"
            ></div>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col items-center">
          <p className="text-center text-gray-600 mb-4">Discover how it works</p>
          <ArrowDown className="animate-bounce-slow text-xd-green" size={32} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
