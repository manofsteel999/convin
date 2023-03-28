import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, Typography, Modal, Form, Input } from 'antd';
import { EditOutlined, FolderOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { fetchBuckets, editBucket, addBucket } from '../redux/actions/bucketActions';

const { Title } = Typography;

function BucketList() {
  const dispatch = useDispatch();
  const buckets = useSelector((state) => state.bucket.buckets);
  const [visible, setVisible] = useState(false);
  const [currentBucket, setCurrentBucket] = useState({});
  const [addingBucket, setAddingBucket] = useState(false);
  const [editingBucket, setEditingBucket] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBuckets());
  }, [dispatch]);

  const handleUpdateBucket = (values) => {
    setVisible(false);
    if (addingBucket) {
      dispatch(addBucket(values.name));
    } else if (editingBucket) {
      dispatch(editBucket({ ...currentBucket, name: values.name }));
    }
  };

  const handleEditBucket = (bucket) => {
    setAddingBucket(false);
    setEditingBucket(true);
    setVisible(true);
    setCurrentBucket(bucket);
  };

  const handleAddBucket = () => {
    setVisible(true);
    setEditingBucket(false);
    setAddingBucket(true);
  };

  const handleCancel = () => {
    setCurrentBucket({});
    setEditingBucket(false);
    setAddingBucket(false);
    setVisible(false);
  };

  const text = () => {
    if (editingBucket === true) return 'Edit Bucket';
    if (addingBucket === true) return 'Add Bucket';
  };
  return (
    <div>
      <Title level={2}>Bucket List</Title>
      <Button type="primary" icon={<FolderOutlined />} onClick={() => handleAddBucket()}>
        Add Bucket
      </Button>
      <span style={{marginLeft: '1rem', fontWeight:'bold' }} >
      <Link  to={'/history'}>Video History</Link>
      </span>
      <List
        itemLayout="horizontal"
        dataSource={buckets}
        renderItem={(bucket) => (
          <List.Item
            actions={[
              <Button type="ghost" icon={<EditOutlined />} onClick={() => handleEditBucket(bucket)} />,
            ]}
          >
            <List.Item.Meta title={<Link to={`/bucket/${bucket.id}`}>{bucket.name}</Link>} />
          </List.Item>
        )}
      />
      <Modal title={text()} open={visible} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form} initialValues={currentBucket} onFinish={handleUpdateBucket}>
          <Form.Item
            label="Bucket Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for the Bucket',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {text()}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BucketList;

