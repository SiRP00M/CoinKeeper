import { useState, useEffect } from 'react';
import '../App.css'
import axios from 'axios'
import conf from '../config/conf';

export default function MoneyCard() {
    const [currentAmount, setCurrentAmount] = useState(0)
    const [transactionData, setTransactionData] = useState([])

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

    useEffect(() => {
        fetchItems();
    }, []);

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
            </div>
        </div>
    );
}
