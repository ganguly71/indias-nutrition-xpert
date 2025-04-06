
import Layout from '@/components/Layout';
import RegisterForm from '@/components/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
