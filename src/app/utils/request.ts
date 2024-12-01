// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async ({path = '', values={} }) => {
    if (!path) {
        throw new Error('path 不存在')
    }
    try {
        // 将数据发送到服务器端API（这里只是模拟）
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        
        return response.json();
       
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(`保存单词失败: ${error.message}`)
    }
}