import React from 'react';
import { connect } from 'react-redux';
import { book } from 'actions';
import { Button } from 'cdesk';
import { set } from 'utils/action';
import { tap } from 'utils';

const Booking = ({status, book, setEther, ether}) =>
    <div>
        Status: <div>{status}</div>
        <Button onClick={() => book({ firstName: 'a', lastName: 'b', tripId: '1234' })}>Book</Button>
        <Button onClick={() => window.loyalty.instance.set(5, { from: window.loyalty.account })}>Set</Button>
        <Button onClick={() => window.loyalty.instance.get({ from: window.loyalty.account }).then(r => setEther(r))}>Get</Button>
        <span>{ether}</span>
    </div>

export default connect(s => ({ status: (s.bookings || {}).status, ether: s.ether ? s.ether.c[0] : 0 }), { book, setEther: set('ether') })(Booking);
