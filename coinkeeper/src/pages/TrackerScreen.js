import moment from 'moment';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Dropdown, Menu, Divider, Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import conf from '../config/conf';
import AddItem from '../components/AddList';
import MoneyCard from '../components/MoneyCard';
import FinanceList from '../components/FinanceList';
import useSessionState from "../config/jwtstorage";

export default function TrackerScreen() {
    const [transactionData, setTransactionData] = useState([])
    const [currentAmount, setCurrentAmount] = useState(0);
    const [filter, setFilter] = useState(null);
    const [jwt, setJwt] = useSessionState(null, "jwt");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${conf.apiUrl}/finances`);
            const data = response.data.data.map(d => ({
                id: d.id,
                key: d.id,
                ...d.attributes
            }));
            setTransactionData(data);

            const amount = data.reduce((sum, d) => {
                if (d.Type === "Income") {
                    return sum + parseFloat(d.Amount);
                } else if (d.Type === "Expense") {
                    return sum - parseFloat(d.Amount);
                }
                return sum;
            }, 0);
            setCurrentAmount(amount);

        } catch (err) {
            console.log(err);
        }
    };
    const addItem = async (item) => {
        try {
            const params = { ...item, date_time: moment() };
            const response = await axios.post(`${conf.apiUrl}/finances`, { data: params });
            const { id, attributes } = response.data.data;
            setTransactionData([
                ...transactionData,
                { id: id, key: id, ...attributes }
            ]);
        } catch (err) {
            console.log(err);
        }
    };

    const roleChecker = async () => {
        try {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${jwt}`,
            };
            const userResult = await axios.get(
                `${conf.apiUrl}/users/me?populate=role`
            );

            setUsername(userResult.data.username);

            if (userResult.data.role && userResult.data.role.name === "Member") {
            } else {
                navigate("/Login");
            }
        } catch (error) {
            console.error(error);
        }
    };

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

    const handleLogout = () => {
        setJwt(null);

        if (jwt == null) {
            navigate("/login");
        } else {
            navigate("/TrackerScreen");
        }
    };


    useEffect(() => {
        if (jwt == null) {
            navigate("/login");
        } else {
            roleChecker();
            fetchItems();
        }
    }, [jwt]);


    return (
        <div className="App">
            <header className="App-header">
                <Space direction="vertical" size="middle" style={{ display: 'flex', }}>
                    <MoneyCard currentAmount={currentAmount} username={username} />
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
                    <Button onClick={() => handleLogout()}>Log Out</Button>
                </Space>
            </header>
        </div>
    );
}
