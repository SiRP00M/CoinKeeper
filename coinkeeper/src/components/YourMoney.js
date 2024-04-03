import { Card, Col, Row, Statistic } from 'antd';

export default function YourMoney({totalIncome, totalExpense }) {
    
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total Income"
                            value={totalIncome}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total Expense"
                            value={totalExpense}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
