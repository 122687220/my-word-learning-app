'use client'

import { Layout, List } from 'antd';
import Navigation from '@/app/components/Navigation';
import { useMyContext } from '@/app/context';
import { useEffect, useState } from 'react';
import { WordFormData } from "@/app/interface";
import { useRouter } from 'next/navigation';

const Home = () => {
  const route = useRouter()

  const [list, setList] = useState<string[]>([])
  const { words } = useMyContext();

  useEffect(() => {
    const obj = combineArr()

    setList(Object.keys(obj))
  }, [words])

  const combineArr = () => {
    // 对数组对象中，根据特定的关键词，进行聚合
    const obj:{ [key: string]: WordFormData[] } = {}
    words.forEach((item) => {
      const key = item.root || 'none'

      if (!obj[key]) {
        obj[key] = [item]
      } else {
        obj[key].push(item)
      }
    })

    return obj
  }

  return (
    <Layout>
      <Navigation />
      <div style={{ margin: '0 10px' }}>
        <List
          dataSource={list}
          renderItem={item => <List.Item onClick={() => {
            route.push(`/pronunciationPractice?root=${item}`)
          }}>{item}</List.Item>}
        />
      </div>
    </Layout>
  );
};

export default Home;