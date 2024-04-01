import moment from 'moment';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Dropdown, Menu, Divider, Spin, Button, Space } from 'antd';
import conf from '../config/conf';
import AddItem from '../components/AddList';
import MoneyCard from '../components/MoneyCard';
import FinanceList from '../components/FinanceList';

export default function TrackerScreen() {
    const [isLoading, setIsLoading] = useState(false)
    const [transactionData, setTransactionData] = useState([])
    const [filter, setFilter] = useState(null);

    const fetchItems = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${conf.apiUrl}/finances`

            )
            setTransactionData(response.data.data.map(d => ({
                id: d.id,
                key: d.id,
                ...d.attributes
            })))
        } catch (err) {
            console.log(err)
        } finally { setIsLoading(false) }
    }

    const addItem = async (item) => {
        try {
            setIsLoading(true)
            const params = { ...item, date_time: moment() }
            const response = await axios.post(`${conf.apiUrl}/finances`, { data: params })
            const { id, attributes } = response.data.data
            setTransactionData([
                ...transactionData,
                { id: id, key: id, ...attributes }
            ])
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleMenuClick = (e) => {
        setFilter(e.key === 'all' ? null : e.key);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="all">ทั้งหมด</Menu.Item>
            <Menu.Item key="Income">รายรับ</Menu.Item>
            <Menu.Item key="Expense">รายจ่าย</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <Spin spinning={isLoading}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex', }}>
                        <MoneyCard></MoneyCard>
                        <Divider>บันทึกรายรับ-รายจ่าย</Divider>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button>
                                เลือกประเภท: {filter ? (filter === 'Income' ? 'รายรับ' : 'รายจ่าย') : 'ทั้งหมด'}
                            </Button>
                        </Dropdown>

                        <AddItem onItemAdded={addItem} />
                        <FinanceList
                            data={transactionData}
                            filter={filter}
                        />
                    </Space>
                </Spin>
            </header>
        </div>
    );

}