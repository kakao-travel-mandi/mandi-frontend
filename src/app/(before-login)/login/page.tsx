import {redirect} from 'next/navigation';

import Layout from '@/components/layout';

const Login = async () => {
  return (
    <Layout hasTopNav={false} hasTabBar={false} back={true}>
      <h1>LoginPage</h1>
    </Layout>
  );
};

export default Login;
