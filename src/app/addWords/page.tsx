// pages/index.tsx
import { Layout, Row, Col } from 'antd';
import InputForm from '@/app/components/InputForm';
import Navigation from '@/app/components/Navigation';

const Home = () => {
  return (
    <Layout>
      <Navigation />
      <Row>
        <Col span={12} offset={6}>
          <InputForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;