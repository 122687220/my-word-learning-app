'use client'
// export default InputForm;
import React from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { WordFormData } from '@/app/interface';
import { request } from '@/app/utils/request';

const WordForm: React.FC = () => {
    const [form] = Form.useForm<FormInstance<WordFormData>>();

    const onFinish = async (values: WordFormData) => {

        try {
            // 将数据发送到服务器端API（这里只是模拟）
            await request({ path: '/submitWord', values });
            message.success('单词保存成功！');
            form.resetFields();
            // 根据需要重定向或执行其他操作
            // router.push('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            message.error(`保存单词失败: ${error.message}`);
        }
    };

    return (
        <Form
            form={form}
            name="word_form"
            onFinish={onFinish}
            initialValues={{
                word: '',
                pronunciation: '',
                part_of_speech: '',
                definition: '',
                example_sentence: '',
                root: '',
                key_collocations: [{ collocation: '', definition: '' }],
            }}
        >
            <Form.Item name="word" label="单词" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="pronunciation" label="发音" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="part_of_speech" label="词性" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="definition" label="定义" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="example_sentence" label="例句">
                <Input />
            </Form.Item>
            <Form.Item name="root" label="词根">
                <Input />
            </Form.Item>
            <Form.List name="key_collocations">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'collocation']}
                                    key='collocation'
                                    rules={[{ required: true, message: '请输入搭配' }]}
                                >
                                    <Input placeholder="搭配" style={{ width: '60%' }} />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'definition']}
                                    key='definition'
                                    rules={[{ required: true, message: '请输入定义' }]}
                                >
                                    <Input placeholder="定义" style={{ width: '38%' }} />
                                </Form.Item>
                                <Button onClick={() => remove(field.name)}>删除</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                添加搭配
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default WordForm;