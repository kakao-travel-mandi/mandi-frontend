import {redirect} from 'next/navigation';

import Layout from '@/components/layout';

const Login = async () => {
  return (
    <Layout isTopNav={false} isTabBar={false} back={true}>
      <h1>LoginPage</h1>
    </Layout>
  );
};

export default Login;
