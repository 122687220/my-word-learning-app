"use client"
import { Layout, Spin } from 'antd';
import Navigation from '@/app/components/Navigation';
import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { LoadingOutlined } from '@ant-design/icons';
import { LLM_CONTENT } from '@/app/utils/constant';
import ReactMarkdown from 'react-markdown';
import { getStorage, setStorage } from '@/app/utils';
console.log(process.env.moon);

const Home = () => {
  console.log(process.env.moon);

  const [content, setContent] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const [wordStr, memoryStr] = location.search.replace('?', "").split('&')

    const word = wordStr.split('=')[1] || ''
    const memory = memoryStr.split('=')[1] || ''

    const dic = getStorage(LLM_CONTENT, {})

    const isExist = Object.keys(dic).some(item => item === word)

    if (isExist) {
      setContent(dic[word])
    } else {
      setShow(true)
      getContent(word, memory)
    }
  }, [])

  const getContent = async (word = '', memory = '') => {
    try {
      const resJson = await request({ path: '/getLLM', values: { word, memory } });

      setContent(resJson.content)

      const dic = getStorage(LLM_CONTENT, [])

      setStorage(LLM_CONTENT, { ...dic, [word]: resJson.content })
    } catch (error) {
      console.log(error);
    }
    setShow(false)
  }

  return (
    <Layout>
      <Navigation />
      {process.env.moon}
      {show && <Spin indicator={<LoadingOutlined spin />} />}
      <div style={{ margin: '20px 20px' }}>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default Home;