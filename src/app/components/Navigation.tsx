'use client'

import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { LeftOutlined } from '@ant-design/icons';


const { Header } = Layout;
const { Title } = Typography;

interface MobileNavbarProps {
    onBack?: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = () => {
    const [title, setTitle] = useState<string>('')
    const router = useRouter();

    useEffect(() => {
        const pathname = window.location.pathname
        let text = ''
        if (pathname === '/') {
            text = '首页'
        }
        if (pathname === '/progressTracker') {
            text = '进度'
        }
        if (pathname === '/pronunciationPractice') {
            text = '练习'
        }
        if (pathname === '/games') {
            text = '游戏'
        }
        if (pathname === '/addWords') {
            text = '添加单词'
        }

        setTitle(text)
    }, [])

    const handleBack = () => {
        router.back();
    };

    return (
        <Header style={{ padding: '0 16px', backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {title !== '首页' && <LeftOutlined onClick={handleBack} />}
                <Title level={4} style={{ margin: 0, flexGrow: 1, textAlign: 'center' }}>
                    {title}
                </Title>
                {/* 如果有其他操作按钮，可以放在这里 */}
            </div>
        </Header>
    );
};

export default MobileNavbar;