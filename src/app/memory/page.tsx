"use client"
import { Layout, Spin, Button } from 'antd';
import Navigation from '@/app/components/Navigation';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { LLM_CONTENT } from '@/app/utils/constant';
import ReactMarkdown from 'react-markdown';
import { getStorage } from '@/app/utils';
import { request } from '@/app/utils/request';

const Home = () => {
  const [content, setContent] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    handleClick()
  }, [])

  const handleClick = (needUpdate = false) => {
    const [wordStr, memoryStr, rootStr] = location.search.replace('?', "").split('&')

    const word = wordStr?.split('=')[1] || ''
    const memory = memoryStr?.split('=')[1] || ''
    const root = rootStr?.split('=')[1] || ''
    const dic = getStorage(LLM_CONTENT, {})
    const isExist = Object.keys(dic).some(item => item === word)


    if (needUpdate || (word && !isExist)) {
      setShow(true)
      getContent(word, memory, root)
    } else {
      setContent(dic[word])
    }
  }

  const getContent = async (word = '', memory = '', root = '') => {

    try {
      const resJson = await request({ path: '/getLLM', values: { word, memory, root } });

      setContent(resJson.content)

      // const dic = getStorage(LLM_CONTENT, [])

      // setStorage(LLM_CONTENT, { ...dic, [word]: resJson.content })
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
      <Button type="primary" onClick={() => handleClick(true)}>
          更新
      </Button>
    </Layout>
  );
};

export default Home;