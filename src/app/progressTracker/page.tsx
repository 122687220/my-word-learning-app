'use client'
// pages/index.tsx
import { Layout } from 'antd';
import ProgressTracker from '@/app/components/ProgressTracker';
import Navigation from '@/app/components/Navigation';
import { useWords } from '@/app/hooks/useWords';

const Index = () => {
  const { words } = useWords({ name: 'error.json' })

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