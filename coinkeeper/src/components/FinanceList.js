import { Space, Table, Tag, Button } from 'antd';
import moment from 'moment';


export default function FinanceList(props) {
  const columns = [
    {
      key:'id',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 'id',
      title: 'Date-Time',
      dataIndex: 'date_time',
    },
    {
      key: 'id',
      title: 'Type',
      dataIndex: 'Type',
      render: type => type === 'income' ? <Tag color='green'>รายรับ</Tag> : <Tag color='red'>รายจ่าย</Tag>
    },
    {
      key: 'id',
      title: 'Amount',
      dataIndex: 'Amount',
    },
    {
      key: 'id',
      title: 'Note',
      dataIndex: 'Note',
    },
    
  ];

  return (
    <Table columns={columns} dataSource={props.data} />
  )
}
