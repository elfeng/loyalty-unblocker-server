import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';
import { set } from 'utils/action';
import { tap } from 'utils';
import { CheckBox } from 'form';

class Booking extends React.Component {
    componentWillReceiveProps(p) {
        if (this.props.status !== "success" && p.status === "success") {
            this.props.setRedeem(false);
            window.loyalty.instance.pay(window.loyalty.web3.toWei(0.1, "ether"), { from: window.loyalty.account })
                .then(_ => setInterval(() => window.loyalty.web3.eth.getBalance(window.loyalty.account, (e, x) => {
                    const c = window.loyalty.web3.fromWei(x);
                    this.props.setEther(+(c.c[0] + '.' + c.c[1].toString().slice(0, 2)));
                }), 500));
            this.props.setStatus("");
        }
    }

    render() {
        const {status, book, setEther, ether, products, isRedeemPoints} = this.props;
        return ( products ?
    <div>
        <form id="nameForm" style={{marginTop: '10px'}}>
            <input type="text" id="nameText" size="80" placeholder="Enter a name"/>
        </form>
        <CheckBox name="redeemPoints" title="Redeem points?"/>

        <Button onClick={() => {
            const v = { name: document.getElementById('nameText').value.trim(), sailingCode: (products || {}).SailingCode };
            if (isRedeemPoints)
                window.loyalty.instance.addFund({ from: window.loyalty.account, value: window.loyalty.web3.toWei(products.Price / 100, "ether") }).then(_ => book(v));
            else
                book(v);
        }}>Book</Button>
    </div> : null
        );
    }
}

export default connect(s => ({ status: (s.bookings || {}).status, ether: s.ether, products: s.products, isRedeemPoints: (s.form || {}).redeemPoints }), { book, setEther: set('ether'), setStatus: set('status'), setRedeem: set('form.redeemPoints') })(Booking);
