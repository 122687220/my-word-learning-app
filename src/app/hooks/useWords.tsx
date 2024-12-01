'use client'
import { useEffect, useState } from 'react';
import { WordFormData } from '@/app/interface';
import { request } from '@/app/utils/request';

export const useWords = ({ name = '' } = {}) => {
    const [words, setWords] = useState<WordFormData[]>([])

    useEffect(() => {
        getWords()
    }, [])

    const getWords = async () => {
        try {
            // 将数据发送到服务器端API（这里只是模拟）
            const resJson = await request({ path: '/getWords', values: { name } });

            setWords(resJson.words)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);

            setWords([])
        }
    }
    return { words }
}