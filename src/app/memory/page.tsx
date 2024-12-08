"use client"
import { Layout, Spin } from 'antd';
import Navigation from '@/app/components/Navigation';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { LoadingOutlined } from '@ant-design/icons';
import { LLM_CONTENT } from '@/app/utils/constant';
import ReactMarkdown from 'react-markdown';
import { getStorage, setStorage } from '@/app/utils';

const Home = () => {
  const searchParams = useSearchParams()
  const [content, setContent] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const word = params.get('word') || ''
    const memory = params.get('memory') || ''

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