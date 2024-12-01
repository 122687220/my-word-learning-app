// pages/api/saveWord.ts
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { name = '', ...restProps } = await req.json()
  try {
      const wordsFileDir = path.join(process.cwd(), 'data');
      const wordsFilePath = `${wordsFileDir}/${name || 'words.json'}`;
      let existingWords = [];

      if (!fs.existsSync(wordsFileDir)) {
        fs.mkdirSync(wordsFileDir)
      }

      // 读取现有JSON文件中的数据
      if (fs.existsSync(wordsFilePath)) {
        const fileData = fs.readFileSync(wordsFilePath, 'utf8');
        existingWords = JSON.parse(fileData);
      }

      // 添加新的单词条目
      existingWords.push(restProps);

      // 写入更新后的数据回文件
      fs.writeFileSync(wordsFilePath, JSON.stringify(existingWords));

      return Response.json({ message: '单词已保存' }, {status: 200})
  } catch (error) {
    console.error(error);
    return Response.json({ message: '保存单词时出错' }, {status: 500})
  }
}