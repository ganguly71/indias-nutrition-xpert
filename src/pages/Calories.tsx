
import Layout from '@/components/Layout';
import CalorieCalculator from '@/components/CalorieCalculator';

const Calories = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Calorie Calculator</h1>
          
          <CalorieCalculator />
        </div>
      </div>
    </Layout>
  );
};

export default Calories;
