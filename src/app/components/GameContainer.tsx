'use client'
// components/GameContainer.tsx
import React, { useState } from 'react';
import WordChainGame from './WordChainGame';
import SpellingChallenge from './SpellingChallenge';
import MultipleChoice from './MultipleChoice';
import { Tabs } from 'antd';
import { useWords } from '@/app/hooks/useWords';

const GameContainer = () => {
    const [activeKey, setActiveKey] = useState('1');
    const { words } = useWords()

    return (
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
            <Tabs.TabPane tab="背单词" key="1">
                <WordChainGame words={words} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="翻译" key="2">
                <SpellingChallenge words={words} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="选择题" key="3">
                <MultipleChoice words={words} />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default React.memo(GameContainer);