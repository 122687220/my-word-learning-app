// pages/index.tsx
import { Layout } from 'antd';
import GameContainer from '@/app/components/GameContainer';
import Navigation from '@/app/components/Navigation';

const Home = () => {
  return (
    <Layout>
      <Navigation />
      <div style={{ margin: '0 10px' }}>
        <GameContainer />
      </div>
    </Layout>
  );
};

export default Home;