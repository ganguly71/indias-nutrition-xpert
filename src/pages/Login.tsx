
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
