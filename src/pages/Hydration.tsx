
import Layout from '@/components/Layout';
import HydrationTracker from '@/components/HydrationTracker';

const Hydration = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Hydration Tracker</h1>
          
          <div className="max-w-2xl mx-auto">
            <HydrationTracker />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hydration;
