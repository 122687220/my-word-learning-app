import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { WordFormData } from '@/app/interface';
import { request } from '@/app/utils/request';

const { Text } = Typography;
const Index = ({ answer, word }: { answer: boolean | null, word?: WordFormData | null }) => {
    useEffect(() => {
        if (answer !== null && !answer && word) {
            request({ path: '/submitWord', values: { ...word, name: 'error.json' } })
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