import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { addCard } from '../redux/actions/cardActions';

const CardForm = ({ bucketId }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    dispatch(addCard(bucketId, values.name, values.url));
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>Add Card</Button>
      <Modal
        title="Add Card"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form}  onFinish={ handleFormSubmit }>
          <Form.Item
            label="Card Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the card',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Card URL"
            name="url"
            rules={[
              {
                required: true,
                message: 'Please enter a valid URL for the card',
                type: 'url',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Card</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardForm;