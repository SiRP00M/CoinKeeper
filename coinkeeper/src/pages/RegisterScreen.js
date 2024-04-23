import { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import conf from '../config/conf';

export default function RegisterScreen() {
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setSubmitEnabled(false);
    try {
      const registerResult = await axios.post(
        `${conf.apiUrl}/auth/local/register`,
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );

      // Redirect to login screen after successful registration
      navigate("/Login");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during registration");
      setShowErrorModal(true);
    } finally {
      setSubmitEnabled(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div style={{}}>
      <Row justify="center" align="middle">
        <Col>
          <Card
            title="สมัครสมาชิก"
            bordered={true}
            style={{ fontFamily: 'Kanit', width: "100%", textAlign: "center" }}
          >
            <Form form={form} onFinish={handleSubmit} >
              <Form.Item
                label="ชื่อผู้ใช้"
                name="username"
                rules={[
                  { required: true, message: "กรุณากรอกชื่อผู้ใช้!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="อีเมล"
                name="email"
                rules={[
                  { required: true, message: "กรุณากรอกอีเมล!" },
                  { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  { required: true, message: "กรุณากรอกรหัสผ่าน!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!submitEnabled}
                  style={{ fontFamily: 'Kanit' }}
                >
                  สมัคร
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Modal
          title={<span >Warning</span>}
          visible={showErrorModal}
          onCancel={handleCloseErrorModal}
          footer={null}
        >
          <p>{errorMessage}</p>
          <Button type="primary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal>
      </Row>
    </div>
  );
};
