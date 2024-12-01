// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Radio } from 'antd';
import { WordFormData } from '@/app/interface';
import Correct from '@/app/components/Correct';
import WordDetail from '@/app/components/WordDetail';

type WordGameProps = WordFormData & {
    options?: { collocation: string; definition: string; }[]
}

const WordGame: React.FC<{ words: WordGameProps[] }> = ({ words }) => {
    const [currentWord, setCurrentWord] = useState<WordGameProps | null>(null);
    // const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [answer, setAnswer] = useState<boolean | null>(null);
    const [radioValue, setRadioValue] = useState<number | null>(null);

    useEffect(() => {
        handleNextQuestion()
    }, [words])

    const handleNextQuestion = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const currentWordData = words[randomIndex];

        // 获取除当前单词外的其他单词的定义
        const otherDefinitions = words
            .filter((wordData) => wordData.word !== currentWordData.word)
            .map((wordData) => wordData.definition);

        // 随机选择三个其他单词的定义
        const randomOtherDefinitions = [
            ...Array.from({ length: 3 }, () => otherDefinitions[Math.floor(Math.random() * otherDefinitions.length)]),
        ];

        // 将当前单词的定义添加到选项中
        randomOtherDefinitions.push(currentWordData.definition);

        // 随机排序所有选项
        const shuffledOptions = randomOtherDefinitions.sort(() => Math.random() - 0.5).map((definition, index) => ({
            collocation: `Option ${index + 1}`,
            definition,
        }));

        setCurrentWord({
            ...currentWordData,
            options: shuffledOptions,
        });

        setShowResult(false);
        setRadioValue(-1)
    };

    const handleAnswer = () => {
        if (!currentWord || radioValue === null) return;

        const isCorrect = radioValue !== null && currentWord.options?.[radioValue].definition === currentWord.definition;


        setShowResult(true);
        setAnswer(isCorrect)
    };

    return (
        <div>
            <Button type="primary" onClick={handleNextQuestion}>
                下一题
            </Button>
            {currentWord && (
                <Card title="题目" style={{ margin: '20px 0' }}>
                    <p>{currentWord.word}</p>
                    <Radio.Group
                        value={radioValue}
                        onChange={(e) => setRadioValue(e.target.value)}
                    >
                        {currentWord.options?.map((collocation, index) => (
                            <Radio key={index} value={index} style={{ marginBottom: '10px' }}>
                                {collocation.collocation} - {collocation.definition}
                            </Radio>
                        ))}
                    </Radio.Group>

                    <Button type="dashed" onClick={handleAnswer} disabled={!currentWord || radioValue === null}>
                        确定
                    </Button>
                </Card>
            )}

            {showResult && (
                <Card title="答案" extra={<Correct answer={answer} word={currentWord} />} style={{ marginBottom: '10px' }}>
                    <WordDetail currentWord={currentWord} />
                </Card>
            )}
        </div>
    );
};

export default React.memo(WordGame);