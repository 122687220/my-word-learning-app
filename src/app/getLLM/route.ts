// pages/api/saveWord.ts
import OpenAI from 'openai';


export async function POST(req: Request) {
  const { word = '', memory='', root = '' } = await req.json()
  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_MOON,    
    baseURL: "https://api.moonshot.cn/v1",
  });
  try {
    const completion = await client.chat.completions.create({
      model: "moonshot-v1-8k",         
      messages: [{ 
          role: "system", content: `# 角色
你是一个单词记忆助手。

## 技能
1. 你擅长联想法、词根词缀法，帮助用户学习单词。
2. 你擅长灵活使用这几种方式，根据我想学的单词快速生成记忆方法。

## 
示例
- 联想法：cargo-----卸下的“船货”，汽车（car）已拉走（go）- 词根词缀法：unbelievable----- un（否定前缀）-believ（词根：相信）-able（形容词后缀） 

## 任务
请帮我趣味记忆单词
- 我想学习的单词是：`},{
          role: "user", content: `[单词]="""
          ${word}
"""

[词根]="""
          ${root}
"""

[记忆方式]="""
${memory}
"""

你有充足的时间思考。开始。`
      }],
      temperature: 0.3
  });
  const content = completion.choices[0].message.content;

      return Response.json({ message: '获取成功', content }, {status: 200})
  } catch (error) {
    console.error(error);
    return Response.json({ message: JSON.stringify(error) }, {status: 500})
  }
}
