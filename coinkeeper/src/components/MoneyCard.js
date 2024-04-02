import '../App.css'

export default function MoneyCard({ currentAmount, username }) {
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