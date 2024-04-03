import './MoneyCard.css';

export default function MoneyCard({ currentAmount, username }) {
    return (
        <div className='card'>
        <div className="container">
            <div className="card-font">
                <header className='header'>
                    <span className='logo'>
                        <img src='https://static.vecteezy.com/system/resources/previews/027/517/677/original/pixel-art-red-chinese-gold-coin-png.png' alt="logo" />
                    </span>
                    <span className="coinkeeper-text">
                        <h5>Coin Keeper</h5>
                    </span>

                    <img src='https://cdn-icons-png.freepik.com/512/6404/6404100.png' className='chip' />
                </header>
                <div className="card-detail">
                    <h6>Your Balance</h6>
                    <div className='current-money'>
                        <h6>${currentAmount}</h6>
                    </div>
                    <h6>Card Holder</h6>
                    <h6>{username}</h6>
                </div>
            </div>
        </div>
        </div>
    );
}
