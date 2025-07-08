// src/components/common/FormModal.jsx
import { Modal, Form } from 'antd';
import { useEffect } from 'react';

const FormModal = ({
                       title,
                       open,
                       onCancel,
                       onSubmit,
                       initialData = null,
                       children,
                       width = 600,
                       ...modalProps
                   }) => {
    const [form] = Form.useForm();

    // Pre-fill form when editing
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    // Handle form submission
    const handleSubmit = (formData) => {
        onSubmit(formData);
        form.resetFields();
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null} // Custom footer handled by form
            width={width}
            destroyOnClose={true} // Reset form when modal closes
            {...modalProps}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
            >
                {children}
            </Form>
        </Modal>
    );
};

export default FormModal;