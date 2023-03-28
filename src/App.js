import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import BucketList from './components/BucketList';
import CardForm from './components/CardForm';
import History from './components/History';
import Bucket from './components/Bucket';

const { Header, Content } = Layout;
const {Title} = Typography; 

function App() {

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Title align="left" level={3} style={{color: 'grey'}}>Convin FrontEnd Assignment</Title>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/" element={<BucketList/>} />
            <Route path="/bucket/:id" element={<Bucket/>} />
            <Route path="/add-card" element={<CardForm/>} />
            <Route path="/history" element={<History/>} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

