import moment from 'moment';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Dropdown, Menu, Divider, Button, Layout } from 'antd';
import { useNavigate } from "react-router-dom";
import conf from '../config/conf';
import AddItem from '../components/AddList';
import MoneyCard from '../components/MoneyCard';
import FinanceList from '../components/FinanceList';
import useSessionState from "../config/jwtstorage";
import YourMoney from '../components/YourMoney';
import AppHeader from '../components/AppHeader';
import '../App.css'
const { Content, Footer } = Layout;

export default function TrackerScreen() {
    const [transactionData, setTransactionData] = useState([])
    const [currentAmount, setCurrentAmount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [filter, setFilter] = useState(null);
    const [jwt, setJwt] = useSessionState(null, "jwt");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const responseUser = await axios.get(`${conf.apiUrl}/users/me`);
            const userId = responseUser.data.id;

            const response = await axios.get(`${conf.apiUrl}/finances?populate=creator&filters[creator][id]=${userId}`);
            const data = response.data.data.map(d => ({
                id: d.id,
                key: d.id,
                ...d.attributes

            }));
            setTransactionData(data);

            const sumTransactionsByType = (transactions, type) => {
                return transactions.reduce((sum, transaction) => {
                    if (transaction.Type === type) {
                        return sum + parseFloat(transaction.Amount);
                    } else {
                        return sum;
                    }
                }, 0);
            };
            const totalIncome = sumTransactionsByType(data, "Income");
            const totalExpense = sumTransactionsByType(data, "Expense");
            setTotalIncome(totalIncome);
            setTotalExpense(totalExpense);

            const amount = data.reduce((sum, d) => {
                if (d.Type === "Income") {
                    return sum + parseFloat(d.Amount);
                } else if (d.Type === "Expense") {
                    return sum - parseFloat(d.Amount);
                }
                return sum;
            }, 0);
            setCurrentAmount(amount);
            console.log(response)

        } catch (err) {
            console.log(err);
        }
    };

    const addItem = async (item) => {
        try {
            const responseUser = await axios.get(`${conf.apiUrl}/users/me`);
            const userId = responseUser.data.id;

            const params = { ...item, date_time: moment(), creator: userId };
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
            setFullname(userResult.data.fullname);

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
        <Layout className="layout">
            <AppHeader handleLogout={handleLogout} /> 
            <Content style={{ padding: '0 50px' }}>

                <div className='App'>
                    <div className='Tracker'>
                        <MoneyCard currentAmount={currentAmount} username={fullname} />
                    </div>
                    <div className='Stat'>
                        <YourMoney
                            totalIncome={totalIncome}
                            totalExpense={totalExpense}
                        />
                    </div>

                    <div className="Detail">
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
                    </div>
                </div>
            </Content>
            <Footer className='FooterApp'>
                <span className='logo'>
                    <img src='https://static.vecteezy.com/system/resources/previews/027/517/677/original/pixel-art-red-chinese-gold-coin-png.png' alt="logo" />
                </span>Coinkeeper</Footer>
        </Layout>
    );
}
