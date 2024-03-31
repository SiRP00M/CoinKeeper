import { Space, Table, Tag, Button } from 'antd';
import moment from 'moment';


export default function FinanceList({ data, filter }) {
    const filteredData = filter ? data.filter(item => item.Type === filter) : data;

    const columns = [
        {
            key: 'id',
            title: 'Date',
            dataIndex: 'date_time',
            render: date => moment(date).format('DD.MM.YYYY')
        },
        {
            key: 'id',
            title: 'Time',
            dataIndex: 'date_time',
            render: time => moment(time).format('HH:mm')
        },
        {
            key: 'id',
            title: 'Type',
            dataIndex: 'Type',
            render: Type => Type === 'Income' ? <Tag color='green'>รายรับ</Tag> : <Tag color='red'>รายจ่าย</Tag>
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
        <Table columns={columns} dataSource={filteredData} />
    )
}


