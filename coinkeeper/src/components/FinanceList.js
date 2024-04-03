import { Table, Tag } from 'antd';
import moment from 'moment';
import 'moment/locale/th';


export default function FinanceList({ data, filter }) {
    const filteredData = filter ? data.filter(item => item.Type === filter) : data;

    moment.locale('th');

    const sortedData = filteredData.sort((a, b) => {
        return moment(b.date_time).diff(moment(a.date_time));
    });

    const columns = [
        {
            key: 'date',
            title: 'Date',
            dataIndex: 'date_time',
            render: date => moment(date).format(' DD MMM YYYY - HH:mm'),
        },
        {
            key: 'id',
            title: 'Amount',
            dataIndex: 'Amount',
            render: (amount, record) => {
                const isIncome = record.Type === 'Income';
                const formattedAmount = isIncome ? `+${amount}` : `-${amount}`;
                const color = isIncome ? 'green' : 'red';
                return <Tag color={color}>{formattedAmount}</Tag>;
            }
        },
        {
            key: 'id',
            title: 'type',
            dataIndex: 'Type'
        },
        {
            key: 'id',
            title: 'Note',
            dataIndex: 'Note',
        },
    ];

    return (
        <>
            <div className='List-fine'>
                <Table columns={columns} dataSource={sortedData} pagination={false} />
            </div>
        </>
    )
}
