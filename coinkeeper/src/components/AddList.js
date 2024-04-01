import { Button, Form, Select, Input, InputNumber } from 'antd';

export default function AddItem(props) {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="inline" onFinish={(data) => {
      props.onItemAdded(data);
      form.resetFields();
    }}>
      <Form.Item
        name="Type"
        label="ชนิด"
        rules={[{ required: true }]}
      >
        <Select
          allowClear
          style={{ width: "100px" }}
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
        rules={[{ required: true }]}>
        <InputNumber placeholder="จำนวนเงิน" />
      </Form.Item>
      <Form.Item
        name="Note"
        label="หมายเหตุ"
        rules={[{ required: true }]}>
        <Input placeholder="Note" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  )

}

