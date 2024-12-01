// pages/api/saveWord.ts
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { name = '' } = await req.json()

  try {
      const wordsFilePath = path.join(process.cwd(), 'data', name || 'words.json');
      let existingWords = []
      // 读取现有JSON文件中的数据
      if (fs.existsSync(wordsFilePath)) {
        const fileData = fs.readFileSync(wordsFilePath, 'utf8');
        existingWords = JSON.parse(fileData);
      } else {
        existingWords = []
      }

      return Response.json({ message: '获取单词成功', words: existingWords }, {status: 200})
  } catch (error) {
    console.error(error);
    return Response.json({ message: '获取单词时出错' }, {status: 500})
  }
}