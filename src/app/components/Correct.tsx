import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { WordFormData } from '@/app/interface';

const { Text } = Typography;
const Index = ({ answer, word }: { answer: boolean | null, word?: WordFormData | null }) => {
    useEffect(() => {
        if (answer !== null && !answer && word) {
            try {
                const json = localStorage.getItem('my-word-learning-app') || '[]'
                const jsonArr = JSON.parse(json)

                localStorage.setItem('my-word-learning-app', JSON.stringify([...jsonArr, { ...word, name: 'error.json' }]))

            } catch (error) {
                console.log(error);
            }

        }
    }, [answer])

    if (answer === null) {
        return null
    }

    return answer ?
        <Text type="success">正确</Text> :
        <Text type="danger">错误</Text>
}

export default React.memo(Index)