'use client'
// pages/index.tsx
import { Layout } from 'antd';
import ProgressTracker from '@/app/components/ProgressTracker';
import Navigation from '@/app/components/Navigation';
import { useEffect, useState } from 'react';

const Index = () => {
  const [words, setWords] = useState([])
  useEffect(() => {
    try {
      const json = localStorage.getItem('my-word-learning-app') || '[]'
      setWords(JSON.parse(json))
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }

  }, [])


  return (
    <Layout>
      <Navigation />
      <div style={{ margin: '0 10px' }}>
        <ProgressTracker words={words} />
      </div>
    </Layout>
  );
};

export default Index;