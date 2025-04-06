
import Layout from '@/components/Layout';
import DietChart from '@/components/DietChart';

const Diet = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Diet Chart</h1>
          
          <DietChart />
        </div>
      </div>
    </Layout>
  );
};

export default Diet;
