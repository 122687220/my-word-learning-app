'use client'
// pages/learn.tsx
import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WordFormData } from '@/app/interface';

type LearnPageProps = WordFormData & {
    errors: number;
}

const LearnPage: React.FC<{ words: WordFormData[] }> = ({ words }) => {

    const mistakeList = useMemo(() => {
        // 使用 reduce 方法重组数组
        const result = words.reduce((accumulator: LearnPageProps[], current) => {
            // 查找具有相同 word 的现有条目
            const existingEntry: LearnPageProps | undefined = accumulator?.find(
                (entry: WordFormData) => entry.word === current.word && entry.definition === current.definition
            );

            if (existingEntry) {
                // 更新 errors 数量
                existingEntry.errors += 1;
            } else {
                // 添加新条目
                accumulator.push({
                    ...current,
                    errors: 1,
                });
            }

            return accumulator;
        }, []);
        return result
    }, [words])

    const columns: ColumnsType<{ word: string; definition: string; errors: number }> = [
        { title: 'Word', dataIndex: 'word', key: 'word' },
        { title: 'Definition', dataIndex: 'definition', key: 'definition' },
        { title: 'Errors', dataIndex: 'errors', key: 'errors' },
    ];

    return (
        <div>
            <h2>Mistake Notebook</h2>
            <Table columns={columns} dataSource={mistakeList} rowKey="word" />
        </div>
    );
};

export default React.memo(LearnPage);