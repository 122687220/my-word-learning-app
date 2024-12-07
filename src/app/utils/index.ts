import { WordFormData } from '@/app/interface';

// 在对象数组中，找到关键词的数组
export const filterWords = ({ word = '', words = [] }: { word: string; words: WordFormData[] }) => {
    if (!words.length || !word) {
        return []
    }
    const arr = words.filter(item => item.word === word)

    if (!arr.length) {
        return words.filter(item => item.definition.includes(word))
    }

    return arr
}

// 分割字符串
export const spiltDefinition = (definition: string) => {
    const newDefinition = replaceChinesePunctuationToEnglish(definition)
    let arr: string[] = []
    newDefinition.split(';').forEach(item => {
        const items = item.split(',')

        arr = arr.concat(items)
    })

    return arr
}

// 将中文标点符号转成英文标点符号
export const replaceChinesePunctuationToEnglish = (input: string): string => {
    // 正则表达式匹配中文标点符号
    const regex = /[，。！？、；：“”（）《》【】]/g;
    // 替换规则
    const replaceMap: { [key: string]: string } = {
      '，': ',',
      '。': '.',
      '！': '!',
      '？': '?',
      '、': ',',
      '；': ';',
      '：“': '"',
      '”': '"',
      '（': '(',
      '）': ')',
      '《': '<',
      '》': '>',
      '【': '[',
      '】': ']',
    };
  
    return input.replace(regex, (match) => replaceMap[match] || match);
  }