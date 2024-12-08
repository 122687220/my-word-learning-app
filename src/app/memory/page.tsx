"use client"
import { Layout, Spin } from 'antd';
import Navigation from '@/app/components/Navigation';
import { useEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { LLM_CONTENT } from '@/app/utils/constant';
import ReactMarkdown from 'react-markdown';
import { getStorage, setStorage } from '@/app/utils';
// import OpenAI from 'openai';

// const client = () => { }
// new OpenAI({
//   apiKey: 'process.env.moon',
//   baseURL: "https://api.moonshot.cn/v1",
// });



const Home = () => {
  const [content, setContent] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  const moon = useRef(process.env.moon)

  const [key] = useState<string>(process.env.moon || '')

  // let a = ''
  // if (process.env.moon && !a) {
  //   a = process.env.moon
  //   console.log('123=>', a);

  //   setKey(a || '456')
  // }

  useEffect(() => {
    const [wordStr] = location.search.replace('?', "").split('&')

    const word = wordStr.split('=')[1] || ''
    // const memory = memoryStr.split('=')[1] || ''

    const dic = getStorage(LLM_CONTENT, {})

    const isExist = Object.keys(dic).some(item => item === word)

    if (isExist) {
      setContent(dic[word])
    } else {
      setShow(true)
      getContent(word)
    }

  }, [])

  const getContent = async (word = '') => {
    try {
      const resJson = '' //await getLLM({ word, memory }) || '';

      setContent(resJson)

      const dic = getStorage(LLM_CONTENT, [])

      setStorage(LLM_CONTENT, { ...dic, [word]: resJson })
    } catch (error) {
      console.log(error);
    }
    setShow(false)
  }

  // const getLLM = async ({ word = '', memory = '' }) => {
  //   try {
  //     const completion = await client.chat.completions.create({
  //       model: "moonshot-v1-8k",
  //       messages: [{
  //         role: "system", content: `你是一名英语老师，擅长通过幽默诙谐的方式，让学生记住单词。你擅长将单词拆分，并把拆分的部分画漫画是你的教学方式之一。根据提供的内容，画一幅让学生快速记忆单词的漫画。`
  //       }, {
  //         role: "user", content: `[单词]="""
  //           ${word}
  // """

  // [记忆方式]="""
  // ${memory}
  // """

  // 你有充足的时间思考[单词]和[记忆方式]，开始。`
  //       }],
  //       temperature: 0.3
  //     });
  //     const content = completion.choices[0].message.content;

  //     return content;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <Layout>
      <Navigation />
      sadfsd:{moon.current}
      key:{key}
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