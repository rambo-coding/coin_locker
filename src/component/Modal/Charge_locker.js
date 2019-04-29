import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment, { min } from "moment";
import moment_tz from 'moment-timezone'
import { Row, Col, Input, Button, Label, FormGroup } from 'reactstrap';
moment.tz.add({
    "zones": {
        "Asia/Bangkok": [
            "6:42:4 - LMT 1880 6:42:4",
            "6:42:4 - BMT 1920_3 6:42:4",
            "7 - ICT"
        ],
    }
});
var currentTimeString = moment().tz('Asia/Bangkok').format(' HH:mm:ss');
var data_table = [{
    size: "S",
    first: "50 THB",
    next: "25 THB"
}, {
    size: "M",
    first: "100 THB",
    next: "50 THB"
}, {
    size: "L",
    first: "200 THB",
    next: "100 THB"
}];

export default class Charge_locker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "http://localhost:3013",
            number_locker: '',
            size: '',
            duration: "",
            coin: "",
            cal_coin: 0,
            check_duration: '',
            got_item: '',
        }
    }

    componentDidMount() {
        this.setState({ number_locker: this.props.number_locker })
        setTimeout(() => {
            this.separate_size()
        }, 50);
    }
    separate_size() {
        const number_locker = parseInt(this.state.number_locker)
        if ((number_locker == 1) || (number_locker == 4) || (number_locker == 7) || (number_locker == 10)) {
            this.setState({ size: ' S' })
        }
        else if ((number_locker == 2) || (number_locker == 5) || (number_locker == 8) || (number_locker == 11)) {
            this.setState({ size: ' M' })
        }
        else if ((number_locker == 3) || (number_locker == 6) || (number_locker == 9) || (number_locker == 12)) {
            this.setState({ size: ' L' })
        }
    }
    calculate_coin() {
        const duration = parseInt(this.state.duration)
        const coin = parseInt(this.state.coin)
        const locker = parseInt(this.state.number_locker)
        let { cal_coin } = this.state
        let mod_duration = 0
        let divide_duration = 0
        if ((locker == 1) || (locker == 4) || (locker == 7) || (locker == 10)) {
            if (duration <= 0) {
                cal_coin = 0
                this.setState({
                    cal_coin, check_duration: 'Please insert duration again !'
                })
            }
            else if (duration > 0) {
                divide_duration = (duration / 60 | 0)
                mod_duration = (duration % 60)
                if (divide_duration == 1) {
                    if (mod_duration <= 0) {
                        cal_coin = divide_duration * 50
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = (divide_duration * 50) + 25
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
                else {
                    if (mod_duration <= 0) {
                        cal_coin = 50
                        cal_coin += (divide_duration - 1) * 25
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = 50
                        cal_coin += (divide_duration * 25)
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
            }

        }
        else if ((locker == 2) || (locker == 5) || (locker == 8) || (locker == 11)) {
            if (duration <= 0) {
                cal_coin = 0
                this.setState({
                    cal_coin, check_duration: 'Please insert duration again !'
                })
            }
            else if (duration > 0) {
                divide_duration = (duration / 60 | 0)
                mod_duration = (duration % 60)
                if (divide_duration == 1) {
                    if (mod_duration <= 0) {
                        cal_coin = divide_duration * 100
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = (divide_duration * 100) + 50
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
                else {
                    if (mod_duration <= 0) {
                        cal_coin = 100
                        cal_coin += (divide_duration - 1) * 50
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = 100
                        cal_coin += (divide_duration * 50)
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
            }
        }
        else if ((locker == 3) || (locker == 6) || (locker == 9) || (locker == 12)) {
            if (duration <= 0) {
                cal_coin = 0
                this.setState({
                    cal_coin, check_duration: 'Please insert duration again !'
                })
            }
            else if (duration > 0) {
                divide_duration = (duration / 60 | 0)
                mod_duration = (duration % 60)
                if (divide_duration == 1) {
                    if (mod_duration <= 0) {
                        cal_coin = divide_duration * 200
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = (divide_duration * 200) + 100
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
                else {
                    if (mod_duration <= 0) {
                        cal_coin = 200
                        cal_coin += ((divide_duration - 1) * 100)
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                        this.setState({ cal_coin })
                    }
                    else {
                        cal_coin = 200
                        cal_coin += ((divide_duration) * 100)
                        this.setState({ cal_coin })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true', check_duration: '' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false', check_duration: '' })
                        }
                    }
                }
            }
        }

        setTimeout(() => {
            this.cal_bill_coin()
            this.push_data()
        }, 100);
    }
    cal_bill_coin() {
        const got_item = this.state.got_item
        const cal_coin = this.state.cal_coin
        const coin = parseInt(this.state.coin)
        let coin_charge = 0
        let bill_1000 = 0
        let bill_500 = 0
        let bill_100 = 0
        let bill_50 = 0
        let bill_20 = 0
        let coin_10 = 0
        let coin_5 = 0
        let coin_2 = 0
        let coin_1 = 0

        if (got_item == "true") {
            coin_charge = coin - cal_coin
            this.setState({ coin_charge: coin_charge })
            bill_1000 = (coin_charge / 1000)
            this.setState({ bill_1000: bill_1000 | 0 })

            bill_1000 = (coin_charge % 1000)
            bill_500 = bill_1000 / 500
            this.setState({ bill_500: bill_500 | 0 })

            bill_500 = (bill_1000 % 500)
            bill_100 = bill_500 / 100
            this.setState({ bill_100: bill_100 | 0 })

            bill_100 = (bill_500 % 100)
            bill_50 = bill_100 / 50
            this.setState({ bill_50: bill_50 | 0 })

            bill_50 = (bill_100 % 50)
            bill_20 = bill_50 / 20
            this.setState({ bill_20: bill_20 | 0 })

            bill_20 = (bill_50 % 20)
            coin_10 = bill_20 / 10
            this.setState({ coin_10: coin_10 | 0 })

            coin_10 = (bill_20 % 10)
            coin_5 = coin_10 / 5
            this.setState({ coin_5: coin_5 | 0 })

            coin_5 = (coin_10 % 5)
            coin_2 = coin_5 / 2
            this.setState({ coin_2: coin_2 | 0 })

            coin_2 = (coin_5 % 2)
            coin_1 = coin_2 / 1
            this.setState({ coin_1: coin_1 | 0 })

        }
        else {
            coin_charge = coin
            this.setState({ coin_charge: coin_charge })
            bill_1000 = (coin_charge / 1000)
            this.setState({ bill_1000: bill_1000 | 0 })

            bill_1000 = (coin_charge % 1000)
            bill_500 = bill_1000 / 500
            this.setState({ bill_500: bill_500 | 0 })

            bill_500 = (bill_1000 % 500)
            bill_100 = bill_500 / 100
            this.setState({ bill_100: bill_100 | 0 })

            bill_100 = (bill_500 % 100)
            bill_50 = bill_100 / 50
            this.setState({ bill_50: bill_50 | 0 })

            bill_50 = (bill_100 % 50)
            bill_20 = bill_50 / 20
            this.setState({ bill_20: bill_20 | 0 })

            bill_20 = (bill_50 % 20)
            coin_10 = bill_20 / 10
            this.setState({ coin_10: coin_10 | 0 })

            coin_10 = (bill_20 % 10)
            coin_5 = coin_10 / 5
            this.setState({ coin_5: coin_5 | 0 })

            coin_5 = (coin_10 % 5)
            coin_2 = coin_5 / 2
            this.setState({ coin_2: coin_2 | 0 })

            coin_2 = (coin_5 % 2)
            coin_1 = coin_2 / 1
            this.setState({ coin_1: coin_1 | 0 })
        }

    }
    push_data() {
        const data_locker = []
        data_locker.push({
            got_item: this.state.got_item,
            cal_coin: this.state.cal_coin,
            number_locker: this.state.number_locker,
            size: this.state.size,
            coin_charge: this.state.coin_charge,
            bill_1000: this.state.bill_1000,
            bill_500: this.state.bill_500,
            bill_100: this.state.bill_100,
            bill_50: this.state.bill_50,
            bill_20: this.state.bill_20,
            coin_10: this.state.coin_10,
            coin_5: this.state.coin_5,
            coin_2: this.state.coin_2,
            coin_1: this.state.coin_1,
            // active: this.state.active,
            duration: +this.state.duration,
            coin: +this.state.coin
        })
        this.props.get_data_modal(data_locker)
    }
    clear() {
        this.setState({
            check_duration: '',
            duration: '',
            coin: '',
            cal_coin: 0,
        })
    }
    render() {
        const {
            size,
            coin,
            duration,
            cal_coin,
            got_item,
            check_duration,
            coin_charge,
            bill_1000,
            bill_500,
            bill_100,
            bill_50,
            bill_20,
            coin_10,
            coin_5,
            coin_2,
            coin_1
        } = this.state
        const number_locker = parseInt(this.state.number_locker)
        return (
            <div className="margin-t">
                <Row >
                    <Col sm={12} md={{ size: 8, offset: 2 }}>
                        <BootstrapTable data={data_table}  >
                            <TableHeaderColumn dataAlign="center" width='70' dataField='size' isKey></TableHeaderColumn>
                            <TableHeaderColumn dataAlign="center" dataField='first'>first 60 minutes</TableHeaderColumn>
                            <TableHeaderColumn dataAlign="center" dataField='next'>next minutes</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
                <div style={{ marginTop: 20, textAlign: 'center' }} >
                    you select locker &nbsp; <a style={{ color: 'blue' }}>{number_locker}</a> &nbsp; size &nbsp; <a style={{ color: 'blue' }}> {size} </a>
                </div>
                {/* {cal_coin ?
                    <div style={{ marginTop: 20, textAlign: 'center' }} >
                        you charge coin : <a style={{ color: 'blue' }}>{cal_coin}</a> THB &nbsp; || &nbsp;
                        Got item back : <a style={{ color: 'blue' }}>{got_item}</a> <br />
                        you charge coin : <a style={{ color: 'blue' }}>{coin_charge}</a> THB &nbsp; || &nbsp;
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {bill_1000 ? <div>bill 1000 x <a style={{ color: 'blue' }}>{bill_1000}</a>,&nbsp;</div> : null}
                            {bill_500 ? <div>bill 500 x <a style={{ color: 'blue' }}>{bill_500}</a>,&nbsp;</div> : null}
                            {bill_100 ? <div>bill 100 x <a style={{ color: 'blue' }}>{bill_100}</a>,&nbsp;</div> : null}
                            {bill_50 ? <div>bill 50 x <a style={{ color: 'blue' }}>{bill_50}</a>,&nbsp;</div> : null}
                            {bill_20 ? <div>bill 20 x <a style={{ color: 'blue' }}>{bill_20}</a>,&nbsp;</div> : null}
                            {coin_10 ? <div>coin 10 x <a style={{ color: 'blue' }}>{coin_10}</a>,&nbsp;</div> : null}
                            {coin_5 ? <div>coin 5 x <a style={{ color: 'blue' }}>{coin_5}</a>,&nbsp;</div> : null}
                            {coin_2 ? <div>coin 2 x <a style={{ color: 'blue' }}>{coin_2}</a>&nbsp;</div> : null}
                            {coin_1 ? <div>coin 1 x <a style={{ color: 'blue' }}>{coin_1}</a></div> : null}
                        </div>
                    </div>
                    : null} */}
                {check_duration ?
                    <div style={{ marginTop: 20, textAlign: 'center' }} >
                        <a style={{ color: 'red' }}>{check_duration}</a>
                    </div> : null}
                <Row style={{ marginTop: 20 }} form>
                    <Col sm={2} />
                    <Col sm={4} >
                        <Label >Duration of deposit</Label>
                        <Input type="number" name="duration" placeholder="please insert duration"
                            value={duration}
                            onChange={(e) => this.setState({ duration: e.target.value })}
                        />
                    </Col>
                    <Col sm={4}>
                        <Label >Coin</Label>
                        <Input type="number" name="coin" placeholder="please insert coin"
                            value={coin}
                            onChange={(e) => this.setState({ coin: e.target.value })}
                        />
                    </Col>
                    <Col sm={2} />
                </Row>

                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} className="margin-t">
                    <Button color="success" style={{ marginRight: 10 }} onClick={() => this.calculate_coin()}>Confirm </Button>
                    <Button color="danger" style={{ marginLeft: 10 }} onClick={() => this.clear()}>Clear </Button>
                </Row>
            </div >
        )
    }
}
