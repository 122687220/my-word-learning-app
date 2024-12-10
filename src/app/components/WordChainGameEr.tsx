// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from 'antd';
import { WordFormData } from '@/app/interface';
import Correct from '@/app/components/Correct';
import WordDetail from '@/app/components/WordDetail';
import { spiltDefinition, filterWords } from '@/app/utils';

const WordLearningPage: React.FC<{ words: WordFormData[] }> = ({ words }) => {
    const [answerWords, setAnswerWords] = useState<WordFormData[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answer, setAnser] = useState<boolean | null>(null)
    const [currentDefinition, setCurrentDefinition] = useState<string>('')

    useEffect(() => {
        handleNextWord()
    }, [words])

    const reset = () => {
        setAnser(null)
        setShowAnswer(false)
        setUserInput('')
        setAnswerWords([])
    }
    const handleNextWord = () => {
        reset()
        const randomIndex = Math.floor(Math.random() * words.length);
        const definitions = spiltDefinition(words[randomIndex].definition)
        const random = Math.floor(Math.random() * definitions.length);
        setCurrentDefinition(definitions[random]);
    };

    const handleConfirm = () => {
        setShowAnswer(true);

        const inputAnswer = userInput.toLowerCase()

        const arr = filterWords({ word: currentDefinition, words })

        const isTrue = arr.some(item => item.word.toLowerCase() === inputAnswer)

        setAnswerWords(arr)
        setAnser(isTrue)
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <Button type="primary" onClick={handleNextWord} disabled={!showAnswer}>
                下一题
            </Button>
            <>
                <Card title='题目' style={{ marginTop: '20px' }}>
                    <p>{currentDefinition}</p>
                    <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Write the word here"
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <Button type="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Card>
                {showAnswer && (
                    <Card title="答案" style={{ marginTop: '20px' }} extra={<Correct answer={answer} word={answerWords[0]} />}>
                        {answerWords.map((item, index) => <WordDetail key={index} currentWord={item} />)}
                    </Card>
                )}
            </>
        </div>
    );
};

export default React.memo(WordLearningPage);