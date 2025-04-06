
import Layout from '@/components/Layout';
import AppointmentForm from '@/components/AppointmentForm';

const Appointment = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Request Appointment</h1>
          
          <div className="max-w-3xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
