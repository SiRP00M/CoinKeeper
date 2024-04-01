import { useState } from 'react';
import { Button, Drawer, Form, Select, Input, InputNumber } from 'antd';

export default function AddItem(props) {
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>
        เพิ่มรายการใหม่
      </Button>
      <Drawer
        title="เพิ่มรายการใหม่"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(data) => {
            props.onItemAdded(data);
            form.resetFields();
            setDrawerVisible(false);
          }}
        >
          <Form.Item
            name="Type"
            label="ชนิด"
            rules={[{ required: true, message: 'Please select type' }]}
          >
            <Select
              allowClear
              style={{ width: '100%' }}
              options={[
                {
                  value: 'Income',
                  label: 'รายรับ',
                },
                {
                  value: 'Expense',
                  label: 'รายจ่าย',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="Amount"
            label="จำนวนเงิน"
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <InputNumber
              prefix="฿"
              style={{
                width: '100%',
              }}
              placeholder='จำนวนเงิน'
            />
          </Form.Item>
          <Form.Item
            name="Note"
            label="หมายเหตุ"
            rules={[{ required: true, message: 'Please enter note' }]}
          >
            <Input style={{ width: '100%' }} placeholder="เตือนความจำ" />
          </Form.Item>
          <Form.Item>

            <Button onClick={() => setDrawerVisible(false)}  style={{ marginRight: 8 }}>ยกเลิก</Button>
            <Button type="primary" htmlType="submit">
              ยืนยัน
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
