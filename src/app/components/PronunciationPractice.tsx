'use client'
import React, { useState, useEffect } from 'react';
import { WordFormData } from '@/app/interface';
import WordDetail from '@/app/components/WordDetail';
import { Card, Button, Input } from 'antd';
import { filterWords } from '@/app/utils';

const Index: React.FC<{ words: WordFormData[] }> = ({ words }) => {
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
            const randomIndex = Math.floor(Math.random() * words.length);
            setCurrentWord(words[randomIndex]);
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