import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Typography, Modal, Form, Input } from 'antd';
import { fetchCards, deleteCard, editCard } from '../redux/actions/cardActions';
import Model from './Model';
import CardForm from './CardForm';
const { Title } = Typography;

function Bucket() {
  const {id} = useParams(); 
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);
  const [visible, setVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [form] = Form.useForm();
  

  useEffect(() => {
    dispatch(fetchCards(id));
  }, [dispatch, id]);

  const handleEditCard = (card) => {
    setCurrentCard(card);
    setVisible(true);
}
  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = (values) => {
    setVisible(false);
    dispatch(editCard({...currentCard, name: values.name, url: values.url}));
  };

  const handleDeleteCard = (card) => {
    dispatch(deleteCard(card.id))
  }

  return (
    <div>
      <Title style={{marginBottom: '1.5rem'}} level={2}>Bucket {id}</Title>
      <CardForm bucketId={id} />
      <List
         itemLayout="horizontal"
         style= {{marginTop: '1rem'}}
        dataSource={cards}
        renderItem={(card) => (
          <Model card={card} handleEditCard={handleEditCard} handleDeleteCard= {handleDeleteCard} />
        )}
      />
      <Modal
        title="Edit Card"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} initialValues={currentCard} onFinish={ handleUpdate }>
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
    </div>
  );
}

export default Bucket;
