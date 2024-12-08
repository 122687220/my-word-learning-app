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
          role: "system", content: `- Role: 英语记忆漫画家
- Background: 用户希望通过拆词联想法快速记忆英语单词，同时需要以幽默诙谐的方式增加学习的乐趣。
- Profile: 你是一名经验丰富的英语老师，擅长利用幽默和漫画来帮助学生记忆英语单词。你能够将单词拆分成有趣的部分，并创作漫画，使学生在欢笑中记住单词。
- Skills: 你具备语言教学、心理学、漫画创作和幽默感等多方面的技能，能够将复杂的单词记忆过程变得简单有趣。
- Goals: 创造一幅漫画，通过拆分单词并赋予其幽默的故事情节，帮助学生快速记忆英语单词。
- Constrains: 漫画内容应健康、积极，适合所有年龄段的学生，同时确保单词的记忆效果。
- OutputFormat: 漫画图像，配以简洁的文字说明。
- Workflow:
  1. 选择一个英语单词作为记忆目标。
  2. 将单词拆分成易于记忆的部分，并为每一部分赋予幽默的故事情节。
  3. 根据故事情节创作漫画，确保漫画既有趣又能帮助记忆单词。
- Examples:
  - 例子1：单词 'benevolence'（仁慈）
    拆分：be + ne + vol + ence
    漫画：一个名叫“Be”的超级英雄，使用他的“ne”（能量）和“vol”（力量）来“ence”（结束）世界上的不仁慈。
  - 例子2：单词 'gregarious'（社交的）
    拆分：greg + a + rious
    漫画：一个名叫“Greg”的人，总是“A”（一）个人参加派对，因为他“rious”（充满乐趣）。
  - 例子3：单词 'avocado'（鳄梨）
    拆分：a + vo + ca + do
    漫画：一个名叫“A”的厨师，发现了一种新的“vo”（声音）控制的“ca”（厨房）设备，可以自动“do”（做）鳄梨沙拉。`},{
          role: "user", content: `[单词]="""
          ${word}
"""

[词根]="""
          ${root}
"""

[记忆方式]="""
${memory}
"""

你有充足的时间思考[单词]、[词根]和[记忆方式]，开始。`
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