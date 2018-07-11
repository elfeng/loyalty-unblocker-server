import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';
import { set } from 'utils/action';
import { tap } from 'utils';

const Booking = ({status, book, setEther, ether}) =>
    <div>
        <Button onClick={() => window.loyalty.instance.set(5, { from: window.loyalty.account })}>Set</Button>
        <Button onClick={() => window.loyalty.instance.get({ from: window.loyalty.account }).then(r => setEther(r))}>Get</Button>
        <span>{ether}</span>
        <form id="lastNameForm" style={{marginTop: '10px'}}>
            <input type="text" id="lastName" size="80" placeholder="Enter a name"/>
        </form>
        <Button onClick={() => book({ firstName: 'ab', lastName: document.getElementById('lastName').value.trim(), tripId: '1234' })}>Book</Button>
        <div>Status: {status}</div>
        <br/>
    </div>;

export default connect(s => ({ status: (s.bookings || {}).status, ether: s.ether ? s.ether.c[0] : 0 }), { book, setEther: set('ether') })(Booking);
