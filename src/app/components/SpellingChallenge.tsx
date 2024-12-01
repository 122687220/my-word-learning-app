// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Space } from 'antd';
import { WordFormData } from '@/app/interface';
import Correct from '@/app/components/Correct';


const WordLearningPage: React.FC<{ words: WordFormData[] }> = ({ words }) => {
    const [currentWord, setCurrentWord] = useState<WordFormData | null>(null);
    const [userDefinition, setUserDefinition] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState<boolean | null>(null);

    const getCurrentQuestion = () => {
        if (currentWord && currentWord?.key_collocations?.length) {
            return currentWord?.key_collocations[currentIndex].collocation;
        }
        return currentWord?.word;
    };

    const getCurrentDefinition = () => {
        if (currentWord && currentWord?.key_collocations?.length) {
            return currentWord?.key_collocations[currentIndex].definition;
        }
        return currentWord?.definition;
    };

    useEffect(() => {
        handleNextQuestion()
    }, [words])

    const handleNextQuestion = () => {
        reset()
        const newIndex = Math.floor(Math.random() * words.length);
        const keyLength = words[newIndex].key_collocations?.length || 0
        if (keyLength) {
            const newKeyIndex = Math.floor(Math.random() * keyLength);
            setCurrentIndex(newKeyIndex)
        } else {
            setCurrentIndex(newIndex)
        }

        setCurrentWord(words[newIndex]);
        setUserDefinition('');
    };

    const handleCheckAnswer = () => {
        if (!currentWord) return;

        const correctDefinition = getCurrentDefinition();
        setShowAnswer(true);

        setAnswer(userDefinition.trim() === correctDefinition)
    };

    const reset = () => {
        setAnswer(null)
        setShowAnswer(false)
        setUserDefinition('')
    }

    return (
        <div style={{ marginBottom: '10px' }}>
            <Button type="primary" onClick={handleNextQuestion}>
                下一题
            </Button>

            <Card title='题目' style={{ width: '100%', margin: '20px 0' }}>
                <p>{getCurrentQuestion()}</p>

                <Input
                    placeholder="Enter the definition in Chinese"
                    value={userDefinition}
                    onChange={(e) => setUserDefinition(e.target.value)}
                    style={{ width: '100%', marginBottom: '20px' }}
                />
                <Space>
                    <Button onClick={handleCheckAnswer}>确定</Button>
                </Space>
            </Card>
            {showAnswer && (
                <Card title="答案" style={{ width: '100%', marginTop: '20px' }} extra={<Correct answer={answer} />}>
                    <p>正确的定义是: {getCurrentDefinition()}</p>
                </Card>
            )}
        </div>
    );
};

export default React.memo(WordLearningPage);