'use client'
// pages/index.tsx
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { get } from '@vercel/edge-config';
import Head from 'next/head';
import { Button, Row, Col } from 'antd';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const route = useRouter()
  const [a, setA] = useState('')

  useEffect(() => {
    test()
  }, [])

  const test = async () => {
    const greeting = await get('greeting');
    setA(JSON.stringify(greeting))
  }

  return (
    <Layout>
      <Head>
        <title>首页</title>
      </Head>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>首页</h1>
      <h2 style={{ textAlign: 'center', margin: '10px 0' }}>英语单词学习应用</h2>
      <Row justify="center" gutter={20} style={{ margin: '20px' }}>
        {/* <Col xs={24} sm={12} md={8} lg={6}>
          <Button style={{ marginBottom: '10px' }} type="primary" block onClick={() => route.push("/addWords")}>
            输入单词
          </Button>
        </Col> */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button style={{ marginBottom: '10px' }} type="primary" block onClick={() => route.push("/pronunciationPractice")}>
            练习单词
          </Button>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button style={{ marginBottom: '10px' }} type="primary" block onClick={() => route.push("/games")}>
            玩游戏
          </Button>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button style={{ marginBottom: '10px' }} type="primary" block onClick={() => route.push("/progressTracker")}>
            进度{a}
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
