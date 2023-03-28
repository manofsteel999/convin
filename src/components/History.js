import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {List, Typography, Card } from 'antd';
import { fetchHistory } from '../redux/actions/cardActions';
const { Title } = Typography;

function History() {
    const dispatch = useDispatch();
    const histories = useSelector((state) => state.card.history);
    
    useEffect(() => {
        dispatch(fetchHistory());
      }, [dispatch]);
    
  return (
    <div>
        <Title level={2}>Video Played History</Title>
        <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
        itemLayout="horizontal"
        dataSource={histories}
        renderItem={(history) => (
          <List.Item>
           <Card title={history.name}>
            <p>Time : {history.time}</p>
            <p>URL : {history.url}</p>
           </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default History