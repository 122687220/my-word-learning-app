'use client'
import React, { useState, useEffect } from 'react';
import { WordFormData } from '@/app/interface';
import WordDetail from '@/app/components/WordDetail';
import { Card, Button, Input } from 'antd';
import { filterWords } from '@/app/utils';
import { useRouter } from 'next/navigation';


const Index: React.FC<{ words: WordFormData[] }> = ({ words }) => {
    const route = useRouter()

    const [currentWord, setCurrentWord] = useState<WordFormData | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [findWords, setFindWords] = useState<WordFormData[]>([]);

    useEffect(() => {
        handleNextWord(false)
    }, [])

    const handleNextWord = (needFind = false) => {
        if (needFind) {
            const find = words.find(item => item.word.includes(userInput)) || null
            setCurrentWord(find)
        } else {
            const root = location.search.replace('?', "").split('&')[0].split('=')[1] || ''
            const arr = root ? words.filter(item => item.root === decodeURI(root)) : words
            const randomIndex = Math.floor(Math.random() * arr.length);
            setCurrentWord(arr[randomIndex]);
        }

        setUserInput('')
    };

    const onFind = () => {
        const arr = filterWords({ word: userInput, words })
        setFindWords(arr)
    }

    return (
        <>
            <Card style={{ margin: '0' }}>
                <WordDetail currentWord={currentWord} />
                <Button type="primary" onClick={() => handleNextWord(false)}>
                    下一个
                </Button>
                <Button color="danger" variant="outlined" style={{ marginLeft: '20px' }} onClick={() => route.push(`/memory?word=${currentWord?.word}&memory=${currentWord?.memory}&root=${currentWord?.root}`)}>
                    记忆方法
                </Button>
            </Card>

            <Card title='查找单词' style={{ marginTop: '20px' }}>
                <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Write the word here"
                    style={{ width: '100%', marginBottom: '10px' }}
                    allowClear
                    onClear={() => setFindWords([])}
                />
                <Button type="primary" onClick={onFind}>
                    查找
                </Button>

                {
                    findWords.map((item, index) => (<WordDetail key={index} currentWord={item} showBorder />))
                }
            </Card>
        </>

    )
}

export default React.memo(Index)