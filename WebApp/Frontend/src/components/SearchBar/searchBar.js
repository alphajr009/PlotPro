import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);
const App = () => (
  <Space direction="vertical">
    
    <Search
      placeholder="search location here..."
      enterButton="Search"
      suffix={suffix}
      size='large'
      onSearch={onSearch}
      style={{
        width: 370,
        borderRadius: 50,
      }}
    />
  </Space>
);
export default App;