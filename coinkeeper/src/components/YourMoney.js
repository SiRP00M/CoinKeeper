import { Statistic } from 'antd';
import './MoneyCard.css'

export default function YourMoney({ totalIncome, totalExpense }) {

    return (
        <>
            <div className='YourMoney'>
                <div className='Total-Box'>
                    <pre className='Box-Detail' >Total Income</pre >
                    <p className='Income'>{totalIncome.toFixed(2)}</p>
                </div>

                <div className='Total-Box'>
                    <pre className='Box-Detail'>Total Expense</pre >
                    <p className='Expense'>{totalExpense.toFixed(2)}</p>
                </div>
            </div>

        </>
    );
}