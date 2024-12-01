'use client'
// pages/index.tsx
import { Layout } from 'antd';
import PronunciationPractice from '@/app/components/PronunciationPractice';
import Navigation from '@/app/components/Navigation';
import { useWords } from '@/app/hooks/useWords';

const Home = () => {
  const { words } = useWords()

  return (
    <Layout>
      <Navigation />
      <div style={{ margin: '0 10px' }}>
        <PronunciationPractice words={words} />
      </div>
    </Layout>
  );
};

export default Home;