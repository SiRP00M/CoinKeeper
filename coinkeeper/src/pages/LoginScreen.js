import { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSessionState from "../config/jwtstorage";
import conf from '../config/conf';


export default function LoginScreen(props) {
  const [jwt, setjwt] = useSessionState(null, "jwt");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    setSubmitEnabled(false);
    try {
      const loginResult = await axios.post(
        `${conf.apiUrl}/auth/local`,
        {
          identifier: values.identifier, 
          password: values.password,
        }
      );

      const jwtToken = loginResult.data.jwt;
      setjwt(jwtToken);
      axios.defaults.headers.common = {
        Authorization: `Bearer ${loginResult.data.jwt}`,
      };
      const userResult = await axios.get(
        `${conf.apiUrl}/users/me?populate=role`
      );

      if (userResult.data.role && userResult.data.role.name === "Authenticated") {
        navigate("/TrackerScreen");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Wrong username or password");
      setShowErrorModal(true);
    } finally {
      setSubmitEnabled(true);
    }
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };


  useEffect(() => {
    if (jwt == null) { navigate("/login") };
  },);



  return (
    <div style={{}}>

      <Row justify="center" align="middle">
        <Col >
          <Card
            title="เข้าสู่ระบบ"
            bordered={true}
            style={{ fontFamily: 'Kanit', width: "100%", textAlign: "center" }}
          >
            <Form form={form} onFinish={handleSubmit} >
              <Form.Item
                label="อีเมลหรือชื่อผู้ใช้"
                name="identifier"
                rules={[
                  { required: true, message: "กรุณากรอกอีเมลหรือชื่อผู้ใช้!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
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
                  เข้าสู่ระบบ
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