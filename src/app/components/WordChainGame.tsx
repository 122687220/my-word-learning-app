// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Input } from 'antd';
import { WordFormData } from '@/app/interface';
import Correct from '@/app/components/Correct';
import WordDetail from '@/app/components/WordDetail';

const WordLearningPage: React.FC<{ words: WordFormData[] }> = ({ words }) => {
    const [currentWord, setCurrentWord] = useState<WordFormData | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answer, setAnser] = useState<boolean | null>(null)

    useEffect(() => {
        handleNextWord()
    }, [words])

    const reset = () => {
        setAnser(null)
        setShowAnswer(false)
        setUserInput('')
    }
    const handleNextWord = () => {
        reset()
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWord(words[randomIndex]);
    };

    const handleConfirm = () => {
        setShowAnswer(true);

        setAnser(currentWord && userInput.toLowerCase() === currentWord.word.toLowerCase())
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <Button type="primary" onClick={handleNextWord}>
                下一题
            </Button>
            {currentWord && (
                <>
                    <Card title='题目' style={{ marginTop: '20px' }}>
                        <p>{currentWord.definition}</p>
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
                        <Card title="答案" style={{ marginTop: '20px' }} extra={<Correct answer={answer} word={currentWord} />}>
                            <WordDetail currentWord={currentWord} />
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default React.memo(WordLearningPage);