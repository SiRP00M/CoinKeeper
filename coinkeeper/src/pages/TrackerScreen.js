import FinanceList from '../components/FinanceList';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Spin, Divider, Typography } from 'antd';
import axios from 'axios'


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/finances'

export default function TrackerScreen() {
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(d => ({
        id: d.id,
        key: d.id,
        ...d.attributes
      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }


  useEffect(() => {
    setCurrentAmount(transactionData.reduce(
      (sum, d) => sum = d.type === "income" ? sum + d.Amount : sum - d.Amount
      , 0))
  }
    , [transactionData])

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
          <FinanceList
            data={transactionData}
            />
        </Spin>
      </header>
    </div>
  );

}

