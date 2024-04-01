import { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import conf from '../config/conf';


export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const Navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axios.post(`${conf.Url}/api/auth/local`, { ...formData });
      const token = response.data.jwt;
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };
      setIsLoading(false);
      Navigate('/TrackerScreen');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrMsg(err.message);
    }
  };
  
  return (
    <Form onFinish={handleLogin} autoComplete="off">
      {errMsg && (
        <Form.Item>
          <Alert message={errMsg} type="error" />
        </Form.Item>
      )}

      <Form.Item
        label="Username"
        name="identifier"
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
