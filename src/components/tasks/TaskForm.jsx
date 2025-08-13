// src/components/tasks/TaskForm.jsx
import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const TaskForm = ({ onCancel, isEditMode = false }) => {
    return (
        <>
            <Form.Item
                name="title"
                label="Task Title"
                rules={[
                    { required: true, message: 'Please enter task title!' },
                    { min: 3, message: 'Title must be at least 3 characters!' },
                    { max: 300, message: 'Title must be less than 300 characters!' }
                ]}
            >
                <Input
                    placeholder="Enter task title"
                    maxLength={300}
                    showCount
                />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    { max: 1000, message: 'Description must be less than 1000 characters!' }
                ]}
            >
                <Input.TextArea
                    rows={3}
                    placeholder="Enter task description (optional)"
                    maxLength={1000}
                    showCount
                />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status!' }]}
                initialValue="pending"
            >
                <Select placeholder="Select status">
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="in-progress">In Progress</Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: 'Please select priority!' }]}
                initialValue="medium"
            >
                <Select placeholder="Select priority">
                    <Select.Option value="low">Low</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="high">High</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please select due date!' }]}
                getValueProps={(value) => ({
                    value: value ? dayjs(value) : undefined,
                })}
                normalize={(value) => value ? value.format('YYYY-MM-DD') : undefined}
            >
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select due date"
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
            </Form.Item>

            {/* Form Actions */}
            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SaveOutlined />}
                    >
                        {isEditMode ? 'Update Task' : 'Create Task'}
                    </Button>
                </Space>
            </Form.Item>
        </>
    );
};

export default TaskForm;