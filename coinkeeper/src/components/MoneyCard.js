import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
import axios from 'axios'
import conf from '../config/conf';
import useSessionState from '../config/jwtstorage';

export default function MoneyCard() {
    const [currentAmount, setCurrentAmount] = useState(0)
    const [transactionData, setTransactionData] = useState([])
    const [jwt] = useSessionState(null, 'jwt');
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${conf.apiUrl}/finances`);
            setTransactionData(response.data.data.map(d => ({
                id: d.id,
                key: d.id,
                ...d.attributes
            })));
        } catch (err) {
            console.log(err);
        }
    }

    const ShowUserName = async () => {
        try {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${jwt}`,
            };
            const userResult = await axios.get(
                `${conf.apiUrl}/users/me?populate=role`
            );

            setUsername(userResult.data.username);
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        if (jwt == null) {
            navigate("/Login");
        } else ShowUserName();
        fetchItems();
    },);

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

    return (
        <div className="credit-card-container">
            <div className="credit-card">
                <div className="credit-card-balance">
                    $<span>{currentAmount}</span>


                </div>
                <div className="credit-card-text">Balance</div>
                <span>
                    {username}
                </span>
            </div>
        </div>
    );
}
