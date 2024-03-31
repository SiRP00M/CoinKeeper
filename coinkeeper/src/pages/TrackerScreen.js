import FinanceList from '../components/FinanceList';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Dropdown, Menu, Divider, Spin,Button,Typography } from 'antd';
import axios from 'axios'
import conf from '../config/conf';

export default function TrackerScreen() {
    const [currentAmount, setCurrentAmount] = useState(0)
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
        setCurrentAmount(transactionData.reduce((sum, d) => {
            if (d.Type === "Income") {
                return sum + parseFloat(d.Amount);
            } else if (d.Type === "Expense") {
                return sum - parseFloat(d.Amount);
            }
            return sum;
        }, 0));
    }, [transactionData]);

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <Spin spinning={isLoading}>
                    <Typography.Title>
                        จำนวนเงินปัจจุบัน {currentAmount} บาท
                    </Typography.Title>
                    <Divider>บันทึกรายรับ-รายจ่าย</Divider>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button>
                            เลือกประเภท: {filter ? (filter === 'Income' ? 'รายรับ' : 'รายจ่าย') : 'ทั้งหมด'}
                        </Button>
                    </Dropdown>
                    <FinanceList
                        data={transactionData}
                        filter={filter}
                    />
                </Spin>
            </header>
        </div>
    );

}