// pages/api/saveWord.ts
import OpenAI from 'openai';

export async function POST(req: Request) {
  const { word = '', memory='' } = await req.json()
  const client = new OpenAI({
    apiKey: process.env.moon || 'my',    
    baseURL: "https://api.moonshot.cn/v1",
  });
  try {
    const completion = await client.chat.completions.create({
      model: "moonshot-v1-8k",         
      messages: [{ 
          role: "system", content: `你是一名英语老师，擅长通过幽默诙谐的方式，让学生记住单词。你擅长将单词拆分，并把拆分的部分画漫画是你的教学方式之一。根据提供的内容，画一幅让学生快速记忆单词的漫画。`},{
          role: "user", content: `[单词]="""
          ${word}
"""

[记忆方式]="""
${memory}
"""

你有充足的时间思考[单词]和[记忆方式]，开始。`
      }],
      temperature: 0.3
  });
  const content = completion.choices[0].message.content;

      return Response.json({ message: '获取成功', content }, {status: 200})
  } catch (error) {
    console.error(error);
    return Response.json({ message: '获取出错' }, {status: 500})
  }
}