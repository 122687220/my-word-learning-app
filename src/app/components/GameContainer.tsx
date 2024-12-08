'use client'
// components/GameContainer.tsx
import React, { useState } from 'react';
import WordChainGame from './WordChainGame';
import WordChainGameEr from './WordChainGameEr';
import SpellingChallenge from './SpellingChallenge';
import MultipleChoice from './MultipleChoice';
import { Tabs } from 'antd';
// import { useWords } from '@/app/hooks/useWords';
import { useMyContext } from '@/app/context';

const GameContainer = () => {
    const [activeKey, setActiveKey] = useState('1');
    const { words } = useMyContext()

    return (
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
            <Tabs.TabPane tab="背单词" key="1">
                <WordChainGame words={words} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="背单词-困难" key="2">
                <WordChainGameEr words={words} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="翻译" key="3">
                <SpellingChallenge words={words} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="选择题" key="4">
                <MultipleChoice words={words} />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default React.memo(GameContainer);