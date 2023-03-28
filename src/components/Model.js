import React, { useState } from 'react';
import { Modal, List, Button,  } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { useDispatch} from 'react-redux';
import { addCardToHistory} from '../redux/actions/cardActions';

function Model({ card, handleEditCard, handleDeleteCard }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
  setVisible(false);
  };

  const onPlayVideo = () => {
    setVisible(true)
    dispatch(addCardToHistory(card, new Date().toLocaleTimeString())); 
  }

  return (
    <div>
    <List.Item 
          actions={[
            <Button type="ghost" icon={<EditOutlined />} onClick={() => handleEditCard(card)} />,
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteCard(card)} />,
          ]}
          >
            <List.Item.Meta
              style={{
                padding: "10px",
                display: "flex",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}
              onClick={() => onPlayVideo()}
              title={card.name}
              description={card.url}
            />
          </List.Item>
      <Modal
        title={card.name}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <iframe
          title={card.name}
          width="472"
          height="323.4"
          src={card.url}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
}

export default Model;
